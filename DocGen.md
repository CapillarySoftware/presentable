# Module Documentation

## Module Presentable

### Types

    type Attributes a = Maybe {  | a }

    type Linker a p e = Attributes a -> Parent p -> Eff e (Parent p)

    type Parent p = Maybe {  | p }

    data Presentable a p e where
      Presentable :: Linker a p e -> Attributes a -> Maybe [Presentable a p e] -> Presentable


## Module Presentable.Router

### Types

    type Route a = Tuple (State a) View

    type View  = String


### Values

    route :: forall a eff. [Route a] -> (View -> Eff (err :: Exception, history :: History a, reactive :: Reactive | eff) Unit) -> Eff (err :: Exception, history :: History a, reactive :: Reactive | eff) Subscription


## Module Presentable.ViewParser

### Types

    type Registry a p e = M.Map String (Linker a p e)

    type Yaml  = String


### Values

    emptyRegistery :: forall a p e. Registry a p e

    register :: forall a p e. String -> Linker a p e -> Registry a p e -> Registry a p e

    renderYaml :: forall a p e. Parent p -> Registry a p (err :: Exception | e) -> Yaml -> Eff (err :: Exception | e) Unit



