module Presentable.ViewParser.Spec where

import qualified Data.Map as M
import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Test.QuickCheck
import Data.Maybe
import Debug.Trace
import Control.Monad.Eff
import Control.Monad.ST

sampleYaml = 
  "- header:\n\
  \    attributes:\n\
  \      foo : 'foo'\n\
  \    children:\n\
  \      - logo\n\
  \- footer"

spec = describe "ViewParser" $ do
  let item done _ _ = itIs done >>= \_ -> return Nothing

  describe "Top level items execute" $ do

    itAsync "fire with registered function" $ \done -> 
      renderYaml "- item" $ register "item" (item done) emptyRegistery

    itAsync "if in array" $ \done -> 
      renderYaml "item" $ register "item" (item done) emptyRegistery

    let 
      recieveAttr done = renderYaml yaml 
        $ register "item" (expectAttrs done) emptyRegistery
        where
        expectAttrs :: forall p a e. DoneToken -> Linker p (foo  :: String, bar  :: String | a) 
                                                           (chai :: Chai,   done :: Done   | e)
        expectAttrs done _ (Just a) = do
          expect a.foo `toEqual` "foo"
          expect a.bar `toEqual` "bar"
          itIs done
          return Nothing
        yaml :: Yaml
        yaml = "item:\n\
              \  attributes:\n\
              \    foo : 'foo'\n\
              \    bar : 'bar'"
    itAsync "Top level items recieve attributes" recieveAttr

  describe "Children" $ do 
    let 
      recieveParent done = renderYaml yaml 
        $ register "parent" (\_ _ -> return $ Just {foo : "foo", bar : "bar"})
        $ register "child"  (expectParents done) emptyRegistery
        where
        expectParents :: forall p a e. DoneToken -> Linker (foo  :: String, bar  :: String | p) 
                                                         a (chai :: Chai,   done :: Done   | e)
        expectParents done (Just p) _ = do
          expect p.foo `toEqual` "foo"
          expect p.bar `toEqual` "bar"
          itIs done
          return Nothing
        yaml :: Yaml
        yaml = "parent:\n\
               \  children:\n\
               \    - child"
               
    itAsync "fire with registered function" recieveParent

