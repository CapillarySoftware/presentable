module Presentable.Router.Spec where

import Presentable.Router
import Test.Mocha
import Test.Chai
import History
import Data.Tuple
import Data.Array
import Data.Maybe
import Debug.Foreign
import Control.Reactive.Timer

spec = describe "Router" $ do
  
  let sampleRoutes = [ (Tuple "/ind"  "views/index.yaml")
                     , (Tuple "/fooo" "views/foo.yaml")
                     , (Tuple "/barr" "views/bar.yaml") ]

  beforeEach $ do
    replaceState { title : "", url : "/before", "data" : {}}

  itAsync "should default to the first of the list" $ \done -> do

    route sampleRoutes

    fprint "/notOnTheList pushed"    
    pushState { title : "", url : "/notOnTheList", "data" : {} }


    timeout 1000 \_ -> do
      s <- getState
      case fst <$> head sampleRoutes of
        Just a -> expect a `toEqual` s.url
      return $ itIs done