module Presentable.Router where

import Control.Monad.Eff 
import Data.Tuple
import Data.Array
import Data.Maybe
import Debug.Foreign 
import Debug.Trace
import History
import Control.Reactive
import Control.Reactive.EventEmitter
import Control.Monad.Eff.Exception

type Url    = String
type View   = String
type Route  = Tuple Url View

defaultRoute routes = case head routes of 
  Nothing -> throwException "Your Routes are empty"
  Just r  -> return r

route routes = subscribeStateChange \e -> do
  let state = unwrapEventDetail e
  default <- defaultRoute routes
  filterRoute state.state default routes
  where  
    filterRoute :: forall r eff. { url :: Url | r} -> Route -> [Route] -> 
                   Eff (trace :: Trace, history :: History, reactive :: Reactive | eff) Unit
    filterRoute state default routes = case filter (\x -> fst x == state.url) routes of
      []    -> do
        trace "fst default"
        let target = {title : "t", url : (fst default), "data" : {}}
        ftrace target
        pushState target
      (x:_) -> fprint $ snd x

  

