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

spec = describe "Router" $ do
  
  let sampleRoutes = [ (Tuple "/index" "views/index.yaml")
                     , (Tuple "/fooo"    "views/foo.yaml")
                     , (Tuple "/barr"    "views/bar.yaml") ]

  beforeEach $ do
    replaceState { title : "", url : "/before", "data" : {}}

  itAsync "should default to the first of the list" $ \done -> do    
    sub <- subscribeStateChange \e -> do
      let s = unwrapEventDetail e
      case fst <$> head sampleRoutes of
        Just a | a == s.state.url -> return $ itIs done
        Just a -> return $ expect a `toNotEqual` s.state.url

    sub' <- route sampleRoutes
    pushState { title : "", url : "/notOnTheList", "data" : {} }
    unsubscribe sub
    unsubscribe sub'

  itAsync "should find middle route" $ \done -> do
    sub <- subscribeStateChange \e -> do 
      let s = unwrapEventDetail e
      case fst <$> ((tail sampleRoutes) >>= head) of
        Just a | a == s.state.url -> return $ itIs done
        Just a -> return $ expect a `toNotEqual` s.state.url
    sub' <- route sampleRoutes
    pushState { title : "", url : "/fooo", "data" : {}}
    unsubscribe sub 
    unsubscribe sub'

  itAsync "should find end route" $ \done -> do
    sub <- subscribeStateChange \e -> do 
      let s = unwrapEventDetail e
      case fst <$> (last sampleRoutes) of
        Just a | a == s.state.url -> return $ itIs done
        Just a -> return $ expect a `toNotEqual` s.state.url
    sub' <- route sampleRoutes
    pushState { title : "", url : "/barr", "data" : {}}
    unsubscribe sub 
    unsubscribe sub'

  itAsync "should find the first route" $ \done -> do
    sub <- subscribeStateChange \e -> do 
      let s = unwrapEventDetail e
      case fst <$> (head sampleRoutes) of
        Just a | a == s.state.url -> return $ itIs done
        Just a -> return $ expect a `toNotEqual` s.state.url
    sub' <- route sampleRoutes
    pushState { title : "", url : "/index", "data" : {}}
    unsubscribe sub 
    unsubscribe sub'

