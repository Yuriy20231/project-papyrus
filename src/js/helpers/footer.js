const modal = document.querySelector('.footer-modal');
const modalContent = document.querySelector('.footer-modal-content');
const openModalBtn = document.querySelector('#our-team-button');
const closeModalBtn = document.querySelector('.footer-close-modal');
const scrollModal = document.querySelector('.footer-scroll')

function openModal() {
  modal.style.display = 'block';
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  setTimeout(() => {
    modalContent.style.opacity = '1';
  }, 100);
}

function closeModal() {
  modalContent.style.opacity = '0';
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function scrollToTop() {
  modalContent.scrollTop = 0;
}

function OutsideClick(event) {
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
}

function EscapeClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
scrollModal.addEventListener('click', scrollToTop);
modal.addEventListener('click', OutsideClick);
document.addEventListener('keydown', EscapeClose)