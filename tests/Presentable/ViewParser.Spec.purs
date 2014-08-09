module Presentable.ViewParser.Spec where

import qualified Data.Map as M
import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Debug.Trace
import Control.Monad.Eff

hasAFoo = "View : \
        \\n  - Foo"

spec = describeOnly "View Parser" $ do

  itAsync "moo" $ \done -> do
    let p = present "Foo" (\_ -> itIs done) M.empty
    view p hasAFoo

-- spec = trace "mooo"