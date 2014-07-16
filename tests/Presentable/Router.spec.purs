module Main where

import Debug.Trace
import Presentable.Router
import History
import Test.Mocha
import Test.Chai
import Test.QuickCheck

main = describe "Router" $ do
  describe "History" $ do
    trace "what?"
    beforeEach $ do 
      replaceState {title = "wowzers!", url = "/foos"}


    