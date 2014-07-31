module Debug.Foreign where 

import Data.Foreign.EasyFFI
import Control.Monad.Eff
import Debug.Trace

fprint :: forall a r. a -> Eff (trace :: Trace | r) Unit
fprint = unsafeForeignProcedure ["x", ""] "console.log(x)"

ftrace :: forall a r. a -> Eff (trace :: Trace | r) Unit
ftrace = unsafeForeignProcedure ["x", ""] "console.log(JSON.stringify(x))"