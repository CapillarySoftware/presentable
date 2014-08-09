module Presentable.Router
  ( Url(..), View(..), Route(..)
  , route
  ) where

import Data.Tuple
import Data.Array
import Data.Maybe
import History
import Control.Reactive
import Control.Reactive.EventEmitter
import Control.Monad.Eff 
import Control.Monad.Eff.Exception

type Url        = String
type View       = String
type Route a    = Tuple (State a) View

defaultRoute    :: forall a eff. [Route a] -> Eff (err :: Exception | eff) (State a)
defaultRoute rs = case head rs of 
  Nothing -> throwException $ error "Your Routes are empty"
  Just r  -> return $ fst r

extractUrl e    = (unwrapEventDetail e).state.url

route           :: forall a eff. 
                   [Route a] -> 
                   (View -> Eff (reactive :: Reactive, 
                                 history  :: History, 
                                 err      :: Exception | eff) Unit) -> 
                        -- pushState will fire a reaction 
                   Eff (reactive :: Reactive,                             
                        -- pushState will effect history 
                        history  :: History,                              
                        -- this occurs if [Route] is emtpy 
                        err      :: Exception | eff) Subscription  

route rs f      = subscribeStateChange \e -> do
  d <- defaultRoute rs
  case filter (\x -> (fst x).url == extractUrl e) rs of
    []    -> pushState d
    (x:_) -> f $ snd x