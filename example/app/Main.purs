module Main where

import Presentable.ViewParser
import Data.Either
import Data.Maybe
import Debug.Trace
import Debug.Foreign

sampleYaml = 
  "- header:\n\
  \    attributes:\n\
  \      foo : 'foo'\n\
  \    children:\n\
  \      - logo\n\
  \- footer"

header _ a = do
  trace "render header"
  fprint a
  return $ Just { bar : "Bar"}

footer _ _ = do
  trace "render footer"
  return Nothing

logo   p _ = do 
  trace "render logo"
  fprint p
  return Nothing

main = renderYaml sampleYaml
     $ register "footer" footer
     $ register "header" header
     $ register "logo"   logo
     $ emptyRegistery