module Presentable.Router(
  route, Url(..), View(..), Route(..)
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

filterRoute rs u d = do 
  let u = u :: Url
  case filter (\x -> fst x == u) rs of
    []    -> pushState {title : "t", url : fst d, "data" : {}}
    (x:_) -> (trace <<< snd) x

defaultRoute rs = case head rs of 
  Nothing -> throwException "Your Routes are empty"
  Just r  -> return r

route :: forall a eff. [Route] -> 
         Eff (  
                reactive  :: Reactive, -- pushState fires reactions
                history   :: History,  -- pushState effects the history object
                trace     :: Trace,    -- temporary until there is the compiler
                err       :: (Exception String) | eff
             ) Subscription
route rs = subscribeStateChange \e -> do  
  defaultRoute rs >>= filterRoute rs (unwrapEventDetail e).state.url
    