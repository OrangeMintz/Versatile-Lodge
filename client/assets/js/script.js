let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () => { //to open side bar
    navbar.classList.toggle('active');
}

window.onscroll = () => {                         //close side bar automatically when scrolling
    navbar.classList.remove('active');
} 

document.querySelectorAll('.contact .row .faq .box h3').forEach(faqBox => {    //reveals the answers to FAQ
    faqBox.onclick = () => {
       faqBox.parentElement.classList.toggle('active');   
    }
});


var swiper = new Swiper(".home-slider", {         //swiper defined constructor - home
    loop:true,
    effect: "coverflow",
    spaceBetween: 30,
    grabCursor: true,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper = new Swiper(".gallery-slider", {        //swiper defined constructor - gallery
    loop:true,
    effect: "coverflow",
    slidesPerView: "auto",
    centeredSlides: true,
    grabCursor: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

var swiper = new Swiper(".reviews-slider", {        //swiper defined constructor - reviews
    loop:true,
    slidesPerView: "auto",
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        768: {
          slidesPerView: 1,
        },
        991: {
          slidesPerView: 2,
        },
    },
});

