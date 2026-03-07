console.log("Main is alive")
const navbar = document.getElementById("navbar")
navbar.innerHTML = `
<a id="logo-lin" class="navbar-link" href="/">
    <img src="/assets/Corner Logo.gif" height="50" class="borderless" style="margin-bottom: -15%;"></img>
</a>
<a class="navbar-link" href="/web-apps/sales-tracker">Sales Tracker</a>
<a class="navbar-link" href="/web-apps/hungry-game">Hungry Game</a>
<a class="navbar-link" href="/downloads/">Downloads</a>
<a class="navbar-link" href="/about-me/">About Me</a>
`

import("/js/themes.js").then((module) => {
    module.applyTheme();
    module.buildThemeSelector();
})
