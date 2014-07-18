module Debug.Foreign.Evil where

    --- Why on earth would you ever use this module?

import Data.Foreign.EasyFFI
import Control.Monad.Eff
import Debug.Trace
import Debug.Foreign

foreign import data Evil :: !
foreign import data WTF  :: *

evil :: forall r. String -> Eff (evil :: Evil | r) WTF
evil = unsafeForeignFunction ["x", ""] "eval(x)"

fpeek :: forall r. String -> Eff (trace :: Trace, evil :: Evil | r) {}
fpeek x = evil x >>= fprint