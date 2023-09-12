import * as dat from 'dat.gui'

export default class Debug 
{
    constructor() 
    {
        this.active = true;

        if(this.active) 
        {
            this.ui = new dat.GUI()
            this.ui.close()
        }
    }
}