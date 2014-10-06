module Presentable where

import Data.Maybe
import Control.Monad.Eff

type Attributes a      = Maybe { | a}
type Parent p          = Maybe { | p}
type Linker a p e      = Attributes a -> Parent p -> Eff e (Parent p)

data Presentable a p e = Presentable (Linker a p e) (Attributes a) (Maybe [Presentable a p e])
