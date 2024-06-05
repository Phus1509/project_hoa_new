$(document).ready(function() {
    var retrievedJsonString = localStorage.getItem('info_user');
    if (retrievedJsonString) {
        var retrievedObject = JSON.parse(retrievedJsonString);
        $("#user_login").text(retrievedObject.username)
        $(".btn-action").html(`
        <a id="logout" class="login_container" target="_blank">
            Đăng Xuất
        </a>
        `);
    } else {
        // Nếu không có dữ liệu trong localStorage
        console.log('Không có dữ liệu được lưu trữ trong localStorage.');
    }
})
$(document).ready(function() {
    var retrievedJsonString = localStorage.getItem('info_user');
    var totalQuantity = 0;
    if (retrievedJsonString) {
        var retrievedObject = JSON.parse(retrievedJsonString);
        $.ajax({
            url: `http://localhost:5000/cart/get-all-cart/${retrievedObject.id}` ,
            type: 'GET',
            success: function(response) {
                console.log("response count", response)
                $.each(response, function(index, item) {
                    console.log("item", item)
                    totalQuantity += parseInt(item.quantity);
                    $(".cart-count").text(totalQuantity)
                })
                
            },
            error: function(xhr, status, error) {
              // Xử lý khi có lỗi
              console.error('Error: ' + error);
              $('#productDetails').html('<p>Error loading product details</p>');
            }
          });
    } else {
        // Nếu không có dữ liệu trong localStorage
        console.log('Không có dữ liệu được lưu trữ trong localStorage.');
    }
})
$(document).ready(function() {
    $("#btn_header-login").click(function(){
        $(".btn-action").toggle();
    });
})
$(document).ready(function() {
    $("#logout").click(function(){
        localStorage.removeItem("info_user");
        window.location.reload();
    });
})