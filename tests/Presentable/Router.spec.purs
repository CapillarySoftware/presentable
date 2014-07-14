module Main where

import Debug.Trace
import Presentable.Router
import Mocha
import Test.QuickCheck

main = do
  describe $ \_ ->
    trace "what"
    quickCheck $ \n -> foozle n == "In Port Foozle " ++ (show n) ++ " eats you!"