module Main where

import Control.Monad.Eff
import Debug.Foreign

main = do
  Presentable.Router.Spec.spec
  Presentable.ViewParser.Spec.spec
  return Unit