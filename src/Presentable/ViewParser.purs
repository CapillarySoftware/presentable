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
import Debug.Trace 
import Debug.Foreign

type Yaml              = String
type Registry a p e    = M.Map String (Linker a p e)
type Attributes a      = Maybe { | a}
type Parent p          = Maybe { | p}
type Linker a p e      = Parent p -> Attributes a -> Eff e (Parent p)

data Presentable a p e = Presentable (Linker a p e) (Attributes a) (Maybe [Presentable a p e])

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
  \ if(!isString(x) && x[getName(x)] && x[getName(x)].attributes){\
  \   return Just(x[getName(x)].attributes);\
  \ }else{ return Nothing; }\
  \}" :: forall a b. Fn3 (a -> Maybe a) (Maybe a) Foreign (Maybe { | b})

getAttributes :: forall a. Foreign -> Attributes a
getAttributes = runFn3 getAttributesImpl Just Nothing

foreign import getChildrenImpl
  "function getChildrenImpl(Just, Nothing, x){\
  \ if(!isString(x) && x[getName(x)] && x[getName(x)].children && x[getName(x)].children.length){\
  \   return Just(x[getName(x)].children);\
  \ }else{ return Nothing; }\
  \}" :: Fn3 (Foreign -> Maybe Foreign) (Maybe Foreign) Foreign (Maybe [Foreign])

getChildren :: Foreign -> Maybe [Foreign]
getChildren = runFn3 getChildrenImpl Just Nothing

makePresentable :: forall a p e. Registry a p e -> Foreign -> Eff (err :: Exception | e) (Presentable a p e)
makePresentable r node = case M.lookup (getName node) r of
  Nothing -> throw $ getName node ++ " not found in registry"
  Just l  -> case getChildren node of 
    Nothing -> return $ Presentable l (getAttributes node) Nothing 
    Just ss -> traverse (makePresentable r) ss >>= Just >>> Presentable l (getAttributes node) >>> return

parse :: forall a p e. 
  Foreign -> Registry a p e-> Eff (err :: Exception | e) (Either [Presentable a p e] (Presentable a p e))
parse x r = if isArray x
            then traverse (makePresentable r) (unsafeFromForeign x) >>= Left  >>> return
            else           makePresentable r  (unsafeFromForeign x) >>= Right >>> return

register :: forall a p e. String -> Linker a p e -> Registry a p e -> Registry a p e
register = M.insert

render' :: forall a p e. Parent p -> Presentable a p e -> Eff e (Parent p)
render' mc (Presentable l a Nothing)   = l mc a
render' mc (Presentable l a (Just ps)) = do
  mc' <- l mc a
  traverse (render' mc') ps
  return mc'

render :: forall a p e. Either [Presentable a p e] (Presentable a p e) -> Eff e Unit
render (Left ns) = traverse_ (render' Nothing) ns
render (Right n) = render (Left [n])

emptyRegistery :: forall a p e. Registry a p e
emptyRegistery = M.empty

foreign import parseYamlImpl
  "function parseYamlImpl (left, right, yaml){\
  \   try{ return right(jsyaml.safeLoad(yaml)); }\
  \   catch(e){ return left(e.toString()); }\
  \}" :: forall a. Fn3 (String -> a) (Foreign -> a) Yaml a

yamlToView :: Yaml -> Either String Foreign
yamlToView = runFn3 parseYamlImpl Left Right

renderYaml :: forall a p e. 
  Yaml -> Registry p a (err :: Exception | e) -> Eff (err :: Exception | e) Unit
renderYaml yaml r = case yamlToView yaml of
  Right v  -> parse v r >>= render    
  Left err -> throw $ "Yaml view failed to parse : " ++ err
