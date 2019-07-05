import { document, console } from "global";
import { storiesOf } from "@storybook/html";
import { Circles } from "../../project/dist/svg-bindings";

storiesOf("Circles", module).add("basic construction", () => {
  const parentDiv = document.createElement("div");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");

  const circles = new Circles(svg, model => model.id);
  circles
    .cx(m => m.x)
    .cy(m => m.y)
    .r(m => m.id * 5)
    .fill(m => (m.id % 2 ? "red" : "blue"))
    .stroke("black")
    .strokeWidth(0.5);
  circles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);
  setTimeout(() => {
    circles.update([{ id: 2, x: 60, y: 10 }]);
  }, 500);
  setTimeout(() => {
    circles.update([{ id: 1, x: 40, y: 10 }, { id: 2, x: 60, y: 10 }]);
  }, 1000);

  parentDiv.appendChild(svg);

  return parentDiv;
});
