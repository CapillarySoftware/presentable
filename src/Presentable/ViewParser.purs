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

present             = M.insert

view                :: forall a eff. 
                       M.Map String (Linker Number a eff) -> 
                       String -> 
                       Eff (reactive :: Reactive | eff) Unit
view         m yaml = case parseYAML yaml           of
  Right (View xs)  -> case (flip M.lookup) m <$> xs of
    [Just a]       -> newRVar 0 >>= a
