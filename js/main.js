console.log("Main is alive")
const navbar = document.getElementById("navbar")
navbar.innerHTML = `
<a id="logo-lin" class="navbar-link" href="/">
    <img src="/assets/Logo.png" height="50" class="borderless" style="margin-bottom: -10%;"></img>
</a>
<a class="navbar-link" href="/downloads/">Downloads</a>
<a class="navbar-link" href="/about-me/">About Me</a>
`