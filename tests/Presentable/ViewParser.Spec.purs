module Presentable.ViewParser.Spec where

import qualified Data.Map as M
import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Debug.Trace
import Control.Monad.Eff

spec = describe "View Parser" $ do

  it "if View key is not found, it should throw an Error" $ do
    let bad   = (flip view) "Vieeww : \n  - Foo"
              $ present "Foo" (\_ -> trace "wtf") M.empty
    expect bad `toThrow` Error
