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
present       n f m = M.insert n f m

link                :: forall a b efff eff. 
                       [String] -> 
                       (M.Map String (Linker a b eff)) -> 
                       [(Maybe (Eff (trace :: Trace | efff) Unit))]
link           xs m = (\s -> fprint <$> M.lookup s m) <$> xs

view         m yaml = case parseYAML yaml of
  Right (View xs) -> do
    ftrace m
    ftrace $ M.lookup "Foo" m
    -- ftrace $ link xs m
