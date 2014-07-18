# Module Documentation

## Module History

### Types

    data History :: !

    type State d = { "data" :: {  | d }, url :: Url, title :: Title }

    type StateUpdater d = forall eff. {  | d } -> Title -> Url -> Eff (history :: History | eff) {  }

    type Title  = String

    type Url  = String


### Values

    getData :: forall d m. (Monad m) => m {  | d }

    getState :: forall m d. (Monad m) => m (State d)

    getTitle :: forall m. (Monad m) => m String

    getUrl :: forall m. (Monad m) => m String

    go :: forall eff. Number -> Eff (history :: History | eff) {  }

    goBack :: forall eff. Eff (history :: History | eff) {  }

    goForward :: forall eff. Eff (history :: History | eff) {  }

    pushState :: forall eff d. State d -> Eff (history :: History | eff) {  }

    pushState' :: forall d. StateUpdater d

    replaceState :: forall eff d. State d -> Eff (history :: History | eff) {  }

    replaceState' :: forall d. StateUpdater d

    stateChange :: forall a e. Eff e a -> Eff (history :: History | e) {  }



