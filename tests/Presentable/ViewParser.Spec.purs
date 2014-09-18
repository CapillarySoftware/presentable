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
      childYaml :: Yaml
      childYaml = "parent:\n\
                 \  children:\n\
                 \    - child"
      renderChildYaml registry = renderYaml childYaml registry

      childFires done = renderChildYaml
        $ register "parent" (\_ _ -> return Nothing)
        $ register "child"  (item done) emptyRegistery

      recieveParent done = renderYaml childYaml 
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

      recieveParentAndAttributes done = renderYaml (childYaml ++ ":\n\
        \      attributes :\n\
        \        oof : 'oof'\n\
        \        rab : 'rab'")
        $ register "parent" (\_ _ -> return $ Just {foo : "foo", bar : "bar"})
        $ register "child"  (expectPA done) emptyRegistery
        where
        expectPA :: forall p a e. DoneToken -> Linker (foo  :: String, bar  :: String | p)
                                                      (oof  :: String, rab  :: String | a)  
                                                      (chai :: Chai,   done :: Done   | e)
        expectPA done (Just p) (Just a) = do
          expect p `toDeepEqual` {foo : "foo", bar : "bar"}
          expect a `toDeepEqual` {oof : "oof", rab : "rab"}
          itIs done
          return Nothing

    itAsync "fire with registered function" $ childFires

    itAsync "recieve values from the parent" recieveParent

    itAsync "fires with parent and attributes" recieveParentAndAttributes 



