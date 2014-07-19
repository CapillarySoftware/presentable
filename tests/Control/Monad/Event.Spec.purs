module Control.Monad.Event.Spec where

import Control.Monad.Event
import Test.Mocha
import Test.Chai

import Debug.Trace
import Debug.Foreign

spec = do
  describe "Control.Monad.Event" $ do
    it "what???" $ do 
      expect "" `toEqual` ""

    itAsync "events should dispatch without error" $ \done ->
      itIs done