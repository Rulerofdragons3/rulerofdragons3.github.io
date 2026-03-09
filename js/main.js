console.log("Main is alive");
const navbar = document.getElementById("navbar");
if (navbar) navbar.innerHTML = `
<a id="navbar-logo" href="/">
    <img id="navbar-logo" src="/assets/Corner Logo.gif" class="borderless"></img>
</a>
<a class="navbar-link" href="/web-apps/sales-tracker">Sales Tracker</a>
<a class="navbar-link" href="/web-apps/hungry-game">Hungry Game</a>
<a class="navbar-link" href="/downloads/">Downloads</a>
<a class="navbar-link" href="/about-me/">About Me</a>
`;

import("/js/themes.js").then((module) => {
    module.applyTheme();
    module.buildThemeSelector();
})
