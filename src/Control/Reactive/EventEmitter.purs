module Control.Reactive.EventEmitter where

import Control.Monad.Eff
import Control.Reactive
import Data.Foreign.EasyFFI

type EventName                = String

data Event d                  = Event EventName {
    bubbles    :: Boolean,
    cancelable :: Boolean,
    detail     :: { | d }
  }

eventDMap                     :: forall a b. ({ | a} -> { | b}) -> Event a -> Event b 
eventDMap f (Event n d)       = Event n $ d { detail = (f d.detail) }

eventNMap                     :: forall a. (EventName -> EventName) -> Event a -> Event a
eventNMap f (Event n d)       = Event (f n) d

newEvent                      :: forall d. EventName -> { | d} -> Event d
newEvent n d                  = Event n {
    bubbles    : true,
    cancelable : false,
    detail     : d
  }

getWindow                     = unsafeForeignFunction [""] "window"

unwrapEventDetail (Event n d) = d.detail
unwrapEventName   (Event n d) = n

    -- Shamlessly ripped off from
    -- https://raw.githubusercontent.com/d4tocchini/customevent-polyfill/master/CustomEvent.js

foreign import customEventPolyFill
  "   var CustomEvent;                                                                \
  \  CustomEvent = function(event, params) {                                          \
  \    var evt;                                                                       \
  \    params = params || {                                                           \
  \      bubbles: false,                                                              \
  \      cancelable: false,                                                           \
  \      detail: undefined                                                            \
  \    };                                                                             \
  \    evt = document.createEvent('CustomEvent');                                     \
  \    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);  \
  \    return evt;                                                                    \
  \  };                                                                               \
  \  CustomEvent.prototype = window.Event.prototype;                                  \
  \  window.CustomEvent = CustomEvent;                                                \
  \  function customEventPolyFill(){                                                  \
  \    console.log('This function was born depricated. Welcome to the future.');      \
  \  };" :: forall a. 
            a -> Unit



foreign import emitOn_
  "function emitOn_(n){                   \
  \  return function(d){                  \
  \    return function(o){                \
  \     return function(){                \
  \        var e = new CustomEvent(n,d);  \
  \        o.dispatchEvent(e);            \
  \        return o;                      \
  \     };                                \
  \    };                                 \
  \  };                                   \
  \ }" :: forall d o eff. 
          EventName -> 
          { | d} -> 
          o -> 
          Eff (reactive :: Reactive | eff) o

emitOn (Event n d) o        = emitOn_ n d o



foreign import subscribeEventedOnPrime
  "function subscribeEventedOnPrime(n){\
  \ return function(fn){                  \
  \    return function(obj){              \
  \       return function(){              \
  \         var fnE = function (event) {  \
  \           return fn(event)();         \
  \         };                            \
  \         obj.addEventListener(n, fnE); \
  \         return obj;                   \
  \       };                              \
  \     };                                \
  \  };                                   \
  \}" :: forall d a o eff. 
         EventName -> 
         (d -> Eff (reactive :: Reactive | eff) a) -> 
         o -> 
         Eff (reactive :: Reactive | eff) Subscription

subscribeEventedOn n f o   = subscribeEventedOnPrime n (\e -> 
    f $ newEvent e."type" e."detail" 
  ) o



