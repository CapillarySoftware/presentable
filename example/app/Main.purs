module Main where

import Presentable.ViewParser
import Presentable.Router
import Data.Either
import Data.Tuple
import Data.Maybe
import Debug.Trace
import Debug.Foreign
import Control.Monad.JQuery

sampleYaml = 
  "- header:\n\
  \    attributes:\n\
  \      title : 'Presentable'\n\
  \    children:\n\
  \      - logo\n\
  \- footer"

header _ (Just a) = do
  ready $ do h <- createHeader
             b <- body
             append h b 
  return $ Just { bar : "Bar"}
  where 
  createHeader = create ("<header>"++ a.title ++"</header>") 
    >>= css { top         : 0
            , left        : 0
            , position    : "fixed"
            , width       : "100%"
            , height      : "50px"
            , color       : "white"
            , background  : "black"}

footer _ _ = do
  trace "render footer"
  return Nothing

logo   p _ = do 
  trace "render logo"
  fprint p
  return Nothing

main = do
  route rs $ flip renderYaml
    $ register "footer" footer
    $ register "header" header
    $ register "logo"   logo
    $ emptyRegistery
  initRoutes
  where rs = [ (Tuple {url : "/index", title : "home",  "data" :{}} sampleYaml)
             , (Tuple {url : "/about", title : "about", "data" :{}} sampleYaml)]