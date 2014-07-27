module History
  ( getState, pushState, replaceState    
  , goBack, goForward, goState
  , subscribeStateChange
  , History(..), State(..)
  ) where

import Debug.Foreign
import Data.Foreign.EasyFFI
import Control.Monad.Eff
import Control.Reactive
import Control.Reactive.EventEmitter

type Title                  = String
type Url                    = String

--- Record representing browser state 
--- Passed to and returned by history
type State d                = {
    "data" :: { | d },
    title  :: Title, 
    url    :: Url    
  }

foreign import data History :: !

  

getData                     = unsafeForeignFunction [""] "window.history.state"
getTitle                    = unsafeForeignFunction [""] "document.title"
getUrl                      = unsafeForeignFunction [""] "location.pathname"

getState                    :: forall m d. (Monad m) => m (State d)
getState                    = do d <- getData
                                 t <- getTitle
                                 u <- getUrl
                                 return { title : t, url : u, "data" : d }

stateUpdaterNative          :: forall d eff. String ->
                             { | d } -> -- State.data
                             Title   -> -- State.title 
                             Url     -> -- State.url
                             Eff (history :: History | eff) Unit
stateUpdaterNative        x = unsafeForeignProcedure ["d","title","url", ""] $ x ++ "(d,title,url)"

statechange                 = "statechange"

emitStateChange           s = emit $ newEvent statechange { state : s }

pushState'                  = stateUpdaterNative "window.history.pushState"
pushState                 s = do  
  emitStateChange s
  pushState'      s."data" s.title s.url  
  
replaceState'               = stateUpdaterNative "window.history.replaceState"
replaceState              s = do
  emitStateChange s
  replaceState'   s."data" s.title s.url


subscribeStateChange        :: forall a b eff. 
                            (Event a -> Eff (reactive :: Reactive | eff) b) -> 
                            Eff (reactive :: Reactive | eff) Subscription
subscribeStateChange        = subscribeEvented statechange


goBack_                     :: forall eff. Eff (history :: History | eff) Unit
goBack_                     = unsafeForeignFunction [""]        "window.history.back()"
goBack                      = do 
  emitStateChange "back"
  goBack_

goForward_                  :: forall eff. Eff (history :: History | eff) Unit
goForward_                  = unsafeForeignFunction  [""]        "window.history.forward()"
goForward                   = do
  emitStateChange "forward"
  goForward_

goState_                    :: forall eff. Number -> Eff (history :: History | eff) Unit
goState_                    = unsafeForeignProcedure ["dest",""] "window.history.go(dest)"
goState                   x = do 
  emitStateChange $ "goState(" ++ (show x) ++ ")"
  goState_ x