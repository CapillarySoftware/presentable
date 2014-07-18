module History.Spec where

    --- NOTE THIS IS ONLY TRUE BECAUSE HISTORY CAN NOT BE RESET 
    --- SO TESTS HAVE SIDE EFFECTS

import Debug.Trace
import History
import Test.Mocha
import Test.Chai

expectStateToMatch os = do
  ts <- getState
  expect os.url    `toEqual`     ts.url
  expect os."data" `toDeepEqual` ts."data"
  
main = describe "History" $ do
  let os    = {title : "wowzers!",   url : "/foo", "data" : { foo : 1}}
  let os'   = {title : "wowzers!!",  url : "/bar", "data" : { foo : 2}}
  let os''  = {title : "wowzers!!!", url : "/baz", "data" : { foo : 3}}
  
  it "initial state should have no title" $ do
    ts <- getState
    expect ts.title `toEqual` ""

  it "pushState should change the state" $ do
    pushState os
    expectStateToMatch os

  it "replaceState should change the state" $ do   
    pushState os''
    expectStateToMatch os''

  it "current state will be from last test" $ do
    expectStateToMatch os''
