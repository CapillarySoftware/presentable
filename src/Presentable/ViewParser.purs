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

type Yaml             = String
type Registry a c e   = M.Map String (Linker a c e)
type Wrap a c e       = [Presentable a c e]
type Attributes a c e = Maybe { children :: (Wrap a c e) | a}
type Linker a c e     = Maybe c -> Attributes a c e -> Eff e (Maybe c)

data Presentable a c e
  = Node (Linker a c e) (Attributes a c e)
  | Wrap (Wrap a c e)

throw = throwException <<< error

foreign import isString 
  "function isString(x){\
  \ return (typeof x === 'string');\
  \}" :: forall x. x -> Boolean

foreign import getName   
  "function getName(x){\
  \ return Object.keys(x)[0];\
  \}" :: forall x. x -> String 

foreign import getAttributesImpl
  "function getAttributesImpl(Just, Nothing, x){\
  \ if(!isString(x) && x[getName(x)].attributes){\
  \   return Just(x[getName(x)].attributes);\
  \  }else{\
  \   return Nothing;\
  \  }\
  \}" :: forall x a b. Fn3 (a -> Maybe a) (Maybe a) x (Maybe { | b})

getAttributes :: forall a x. x -> Maybe { | a}
getAttributes = runFn3 getAttributesImpl Just Nothing

makeNode :: forall a c e. Registry a c e -> String -> Eff (err :: Exception | e) (Presentable a c e)
makeNode r node = case M.lookup (name node) r of
  Nothing -> throw $ name node ++ " not found in registry"
  Just l  -> return <<< Node l <<< getAttributes $ node
  where name node = if isString node
                    then node
                    else getName node

parse :: forall a c e. Foreign -> Registry a c e-> Eff (err :: Exception | e) (Presentable a c e)
parse x r = if isArray x
            then return <<< Wrap =<< (traverse (makeNode r) $ unsafeFromForeign x)
            else makeNode r <<< unsafeFromForeign $ x

register :: forall a c e. String -> Linker a c e -> Registry a c e -> Registry a c e
register = M.insert

render :: forall a c e. Maybe c -> Presentable a c e -> Eff e (Maybe c)
render mc (Node l a@(Just { children = (ns) })) = 
  l mc a >>= flip render (Wrap ns)
render mc (Node l a) = l mc a
render mc (Wrap [n]) = render mc n 
render mc (Wrap (n:ns)) = do 
  render mc n
  render mc $ Wrap ns

emptyRegistery :: forall a c e. Registry a c e
emptyRegistery = M.empty

foreign import parseYamlImpl
  "function parseYamlImpl (left, right, yaml){\
  \   try{ return right(jsyaml.safeLoad(yaml)); }\
  \   catch(e){ return left(e.toString()); }\
  \}" :: forall a. Fn3 (String -> a) (Foreign -> a) Yaml a

yamlToView :: Yaml -> Either String Foreign
yamlToView = runFn3 parseYamlImpl Left Right

parseAndRender yaml registry = case yamlToView yaml of
  Right v  -> do 
    r <- parse v registry 
    render Nothing r
  -- Right v -> parse v registry >>= fprint
  -- Right v -> fprint v
  Left err -> throw $ "Yaml view failed to parse : " ++ err
