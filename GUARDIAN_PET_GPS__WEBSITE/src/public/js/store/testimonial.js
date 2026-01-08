document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.js-testimonials-slider', {
        grabCursor: true,
        spaceBetween: 24,
        slidesPerView: 2,
        pagination: {
            el: '.js-testimonials-pagination',
            clickable: true
        },
        breakpoints: {
            576: { slidesPerView: 1, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 24 },
        }
    });
});