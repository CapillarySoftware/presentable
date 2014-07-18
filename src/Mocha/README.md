# Module Documentation

## Module Test.Mocha

### Types

    data After :: !

    data AfterEach :: !

    data Before :: !

    data BeforeEach :: !

    data Describe :: !

    type DoDescribe  = forall e a. String -> Eff e a -> Eff (describe :: Describe | e) {  }

    type DoIt  = forall e a. String -> Eff e a -> Eff (it :: It | e) {  }

    data It :: !


### Values

    after :: forall e a. Eff e a -> Eff (beforeEach :: After | e) {  }

    afterEach :: forall e a. Eff e a -> Eff (beforeEach :: AfterEach | e) {  }

    before :: forall e a. Eff e a -> Eff (beforeEach :: Before | e) {  }

    beforeEach :: forall e a. Eff e a -> Eff (beforeEach :: BeforeEach | e) {  }

    describe :: DoDescribe

    describeOnly :: DoDescribe

    describeSkip :: DoDescribe

    it :: DoIt

    itOnly :: DoIt

    itSkip :: DoIt



