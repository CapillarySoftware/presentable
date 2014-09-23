module Pixi.DisplayObject.Container where

import Data.Function
import Control.Monad.Eff
import Pixi.DisplayObject
import Pixi.Internal

foreign import data Container   :: *
foreign import data AddChild    :: !
foreign import data RemoveChild :: !
foreign import data GetChild    :: !

class (DisplayObject a) <= DisplayObjectContainer a

instance displayObjectContainer :: DisplayObject Container
instance displayObjectContainerContainer :: DisplayObjectContainer Container

type ContainerMutator eff = forall a b e. (DisplayObject a, DisplayObjectContainer b) => a 
  -> b -> Eff (containerMutate :: eff | e) a

addChild :: ContainerMutator AddChild
addChild = runFn3 method1M "addChild"


-- addChildAt = 