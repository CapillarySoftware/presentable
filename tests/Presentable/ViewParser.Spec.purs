module Presentable.ViewParser.Spec where

import qualified Data.Map as M
import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Debug.Trace
import Control.Monad.Eff

spec = describeOnly "View Parser" $ do

  it "if View key is not found, it should throw an Error" $ do
    let wrong = "Vieeww : \n  - Foo"
    let bad   = (flip view) wrong $ present "Foo" (\_ -> trace "wtf") M.empty
    expect bad `toThrow` Error


  itAsync "it should execute the function linked to Foo" 
    $ \done -> do
      let hasAFoo = "View : \n  - Foo"
      (flip view) hasAFoo $ present "Foo" (\_ -> itIs done) M.empty


-- spec = trace "mooo"