module Control.Reactive.EventEmitter.Spec where

import Control.Reactive.EventEmitter
import Test.Mocha
import Test.Chai

import Debug.Trace
import Debug.Foreign

spec = do
  describe "Control.Monad.Event" $ do
    
    let d'          = { wowzers : "in my trousers" }
    let sampleEvent = newEvent "foo" d'

    it "events should dispatch without error" $ do 
      let emitTheFoo = getWindow >>= emitOn sampleEvent
      expect emitTheFoo `toNotThrow` Error

    itAsync "subscribeEventedOn hears emitted events" $ \done -> do
      w <- getWindow 
      subscribeEventedOn "foo" (\_ -> itIs done) w
      emitOn sampleEvent w

    itAsync "subscribeEventedOn hears emitted events as binding" $ \done ->
      getWindow
      >>= subscribeEventedOn "foo" (\_ -> itIs done)
      >>= emitOn sampleEvent

    itAsync "subscribeEventedOn should receive any attached data" $ \done -> do      
      getWindow        
      >>= subscribeEventedEffOn "foo" (\event -> do 
        expect (unwrapDetail event) `toDeepEqual` d'
        return $ itIs done
        )
      >>= emitOn sampleEvent