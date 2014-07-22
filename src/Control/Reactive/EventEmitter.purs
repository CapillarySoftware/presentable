module Control.Reactive.EventEmitter where

import Control.Monad.Eff
import Control.Reactive
import Data.Foreign.EasyFFI
import Debug.Trace

data Event d = Event String {
    bubbles    :: Boolean,
    cancelable :: Boolean,
    detail     :: { | d }
  }

getWindow = unsafeForeignFunction [""] "window"

eventBC n d = Event n {
    bubbles    : true,
    cancelable : true,
    detail     : d
  }

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

foreign import data CustomEvent :: !

foreign import emitOn_
  "function emitOn_(n){                   \
  \  return function(d){                  \
  \    return function(o){                \
  \     return function(){                \
  \        console.log('heil');           \
  \        var e = new CustomEvent(n,d);  \
  \        o.dispatchEvent(e);            \
  \        return o;                      \
  \     };                                \
  \    };                                 \
  \  };                                   \
  \ }" :: forall d o eff. 
          String -> 
          { | d} -> 
          o -> 
          Eff (customEvent :: CustomEvent | eff) o

emitOn (Event n d) o = emitOn_ n d o

foreign import subscribeEventedOn
  "function subscribeEventedOn(n){  \
  \ return function(fn){            \
  \    return function(obj){        \
  \       return function(){        \
  \         console.log('hitler');  \
  \         return obj;             \
  \       };                        \
  \     };                          \
  \  };                             \
  \}" :: forall d a o eff. String -> ((Event d) -> a) -> o -> Eff (customEvent :: CustomEvent | eff) o
