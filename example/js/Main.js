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
            show: function (_18) {
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
            show: function (_26) {
                if (_26.ctor === "Prelude.LT") {
                    return "LT";
                };
                if (_26.ctor === "Prelude.GT") {
                    return "GT";
                };
                if (_26.ctor === "Prelude.EQ") {
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
            show: function (_19) {
                if (_19) {
                    return "true";
                };
                if (!_19) {
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
            "<>": function (_33) {
                return function (_34) {
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
            "==": function (_20) {
                return function (_21) {
                    return true;
                };
            }, 
            "/=": function (_22) {
                return function (_23) {
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
            compare: function (_27) {
                return function (_28) {
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
            compare: function (_29) {
                return function (_30) {
                    if (!_29) {
                        if (!_30) {
                            return EQ;
                        };
                    };
                    if (!_29) {
                        if (_30) {
                            return LT;
                        };
                    };
                    if (_29) {
                        if (_30) {
                            return EQ;
                        };
                    };
                    if (_29) {
                        if (!_30) {
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
    var $$const = function (_14) {
        return function (_15) {
            return _14;
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
                return (function (_280) {
                    if (_280.ctor === "Prelude.LT") {
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
                return (function (_281) {
                    if (_281.ctor === "Prelude.GT") {
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
                return (function (_282) {
                    if (_282.ctor === "Prelude.GT") {
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
                return (function (_283) {
                    if (_283.ctor === "Prelude.LT") {
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
            compare: function (_31) {
                return function (_32) {
                    if (_31.length === 0) {
                        if (_32.length === 0) {
                            return EQ;
                        };
                    };
                    if (_31.length === 0) {
                        return LT;
                    };
                    if (_32.length === 0) {
                        return GT;
                    };
                    if (_31.length > 0) {
                        var _290 = _31.slice(1);
                        if (_32.length > 0) {
                            var _288 = _32.slice(1);
                            return (function (_286) {
                                if (_286.ctor === "Prelude.EQ") {
                                    return compare(ordArray(__dict_Ord_9))(_290)(_288);
                                };
                                return _286;
                            })(compare(__dict_Ord_9)(_31[0])(_32[0]));
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
            "==": function (_24) {
                return function (_25) {
                    if (_24.ctor === "Prelude.LT") {
                        if (_25.ctor === "Prelude.LT") {
                            return true;
                        };
                    };
                    if (_24.ctor === "Prelude.GT") {
                        if (_25.ctor === "Prelude.GT") {
                            return true;
                        };
                    };
                    if (_24.ctor === "Prelude.EQ") {
                        if (_25.ctor === "Prelude.EQ") {
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
    var asTypeOf = function (_16) {
        return function (_17) {
            return _16;
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
            show: function (_46) {
                if (_46.ctor === "Data.Maybe.Just") {
                    return "Just (" + Prelude.show(__dict_Show_15)(_46.values[0]) + ")";
                };
                if (_46.ctor === "Data.Maybe.Nothing") {
                    return "Nothing";
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybe = function (_35) {
        return function (_36) {
            return function (_37) {
                if (_37.ctor === "Data.Maybe.Nothing") {
                    return _35;
                };
                if (_37.ctor === "Data.Maybe.Just") {
                    return _36(_37.values[0]);
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
            "<$>": function (_38) {
                return function (_39) {
                    if (_39.ctor === "Data.Maybe.Just") {
                        return Just(_38(_39.values[0]));
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
            "==": function (_47) {
                return function (_48) {
                    if (_47.ctor === "Data.Maybe.Nothing") {
                        if (_48.ctor === "Data.Maybe.Nothing") {
                            return true;
                        };
                    };
                    if (_47.ctor === "Data.Maybe.Just") {
                        if (_48.ctor === "Data.Maybe.Just") {
                            return Prelude["=="](__dict_Eq_17)(_47.values[0])(_48.values[0]);
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
            compare: function (_49) {
                return function (_50) {
                    if (_49.ctor === "Data.Maybe.Just") {
                        if (_50.ctor === "Data.Maybe.Just") {
                            return Prelude.compare(__dict_Ord_16)(_49.values[0])(_50.values[0]);
                        };
                    };
                    if (_49.ctor === "Data.Maybe.Nothing") {
                        if (_50.ctor === "Data.Maybe.Nothing") {
                            return Prelude.EQ;
                        };
                    };
                    if (_49.ctor === "Data.Maybe.Nothing") {
                        return Prelude.LT;
                    };
                    if (_50.ctor === "Data.Maybe.Nothing") {
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
            "<*>": function (_40) {
                return function (_41) {
                    if (_40.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"](functorMaybe({}))(_40.values[0])(_41);
                    };
                    if (_40.ctor === "Data.Maybe.Nothing") {
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
            ">>=": function (_44) {
                return function (_45) {
                    if (_44.ctor === "Data.Maybe.Just") {
                        return _45(_44.values[0]);
                    };
                    if (_44.ctor === "Data.Maybe.Nothing") {
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
            "<|>": function (_42) {
                return function (_43) {
                    if (_42.ctor === "Data.Maybe.Nothing") {
                        return _43;
                    };
                    return _42;
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
    var fromJust = function (_51) {
        if (_51.ctor === "Data.Maybe.Just") {
            return _51.values[0];
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
    var liftRef = function (_52) {
        return function (_53) {
            return function (_54) {
                return _52(_53.values[0])(_54.values[0]);
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
PS.Data_Either = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Left = function (value0) {
        return {
            ctor: "Data.Either.Left", 
            values: [ value0 ]
        };
    };
    var Right = function (value0) {
        return {
            ctor: "Data.Either.Right", 
            values: [ value0 ]
        };
    };
    var showEither = function (__dict_Show_18) {
        return function (__dict_Show_19) {
            return {
                "__superclasses": {}, 
                show: function (_62) {
                    if (_62.ctor === "Data.Either.Left") {
                        return "Left (" + Prelude.show(__dict_Show_18)(_62.values[0]) + ")";
                    };
                    if (_62.ctor === "Data.Either.Right") {
                        return "Right (" + Prelude.show(__dict_Show_19)(_62.values[0]) + ")";
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var functorEither = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_58) {
                return function (_59) {
                    if (_59.ctor === "Data.Either.Left") {
                        return Left(_59.values[0]);
                    };
                    if (_59.ctor === "Data.Either.Right") {
                        return Right(_58(_59.values[0]));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqEither = function (__dict_Eq_22) {
        return function (__dict_Eq_23) {
            return {
                "__superclasses": {}, 
                "==": function (_63) {
                    return function (_64) {
                        if (_63.ctor === "Data.Either.Left") {
                            if (_64.ctor === "Data.Either.Left") {
                                return Prelude["=="](__dict_Eq_22)(_63.values[0])(_64.values[0]);
                            };
                        };
                        if (_63.ctor === "Data.Either.Right") {
                            if (_64.ctor === "Data.Either.Right") {
                                return Prelude["=="](__dict_Eq_23)(_63.values[0])(_64.values[0]);
                            };
                        };
                        return false;
                    };
                }, 
                "/=": function (a) {
                    return function (b) {
                        return !Prelude["=="](eqEither(__dict_Eq_22)(__dict_Eq_23))(a)(b);
                    };
                }
            };
        };
    };
    var ordEither = function (__dict_Ord_20) {
        return function (__dict_Ord_21) {
            return {
                "__superclasses": {
                    "Prelude.Eq_0": function (_) {
                        return eqEither(__dict_Ord_20["__superclasses"]["Prelude.Eq_0"]({}))(__dict_Ord_21["__superclasses"]["Prelude.Eq_0"]({}));
                    }
                }, 
                compare: function (_65) {
                    return function (_66) {
                        if (_65.ctor === "Data.Either.Left") {
                            if (_66.ctor === "Data.Either.Left") {
                                return Prelude.compare(__dict_Ord_20)(_65.values[0])(_66.values[0]);
                            };
                        };
                        if (_65.ctor === "Data.Either.Right") {
                            if (_66.ctor === "Data.Either.Right") {
                                return Prelude.compare(__dict_Ord_21)(_65.values[0])(_66.values[0]);
                            };
                        };
                        if (_65.ctor === "Data.Either.Left") {
                            return Prelude.LT;
                        };
                        if (_66.ctor === "Data.Either.Left") {
                            return Prelude.GT;
                        };
                        throw "Failed pattern match";
                    };
                }
            };
        };
    };
    var either = function (_55) {
        return function (_56) {
            return function (_57) {
                if (_57.ctor === "Data.Either.Left") {
                    return _55(_57.values[0]);
                };
                if (_57.ctor === "Data.Either.Right") {
                    return _56(_57.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isLeft = either(Prelude["const"](true))(Prelude["const"](false));
    var isRight = either(Prelude["const"](false))(Prelude["const"](true));
    var applyEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorEither({});
                }
            }, 
            "<*>": function (_60) {
                return function (_61) {
                    if (_60.ctor === "Data.Either.Left") {
                        return Left(_60.values[0]);
                    };
                    if (_60.ctor === "Data.Either.Right") {
                        return Prelude["<$>"](functorEither({}))(_60.values[0])(_61);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var bindEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEither({});
                }
            }, 
            ">>=": either(function (e) {
                return function (_) {
                    return Left(e);
                };
            })(function (a) {
                return function (f) {
                    return f(a);
                };
            })
        };
    };
    var applicativeEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEither({});
                }
            }, 
            pure: Right
        };
    };
    var monadEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeEither({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindEither({});
                }
            }
        };
    };
    return {
        Left: Left, 
        Right: Right, 
        isRight: isRight, 
        isLeft: isLeft, 
        either: either, 
        functorEither: functorEither, 
        applyEither: applyEither, 
        applicativeEither: applicativeEither, 
        bindEither: bindEither, 
        monadEither: monadEither, 
        showEither: showEither, 
        eqEither: eqEither, 
        ordEither: ordEither
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
    var tail = function (_69) {
        if (_69.length > 0) {
            var _361 = _69.slice(1);
            return Data_Maybe.Just(_361);
        };
        return Data_Maybe.Nothing;
    };
    var span = (function () {
        var go = function (__copy__85) {
            return function (__copy__86) {
                return function (__copy__87) {
                    var _85 = __copy__85;
                    var _86 = __copy__86;
                    var _87 = __copy__87;
                    tco: while (true) {
                        var acc = _85;
                        if (_87.length > 0) {
                            var _366 = _87.slice(1);
                            if (_86(_87[0])) {
                                var __tco__85 = Prelude[":"](_87[0])(acc);
                                var __tco__86 = _86;
                                _85 = __tco__85;
                                _86 = __tco__86;
                                _87 = _366;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_85), 
                            rest: _87
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
                    return (function (_367) {
                        if (_367.ctor === "Prelude.GT") {
                            return 1;
                        };
                        if (_367.ctor === "Prelude.EQ") {
                            return 0;
                        };
                        if (_367.ctor === "Prelude.LT") {
                            return -1;
                        };
                        throw "Failed pattern match";
                    })(comp(x)(y));
                };
            };
            return sortJS(comp$prime)(xs);
        };
    };
    var sort = function (__dict_Ord_24) {
        return function (xs) {
            return sortBy(Prelude.compare(__dict_Ord_24))(xs);
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
    var $$null = function (_71) {
        if (_71.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_78) {
        return function (_79) {
            if (_79.length === 0) {
                return [  ];
            };
            if (_79.length > 0) {
                var _372 = _79.slice(1);
                return Prelude[":"](_79[0])(nubBy(_78)(filter(function (y) {
                    return !_78(_79[0])(y);
                })(_372)));
            };
            throw "Failed pattern match";
        };
    };
    var nub = function (__dict_Eq_25) {
        return nubBy(Prelude["=="](__dict_Eq_25));
    };
    var mapMaybe = function (f) {
        return concatMap(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe.maybe([  ])(singleton))(f));
    };
    var last = function (__copy__68) {
        var _68 = __copy__68;
        tco: while (true) {
            if (_68.length > 0) {
                var _375 = _68.slice(1);
                if (_375.length === 0) {
                    return Data_Maybe.Just(_68[0]);
                };
            };
            if (_68.length > 0) {
                var _377 = _68.slice(1);
                _68 = _377;
                continue tco;
            };
            return Data_Maybe.Nothing;
        };
    };
    var intersectBy = function (_75) {
        return function (_76) {
            return function (_77) {
                if (_76.length === 0) {
                    return [  ];
                };
                if (_77.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_75(x))(_77) >= 0;
                };
                return filter(el)(_76);
            };
        };
    };
    var intersect = function (__dict_Eq_26) {
        return intersectBy(Prelude["=="](__dict_Eq_26));
    };
    var init = function (_70) {
        if (_70.length === 0) {
            return Data_Maybe.Nothing;
        };
        return Data_Maybe.Just(slice(0)(length(_70) - 1)(_70));
    };
    var head = function (_67) {
        if (_67.length > 0) {
            var _384 = _67.slice(1);
            return Data_Maybe.Just(_67[0]);
        };
        return Data_Maybe.Nothing;
    };
    var groupBy = (function () {
        var go = function (__copy__82) {
            return function (__copy__83) {
                return function (__copy__84) {
                    var _82 = __copy__82;
                    var _83 = __copy__83;
                    var _84 = __copy__84;
                    tco: while (true) {
                        var acc = _82;
                        if (_84.length === 0) {
                            return reverse(acc);
                        };
                        if (_84.length > 0) {
                            var _389 = _84.slice(1);
                            var sp = span(_83(_84[0]))(_389);
                            var __tco__82 = Prelude[":"](Prelude[":"](_84[0])(sp.init))(_82);
                            var __tco__83 = _83;
                            _82 = __tco__82;
                            _83 = __tco__83;
                            _84 = sp.rest;
                            continue tco;
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        return go([  ]);
    })();
    var group = function (__dict_Eq_27) {
        return function (xs) {
            return groupBy(Prelude["=="](__dict_Eq_27))(xs);
        };
    };
    var group$prime = function (__dict_Ord_28) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(group(__dict_Ord_28["__superclasses"]["Prelude.Eq_0"]({})))(sort(__dict_Ord_28));
    };
    var functorArray = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": map
        };
    };
    var elemLastIndex = function (__dict_Eq_29) {
        return function (x) {
            return findLastIndex(Prelude["=="](__dict_Eq_29)(x));
        };
    };
    var elemIndex = function (__dict_Eq_30) {
        return function (x) {
            return findIndex(Prelude["=="](__dict_Eq_30)(x));
        };
    };
    var deleteBy = function (_72) {
        return function (_73) {
            return function (_74) {
                if (_74.length === 0) {
                    return [  ];
                };
                return (function (_393) {
                    if (_393 < 0) {
                        return _74;
                    };
                    return deleteAt(_393)(1)(_74);
                })(findIndex(_72(_73))(_74));
            };
        };
    };
    var $$delete = function (__dict_Eq_31) {
        return deleteBy(Prelude["=="](__dict_Eq_31));
    };
    var $bslash$bslash = function (__dict_Eq_32) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__80) {
                    return function (__copy__81) {
                        var _80 = __copy__80;
                        var _81 = __copy__81;
                        tco: while (true) {
                            var xs = _80;
                            if (_81.length === 0) {
                                return xs;
                            };
                            if (_80.length === 0) {
                                return [  ];
                            };
                            if (_81.length > 0) {
                                var _397 = _81.slice(1);
                                var __tco__80 = $$delete(__dict_Eq_32)(_81[0])(_80);
                                _80 = __tco__80;
                                _81 = _397;
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
    var tail = function (_89) {
        if (_89.length > 0) {
            var _400 = _89.slice(1);
            return _400;
        };
        throw "Failed pattern match";
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_88) {
        if (_88.length > 0) {
            var _403 = _88.slice(1);
            return _88[0];
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
PS.Data_Monoid = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var monoidUnit = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Prelude.semigroupUnit({});
                }
            }, 
            mempty: Prelude.unit
        };
    };
    var monoidString = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Prelude.semigroupString({});
                }
            }, 
            mempty: ""
        };
    };
    var monoidArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Data_Array.semigroupArray({});
                }
            }, 
            mempty: [  ]
        };
    };
    var mempty = function (dict) {
        return dict.mempty;
    };
    return {
        mempty: mempty, 
        monoidString: monoidString, 
        monoidArray: monoidArray, 
        monoidUnit: monoidUnit
    };
})();
var PS = PS || {};
PS.Data_Monoid_All = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var All = function (value0) {
        return {
            ctor: "Data.Monoid.All.All", 
            values: [ value0 ]
        };
    };
    var showAll = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_95) {
                return "All (" + Prelude.show(Prelude.showBoolean({}))(_95.values[0]) + ")";
            }
        };
    };
    var semigroupAll = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_96) {
                return function (_97) {
                    return All(_96.values[0] && _97.values[0]);
                };
            }
        };
    };
    var runAll = function (_90) {
        return _90.values[0];
    };
    var monoidAll = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupAll({});
                }
            }, 
            mempty: All(true)
        };
    };
    var eqAll = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_91) {
                return function (_92) {
                    return _91.values[0] === _92.values[0];
                };
            }, 
            "/=": function (_93) {
                return function (_94) {
                    return _93.values[0] !== _94.values[0];
                };
            }
        };
    };
    return {
        All: All, 
        runAll: runAll, 
        eqAll: eqAll, 
        showAll: showAll, 
        semigroupAll: semigroupAll, 
        monoidAll: monoidAll
    };
})();
var PS = PS || {};
PS.Data_Monoid_Any = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Any = function (value0) {
        return {
            ctor: "Data.Monoid.Any.Any", 
            values: [ value0 ]
        };
    };
    var showAny = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_103) {
                return "Any (" + Prelude.show(Prelude.showBoolean({}))(_103.values[0]) + ")";
            }
        };
    };
    var semigroupAny = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_104) {
                return function (_105) {
                    return Any(_104.values[0] || _105.values[0]);
                };
            }
        };
    };
    var runAny = function (_98) {
        return _98.values[0];
    };
    var monoidAny = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupAny({});
                }
            }, 
            mempty: Any(false)
        };
    };
    var eqAny = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_99) {
                return function (_100) {
                    return _99.values[0] === _100.values[0];
                };
            }, 
            "/=": function (_101) {
                return function (_102) {
                    return _101.values[0] !== _102.values[0];
                };
            }
        };
    };
    return {
        Any: Any, 
        runAny: runAny, 
        eqAny: eqAny, 
        showAny: showAny, 
        semigroupAny: semigroupAny, 
        monoidAny: monoidAny
    };
})();
var PS = PS || {};
PS.Data_Monoid_Dual = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Dual = function (value0) {
        return {
            ctor: "Data.Monoid.Dual.Dual", 
            values: [ value0 ]
        };
    };
    var showDual = function (__dict_Show_33) {
        return {
            "__superclasses": {}, 
            show: function (_113) {
                return "Dual (" + Prelude.show(__dict_Show_33)(_113.values[0]) + ")";
            }
        };
    };
    var semigroupDual = function (__dict_Semigroup_34) {
        return {
            "__superclasses": {}, 
            "<>": function (_114) {
                return function (_115) {
                    return Dual(Prelude["<>"](__dict_Semigroup_34)(_115.values[0])(_114.values[0]));
                };
            }
        };
    };
    var runDual = function (_106) {
        return _106.values[0];
    };
    var monoidDual = function (__dict_Monoid_36) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupDual(__dict_Monoid_36["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }, 
            mempty: Dual(Data_Monoid.mempty(__dict_Monoid_36))
        };
    };
    var eqDual = function (__dict_Eq_37) {
        return {
            "__superclasses": {}, 
            "==": function (_107) {
                return function (_108) {
                    return Prelude["=="](__dict_Eq_37)(_107.values[0])(_108.values[0]);
                };
            }, 
            "/=": function (_109) {
                return function (_110) {
                    return Prelude["/="](__dict_Eq_37)(_109.values[0])(_110.values[0]);
                };
            }
        };
    };
    var ordDual = function (__dict_Ord_35) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqDual(__dict_Ord_35["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_111) {
                return function (_112) {
                    return Prelude.compare(__dict_Ord_35)(_111.values[0])(_112.values[0]);
                };
            }
        };
    };
    return {
        Dual: Dual, 
        runDual: runDual, 
        eqDual: eqDual, 
        ordDual: ordDual, 
        showDual: showDual, 
        semigroupDual: semigroupDual, 
        monoidDual: monoidDual
    };
})();
var PS = PS || {};
PS.Data_Monoid_Endo = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Endo = function (value0) {
        return {
            ctor: "Data.Monoid.Endo.Endo", 
            values: [ value0 ]
        };
    };
    var semigroupEndo = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_117) {
                return function (_118) {
                    return Endo(Prelude["<<<"](Prelude.semigroupoidArr({}))(_117.values[0])(_118.values[0]));
                };
            }
        };
    };
    var runEndo = function (_116) {
        return _116.values[0];
    };
    var monoidEndo = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupEndo({});
                }
            }, 
            mempty: Endo(Prelude.id(Prelude.categoryArr({})))
        };
    };
    return {
        Endo: Endo, 
        runEndo: runEndo, 
        semigroupEndo: semigroupEndo, 
        monoidEndo: monoidEndo
    };
})();
var PS = PS || {};
PS.Data_Monoid_First = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var First = function (value0) {
        return {
            ctor: "Data.Monoid.First.First", 
            values: [ value0 ]
        };
    };
    var showFirst = function (__dict_Show_38) {
        return {
            "__superclasses": {}, 
            show: function (_126) {
                return "First (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_38))(_126.values[0]) + ")";
            }
        };
    };
    var semigroupFirst = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_127) {
                return function (_128) {
                    if ((_127.values[0]).ctor === "Data.Maybe.Just") {
                        return _127;
                    };
                    return _128;
                };
            }
        };
    };
    var runFirst = function (_119) {
        return _119.values[0];
    };
    var monoidFirst = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupFirst({});
                }
            }, 
            mempty: First(Data_Maybe.Nothing)
        };
    };
    var eqFirst = function (__dict_Eq_40) {
        return {
            "__superclasses": {}, 
            "==": function (_120) {
                return function (_121) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_40))(_120.values[0])(_121.values[0]);
                };
            }, 
            "/=": function (_122) {
                return function (_123) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_40))(_122.values[0])(_123.values[0]);
                };
            }
        };
    };
    var ordFirst = function (__dict_Ord_39) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqFirst(__dict_Ord_39["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_124) {
                return function (_125) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_39))(_124.values[0])(_125.values[0]);
                };
            }
        };
    };
    return {
        First: First, 
        runFirst: runFirst, 
        eqFirst: eqFirst, 
        ordFirst: ordFirst, 
        showFirst: showFirst, 
        semigroupFirst: semigroupFirst, 
        monoidFirst: monoidFirst
    };
})();
var PS = PS || {};
PS.Data_Monoid_Last = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Last = function (value0) {
        return {
            ctor: "Data.Monoid.Last.Last", 
            values: [ value0 ]
        };
    };
    var showLast = function (__dict_Show_41) {
        return {
            "__superclasses": {}, 
            show: function (_136) {
                return "Last (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_41))(_136.values[0]) + ")";
            }
        };
    };
    var semigroupLast = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_137) {
                return function (_138) {
                    if ((_138.values[0]).ctor === "Data.Maybe.Just") {
                        return _138;
                    };
                    if ((_138.values[0]).ctor === "Data.Maybe.Nothing") {
                        return _137;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var runLast = function (_129) {
        return _129.values[0];
    };
    var monoidLast = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupLast({});
                }
            }, 
            mempty: Last(Data_Maybe.Nothing)
        };
    };
    var eqLast = function (__dict_Eq_43) {
        return {
            "__superclasses": {}, 
            "==": function (_130) {
                return function (_131) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_43))(_130.values[0])(_131.values[0]);
                };
            }, 
            "/=": function (_132) {
                return function (_133) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_43))(_132.values[0])(_133.values[0]);
                };
            }
        };
    };
    var ordLast = function (__dict_Ord_42) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqLast(__dict_Ord_42["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_134) {
                return function (_135) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_42))(_134.values[0])(_135.values[0]);
                };
            }
        };
    };
    return {
        Last: Last, 
        runLast: runLast, 
        eqLast: eqLast, 
        ordLast: ordLast, 
        showLast: showLast, 
        semigroupLast: semigroupLast, 
        monoidLast: monoidLast
    };
})();
var PS = PS || {};
PS.Data_Monoid_Product = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Product = function (value0) {
        return {
            ctor: "Data.Monoid.Product.Product", 
            values: [ value0 ]
        };
    };
    var showProduct = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_146) {
                return "Product (" + Prelude.show(Prelude.showNumber({}))(_146.values[0]) + ")";
            }
        };
    };
    var semigroupProduct = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_147) {
                return function (_148) {
                    return Product(_147.values[0] * _148.values[0]);
                };
            }
        };
    };
    var runProduct = function (_139) {
        return _139.values[0];
    };
    var monoidProduct = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupProduct({});
                }
            }, 
            mempty: Product(1)
        };
    };
    var eqProduct = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_140) {
                return function (_141) {
                    return _140.values[0] === _141.values[0];
                };
            }, 
            "/=": function (_142) {
                return function (_143) {
                    return _142.values[0] !== _143.values[0];
                };
            }
        };
    };
    var ordProduct = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqProduct({});
                }
            }, 
            compare: function (_144) {
                return function (_145) {
                    return Prelude.compare(Prelude.ordNumber({}))(_144.values[0])(_145.values[0]);
                };
            }
        };
    };
    return {
        Product: Product, 
        runProduct: runProduct, 
        eqProduct: eqProduct, 
        ordProduct: ordProduct, 
        showProduct: showProduct, 
        semigroupProduct: semigroupProduct, 
        monoidProduct: monoidProduct
    };
})();
var PS = PS || {};
PS.Data_Monoid_Sum = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Sum = function (value0) {
        return {
            ctor: "Data.Monoid.Sum.Sum", 
            values: [ value0 ]
        };
    };
    var showSum = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_156) {
                return "Sum (" + Prelude.show(Prelude.showNumber({}))(_156.values[0]) + ")";
            }
        };
    };
    var semigroupSum = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_157) {
                return function (_158) {
                    return Sum(_157.values[0] + _158.values[0]);
                };
            }
        };
    };
    var runSum = function (_149) {
        return _149.values[0];
    };
    var monoidSum = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupSum({});
                }
            }, 
            mempty: Sum(0)
        };
    };
    var eqSum = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_150) {
                return function (_151) {
                    return _150.values[0] === _151.values[0];
                };
            }, 
            "/=": function (_152) {
                return function (_153) {
                    return _152.values[0] !== _153.values[0];
                };
            }
        };
    };
    var ordSum = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqSum({});
                }
            }, 
            compare: function (_154) {
                return function (_155) {
                    return Prelude.compare(Prelude.ordNumber({}))(_154.values[0])(_155.values[0]);
                };
            }
        };
    };
    return {
        Sum: Sum, 
        runSum: runSum, 
        eqSum: eqSum, 
        ordSum: ordSum, 
        showSum: showSum, 
        semigroupSum: semigroupSum, 
        monoidSum: monoidSum
    };
})();
var PS = PS || {};
PS.Data_Tuple = (function () {
    "use strict";
    var Data_Array = PS.Data_Array;
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Tuple = function (value0) {
        return function (value1) {
            return {
                ctor: "Data.Tuple.Tuple", 
                values: [ value0, value1 ]
            };
        };
    };
    var zip = Data_Array.zipWith(Tuple);
    var unzip = function (_163) {
        if (_163.length > 0) {
            var _548 = _163.slice(1);
            return (function (_544) {
                return Tuple(Prelude[":"]((_163[0]).values[0])(_544.values[0]))(Prelude[":"]((_163[0]).values[1])(_544.values[1]));
            })(unzip(_548));
        };
        if (_163.length === 0) {
            return Tuple([  ])([  ]);
        };
        throw "Failed pattern match";
    };
    var uncurry = function (_161) {
        return function (_162) {
            return _161(_162.values[0])(_162.values[1]);
        };
    };
    var swap = function (_164) {
        return Tuple(_164.values[1])(_164.values[0]);
    };
    var snd = function (_160) {
        return _160.values[1];
    };
    var showTuple = function (__dict_Show_44) {
        return function (__dict_Show_45) {
            return {
                "__superclasses": {}, 
                show: function (_165) {
                    return "Tuple (" + Prelude.show(__dict_Show_44)(_165.values[0]) + ") (" + Prelude.show(__dict_Show_45)(_165.values[1]) + ")";
                }
            };
        };
    };
    var functorTuple = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_170) {
                return function (_171) {
                    return Tuple(_171.values[0])(_170(_171.values[1]));
                };
            }
        };
    };
    var fst = function (_159) {
        return _159.values[0];
    };
    var eqTuple = function (__dict_Eq_49) {
        return function (__dict_Eq_50) {
            return {
                "__superclasses": {}, 
                "==": function (_166) {
                    return function (_167) {
                        return Prelude["=="](__dict_Eq_49)(_166.values[0])(_167.values[0]) && Prelude["=="](__dict_Eq_50)(_166.values[1])(_167.values[1]);
                    };
                }, 
                "/=": function (t1) {
                    return function (t2) {
                        return !Prelude["=="](eqTuple(__dict_Eq_49)(__dict_Eq_50))(t1)(t2);
                    };
                }
            };
        };
    };
    var ordTuple = function (__dict_Ord_46) {
        return function (__dict_Ord_47) {
            return {
                "__superclasses": {
                    "Prelude.Eq_0": function (_) {
                        return eqTuple(__dict_Ord_46["__superclasses"]["Prelude.Eq_0"]({}))(__dict_Ord_47["__superclasses"]["Prelude.Eq_0"]({}));
                    }
                }, 
                compare: function (_168) {
                    return function (_169) {
                        return (function (_579) {
                            if (_579.ctor === "Prelude.EQ") {
                                return Prelude.compare(__dict_Ord_47)(_168.values[1])(_169.values[1]);
                            };
                            return _579;
                        })(Prelude.compare(__dict_Ord_46)(_168.values[0])(_169.values[0]));
                    };
                }
            };
        };
    };
    var curry = function (f) {
        return function (a) {
            return function (b) {
                return f(Tuple(a)(b));
            };
        };
    };
    var applyTuple = function (__dict_Semigroup_52) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorTuple({});
                }
            }, 
            "<*>": function (_172) {
                return function (_173) {
                    return Tuple(Prelude["<>"](__dict_Semigroup_52)(_172.values[0])(_173.values[0]))(_172.values[1](_173.values[1]));
                };
            }
        };
    };
    var bindTuple = function (__dict_Semigroup_51) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyTuple(__dict_Semigroup_51);
                }
            }, 
            ">>=": function (_174) {
                return function (_175) {
                    return (function (_592) {
                        return Tuple(Prelude["<>"](__dict_Semigroup_51)(_174.values[0])(_592.values[0]))(_592.values[1]);
                    })(_175(_174.values[1]));
                };
            }
        };
    };
    var applicativeTuple = function (__dict_Monoid_53) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyTuple(__dict_Monoid_53["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }, 
            pure: Tuple(Data_Monoid.mempty(__dict_Monoid_53))
        };
    };
    var monadTuple = function (__dict_Monoid_48) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeTuple(__dict_Monoid_48);
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindTuple(__dict_Monoid_48["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }
        };
    };
    return {
        Tuple: Tuple, 
        swap: swap, 
        unzip: unzip, 
        zip: zip, 
        uncurry: uncurry, 
        curry: curry, 
        snd: snd, 
        fst: fst, 
        showTuple: showTuple, 
        eqTuple: eqTuple, 
        ordTuple: ordTuple, 
        functorTuple: functorTuple, 
        applyTuple: applyTuple, 
        applicativeTuple: applicativeTuple, 
        bindTuple: bindTuple, 
        monadTuple: monadTuple
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
    var print = function (__dict_Show_54) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_54)(o));
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
    var main = Debug_Trace.trace("wowzers!!!");
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
    var runGen = function (_176) {
        return _176.values[0];
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
    var perturbGen = function (_177) {
        return function (_178) {
            return Gen(function (l) {
                return _178.values[0](lcgNext(float32ToInt32(_177)) + l);
            });
        };
    };
    var functorGen = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_179) {
                return function (_180) {
                    return Gen(function (l) {
                        return (function (_604) {
                            return {
                                value: _179(_604.value), 
                                newSeed: _604.newSeed
                            };
                        })(_180.values[0](l));
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
            "<*>": function (_181) {
                return function (_182) {
                    return Gen(function (l) {
                        return (function (_610) {
                            return (function (_611) {
                                return {
                                    value: _610.value(_611.value), 
                                    newSeed: _611.newSeed
                                };
                            })(_182.values[0](_610.newSeed));
                        })(_181.values[0](l));
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
            ">>=": function (_183) {
                return function (_184) {
                    return Gen(function (l) {
                        return (function (_620) {
                            return runGen(_184(_620.value))(_620.newSeed);
                        })(_183.values[0](l));
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
    var $less$qmark$greater = function (_185) {
        return function (_186) {
            if (_185) {
                return Success;
            };
            if (!_185) {
                return Failed(_186);
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
            test: function (_193) {
                if (_193) {
                    return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))(Success);
                };
                if (!_193) {
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
            show: function (_187) {
                if (_187.ctor === "Test.QuickCheck.Success") {
                    return "Success";
                };
                if (_187.ctor === "Test.QuickCheck.Failed") {
                    return "Failed: " + _187.values[0];
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
    var quickCheckPure = function (__dict_Testable_55) {
        return function (seed) {
            return function (n) {
                return function (prop) {
                    var go = function (_194) {
                        if (_194 <= 0) {
                            return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))([  ]);
                        };
                        return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(test(__dict_Testable_55)(prop))(function (_10) {
                            return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(go(_194 - 1))(function (_9) {
                                return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))(Prelude[":"](_10)(_9));
                            });
                        });
                    };
                    return Test_QuickCheck_LCG.evalGen(go(n))(seed);
                };
            };
        };
    };
    var quickCheck$prime = function (__dict_Testable_56) {
        return function (n) {
            return function (prop) {
                var throwOnFirstFailure = function (__copy__195) {
                    return function (__copy__196) {
                        var _195 = __copy__195;
                        var _196 = __copy__196;
                        tco: while (true) {
                            if (_196.length === 0) {
                                return Prelude["return"](Control_Monad_Eff.monadEff({}))(Prelude.unit);
                            };
                            var n = _195;
                            if (_196.length > 0) {
                                var _635 = _196.slice(1);
                                if ((_196[0]).ctor === "Test.QuickCheck.Failed") {
                                    return Control_Monad_Eff_Exception.throwException("Test " + Prelude.show(Prelude.showNumber({}))(n) + " failed: \n" + (_196[0]).values[0]);
                                };
                            };
                            if (_196.length > 0) {
                                var _638 = _196.slice(1);
                                var __tco__195 = _195 + 1;
                                _195 = __tco__195;
                                _196 = _638;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
                var countSuccesses = function (_197) {
                    if (_197.length === 0) {
                        return 0;
                    };
                    if (_197.length > 0) {
                        var _641 = _197.slice(1);
                        if ((_197[0]).ctor === "Test.QuickCheck.Success") {
                            return 1 + countSuccesses(_641);
                        };
                    };
                    if (_197.length > 0) {
                        var _643 = _197.slice(1);
                        return countSuccesses(_643);
                    };
                    throw "Failed pattern match";
                };
                return function __do() {
                    var _11 = Test_QuickCheck_LCG.randomSeed();
                    return (function () {
                        var results = quickCheckPure(__dict_Testable_56)(_11)(n)(prop);
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
    var quickCheck = function (__dict_Testable_57) {
        return function (prop) {
            return quickCheck$prime(__dict_Testable_57)(100)(prop);
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
            coarbitrary: function (_188) {
                return function (_189) {
                    if (_188) {
                        return Test_QuickCheck_LCG.Gen(function (l) {
                            return _189.values[0](l + 1);
                        });
                    };
                    if (!_188) {
                        return Test_QuickCheck_LCG.Gen(function (l) {
                            return _189.values[0](l + 2);
                        });
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var coarbArray = function (__dict_CoArbitrary_58) {
        return {
            "__superclasses": {}, 
            coarbitrary: function (_192) {
                if (_192.length === 0) {
                    return Prelude.id(Prelude.categoryArr({}));
                };
                if (_192.length > 0) {
                    var _651 = _192.slice(1);
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(coarbitrary(coarbArray(__dict_CoArbitrary_58))(_651))(coarbitrary(__dict_CoArbitrary_58)(_192[0]));
                };
                throw "Failed pattern match";
            }
        };
    };
    var arbitrary = function (dict) {
        return dict.arbitrary;
    };
    var testableFunction = function (__dict_Arbitrary_61) {
        return function (__dict_Testable_62) {
            return {
                "__superclasses": {}, 
                test: function (f) {
                    return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(__dict_Arbitrary_61))(function (_8) {
                        return test(__dict_Testable_62)(f(_8));
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
    var arbFunction = function (__dict_CoArbitrary_63) {
        return function (__dict_Arbitrary_64) {
            return {
                "__superclasses": {}, 
                arbitrary: repeatable(function (a) {
                    return coarbitrary(__dict_CoArbitrary_63)(a)(arbitrary(__dict_Arbitrary_64));
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
    var arbArray = function (__dict_Arbitrary_65) {
        return {
            "__superclasses": {}, 
            arbitrary: Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(arbBoolean({})))(function (_7) {
                return _7 ? Prelude["return"](Test_QuickCheck_LCG.monadGen({}))([  ]) : Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(__dict_Arbitrary_65))(function (_6) {
    return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(arbArray(__dict_Arbitrary_65)))(function (_5) {
        return Prelude["return"](Test_QuickCheck_LCG.monadGen({}))(Prelude[":"](_6)(_5));
    });
});
            })
        };
    };
    var coarbFunction = function (__dict_Arbitrary_59) {
        return function (__dict_CoArbitrary_60) {
            return {
                "__superclasses": {}, 
                coarbitrary: function (f) {
                    return function (gen) {
                        var map = function (_190) {
                            return function (_191) {
                                if (_191.length === 0) {
                                    return [  ];
                                };
                                if (_191.length > 0) {
                                    var _660 = _191.slice(1);
                                    return Prelude[":"](_190(_191[0]))(map(_190)(_660));
                                };
                                throw "Failed pattern match";
                            };
                        };
                        return Prelude[">>="](Test_QuickCheck_LCG.bindGen({}))(arbitrary(arbArray(__dict_Arbitrary_59)))(function (_4) {
                            return coarbitrary(coarbArray(__dict_CoArbitrary_60))(map(f)(_4))(gen);
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
var PS = PS || {};
PS.Control_Monad = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var when = function (__dict_Monad_66) {
        return function (_203) {
            return function (_204) {
                if (_203) {
                    return _204;
                };
                if (!_203) {
                    return Prelude["return"](__dict_Monad_66)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var unless = function (__dict_Monad_67) {
        return function (_205) {
            return function (_206) {
                if (!_205) {
                    return _206;
                };
                if (_205) {
                    return Prelude["return"](__dict_Monad_67)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var replicateM = function (__dict_Monad_68) {
        return function (_198) {
            return function (_199) {
                if (_198 === 0) {
                    return Prelude["return"](__dict_Monad_68)([  ]);
                };
                return Prelude[">>="](__dict_Monad_68["__superclasses"]["Prelude.Bind_1"]({}))(_199)(function (_13) {
                    return Prelude[">>="](__dict_Monad_68["__superclasses"]["Prelude.Bind_1"]({}))(replicateM(__dict_Monad_68)(_198 - 1)(_199))(function (_12) {
                        return Prelude["return"](__dict_Monad_68)(Prelude[":"](_13)(_12));
                    });
                });
            };
        };
    };
    var foldM = function (__dict_Monad_69) {
        return function (_200) {
            return function (_201) {
                return function (_202) {
                    if (_202.length === 0) {
                        return Prelude["return"](__dict_Monad_69)(_201);
                    };
                    if (_202.length > 0) {
                        var _674 = _202.slice(1);
                        return Prelude[">>="](__dict_Monad_69["__superclasses"]["Prelude.Bind_1"]({}))(_200(_201)(_202[0]))(function (a$prime) {
                            return foldM(__dict_Monad_69)(_200)(a$prime)(_674);
                        });
                    };
                    throw "Failed pattern match";
                };
            };
        };
    };
    return {
        unless: unless, 
        when: when, 
        foldM: foldM, 
        replicateM: replicateM
    };
})();
var PS = PS || {};
PS.Control_Bind = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $greater$eq$greater = function (__dict_Bind_70) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return Prelude[">>="](__dict_Bind_70)(f(a))(g);
                };
            };
        };
    };
    var $eq$less$less = function (__dict_Bind_71) {
        return function (f) {
            return function (m) {
                return Prelude[">>="](__dict_Bind_71)(m)(f);
            };
        };
    };
    var $less$eq$less = function (__dict_Bind_72) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return $eq$less$less(__dict_Bind_72)(f)(g(a));
                };
            };
        };
    };
    var join = function (__dict_Bind_73) {
        return function (m) {
            return Prelude[">>="](__dict_Bind_73)(m)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var ifM = function (__dict_Bind_74) {
        return function (cond) {
            return function (t) {
                return function (f) {
                    return Prelude[">>="](__dict_Bind_74)(cond)(function (cond$prime) {
                        return cond$prime ? t : f;
                    });
                };
            };
        };
    };
    return {
        ifM: ifM, 
        join: join, 
        "<=<": $less$eq$less, 
        ">=>": $greater$eq$greater, 
        "=<<": $eq$less$less
    };
})();
var PS = PS || {};
PS.Control_Apply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $less$times = function (__dict_Apply_75) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_75)(Prelude["<$>"](__dict_Apply_75["__superclasses"]["Prelude.Functor_0"]({}))(Prelude["const"])(a))(b);
            };
        };
    };
    var $times$greater = function (__dict_Apply_76) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_76)(Prelude["<$>"](__dict_Apply_76["__superclasses"]["Prelude.Functor_0"]({}))(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(a))(b);
            };
        };
    };
    var lift5 = function (__dict_Apply_77) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return function (e) {
                                return Prelude["<*>"](__dict_Apply_77)(Prelude["<*>"](__dict_Apply_77)(Prelude["<*>"](__dict_Apply_77)(Prelude["<*>"](__dict_Apply_77)(Prelude["<$>"](__dict_Apply_77["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c))(d))(e);
                            };
                        };
                    };
                };
            };
        };
    };
    var lift4 = function (__dict_Apply_78) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return Prelude["<*>"](__dict_Apply_78)(Prelude["<*>"](__dict_Apply_78)(Prelude["<*>"](__dict_Apply_78)(Prelude["<$>"](__dict_Apply_78["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c))(d);
                        };
                    };
                };
            };
        };
    };
    var lift3 = function (__dict_Apply_79) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return Prelude["<*>"](__dict_Apply_79)(Prelude["<*>"](__dict_Apply_79)(Prelude["<$>"](__dict_Apply_79["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c);
                    };
                };
            };
        };
    };
    var lift2 = function (__dict_Apply_80) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return Prelude["<*>"](__dict_Apply_80)(Prelude["<$>"](__dict_Apply_80["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b);
                };
            };
        };
    };
    var forever = function (__dict_Apply_81) {
        return function (a) {
            return $times$greater(__dict_Apply_81)(a)(forever(__dict_Apply_81)(a));
        };
    };
    return {
        forever: forever, 
        lift5: lift5, 
        lift4: lift4, 
        lift3: lift3, 
        lift2: lift2, 
        "*>": $times$greater, 
        "<*": $less$times
    };
})();
var PS = PS || {};
PS.Data_Foldable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Apply = PS.Control_Apply;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Monoid_First = PS.Data_Monoid_First;
    var Data_Maybe = PS.Data_Maybe;
    function foldrArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = xs.length - 1; i >= 0; --i) {        acc = f(xs[i])(acc);      }      return acc;    }  }};
    function foldlArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = 0, len = xs.length; i < len; ++i) {        acc = f(acc)(xs[i]);      }      return acc;    }  }};
    var foldr = function (dict) {
        return dict.foldr;
    };
    var traverse_ = function (__dict_Applicative_82) {
        return function (__dict_Foldable_83) {
            return function (f) {
                return foldr(__dict_Foldable_83)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_82["__superclasses"]["Prelude.Apply_0"]({})))(f))(Prelude.pure(__dict_Applicative_82)(Prelude.unit));
            };
        };
    };
    var for_ = function (__dict_Applicative_84) {
        return function (__dict_Foldable_85) {
            return Prelude.flip(traverse_(__dict_Applicative_84)(__dict_Foldable_85));
        };
    };
    var sequence_ = function (__dict_Applicative_86) {
        return function (__dict_Foldable_87) {
            return traverse_(__dict_Applicative_86)(__dict_Foldable_87)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var foldl = function (dict) {
        return dict.foldl;
    };
    var mconcat = function (__dict_Foldable_88) {
        return function (__dict_Monoid_89) {
            return foldl(__dict_Foldable_88)(Prelude["<>"](__dict_Monoid_89["__superclasses"]["Prelude.Semigroup_0"]({})))(Data_Monoid.mempty(__dict_Monoid_89));
        };
    };
    var or = function (__dict_Foldable_90) {
        return foldl(__dict_Foldable_90)(Prelude["||"](Prelude.boolLikeBoolean({})))(false);
    };
    var product = function (__dict_Foldable_91) {
        return foldl(__dict_Foldable_91)(Prelude["*"](Prelude.numNumber({})))(1);
    };
    var sum = function (__dict_Foldable_92) {
        return foldl(__dict_Foldable_92)(Prelude["+"](Prelude.numNumber({})))(0);
    };
    var foldableTuple = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_232) {
                return function (_233) {
                    return function (_234) {
                        return _232(_234.values[1])(_233);
                    };
                };
            }, 
            foldl: function (_235) {
                return function (_236) {
                    return function (_237) {
                        return _235(_236)(_237.values[1]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_93) {
                return function (_238) {
                    return function (_239) {
                        return _238(_239.values[1]);
                    };
                };
            }
        };
    };
    var foldableRef = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_224) {
                return function (_225) {
                    return function (_226) {
                        return _224(_226.values[0])(_225);
                    };
                };
            }, 
            foldl: function (_227) {
                return function (_228) {
                    return function (_229) {
                        return _227(_228)(_229.values[0]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_94) {
                return function (_230) {
                    return function (_231) {
                        return _230(_231.values[0]);
                    };
                };
            }
        };
    };
    var foldableMaybe = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_216) {
                return function (_217) {
                    return function (_218) {
                        if (_218.ctor === "Data.Maybe.Nothing") {
                            return _217;
                        };
                        if (_218.ctor === "Data.Maybe.Just") {
                            return _216(_218.values[0])(_217);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_219) {
                return function (_220) {
                    return function (_221) {
                        if (_221.ctor === "Data.Maybe.Nothing") {
                            return _220;
                        };
                        if (_221.ctor === "Data.Maybe.Just") {
                            return _219(_220)(_221.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_95) {
                return function (_222) {
                    return function (_223) {
                        if (_223.ctor === "Data.Maybe.Nothing") {
                            return Data_Monoid.mempty(__dict_Monoid_95);
                        };
                        if (_223.ctor === "Data.Maybe.Just") {
                            return _222(_223.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }
        };
    };
    var foldableEither = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_208) {
                return function (_209) {
                    return function (_210) {
                        if (_210.ctor === "Data.Either.Left") {
                            return _209;
                        };
                        if (_210.ctor === "Data.Either.Right") {
                            return _208(_210.values[0])(_209);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_211) {
                return function (_212) {
                    return function (_213) {
                        if (_213.ctor === "Data.Either.Left") {
                            return _212;
                        };
                        if (_213.ctor === "Data.Either.Right") {
                            return _211(_212)(_213.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_96) {
                return function (_214) {
                    return function (_215) {
                        if (_215.ctor === "Data.Either.Left") {
                            return Data_Monoid.mempty(__dict_Monoid_96);
                        };
                        if (_215.ctor === "Data.Either.Right") {
                            return _214(_215.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }
        };
    };
    var foldableArray = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (f) {
                return function (z) {
                    return function (xs) {
                        return foldrArray(f)(z)(xs);
                    };
                };
            }, 
            foldl: function (f) {
                return function (z) {
                    return function (xs) {
                        return foldlArray(f)(z)(xs);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_97) {
                return function (f) {
                    return function (xs) {
                        return foldr(foldableArray({}))(function (x) {
                            return function (acc) {
                                return Prelude["<>"](__dict_Monoid_97["__superclasses"]["Prelude.Semigroup_0"]({}))(f(x))(acc);
                            };
                        })(Data_Monoid.mempty(__dict_Monoid_97))(xs);
                    };
                };
            }
        };
    };
    var foldMap = function (dict) {
        return dict.foldMap;
    };
    var lookup = function (__dict_Eq_98) {
        return function (__dict_Foldable_99) {
            return function (a) {
                return function (f) {
                    return Data_Monoid_First.runFirst(foldMap(__dict_Foldable_99)(Data_Monoid_First.monoidFirst({}))(function (_207) {
                        return Data_Monoid_First.First(Prelude["=="](__dict_Eq_98)(a)(_207.values[0]) ? Data_Maybe.Just(_207.values[1]) : Data_Maybe.Nothing);
                    })(f));
                };
            };
        };
    };
    var fold = function (__dict_Foldable_100) {
        return function (__dict_Monoid_101) {
            return foldMap(__dict_Foldable_100)(__dict_Monoid_101)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var find = function (__dict_Foldable_102) {
        return function (p) {
            return function (f) {
                return (function (_728) {
                    if (_728.length > 0) {
                        var _730 = _728.slice(1);
                        return Data_Maybe.Just(_728[0]);
                    };
                    if (_728.length === 0) {
                        return Data_Maybe.Nothing;
                    };
                    throw "Failed pattern match";
                })(foldMap(__dict_Foldable_102)(Data_Monoid.monoidArray({}))(function (x) {
                    return p(x) ? [ x ] : [  ];
                })(f));
            };
        };
    };
    var any = function (__dict_Foldable_103) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(or(foldableArray({})))(foldMap(__dict_Foldable_103)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    var elem = function (__dict_Eq_104) {
        return function (__dict_Foldable_105) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(any(__dict_Foldable_105))(Prelude["=="](__dict_Eq_104));
        };
    };
    var notElem = function (__dict_Eq_106) {
        return function (__dict_Foldable_107) {
            return function (x) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(elem(__dict_Eq_106)(__dict_Foldable_107)(x));
            };
        };
    };
    var and = function (__dict_Foldable_108) {
        return foldl(__dict_Foldable_108)(Prelude["&&"](Prelude.boolLikeBoolean({})))(true);
    };
    var all = function (__dict_Foldable_109) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(and(foldableArray({})))(foldMap(__dict_Foldable_109)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    return {
        foldlArray: foldlArray, 
        foldrArray: foldrArray, 
        lookup: lookup, 
        find: find, 
        notElem: notElem, 
        elem: elem, 
        product: product, 
        sum: sum, 
        all: all, 
        any: any, 
        or: or, 
        and: and, 
        mconcat: mconcat, 
        "sequence_": sequence_, 
        "for_": for_, 
        "traverse_": traverse_, 
        fold: fold, 
        foldMap: foldMap, 
        foldl: foldl, 
        foldr: foldr, 
        foldableArray: foldableArray, 
        foldableEither: foldableEither, 
        foldableMaybe: foldableMaybe, 
        foldableRef: foldableRef, 
        foldableTuple: foldableTuple
    };
})();
var PS = PS || {};
PS.Data_Traversable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Eq = PS.Data_Eq;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Array = PS.Data_Array;
    var traverse = function (dict) {
        return dict.traverse;
    };
    var traversableTuple = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_110) {
                return function (_252) {
                    return function (_253) {
                        return Prelude["<$>"]((__dict_Applicative_110["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_253.values[0]))(_252(_253.values[1]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_111) {
                return function (_254) {
                    return Prelude["<$>"]((__dict_Applicative_111["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_254.values[0]))(_254.values[1]);
                };
            }
        };
    };
    var traversableRef = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_112) {
                return function (_246) {
                    return function (_247) {
                        return Prelude["<$>"]((__dict_Applicative_112["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_246(_247.values[0]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_113) {
                return function (_248) {
                    return Prelude["<$>"]((__dict_Applicative_113["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_248.values[0]);
                };
            }
        };
    };
    var traversableMaybe = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_114) {
                return function (_249) {
                    return function (_250) {
                        if (_250.ctor === "Data.Maybe.Nothing") {
                            return Prelude.pure(__dict_Applicative_114)(Data_Maybe.Nothing);
                        };
                        if (_250.ctor === "Data.Maybe.Just") {
                            return Prelude["<$>"]((__dict_Applicative_114["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_249(_250.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_115) {
                return function (_251) {
                    if (_251.ctor === "Data.Maybe.Nothing") {
                        return Prelude.pure(__dict_Applicative_115)(Data_Maybe.Nothing);
                    };
                    if (_251.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"]((__dict_Applicative_115["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_251.values[0]);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var traversableEither = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_116) {
                return function (_243) {
                    return function (_244) {
                        if (_244.ctor === "Data.Either.Left") {
                            return Prelude.pure(__dict_Applicative_116)(Data_Either.Left(_244.values[0]));
                        };
                        if (_244.ctor === "Data.Either.Right") {
                            return Prelude["<$>"]((__dict_Applicative_116["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_243(_244.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_117) {
                return function (_245) {
                    if (_245.ctor === "Data.Either.Left") {
                        return Prelude.pure(__dict_Applicative_117)(Data_Either.Left(_245.values[0]));
                    };
                    if (_245.ctor === "Data.Either.Right") {
                        return Prelude["<$>"]((__dict_Applicative_117["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_245.values[0]);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var sequence = function (dict) {
        return dict.sequence;
    };
    var traversableArray = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_118) {
                return function (_240) {
                    return function (_241) {
                        if (_241.length === 0) {
                            return Prelude.pure(__dict_Applicative_118)([  ]);
                        };
                        if (_241.length > 0) {
                            var _758 = _241.slice(1);
                            return Prelude["<*>"](__dict_Applicative_118["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_118["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_240(_241[0])))(traverse(traversableArray({}))(__dict_Applicative_118)(_240)(_758));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_119) {
                return function (_242) {
                    if (_242.length === 0) {
                        return Prelude.pure(__dict_Applicative_119)([  ]);
                    };
                    if (_242.length > 0) {
                        var _761 = _242.slice(1);
                        return Prelude["<*>"](__dict_Applicative_119["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_119["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_242[0]))(sequence(traversableArray({}))(__dict_Applicative_119)(_761));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var zipWithA = function (__dict_Applicative_120) {
        return function (f) {
            return function (xs) {
                return function (ys) {
                    return sequence(traversableArray({}))(__dict_Applicative_120)(Data_Array.zipWith(f)(xs)(ys));
                };
            };
        };
    };
    var $$for = function (__dict_Applicative_121) {
        return function (__dict_Traversable_122) {
            return function (x) {
                return function (f) {
                    return traverse(__dict_Traversable_122)(__dict_Applicative_121)(f)(x);
                };
            };
        };
    };
    return {
        zipWithA: zipWithA, 
        "for": $$for, 
        sequence: sequence, 
        traverse: traverse, 
        traversableArray: traversableArray, 
        traversableEither: traversableEither, 
        traversableRef: traversableRef, 
        traversableMaybe: traversableMaybe, 
        traversableTuple: traversableTuple
    };
})();
PS.Main.main();
