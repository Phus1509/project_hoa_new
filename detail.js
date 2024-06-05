

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('productName');
    console.log("productName", productName)
    
    $.ajax({
        url: `http://localhost:5000/product/get-product-detail/${productName}` ,
        type: 'GET',
        success: function(response) {
            console.log("response", response)
         var htmlDetail ='';
         htmlDetail += `
         <div class="product_left-img col" >
         <div class="image">
             <img class="img-100" src="${response.image}" alt="">
         </div>
     </div>
     <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 order-mb-2">
         <div class="product-content">
             <div class="pro-content-head clearfix">
                 <h1>${response.TenSP}</h1>
                 <!--<div class="d-flex product-info">
                     <div class="pro-brand"><span class="title">Thương hiệu: </span><a href="/collections/vendors?q=khac">Khác</a></div>
                     <span class="line-info">|</span><div class="pro-type"><span class="title">Loại: </span><a href="/collections/types?q=binh-hoa">Bình Hoa</a></div>
                 </div>-->
                 <div id="pro-price">
                     <span class="price-now">${response.GiaSP}</span>
                     <span class="price-compare"></span>
                     <!--<div class="available-pro"><span class="title">Tình trạng: </span><span class="status">Còn hàng</span></div>
                 --></div>
           <div class="product__description"></div>
             </div>
         </div>
         <form data-available=${response.MaSP} id="add-item-form" action="/cart/add" method="post" class="variants clearfix">				
             <div class="row">
                 <div class="col-xs-12 selector-actions d-flex d-flex-center pd-top-10">
                     <div class="quantity-area">
                         <input type="button" value="–" onclick="window.scofield.minusQuantity($(this))" class="qty-btn qtyminus">
                         <input type="text" id="quantity" name="quantity" value="1" min="1" class="quantity-selector">
                         <input type="button" value="+" onclick="window.scofield.plusQuantity($(this))" class="qty-btn qtyplus">
                     </div>
                     <div class="wrap-addcart">						
                         <div class="row-flex">
                             <button type="button" id="add-to-cart" class="flex-addcart-mb  add-to-cart-style" name="add"><span>Thêm vào giỏ</span></button>
                             <button type="button" id="buy-now" class="hidden-xs buynow-style" name="add"> 
                                 <span>Mua ngay</span>
                             </button>
                         </div>
                     </div>	 
                 </div>
             </div>
         </form>
     </div>
         `
         $("#product_content").html(htmlDetail)
        },
        error: function(xhr, status, error) {
          // Xử lý khi có lỗi
          console.error('Error: ' + error);
          $('#productDetails').html('<p>Error loading product details</p>');
        }
      });
    })


window.scofield = {
    init: function(){
        this.plusQuantity();
        this.minusQuantity();
    },
        plusQuantity: $this => {
        if($this.siblings('input[name="quantity"]').val() != undefined ) {
        let currentVal = parseInt($this.siblings('input[name="quantity"]').val());
        if(!isNaN(currentVal)) {
        $this.siblings('input[name="quantity"]').val(currentVal + 1);
        }else {
        $this.siblings('input[name="quantity"]').val(1);
        }
        }
        },
        minusQuantity: $this => {
        if($this.siblings('input[name="quantity"]').val() != undefined ) {
        let currentVal = parseInt($this.siblings('input[name="quantity"]').val());
        if(!isNaN(currentVal) && currentVal > 1) {
        $this.siblings('input[name="quantity"]').val(currentVal - 1);
        }
        }
        }
}    
$(document).ready(() =>{
    window.scofield.init()
})



$(document).ready(() =>{
$('body').on('click', '#add-to-cart', function () {
    var MaSP = $("#add-item-form").data("available");
    var retrievedJsonString = localStorage.getItem('info_user');
    var retrievedObject = JSON.parse(retrievedJsonString);
    var userId = retrievedObject.id;
    var value = $("#add-item-form input[name='quantity']").val();
    var quantity = parseInt(value)
    console.log(MaSP,userId, quantity)
    $.ajax({
        url: 'http://localhost:5000/cart/add-to-cart',
        method: 'POST',
        data: {
            MaSP,
            userId,
            quantity
        },
        success: function(response) {
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
})
})