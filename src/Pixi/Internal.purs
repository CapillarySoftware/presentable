module Pixi.Internal where
  
import Data.Function
import Control.Monad.Eff

foreign import method0 
  "function method0(fnName, a){\
  \ a[fnName](); \
  \}" :: forall a e. Fn2 String a e

foreign import method0M
  "function method0M(fnName, a){\
  \ a[fnName](); \
  \ return a;\
  \}" :: forall a e. Fn2 String a (Eff e a)

foreign import method1 
  "function method1(fnName, b, a){\
  \ a[fnName](b); \
  \}" :: forall a b e. Fn3 String b a e

foreign import method1M
  "function method1M(fnName, b, a){\
  \ a[fnName](b); \
  \ return a;\
  \}" :: forall a b e. Fn3 String b a e