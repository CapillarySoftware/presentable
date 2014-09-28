module Main where

import Presentable.ViewParser
import Presentable.Router
import Pixi.DisplayObject.Container.Stage
import Pixi.Detector
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
clearFrame = body >>= clear

header _ (Just a) = do
  render $ create ("<header>" ++ a.title ++ "</header>") >>= css style
  return $ Just { src : "http://www.peoplepulse.com.au/heart-icon.png" }
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


logo (Just p) _ = do 
  render $ create ("<img src='" ++ p.src ++ "' />") 
    >>= css style >>= on "click" click
  return Nothing
  where
  click _ _ = clearFrame >>= \_ -> pushState about
  about = { url : "/about", title : "about", "data" :{} }
  style = { top      : 6
          , left     : 8
          , zIndex   : 1
          , height   : 25
          , cursor   : "pointer"
          , position : "fixed"}  

footer _ _ = do
  trace "render footer"
  return Nothing

main = do
  stage    <- newStage 0x000000
  renderer <- autoDetectRenderer 400 300
  fprint stage
  route rs $ flip renderYaml
    $ register "footer" footer
    $ register "header" header
    $ register "logo"   logo
    $ emptyRegistery
  initRoutes
  where rs = [ (Tuple {url : "/index", title : "home",  "data" :{}} sampleYaml)
             , (Tuple {url : "/about", title : "about", "data" :{}} sampleYamlAbout)]