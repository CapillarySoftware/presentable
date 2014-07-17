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

expectStateToMatch os = do
  ts <- getState
  expect os.url `toEqual` ts.url
  expect os."data" `toDeepEqual` ts."data"

moo = do trace "Woot!"

main = describe "History" $ do
  let os    = {title : "wowzers!",   url : "/foo", "data" : { foo : 1}}
  let os'   = {title : "wowzers!!",  url : "/bar", "data" : { foo : 2}}
  let os''  = {title : "wowzers!!!", url : "/baz", "data" : { foo : 3}}

  -- setHistoryOption "debug" true
  
  it "initial state should have no title" $ do
    ts <- getState
    expect ts.title `toEqual` ""

  it "pushState should change the state" $ do
    pushState os
    expectStateToMatch os

  itSkip "goes back and forward" $ do    
    pushState os'
    expectStateToMatch os'
    goBack    
    expectStateToMatch os
    goForward
    expectStateToMatch os'

  it "replaceState should change the state" $ do   
    pushState os''
    expectStateToMatch os''

  it "current state will be from last test" $ do
    expectStateToMatch os''

  it "stateChange hears things" $ do 
    stateChange moo
    goBack

