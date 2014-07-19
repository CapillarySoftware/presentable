module Control.Monad.Event where

import Control.Monad.Eff
import Control.Reactive
import Data.Foreign.EasyFFI
import Debug.Trace

data Event d = Event String { | d }

foreign import window :: forall a. a

foreign import emitOn_
  "function emitOn_(n){                   \
  \  return function(d){                  \
  \    return function(o){                \
  \      return function(){               \
  \        var e = new CustomEvent(n,d);  \
  \        o.dispatchEvent(e);            \
  \      };                               \
  \    };                                 \
  \  };                                   \
  \ }" :: forall d o. String -> d -> o -> Unit
emitOn :: forall o. Event -> o -> Unit
emitOn (Event n d) o = emitOn_ n d o

subscribeEventedOn :: forall d a o. String -> ((Event d) -> a) -> o
subscribeEventedOn = unsafeForeignProcedure ["name", "obj", "fn"] "obj.addEventListener(name, fn)"
