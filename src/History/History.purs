module History where

import Debug.Foreign
import Data.Foreign.EasyFFI
import Control.Monad.Eff
import Control.Reactive

--- Record representing browser state 
--- Passed to and returned by history
type State d               = {
    title  :: Title, 
    url    :: Url, 
    "data" :: { | d }
  }
type Title                 = String
type Url                   = String

foreign import data History:: !

------

getData                    :: forall d m. (Monad m) => m { | d }
getData                    = unsafeForeignFunction [""] "window.history.state"

getTitle                   :: forall m. (Monad m) => m String
getTitle                   = unsafeForeignFunction [""] "document.title"

getUrl                     :: forall m. (Monad m) => m String
getUrl                     = unsafeForeignFunction [""] "location.pathname"

getState                   :: forall m d. (Monad m) => m (State d)
getState                   = do t <- getTitle
                                u <- getUrl
                                d <- getData
                                return { title : t, url : u, "data" : d }

------

type StateUpdaterNative d   = forall eff. 
                            Title   -> -- State.title 
                            Url     -> -- State.url
                            { | d } -> -- State.data
                            Eff (history :: History | eff) {}

type StateUpdater d        = forall eff d. 
                           State d -> 
                           Eff (history :: History | eff) {}

pushState'                 :: forall d. StateUpdaterNative d
pushState'                 = unsafeForeignProcedure ["title","url","d", ""] "window.history.pushState(d,title,url)"

pushState                  :: forall eff d. State d -> Eff (history :: History | eff) {}
pushState s                = pushState' s.title s.url s."data"

replaceState'              :: forall d. StateUpdaterNative d
replaceState'              = unsafeForeignProcedure ["d","title","url", ""] "window.history.replaceState(d,title,url)"

replaceState               :: forall eff d. State d -> Eff (history :: History | eff) {}
replaceState s             = replaceState' s.title s.url s."data"

------

goBack                     :: forall eff. Eff (history :: History | eff) {}
goBack                     = unsafeForeignFunction [""] "window.history.back()"

goForward                  :: forall eff. Eff (history :: History | eff) {}
goForward                  = unsafeForeignFunction [""] "window.history.forward()"

go                         :: forall eff. Number -> Eff (history :: History | eff) {}
go                         = unsafeForeignProcedure ["dest",""] "window.history.go(dest)"

------
