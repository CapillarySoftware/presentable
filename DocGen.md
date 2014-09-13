# Module Documentation

## Module Presentable.Router

### Types

    type Route a = Tuple (State a) View

    type Url  = String

    type View  = String


### Values

    route :: forall a eff. [Route a] -> (View -> Eff (err :: Exception, history :: History, reactive :: Reactive | eff) Unit) -> Eff (err :: Exception, history :: History, reactive :: Reactive | eff) Subscription


## Module Presentable.ViewParser

### Types

    type Linker a b eff = RVar a -> Eff (err :: Exception, reactive :: Reactive | eff) Unit

    data View where
      View :: [String] -> View


### Type Class Instances

    instance readView :: ReadForeign View


### Values

    render :: forall a b eff. [Maybe (Linker Number b eff)] -> Eff (err :: Exception, reactive :: Reactive | eff) Unit

    view :: forall a eff. M.Map String (Linker Number a eff) -> String -> Eff (err :: Exception, reactive :: Reactive | eff) Unit



