module Main where

import Control.Monad.Eff

-- Execute all the tests
main = do
  History.Spec.spec
  Control.Reactive.EventEmitter.Spec.spec
  return Unit