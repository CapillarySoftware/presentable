module Presentable.ViewParser where

import qualified Data.Map as M
import Data.Either
import Data.Maybe
import Data.Function
import Data.Foreign
import Data.Traversable
import Data.Foldable
import Control.Monad.Eff
import Control.Monad.Eff.Exception
import Debug.Foreign
import Debug.Trace
import Control.Bind((=<<))

type Yaml           = String
type Wrap l a       = [Presentable l a]
type Linker p a b e = Maybe p -> Maybe { | a} -> Eff e b
type Registry a     = M.Map String a

data Presentable l a
  = Node l (Maybe { | a})
  | Wrap (Wrap l a)

throw = throwException <<< error

-- makeNode :: forall l a b e. Registry a -> String -> Eff (trace :: Trace, err :: Exception | e) (Presentable l a)
-- makeNode r s = case M.lookup s r of
--   Nothing -> do
--     fprint s
--     throw $ s ++ " not found in registry"
--   Just l  -> return $ Node l

-- makeNode r x = do
--   if hasOwnProperty

parse :: forall l a b e. Foreign -> Registry b -> Eff (err :: Exception, trace :: Trace | e) (Presentable l a)
parse x r = if isArray x
            then return <<< Wrap =<< (sequence $ makeNode r <$> unsafeFromForeign x)
            else makeNode r <<< unsafeFromForeign $ x

register :: forall a. String -> a -> Registry a -> Registry a
register = M.insert

render :: forall p a b e. Maybe p -> Presentable (Linker p a b e) a -> Eff e b
render Nothing (Node l a) = l Nothing a
render Nothing (Wrap [n]) = render Nothing n
render _ (Wrap (n:ns))  = do 
  render Nothing n
  render Nothing $ Wrap ns

emptyRegistery :: forall a. Registry a
emptyRegistery = M.empty

foreign import parseYamlImpl
  "function parseYamlImpl (left, right, yaml){\
  \   try{ return right(jsyaml.safeLoad(yaml)); }\
  \   catch(e){ return left(e.toString()); }\
  \}" :: forall a. Fn3 (String -> a) (Foreign -> a) Yaml a

yamlToView :: Yaml -> Either String Foreign
yamlToView = runFn3 parseYamlImpl Left Right

-- parseAndRender :: forall a b e. String -> Registry (Linker a b (err :: Exception | e)) -> Eff (err :: Exception | e) b
parseAndRender yaml registry = case yamlToView yaml of
  -- Right v  -> parse v registry >>= render Nothing
  -- Right v -> parse v registry >>= fprint
  Right v -> fprint v
  Left err -> throw $ "Yaml view failed to parse : " ++ err
