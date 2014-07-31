module Presentable.ViewParser where

import Data.Foreign
import Data.Foreign.YAML
import Data.Foldable
import Data.Map
import Control.Reactive
import Control.Monad.Eff
import Control.Monad.ST

data Component a b eff = 
     Component String ((RVar a) -> Eff (reactive :: Reactive | eff) b)

present n f m = m ++ (f n)

view yaml = do
  let v = parseYAML yaml
