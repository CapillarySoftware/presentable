module Test.Mocha
  ( Describe(..), DoDescribe(..)
  , It(..), DoIt(..)
  , itIs, itIsNot, Done(..), DoneToken(..)  
  , it, itAsync, itSkip, itOnly
  , describe, describeSkip, describeOnly
  , before, beforeEach, Before(..)
  , after, afterEach, After(..)) where

import Control.Monad.Eff
import Data.Foreign.EasyFFI



foreign import data Describe  :: !
type DoDescribe               = forall e a. String -> Eff e a -> Eff (describe :: Describe | e) Unit

describe                      :: DoDescribe
describe                      = unsafeForeignProcedure ["description", "fn", ""] "window.describe(description, fn);"
describeOnly                  :: DoDescribe
describeOnly                  = unsafeForeignProcedure ["description", "fn", ""] "window.describe.only(description, fn);"
describeSkip                  :: DoDescribe
describeSkip                  = unsafeForeignProcedure ["description", "fn", ""] "window.describe.skip(description, fn);"



foreign import data It        :: !
type DoIt                     = forall e a. String -> Eff e a -> Eff (it :: It | e) Unit

it                            :: DoIt
it                            = unsafeForeignProcedure ["description", "fn", ""] "window.it(description, fn);"
itOnly                        :: DoIt
itOnly                        = unsafeForeignProcedure ["description", "fn", ""] "window.it.only(description, fn);"
itSkip                        :: DoIt
itSkip                        = unsafeForeignProcedure ["description", "fn", ""] "window.it.skip(description, fn);"

foreign import data Done :: !
data DoneToken = DoneToken

foreign import itAsync
  "function itAsync(d) {                          \
  \    return function (fn) {                     \  
  \       return function(){                      \ 
  \         return window.it(d, function(done){   \
  \           return fn(done)();                  \
  \         });                                   \  
  \       };                                      \
  \    };                                         \
  \}" :: forall a eff. 
         String -> 
         (DoneToken -> Eff (done :: Done | eff) a) -> 
         Eff (it :: It | eff) Unit

foreign import itIs
  "function itIs(d){ return d(); }" :: forall eff. 
                                       DoneToken -> 
                                       Eff (done :: Done | eff) Unit

foreign import itIsNot
  "function itIsNot(d){ return function(){}; }" :: forall eff. 
                                       DoneToken -> 
                                       Eff (done :: Done | eff) Unit


    --- HOOKS


foreign import data Before     :: !
before                         :: forall e a. Eff e a -> Eff (before :: Before | e) Unit
before                         = unsafeForeignProcedure ["fn", ""] "window.before(fn);"

beforeEach                     :: forall e a. Eff e a -> Eff (before :: Before | e) Unit
beforeEach                     = unsafeForeignProcedure ["fn", ""] "window.beforeEach(fn);"

foreign import data After      :: !
after                          :: forall e a. Eff e a -> Eff (after :: After | e) Unit
after                          = unsafeForeignProcedure ["fn", ""] "window.after(fn);"

afterEach                      :: forall e a. Eff e a -> Eff (after :: After | e) Unit
afterEach                      = unsafeForeignProcedure ["fn", ""] "window.afterEach(fn);"