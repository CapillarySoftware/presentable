module Main where

import Debug.Trace
import Presentable.Router
import Test.Mocha
import Test.QuickCheck

main = do
  describe $ do
    trace "what"
    quickCheck $ \n -> foozle n == "In Port Foozle " ++ (show n) ++ " eats you!"