module Main where

import Debug.Trace
import Presentable.Router
import Control.Monad.Eff
import Test.Mocha
import Test.QuickCheck

main = do
  describe "its a thing!" $ do
    it "seriously its a thing" $ do
      quickCheck $ \n -> foozle n == "In Port Foozle " ++ (show n) ++ " eats you!"

    it "no no seriously grue's exist and are out to get you" $ do
      quickCheck $ \n -> foozle n == "In Port Foozle " ++ (show n) ++ " eats you!"      

    