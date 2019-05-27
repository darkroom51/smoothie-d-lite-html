import '../css/main.scss';
import {jump} from './jump';

document.addEventListener('DOMContentLoaded', function () {
  
    // variables
    var navOffset = 80;
    var backToTopOffset = 400;
    var logo = document.querySelector('#logo');
    var navBarElement = document.querySelector('.navbar');
    var navLinks = document.querySelectorAll('.nav-item a');
    var menuToggleButton = document.querySelector('#menu-toggle');
    var menuUlElement = document.querySelector('.navbar__menu ul');
  
    // toggle mobile menu
    menuToggleButton.addEventListener('click', function () {
      menuToggleButton.classList.toggle('close-mobile-menu');
      menuUlElement.classList.toggle('show-mobile-menu');
    });
    // close mobile menu when link clicked
    menuUlElement.addEventListener('click', function () {
      menuUlElement.classList.remove('show-mobile-menu');
      menuToggleButton.classList.remove('close-mobile-menu');
    });
  
    // smooth scroll (jump.js lib)
    for (const link of navLinks) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        jump(link.getAttribute('href'), { offset: - navOffset });
      });
    }
  
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      jump('#top', { offset: 0 });
    });
    
  });
