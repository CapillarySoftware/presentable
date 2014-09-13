module Main where

import Presentable.ViewParser
import Data.Either
import Debug.Trace
import Debug.Foreign

sampleYaml = 
  "- header\n\
  \- footer"

header _ = fprint "render header"
footer _ = fprint "render footer"

main = do 
  let registry  = register "header" header emptyRegistery 
  -- let registry' =  register "footer" footer emptyRegistery
  parseAndRender sampleYaml registry