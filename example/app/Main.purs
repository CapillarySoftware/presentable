module Main where

import Presentable.ViewParser
import Data.Either
import Debug.Trace
import Debug.Foreign

sampleYaml = "- header"

header = fprint "render header"

main = do
  let p = present "header" header emptyRegistery 
  parseAndRender sampleYaml p