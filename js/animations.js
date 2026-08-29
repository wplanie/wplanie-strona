(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    /* ---------- Hero intro ---------- */
    var heroTagline = document.querySelector(".hero-tagline");
    var heroLogo = document.querySelector(".hero-logo");

    if (!prefersReduced && heroTagline && heroLogo) {
      gsap.from([heroTagline, heroLogo], {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.15
      });
    }

    /* ---------- Header scroll state ---------- */
    var header = document.querySelector(".site-header");
    if (header && typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.create({
        start: "top -60",
        end: 999999,
        toggleClass: { targets: header, className: "scrolled" }
      });
    }

    /* ---------- Scroll reveals ---------- */
    if (!prefersReduced && typeof ScrollTrigger !== "undefined") {
      gsap.utils.toArray(".reveal").forEach(function (el) {
        gsap.from(el, {
          opacity: 0,
          y: 18,
          duration: 0.6,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        });
      });

      [".stage-grid", ".benefit-grid"].forEach(function (sel) {
        var container = document.querySelector(sel);
        if (!container) return;

        ScrollTrigger.batch(container.children, {
          start: "top 88%",
          onEnter: function (batch) {
            gsap.from(batch, {
              opacity: 0,
              y: 12,
              duration: 0.4,
              stagger: 0.06,
              ease: "power1.out"
            });
          },
          once: true
        });
      });

      /* ---------- Hero parallax ---------- */
      var heroImg = document.querySelector(".hero .img-photo, .hero .img-placeholder");
      if (heroImg) {
        gsap.to(heroImg, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });

  /* ---------- Page transition on internal link click ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;

    var href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || link.target === "_blank") return;
    if (!href.endsWith(".html")) return;

    var overlay = document.querySelector(".page-transition");
    if (!overlay || typeof gsap === "undefined" || prefersReduced) return;

    e.preventDefault();
    overlay.style.pointerEvents = "auto";
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.35,
      ease: "power1.in",
      onComplete: function () {
        window.location.href = href;
      }
    });
  });

  /* ---------- Fade the overlay away on load ---------- */
  window.addEventListener("pageshow", function () {
    var overlay = document.querySelector(".page-transition");
    if (!overlay) return;

    if (typeof gsap !== "undefined" && !prefersReduced) {
      gsap.set(overlay, { opacity: 1 });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        onComplete: function () {
          overlay.style.pointerEvents = "none";
        }
      });
    } else {
      overlay.style.opacity = 0;
      overlay.style.pointerEvents = "none";
    }
  });
})();
