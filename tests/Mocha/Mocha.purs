module Test.Mocha where

import Control.Monad.Eff
import Data.Foreign.EasyFFI

foreign import data Describe :: !
describe :: forall e a. String -> Eff e a -> Eff (describe :: Describe | e) {}
describe = unsafeForeignProcedure ["description", "fn", ""] "window.describe(description, fn);"
describeOnly :: forall e a. String -> Eff e a -> Eff (describe :: Describe | e) {}
describeOnly = unsafeForeignProcedure ["description", "fn", ""] "window.describe.only(description, fn);"

foreign import data It :: !
it :: forall e a. String -> Eff e a -> Eff (it :: It | e) {}
it = unsafeForeignProcedure ["description", "fn", ""] "window.it(description, fn);"
itOnly :: forall e a. String -> Eff e a -> Eff (it :: It | e) {}
itOnly = unsafeForeignProcedure ["description", "fn", ""] "window.it.only(description, fn);"

-- TODO: Async Tests with done

-- 
-- HOOKS
-- 

foreign import data Before :: !
before :: forall e a. Eff e a -> Eff (beforeEach :: Before | e) {}
before = unsafeForeignProcedure ["fn",""] "window.before(fn);"

foreign import data After :: !
after :: forall e a. Eff e a -> Eff (beforeEach :: After | e) {}
after = unsafeForeignProcedure ["fn",""] "window.after(fn);"

foreign import data BeforeEach :: !
beforeEach :: forall e a. Eff e a -> Eff (beforeEach :: BeforeEach | e) {}
beforeEach = unsafeForeignProcedure ["fn",""] "window.beforeEach(fn);"

foreign import data AfterEach :: !
afterEach :: forall e a. Eff e a -> Eff (beforeEach :: AfterEach | e) {}
afterEach = unsafeForeignProcedure ["fn",""] "window.afterEach(fn);"