
! function(a) {
    var f, l, b = a(window),
        c = {},
        d = [],
        e = [],
        g = null,
        h = "_open",
        i = "_close",
        j = [],
        k = null,
        m = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
        n = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
        o = {
            _init: function(b) {
                var c = a(b),
                    f = c.data("popupoptions");
                e[b.id] = !1, d[b.id] = 0, c.data("popup-initialized") || (c.attr("data-popup-initialized", "true"), o._initonce(b)), f.autoopen && setTimeout(function() {
                    o.show(b, 0)
                }, 0)
            },
            _initonce: function(b) {
                var e, j, c = a(b),
                    d = a("body"),
                    i = c.data("popupoptions");
                if (g = parseInt(d.css("margin-right"), 10), k = void 0 !== document.body.style.webkitTransition || void 0 !== document.body.style.MozTransition || void 0 !== document.body.style.msTransition || void 0 !== document.body.style.OTransition || void 0 !== document.body.style.transition, "tooltip" == i.type && (i.background = !1, i.scrolllock = !1), i.backgroundactive && (i.background = !1, i.blur = !1, i.scrolllock = !1), i.scrolllock) {
                    var l, n;
                    "undefined" == typeof f && (l = a('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), n = l.children(), f = n.innerWidth() - n.height(99).innerWidth(), l.remove())
                }
                if (c.attr("id") || c.attr("id", "j-popup-" + parseInt(1e8 * Math.random(), 10)), c.addClass("popup_content"), i.background && !a("#" + b.id + "_background").length) {
                    d.append('<div id="' + b.id + '_background" class="popup_background"></div>');
                    var p = a("#" + b.id + "_background");
                    p.css({
                        opacity: 0,
                        visibility: "hidden",
                        backgroundColor: i.color,
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }), i.setzindex && !i.autozindex && p.css("z-index", "100000"), i.transition && p.css("transition", i.transition)
                }
                d.append(b), c.wrap('<div id="' + b.id + '_wrapper" class="popup_wrapper" />'), e = a("#" + b.id + "_wrapper"), e.css({
                    opacity: 0,
                    visibility: "hidden",
                    position: "absolute"
                }), m && e.css("cursor", "pointer"), "overlay" == i.type && e.css("overflow", "auto"), c.css({
                    opacity: 0,
                    visibility: "hidden",
                    display: "inline-block"
                }), i.setzindex && !i.autozindex && e.css("z-index", "100001"), i.outline || c.css("outline", "none"), i.transition && (c.css("transition", i.transition), e.css("transition", i.transition)), c.attr("aria-hidden", !0), "overlay" == i.type && (c.css({
                    textAlign: "left",
                    position: "relative",
                    verticalAlign: "middle"
                }), j = {
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    textAlign: "center"
                }, i.backgroundactive && (j.position = "absolute", j.height = "0", j.overflow = "visible"), e.css(j), e.append('<div class="popup_align" />'), a(".popup_align").css({
                    display: "inline-block",
                    verticalAlign: "middle",
                    height: "100%"
                })), c.attr("role", "dialog");
                var q = i.openelement ? i.openelement : "." + b.id + h;
                a(q).each(function(b, c) {
                    a(c).attr("data-popup-ordinal", b), c.id || a(c).attr("id", "open_" + parseInt(1e8 * Math.random(), 10))
                }), c.attr("aria-labelledby") || c.attr("aria-label") || c.attr("aria-labelledby", a(q).attr("id")), "hover" == i.action ? (i.keepfocus = !1, a(q).on("mouseenter", function(c) {
                    o.show(b, a(this).data("popup-ordinal"))
                }), a(q).on("mouseleave", function(a) {
                    o.hide(b)
                })) : a(document).on("click", q, function(c) {
                    c.preventDefault();
                    var d = a(this).data("popup-ordinal");
                    setTimeout(function() {
                        o.show(b, d)
                    }, 0)
                }), i.closebutton && o.addclosebutton(b), i.detach ? c.hide().detach() : e.hide()
            },
            show: function(c, h) {
                var m = a(c);
                if (!m.data("popup-visible")) {
                    m.data("popup-initialized") || o._init(c), m.attr("data-popup-initialized", "true");
                    var n = a("body"),
                        q = m.data("popupoptions"),
                        r = a("#" + c.id + "_wrapper"),
                        s = a("#" + c.id + "_background");
                    if (p(c, h, q.beforeopen), e[c.id] = h, setTimeout(function() {
                            j.push(c.id)
                        }, 0), q.autozindex) {
                        for (var t = document.getElementsByTagName("*"), u = t.length, v = 0, w = 0; w < u; w++) {
                            var x = a(t[w]).css("z-index");
                            "auto" !== x && (x = parseInt(x, 10), v < x && (v = x))
                        }
                        d[c.id] = v, q.background && d[c.id] > 0 && a("#" + c.id + "_background").css({
                            zIndex: d[c.id] + 1
                        }), d[c.id] > 0 && r.css({
                            zIndex: d[c.id] + 2
                        })
                    }
                    q.detach ? (r.prepend(c), m.show()) : r.show(), l = setTimeout(function() {
                        r.css({
                            visibility: "visible",
                            opacity: 1
                        }), a("html").addClass("popup_visible").addClass("popup_visible_" + c.id), r.addClass("popup_wrapper_visible")
                    }, 20), q.scrolllock && (n.css("overflow", "hidden"), n.height() > b.height() && n.css("margin-right", g + f)), q.backgroundactive && m.css({
                        top: (b.height() - (m.get(0).offsetHeight + parseInt(m.css("margin-top"), 10) + parseInt(m.css("margin-bottom"), 10))) / 2 + "px"
                    }), m.css({
                        visibility: "visible",
                        opacity: 1
                    }), q.background && (s.css({
                        visibility: "visible",
                        opacity: q.opacity
                    }), setTimeout(function() {
                        s.css({
                            opacity: q.opacity
                        })
                    }, 0)), m.data("popup-visible", !0), o.reposition(c, h), m.data("focusedelementbeforepopup", document.activeElement), q.keepfocus && (m.attr("tabindex", -1), setTimeout(function() {
                        "closebutton" === q.focuselement ? a("#" + c.id + " ." + c.id + i + ":first").focus() : q.focuselement ? a(q.focuselement).focus() : m.focus()
                    }, q.focusdelay)), a(q.pagecontainer).attr("aria-hidden", !0), m.attr("aria-hidden", !1), p(c, h, q.onopen), k ? r.one("transitionend", function() {
                        p(c, h, q.opentransitionend)
                    }) : p(c, h, q.opentransitionend), "tooltip" == q.type && a(window).on("resize." + c.id, function() {
                        o.reposition(c, h)
                    })
                }
            },
            hide: function(b, c) {
                var d = a.inArray(b.id, j);
                if (d !== -1) {
                    l && clearTimeout(l);
                    var f = a("body"),
                        h = a(b),
                        i = h.data("popupoptions"),
                        m = a("#" + b.id + "_wrapper"),
                        n = a("#" + b.id + "_background");
                    h.data("popup-visible", !1), 1 === j.length ? a("html").removeClass("popup_visible").removeClass("popup_visible_" + b.id) : a("html").hasClass("popup_visible_" + b.id) && a("html").removeClass("popup_visible_" + b.id), j.splice(d, 1), m.hasClass("popup_wrapper_visible") && m.removeClass("popup_wrapper_visible"), i.keepfocus && !c && setTimeout(function() {
                        a(h.data("focusedelementbeforepopup")).is(":visible") && h.data("focusedelementbeforepopup").focus()
                    }, 0), m.css({
                        visibility: "hidden",
                        opacity: 0
                    }), h.css({
                        visibility: "hidden",
                        opacity: 0
                    }), i.background && n.css({
                        visibility: "hidden",
                        opacity: 0
                    }), a(i.pagecontainer).attr("aria-hidden", !1), h.attr("aria-hidden", !0), p(b, e[b.id], i.onclose), k && "0s" !== h.css("transition-duration") ? h.one("transitionend", function(a) {
                        h.data("popup-visible") || (i.detach ? h.hide().detach() : m.hide()), i.scrolllock && setTimeout(function() {
                            f.css({
                                overflow: "visible",
                                "margin-right": g
                            })
                        }, 10), p(b, e[b.id], i.closetransitionend)
                    }) : (i.detach ? h.hide().detach() : m.hide(), i.scrolllock && setTimeout(function() {
                        f.css({
                            overflow: "visible",
                            "margin-right": g
                        })
                    }, 10), p(b, e[b.id], i.closetransitionend)), "tooltip" == i.type && a(window).off("resize." + b.id)
                }
            },
            toggle: function(b, c) {
                a(b).data("popup-visible") ? o.hide(b) : setTimeout(function() {
                    o.show(b, c)
                }, 0)
            },
            reposition: function(c, d) {
                var e = a(c),
                    f = e.data("popupoptions"),
                    g = a("#" + c.id + "_wrapper");
                a("#" + c.id + "_background");
                if (d = d || 0, "tooltip" == f.type) {
                    g.css({
                        position: "absolute"
                    });
                    var j;
                    j = f.tooltipanchor ? a(f.tooltipanchor) : f.openelement ? a(f.openelement).filter('[data-popup-ordinal="' + d + '"]') : a("." + c.id + h + '[data-popup-ordinal="' + d + '"]');
                    var k = j.offset();
                    "right" == f.horizontal ? g.css("left", k.left + j.outerWidth() + f.offsetleft) : "leftedge" == f.horizontal ? g.css("left", k.left + j.outerWidth() - j.outerWidth() + f.offsetleft) : "left" == f.horizontal ? g.css("right", b.width() - k.left - f.offsetleft) : "rightedge" == f.horizontal ? g.css("right", b.width() - k.left - j.outerWidth() - f.offsetleft) : g.css("left", k.left + j.outerWidth() / 2 - e.outerWidth() / 2 - parseFloat(e.css("marginLeft")) + f.offsetleft), "bottom" == f.vertical ? g.css("top", k.top + j.outerHeight() + f.offsettop) : "bottomedge" == f.vertical ? g.css("top", k.top + j.outerHeight() - e.outerHeight() + f.offsettop) : "top" == f.vertical ? g.css("bottom", b.height() - k.top - f.offsettop) : "topedge" == f.vertical ? g.css("bottom", b.height() - k.top - e.outerHeight() - f.offsettop) : g.css("top", k.top + j.outerHeight() / 2 - e.outerHeight() / 2 - parseFloat(e.css("marginTop")) + f.offsettop)
                } else "overlay" == f.type && (f.horizontal ? g.css("text-align", f.horizontal) : g.css("text-align", "center"), f.vertical ? e.css("vertical-align", f.vertical) : e.css("vertical-align", "middle"))
            },
            addclosebutton: function(b) {
                var d;
                d = a(b).data("popupoptions").closebuttonmarkup ? a(c.closebuttonmarkup).addClass(b.id + "_close") : '<button class="popup_close ' + b.id + '_close" title="Close" aria-label="Close"><span aria-hidden="true">Ã—</span></button>', a(b).data("popup-initialized") && a(b).append(d)
            }
        },
        p = function(b, c, d) {
            var e = a(b).data("popupoptions"),
                f = e.openelement ? e.openelement : "." + b.id + h,
                g = a(f + '[data-popup-ordinal="' + c + '"]');
            "function" == typeof d && d.call(a(b), b, g)
        };
    a(document).on("keydown", function(b) {
        if (j.length) {
            var c = j[j.length - 1],
                d = document.getElementById(c);
            a(d).data("popupoptions").escape && 27 == b.keyCode && o.hide(d)
        }
    }), a(document).on("click", function(b) {
        if (j.length) {
            var c = j[j.length - 1],
                d = document.getElementById(c),
                e = a(d).data("popupoptions").closeelement ? a(d).data("popupoptions").closeelement : "." + d.id + i;
            a(b.target).closest(e).length && (b.preventDefault(), o.hide(d)), a(d).data("popupoptions").blur && !a(b.target).closest("#" + c).length && 2 !== b.which && a(b.target).is(":visible") && (a(d).data("popupoptions").background ? (o.hide(d), b.preventDefault()) : o.hide(d, !0))
        }
    }), a(document).on("keydown", function(b) {
        if (j.length && 9 == b.which) {
            var c = j[j.length - 1],
                d = document.getElementById(c),
                e = a(d).find("*"),
                f = e.filter(n).filter(":visible"),
                g = a(":focus"),
                h = f.length,
                i = f.index(g);
            0 === h ? (a(d).focus(), b.preventDefault()) : b.shiftKey ? 0 === i && (f.get(h - 1).focus(), b.preventDefault()) : i == h - 1 && (f.get(0).focus(), b.preventDefault())
        }
    }), a.fn.popup = function(b) {
        return this.each(function() {
            var d = a(this);
            if ("object" == typeof b) {
                var e = a.extend({}, a.fn.popup.defaults, d.data("popupoptions"), b);
                d.data("popupoptions", e), c = d.data("popupoptions"), o._init(this)
            } else "string" == typeof b ? (d.data("popupoptions") || (d.data("popupoptions", a.fn.popup.defaults), c = d.data("popupoptions")), o[b].call(this, this)) : (d.data("popupoptions") || (d.data("popupoptions", a.fn.popup.defaults), c = d.data("popupoptions")), o._init(this))
        })
    }, a.fn.popup.defaults = {
        type: "overlay",
        autoopen: !1,
        background: !0,
        backgroundactive: !1,
        color: "black",
        opacity: "0.5",
        horizontal: "center",
        vertical: "middle",
        offsettop: 0,
        offsetleft: 0,
        escape: !0,
        blur: !0,
        setzindex: !0,
        autozindex: !1,
        scrolllock: !1,
        closebutton: !1,
        closebuttonmarkup: null,
        keepfocus: !0,
        focuselement: null,
        focusdelay: 50,
        outline: !1,
        pagecontainer: null,
        detach: !1,
        openelement: null,
        closeelement: null,
        transition: null,
        tooltipanchor: null,
        beforeopen: null,
        onclose: null,
        onopen: null,
        opentransitionend: null,
        closetransitionend: null
    }
}(jQuery);
/* jquery.event.move.js */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a, b) {
    function k(a) {
        function e(a) {
            c ? (b(), g(e), d = !0, c = !1) : d = !1
        }
        var b = a,
            c = !1,
            d = !1;
        this.kick = function(a) {
            c = !0, d || e()
        }, this.end = function(a) {
            var e = b;
            a && (d ? (b = c ? function() {
                e(), a()
            } : a, c = !0) : a())
        }
    }

    function l() {
        return !0
    }

    function m() {
        return !1
    }

    function n(a) {
        a.preventDefault()
    }

    function o(a) {
        h[a.target.tagName.toLowerCase()] || a.preventDefault()
    }

    function p(a) {
        return 1 === a.which && !a.ctrlKey && !a.altKey
    }

    function q(a, b) {
        var c, d;
        if (a.identifiedTouch) return a.identifiedTouch(b);
        for (c = -1, d = a.length; ++c < d;)
            if (a[c].identifier === b) return a[c]
    }

    function r(a, b) {
        var c = q(a.changedTouches, b.identifier);
        if (c && (c.pageX !== b.pageX || c.pageY !== b.pageY)) return c
    }

    function s(a) {
        var b;
        p(a) && (b = {
            target: a.target,
            startX: a.pageX,
            startY: a.pageY,
            timeStamp: a.timeStamp
        }, d(document, i.move, t, b), d(document, i.cancel, u, b))
    }

    function t(a) {
        var b = a.data;
        A(a, b, a, v)
    }

    function u(a) {
        v()
    }

    function v() {
        e(document, i.move, t), e(document, i.cancel, u)
    }

    function w(a) {
        var b, c;
        h[a.target.tagName.toLowerCase()] || (b = a.changedTouches[0], c = {
            target: b.target,
            startX: b.pageX,
            startY: b.pageY,
            timeStamp: a.timeStamp,
            identifier: b.identifier
        }, d(document, j.move + "." + b.identifier, x, c), d(document, j.cancel + "." + b.identifier, y, c))
    }

    function x(a) {
        var b = a.data,
            c = r(a, b);
        c && A(a, b, c, z)
    }

    function y(a) {
        var b = a.data,
            c = q(a.changedTouches, b.identifier);
        c && z(b.identifier)
    }

    function z(a) {
        e(document, "." + a, x), e(document, "." + a, y)
    }

    function A(a, b, d, e) {
        var f = d.pageX - b.startX,
            g = d.pageY - b.startY;
        f * f + g * g < c * c || D(a, b, d, f, g, e)
    }

    function B() {
        return this._handled = l, !1
    }

    function C(a) {
        a._handled()
    }

    function D(a, b, c, d, e, g) {
        var i, j;
        b.target;
        i = a.targetTouches, j = a.timeStamp - b.timeStamp, b.type = "movestart", b.distX = d, b.distY = e, b.deltaX = d, b.deltaY = e, b.pageX = c.pageX, b.pageY = c.pageY, b.velocityX = d / j, b.velocityY = e / j, b.targetTouches = i, b.finger = i ? i.length : 1, b._handled = B, b._preventTouchmoveDefault = function() {
            a.preventDefault()
        }, f(b.target, b), g(b.identifier)
    }

    function E(a) {
        var b = a.data.event,
            c = a.data.timer;
        K(b, a, a.timeStamp, c)
    }

    function F(a) {
        var b = a.data.event,
            c = a.data.timer;
        G(), L(b, c, function() {
            setTimeout(function() {
                e(b.target, "click", m)
            }, 0)
        })
    }

    function G(a) {
        e(document, i.move, E), e(document, i.end, F)
    }

    function H(a) {
        var b = a.data.event,
            c = a.data.timer,
            d = r(a, b);
        d && (a.preventDefault(), b.targetTouches = a.targetTouches, K(b, d, a.timeStamp, c))
    }

    function I(a) {
        var b = a.data.event,
            c = a.data.timer,
            d = q(a.changedTouches, b.identifier);
        d && (J(b), L(b, c))
    }

    function J(a) {
        e(document, "." + a.identifier, H), e(document, "." + a.identifier, I)
    }

    function K(a, b, c, d) {
        var e = c - a.timeStamp;
        a.type = "move", a.distX = b.pageX - a.startX, a.distY = b.pageY - a.startY, a.deltaX = b.pageX - a.pageX, a.deltaY = b.pageY - a.pageY, a.velocityX = .3 * a.velocityX + .7 * a.deltaX / e, a.velocityY = .3 * a.velocityY + .7 * a.deltaY / e, a.pageX = b.pageX, a.pageY = b.pageY, d.kick()
    }

    function L(a, b, c) {
        b.end(function() {
            return a.type = "moveend", f(a.target, a), c && c()
        })
    }

    function M(a, b, c) {
        return d(this, "movestart.move", C), !0
    }

    function N(a) {
        return e(this, "dragstart drag", n), e(this, "mousedown touchstart", o), e(this, "movestart", C), !0
    }

    function O(a) {
        "move" !== a.namespace && "moveend" !== a.namespace && (d(this, "dragstart." + a.guid + " drag." + a.guid, n, b, a.selector), d(this, "mousedown." + a.guid, o, b, a.selector))
    }

    function P(a) {
        "move" !== a.namespace && "moveend" !== a.namespace && (e(this, "dragstart." + a.guid + " drag." + a.guid), e(this, "mousedown." + a.guid))
    }
    var c = 6,
        d = a.event.add,
        e = a.event.remove,
        f = function(b, c, d) {
            a.event.trigger(c, d, b)
        },
        g = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, b) {
                return window.setTimeout(function() {
                    a()
                }, 25)
            }
        }(),
        h = {
            textarea: !0,
            input: !0,
            select: !0,
            button: !0
        },
        i = {
            move: "mousemove",
            cancel: "mouseup dragstart",
            end: "mouseup"
        },
        j = {
            move: "touchmove",
            cancel: "touchend",
            end: "touchend"
        };
    a.event.special.movestart = {
        setup: M,
        teardown: N,
        add: O,
        remove: P,
        _default: function(a) {
            var c, e;
            a._handled() && (c = {
                target: a.target,
                startX: a.startX,
                startY: a.startY,
                pageX: a.pageX,
                pageY: a.pageY,
                distX: a.distX,
                distY: a.distY,
                deltaX: a.deltaX,
                deltaY: a.deltaY,
                velocityX: a.velocityX,
                velocityY: a.velocityY,
                timeStamp: a.timeStamp,
                identifier: a.identifier,
                targetTouches: a.targetTouches,
                finger: a.finger
            }, e = {
                event: c,
                timer: new k(function(b) {
                    f(a.target, c)
                })
            }, a.identifier === b ? (d(a.target, "click", m), d(document, i.move, E, e), d(document, i.end, F, e)) : (a._preventTouchmoveDefault(), d(document, j.move + "." + a.identifier, H, e), d(document, j.end + "." + a.identifier, I, e)))
        }
    }, a.event.special.move = {
        setup: function() {
            d(this, "movestart.move", a.noop)
        },
        teardown: function() {
            e(this, "movestart.move", a.noop)
        }
    }, a.event.special.moveend = {
        setup: function() {
            d(this, "movestart.moveend", a.noop)
        },
        teardown: function() {
            e(this, "movestart.moveend", a.noop)
        }
    }, d(document, "mousedown.move", s), d(document, "touchstart.move", w), "function" == typeof Array.prototype.indexOf && ! function(a, b) {
        for (var c = ["changedTouches", "targetTouches"], d = c.length; d--;) a.event.props.indexOf(c[d]) === -1 && a.event.props.push(c[d])
    }(a)
});
/* rebound.min.js */
(function() {
    function removeFirst(array, item) {
        var idx = array.indexOf(item); - 1 != idx && array.splice(idx, 1)
    }

    function compatCancelAnimationFrame(id) {
        return "undefined" != typeof window && window.cancelAnimationFrame && cancelAnimationFrame(id)
    }

    function compatRequestAnimationFrame(func) {
        var meth;
        return meth = "undefined" != typeof process ? process.nextTick : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame, meth(func)
    }

    function bind(func, context) {
        return args = slice.call(arguments, 2),
            function() {
                func.apply(context, concat.call(args, slice.call(arguments)))
            }
    }

    function extend(target, source) {
        for (var key in source) source.hasOwnProperty(key) && (target[key] = source[key])
    }
    var rebound = {},
        SpringSystem = rebound.SpringSystem = function SpringSystem() {
            this._springRegistry = {}, this._activeSprings = [], this._listeners = [], this._idleSpringIndices = [], this._boundFrameCallback = bind(this._frameCallback, this)
        };
    extend(SpringSystem, {}), extend(SpringSystem.prototype, {
        _springRegistry: null,
        _isIdle: !0,
        _lastTimeMillis: -1,
        _activeSprings: null,
        _listeners: null,
        _idleSpringIndices: null,
        _frameCallback: function() {
            this.loop()
        },
        _frameCallbackId: null,
        createSpring: function(tension, friction) {
            var spring = new Spring(this);
            if (this.registerSpring(spring), tension === void 0 || friction === void 0) spring.setSpringConfig(SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            else {
                var springConfig = SpringConfig.fromOrigamiTensionAndFriction(tension, friction);
                spring.setSpringConfig(springConfig)
            }
            return spring
        },
        getIsIdle: function() {
            return this._isIdle
        },
        getSpringById: function(id) {
            return this._springRegistry[id]
        },
        getAllSprings: function() {
            return Object.values(this._springRegistry)
        },
        registerSpring: function(spring) {
            this._springRegistry[spring.getId()] = spring
        },
        deregisterSpring: function(spring) {
            removeFirst(this._activeSprings, spring), delete this._springRegistry[spring.getId()]
        },
        advance: function(time, deltaTime) {
            for (; this._idleSpringIndices.length > 0;) this._idleSpringIndices.pop();
            for (var i = 0, len = this._activeSprings.length; len > i; i++) {
                var spring = this._activeSprings[i];
                spring.systemShouldAdvance() ? spring.advance(time / 1e3, deltaTime / 1e3) : this._idleSpringIndices.push(this._activeSprings.indexOf(spring))
            }
            for (; this._idleSpringIndices.length > 0;) {
                var idx = this._idleSpringIndices.pop();
                idx >= 0 && this._activeSprings.splice(idx, 1)
            }
        },
        loop: function() {
            var listener, currentTimeMillis = Date.now(); - 1 === this._lastTimeMillis && (this._lastTimeMillis = currentTimeMillis - 1);
            var ellapsedMillis = currentTimeMillis - this._lastTimeMillis;
            this._lastTimeMillis = currentTimeMillis;
            var i = 0,
                len = this._listeners.length;
            for (i = 0; len > i; i++) {
                var listener = this._listeners[i];
                listener.onBeforeIntegrate && listener.onBeforeIntegrate(this)
            }
            for (this.advance(currentTimeMillis, ellapsedMillis), 0 === this._activeSprings.length && (this._isIdle = !0, this._lastTimeMillis = -1), i = 0; len > i; i++) {
                var listener = this._listeners[i];
                listener.onAfterIntegrate && listener.onAfterIntegrate(this)
            }
            compatCancelAnimationFrame(this._frameCallbackId), this._isIdle || (this._frameCallbackId = compatRequestAnimationFrame(this._boundFrameCallback))
        },
        activateSpring: function(springId) {
            var spring = this._springRegistry[springId]; - 1 == this._activeSprings.indexOf(spring) && this._activeSprings.push(spring), this.getIsIdle() && (this._isIdle = !1, compatCancelAnimationFrame(this._frameCallbackId), this._frameCallbackId = compatRequestAnimationFrame(this._boundFrameCallback))
        },
        addListener: function(listener) {
            this._listeners.push(listener)
        },
        removeListener: function(listener) {
            removeFirst(this._listeners, listener)
        },
        removeAllListeners: function() {
            this._listeners = []
        }
    });
    var Spring = rebound.Spring = function Spring(springSystem) {
        this._id = Spring._ID++, this._springSystem = springSystem, this._listeners = [], this._currentState = new PhysicsState, this._previousState = new PhysicsState, this._tempState = new PhysicsState
    };
    extend(Spring, {
        _ID: 0,
        MAX_DELTA_TIME_SEC: .064,
        SOLVER_TIMESTEP_SEC: .001
    }), extend(Spring.prototype, {
        _id: 0,
        _springConfig: null,
        _overshootClampingEnabled: !1,
        _currentState: null,
        _previousState: null,
        _tempState: null,
        _startValue: 0,
        _endValue: 0,
        _wasAtRest: !0,
        _restSpeedThreshold: .001,
        _displacementFromRestThreshold: .001,
        _listeners: null,
        _timeAccumulator: 0,
        _springSystem: null,
        destroy: function() {
            this._listeners = [], this._springSystem.deregisterSpring(this)
        },
        getId: function() {
            return this._id
        },
        setSpringConfig: function(springConfig) {
            return this._springConfig = springConfig, this
        },
        getSpringConfig: function() {
            return this._springConfig
        },
        setCurrentValue: function(currentValue) {
            this._startValue = currentValue, this._currentState.position = currentValue;
            for (var i = 0, len = this._listeners.length; len > i; i++) {
                var listener = this._listeners[i];
                listener.onSpringUpdate && listener.onSpringUpdate(this)
            }
            return this
        },
        getStartValue: function() {
            return this._startValue
        },
        getCurrentValue: function() {
            return this._currentState.position
        },
        getCurrentDisplacementDistance: function() {
            return this.getDisplacementDistanceForState(this._currentState)
        },
        getDisplacementDistanceForState: function(state) {
            return Math.abs(this._endValue - state.position)
        },
        setEndValue: function(endValue) {
            if (this._endValue == endValue && this.isAtRest()) return this;
            this._startValue = this.getCurrentValue(), this._endValue = endValue, this._springSystem.activateSpring(this.getId());
            for (var i = 0, len = this._listeners.length; len > i; i++) {
                var listener = this._listeners[i];
                listener.onSpringEndStateChange && listener.onSpringEndStateChange(this)
            }
            return this
        },
        getEndValue: function() {
            return this._endValue
        },
        setVelocity: function(velocity) {
            return this._currentState.velocity = velocity, this
        },
        getVelocity: function() {
            return this._currentState.velocity
        },
        setRestSpeedThreshold: function(restSpeedThreshold) {
            return this._restSpeedThreshold = restSpeedThreshold, this
        },
        getRestSpeedThreshold: function() {
            return this._restSpeedThreshold
        },
        setRestDisplacementThreshold: function(displacementFromRestThreshold) {
            this._displacementFromRestThreshold = displacementFromRestThreshold
        },
        getRestDisplacementThreshold: function() {
            return this._displacementFromRestThreshold
        },
        setOvershootClampingEnabled: function(enabled) {
            return this._overshootClampingEnabled = enabled, this
        },
        isOvershootClampingEnabled: function() {
            return this._overshootClampingEnabled
        },
        isOvershooting: function() {
            return this._startValue < this._endValue && this.getCurrentValue() > this._endValue || this._startValue > this._endValue && this.getCurrentValue() < this._endValue
        },
        advance: function(time, realDeltaTime) {
            var isAtRest = this.isAtRest();
            if (!isAtRest || !this._wasAtRest) {
                var adjustedDeltaTime = realDeltaTime;
                realDeltaTime > Spring.MAX_DELTA_TIME_SEC && (adjustedDeltaTime = Spring.MAX_DELTA_TIME_SEC), this._timeAccumulator += adjustedDeltaTime;
                for (var aVelocity, aAcceleration, bVelocity, bAcceleration, cVelocity, cAcceleration, dVelocity, dAcceleration, dxdt, dvdt, tension = this._springConfig.tension, friction = this._springConfig.friction, position = this._currentState.position, velocity = this._currentState.velocity, tempPosition = this._tempState.position, tempVelocity = this._tempState.velocity; this._timeAccumulator >= Spring.SOLVER_TIMESTEP_SEC;) this._timeAccumulator -= Spring.SOLVER_TIMESTEP_SEC, this._timeAccumulator < Spring.SOLVER_TIMESTEP_SEC && (this._previousState.position = position, this._previousState.velocity = velocity), aVelocity = velocity, aAcceleration = tension * (this._endValue - tempPosition) - friction * velocity, tempPosition = position + .5 * aVelocity * Spring.SOLVER_TIMESTEP_SEC, tempVelocity = velocity + .5 * aAcceleration * Spring.SOLVER_TIMESTEP_SEC, bVelocity = tempVelocity, bAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity, tempPosition = position + .5 * bVelocity * Spring.SOLVER_TIMESTEP_SEC, tempVelocity = velocity + .5 * bAcceleration * Spring.SOLVER_TIMESTEP_SEC, cVelocity = tempVelocity, cAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity, tempPosition = position + .5 * cVelocity * Spring.SOLVER_TIMESTEP_SEC, tempVelocity = velocity + .5 * cAcceleration * Spring.SOLVER_TIMESTEP_SEC, dVelocity = tempVelocity, dAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity, dxdt = 1 / 6 * (aVelocity + 2 * (bVelocity + cVelocity) + dVelocity), dvdt = 1 / 6 * (aAcceleration + 2 * (bAcceleration + cAcceleration) + dAcceleration), position += dxdt * Spring.SOLVER_TIMESTEP_SEC, velocity += dvdt * Spring.SOLVER_TIMESTEP_SEC;
                this._tempState.position = tempPosition, this._tempState.velocity = tempVelocity, this._currentState.position = position, this._currentState.velocity = velocity, this._timeAccumulator > 0 && this.interpolate(this._timeAccumulator / Spring.SOLVER_TIMESTEP_SEC), (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) && (this._startValue = this._endValue, this._currentState.position = this._endValue, this.setVelocity(0), isAtRest = !0);
                var notifyActivate = !1;
                this._wasAtRest && (this._wasAtRest = !1, notifyActivate = !0);
                var notifyAtRest = !1;
                isAtRest && (this._wasAtRest = !0, notifyAtRest = !0);
                for (var i = 0, len = this._listeners.length; len > i; i++) {
                    var listener = this._listeners[i];
                    notifyActivate && listener.onSpringActivate && listener.onSpringActivate(this), listener.onSpringUpdate && listener.onSpringUpdate(this), notifyAtRest && listener.onSpringAtRest && listener.onSpringAtRest(this)
                }
            }
        },
        systemShouldAdvance: function() {
            return !this.isAtRest() || !this.wasAtRest()
        },
        wasAtRest: function() {
            return this._wasAtRest
        },
        isAtRest: function() {
            return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold
        },
        setAtRest: function() {
            return this._endValue = this._currentState.position, this._tempState.position = this._currentState.position, this._currentState.velocity = 0, this
        },
        interpolate: function(alpha) {
            this._currentState.position = this._currentState.position * alpha + this._previousState.position * (1 - alpha), this._currentState.velocity = this._currentState.velocity * alpha + this._previousState.velocity * (1 - alpha)
        },
        addListener: function(newListener) {
            return this._listeners.push(newListener), this
        },
        removeListener: function(listenerToRemove) {
            return removeFirst(this._listeners, listenerToRemove), this
        },
        removeAllListeners: function() {
            return this._listeners = [], this
        },
        currentValueIsApproximately: function(value) {
            return Math.abs(this.getCurrentValue() - value) <= this.getRestDisplacementThreshold()
        }
    });
    var PhysicsState = function PhysicsState() {};
    extend(PhysicsState.prototype, {
        position: 0,
        velocity: 0
    });
    var SpringConfig = rebound.SpringConfig = function SpringConfig(tension, friction) {
            this.tension = tension, this.friction = friction
        },
        OrigamiValueConverter = {
            tensionFromOrigamiValue: function(oValue) {
                return 3.62 * (oValue - 30) + 194
            },
            origamiValueFromTension: function(tension) {
                return (tension - 194) / 3.62 + 30
            },
            frictionFromOrigamiValue: function(oValue) {
                return 3 * (oValue - 8) + 25
            },
            origamiFromFriction: function(friction) {
                return (friction - 25) / 3 + 8
            }
        };
    extend(SpringConfig, {
        fromOrigamiTensionAndFriction: function(oTension, oFriction) {
            return new SpringConfig(OrigamiValueConverter.tensionFromOrigamiValue(oTension), OrigamiValueConverter.frictionFromOrigamiValue(oFriction))
        }
    }), SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG = SpringConfig.fromOrigamiTensionAndFriction(40, 7), extend(SpringConfig.prototype, {
        friction: 0,
        tension: 0
    }), rebound.MathUtil = {
        mapValueInRange: function(value, fromLow, fromHigh, toLow, toHigh) {
            return fromRangeSize = fromHigh - fromLow, toRangeSize = toHigh - toLow, valueScale = (value - fromLow) / fromRangeSize, toLow + valueScale * toRangeSize
        }
    };
    var concat = Array.prototype.concat,
        slice = Array.prototype.slice;
    "undefined" != typeof exports ? extend(exports, rebound) : "undefined" != typeof window && (window.rebound = rebound)
})();
/* Main Script */
function getCenteredCoordinates(a, b) {
    var c = a.getBoundingClientRect(),
        d = b.getBoundingClientRect(),
        e = c.width / 2 + c.left,
        f = c.height / 2 + c.top;
    return {
        x: e - d.width / 2,
        y: f - d.height / 2
    }
}

function onSpringUpdate(a) {
    if (!jQuery(draggableEl).hasClass("edge")) {
        var b = a.getCurrentValue(),
            c = getCenteredCoordinates(magnet, draggableEl),
            d = draggableEl.getBoundingClientRect();
        x = rebound.MathUtil.mapValueInRange(b, 0, 1, c.x, springDestX || d.left), y = rebound.MathUtil.mapValueInRange(b, 0, 1, c.y, springDestY || d.top), moveToPos(x, y)
    }
}

function vibrate(a) {
    navigator.vibrate && navigator.vibrate(a || 50)
}

function moveToPos(a, b) {
    var c = draggableEl;
    a = a || x, b = b || y, c.style.transform = c.style.webkitTransform = c.style.MozTransform = "translate(" + Math.round(a, 10) + "px, " + Math.round(b, 10) + "px)"
}

function animate() {
    window.requestAnimationFrame(animate), moveToPos()
}

function isOverlapping(a, b) {
    var c = a.getBoundingClientRect(),
        d = b.getBoundingClientRect();
    return !(c.top > d.bottom || c.right < d.left || c.bottom < d.top || c.left > d.right)
}

function moveMagnet(a, b) {
    var c = 12,
        d = jQuery("body").width() / 2,
        e = jQuery("body").height(),
        g = a > d ? (a - d) / d : -(d - a) / d,
        h = Math.min(1, (e - b) / (e / 2));
    magnet.style.marginLeft = Math.round(c * g) + "px", magnet.style.marginBottom = Math.round(c * h) + "px"
}

function trackEvent(a) {
    events.length > 5 && events.pop(), events.push(a)
}

function move(a) {
    var b = jQuery(a.target),
        c = !0;
    if (jQuery(".drag-wrapper .thing").hasClass("showContent") && (b.hasClass("circle") || b.parents(".circle").length ? (jQuery(".drag-wrapper .thing").removeClass("showContent"), jQuery(".drag-wrapper .thing .content").hide(400), x = xold, y = yold) : c = !1), c) {
        var d = draggableEl,
            e = magnet.getBoundingClientRect(),
            f = d.getBoundingClientRect();
        newX = this._posOrigin.x + a.pageX - this._touchOrigin.x, newY = this._posOrigin.y + a.pageY - this._touchOrigin.y, moveMagnet(newX + f.width / 2, newY + f.height / 2), startMoving();
        var g = {
            top: newY,
            right: newX + f.width,
            bottom: newY + f.height,
            left: newX
        };
        if (overlapping = !(g.top > e.bottom || g.right < e.left || g.bottom < e.top || g.left > e.right), springDestX = newX, springDestY = newY, overlapping) {
            var h = e.width / 2 + e.left,
                i = e.height / 2 + e.top;
            if (newX = h - f.width / 2, newY = i - f.height / 2, jQuery(d).hasClass("overlap") || (magnetSpring.setVelocity(5).setEndValue(0), spring.setCurrentValue(0).setAtRest(), vibrate(25)), jQuery(magnet).toggleClass("overlap", !0), jQuery(d).toggleClass("overlap", !0), !springSystem.getIsIdle()) return
        } else jQuery(d).hasClass("overlap") && (spring.setEndValue(1), magnetSpring.setCurrentValue(1).setAtRest()), jQuery(magnet).removeClass("overlap"), jQuery(d).removeClass("overlap");
        x = newX, y = newY
    }
}

function onTouchStart(a) {
    var b = jQuery(a.target),
        c = !0;
    if (jQuery(".drag-wrapper .thing").hasClass("showContent") && (b.hasClass("circle") || b.parents(".circle").length ? (jQuery(".drag-wrapper .thing").removeClass("showContent"), jQuery(".drag-wrapper .thing .content").hide(400), x = xold, y = yold) : c = !1), c) {
        var d = this.getBoundingClientRect();
        startTouching(), this._touchOrigin = {
            x: a.pageX,
            y: a.pageY
        }, this._posOrigin = {
            x: d.left,
            y: d.top
        }
    }
}

function onClick(a) {
    var b = jQuery(a.target);
    if (b.hasClass("content") || b.parents(".content").length);
    else {
        var c = jQuery(window).width();
        jQuery(".drag-wrapper .thing .content:visible").length ? (x = xold, y = yold) : (xold = x, yold = y, x = c - 74, y = 20), jQuery(".drag-wrapper .thing .content").toggle(400), jQuery(this).toggleClass("showContent"), jQuery(".drag-wrapper .thing .content").css({
            "max-height": jQuery(window).height() - 116
        })
    }
}

function getVelocity() {
    if (jQuery(".drag-wrapper .thing").hasClass("showContent")) return !1;
    var a = events[events.length - 1];
    return {
        x: a.velocityX,
        y: a.velocityY
    }
}

function stopTouching() {
    jQuery("body").removeClass("touching")
}

function startTouching() {
    jQuery("body").addClass("touching")
}

function startMoving() {
    jQuery("body").addClass("moving")
}

function stopMoving() {
    jQuery("body").removeClass("moving"), magnet.style.marginBottom = magnet.style.marginLeft = "0px"
}

function onTouchEnd(a) {
    if (jQuery(".drag-wrapper .thing").hasClass("showContent"));
    else {
        var b = jQuery(draggableEl),
            c = getVelocity();
        b.hasClass("overlap") ? (stopTouching(), stopMoving(), BoOm()) : (flingWithVelocity(c), stopTouching(), stopMoving())
    }
}
function BoOm() {
    const chatHead2 = document.getElementById('chat-head2');
chatHead2.style.opacity = '0';

    console.log("whatever");
}

function distanceOverTime(a, b) {
    return a * b
}

function decelerate(a) {
    return a > .01 || a < -.01 ? a - .05 * a : 0
}

function addGravity(a) {
    var b = -.00475;
    return b * a
}

function flingWithVelocity(a) {
    var b = jQuery(window).width() / 2;
    x = x < b ? 5 : 2 * b - 60, y < 0 && (y = 20)
}
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate,
    function() {
        jQuery("body").click(function(a) {
            !jQuery(a.target).hasClass("facebook-messenger-avatar") && jQuery(".drag-wrapper .thing .content:visible").length && (jQuery(".drag-wrapper .thing .content").hide(400), c = xold, y = yold)
        });
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
            var d = (new Date).getTime(),
                e = Math.max(0, 16 - (d - a)),
                f = window.setTimeout(function() {
                    b(d + e)
                }, e);
            return a = d + e, f
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        })
    }();
var draggableEl = document.querySelector("[data-drag]"),
    magnet = document.querySelector(".magnet-zone"),
    springSystem = new rebound.SpringSystem,
    spring = springSystem.createSpring(100, 7.5),
    magnetSpring = springSystem.createSpring(450, 13),
    x = jQuery("body").width() - 60,
    y = jQuery(window).height() / 2 + 10,
    xold = 0,
    yold = 0,
    springDestX, springDestY, magnetX, magnetY, events = [];
spring.setCurrentValue(1).setAtRest(), magnetSpring.setCurrentValue(1).setAtRest(), spring.addListener({
    onSpringUpdate: onSpringUpdate
}), magnetSpring.addListener({
    onSpringUpdate: onSpringUpdate
}), animate(), jQuery(draggableEl).on("movestart", onTouchStart).on("move", trackEvent).on("move", move).on("moveend", onTouchEnd).on("click", onClick);
var timer;
