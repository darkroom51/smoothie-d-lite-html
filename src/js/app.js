import '../css/main.scss';
import { jump } from './jump';
import { validateEmail, sendData } from './helpers';

document.addEventListener('DOMContentLoaded', function () {

  // variables
  var navOffset = 80;
  var logo = document.querySelector('#logo');
  var navBarElement = document.querySelector('.navbar');
  var navLinks = document.querySelectorAll('.smooth');
  var menuToggleButton = document.querySelector('#menu-toggle');
  var menuUlElement = document.querySelector('.navbar__menu ul');
  var signupForm = document.querySelector('#signup-form');

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

  // sticky menu
  document.addEventListener('scroll', function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    scrollPosition > navOffset ? navBarElement.classList.add('detached') : navBarElement.classList.remove('detached');
  });

  //signup form
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailInput = document.querySelector('#email').value;
    var gdprCheckbox = document.querySelector('#gdpr').checked;
    var submitBtn = document.querySelector('#submit-btn');

    if (!gdprCheckbox || !validateEmail(emailInput)){
      renderMsg('error', 'Ups! Please check is your email OK and you checked the checkbox', submitBtn);
      return;
    }

    var data = {email: emailInput};
    renderMsg('info', 'Great you have been registered! We\'ll contact you soon', submitBtn);
    document.getElementById('signup-form').reset();
    sendData(data);
  })

  function renderMsg(type, msg, button){
    var msgElem = document.querySelector('.signup__msg');
    msgElem.innerHTML = msg;
    msgElem.classList.add('show');
    msgElem.classList.add(type === 'error' ? 'show--error' : 'show--info');
    button.disabled = true;
    button.classList.add('btn--disabled');
    setTimeout(function(){
      msgElem.innerHTML = '';
      msgElem.classList.remove('show', 'show--error', 'show--info');
      button.disabled = false;
      button.classList.remove('btn--disabled');
    },6000);
  }
});
