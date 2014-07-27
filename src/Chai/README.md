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



