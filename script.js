"use strict";

// Both workflows stay readable if JavaScript is unavailable.
const tablist = document.querySelector(".workflow-tabs");
const tabs = [...tablist.querySelectorAll('[role="tab"]')];
function activateTab(tab, focus = false) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute("aria-controls"));
    panel.hidden = !selected;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", item.id);
    panel.tabIndex = 0;
  }
  if (focus) tab.focus();
}
tablist.hidden = false;
activateTab(tabs[0]);
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", event => {
    let next;
    // The interface is RTL: the next tab appears to the left.
    if (event.key === "ArrowLeft") next = (index + 1) % tabs.length;
    if (event.key === "ArrowRight") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activateTab(tabs[next], true);
    }
  });
});
