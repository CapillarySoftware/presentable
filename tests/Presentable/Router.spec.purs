module Main where

import Debug.Trace
import Presentable.Router
import Test.Mocha
import Test.Chai
import Test.QuickCheck

main = do
  describe "its a thing!" $ do
    it "seriously its a thing" $ do
      quickCheck $ \n -> foozle n == "In Port Foozle " ++ (show n) ++ " eats you!"

    it "no no seriously grue's exist and are out to get you" $ do
      expect "foo" `toNotEqual` "bar"
      expect "foo" `toEqual` "foo"

    