class UI {
  constructor() {
    this.hamburgerIcon = document.querySelector('.hamburger-icon');
    this.closeIcon = document.querySelector('.close-icon');
    this.mainSection = document.querySelector('#main');
    this.overlay =document.querySelector('.overlay');
  }
  openCloseSideMenu() {
    document.body.classList.toggle('open');
  }
}

export const ui = new UI();
