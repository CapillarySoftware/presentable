# Module Documentation

## Module Test.Mocha

### Types

    data Describe :: !

    type DoDescribe  = forall e a. String -> Eff e a -> Eff (describe :: Describe | e) Unit

    type DoIt  = forall e a. String -> Eff e a -> Eff (it :: It | e) Unit

    data Done :: !

    data DoneToken where
      DoneToken :: DoneToken

    data It :: !


### Values

    describe :: DoDescribe

    describeOnly :: DoDescribe

    describeSkip :: DoDescribe

    it :: DoIt

    itAsync :: forall a eff. String -> (DoneToken -> Eff (done :: Done | eff) a) -> Eff (it :: It | eff) Unit

    itIs :: forall eff. DoneToken -> Eff (done :: Done | eff) Unit

    itOnly :: DoIt

    itSkip :: DoIt



