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
  let os    = {title : "wowzers!",   url : "/foo", "data" : { foo : 1}}
  let os'   = {title : "wowzers!!",  url : "/bar", "data" : { foo : 2}}
  let os''  = {title : "wowzers!!!", url : "/baz", "data" : { foo : 3}}

  -- setHistoryOption "debug" true
  
  it "initial state should have no title" $ do
    ts <- getState
    fprint ts
    expect ts.title `toEqual` ""

  itSkip "pushState should change the state" $ do
    pushState os
    getState >>= expectStateToMatch os

  -- it "pushing the same state again does NOT increment" $ do
  --   expectCurrentIndexToBe 1
  --   pushState os
  --   expectCurrentIndexToBe 1
  --   getState >>= expectStateToMatch os

  it "goback reverts to earlier state and does NOT decrement the index" $ do
    trace $ "pushing " ++ os.url
    pushState os
    getState >>= expectStateToMatch os
    trace $ "pushing " ++ os'.url
    pushState os'
    getState >>= expectStateToMatch os'
    goBack    
    -- expectCurrentIndexToBe 2    
    getState >>= expectStateToMatch os

  -- it "goForward moves forward but does NOT increment the index " $ do 
  --   expectCurrentIndexToBe 2
  --   goForward
  --   expectCurrentIndexToBe 2 
  --   getState >>= expectStateToMatch os'

  -- it "replaceState should change the state" $ do   
  --   pushState os''
  --   getState >>= expectStateToMatch os''

  -- it "current state will be from last test" $ do
  --   getState >>= expectStateToMatch os''

  -- it "getState and getStateByIndex of getCurrentIndex should be the same" $ do
  --   s  <- getState
  --   s' <- getCurrentIndex >>= getStateByIndex
  --   expect s `toEql` s'

  -- it "stateChange hears things" $ do 
