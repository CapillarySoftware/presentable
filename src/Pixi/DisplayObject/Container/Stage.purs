module Pixi.DisplayObject.Container.Stage where

import Pixi.Internal
import Pixi.Point
import Pixi.DisplayObject
import Pixi.DisplayObject.Container
import Data.Foreign.OOFFI
import Control.Monad.Eff

foreign import data Stage :: *
foreign import data Color :: !
type ColorHex = Number

instance displayObjectStage :: DisplayObject Stage
instance displayObjectContainerStage :: DisplayObjectContainer Stage

newStage :: forall e. ColorHex -> Eff (newStageRef :: StageReference | e) Stage
newStage = newPixi1 "Stage"

getMousePosition :: forall e. Stage -> Eff (interaction :: Mouse | e) Point
getMousePosition = method0Eff "getMousePosition"

setBackgroundColor :: forall e. ColorHex -> Stage -> Eff (stageMutation :: Color | e) Stage
setBackgroundColor h s = method1Eff "setBackgroundColor" h s <:> s

-- setInteractionDelegate 


