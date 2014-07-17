module Main where

import Debug.Trace
import Debug.Foreign
import Presentable.Router
import History
import Test.Mocha
import Test.Chai
import Test.QuickCheck

expectStateToMatch os ts = do
  fprint ts
  expect ts.title `toEqual` os.title
  expect ts."data" `toDeepEqual` os."data"

main = describe "History" $ do
  let os = {title : "wowzers!", url : "/foos", "data" : { foo : 1}}
  
  it "pushState should change the state" $ do
    pushState os
    getState >>= expectStateToMatch os

  it "replaceState should change the state" $ do   
    replaceState os
    getState >>= expectStateToMatch os

  itOnly "getStateByIndex" $ do
    getStateByIndex 0 >>= expectStateToMatch os


    