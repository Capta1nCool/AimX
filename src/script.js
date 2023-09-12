import Experience from "./Experience/Experience.js";


function startGame(mode) {
    const experience = new Experience(document.querySelector('canvas.webgl'), mode)
}

const modeconts = document.querySelectorAll('.modecont');

modeconts.forEach((element) => {
    element.addEventListener('click', () => {
        startGame(element.id)
        document.querySelector("body > div.mode").style.display = "none"
        document.querySelector("body > div.ui").style.display = "block"
    });
});