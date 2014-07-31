module Presentable.ViewParser where

import qualified Data.Map as M
import Data.Either
import Data.Maybe
import Data.Foreign
import Data.Foreign.YAML
import Control.Reactive
import Control.Monad.Eff
import Debug.Foreign
import Debug.Trace

type Linker a b eff = ((RVar a) -> Eff (reactive :: Reactive | eff) Unit)

data View           = View [String]

instance readView   :: ReadForeign View where
  read = View <$> prop "View"

present             :: forall a b eff. 
                       String -> 
                       (Linker a b eff) -> 
                       (M.Map String (Linker a b eff)) -> 
                       (M.Map String (Linker a b eff))
present             = M.insert

view                :: forall a b efff eff. 
                       M.Map String (Linker a b efff) -> 
                       String -> 
                       Eff (trace :: Trace | eff) Unit
view         m yaml = case parseYAML yaml of
  Right (View xs) -> ftrace $ (flip M.lookup) m <$> xs
