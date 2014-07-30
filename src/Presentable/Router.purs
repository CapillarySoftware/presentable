module Presentable.Router
  ( Url(..), View(..), Route(..)
  , route
  ) where

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

defaultRoute rs = case head rs of 
  Nothing -> throwException "Your Routes are empty"
  Just r  -> return r

extractUrl e = (unwrapEventDetail e).state.url

route :: forall a eff. [Route] -> 
         Eff (            -- pushState fires reactions
                reactive  :: Reactive, 
                          -- pushState effects the history object
                history   :: History,                 
                          -- temporary until there is the compiler
                trace     :: Trace,                   
                          -- a runtime exception is thrown if no routes are passed
                err       :: (Exception String) | eff 
             ) Subscription         
route rs = subscribeStateChange \e -> do 
  d <- defaultRoute rs
  case filter (\x -> fst x == (extractUrl e)) rs of
    []    -> pushState {title : "t", url : fst d, "data" : {}}
    (x:_) -> (trace <<< snd) x