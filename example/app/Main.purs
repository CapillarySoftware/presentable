module Main where

import Presentable.ViewParser
import Presentable.Router
import History
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

sampleYamlAbout = 
  "- header:\n\
  \    attributes:\n\
  \      title : 'Presentable / About'\n\
  \    children:\n\
  \      - logo\n\
  \- footer"

render item = ready $ do i <- item
                         b <- body
                         append i b
                         return i
clearFrame = body >>= clear

header _ (Just a) = do
  render $ create ("<header>"++ a.title ++"</header>") >>= css style
  return $ Just { src : "http://static.giantbomb.com/uploads/original/1/17172/1419618-unicorn2.jpg" }
  where 
  style =  { top         : 0
           , left        : 0
           , position    : "fixed"
           , width       : "100%"
           , padding     : "10px 50px"
           , fontFamily  : "sans-serif"
           , color       : "white"
           , zIndex      : 0
           , background  : "black"}

footer _ _ = do
  trace "render footer"
  return Nothing

logo (Just p) _ = do 
  render $ create ("<img src='" ++ p.src ++ "' />") 
    >>= css style
    >>= on "click" \_ _ -> do
      clearFrame  
      pushState {url : "/about", title : "about", "data" :{}}
  return Nothing
  where
  style =  { top      : 10
           , left     : 10
           , zIndex   : 1
           , height   : 18
           , cursor   : "pointer"
           , position : "fixed"}

main = do
  route rs $ flip renderYaml
    $ register "footer" footer
    $ register "header" header
    $ register "logo"   logo
    $ emptyRegistery
  initRoutes
  where rs = [ (Tuple {url : "/index", title : "home",  "data" :{}} sampleYaml)
             , (Tuple {url : "/about", title : "about", "data" :{}} sampleYamlAbout)]