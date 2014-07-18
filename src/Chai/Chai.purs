module Test.Chai where

import Control.Monad.Eff
import Data.Foreign.EasyFFI

foreign import data Chai :: !
data Expect = Expect 

expect :: forall a. a -> Expect
expect = unsafeForeignFunction ["source"] "chai.expect(source)"

type Expectation = forall a e. Expect -> a -> Eff (chai :: Chai | e) {}
bindExpectation x = unsafeForeignProcedure ["expect", "target", ""] $ "expect." ++ x ++ "(target);"

toEqual :: Expectation
toEqual = bindExpectation "to.equal"
toNotEqual :: Expectation
toNotEqual = bindExpectation "to.not.equal"

toDeepEqual :: Expectation
toDeepEqual = bindExpectation "to.deep.equal"
toNotDeepEqual :: Expectation
toNotDeepEqual = bindExpectation "to.not.deep.equal"

toEql :: Expectation
toEql = bindExpectation "to.eql"
toNotEql :: Expectation
toNotEql = bindExpectation "to.not.eql"

toBeAbove :: Expectation
toBeAbove = bindExpectation "to.be.above"
toNotBeAbove :: Expectation
toNotBeAbove = bindExpectation "to.not.be.above"

toBeAtLeast :: Expectation
toBeAtLeast = bindExpectation "to.be.at.least"
toNotBeAtLeast :: Expectation
toNotBeAtLeast = bindExpectation "to.not.be.at.least"

toBeBelow :: Expectation
toBeBelow = bindExpectation "to.be.below"
toNotBeBelow :: Expectation
toNotBeBelow = bindExpectation "to.not.be.below"

toBeAtMost :: Expectation
toBeAtMost = bindExpectation "to.be.at.most"
toNotBeAtMost :: Expectation
toNotBeAtMost = bindExpectation "to.not.be.at.most"

toInclude :: Expectation
toInclude = bindExpectation "to.include"
toNotInclude :: Expectation
toNotInclude = bindExpectation "to.not.include"



