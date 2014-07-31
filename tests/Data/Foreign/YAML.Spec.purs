module Data.Foreign.YAML.Spec where

import Data.Foreign
import Data.Foreign.YAML
import Data.Maybe
import Data.Either
import Test.Mocha
import Test.Chai
import Debug.Trace
import Debug.Foreign

data XYZ = XYZ { x :: String
               , y :: String
               , z :: String }
              
instance readXYZ :: ReadForeign XYZ where
  read = do
    x <- prop "x"
    y <- prop "y"
    z <- prop "z"
    return $ XYZ { x: x, y: y, z: z }

xyzYaml = "x : what\
        \\ny : der\
        \\nz : fooken"

xyz     = { x: "what", y: "der", z: "fooken" }

spec = describe "yaml -> js -> purs" $ do
  
  describe "parseYAML" $ do

    it "simple key value" $ case parseYAML xyzYaml of
      Right (XYZ a) -> expect a `toDeepEqual` xyz
        
  it "toYAML reverses parseYAML simple key value" 
    $ case parseYAML <<< toYAML $ xyz of
      Right (XYZ a) -> expect a `toDeepEqual` xyz
