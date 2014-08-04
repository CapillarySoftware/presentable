module Presentable.ViewParser.Spec where

import Presentable.ViewParser
import Test.Mocha
import Test.Chai
import Debug.Trace

tiny = "\
  \%YAML 1.2\
  \---\
  \YAML: YAML Ain't Markup Language\
\"

spec = describe "View Parser" $ do
  trace tiny
  expect true `toEqual` true