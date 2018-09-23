import Events from "./events";

export default class Component extends Events {
    constructor() { 
        super();
        console.log("Component");
    }
}