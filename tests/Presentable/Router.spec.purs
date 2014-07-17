module Main where

    --- NOTE THIS IS ONLY TRUE BECAUSE HISTORY CAN NOT BE RESET 
    --- SO TESTS HAVE SIDE EFFECTS

import Debug.Trace
import Debug.Foreign
import Presentable.Router
import History
import Test.Mocha
import Test.Chai
import Test.QuickCheck

expectStateToMatch os ts = do
  -- fprint ts
  expect ts.title `toEqual` os.title
  expect ts."data" `toDeepEqual` os."data"

main = describe "History" $ do
  let os  = {title : "wowzers!", url : "/foo", "data" : { foo : 1}}
  let os1 = {title : "wowzers!", url : "/bar", "data" : { foo : 1}}
  
  it "initial state should have no title" $ do
    ts <- getStateByIndex 0
    expect ts.title `toEqual` ""

  it "pushState should change the state" $ do
    i <- getCurrentIndex
    expect i `toEqual` 0

    pushState os

    i' <- getCurrentIndex
    expect i' `toEqual` (i + 1)

    getState >>= expectStateToMatch os

  it "goback decrements the index" $ do
    pushState os1
    i <- getCurrentIndex
    goBack
    i' <- getCurrentIndex

    print i
    print i'

    expect i' `toEqual` (i - 1)

  it "replaceState should change the state" $ do   
    replaceState os
    getState >>= expectStateToMatch os

  it "later current state will be from last test" $ do
    getStateByIndex 0 >>= expectStateToMatch os