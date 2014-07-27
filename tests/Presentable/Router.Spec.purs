module Presentable.Router.Spec where

import Presentable.Router
import Test.Mocha
import Test.Chai
import History
import Data.Tuple

spec = describe "Router" $ do
  
  let sampleRoutes = [(Tuple "/" "views/index.yaml"), (Tuple "/foo" "views/foo.yaml"), (Tuple "/bar" "views/bar.yaml")]

  it "should default to the first of the list" $ do
    route sampleRoutes
    pushState { title : "", url : "/notOnTheList", "data" : {} }

  
