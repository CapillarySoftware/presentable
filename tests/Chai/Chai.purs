module Test.Chai where

import Control.Monad.Eff
import Data.Foreign.EasyFFI

foreign import data Chai :: !
data Expect = Expect 

expect :: forall a. a -> Expect
expect = unsafeForeignFunction ["source"] "chai.expect(source)"

type Expectation = forall a e. Expect -> a -> Eff (chai :: Chai | e) {}
bindExpectation x = unsafeForeignProcedure ["expect", "target", ""] $ "expect." ++ x ++ "(target);"

toNotEqual :: Expectation
toNotEqual = bindExpectation "to.not.equal"

toEqual :: Expectation
toEqual = bindExpectation "to.equal"