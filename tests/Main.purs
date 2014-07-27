module Main where

import Control.Monad.Eff

-- Execute all the tests
main = do
  History.Spec.spec
  Control.Reactive.EventEmitter.Spec.spec
  Control.Reactive.Timer.Spec.spec
  Presentable.Router.Spec.spec
  return Unit