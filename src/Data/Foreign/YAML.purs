module Data.Foreign.YAML where

import Data.Foreign
import Data.Foreign.EasyFFI
import Data.Either
import Data.Function
import Control.Monad.Eff

type YAML = String 

foreign import fromYAMLImpl
  "function fromYAMLImpl(left, right, str) { \
  \  try {                                   \
  \    return right(jsyaml.safeLoad(str));   \
  \  } catch (e) {                           \
  \    return left(e.toString());            \
  \  }                                       \
  \}" :: Fn3 (String -> Either String Foreign) (Foreign -> Either String Foreign) String (Either String Foreign)

fromYAML :: String -> Either String Foreign
fromYAML s = runFn3 fromYAMLImpl Left Right s

foreign import toYAML
  "function toYAML(obj){           \
  \   return jsyaml.safeDump(obj); \ 
  \}" :: forall a. a -> YAML

parseYAML :: forall a. (ReadForeign a) => String -> Either String a
parseYAML yaml = fromYAML yaml >>= parseForeign read