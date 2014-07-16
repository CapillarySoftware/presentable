module Main where

import Debug.Trace
import Presentable.Router
import History
import Test.Mocha
import Test.Chai
import Test.QuickCheck

expectTitleAndDataToMatch os ts = do
  expect ts.title `toEqual` os.title
  expect ts."data" `toDeepEqual` os."data"

main = describe "History" $ do
  let os = {title : "wowzers!", url : "/foos", "data" : { foo : 1}}
  
  it "replaceState should change the state" $ do   
    replaceState os
    getState >>= expectTitleAndDataToMatch os

  it "pushState should change the state" $ do
    pushState os
    getState >>= expectTitleAndDataToMatch os


    