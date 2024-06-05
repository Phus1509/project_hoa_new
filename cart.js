$(document).ready(function() {
    var retrievedJsonString = localStorage.getItem('info_user');
    if (retrievedJsonString) {
        var retrievedObject = JSON.parse(retrievedJsonString);
        $.ajax({
            url: `http://localhost:5000/cart/get-all-cart/${retrievedObject.id}` ,
            type: 'GET',
            success: function(response) {
                console.log(response)
                var renderCart = '';
                var totalSum = 0;
                $.each(response, function(index, element) {
                    console.log(element)
                    if ('GiaSP' in element) {
                        totalSum += parseFloat(element.GiaSP * element.quantity);
                    }
                });
                response.forEach(function(product) {
                renderCart +=`
                    <div class="left_cart" data-id="${product.item_id}">
                        <div class="left_content">
                        <img src="${product.image}" width="100px" height="100px" alt=""/>
                        <div class="cart_price">
                        <h1>${product.TenSP}</h1>
                        <p>${product.GiaSP}</p>
                        </div>
                        </div>
                        <div class="quantity-area">
                        <input type="button" value="–" onclick="" class="qty-btn btn-left-quantity">
                        <input type="text" id="" name="updates[]" value="${product.quantity}" min="1" class="quantity-selector quantity-mini">
                        <input type="button" value="+" onclick="" class="qty-btn btn-right-quantity">
                        </div>
                        <a class="btn-delete">Xóa</a>
                    </div>            
                `})
                $(".cart_template").html(renderCart)
                $(".sum").text(totalSum.toFixed(2))
            },
            error: function(xhr, status, error) {
              console.error('Error: ' + error);
              $('#productDetails').html('<p>Error loading product details</p>');
            }
          });
    } else {
        console.log('Không có dữ liệu được lưu trữ trong localStorage.');
    }
})


$(document).ready(function() {
    $('body').on('click', '.btn-delete', function () {
        var item_id = $(".left_cart").data("id");
        $.ajax({
            url: `http://localhost:5000/cart/delete-item-cart/${item_id}` ,
            type: 'POST',
            success: function(response) {
                window.location.reload();
            },
            error: function(xhr, status, error) {
              console.error('Error: ' + error);
              $('#productDetails').html('<p>Error loading product details</p>');
            }
          });
         
    })
})

