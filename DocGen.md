# Module Documentation

## Module Test.Chai

### Types

    data Chai :: !

    data Error where
      Error :: Error

    type ErrorExpectation  = forall eff. Expect -> Error -> Eff (chai :: Chai | eff) Unit

    data Expect where
      Expect :: Expect

    type Expectation  = forall a e. Expect -> a -> Eff (chai :: Chai | e) Unit


### Values

    expect :: forall a. a -> Expect

    toBeAbove :: Expectation

    toBeAtLeast :: Expectation

    toBeAtMost :: Expectation

    toBeBelow :: Expectation

    toDeepEqual :: Expectation

    toEql :: Expectation

    toEqual :: Expectation

    toInclude :: Expectation

    toNotBeAbove :: Expectation

    toNotBeAtLeast :: Expectation

    toNotBeAtMost :: Expectation

    toNotBeBelow :: Expectation

    toNotDeepEqual :: Expectation

    toNotEql :: Expectation

    toNotEqual :: Expectation

    toNotInclude :: Expectation

    toNotThrow :: ErrorExpectation

    toThrow :: ErrorExpectation


## Module History

### Types

    data History :: !

    type State d = { url :: Url, title :: Title, "data" :: {  | d } }


### Values

    getState :: forall eff d. Eff (history :: History | eff) (State d)

    subscribeStateChange :: forall a b eff. (Event a -> Eff (reactive :: Reactive | eff) b) -> Eff (reactive :: Reactive | eff) Subscription


## Module Test.Mocha

### Types

    data After :: !

    data Before :: !

    data Describe :: !

    type DoDescribe  = forall e a. String -> Eff e a -> Eff (describe :: Describe | e) Unit

    type DoIt  = forall e a. String -> Eff e a -> Eff (it :: It | e) Unit

    data Done :: !

    data DoneToken where
      DoneToken :: DoneToken

    data It :: !


### Values

    after :: forall e a. Eff e a -> Eff (after :: After | e) Unit

    afterEach :: forall e a. Eff e a -> Eff (after :: After | e) Unit

    before :: forall e a. Eff e a -> Eff (before :: Before | e) Unit

    beforeEach :: forall e a. Eff e a -> Eff (before :: Before | e) Unit

    describe :: DoDescribe

    describeOnly :: DoDescribe

    describeSkip :: DoDescribe

    it :: DoIt

    itAsync :: forall a eff. String -> (DoneToken -> Eff (done :: Done | eff) a) -> Eff (it :: It | eff) Unit

    itIs :: forall eff. DoneToken -> Eff (done :: Done | eff) Unit

    itOnly :: DoIt

    itSkip :: DoIt


## Module Presentable.Router

### Types

    type Route a = Tuple (State a) View

    type Url  = String

    type View  = String


### Values

    route :: forall a eff. [Route a] -> (View -> Eff (err :: Exception String, history :: History, reactive :: Reactive | eff) Unit) -> Eff (err :: Exception String, history :: History, reactive :: Reactive | eff) Subscription


## Module Presentable.ViewParser

## Module Debug.Foreign

### Values

    fprint :: forall a r. a -> Eff (trace :: Trace | r) Unit

    ftrace :: forall a r. a -> Eff (trace :: Trace | r) Unit


## Module Control.Reactive.Timer

### Types

    data Interval :: *

    data Timeout :: *

    data Timer :: !


### Values

    clearInterval :: forall eff. Interval -> Eff (timer :: Timer | eff) Unit

    clearTimeout :: forall eff. Timeout -> Eff (timer :: Timer | eff) Unit

    interval :: forall a d eff. Number -> (d -> Eff (timer :: Timer | eff) a) -> Eff (timer :: Timer | eff) Interval

    timeout :: forall a d eff. Number -> (d -> Eff (timer :: Timer | eff) a) -> Eff (timer :: Timer | eff) Timeout


## Module Debug.Foreign.Evil

### Types

    data Evil :: !

    data WTF :: *


### Values

    evil :: forall r. String -> Eff (evil :: Evil | r) WTF

    fpeek :: forall r. String -> Eff (evil :: Evil, trace :: Trace | r) Unit


## Module Control.Reactive.EventEmitter

### Types

    data Event d where
      Event :: EventName -> { detail :: {  | d }, cancelable :: Boolean, bubbles :: Boolean } -> Event d

    type EventName  = String


### Values

    eventDMap :: forall a b. ({  | a } -> {  | b }) -> Event a -> Event b

    eventNMap :: forall a. (EventName -> EventName) -> Event a -> Event a

    newEvent :: forall d. EventName -> {  | d } -> Event d

    unsubscribe :: forall eff. Subscription -> Eff (reactive :: Reactive | eff) Unit



