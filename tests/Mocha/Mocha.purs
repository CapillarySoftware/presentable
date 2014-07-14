module Mocha where

import Control.Monad.Eff

foreign import describe 
  "function describe(n){         \
  \ return function(){           \
  \   window.describe(n);        \
  \ };                           \  
  \}" :: forall a. Eff a -> Eff a