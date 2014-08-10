module Main where

import Control.Monad.Eff

main = do
  Presentable.Router.Spec.spec
  Data.Foreign.YAML.Spec.spec
  Presentable.ViewParser.Spec.spec
  return Unit