module Test.Mocha where

import Control.Monad.Eff

foreign import data Describe :: !

foreign import describe :: forall e a. Eff e a -> Eff (describe :: Describe | e) {}