module Main where

import Control.Monad.Eff

-- Execute all the tests
main = do
  History.Spec.spec
  Control.Monad.Event.Spec.spec
  return Unit