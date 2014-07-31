module Data.Foreign.YAML.Spec where

import Data.Foreign
import Data.Foreign.YAML
import Data.Maybe
import Data.Either
import Test.Mocha
import Test.Chai
import Debug.Trace
import Debug.Foreign

data ListItem = ListItem { x :: String
                         , y :: String
                         , z :: String }
              
instance readListItem :: ReadForeign ListItem where
  read = do
    x <- prop "x"
    y <- prop "y"
    z <- prop "z"
    return $ ListItem { x: x, y: y, z: z }

yaml =   "x : what  \
       \\ny : der   \
       \\nz : fooken"

spec = describe "yaml -> js -> purs" $ do
  
  it "what" $ case parseYAML yaml of
    Right (ListItem a) -> expect a `toDeepEqual` 
      { x: "what", y: "der", z: "fooken" }