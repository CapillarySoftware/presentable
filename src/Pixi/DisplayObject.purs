module Pixi.DisplayObject where

import Data.Function
import Control.Monad.Eff
import Pixi.Rectangle
import Pixi.Internal

foreign import data InteractionData :: *
foreign import data Mouse :: !
foreign import data Touch :: !
foreign import data Measure :: !
foreign import data StageReference :: !

class DisplayObject a 

setStageReference :: forall a e. (DisplayObject a) => a -> Eff (displayObjectMutate :: StageReference | e) a
setStageReference = runFn2 method0M "setStageReference"

type InteractionListener eff = forall a b e. (DisplayObject a) => a
  -> (InteractionData -> Eff e b) 
  -> Eff (interaction :: eff | e) a

click          :: InteractionListener Mouse
click          = runFn3 method1M "click"
mouseDown      :: InteractionListener Mouse
mouseDown      = runFn3 method1M "mousedown"
mouseUp        :: InteractionListener Mouse
mouseUp        = runFn3 method1M "mouseup"
mouseOver      :: InteractionListener Mouse
mouseOver      = runFn3 method1M "mouseover"
mouseOut       :: InteractionListener Mouse
mouseOut       = runFn3 method1M "mouseout"
mouseUpOutside :: InteractionListener Mouse
mouseUpOutside = runFn3 method1M "mouseupoutside"

tap             :: InteractionListener Touch
tap             = runFn3 method1M "tap"
touchStart      :: InteractionListener Touch
touchStart      = runFn3 method1M "touchstart"
touchEnd        :: InteractionListener Touch
touchEnd        = runFn3 method1M "touchend"
touchEndOutside :: InteractionListener Touch
touchEndOutside = runFn3 method1M "touchendoutside"

type Instrument = forall a e. (DisplayObject a) => a
  -> Eff (measure :: Measure | e) Rectangle

getBounds :: Instrument
getBounds = runFn2 method0 "getBounds"

getLocalBounds :: Instrument
getLocalBounds = runFn2 method0 "getLocalBounds"

