import Experience from "../Experience";
import EventEmitter from '../Utils/EventEmitter.js'


export default class UI extends EventEmitter
{
    constructor()
    {
        super()
        this.experience = new Experience()
        this.time = 0;
        this.score = 0

        setInterval(() => {
            this.time++
            document.getElementById('timer').innerText = Math.round(this.time / 60) + ':' + (this.time % 60).toString().padStart(2, '0');
        }, 1000);
    }
    update() {
    }
}