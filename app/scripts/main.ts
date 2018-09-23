import GraphEditor from "./graph-editor";
import Template from "./framework/template";
let graphEditor = new GraphEditor();

let t = new Template('<p><%=name%></p>');
console.log(t.get({name: 'Anonim'}));