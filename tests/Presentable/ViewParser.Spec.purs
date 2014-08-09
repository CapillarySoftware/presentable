module Presentable.ViewParser.Spec where

import qualified Data.Map as M
import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Debug.Trace
import Control.Monad.Eff

spec = describeOnly "View Parser" $ do

  it "if View key is not found, it should throw an Error" $ do
    let bad   = (flip view) "Vieeww : \n  - Foo" 
              $ present "Foo" (\_ -> trace "wtf") M.empty
    expect bad `toThrow` Error


  itAsync "it should execute the function linked to Foo" 
    $ \done -> (flip view) "View : \n  - Foo" 
    $ present "Foo" (\_ -> itIs done) M.empty

  -- it ""
-- spec = trace "mooo"