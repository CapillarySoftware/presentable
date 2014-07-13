module Main where

import Data.Array
import Data.Maybe

import Debug.Trace
import Control.Monad.Eff

-- Import the library's module(s)
import Starter.Kit.Example

-- Import Test.QuickCheck, which supports property-based testing
import Test.QuickCheck

-- Main.main is the entry point of the application
--
-- In the case of the test suite, Main.main will use QuickCheck to test a collection
-- of properties that we expect of the diffs function.
main = do

  -- Use quickCheck' to override the number of tests to perform.
  -- In this case, we only need to run the test once, since there is
  -- only one empty list.


  trace "what?"
  quickCheck' 1 $ addThenDivide 2 4 2 1 == 2

