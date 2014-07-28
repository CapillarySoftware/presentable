module Presentable.Router where

import Control.Monad.Eff 
import Data.Tuple
import Data.Array
import Data.Maybe
import Debug.Foreign 
import History
import Control.Reactive
import Control.Monad.Eff.Exception

type Url  = String
type View = String

defaultRoute :: [(Tuple Url View)]
defaultRoute routes = case head routes of 
  Nothing -> throwException "Your Routes are empty"
  Just r  -> return r 

-- route :: forall a eff. [(Tuple Url View)] -> Eff ( reactive :: Reactive, history :: History | eff) a
route routes = do subscribeStateChange \e -> do
  s <- getState
  d <- defaultRoute routes
  case filter (\x -> fst x == s.url) routes of
    [] -> replaceState { title : "", url : (fst d), "data" : {}}

  

