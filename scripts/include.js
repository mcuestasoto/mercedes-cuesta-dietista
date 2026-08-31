/* Loads shared Header/Footer/BackToHome partials into their mount points.
   Partial hrefs are already authored as absolute paths (/#seccion, /pages/...),
   so they resolve correctly from any page without rewriting. */
(function () {
  const mounts = Array.from(document.querySelectorAll('[data-include]'));
  window.partialsReady = Promise.all(mounts.map((mount) => {
    const url = mount.getAttribute('data-include');
    return fetch(url)
      .then((response) => response.text())
      .then((html) => {
        mount.outerHTML = html;
      });
  }));
})();
