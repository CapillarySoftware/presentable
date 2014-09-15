module Presentable.ViewParser 
  ( Yaml(..), Registry(..), Attributes(..), Linker(..), Presentable(..)
  , renderYaml, register, emptyRegistery
  ) where

import qualified Data.Map as M
import Data.Either
import Data.Maybe
import Data.Function
import Data.Foreign
import Data.Traversable
import Data.Foldable
import Control.Monad.Eff
import Control.Monad.Eff.Exception

type Yaml              = String
type Registry a c e    = M.Map String (Linker a c e)
type Attributes a c e  = Maybe { children :: [Presentable a c e] | a}
type Linker a c e      = Maybe c -> Attributes a c e -> Eff e (Maybe c)

data Presentable a c e = Presentable (Linker a c e) (Attributes a c e) (Maybe [Presentable a c e])

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

makePresentable :: forall a c e. Registry a c e -> Foreign -> Eff (err :: Exception | e) (Presentable a c e)
makePresentable r node = do
  let name = getName node 
  case M.lookup name r of
    Nothing -> throw $ name ++ " not found in registry"
    Just l  -> case getChildren node of 
      Nothing -> return $ Presentable l (getAttributes node) Nothing
      Just ss -> traverse (makePresentable r) ss >>= Just >>> Presentable l (getAttributes node) >>> return

parse :: forall a c e. 
  Foreign -> Registry a c e-> Eff (err :: Exception | e) (Either [Presentable a c e] (Presentable a c e))
parse x r = if isArray x
            then traverse (makePresentable r) (unsafeFromForeign x) >>= Left  >>> return
            else           makePresentable r  (unsafeFromForeign x) >>= Right >>> return

register :: forall a c e. String -> Linker a c e -> Registry a c e -> Registry a c e
register = M.insert

render' :: forall a c e. Maybe c -> Presentable a c e -> Eff e (Maybe c)
render' mc (Presentable l a Nothing)   = l mc a
render' mc (Presentable l a (Just ps)) = do
  mc' <- l mc a
  traverse (render' mc') ps
  return mc'

render :: forall a c e. Either [Presentable a c e] (Presentable a c e) -> Eff e Unit
render (Left ns) = traverse_ (render' Nothing) ns
render (Right n) = render (Left [n])

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
  Yaml -> Registry a c (err :: Exception | e) -> Eff (err :: Exception | e) Unit
renderYaml yaml r = case yamlToView yaml of
  Right v  -> parse v r >>= render    
  Left err -> throw $ "Yaml view failed to parse : " ++ err
