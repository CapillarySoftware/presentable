module Test.Mocha where

import Control.Monad.Eff

foreign import data Describe :: !

foreign import describe 
  " function describe(description){                  \ 
  \   return function(fn){                           \
  \     return function(){                           \
  \       return window.describe(description, fn);   \  
  \     };                                           \
  \   };                                             \
  \ }" :: forall e a. String -> Eff e a -> Eff (describe :: Describe | e) {}

foreign import data It :: !

foreign import it 
  " function it(description){                \
  \   return function(fn){                   \
  \     return function(){                   \
  \       return window.it(description, fn); \
  \     };                                   \
  \   };                                     \
  \ }" :: forall e a. String -> Eff e a -> Eff (it :: It | e) {}