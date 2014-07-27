module Control.Reactive.Timer where

import Control.Monad.Eff
import Data.Foreign.EasyFFI

foreign import data Timer     :: !
foreign import data Timeout   :: *
foreign import data Interval  :: *

foreign import timeout 
  "function timeout(time){                     \
  \   return function(fn){                     \
  \     return function(){                     \
  \       return window.setTimeout(function(){ \
  \         fn()();                            \
  \       }, time);                            \
  \     };                                     \
  \   };                                       \
  \ }" :: forall a d eff. 
          Number ->  
          (d -> Eff (timer :: Timer | eff) a) -> 
          Eff (timer :: Timer | eff) Timeout

foreign import clearTimeout 
  "function clearTimeout(timer){\
  \   return function(){\
  \     return window.clearTimeout(timer);\
  \   };\
  \ }" :: forall eff. 
          Timeout -> 
          Eff (timer :: Timer | eff) Unit

foreign import interval
  "function interval(time){                     \
  \   return function(fn){                      \
  \     return function(){                      \
  \       return window.setInterval(function(){ \
  \         fn()();                             \
  \       }, time);                             \
  \     };                                      \
  \   };                                        \
  \ }" :: forall a d eff.
          Number ->
          (d -> Eff (timer :: Timer | eff) a) ->
          Eff (timer :: Timer | eff) Interval

foreign import clearInterval
  "function clearInterval(timer){\
  \   return function(){\
  \     return window.clearInterval(timer);\
  \   };\
  \ }" :: forall eff. 
          Interval -> 
          Eff (timer :: Timer | eff) Unit