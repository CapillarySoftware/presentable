module Pixi.DisplayObject where

import Data.Function
import Control.Monad.Eff
import Pixi.Rectangle
import Pixi.Internal

foreign import data InteractionData :: *
foreign import data Mouse :: !
foreign import data Touch :: !
foreign import data Measure :: !
foreign import data StageMutate :: !

class DisplayObject a 

setStageReference :: forall a e. (DisplayObject a) => a ->  Eff (stageMutate :: StageMutate | e) a
setStageReference = runFn2 method0M "setStageReference"

type InteractionListener eff e = forall a b. (DisplayObject a) => a
  -> (InteractionData -> Eff e b) 
  -> Eff eff a

type MouseInteractionListener = forall e. InteractionListener (interaction :: Mouse | e) e

click          :: MouseInteractionListener
click          = runFn3 method1 "click"
mouseDown      :: MouseInteractionListener
mouseDown      = runFn3 method1 "mousedown"
mouseUp        :: MouseInteractionListener
mouseUp        = runFn3 method1 "mouseup"
mouseOver      :: MouseInteractionListener
mouseOver      = runFn3 method1 "mouseover"
mouseOut       :: MouseInteractionListener
mouseOut       = runFn3 method1 "mouseout"
mouseUpOutside :: MouseInteractionListener
mouseUpOutside = runFn3 method1 "mouseupoutside"

type TouchInteractionListener = forall e. InteractionListener (interaction :: Touch | e) e

tap             :: TouchInteractionListener
tap             = runFn3 method1 "tap"
touchStart      :: TouchInteractionListener
touchStart      = runFn3 method1 "touchstart"
touchEnd        :: TouchInteractionListener
touchEnd        = runFn3 method1 "touchend"
touchEndOutside :: TouchInteractionListener
touchEndOutside = runFn3 method1 "touchendoutside"

type Instrument = forall a e. (DisplayObject a) => a
  -> Eff (measure :: Measure | e) Rectangle

getBounds :: Instrument
getBounds = runFn2 method0 "getBounds"

getLocalBounds :: Instrument
getLocalBounds = runFn2 method0 "getBounds"

