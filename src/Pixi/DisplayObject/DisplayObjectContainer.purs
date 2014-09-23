module Pixi.DisplayObject.Container where

import Data.Function
import Pixi.DisplayObject
import Pixi.Internal

foreign import data Container :: *

class (DisplayObject a) <= DisplayObjectContainer a

instance displayObjectContainer :: DisplayObject Container
instance displayObjectContainerContainer :: DisplayObjectContainer Container

addChild :: forall a b e. (DisplayObject a, DisplayObjectContainer b) => a -> b -> e
addChild = runFn3 method1 "addChild"


addChildAt = 