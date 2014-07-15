var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = function (value0) {
        return {
            ctor: "Prelude.Unit", 
            values: [ value0 ]
        };
    };
    var LT = {
        ctor: "Prelude.LT", 
        values: [  ]
    };
    var GT = {
        ctor: "Prelude.GT", 
        values: [  ]
    };
    var EQ = {
        ctor: "Prelude.EQ", 
        values: [  ]
    };
    function cons(e) {  return function (l) {    return [e].concat(l);  };};
    function showStringImpl(s) {  return JSON.stringify(s);};
    function showNumberImpl(n) {  return n.toString();};
    function showArrayImpl (f) {  return function (xs) {    var ss = [];    for (var i = 0, l = xs.length; i < l; i++) {      ss[i] = f(xs[i]);    }    return '[' + ss.join(',') + ']';  };};
    function numAdd(n1) {  return function(n2) {    return n1 + n2;  };};
    function numSub(n1) {  return function(n2) {    return n1 - n2;  };};
    function numMul(n1) {  return function(n2) {    return n1 * n2;  };};
    function numDiv(n1) {  return function(n2) {    return n1 / n2;  };};
    function numMod(n1) {  return function(n2) {    return n1 % n2;  };};
    function numNegate(n) {  return -n;};
    function refEq(r1) {  return function(r2) {    return r1 === r2;  };};
    function refIneq(r1) {  return function(r2) {    return r1 !== r2;  };};
    function eqArrayImpl(f) {  return function(xs) {    return function(ys) {      if (xs.length !== ys.length) return false;      for (var i = 0; i < xs.length; i++) {        if (!f(xs[i])(ys[i])) return false;      }      return true;    };  };};
    function unsafeCompare(n1) {  return function(n2) {    return n1 < n2 ? LT : n1 > n2 ? GT : EQ;  };};
    function numShl(n1) {  return function(n2) {    return n1 << n2;  };};
    function numShr(n1) {  return function(n2) {    return n1 >> n2;  };};
    function numZshr(n1) {  return function(n2) {    return n1 >>> n2;  };};
    function numAnd(n1) {  return function(n2) {    return n1 & n2;  };};
    function numOr(n1) {  return function(n2) {    return n1 | n2;  };};
    function numXor(n1) {  return function(n2) {    return n1 ^ n2;  };};
    function numComplement(n) {  return ~n;};
    function boolAnd(b1) {  return function(b2) {    return b1 && b2;  };};
    function boolOr(b1) {  return function(b2) {    return b1 || b2;  };};
    function boolNot(b) {  return !b;};
    function concatString(s1) {  return function(s2) {    return s1 + s2;  };};
    var $bar$bar = function (dict) {
        return dict["||"];
    };
    var $bar = function (dict) {
        return dict["|"];
    };
    var $up = function (dict) {
        return dict["^"];
    };
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $eq$eq = function (dict) {
        return dict["=="];
    };
    var $less$bar$greater = function (dict) {
        return dict["<|>"];
    };
    var $less$greater = function (dict) {
        return dict["<>"];
    };
    var $less$less$less = function (dict) {
        return dict["<<<"];
    };
    var $greater$greater$greater = function (__dict_Semigroupoid_0) {
        return function (f) {
            return function (g) {
                return $less$less$less(__dict_Semigroupoid_0)(g)(f);
            };
        };
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
    var $less$dollar$greater = function (dict) {
        return dict["<$>"];
    };
    var $colon = cons;
    var $div$eq = function (dict) {
        return dict["/="];
    };
    var $div = function (dict) {
        return dict["/"];
    };
    var $minus = function (dict) {
        return dict["-"];
    };
    var $plus$plus = function (__dict_Semigroup_1) {
        return $less$greater(__dict_Semigroup_1);
    };
    var $plus = function (dict) {
        return dict["+"];
    };
    var $times = function (dict) {
        return dict["*"];
    };
    var $amp$amp = function (dict) {
        return dict["&&"];
    };
    var $amp = function (dict) {
        return dict["&"];
    };
    var $percent = function (dict) {
        return dict["%"];
    };
    var $dollar = function (f) {
        return function (x) {
            return f(x);
        };
    };
    var $hash = function (x) {
        return function (f) {
            return f(x);
        };
    };
    var zshr = function (dict) {
        return dict.zshr;
    };
    var unit = Unit({});
    var shr = function (dict) {
        return dict.shr;
    };
    var showUnit = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_16) {
                return "Unit {}";
            }
        };
    };
    var showString = function (_) {
        return {
            "__superclasses": {}, 
            show: showStringImpl
        };
    };
    var showOrdering = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_24) {
                if (_24.ctor === "Prelude.LT") {
                    return "LT";
                };
                if (_24.ctor === "Prelude.GT") {
                    return "GT";
                };
                if (_24.ctor === "Prelude.EQ") {
                    return "EQ";
                };
                throw "Failed pattern match";
            }
        };
    };
    var showNumber = function (_) {
        return {
            "__superclasses": {}, 
            show: showNumberImpl
        };
    };
    var showBoolean = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_17) {
                if (_17) {
                    return "true";
                };
                if (!_17) {
                    return "false";
                };
                throw "Failed pattern match";
            }
        };
    };
    var show = function (dict) {
        return dict.show;
    };
    var showArray = function (__dict_Show_2) {
        return {
            "__superclasses": {}, 
            show: showArrayImpl(show(__dict_Show_2))
        };
    };
    var shl = function (dict) {
        return dict.shl;
    };
    var semigroupoidArr = function (_) {
        return {
            "__superclasses": {}, 
            "<<<": function (f) {
                return function (g) {
                    return function (x) {
                        return f(g(x));
                    };
                };
            }
        };
    };
    var semigroupUnit = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_31) {
                return function (_32) {
                    return Unit({});
                };
            }
        };
    };
    var semigroupString = function (_) {
        return {
            "__superclasses": {}, 
            "<>": concatString
        };
    };
    var semigroupArr = function (__dict_Semigroup_3) {
        return {
            "__superclasses": {}, 
            "<>": function (f) {
                return function (g) {
                    return function (x) {
                        return $less$greater(__dict_Semigroup_3)(f(x))(g(x));
                    };
                };
            }
        };
    };
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_4) {
        return pure(__dict_Monad_4["__superclasses"]["Prelude.Applicative_0"]({}));
    };
    var numNumber = function (_) {
        return {
            "__superclasses": {}, 
            "+": numAdd, 
            "-": numSub, 
            "*": numMul, 
            "/": numDiv, 
            "%": numMod, 
            negate: numNegate
        };
    };
    var not = function (dict) {
        return dict.not;
    };
    var negate = function (dict) {
        return dict.negate;
    };
    var liftM1 = function (__dict_Monad_5) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_5["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_0) {
                    return $$return(__dict_Monad_5)(f(_0));
                });
            };
        };
    };
    var liftA1 = function (__dict_Applicative_6) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_6["__superclasses"]["Prelude.Apply_0"]({}))(pure(__dict_Applicative_6)(f))(a);
            };
        };
    };
    var id = function (dict) {
        return dict.id;
    };
    var functorArr = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": $less$less$less(semigroupoidArr({}))
        };
    };
    var flip = function (f) {
        return function (b) {
            return function (a) {
                return f(a)(b);
            };
        };
    };
    var eqUnit = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_18) {
                return function (_19) {
                    return true;
                };
            }, 
            "/=": function (_20) {
                return function (_21) {
                    return false;
                };
            }
        };
    };
    var ordUnit = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqUnit({});
                }
            }, 
            compare: function (_25) {
                return function (_26) {
                    return EQ;
                };
            }
        };
    };
    var eqString = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordString = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqString({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqNumber = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordNumber = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqNumber({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqBoolean = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordBoolean = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqBoolean({});
                }
            }, 
            compare: function (_27) {
                return function (_28) {
                    if (!_27) {
                        if (!_28) {
                            return EQ;
                        };
                    };
                    if (!_27) {
                        if (_28) {
                            return LT;
                        };
                    };
                    if (_27) {
                        if (_28) {
                            return EQ;
                        };
                    };
                    if (_27) {
                        if (!_28) {
                            return GT;
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var empty = function (dict) {
        return dict.empty;
    };
    var $$const = function (_12) {
        return function (_13) {
            return _12;
        };
    };
    var $$void = function (__dict_Functor_8) {
        return function (fa) {
            return $less$dollar$greater(__dict_Functor_8)($$const(unit))(fa);
        };
    };
    var complement = function (dict) {
        return dict.complement;
    };
    var compare = function (dict) {
        return dict.compare;
    };
    var $less = function (__dict_Ord_10) {
        return function (a1) {
            return function (a2) {
                return (function (_123) {
                    if (_123.ctor === "Prelude.LT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_10)(a1)(a2));
            };
        };
    };
    var $less$eq = function (__dict_Ord_11) {
        return function (a1) {
            return function (a2) {
                return (function (_124) {
                    if (_124.ctor === "Prelude.GT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_11)(a1)(a2));
            };
        };
    };
    var $greater = function (__dict_Ord_12) {
        return function (a1) {
            return function (a2) {
                return (function (_125) {
                    if (_125.ctor === "Prelude.GT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_12)(a1)(a2));
            };
        };
    };
    var $greater$eq = function (__dict_Ord_13) {
        return function (a1) {
            return function (a2) {
                return (function (_126) {
                    if (_126.ctor === "Prelude.LT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_13)(a1)(a2));
            };
        };
    };
    var categoryArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroupoid_0": function (_) {
                    return semigroupoidArr({});
                }
            }, 
            id: function (x) {
                return x;
            }
        };
    };
    var boolLikeBoolean = function (_) {
        return {
            "__superclasses": {}, 
            "&&": boolAnd, 
            "||": boolOr, 
            not: boolNot
        };
    };
    var eqArray = function (__dict_Eq_7) {
        return {
            "__superclasses": {}, 
            "==": function (xs) {
                return function (ys) {
                    return eqArrayImpl($eq$eq(__dict_Eq_7))(xs)(ys);
                };
            }, 
            "/=": function (xs) {
                return function (ys) {
                    return not(boolLikeBoolean({}))($eq$eq(eqArray(__dict_Eq_7))(xs)(ys));
                };
            }
        };
    };
    var ordArray = function (__dict_Ord_9) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqArray(__dict_Ord_9["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_29) {
                return function (_30) {
                    if (_29.length === 0) {
                        if (_30.length === 0) {
                            return EQ;
                        };
                    };
                    if (_29.length === 0) {
                        return LT;
                    };
                    if (_30.length === 0) {
                        return GT;
                    };
                    if (_29.length > 0) {
                        var _133 = _29.slice(1);
                        if (_30.length > 0) {
                            var _131 = _30.slice(1);
                            return (function (_129) {
                                if (_129.ctor === "Prelude.EQ") {
                                    return compare(ordArray(__dict_Ord_9))(_133)(_131);
                                };
                                return _129;
                            })(compare(__dict_Ord_9)(_29[0])(_30[0]));
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqOrdering = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_22) {
                return function (_23) {
                    if (_22.ctor === "Prelude.LT") {
                        if (_23.ctor === "Prelude.LT") {
                            return true;
                        };
                    };
                    if (_22.ctor === "Prelude.GT") {
                        if (_23.ctor === "Prelude.GT") {
                            return true;
                        };
                    };
                    if (_22.ctor === "Prelude.EQ") {
                        if (_23.ctor === "Prelude.EQ") {
                            return true;
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (x) {
                return function (y) {
                    return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
                };
            }
        };
    };
    var bitsNumber = function (_) {
        return {
            "__superclasses": {}, 
            "&": numAnd, 
            "|": numOr, 
            "^": numXor, 
            shl: numShl, 
            shr: numShr, 
            zshr: numZshr, 
            complement: numComplement
        };
    };
    var asTypeOf = function (_14) {
        return function (_15) {
            return _14;
        };
    };
    var applyArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorArr({});
                }
            }, 
            "<*>": function (f) {
                return function (g) {
                    return function (x) {
                        return f(x)(g(x));
                    };
                };
            }
        };
    };
    var bindArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArr({});
                }
            }, 
            ">>=": function (m) {
                return function (f) {
                    return function (x) {
                        return f(m(x))(x);
                    };
                };
            }
        };
    };
    var applicativeArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArr({});
                }
            }, 
            pure: $$const
        };
    };
    var monadArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeArr({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindArr({});
                }
            }
        };
    };
    var ap = function (__dict_Monad_14) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_14["__superclasses"]["Prelude.Bind_1"]({}))(f)(function (_2) {
                    return $greater$greater$eq(__dict_Monad_14["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_1) {
                        return $$return(__dict_Monad_14)(_2(_1));
                    });
                });
            };
        };
    };
    return {
        Unit: Unit, 
        LT: LT, 
        GT: GT, 
        EQ: EQ, 
        unit: unit, 
        "++": $plus$plus, 
        "<>": $less$greater, 
        not: not, 
        "||": $bar$bar, 
        "&&": $amp$amp, 
        complement: complement, 
        zshr: zshr, 
        shr: shr, 
        shl: shl, 
        "^": $up, 
        "|": $bar, 
        "&": $amp, 
        ">=": $greater$eq, 
        "<=": $less$eq, 
        ">": $greater, 
        "<": $less, 
        compare: compare, 
        refIneq: refIneq, 
        refEq: refEq, 
        "/=": $div$eq, 
        "==": $eq$eq, 
        negate: negate, 
        "%": $percent, 
        "/": $div, 
        "*": $times, 
        "-": $minus, 
        "+": $plus, 
        ap: ap, 
        liftM1: liftM1, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        "<|>": $less$bar$greater, 
        empty: empty, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        "void": $$void, 
        "<$>": $less$dollar$greater, 
        show: show, 
        cons: cons, 
        ":": $colon, 
        "#": $hash, 
        "$": $dollar, 
        id: id, 
        ">>>": $greater$greater$greater, 
        "<<<": $less$less$less, 
        asTypeOf: asTypeOf, 
        "const": $$const, 
        flip: flip, 
        semigroupoidArr: semigroupoidArr, 
        categoryArr: categoryArr, 
        showUnit: showUnit, 
        showString: showString, 
        showBoolean: showBoolean, 
        showNumber: showNumber, 
        showArray: showArray, 
        functorArr: functorArr, 
        applyArr: applyArr, 
        applicativeArr: applicativeArr, 
        bindArr: bindArr, 
        monadArr: monadArr, 
        numNumber: numNumber, 
        eqUnit: eqUnit, 
        eqString: eqString, 
        eqNumber: eqNumber, 
        eqBoolean: eqBoolean, 
        eqArray: eqArray, 
        eqOrdering: eqOrdering, 
        showOrdering: showOrdering, 
        ordUnit: ordUnit, 
        ordBoolean: ordBoolean, 
        ordNumber: ordNumber, 
        ordString: ordString, 
        ordArray: ordArray, 
        bitsNumber: bitsNumber, 
        boolLikeBoolean: boolLikeBoolean, 
        semigroupUnit: semigroupUnit, 
        semigroupString: semigroupString, 
        semigroupArr: semigroupArr
    };
})();
var PS = PS || {};
PS.Prelude_Unsafe = (function () {
    "use strict";
    function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
    return {
        unsafeIndex: unsafeIndex
    };
})();
var PS = PS || {};
PS.Presentable_Router = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var foozle = function (x) {
        return "In Port Foozle " + Prelude.show(Prelude.showNumber({}))(x) + " eats you!";
    };
    return {
        foozle: foozle
    };
})();
var PS = PS || {};
PS.Math = (function () {
    "use strict";
    var abs = Math.abs;;
    var acos = Math.acos;;
    var asin = Math.asin;;
    var atan = Math.atan;;
    function atan2(y){  return function (x) {    return Math.atan2(y, x);  };};
    var ceil = Math.ceil;;
    var cos = Math.cos;;
    var exp = Math.exp;;
    var floor = Math.floor;;
    var log = Math.log;;
    function max(n1){  return function(n2) {    return Math.max(n1, n2);  }};
    function min(n1){  return function(n2) {    return Math.min(n1, n2);  }};
    function pow(n){  return function(p) {    return Math.pow(n, p);  }};
    var round = Math.round;;
    var sin = Math.sin;;
    var sqrt = Math.sqrt;;
    var tan = Math.tan;;
    var e       = Math.E;;
    var ln2     = Math.LN2;;
    var ln10    = Math.LN10;;
    var log2e   = Math.LOG2E;;
    var log10e  = Math.LOG10E;;
    var pi      = Math.PI;;
    var sqrt1_2 = Math.SQRT1_2;;
    var sqrt2   = Math.SQRT2;;
    return {
        sqrt2: sqrt2, 
        "sqrt1_2": sqrt1_2, 
        pi: pi, 
        log10e: log10e, 
        log2e: log2e, 
        ln10: ln10, 
        ln2: ln2, 
        e: e, 
        tan: tan, 
        sqrt: sqrt, 
        sin: sin, 
        round: round, 
        pow: pow, 
        min: min, 
        max: max, 
        log: log, 
        floor: floor, 
        exp: exp, 
        cos: cos, 
        ceil: ceil, 
        atan2: atan2, 
        atan: atan, 
        asin: asin, 
        acos: acos, 
        abs: abs
    };
})();
var PS = PS || {};
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Nothing = {
        ctor: "Data.Maybe.Nothing", 
        values: [  ]
    };
    var Just = function (value0) {
        return {
            ctor: "Data.Maybe.Just", 
            values: [ value0 ]
        };
    };
    var showMaybe = function (__dict_Show_15) {
        return {
            "__superclasses": {}, 
            show: function (_44) {
                if (_44.ctor === "Data.Maybe.Just") {
                    return "Just (" + Prelude.show(__dict_Show_15)(_44.values[0]) + ")";
                };
                if (_44.ctor === "Data.Maybe.Nothing") {
                    return "Nothing";
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybe = function (_33) {
        return function (_34) {
            return function (_35) {
                if (_35.ctor === "Data.Maybe.Nothing") {
                    return _33;
                };
                if (_35.ctor === "Data.Maybe.Just") {
                    return _34(_35.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_36) {
                return function (_37) {
                    if (_37.ctor === "Data.Maybe.Just") {
                        return Just(_36(_37.values[0]));
                    };
                    return Nothing;
                };
            }
        };
    };
    var fromMaybe = function (a) {
        return maybe(a)(Prelude.id(Prelude.categoryArr({})));
    };
    var eqMaybe = function (__dict_Eq_17) {
        return {
            "__superclasses": {}, 
            "==": function (_45) {
                return function (_46) {
                    if (_45.ctor === "Data.Maybe.Nothing") {
                        if (_46.ctor === "Data.Maybe.Nothing") {
                            return true;
                        };
                    };
                    if (_45.ctor === "Data.Maybe.Just") {
                        if (_46.ctor === "Data.Maybe.Just") {
                            return Prelude["=="](__dict_Eq_17)(_45.values[0])(_46.values[0]);
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (a) {
                return function (b) {
                    return !Prelude["=="](eqMaybe(__dict_Eq_17))(a)(b);
                };
            }
        };
    };
    var ordMaybe = function (__dict_Ord_16) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqMaybe(__dict_Ord_16["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_47) {
                return function (_48) {
                    if (_47.ctor === "Data.Maybe.Just") {
                        if (_48.ctor === "Data.Maybe.Just") {
                            return Prelude.compare(__dict_Ord_16)(_47.values[0])(_48.values[0]);
                        };
                    };
                    if (_47.ctor === "Data.Maybe.Nothing") {
                        if (_48.ctor === "Data.Maybe.Nothing") {
                            return Prelude.EQ;
                        };
                    };
                    if (_47.ctor === "Data.Maybe.Nothing") {
                        return Prelude.LT;
                    };
                    if (_48.ctor === "Data.Maybe.Nothing") {
                        return Prelude.GT;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applyMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorMaybe({});
                }
            }, 
            "<*>": function (_38) {
                return function (_39) {
                    if (_38.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"](functorMaybe({}))(_38.values[0])(_39);
                    };
                    if (_38.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var bindMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            ">>=": function (_42) {
                return function (_43) {
                    if (_42.ctor === "Data.Maybe.Just") {
                        return _43(_42.values[0]);
                    };
                    if (_42.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applicativeMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            pure: Just
        };
    };
    var monadMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeMaybe({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindMaybe({});
                }
            }
        };
    };
    var alternativeMaybe = function (_) {
        return {
            "__superclasses": {}, 
            empty: Nothing, 
            "<|>": function (_40) {
                return function (_41) {
                    if (_40.ctor === "Data.Maybe.Nothing") {
                        return _41;
                    };
                    return _40;
                };
            }
        };
    };
    return {
        Nothing: Nothing, 
        Just: Just, 
        isNothing: isNothing, 
        isJust: isJust, 
        fromMaybe: fromMaybe, 
        maybe: maybe, 
        functorMaybe: functorMaybe, 
        applyMaybe: applyMaybe, 
        applicativeMaybe: applicativeMaybe, 
        alternativeMaybe: alternativeMaybe, 
        bindMaybe: bindMaybe, 
        monadMaybe: monadMaybe, 
        showMaybe: showMaybe, 
        eqMaybe: eqMaybe, 
        ordMaybe: ordMaybe
    };
})();
var PS = PS || {};
PS.Data_Maybe_Unsafe = (function () {
    "use strict";
    var fromJust = function (_49) {
        if (_49.ctor === "Data.Maybe.Just") {
            return _49.values[0];
        };
        throw "Failed pattern match";
    };
    return {
        fromJust: fromJust
    };
})();
var PS = PS || {};
PS.Data_Function = (function () {
    "use strict";
    function mkFn0(f) {  return function() {    return f({});  };};
    function mkFn1(f) {  return function(a) {    return f(a);  };};
    function mkFn2(f) {  return function(a, b) {    return f(a)(b);  };};
    function mkFn3(f) {  return function(a, b, c) {    return f(a)(b)(c);  };};
    function mkFn4(f) {  return function(a, b, c, d) {    return f(a)(b)(c)(d);  };};
    function mkFn5(f) {  return function(a, b, c, d, e) {    return f(a)(b)(c)(d)(e);  };};
    function runFn0(f) {  return f();};
    function runFn1(f) {  return function(a) {    return f(a);  };};
    function runFn2(f) {  return function(a) {    return function(b) {      return f(a, b);    };  };};
    function runFn3(f) {  return function(a) {    return function(b) {      return function(c) {        return f(a, b, c);      };    };  };};
    function runFn4(f) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return f(a, b, c, d);        };      };    };  };};
    function runFn5(f) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return f(a, b, c, d, e);          };        };      };    };  };};
    var on = function (f) {
        return function (g) {
            return function (x) {
                return function (y) {
                    return f(g(x))(g(y));
                };
            };
        };
    };
    return {
        runFn5: runFn5, 
        runFn4: runFn4, 
        runFn3: runFn3, 
        runFn2: runFn2, 
        runFn1: runFn1, 
        runFn0: runFn0, 
        mkFn5: mkFn5, 
        mkFn4: mkFn4, 
        mkFn3: mkFn3, 
        mkFn2: mkFn2, 
        mkFn1: mkFn1, 
        mkFn0: mkFn0, 
        on: on
    };
})();
var PS = PS || {};
PS.Data_Eq = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Ref = function (value0) {
        return {
            ctor: "Data.Eq.Ref", 
            values: [ value0 ]
        };
    };
    var liftRef = function (_50) {
        return function (_51) {
            return function (_52) {
                return _50(_51.values[0])(_52.values[0]);
            };
        };
    };
    var eqRef = function (_) {
        return {
            "__superclasses": {}, 
            "==": liftRef(Prelude.refEq), 
            "/=": liftRef(Prelude.refIneq)
        };
    };
    return {
        Ref: Ref, 
        liftRef: liftRef, 
        eqRef: eqRef
    };
})();
var PS = PS || {};
PS.Data_Array = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    function snoc(l) {  return function (e) {    var l1 = l.slice();    l1.push(e);     return l1;  };};
    function length (xs) {  return xs.length;};
    function findIndex (f) {  return function (arr) {    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function findLastIndex (f) {  return function (arr) {    for (var i = arr.length - 1; i >= 0; i--) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function append (l1) {  return function (l2) {    return l1.concat(l2);  };};
    function concat (xss) {  var result = [];  for (var i = 0, l = xss.length; i < l; i++) {    result.push.apply(result, xss[i]);  }  return result;};
    function reverse (l) {  return l.slice().reverse();};
    function drop (n) {  return function (l) {    return l.slice(n);  };};
    function slice (s) {  return function (e) {    return function (l) {      return l.slice(s, e);    };  };};
    function insertAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1.splice(index, 0, a);      return l1;    };   };};
    function deleteAt (index) {  return function (n) {    return function (l) {      var l1 = l.slice();      l1.splice(index, n);      return l1;    };   };};
    function updateAt (index) {  return function (a) {    return function (l) {      var i = ~~index;      if (i < 0 || i >= l.length) return l;      var l1 = l.slice();      l1[i] = a;      return l1;    };   };};
    function concatMap (f) {  return function (arr) {    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      Array.prototype.push.apply(result, f(arr[i]));    }    return result;  };};
    function map (f) {  return function (arr) {    var l = arr.length;    var result = new Array(l);    for (var i = 0; i < l; i++) {      result[i] = f(arr[i]);    }    return result;  };};
    function filter (f) {  return function (arr) {    var n = 0;    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        result[n++] = arr[i];      }    }    return result;  };};
    function range (start) {  return function (end) {    var i = ~~start, e = ~~end;    var step = i > e ? -1 : 1;    var result = [i], n = 1;    while (i !== e) {      i += step;      result[n++] = i;    }    return result;  };};
    function zipWith (f) {  return function (xs) {    return function (ys) {      var l = xs.length < ys.length ? xs.length : ys.length;      var result = new Array(l);      for (var i = 0; i < l; i++) {        result[i] = f(xs[i])(ys[i]);      }      return result;    };  };};
    function sortJS (f) {  return function (l) {    return l.slice().sort(function (x, y) {      return f(x)(y);    });  };};
    var $bang$bang = function (xs) {
        return function (n) {
            var isInt = function (n) {
                return n !== ~~n;
            };
            return n < 0 || n >= length(xs) || isInt(n) ? Data_Maybe.Nothing : Data_Maybe.Just(xs[n]);
        };
    };
    var take = function (n) {
        return slice(0)(n);
    };
    var tail = function (_55) {
        if (_55.length > 0) {
            var _174 = _55.slice(1);
            return Data_Maybe.Just(_174);
        };
        return Data_Maybe.Nothing;
    };
    var span = (function () {
        var go = function (__copy__71) {
            return function (__copy__72) {
                return function (__copy__73) {
                    var _71 = __copy__71;
                    var _72 = __copy__72;
                    var _73 = __copy__73;
                    tco: while (true) {
                        var acc = _71;
                        if (_73.length > 0) {
                            var _179 = _73.slice(1);
                            if (_72(_73[0])) {
                                var __tco__71 = Prelude[":"](_73[0])(acc);
                                var __tco__72 = _72;
                                _71 = __tco__71;
                                _72 = __tco__72;
                                _73 = _179;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_71), 
                            rest: _73
                        };
                    };
                };
            };
        };
        return go([  ]);
    })();
    var sortBy = function (comp) {
        return function (xs) {
            var comp$prime = function (x) {
                return function (y) {
                    return (function (_180) {
                        if (_180.ctor === "Prelude.GT") {
                            return 1;
                        };
                        if (_180.ctor === "Prelude.EQ") {
                            return 0;
                        };
                        if (_180.ctor === "Prelude.LT") {
                            return -1;
                        };
                        throw "Failed pattern match";
                    })(comp(x)(y));
                };
            };
            return sortJS(comp$prime)(xs);
        };
    };
    var sort = function (__dict_Ord_18) {
        return function (xs) {
            return sortBy(Prelude.compare(__dict_Ord_18))(xs);
        };
    };
    var singleton = function (a) {
        return [ a ];
    };
    var semigroupArray = function (_) {
        return {
            "__superclasses": {}, 
            "<>": append
        };
    };
    var $$null = function (_57) {
        if (_57.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_64) {
        return function (_65) {
            if (_65.length === 0) {
                return [  ];
            };
            if (_65.length > 0) {
                var _185 = _65.slice(1);
                return Prelude[":"](_65[0])(nubBy(_64)(filter(function (y) {
                    return !_64(_65[0])(y);
                })(_185)));
            };
            throw "Failed pattern match";
        };
    };
    var nub = function (__dict_Eq_19) {
        return nubBy(Prelude["=="](__dict_Eq_19));
    };
    var mapMaybe = function (f) {
        return concatMap(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe.maybe([  ])(singleton))(f));
    };
    var last = function (__copy__54) {
        var _54 = __copy__54;
        tco: while (true) {
            if (_54.length > 0) {
                var _188 = _54.slice(1);
                if (_188.length === 0) {
                    return Data_Maybe.Just(_54[0]);
                };
            };
            if (_54.length > 0) {
                var _190 = _54.slice(1);
                _54 = _190;
                continue tco;
            };
            return Data_Maybe.Nothing;
        };
    };
    var intersectBy = function (_61) {
        return function (_62) {
            return function (_63) {
                if (_62.length === 0) {
                    return [  ];
                };
                if (_63.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_61(x))(_63) >= 0;
                };
                return filter(el)(_62);
            };
        };
    };
    var intersect = function (__dict_Eq_20) {
        return intersectBy(Prelude["=="](__dict_Eq_20));
    };
    var init = function (_56) {
        if (_56.length === 0) {
            return Data_Maybe.Nothing;
        };
        return Data_Maybe.Just(slice(0)(length(_56) - 1)(_56));
    };
    var head = function (_53) {
        if (_53.length > 0) {
            var _197 = _53.slice(1);
            return Data_Maybe.Just(_53[0]);
        };
        return Data_Maybe.Nothing;
    };
    var groupBy = (function () {
        var go = function (__copy__68) {
            return function (__copy__69) {
                return function (__copy__70) {
                    var _68 = __copy__68;
                    var _69 = __copy__69;
                    var _70 = __copy__70;
                    tco: while (true) {
                        var acc = _68;
                        if (_70.length === 0) {
                            return reverse(acc);
                        };
                        if (_70.length > 0) {
                            var _202 = _70.slice(1);
                            var sp = span(_69(_70[0]))(_202);
                            var __tco__68 = Prelude[":"](Prelude[":"](_70[0])(sp.init))(_68);
                            var __tco__69 = _69;
                            _68 = __tco__68;
                            _69 = __tco__69;
                            _70 = sp.rest;
                            continue tco;
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        return go([  ]);
    })();
    var group = function (__dict_Eq_21) {
        return function (xs) {
            return groupBy(Prelude["=="](__dict_Eq_21))(xs);
        };
    };
    var group$prime = function (__dict_Ord_22) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(group(__dict_Ord_22["__superclasses"]["Prelude.Eq_0"]({})))(sort(__dict_Ord_22));
    };
    var functorArray = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": map
        };
    };
    var elemLastIndex = function (__dict_Eq_23) {
        return function (x) {
            return findLastIndex(Prelude["=="](__dict_Eq_23)(x));
        };
    };
    var elemIndex = function (__dict_Eq_24) {
        return function (x) {
            return findIndex(Prelude["=="](__dict_Eq_24)(x));
        };
    };
    var deleteBy = function (_58) {
        return function (_59) {
            return function (_60) {
                if (_60.length === 0) {
                    return [  ];
                };
                return (function (_206) {
                    if (_206 < 0) {
                        return _60;
                    };
                    return deleteAt(_206)(1)(_60);
                })(findIndex(_58(_59))(_60));
            };
        };
    };
    var $$delete = function (__dict_Eq_25) {
        return deleteBy(Prelude["=="](__dict_Eq_25));
    };
    var $bslash$bslash = function (__dict_Eq_26) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__66) {
                    return function (__copy__67) {
                        var _66 = __copy__66;
                        var _67 = __copy__67;
                        tco: while (true) {
                            var xs = _66;
                            if (_67.length === 0) {
                                return xs;
                            };
                            if (_66.length === 0) {
                                return [  ];
                            };
                            if (_67.length > 0) {
                                var _210 = _67.slice(1);
                                var __tco__66 = $$delete(__dict_Eq_26)(_67[0])(_66);
                                _66 = __tco__66;
                                _67 = _210;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
                return go(xs)(ys);
            };
        };
    };
    var catMaybes = concatMap(Data_Maybe.maybe([  ])(singleton));
    var applicativeArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArray({});
                }
            }, 
            pure: singleton
        };
    };
    var applyArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorArray({});
                }
            }, 
            "<*>": Prelude.ap(monadArray({}))
        };
    };
    var monadArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeArray({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindArray({});
                }
            }
        };
    };
    var bindArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArray({});
                }
            }, 
            ">>=": Prelude.flip(concatMap)
        };
    };
    var alternativeArray = function (_) {
        return {
            "__superclasses": {}, 
            empty: [  ], 
            "<|>": append
        };
    };
    return {
        span: span, 
        groupBy: groupBy, 
        "group'": group$prime, 
        group: group, 
        sortBy: sortBy, 
        sort: sort, 
        nubBy: nubBy, 
        nub: nub, 
        zipWith: zipWith, 
        range: range, 
        filter: filter, 
        concatMap: concatMap, 
        intersect: intersect, 
        intersectBy: intersectBy, 
        "\\\\": $bslash$bslash, 
        "delete": $$delete, 
        deleteBy: deleteBy, 
        updateAt: updateAt, 
        deleteAt: deleteAt, 
        insertAt: insertAt, 
        take: take, 
        drop: drop, 
        reverse: reverse, 
        concat: concat, 
        append: append, 
        elemLastIndex: elemLastIndex, 
        elemIndex: elemIndex, 
        findLastIndex: findLastIndex, 
        findIndex: findIndex, 
        length: length, 
        catMaybes: catMaybes, 
        mapMaybe: mapMaybe, 
        map: map, 
        "null": $$null, 
        init: init, 
        tail: tail, 
        last: last, 
        head: head, 
        singleton: singleton, 
        snoc: snoc, 
        "!!": $bang$bang, 
        functorArray: functorArray, 
        applyArray: applyArray, 
        applicativeArray: applicativeArray, 
        bindArray: bindArray, 
        monadArray: monadArray, 
        semigroupArray: semigroupArray, 
        alternativeArray: alternativeArray
    };
})();
var PS = PS || {};
PS.Data_Array_Unsafe = (function () {
    "use strict";
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var tail = function (_75) {
        if (_75.length > 0) {
            var _213 = _75.slice(1);
            return _213;
        };
        throw "Failed pattern match";
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_74) {
        if (_74.length > 0) {
            var _216 = _74.slice(1);
            return _74[0];
        };
        throw "Failed pattern match";
    };
    return {
        init: init, 
        last: last, 
        tail: tail, 
        head: head
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function returnE(a) {  return function() {    return a;  };};
    function bindE(a) {  return function(f) {    return function() {      return f(a())();    };  };};
    function runPure(f) {  return f();};
    function untilE(f) {  return function() {    while (!f()) { }    return {};  };};
    function whileE(f) {  return function(a) {    return function() {      while (f()) {        a();      }      return {};    };  };};
    function forE(lo) {  return function(hi) {    return function(f) {      return function() {        for (var i = lo; i < hi; i++) {          f(i)();        }      };    };  };};
    function foreachE(as) {  return function(f) {    for (var i = 0; i < as.length; i++) {      f(as[i])();    }  };};
    var applicativeEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            pure: returnE
        };
    };
    var applyEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorEff({});
                }
            }, 
            "<*>": Prelude.ap(monadEff({}))
        };
    };
    var functorEff = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": Prelude.liftA1(applicativeEff({}))
        };
    };
    var monadEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeEff({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindEff({});
                }
            }
        };
    };
    var bindEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            ">>=": bindE
        };
    };
    return {
        foreachE: foreachE, 
        forE: forE, 
        whileE: whileE, 
        untilE: untilE, 
        runPure: runPure, 
        bindE: bindE, 
        returnE: returnE, 
        functorEff: functorEff, 
        applyEff: applyEff, 
        applicativeEff: applicativeEff, 
        bindEff: bindEff, 
        monadEff: monadEff
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Exception = (function () {
    "use strict";
    function throwException(e) {  return function() {    throw e;  };};
    function catchException(c) {  return function(t) {    return function() {      try {        return t();      } catch(e) {        return c(e)();      }    };  };};
    return {
        catchException: catchException, 
        throwException: throwException
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Random = (function () {
    "use strict";
    function random() {  return Math.random();};
    return {
        random: random
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Unsafe = (function () {
    "use strict";
    function unsafeInterleaveEff(f) {  return f;};
    return {
        unsafeInterleaveEff: unsafeInterleaveEff
    };
})();
var PS = PS || {};
PS.Control_Monad_ST = (function () {
    "use strict";
    function newSTRef(val) {  return function () {    return { value: val };  };};
    function readSTRef(ref) {  return function() {    return ref.value;  };};
    function modifySTRef(ref) {  return function(f) {    return function() {      return ref.value = f(ref.value);    };  };};
    function writeSTRef(ref) {  return function(a) {    return function() {      return ref.value = a;    };  };};
    function newSTArray(len) {  return function(a) {    return function() {      var arr = [];      for (var i = 0; i < len; i++) {        arr[i] = a;      };      return arr;    };  };};
    function peekSTArray(arr) {  return function(i) {    return function() {      return arr[i];    };  };};
    function pokeSTArray(arr) {  return function(i) {    return function(a) {      return function() {        return arr[i] = a;      };    };  };};
    function runST(f) {  return f;};
    function runSTArray(f) {  return f;};
    return {
        runSTArray: runSTArray, 
        runST: runST, 
        pokeSTArray: pokeSTArray, 
        peekSTArray: peekSTArray, 
        newSTArray: newSTArray, 
        writeSTRef: writeSTRef, 
        modifySTRef: modifySTRef, 
        readSTRef: readSTRef, 
        newSTRef: newSTRef
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function trace(s) {  return function() {    console.log(s);    return {};  };};
    var print = function (__dict_Show_27) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_27)(o));
        };
    };
    return {
        print: print, 
        trace: trace
    };
})();
var PS = PS || {};
PS.Main = (function () {
    "use strict";
    var Debug_Trace = PS.Debug_Trace;
    var main = Debug_Trace.trace("wowzers");
    return {
        main: main
    };
})();
var PS = PS || {};
PS.Test_QuickCheck_LCG = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Gen = function (value0) {
        return {
            ctor: "Test.QuickCheck.LCG.Gen", 
            values: [ value0 ]
        };
    };
    function randomSeed() {  return Math.floor(Math.random() * (1 << 30));};
    function float32ToInt32(n) {  var arr = new ArrayBuffer(4);  var fv = new Float32Array(arr);  var iv = new Int32Array(arr);  fv[0] = n;  return iv[0];};
    var runGen = function (_76) {
        return _76.values[0];
    };
    var lcgN = 1 << 30;
    var lcgM = 1103515245;
    var lcgC = 12345;
    var lcgNext = function (n) {
        return (lcgM * n + lcgC) % lcgN;
    };
    var lcgStep = Gen(function (l) {
        return {
            value: l, 
            newSeed: lcgNext(l)
        };
    });
    var perturbGen = function (_77) {
        return function (_78) {
            return Gen(function (l) {
                return _78.values[0](lcgNext(float32ToInt32(_77)) + l);
            });
        };
    };
    var functorGen = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_79) {
                return function (_80) {
                    return Gen(function (l) {
                        return (function (_224) {
                            return {
                                value: _79(_224.value), 
                                newSeed: _224.newSeed
                            };
                        })(_80.values[0](l));
                    });
                };
            }
        };
    };
    var uniform = Prelude["<$>"](functorGen({}))(function (n) {
        return n / (1 << 30);
    })(lcgStep);
    var evalGen = function (gen) {
        return function (seed) {
            return (runGen(gen)(seed)).value;
        };
    };
    var applyGen = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorGen({});
                }
            }, 
            "<*>": function (_81) {
                return function (_82) {
                    return Gen(function (l) {
                        return (function (_230) {
                            return (function (_231) {
                                return {
                                    value: _230.value(_231.value), 
                                    newSeed: _231.newSeed
                                };
                            })(_82.values[0](_230.newSeed));
                        })(_81.values[0](l));
                    });
                };
            }
        };
    };
    var bindGen = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyGen({});
                }
            }, 
            ">>=": function (_83) {
                return function (_84) {
                    return Gen(function (l) {
                        return (function (_240) {
                            return runGen(_84(_240.value))(_240.newSeed);
                        })(_83.values[0](l));
                    });
                };
            }
        };
    };
    var applicativeGen = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyGen({});
                }
            }, 
            pure: function (a) {
                return Gen(function (l) {
                    return {
                        value: a, 
                        newSeed: l
                    };
                });
            }
        };
    };
    var monadGen = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeGen({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindGen({});
                }
            }
        };
    };
    return {
        Gen: Gen, 
        perturbGen: perturbGen, 
        float32ToInt32: float32ToInt32, 
        uniform: uniform, 
        lcgStep: lcgStep, 
        lcgNext: lcgNext, 
        lcgN: lcgN, 
        lcgC: lcgC, 
        lcgM: lcgM, 
        randomSeed: randomSeed, 
        evalGen: evalGen, 
        runGen: runGen, 
        functorGen: functorGen, 
        applyGen: applyGen, 
        applicativeGen: applicativeGen, 
        bindGen: bindGen, 
        monadGen: monadGen
    };
})();
var PS = PS || {};
PS.Test_QuickCheck = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Test_QuickCheck_LCG = PS.Test_QuickCheck_LCG;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Control_Monad_Eff_Exception = PS.Control_Monad_Eff_Exception;
    var Debug_Trace = PS.Debug_Trace;
    var Success = {
        ctor: "Test.QuickCheck.Success", 
        values: [  ]
    };
    var Failed = function (value0) {
        return {
            ctor: "Test.QuickCheck.Failed", 
            values: [ value0 ]
        };
    };
    var $less$qmark$greater = function (_85) {
        return function (_86) {
            if (_85) {
                return Success;
            };
            if (!_85) {
                return Failed(_86);
            };
            throw "Failed pattern match";
        };
    };
    var testableResult = function (_) {
        return {
            "__superclasses": {}, 
            test: Prelude["return"](Test_QuickCheck_LCG.monadGen({}))
        };
    };
    var testableBoolean = function (_) {
        return {
            "__superclasses": {}, 
            test: function (_93) {
                if (_93) {
                    return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))(Success);
                };
                if (!_93) {
                    return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))(Failed("Test returned false"));
                };
                throw "Failed pattern match";
            }
        };
    };
    var test = function (dict) {
        return dict.test;
    };
    var showResult = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_87) {
                if (_87.ctor === "Test.QuickCheck.Success") {
                    return "Success";
                };
                if (_87.ctor === "Test.QuickCheck.Failed") {
                    return "Failed: " + _87.values[0];
                };
                throw "Failed pattern match";
            }
        };
    };
    var repeatable = function (f) {
        return Test_QuickCheck_LCG.Gen(function (l) {
            return {
                value: function (a) {
                    return (Test_QuickCheck_LCG.runGen(f(a))(l)).value;
                }, 
                newSeed: l
            };
        });
    };
    var quickCheckPure = function (__dict_Testable_28) {
        return function (seed) {
            return function (n) {
                return function (prop) {
                    var go = function (_94) {
                        if (_94 <= 0) {
                            return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))([  ]);
                        };
                        return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(test(__dict_Testable_28)(prop))(function (_10) {
                            return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(go(_94 - 1))(function (_9) {
                                return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))(Prelude[":"](_10)(_9));
                            });
                        });
                    };
                    return Test_QuickCheck_LCG.evalGen(go(n))(seed);
                };
            };
        };
    };
    var quickCheck$prime = function (__dict_Testable_29) {
        return function (n) {
            return function (prop) {
                var throwOnFirstFailure = function (__copy__95) {
                    return function (__copy__96) {
                        var _95 = __copy__95;
                        var _96 = __copy__96;
                        tco: while (true) {
                            if (_96.length === 0) {
                                return Prelude["return"](Control_Monad_Eff.monadEff({}))(Prelude.unit);
                            };
                            var n = _95;
                            if (_96.length > 0) {
                                var _255 = _96.slice(1);
                                if ((_96[0]).ctor === "Test.QuickCheck.Failed") {
                                    return Control_Monad_Eff_Exception.throwException("Test " + Prelude.show(Prelude.showNumber({}))(n) + " failed: \n" + (_96[0]).values[0]);
                                };
                            };
                            if (_96.length > 0) {
                                var _258 = _96.slice(1);
                                var __tco__95 = _95 + 1;
                                _95 = __tco__95;
                                _96 = _258;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
                var countSuccesses = function (_97) {
                    if (_97.length === 0) {
                        return 0;
                    };
                    if (_97.length > 0) {
                        var _261 = _97.slice(1);
                        if ((_97[0]).ctor === "Test.QuickCheck.Success") {
                            return 1 + countSuccesses(_261);
                        };
                    };
                    if (_97.length > 0) {
                        var _263 = _97.slice(1);
                        return countSuccesses(_263);
                    };
                    throw "Failed pattern match";
                };
                return function __do() {
                    var _11 = Test_QuickCheck_LCG.randomSeed();
                    return (function () {
                        var results = quickCheckPure(__dict_Testable_29)(_11)(n)(prop);
                        var successes = countSuccesses(results);
                        return function __do() {
                            Debug_Trace.trace(Prelude.show(Prelude.showNumber({}))(successes) + "/" + Prelude.show(Prelude.showNumber({}))(n) + " test(s) passed.")();
                            return throwOnFirstFailure(1)(results)();
                        };
                    })()();
                };
            };
        };
    };
    var quickCheck = function (__dict_Testable_30) {
        return function (prop) {
            return quickCheck$prime(__dict_Testable_30)(100)(prop);
        };
    };
    var coarbitrary = function (dict) {
        return dict.coarbitrary;
    };
    var coarbNumber = function (_) {
        return {
            "__superclasses": {}, 
            coarbitrary: Test_QuickCheck_LCG.perturbGen
        };
    };
    var coarbBoolean = function (_) {
        return {
            "__superclasses": {}, 
            coarbitrary: function (_88) {
                return function (_89) {
                    if (_88) {
                        return Test_QuickCheck_LCG.Gen(function (l) {
                            return _89.values[0](l + 1);
                        });
                    };
                    if (!_88) {
                        return Test_QuickCheck_LCG.Gen(function (l) {
                            return _89.values[0](l + 2);
                        });
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var coarbArray = function (__dict_CoArbitrary_31) {
        return {
            "__superclasses": {}, 
            coarbitrary: function (_92) {
                if (_92.length === 0) {
                    return Prelude.id(Prelude.categoryArr({}));
                };
                if (_92.length > 0) {
                    var _271 = _92.slice(1);
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(coarbitrary(coarbArray(__dict_CoArbitrary_31))(_271))(coarbitrary(__dict_CoArbitrary_31)(_92[0]));
                };
                throw "Failed pattern match";
            }
        };
    };
    var arbitrary = function (dict) {
        return dict.arbitrary;
    };
    var testableFunction = function (__dict_Arbitrary_34) {
        return function (__dict_Testable_35) {
            return {
                "__superclasses": {}, 
                test: function (f) {
                    return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(__dict_Arbitrary_34))(function (_8) {
                        return test(__dict_Testable_35)(f(_8));
                    });
                }
            };
        };
    };
    var arbNumber = function (_) {
        return {
            "__superclasses": {}, 
            arbitrary: Test_QuickCheck_LCG.uniform
        };
    };
    var arbFunction = function (__dict_CoArbitrary_36) {
        return function (__dict_Arbitrary_37) {
            return {
                "__superclasses": {}, 
                arbitrary: repeatable(function (a) {
                    return coarbitrary(__dict_CoArbitrary_36)(a)(arbitrary(__dict_Arbitrary_37));
                })
            };
        };
    };
    var arbBoolean = function (_) {
        return {
            "__superclasses": {}, 
            arbitrary: Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(Test_QuickCheck_LCG.uniform)(function (_3) {
                return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))((_3 * 2) < 1);
            })
        };
    };
    var arbArray = function (__dict_Arbitrary_38) {
        return {
            "__superclasses": {}, 
            arbitrary: Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(arbBoolean({})))(function (_7) {
                return _7 ? Prelude["return"](Test_QuickCheck_LCG.monadGen({}))([  ]) : Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(__dict_Arbitrary_38))(function (_6) {
    return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(arbArray(__dict_Arbitrary_38)))(function (_5) {
        return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))(Prelude[":"](_6)(_5));
    });
});
            })
        };
    };
    var coarbFunction = function (__dict_Arbitrary_32) {
        return function (__dict_CoArbitrary_33) {
            return {
                "__superclasses": {}, 
                coarbitrary: function (f) {
                    return function (gen) {
                        var map = function (_90) {
                            return function (_91) {
                                if (_91.length === 0) {
                                    return [  ];
                                };
                                if (_91.length > 0) {
                                    var _280 = _91.slice(1);
                                    return Prelude[":"](_90(_91[0]))(map(_90)(_280));
                                };
                                throw "Failed pattern match";
                            };
                        };
                        return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(arbArray(__dict_Arbitrary_32)))(function (_4) {
                            return coarbitrary(coarbArray(__dict_CoArbitrary_33))(map(f)(_4))(gen);
                        });
                    };
                }
            };
        };
    };
    return {
        Success: Success, 
        Failed: Failed, 
        quickCheck: quickCheck, 
        "quickCheck'": quickCheck$prime, 
        quickCheckPure: quickCheckPure, 
        test: test, 
        repeatable: repeatable, 
        "<?>": $less$qmark$greater, 
        coarbitrary: coarbitrary, 
        arbitrary: arbitrary, 
        showResult: showResult, 
        arbNumber: arbNumber, 
        coarbNumber: coarbNumber, 
        arbBoolean: arbBoolean, 
        coarbBoolean: coarbBoolean, 
        arbFunction: arbFunction, 
        coarbFunction: coarbFunction, 
        arbArray: arbArray, 
        coarbArray: coarbArray, 
        testableResult: testableResult, 
        testableBoolean: testableBoolean, 
        testableFunction: testableFunction
    };
})();
PS.Main.main();
