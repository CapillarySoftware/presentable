module Main where

import Debug.Trace
import Presentable.Router
import Test.QuickCheck

main = do
  trace "foozle should eat you"
  quickCheck $ \n -> foozle n == "In Port Foozle " ++ (show n) ++ " eats you!"