let searchForm = document.querySelector('.search-form');

document.querySelector('#search-box').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}
// Function to add item to the cart
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5000/product/get-all-product',
        method: 'GET',
        success: function(response) {
          var htmlRender = ''
            console.log("response", response)
            response.forEach(function(product) {
            htmlRender += `
        
              <div class="swiper-slide box">
             <div class="product_content">
             <div class="icons">
             <a href="#" class="fas fa-shopping-cart"></a>
             <a href="#" class="fas fa-eye"></a>
             <a href="#" class="fas fa-share"></a>
         </div>
         <div class="image">
             <img src="${product.image}" alt="">
         </div>
         <div class="content-1" style="background-color: white;padding: 10px;display: flex;
         flex-direction: column;">
             <h3>${product.TenSP}</h3>
             <div class="price">${product.GiaSP}</div>
             <a class="btn-buynow" href="detailproduct.html?productName=${product.MaSP}">Buy Now</a>
         </div>
             </div>
          </div>
            `
              $("#swiper-product-1").html(htmlRender)       
            })
            },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
})
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}
window.onscroll = () => {
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
    if (window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    }
    else {
        document.querySelector('.header').classList.remove('active');
    }
}
window.onload = () => {
   
    if (window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    }
    else {
        document.querySelector('.header').classList.remove('active');
    }
}
var swiper = new Swiper(".home-slider", {
    spaceBetween: 20, 
    effect: "fade", 
    loop:true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    centeredSlides: true,
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },

});
var swiper = new Swiper(".products-slider", {
    spaceBetween: 20,  
    loop:true,
   
    centeredSlides: true,
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
    grabCursor: true,
    breakpoints: {
        10: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },

});

// Select the elements
const addToCartButtons = document.querySelectorAll('.box .buynow');

// Add event listeners to each button
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
});

// Function to handle adding items to the cart
function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.box');

    const itemTitle = item.querySelector('h3').textContent;
    const itemPrice = item.querySelector('.price').textContent;
    const itemImageSrc = item.querySelector('.image img').src;

    addItemToCart(itemTitle, itemPrice, itemImageSrc);
}


