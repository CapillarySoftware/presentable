module Control.Monad.Event.Spec where

import Control.Monad.Event
import Test.Mocha
import Test.Chai

import Debug.Trace
import Debug.Foreign

spec = do
  describe "Control.Monad.Event" $ do
    let emitTheFoo = emit Event "foo" {}

    it "events should dispatch without error" $ do 
      emitTheFoo
      expect bad `toNotThrow` Error

    itAsync "events should dispatch without error" $ \done ->
      subscribeEvented "foo" $ \e ->
        itIs done
      emit Event "foo" {}