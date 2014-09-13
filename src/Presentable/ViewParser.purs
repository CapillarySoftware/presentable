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

type Yaml         = String
type Registry a   = M.Map String a
type Wrap a       = [Presentable a]
type Linker a e b = Maybe a -> Eff e b

data Presentable a
  = Node a
  | Wrap (Wrap a)


throw = throwException <<< error

makeNode :: forall a e. Registry a -> String -> Eff (err :: Exception | e) (Presentable a)
makeNode r s = case M.lookup s r of 
  Nothing -> throw $ s ++ " not found in registry"
  Just a  -> return $ Node a

parse :: forall a e. Foreign -> Registry a -> Eff (err :: Exception | e) (Presentable a)
parse x r = if isArray x 
            then return <<< Wrap =<< (sequence $ makeNode r <$> unsafeFromForeign x)
            else makeNode r <<< unsafeFromForeign $ x

present :: forall a. String -> a -> Registry a -> Registry a
present = M.insert

render :: forall a b e. Maybe a -> Presentable (Linker a e b) -> Eff e b
render Nothing (Node f)  = f Nothing
render Nothing (Wrap xs) = sequence $ render Nothing <$> xs 

emptyRegistery :: forall a. Registry a
emptyRegistery = M.empty

foreign import parseYamlImpl
  "function parseYamlImpl (left, right, yaml){\
  \   try{ return right(jsyaml.safeLoad(yaml)); }\
  \   catch(e){ return left(e.toString()); }\
  \}" :: forall a. Fn3 (String -> a) (Foreign -> a) Yaml a 

yamlToView :: Yaml -> Either String Foreign
yamlToView = runFn3 parseYamlImpl Left Right

parseAndRender yaml registry = case yamlToView yaml of
  Right v  -> fprint =<< parse v registry
  Left err -> throw $ "Yaml view failed to parse : " ++ err