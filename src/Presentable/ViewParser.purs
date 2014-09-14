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
type Registry a     = M.Map String a
type Wrap l a       = [Presentable l a]
type Attributes l a = Maybe { children :: (Wrap l a) | a}

newtype Linker p l a b e = Linker 
   (Maybe p -> Attributes (Linker p l a b e) a -> Eff e b)

instance bindLinker :: (Monad m) => Bind (Linker p l a b e) where 
  (>>=) x f = Linker f

runLinker :: forall p l a b e. Linker p l a b e 
  -> Maybe p -> Attributes (Linker p l a b e) a -> Eff e b
runLinker (Linker f) = f 

data Presentable l a
  = Node l (Attributes l a)
  | Wrap (Wrap l a)

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

makeNode :: forall l a e. Registry l -> String -> Eff (err :: Exception | e) (Presentable l a)
makeNode r node = case M.lookup (name node) r of
  Nothing -> throw $ name node ++ " not found in registry"
  Just l  -> return <<< Node l <<< getAttributes $ node
  where name node = if isString node
                    then node
                    else getName node

parse :: forall l a e. Foreign -> Registry l -> Eff (err :: Exception, trace :: Trace | e) (Presentable l a)
parse x r = if isArray x
            then return <<< Wrap =<< (traverse (makeNode r) $ unsafeFromForeign x)
            else makeNode r <<< unsafeFromForeign $ x

register :: forall a. String -> a -> Registry a -> Registry a
register = M.insert

-- render :: forall p e a l b y x. Maybe p 
--   -> Presentable (Maybe p -> Attributes (Maybe p -> Attributes l a) a -> x) a -> Eff e b

-- render p (Node l (Just a@{ children = (ns) })) = do
-- --   -- p' <- l p a 
--   render p $ Wrap ns
-- renderNode :: forall p l a b e. 
--   Maybe p -> Presentable (Maybe p -> Attributes (Maybe p -> Attributes (Maybe p -> Attributes (Maybe p -> Attributes (Maybe p -> Attributes l a -> Eff e b) a -> Eff e b) a -> Eff e b) a -> Eff e b) a -> Eff e b) a -> Eff e b
-- renderNode p (Node l a) = l p a



-- renderWrap p (Wrap [n]) = renderNode p n
-- renderWrap p (Wrap (n:ns))  = do 
--   renderNode p n
--   renderWrap p <<< Wrap $ ns



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
  -- Right v  -> parse v registry >>= renderWrap Nothing
  -- Right v -> parse v registry >>= fprint
  Right v -> fprint v
  Left err -> throw $ "Yaml view failed to parse : " ++ err
