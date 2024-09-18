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
});
