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

expectCurrentIndexToBe i = do
  i' <- getCurrentIndex
  expect i' `toEqual` i

main = describe "History" $ do
  let os  = {title : "wowzers!",  url : "/foo", "data" : { foo : 1}}
  let os' = {title : "wowzers!!", url : "/bar", "data" : { foo : 2}}
  
  it "initial state should have no title" $ do
    ts <- getStateByIndex 0
    expect ts.title `toEqual` ""

  it "pushState should change the state" $ do
    expectCurrentIndexToBe 0
    pushState os
    expectCurrentIndexToBe 1
    getState >>= expectStateToMatch os

  it "pushing the same state again does NOT increment" $ do
    expectCurrentIndexToBe 1
    pushState os
    expectCurrentIndexToBe 1
    getState >>= expectStateToMatch os

  it "goback reverts to earlier state and does NOT decrement the index" $ do
    pushState os'
    expectCurrentIndexToBe 2
    goBack    
    expectCurrentIndexToBe 2    
    getState >>= expectStateToMatch os

  it "goForward moves forward but does NOT increment the index " $ do 
    expectCurrentIndexToBe 2
    goForward
    expectCurrentIndexToBe 2 
    getState >>= expectStateToMatch os'

  it "replaceState should change the state" $ do   
    replaceState os
    getState >>= expectStateToMatch os

  it "current state will be from last test" $ do
    getState >>= expectStateToMatch os

  it "getState and getStateByIndex of getCurrentIndex should be the same" $ do
    s  <- getState
    s' <- getCurrentIndex >>= getStateByIndex
    expect s `toEql` s'

  -- it "stateChange hears things" $ do 
