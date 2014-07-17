module History where

import Data.Foreign.EasyFFI
import Control.Monad.Eff

-- This is the record both sent and returned by History.js
type State d        = {title :: Title, url :: Url, "data" :: { | d }}
type Title          = String
type Url            = String

foreign import data History :: !

type StateUpdater d = forall eff. { | d } -> Title -> Url -> Eff (history :: History | eff) {}

------

pushState' :: forall d. StateUpdater d
pushState' = unsafeForeignProcedure ["d","title","url", ""] "window.history.pushState(d,title,url)"

pushState :: forall eff d. State d -> Eff (history :: History | eff) {}
pushState s = pushState' s."data" s.title s.url

------

replaceState' :: forall d. StateUpdater d
replaceState' = unsafeForeignProcedure ["d","title","url", ""] "window.history.replaceState(d,title,url)"

replaceState :: forall eff d. State d -> Eff (history :: History | eff) {}
replaceState s = replaceState' s."data" s.title s.url

------

getState' :: forall d m. (Monad m) => m { | d }
getState' = unsafeForeignFunction [""] "window.history.state"

-- getTitle :: String
-- getTitle = unsafeForeignFunction [""] "document.title"

-- getUrl :: String
-- getUrl = unsafeForeignFunction [""] "location.pathname"

getState :: forall m. (Monad m) => m State
getState = do
  d <- getState'
  return {title : "getTitle", url : "getUrl", "data" : d}


-- getHash :: forall m. (Monad m) => m String 
-- getHash = unsafeForeignProcedure [""] "History.getHash()"

-- stateChange :: Unit -> Unit
-- stateChange = unsafeForeignProcedure ["fn",""] "History.Adapter.bind(window, 'stateChange', fn)"

goBack :: forall eff. Eff (history :: History | eff) {}
goBack = unsafeForeignProcedure [""] "window.history.back()"


goForward :: forall eff. Eff (history :: History | eff) {}
goForward = unsafeForeignFunction [""] "window.history.forward()"

-- setHistoryOption :: forall eff a. String -> a -> Eff (history :: History | eff) {}
-- setHistoryOption = unsafeForeignFunction ["option", "value", ""] "window.history.options[option] = value"
-- History.options.debug
