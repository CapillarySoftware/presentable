module Presentable.Router where

import Control.Monad.Eff 
import Data.Tuple
import Data.Array
import Debug.Foreign 
import History
import Control.Reactive

type Url  = String
type View = String

-- route :: forall a eff. [(Tuple Url View)] -> Eff ( reactive :: Reactive, history :: History | eff) a
route routes = do subscribeStateChange \e -> do 
  s <- getState
  let match = filter (\x -> (fst x) == s.url) routes
  ftrace match

