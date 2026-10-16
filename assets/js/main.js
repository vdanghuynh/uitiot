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
