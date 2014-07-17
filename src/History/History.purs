module History where

import Data.Foreign.EasyFFI
import Control.Monad.Eff

-- This is the record both sent and returned by History.js
type State d        = {title :: Title, url :: Url, "data" :: { | d }}
type Title          = String
type Url            = String

foreign import data History :: !

type StateUpdater d = forall eff. { | d } -> Title -> Url -> Eff (history :: History | eff) {}

----------

pushState' :: forall d. StateUpdater d
pushState' = unsafeForeignProcedure ["data","title","url", ""] "History.pushState(data,title,url)"

pushState :: forall eff d. State d -> Eff (history :: History | eff) {}
pushState s = pushState' s."data" s.title s.url

----------

replaceState' :: forall d. StateUpdater d
replaceState' = unsafeForeignProcedure ["d","title","url", ""] "History.replaceState(d,title,url)"

replaceState :: forall eff d. State d -> Eff (history :: History | eff) {}
replaceState s = replaceState' s."data" s.title s.url

----------

getState :: forall d m. (Monad m) => m (State d)
getState = unsafeForeignFunction [""] "History.getState()"

----------

getStateByIndex :: forall d m. (Monad m) => Number -> m (State d)
getStateByIndex i = unsafeForeignFunction ["i"] "History.getStateByIndex(i)"

----------

getCurrentIndex :: forall m. (Monad m) => m Number
getCurrentIndex = unsafeForeignFunction [""] "History.getCurrentIndex()"

-- getHash :: forall m. (Monad m) => m String 
-- getHash = unsafeForeignProcedure [""] "History.getHash()"

-- stateChange :: Unit -> Unit
-- stateChange = unsafeForeignProcedure ["fn",""] "History.Adapter.bind(window, 'stateChange', fn)"

goBack :: forall eff. Eff (history :: History | eff) {}
goBack = unsafeForeignFunction [""] "History.back()"

goForward :: forall eff. Eff (history :: History | eff) {}
goForward = unsafeForeignFunction [""] "History.forward()"

-- setOption :: forall a. String -> a -> Unit
-- setOption = unsafeForeignProcedure ["option", "value", ""] "History.options[option] = value"

