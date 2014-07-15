module Test.Mocha where

import Control.Monad.Eff
import Data.Foreign.EasyFFI

foreign import data Describe :: !
describe :: forall e a. String -> Eff e a -> Eff (describe :: Describe | e) Unit
describe = unsafeForeignProcedure ["description", "fn", ""] "window.describe(description, fn);"
describeOnly :: forall e a. String -> Eff e a -> Eff (describe :: Describe | e) Unit
describeOnly = unsafeForeignProcedure ["description", "fn", ""] "window.describe.only(description, fn);"

foreign import data It :: !
it :: forall e a. String -> Eff e a -> Eff (it :: It | e) Unit
it = unsafeForeignProcedure ["description", "fn", ""] "window.it(description, fn);"
itOnly :: forall e a. String -> Eff e a -> Eff (it :: It | e) Unit
itOnly = unsafeForeignProcedure ["description", "fn", ""] "window.it.only(description, fn);"

-- TODO: Async Tests with done

-- 
-- HOOKS
-- 

foreign import data Before :: !
before :: forall e a. Eff e a -> Eff (beforeEach :: Before | e) Unit
before = unsafeForeignProcedure ["fn",""] "window.before(fn);"

foreign import data After :: !
after :: forall e a. Eff e a -> Eff (beforeEach :: After | e) Unit
after = unsafeForeignProcedure ["fn",""] "window.after(fn);"

foreign import data BeforeEach :: !
beforeEach :: forall e a. Eff e a -> Eff (beforeEach :: BeforeEach | e) Unit
beforeEach = unsafeForeignProcedure ["fn",""] "window.beforeEach(fn);"

foreign import data AfterEach :: !
afterEach :: forall e a. Eff e a -> Eff (beforeEach :: AfterEach | e) Unit
afterEach = unsafeForeignProcedure ["fn",""] "window.afterEach(fn);"