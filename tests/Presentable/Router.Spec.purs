module Presentable.Router.Spec where

import Presentable.Router
import Test.Mocha
import Test.Chai
import History
import Data.Tuple
import Data.Array
import Data.Maybe
import Control.Reactive.Timer
import Control.Reactive.Event

toState u = { title : "", url : u, "data" : {} }
eventUnwrapUrl :: forall a b. Event (state :: (State b) | a) -> Url
eventUnwrapUrl e = (unwrapEventDetail e).state.url
routeUnwrapUrl :: forall a.   Route a -> Url
routeUnwrapUrl s = (fst s).url

sampleRoutes = [ (Tuple { url : "/index", title : "home",     "data" : {}} "views/index.yaml")
               , (Tuple { url : "/fooo",  title : "foo page", "data" : {}} "views/foo.yaml")
               , (Tuple { url : "/barr",  title : "bar page", "data" : {}} "views/bar.yaml") ]

testRoute url (Just a) done = do
  sub' <- route sampleRoutes   \v -> expect (snd a) `toEqual` v
  sub  <- subscribeStateChange \e ->
    if   routeUnwrapUrl a == eventUnwrapUrl e
    then itIs done
    else expect (routeUnwrapUrl a) `toNotEqual` eventUnwrapUrl e

  pushState <<< toState $ url

  -- clean up for the next test
  unsubscribe sub
  unsubscribe sub'

spec = describe "Router" $ do

  beforeEach <<< replaceState <<< toState $ "/before"

  itAsync "should default to the first of the list"
    $ testRoute "/notOnTheList"
    $ head sampleRoutes

  -- itAsync "should find middle route"
  --   $ testRoute "/fooo"
  --   $ tail sampleRoutes >>= head

  itAsync "should find end route"
    $ testRoute "/barr"
    $ last sampleRoutes

  itAsync "should find the first route"
    $ testRoute "/index"
    $ head sampleRoutes
