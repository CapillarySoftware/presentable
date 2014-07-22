module Control.Reactive.EventEmitter.Spec where

import Control.Reactive.EventEmitter
import Test.Mocha
import Test.Chai

import Debug.Trace
import Debug.Foreign

spec = do
  describe "Control.Monad.Event" $ do
    w <- getWindow  
    -- let emitTheFoo = (eventBC "foo" {}) `emitOn` w

    -- itSkip "events should dispatch without error" $ do 
    --   expect emitTheFoo `toNotThrow` Error

    itAsync "subscribeEventedOn does what it says" $ \done -> do
      subscribeEventedOn "foo" (\_ -> itIs done) w
      emitOn (eventBC "foo" {}) w
      


      
        

      
      