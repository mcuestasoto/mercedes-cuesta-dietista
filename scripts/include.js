/* Loads shared Header/Footer/BackToHome partials into their mount points.
   Nav-link hrefs in partials are authored as page-relative hashes (#seccion),
   which only resolve correctly on the Home page itself; on any other page
   they are rewritten here to point back to the Home sections (/#seccion). */
(function () {
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');

  const rewriteHomeLinks = (root) => {
    if (isHome || !root) return;
    root.querySelectorAll('a[href^="#"]').forEach((link) => {
      const href = link.getAttribute('href');
      link.setAttribute('href', `/${href}`);
    });
  };

  const mounts = Array.from(document.querySelectorAll('[data-include]'));
  window.partialsReady = Promise.all(mounts.map((mount) => {
    const url = mount.getAttribute('data-include');
    const parent = mount.parentNode;
    return fetch(url)
      .then((response) => response.text())
      .then((html) => {
        mount.outerHTML = html;
        rewriteHomeLinks(parent);
      });
  }));
})();
