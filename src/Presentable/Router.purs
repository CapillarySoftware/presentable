module Presentable.Router
  ( View(..), Route(..)
  , route
  ) where

import Data.Tuple
import Data.Array
import Data.Maybe
import History
import Control.Reactive
import Control.Reactive.Event
import Control.Monad.Eff 
import Control.Monad.Eff.Exception

type View    = String
type Route a = Tuple (State a) View

defaultRoute :: forall a eff. [Route a] -> Eff (err :: Exception | eff) (State a)
defaultRoute rs = case head rs of 
  Nothing -> throwException $ error "Your Routes are empty"
  Just r  -> return $ fst r

extractUrl e = (unwrapEventDetail e).state.url

route :: forall a eff. [Route a] 
         -> (View -> Eff (reactive :: Reactive, 
                          history  :: History a, 
                          err      :: Exception | eff) Unit)
         -> Eff (reactive :: Reactive,                             
                 history  :: History a,                              
                 err      :: Exception | eff) Subscription  
route rs f = subscribeStateChange \e -> do
  d <- defaultRoute rs
  case filter (\x -> (fst x).url == extractUrl e) rs of
    []    -> pushState d
    (x:_) -> f $ snd x