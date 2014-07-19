module Control.Monad.Event.Spec where

import Control.Monad.Event
import Test.Mocha
import Test.Chai

import Debug.Trace
import Debug.Foreign

spec = do
  describe "Control.Monad.Event" $ do
    -- let emitTheFoo = Event "foo" {} `emitOn` window

    -- it "events should dispatch without error" $ do 
    --   expect emitTheFoo `toNotThrow` Error

    itAsync "events should dispatch without error" $ \done ->
      subscribeEventedOn "foo" window $ \e ->
        itIs done
      emitOn (Event "foo" {}) window