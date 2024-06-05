document.querySelector('.form-select-color').addEventListener('change', function(event) {
    console.log(event);
    var selectedColor = event.target.value;

    var selectedOption = event.target.selectedOptions[0];

    var color = selectedOption.dataset.color;
    event.target.style.background = `${color}`
    console.log('Màu đã chọn:', color);
    console.log('Giá trị màu:', selectedColor);
});


$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5000/product/get-all-product',
        method: 'GET',
        success: function(response) {
          var htmlRender = ''
            console.log("response", response)
            response.forEach(function(product) {
            htmlRender += `

            <div class="col-lg-3 ">
            <div class="product_content">
            <div class="product-item">
                <img src="${product.image}" width="300px" height="300px"  alt="img-1"/>
            </div>
            <div class="content-1" style="background-color: white">
                <h3 style="font-size: 15px;">${product.TenSP}</h3>
                <div class="price">${product.GiaSP}</div>
                <a class="btn-buynow" href="detailproduct.html?productName=${product.MaSP}">Buy Now</a>
            </div>
            </div>
        </div>
            
            `
              $("#product_list-render").html(htmlRender)       
            })
            },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
})