module Presentable.Router.Spec where

import Presentable.Router
import Test.Mocha
import Test.Chai
import History
import Data.Tuple
import Data.Array
import Data.Maybe
import Control.Monad.Eff
import Control.Monad.Eff.Exception
import Control.Reactive
import Control.Reactive.Timer
import Control.Reactive.EventEmitter

import Debug.Foreign
import Debug.Trace

toState url = { title : "", url : url, "data" : {} }

testRoute' srs url mUrl done = do 
  let mUrl = mUrl :: Maybe Url

  sub <- subscribeStateChange \e -> do
    let s = unwrapEventDetail e 
    case mUrl of
      Just a | a == s.state.url -> return $ itIs done
      Just a -> return $ expect a `toNotEqual` s.state.url

  sub' <- route srs

  pushState <<< toState $ url
  
  -- clean up for the next test
  unsubscribe sub
  unsubscribe sub'

spec = describe "Router" $ do
  
  let sampleRoutes = [ (Tuple "/index" "views/index.yaml")
                     , (Tuple "/fooo"    "views/foo.yaml")
                     , (Tuple "/barr"    "views/bar.yaml") ]

  let testRoute    = testRoute' sampleRoutes

  beforeEach <<< replaceState <<< toState $ "/before"

  itAsync "should default to the first of the list"
    $ testRoute "/notOnTheList"  
    $ fst <$> head sampleRoutes

  itAsync "should find middle route"
    $ testRoute "/fooo" 
    $ fst <$> (tail sampleRoutes >>= head)

  itAsync "should find end route" 
    $ testRoute "/barr" 
    $ fst <$> last sampleRoutes

  itAsync "should find the first route" 
    $ testRoute "/index"
    $ fst <$> head sampleRoutes

