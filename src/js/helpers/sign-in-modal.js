import { app } from "./firebase-application.js"
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from 'firebase/auth';
import Notiflix from 'notiflix';

const backdrop = document.querySelector('.authorization__bacdrop');
const auth = getAuth(app);
const logInBtn = document.querySelector('.log-in-btn');
const userBarBtnText = document.querySelector('.user-bar-btn__text');
const userBar = document.querySelector('.js-user-bar');
const logOutBtn = document.querySelector('.js-log-out-btn');
const headerNav = document.querySelector('.header-nav');
headerNav.classList.add('is-hidden');

async function handelSignInUserAccount(e) {
    e.preventDefault();
    const {
      elements: { email, password },
    } = e.currentTarget;
  
    const userEmail = email.value;
    const userPassword = password.value;
  
    if (await signInUserAccount(auth, userEmail, userPassword)) {
      e.target.reset();
    }
  }

  async function signInUserAccount(auth, userEmail, userPassword) {
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);

      backdrop.style.display = 'none';
      backdrop.classList.add('is-hidden');
      logInBtn.classList.add('visually-hidden');
    }
      catch(error) {
        if (error.code === 'auth/wrong-password') {
          Notiflix.Notify.failure('Your password is wrong, please try again');
        } else if (error.code === 'auth/user-not-found') {
          Notiflix.Notify.failure('Your email is wrong, please try again');
        }
      };
  }
  
  
  function checkUserAuth() {
    onAuthStateChanged(auth, user => {
      if (user) {
        userBarBtnText.innerHTML = user.displayName;
        userBar.classList.remove('visually-hidden');
        logInBtn.classList.add('visually-hidden');
        headerNav.classList.remove('is-hidden');
        headerNav.classList.remove('is-hidden');
      }
    });
  }
  checkUserAuth();

  const signInForm = document.querySelector('#sign-in');
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handelSignInUserAccount(event);
});

logOutBtn.addEventListener('click', handelLogOutUserAccount);

function handelLogOutUserAccount() {
    signOut(auth)
      .then(() => {
        userBar.classList.add('visually-hidden');
        logInBtn.classList.remove('visually-hidden');
        backdrop.style.display = 'block';
        userBarBtnText.innerHTML = '';
        headerNav.classList.add('is-hidden');
        })
      .catch(error => {
        console.log(error);
      });
  }
  