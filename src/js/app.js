const btn = document.querySelector("input[type=button]");
const counter = document.querySelector(".counter");
import { counterFunc } from "./counerFunc";

btn.addEventListener("click", () => {
  const num = +counter.textContent;
  counterFunc(counter, num);
});
