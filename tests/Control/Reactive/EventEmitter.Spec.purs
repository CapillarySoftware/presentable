module Control.Reactive.EventEmitter.Spec where

import Control.Reactive.EventEmitter
import Test.Mocha
import Test.Chai

import Debug.Trace
import Debug.Foreign

spec = describe "Control.Monad.Event" $ do
    
  let d'          = { wowzers : "in my trousers" }
  let sampleEvent = newEvent "foo" d'

  window <- getWindow

  it "events should dispatch without error" $ do 
    let emitTheFoo = getWindow >>= emitOn sampleEvent
    expect emitTheFoo `toNotThrow` Error

  itAsync "subscribeEventedOn hears emitted events" $ \done -> do
    subscribeEventedOn "foo" (\_ -> return $ itIs done) window
    emitOn sampleEvent window

  itAsync "subscribeEventedOn should receive any attached data" $ \done -> do         
    subscribeEventedOn "foo" (\event -> do 
      expect (unwrapEventDetail event) `toDeepEqual` d'
      return $ itIs done
      ) window
    emitOn sampleEvent window

  itAsync "emit and subscribeEvented should be global" $ \done -> do 
    subscribeEvented "foo" $ \_ -> return $ itIs done
    emit sampleEvent

  it "eventDMap maps over the details data passing area" $ do 
    let mapped = eventDMap (\d -> d { wowzers = "gadget" }) sampleEvent      
    expect (unwrapEventDetail mapped) `toDeepEqual` { wowzers : "gadget"}
    expect (unwrapEventName mapped) `toEqual` (unwrapEventName sampleEvent)
    expect (unwrapEventDetail mapped) `toNotEqual` (unwrapEventDetail sampleEvent)

  it "eventNMap maps over the name of the event" $ do
    let mapped = eventNMap (\_ -> "Merv Griffen") sampleEvent
    expect (unwrapEventDetail mapped) `toDeepEqual` (unwrapEventDetail sampleEvent)
    expect (unwrapEventName mapped) `toEqual` "Merv Griffen"
    expect (unwrapEventName mapped) `toNotEqual` (unwrapEventName sampleEvent)