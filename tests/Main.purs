module Main where

import Control.Monad.Eff

main = do
  History.Spec.spec
  Control.Reactive.EventEmitter.Spec.spec
  Control.Reactive.Timer.Spec.spec
  Presentable.Router.Spec.spec
  Data.Foreign.YAML.Spec.spec
  Presentable.ViewParser.Spec.spec
  return Unit