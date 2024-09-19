import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('.js-menu-splide', {
    autoWidth: true,
    pagination: false,
    classes: {
      arrows: 'splide__arrows top-menu__arrows',
      arrow: 'splide__arrow top-menu__arrow',
      prev: 'splide__arrow--prev top-menu__arrow--prev',
      next: 'splide__arrow--next top-menu__arrow--next',
    },
  });
  splide.mount();

  const catalogMenuOpen = document.querySelector('.js-catalog-menu-open');
  const catalogMenuClose = document.querySelector('.js-catalog-menu-close');
  const catalogMenu = document.querySelector('.js-catalog-menu');

  catalogMenuOpen.addEventListener('click', (e) => {
    e.preventDefault();
    catalogMenu.classList.add('catalog-menu--open');
  });
  catalogMenuClose.addEventListener('click', (e) => {
    e.preventDefault();
    catalogMenu.classList.remove('catalog-menu--open');
  });
});
