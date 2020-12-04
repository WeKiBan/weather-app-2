// Module Imports
import "./main.scss";
import { ui } from './ui.js';

// event listener to open and close side menu
ui.hamburgerIcon.addEventListener('click', function () {
  ui.openCloseSideMenu();
});

// event listener to close side menu
ui.closeIcon.addEventListener('click', function () {
  ui.openCloseSideMenu();
});

ui.overlay.addEventListener('click', function () {
  ui.openCloseSideMenu();
});
