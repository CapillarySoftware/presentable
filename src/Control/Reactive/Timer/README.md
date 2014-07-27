# Module Documentation

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



