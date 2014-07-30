module Presentable.Router.Spec where

import Presentable.Router
import Test.Mocha
import Test.Chai
import History
import Data.Tuple
import Data.Array
import Data.Maybe
import Debug.Foreign
import Debug.Trace
import Control.Reactive.Timer
import Control.Reactive.EventEmitter
import Control.Monad.Eff.Exception

spec = describe "Router" $ do
  
  let sampleRoutes = [ (Tuple "/index" "views/index.yaml")
                     , (Tuple "/fooo"    "views/foo.yaml")
                     , (Tuple "/barr"    "views/bar.yaml") ]

  beforeEach $ do
    replaceState { title : "", url : "/before", "data" : {}}

  itAsync "should default to the first of the list" $ \done -> do    

    subscribeStateChange \e -> do
      let s = unwrapEventDetail e
      case fst <$> head sampleRoutes of
        Just a | a == s.state.url -> return $ itIs done
        Just a -> return $ expect a `toEqual` s.state.url

    route sampleRoutes
    pushState { title : "", url : "/notOnTheList", "data" : {} }

