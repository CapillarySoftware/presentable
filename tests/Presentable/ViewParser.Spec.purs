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

  itAsync "Top level items fire with registered function" $ \done -> 
    renderYaml "- item" $ register "item" (item done) emptyRegistery

  itAsync "Top level items work if in array" $ \done -> 
    renderYaml "item" $ register "item" (item done) emptyRegistery