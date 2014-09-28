module Pixi.DisplayObject.Container where

import Data.Function
import Data.Foreign.OOFFI
import Control.Monad.Eff
import Pixi.Internal
import Pixi.DisplayObject

foreign import data Container   :: *
foreign import data AddChild    :: !
foreign import data RemoveChild :: !
foreign import data GetChild    :: !

class (DisplayObject a) <= DisplayObjectContainer a

instance displayObjectContainer :: DisplayObject Container
instance displayObjectContainerContainer :: DisplayObjectContainer Container

addChild   :: forall a b e. (DisplayObjectContainer a, DisplayObject b) => 
  a -> b -> Eff (containerMutate :: AddChild | e) b
addChild a b = method1Eff "addChild" a b <:> b

addChildAt :: forall a b e. (DisplayObjectContainer a, DisplayObject b) => 
  a -> Number -> b -> Eff (containerMutate :: AddChild | e) b
addChildAt a i b = method2Eff "addChildAt" a b i <:> b

getChildAt :: forall a b e. (DisplayObjectContainer a, DisplayObject b) => 
  a -> Number -> Eff (containerMutate :: GetChild | e) b
getChildAt = method1Eff "getChildAt"

removeChild :: forall a b e. (DisplayObjectContainer a, DisplayObject b) => 
  a -> b -> Eff (containerMutate :: RemoveChild | e) b
removeChild a b = method1Eff "removeChild" a b <:> b

removeStageReference :: forall a e. (DisplayObjectContainer a) =>
  a -> Eff (containerMutate :: StageReference | e) a
removeStageReference a = method0Eff "removeStageReference" a <:> a
