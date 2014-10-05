module Presentable.ViewParser.Spec where

import qualified Data.Map as M
import Presentable
import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Test.QuickCheck
import Data.Maybe
import Debug.Trace
import Control.Monad.Eff
import Control.Monad.ST
import Debug.Trace 
import Debug.Foreign

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
        expectAttrs :: forall p a e. DoneToken -> Linker   (foo  :: String, bar  :: String | a) p
                                                           (chai :: Chai,   done :: Done   | e)
        expectAttrs done (Just a) _ = do
          expect a `toDeepEqual` {foo : "foo", bar : "bar"}
          itIs done
          return Nothing
        yaml = "item:\n\
              \  attributes:\n\
              \    foo : 'foo'\n\
              \    bar : 'bar'"

    itAsync "Top level items recieve attributes" recieveAttr

  describe "Children" $ do 

    let 
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
        expectParents done _ (Just p) = do
          expect p `toDeepEqual` {foo : "foo", bar : "bar"}
          itIs done
          return Nothing

      childYamlWAttrs = childYaml ++ ":\n\
        \        attributes :\n\
        \          oof : 'oof'\n\
        \          rab : 'rab'"
      recieveParentAndAttributes done = renderYaml childYamlWAttrs
        $ register "parent" (\_ _ -> return $ Just {foo : "foo", bar : "bar"})
        $ register "child"  (expectPA done) emptyRegistery
        where
        expectPA :: forall p a e. DoneToken -> Linker (oof  :: String, rab  :: String | a)
                                                      (foo  :: String, bar  :: String | p)
                                                      (chai :: Chai,   done :: Done   | e)
        expectPA done (Just a) (Just p) = do
          expect p `toDeepEqual` {foo : "foo", bar : "bar"}
          expect a `toDeepEqual` {oof : "oof", rab : "rab"}
          itIs done
          return Nothing

    itAsync "fire with registered function"    childFires
    itAsync "recieve values from the parent"   recieveParent
    itAsync "fires with parent and attributes" recieveParentAndAttributes 



