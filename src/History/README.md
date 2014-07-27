# Module Documentation

## Module History

### Types

    data History :: !

    type State d = { url :: Url, title :: Title, "data" :: {  | d } }


### Values

    getState :: forall m d. (Monad m) => m (State d)

    goState :: forall eff. Number -> Eff (history :: History | eff) Unit



