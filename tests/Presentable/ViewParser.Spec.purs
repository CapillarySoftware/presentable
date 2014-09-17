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

  itAsync "Top level items fire with registered function" $ \done -> do 
    -- quickCheck $ \name -> do 
    --   ret <- newSTRef false
    --   renderYaml ("- " ++ name) $ register name (\_ _ -> writeSTRef ret true) emptyRegistery

    renderYaml "- item" $ register "item" (item done) emptyRegistery
    where
    item done' _ _ = do
      itIs done'
      return Nothing

-- spec = trace "moo"