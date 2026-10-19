(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // News ticker: keep a constant reading speed whatever the text length
  var ticker = document.querySelector("[data-ticker]");
  if (ticker) {
    var group = ticker.querySelector(".ticker-group");
    var setSpeed = function () {
      var w = group ? group.offsetWidth : 0;
      if (w > 0) ticker.style.setProperty("--ticker-duration", Math.round(w / 55) + "s");
    };
    setSpeed();
    window.addEventListener("load", setSpeed);
    window.addEventListener("resize", setSpeed);
  }

  // Home page graph: light up the links of the hovered or focused area
  var graph = document.querySelector(".graph");
  if (graph) {
    Array.prototype.forEach.call(graph.querySelectorAll(".graph-node"), function (node) {
      var on = function () { graph.setAttribute("data-hl", node.getAttribute("data-pillar")); };
      var off = function () { graph.removeAttribute("data-hl"); };
      node.addEventListener("mouseenter", on);
      node.addEventListener("mouseleave", off);
      node.addEventListener("focus", on);
      node.addEventListener("blur", off);
    });
  }

  // Home page: reveal sections as they scroll into view
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.body.classList.contains("home") && "IntersectionObserver" in window && !reduce) {
    var targets = document.querySelectorAll(".section-head, .pillar-row, .news-item, .cta-band .container, .compact-list > li, .pub-list > li, .split > *");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add("reveal");
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--rd", Math.min(sib, 4) * 0.08 + "s");
      io.observe(el);
    });
  }

  // People page: count up the statistics when they scroll into view
  var counters = document.querySelectorAll(".stat-num[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, end = parseInt(el.getAttribute("data-count"), 10), t0 = null;
        if (!end) return;
        function step(t) {
          if (t0 === null) t0 = t;
          var k = Math.min((t - t0) / 1100, 1), eased = 1 - Math.pow(1 - k, 3);
          el.textContent = String(Math.round(end * eased));
          if (k < 1) requestAnimationFrame(step);
        }
        el.textContent = "0";
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  // Publication filters (only runs on the Publications page)
  var root = document.querySelector("[data-pub-filters]");
  if (!root) return;

  var items = Array.prototype.slice.call(document.querySelectorAll(".pub"));
  var groups = Array.prototype.slice.call(document.querySelectorAll(".pub-group"));
  var count = document.getElementById("pub-count");
  var empty = document.getElementById("pub-empty");
  var search = document.getElementById("pub-search");
  var state = { type: "all", area: "all", q: "" };

  function matchesType(el) {
    if (state.type === "all") return true;
    var t = el.getAttribute("data-type");
    if (state.type === "other") return t === "book" || t === "patent";
    return t === state.type;
  }

  function matchesArea(el) {
    if (state.area === "all") return true;
    return (" " + el.getAttribute("data-areas") + " ").indexOf(" " + state.area + " ") !== -1;
  }

  function matchesText(el) {
    if (!state.q) return true;
    return el.getAttribute("data-text").indexOf(state.q) !== -1 || el.getAttribute("data-year") === state.q;
  }

  function apply() {
    var shown = 0;
    items.forEach(function (el) {
      var ok = matchesType(el) && matchesArea(el) && matchesText(el);
      el.hidden = !ok;
      if (ok) shown += 1;
    });
    groups.forEach(function (g) {
      var any = g.querySelector(".pub:not([hidden])");
      g.hidden = !any;
    });
    count.textContent = "Showing " + shown + " of " + items.length + " publications";
    empty.hidden = shown !== 0;
  }

  function setPressed(kind, value) {
    var buttons = root.querySelectorAll('[data-filter="' + kind + '"]');
    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-value") === value ? "true" : "false");
    });
  }

  root.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    var kind = b.getAttribute("data-filter");
    state[kind] = b.getAttribute("data-value");
    setPressed(kind, state[kind]);
    apply();
  });

  search.addEventListener("input", function () {
    state.q = search.value.trim().toLowerCase();
    apply();
  });

  // Support links such as /publications/?area=qsec
  try {
    var params = new URLSearchParams(window.location.search);
    var area = params.get("area");
    var type = params.get("type");
    if (area) { state.area = area; setPressed("area", area); }
    if (type) { state.type = type; setPressed("type", type); }
  } catch (err) { /* older browsers: ignore */ }

  apply();
})();
