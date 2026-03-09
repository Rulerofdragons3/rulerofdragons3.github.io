const themes = {
    default : {
        themeName:"Default",
        "--color-primary" : "rgb(76, 0, 103)",
        "--color-secondary": "rgb(15, 0, 67)",
        "--color-tertiary": "rgb(38, 0, 190)",
        "--color-accent": "rgb(0, 186, 196)",
        "--text-color-light":"white",
        "--text-color-dark":"rgb(46, 0, 87)",
        "--page-color": "white",
        "--navbar-text-color": "aliceblue",
        "--background-image": "linear-gradient(5deg, var(--color-primary) 0%, var(--color-tertiary) 60%)"
    },
    dark : {
        themeName:"Noir",
        "--color-primary" : "rgb(0, 0, 0)",
        "--color-secondary": "rgb(129, 129, 129)",
        "--color-tertiary": "rgb(48, 48, 48)",
        "--color-accent": "rgb(64, 64, 64)",
        "--text-color-light":"black",
        "--text-color-dark":"white",
        "--page-color": "rgb(0, 0, 0)",
        "--navbar-text-color": "white",
        "--background-image": "linear-gradient(5deg, var(--color-primary) 0%, var(--color-tertiary) 60%)"
    },
    cherry : {
        themeName:"Cherry",
        "--color-primary" : "rgb(103, 0, 0)",
        "--color-secondary": "rgb(67, 0, 0)",
        "--color-tertiary": "rgb(0, 0, 0)",
        "--color-accent": "rgb(255, 153, 153)",
        "--text-color-light":"black",
        "--text-color-dark":"white",
        "--page-color": "black",
        "--navbar-text-color": "white",
        "--background-image": "url(\"https://www.shutterstock.com/image-photo/macro-delicious-fresh-red-wet-600nw-2493523223.jpg\")"
    },
    verdant : {
        themeName:"Verdant",
        "--color-primary" : "rgb(0, 103, 26)",
        "--color-secondary": "rgb(0, 163, 14)",
        "--color-tertiary": "rgb(0, 0, 0)",
        "--color-accent": "rgb(0, 76, 69)",
        "--text-color-light":"white",
        "--text-color-dark":"black",
        "--page-color": "rgb(185, 255, 190)",
        "--navbar-text-color": "white",
        "--background-image": "url(\"https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9yZXN0JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww\")"
    },
    nightCity : {
        themeName:"Night",
        "--color-primary" : "rgb(0, 84, 133)",
        "--color-secondary": "rgb(0, 2, 38)",
        "--color-tertiary": "rgb(0, 34, 62)",
        "--color-accent": "rgb(253, 148, 0)",
        "--text-color-light":"black",
        "--text-color-dark":"white",
        "--page-color": "black",
        "--navbar-text-color": "white",
        "--background-image": "url(\"https://images.pexels.com/photos/3125171/pexels-photo-3125171.jpeg?cs=srgb&dl=pexels-sanaan-3125171.jpg&fm=jpg\")"
    }
}

function getTheme() {
    const theme = localStorage.getItem("theme");
    if (!theme) return themes.default;
    return themes[theme];
}

function setTheme(themeID) {
    localStorage.setItem("theme", themeID);
}

function applyTheme() {
    const theme = getTheme();
    const root = document.documentElement;
    Object.keys(theme).forEach(element => {
        root.style.setProperty(element, theme[element]);
    });
}

function buildThemeSelector() {
    const themeSelector = document.getElementById("theme-selector");
    if (!themeSelector) return;
    themeSelector.innerHTML = `
    <img id="theme-select-button" class = "borderless" src="/assets/paint-brush.png"></img>
    <div id="theme-list" hidden>
    </div>
    `;
    // Set up theme buttons.
    const themeList = document.getElementById("theme-list");
    Object.keys(themes).forEach((theme) => {
        const themeButton = document.createElement("button");
        themeButton.textContent = themes[theme].themeName;
        themeButton.classList = "theme-select-button";
        themeButton.onclick = () => {
            setTheme(theme);
            applyTheme();
            console.log(theme);
        }
        themeList.appendChild(themeButton);
    });
    // Set up theme Toggle
    const themeSelectToggle = document.getElementById("theme-select-button");
    themeSelectToggle.onclick = () => {
        const themeList = document.getElementById("theme-list");
        themeList.hidden = !themeList.hidden;
        const themeButton = document.getElementById("theme-select-button");
        themeButton.style.borderTopRightRadius = `${!themeList.hidden ? 0 : 15}px`;
    }
}

export {applyTheme, buildThemeSelector}