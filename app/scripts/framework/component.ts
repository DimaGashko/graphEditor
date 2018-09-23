import Events from "./events";

export default class Component extends Events {
    protected els: any = {}; //HTML-elements

    constructor() { 
        super();
    }
}