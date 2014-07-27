module History.Spec where

    --- NOTE THIS IS ONLY TRUE BECAUSE HISTORY CAN NOT BE RESET 
    --- SO TESTS HAVE SIDE EFFECTS

import History
import Test.Mocha
import Test.Chai
import Control.Monad.Eff
import Control.Reactive.EventEmitter
import Control.Reactive.Timer
import Debug.Foreign

expectStateToMatch os = do
  ts <- getState
  expect os.url `toEqual` ts.url
  -- This works in Chrome but not PhantomJS
  -- expect os."data" `toDeepEqual` ts."data"
  
spec = describe "History" $ do
  let os   = {title : "wowzers!",   url : "/foo", "data" : { foo : 1 }}
  let os'  = {title : "wowzers!!",  url : "/bar", "data" : { foo : 2 }}
  let os'' = {title : "wowzers!!!", url : "/baz", "data" : { foo : 3 }}
  
  it "initial state should have no title" $ do
    ts <- getState
    expect ts.title `toEqual` ""

  it "pushState should change the state" $ do
    pushState os
    expectStateToMatch os

  itAsync "pushState should fire statechange" $ \done -> do
    sub <- subscribeStateChange  \event -> do
      let d = unwrapEventDetail event
      expect d.state `toDeepEqual` os'
      return $ itIs done
    pushState os'
    expectStateToMatch os'
    unsubscribe sub

  it "replaceState should change the state" $ do
    replaceState os''
    expectStateToMatch os''

  itAsync "replaceState shoud fire statechange" $ \done -> do 
    sub <- subscribeStateChange  \event -> do
      let d = unwrapEventDetail event
      expect d.state `toDeepEqual` os
      return $ itIs done    
    replaceState os
    expectStateToMatch os
    unsubscribe sub

  itAsync "goBack should go back a state" $ \done -> do
    expectStateToMatch os
    pushState os'
    expectStateToMatch os'

    sub <- subscribeStateChange \event -> do
      let d = unwrapEventDetail event 
      expect d.state `toEqual` "back"
    
    goBack
    
    unsubscribe sub
    
    timeout 5 \_ -> do
      expectStateToMatch os      
      return $ itIs done

  itAsync "goForward should go forward a state" $ \done -> do
    expectStateToMatch os

    goForward

    timeout 5 \_ -> do
      expectStateToMatch os'
      return $ itIs done

  -- itAsync "go accepts a number to move in the state" $ \done -> do
  --   expectStateToMatch os'

  --   goState (-1)

  --   timeout 5 \_ -> do
  --     expectStateToMatch os
  --     return $ itIs done