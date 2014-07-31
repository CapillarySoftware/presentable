module Presentable.ViewParser where

import qualified Data.Map as M
import Data.Either
import Data.Foreign
import Data.Foreign.YAML
import Control.Reactive
import Control.Monad.Eff
import Control.Monad.ST
import Debug.Foreign

type Linker a b eff = ((RVar a) -> Eff (reactive :: Reactive | eff) Unit)

data View           = View [String]

instance readView :: ReadForeign View where
  read = View <$> prop "View"

present           :: forall a b eff. 
                     String -> 
                     (Linker a b eff) -> 
                     (M.Map String (Linker a b eff)) -> 
                     (M.Map String (Linker a b eff))
present     n f m = M.insert n f m
  

view       p yaml = case parseYAML yaml of
  Right (View a) -> fprint a
