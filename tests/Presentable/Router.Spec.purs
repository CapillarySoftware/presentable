module Presentable.Router.Spec where

import Presentable.Router
import Test.Mocha
import Test.Chai
import History
import Data.Tuple
import Data.Array
import Data.Maybe
import Control.Monad.ST
import Control.Monad.Eff
import Control.Monad.Eff.Exception
import Control.Reactive
import Control.Reactive.Timer
import Control.Reactive.EventEmitter

import Debug.Foreign
import Debug.Trace

toState url   = { title : "", url : url, "data" : {} }
eventUnwrapUrl e  = (unwrapEventDetail e).state.url
routeUnwrapUrl :: forall a. Route a -> Url
routeUnwrapUrl s  = (fst s).url

testRoute' rs url r done = case r of
    Just a -> do
      sub' <- route rs \v -> expect (snd a) `toEqual` v 
      sub  <- subscribeStateChange \e -> 
        if   routeUnwrapUrl a == eventUnwrapUrl e
        then return $ itIs done
        else return $ expect (routeUnwrapUrl a) `toNotEqual` eventUnwrapUrl e

      pushState <<< toState $ url
  
      -- clean up for the next test
      unsubscribe sub
      unsubscribe sub'

spec = describe "Router" $ do
  
  let sampleRoutes = [ (Tuple { url : "/index", title : "home",     "data" : {}} 
                              "views/index.yaml")
                     , (Tuple { url : "/fooo",  title : "foo page", "data" : {}} 
                              "views/foo.yaml")
                     , (Tuple { url : "/barr",  title : "bar page", "data" : {}} 
                              "views/bar.yaml") ]

  let testRoute    = testRoute' sampleRoutes

  beforeEach <<< replaceState <<< toState $ "/before"

  itAsync "should default to the first of the list"
    $ testRoute "/notOnTheList"  
    $ head sampleRoutes

  itAsync "should find middle route"
    $ testRoute "/fooo" 
    $ tail sampleRoutes >>= head

  itAsync "should find end route" 
    $ testRoute "/barr" 
    $ last sampleRoutes

  itAsync "should find the first route" 
    $ testRoute "/index"
    $ head sampleRoutes

