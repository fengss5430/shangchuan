(function (win) {
    _.getInitRandom = function (range) {
        return Math.floor(Math.random() * range);
    };
    _.getUUID = function () {
        var _date = new Date();
        var _time = _date.getTime();
        var _random = this.getInitRandom(100000000);
        return _time + "_" + _random;
    };
    win.ef = win.ef || {
            root: win,
            components: {
                name: "component"
            },
            inherit: function (Child, Parent) {
                var F = function () {
                };
                F.prototype = Parent.prototype;
                Child.prototype = new F();
                Child.prototype.constructor = Child;
            },
            toString: function (Child) {
                Child.toString = function () {
                    return "[Class " + Child.name + "]";
                }
            },
            extend: function (param, domain) {
                //(name, Class, notDom, isClass, domain, instance,ns)
                if (!param)return;
                var args = [param.registerName || param.name, param.class || param];
                if (domain) {
                    args.push(false, !param.isInstance, false, false, domain);
                } else {
                    (!param.isDom && param.isInstance) ? (args.push(true)) : null;
                    ((!param.isDom) && (!param.isInstance)) ? (args = args.concat([true, true])) : null;
                }
                return this._register.apply(this, args);
            },
            _register: function (name, Class, notDom, isClass, domain, instance, ns) {
                if (ns) {
                    if (isClass) {
                        this[ns][name] = Class;
                    } else {
                        this[ns][name] = new Class();
                    }
                    return;
                }
                if (domain) {
                    domain[name] = instance;
                    return;
                }
                if (isClass) {
                    this[name] = Class;
                    return;
                }
                this[name] = Class;
                var obj = {};
                obj[name] = function () {
                    if (arguments.length > 1) {
                        return new Class(this, arguments[0], arguments[1], arguments[2], arguments[3]);

                    } else {
                        return new Class(this, arguments[0]);
                    }
                };
                if (notDom) {
                    this[name] = new Class();
                } else {
                    $.fn.extend(obj);
                }
            },
            register: function (Comp, nickName, domain) {
                if (!Comp)return;
                if (domain && !this[domain]) {
                    this[domain] = {};
                }
                Comp.name = Comp.name || _.getFunctionName(Comp);
                this.toString(Comp);
                Comp.registerName = nickName || ((Comp.isDom || Comp.isInstance) ? Comp.name.toLowerCase() : Comp.name);
                this.extend(Comp, domain);
            }
        };

})(window);