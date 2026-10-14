"use strict";

/*
 * love-arcade — keeps a personal best for each game on this device.
 * It only reads the score elements that games.js already updates, so the
 * games themselves stay untouched.
 */

(function () {
  const STORE_KEY = "mena-arcade-best";

  const TRACK = [
    { id: "bubble-score", name: "Bubble pop" },
    { id: "heart-score", name: "Catch falling hearts" },
    { id: "kitty-score", name: "Pet the kitty" },
    { id: "whack-score", name: "Whack a heart" },
    { id: "flappy-score", name: "Flappy heart" },
    { id: "g2048-score", name: "2048 hearts" }
  ];

  function read() {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function save(best) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(best));
    } catch {
      /* best scores still show for this visit */
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    let best = read();

    const list = document.getElementById("best-list");
    const resetButton = document.getElementById("reset-bests");

    function render() {
      if (!list) return;
      list.textContent = "";

      TRACK.forEach((game) => {
        const value = best[game.id];

        const li = document.createElement("li");
        li.className = "best-row" + (value ? "" : " is-empty");

        const name = document.createElement("span");
        name.className = "best-name";
        name.textContent = game.name;

        const score = document.createElement("span");
        score.className = "best-value";
        score.textContent = value ? String(value) : "—";

        li.appendChild(name);
        li.appendChild(score);
        list.appendChild(li);
      });
    }

    function record(id, text) {
      const value = parseInt(String(text).replace(/[^0-9]/g, ""), 10);
      if (!value || Number.isNaN(value)) return;
      if (!best[id] || value > best[id]) {
        best[id] = value;
        save(best);
        render();
      }
    }

    TRACK.forEach((game) => {
      const el = document.getElementById(game.id);
      if (!el) return;

      record(game.id, el.textContent);

      const observer = new MutationObserver(() => {
        record(game.id, el.textContent);
      });

      observer.observe(el, {
        childList: true,
        characterData: true,
        subtree: true
      });
    });

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        best = {};
        save(best);
        render();
        if (typeof window.fxToast === "function") {
          window.fxToast("Best scores cleared \u2014 fresh start ♥");
        }
      });
    }

    render();

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
      });
    }
  });
})();
