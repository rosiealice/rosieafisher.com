(function () {
  "use strict";

  function initNewsEventReadMore() {
    var events = document.querySelectorAll(".news-event");
    if (!events.length) {
      return;
    }

    function expandEvent(eventCard) {
      var body = eventCard.querySelector(".news-event-body");
      var toggle = eventCard.querySelector(".news-event-toggle");

      if (!body || !toggle) {
        return;
      }

      eventCard.classList.add("news-event-expanded");
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "Show less";
    }

    events.forEach(function (eventCard) {
      var body = eventCard.querySelector(".news-event-body");
      var toggle = eventCard.querySelector(".news-event-toggle");
      var permalink = eventCard.querySelector(".news-event-permalink");

      if (!body || !toggle) {
        return;
      }

      eventCard.classList.remove("news-event-expanded");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "... Read more";

      toggle.addEventListener("click", function () {
        var expanded = eventCard.classList.toggle("news-event-expanded");
        toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
        toggle.textContent = expanded ? "Show less" : "... Read more";
      });

      if (permalink) {
        permalink.addEventListener("click", function () {
          expandEvent(eventCard);
        });
      }

      if (window.location.hash === "#" + eventCard.id) {
        expandEvent(eventCard);
      }
    });

    window.addEventListener("hashchange", function () {
      var eventCard = document.getElementById(window.location.hash.slice(1));
      if (eventCard && eventCard.classList.contains("news-event")) {
        expandEvent(eventCard);
      }
    });
  }

  function initFooterContactAutoHide() {
    var footerContact = document.querySelector(".footer-contact");
    if (!footerContact) {
      return;
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var lastY = window.scrollY || 0;
    var ticking = false;
    var hideThreshold = 120;
    var deltaThreshold = 8;

    function showBar() {
      document.body.classList.remove("footer-contact-hidden");
    }

    function hideBar() {
      document.body.classList.add("footer-contact-hidden");
    }

    function atBottom() {
      var scrollBottom = window.scrollY + window.innerHeight;
      return scrollBottom >= document.documentElement.scrollHeight - 24;
    }

    function update() {
      ticking = false;

      if (reduceMotion.matches) {
        showBar();
        lastY = window.scrollY || 0;
        return;
      }

      var currentY = window.scrollY || 0;
      var delta = currentY - lastY;

      if (currentY <= hideThreshold || atBottom()) {
        showBar();
      } else if (delta > deltaThreshold) {
        hideBar();
      } else if (delta < -deltaThreshold) {
        showBar();
      }

      lastY = currentY;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", update);
    } else if (typeof reduceMotion.addListener === "function") {
      reduceMotion.addListener(update);
    }

    update();
  }

  function initializePageEnhancements() {
    initFooterContactAutoHide();
    initNewsEventReadMore();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePageEnhancements);
  } else {
    initializePageEnhancements();
  }
})();
