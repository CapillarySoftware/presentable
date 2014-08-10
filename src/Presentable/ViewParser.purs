module Presentable.ViewParser where

import qualified Data.Map as M
import Data.Either
import Data.Maybe
import Data.Foreign
import Data.Foreign.YAML
import Control.Reactive
import Control.Monad.Eff
import Control.Monad.Eff.Exception
import Debug.Foreign
import Debug.Trace

type Linker a b eff = ((RVar a) -> Eff (reactive :: Reactive, 
                                        err      :: Exception | eff) Unit)

data View           = View [String]

throwError          = error >>> throwException

instance readView   :: ReadForeign View where
  read = View <$> prop "View"

present             = M.insert

render              :: forall a b eff. [(Maybe (Linker Number b eff))] -> 
                          Eff (reactive :: Reactive, 
                               err      :: Exception | eff) Unit

render     [Just a] = newRVar 0 >>= a
render    [Nothing] = throwError "Linker not found"
render       (a:as) = do
  render [a]
  render as

view                :: forall a eff. 
                       M.Map String (Linker Number a eff) -> 
                       String -> 
                       Eff (reactive :: Reactive, 
                            err      :: Exception | eff) Unit

view         m yaml = case parseYAML yaml of
  Left err         -> throwError $ "yo yaml, it failed to parse" ++ err
  Right (View xs)  -> render $ (flip M.lookup) m <$> xs