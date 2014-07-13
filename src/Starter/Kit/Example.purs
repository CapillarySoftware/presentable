module Starter.Kit.Example where

import Data.Array
import Data.Maybe

-- This module defines a single function diffs, which
-- returns the differences for an increasing array.
--
-- If the input is not increasing, it returns Nothing.
--
-- This contrived example was chosen to demonstrate the use
-- of the Data.Array and Data.Maybe standard libraries.


addThenDivide :: Number -> Number -> Number -> Number -> Number
addThenDivide x y z w = (x + y) / (z + w)