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

--
-- —— Registery ——
--

register :: forall a p e. String -> Linker a p e -> Registry a p e -> Registry a p e
register = M.insert

emptyRegistery :: forall a p e. Registry a p e
emptyRegistery = M.empty

--
-- —— Run Time Checks ——
--

throw = throwException <<< error

foreign import isString 
  "function isString(x){\
  \ return (typeof x === 'string');\
  \}" :: Foreign -> Boolean

foreign import unsafeToString
  "function unsafeToString(s){ return s; }" :: Foreign -> String

foreign import getNameImpl   
  "function getNameImpl(x){ return Object.keys(x)[0]; }" :: Foreign -> String  
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
  \ if(!isString(x) && x[getName(x)] && x[getName(x)].children){\
  \   return Just(x[getName(x)].children);\
  \ }else{ return Nothing; }\
  \}" :: Fn3 (Foreign -> Maybe Foreign) (Maybe Foreign) Foreign (Maybe [Foreign])
getChildren :: Foreign -> Maybe [Foreign]
getChildren = runFn3 getChildrenImpl Just Nothing

--
-- —— From Foreign to Presentables ——
--

makePresentable :: forall a p e. Registry a p e -> Foreign -> Eff (err :: Exception | e) (Presentable a p e)
makePresentable r node = let 
  returnP l            = Presentable l (getAttributes node)
  handleC l Nothing    = return $ returnP l Nothing 
  handleC l (Just ns)  = traverse (makePresentable r) ns >>= Just >>> returnP l >>> return
  name                 = getName node  
  in case M.lookup name r of
    Nothing -> throw $ name ++ " not found in registry"
    Just l  -> handleC l $ getChildren node        

parse :: forall a p e. Foreign -> Registry a p e-> Eff (err :: Exception | e) [Presentable a p e]
parse x r = parse' >>= \p -> case p of 
  Left ns -> return ns 
  Right n -> return [n]
  where -- I hear by dub thee, the "run time has no type checks" hack of elegance
  parse' = if isArray x
           then traverse (makePresentable r) (unsafeFromForeign x) >>= Left  >>> return
           else           makePresentable r  (unsafeFromForeign x) >>= Right >>> return

--
-- —— From Presentables to Render ——
--

render :: forall a p e. [Presentable a p e] -> Eff e Unit
render ns = let
  r :: forall a p e. Parent p -> Presentable a p e -> Eff e (Parent p)
  r mc (Presentable l a Nothing)   = l mc a -- Execute the Linker, entry point for components
  r mc (Presentable l a (Just ps)) = do -- Walk the children and fire all Linkers
    mc' <- r mc (Presentable l a Nothing)
    traverse (r mc') ps -- Recusively excute all child linkers passing parent return
    return mc'
  in traverse_ (r Nothing) ns

--
-- —— From a Yaml to Render ——
--

foreign import parseYaml
  "function parseYaml (left, right, yaml){\
  \   try{ return right(jsyaml.safeLoad(yaml)); }\
  \   catch(e){ return left(e.toString()); }\
  \}" :: forall a. Fn3 (String -> a) (Foreign -> a) Yaml a

renderYaml :: forall a p e. 
  Yaml -> Registry p a (err :: Exception | e) -> Eff (err :: Exception | e) Unit
renderYaml yaml r = case yamlToForeign yaml of
  Right v  -> parse v r >>= render    
  Left err -> throw $ "Yaml view failed to parse : " ++ err
  where
  yamlToForeign :: Yaml -> Either String Foreign
  yamlToForeign = runFn3 parseYaml Left Right