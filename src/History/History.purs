module History where

import Data.Foreign.EasyFFI
import Control.Monad.Eff

type Title        = String
type Url          = String
type State        = forall a. {title :: Title, url :: Url | a}
type Data         = forall a. { | a}
type StateUpdater = Data -> Title -> Url -> Unit

foreign import data History :: !

foreign import getData 
  "function getData(state){ return state['data']; }" 
  :: forall a b. { | a} -> b

unwrapState :: StateUpdater -> State -> Unit
unwrapState f s = f (getData s) s.title s.url

pushState' :: StateUpdater
pushState' = unsafeForeignProcedure ["data","title","url"] "History.pushState(data,title,url)"
pushState :: State -> Unit
pushState = unwrapState pushState'

replaceState' :: StateUpdater
replaceState' = unsafeForeignProcedure ["data","title","url"] "History.replaceState(data,title,url)"
replaceState :: State -> Unit
replaceState = unwrapState replaceState'

getState :: forall m. (Monad m) => m State
getState = unsafeForeignProcedure [""] "History.getState()"

getStateByIndex :: Number -> State
getStateByIndex i = unsafeForeignProcedure ["i", ""] "History.getStateByIndex(i)"

getCurrentIndex :: Number 
getCurrentIndex = unsafeForeignProcedure [""] "History.getCurrentIndex()"

getHash :: forall m. (Monad m) => m String 
getHash = unsafeForeignProcedure [""] "History.getHash()"

stateChange :: Unit -> Unit
stateChange = unsafeForeignProcedure ["fn",""] "History.Adapter.bind(window, 'stateChange', fn)"

goBack :: Unit
goBack = unsafeForeignProcedure [""] "History.back()"

goForward :: Unit
goForward = unsafeForeignProcedure [""] "History.forward()"

setOption :: forall a. String -> a -> Unit
setOption = unsafeForeignProcedure ["option", "value", ""] "History.options[option] = value"

