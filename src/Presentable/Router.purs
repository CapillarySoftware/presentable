module Presentable.Router where

import Data.Tuple
import Data.Array
import Data.Maybe
import Debug.Trace
import History
import Control.Reactive
import Control.Reactive.EventEmitter
import Control.Monad.Eff 
import Control.Monad.Eff.Exception

type Url    = String
type View   = String
type Route  = Tuple Url View

filterRoute :: forall r eff. [Route] -> { url :: Url | r} -> Route ->
               Eff (  trace    :: Trace,         -- temporary until there is the compiler
                      history  :: History,       -- pushState effects the history object
                      reactive :: Reactive | eff -- pushState fires reactions
                    ) Unit

filterRoute rs s d = case filter (\x ->  fst x == s.url) rs of
  []    -> pushState {title : "t", url : fst d, "data" : {}}
  (x:_) -> (trace <<< snd) x

route rs = subscribeStateChange \e ->
  defaultRoute rs >>= filterRoute rs (state e) 
  where 
    defaultRoute rs = case head rs of 
      Nothing -> throwException "Your Routes are empty"
      Just r  -> return r
    state e = (unwrapEventDetail e).state