# Module Documentation

## Module Debug.Foreign.Evil

### Types

    data Evil :: !

    data WTF :: *


### Values

    evil :: forall r. String -> Eff (evil :: Evil | r) WTF

    fpeek :: forall r. String -> Eff (evil :: Evil, trace :: Trace | r) {  }



