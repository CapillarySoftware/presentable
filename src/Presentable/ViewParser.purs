module Presentable.ViewParser where

import Data.Foreign
import Data.Foreign.YAML
import Data.Foldable
import Data.Either
import Control.Reactive
import Control.Monad.Eff
import Control.Monad.ST
import Debug.Foreign

type Linker       = forall a b eff. ((RVar a) -> Eff (reactive :: Reactive | eff) b)

data View = View { | c}

instance readView :: ReadForeign View where
  read = View <$> prop "View"


-- present :: String -> Linker -> [Component] -> [Component]
present n f m  = m {n = f}

view p yaml = case parseYAML yaml of
  Right (View a) -> fprint a
