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

type Yaml             = String
type Registry a c e   = M.Map String (Linker a c e)
type Wrap a c e       = [Presentable a c e]
type Attributes a c e = Maybe { children :: (Wrap a c e) | a}
type Linker a c e     = Maybe c -> Attributes a c e -> Eff e (Maybe c)

data Presentable a c e
  = Node (Linker a c e) (Attributes a c e) (Maybe (Wrap a c e))
  | Wrap (Wrap a c e)

throw = throwException <<< error

foreign import isString 
  "function isString(x){\
  \ return (typeof x === 'string');\
  \}" :: Foreign -> Boolean

foreign import unsafeToString
  "function unsafeToString(s){ return s; }" :: Foreign -> String

foreign import getNameImpl   
  "function getNameImpl(x){ return Object.keys(x)[0]; }" :: Foreign -> String

getName :: Foreign -> String
getName node = if isString node then unsafeToString node else getNameImpl node

foreign import getAttributesImpl
  "function getAttributesImpl(Just, Nothing, x){\
  \ if(!isString(x) && x[getName(x)].attributes){\
  \   return Just(x[getName(x)].attributes);\
  \ }else{ return Nothing; }\
  \}" :: forall a b. Fn3 (a -> Maybe a) (Maybe a) Foreign (Maybe { | b})

getAttributes :: forall a. Foreign -> Maybe { | a}
getAttributes = runFn3 getAttributesImpl Just Nothing

foreign import getChildrenImpl
  "function getChildrenImpl(Just, Nothing, x){\
  \ if(!isString(x) && x[getName(x)].children && x[getName(x)].children.length){\
  \   return Just(x[getName(x)].children);\
  \ }else{ return Nothing; }\
  \}" :: Fn3 (Foreign -> Maybe Foreign) (Maybe Foreign) Foreign (Maybe [Foreign])

getChildren :: Foreign -> Maybe [Foreign]
getChildren = runFn3 getChildrenImpl Just Nothing

makeNode :: forall a c e. Registry a c e -> Foreign -> Eff (err :: Exception | e) (Presentable a c e)
makeNode r node = case M.lookup (getName node) r of
  Nothing -> throw $ getName node ++ " not found in registry"
  Just l  -> case getChildren node of 
    Nothing -> return $ Node l (getAttributes node) Nothing
    Just ss -> do
      w <- (makeWrap r ss) 
      return $ Node l (getAttributes node) Nothing

makeWrap :: forall a c e. Registry a c e -> [Foreign]-> Eff (err :: Exception | e) (Presentable a c e)
makeWrap r ss = do 
  ns <- traverse (makeNode r) ss 
  return <<< Wrap $ ns

parse :: forall a c e. Foreign -> Registry a c e-> Eff (err :: Exception | e) (Presentable a c e)
parse x r = if isArray x
            then makeWrap r <<< unsafeFromForeign $ x
            else makeNode r <<< unsafeFromForeign $ x

register :: forall a c e. String -> Linker a c e -> Registry a c e -> Registry a c e
register = M.insert

render :: forall a c e. Maybe c -> Presentable a c e -> Eff e (Maybe c)
-- render mc (Node l a (Just w)) = l mc a >>= (flip render) w 
render mc (Node l a Nothing)  = l mc a
render mc (Wrap [n])          = render mc n
render mc (Wrap (n:ns))       = do 
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

renderYaml :: forall a c e. 
  Yaml -> Registry a c (err :: Exception | e) -> Eff (err :: Exception | e) (Maybe c)
renderYaml yaml registry = case yamlToView yaml of
  Right v  -> parse v registry >>= render Nothing    
  Left err -> throw $ "Yaml view failed to parse : " ++ err
