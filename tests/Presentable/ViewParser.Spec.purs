module Presentable.ViewParser.Spec where

import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Debug.Trace
import Control.Monad.Eff

hasAFoo = "View : \
        \\n  - Foo"

spec = describe "View Parser" $ do

  itAsync "moo" $ \done -> do
    let p = present "Foo" (\_ -> return $ itIs done) {}
    view p hasAFoo