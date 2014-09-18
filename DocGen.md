# Module Documentation

## Module Presentable.Router

### Types

    type Route a = Tuple (State a) View

    type View  = String


### Values

    route :: forall a eff. [Route a] -> (View -> Eff (err :: Exception, history :: History, reactive :: Reactive | eff) Unit) -> Eff (err :: Exception, history :: History, reactive :: Reactive | eff) Subscription


## Module Presentable.ViewParser

### Types

    type Attributes a c e = Maybe { children :: [Presentable a c e] | a }

    type Linker a c e = Maybe c -> Attributes a c e -> Eff e (Maybe c)

    data Presentable a c e where
      Presentable :: Linker a c e -> Attributes a c e -> Maybe [Presentable a c e] -> Presentable a c e

    type Registry a c e = M.Map String (Linker a c e)

    type Yaml  = String


### Values

    emptyRegistery :: forall a c e. Registry a c e

    register :: forall a c e. String -> Linker a c e -> Registry a c e -> Registry a c e

    renderYaml :: forall a c e. Yaml -> Registry a c (err :: Exception | e) -> Eff (err :: Exception | e) Unit



