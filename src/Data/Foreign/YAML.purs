module Data.Foreign.YAML where

import Data.Foreign
import Data.Foreign.EasyFFI
import Data.Either
import Data.Function
import Control.Monad.Eff

foreign import fromYamlImpl
  "function fromYamlImpl(left, right, str) { \
  \  try { \
  \    return right(jsyaml.safeLoad(str)); \
  \  } catch (e) { \
  \    return left(e.toString()); \
  \  } \
  \}" :: Fn3 (String -> Either String Foreign) (Foreign -> Either String Foreign) String (Either String Foreign)


fromYaml :: String -> Either String Foreign
fromYaml s = runFn3 fromYamlImpl Left Right s


parseYAML :: forall a. (ReadForeign a) => String -> Either String a
parseYAML yaml = fromYaml yaml >>= parseForeign read