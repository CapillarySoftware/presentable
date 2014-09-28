module Pixi.Detector where

import Control.Monad.Eff
import Data.Function

foreign import data Renderer :: *

foreign import autoDetectRendererImpl
  "function autoDetectRendererImpl(x, y){\
  \ return PIXI.autoDetectRenderer(x, y);\
  \}" :: forall e. Fn2 Number Number (Eff e Renderer)
autoDetectRenderer = runFn2 autoDetectRendererImpl