$(document).ready(function () {
  // $('#myModal').modal();

  $("#search").keyup(function () {
    // search1($(this));
    var key = $(this).val().toLowerCase();

    $('.product').show().filter(function () {
      return $(this).text().toLowerCase().indexOf(key) == -1;
    }).hide();
  });
  var boxHTMLCollection = document.getElementsByClassName('box ')
  var box1Element = document.getElementsByClassName('box:first-child')
  var box2Element = document.getElementsByClassName('box:nth-child(2)')
  var allItemElements = document.getSelection('li')
  $('.order').change(function () {
    var orderType = $(this).val();
    var products = $('.product');

    var orderProduct = sortProduct(products, orderType);

    products.remove();

    // show orderProduct
    $('#products').append(orderProduct);
  });

  $('.buy').click(function (event) {
    event.preventDefault();
    var currentQuantityProduct = $('.card_number').text();
    var inputQuantity = $(this).parent().find('input').val();
    var regex = inputQuantity.match(/[1-9](\d+){0,}/g);

    // if (inputQuantity == 0 || inputQuantity == "" || isNaN(inputQuantity)) {
    if (regex == null || regex.length != 1 || regex[0].length != inputQuantity.length) {
      alert('Please input again!');
    } else {
      var quantity = parseInt(currentQuantityProduct) + parseInt(inputQuantity);
      $('.card_number').text(quantity);
    }

    var newName = $(this).parent().parent().find('.card-title').text();
    var newCode = $(this).parent().parent().find('i:first').text();

    // Remove all product from my order
    // $('.list-order-product tr:first').hide();

    var listProduct = $('.list-order-product tr');
    var hasOrderProduct = false;

    listProduct.each(function (index, product) {

      var code = $(this).find('.code').text();
      var quantity = $(this).find('.quantity').text();
      var newQuantity = 0;

      if (code == newCode) {
        hasOrderProduct = true;
        newQuantity = parseInt(quantity) + parseInt(inputQuantity);

        $(this).find('.quantity').text(newQuantity);
      }
    });

    if (hasOrderProduct == false) {
      // Render order-product html
      var htmlProduct = '<tr>'
        + '<th scope="row">1</th>'
        + '<td class="name">' + newName + '</td>'
        + '<td class="code">' + newCode + '</td>'
        + '<td class="quantity">' + inputQuantity + '</td>'
        + '</tr>';

      $('.list-order-product').append(htmlProduct);
    }

  });


  function sortProduct(products, type) {
    var results = [];
    var prices = [];
    products.each(function (index) {
      var product = $(this);
      var priceArr = product.find('i').text().split('$');
      var price = priceArr[priceArr.length - 1];

      prices[index] = price;

      product.addClass(price);
    });

    if (type == 2) {
      var orderPrices = prices.sort(function (a, b) { return a - b });
    } else if (type == 1) {
      var orderPrices = prices.sort(function (a, b) { return b - a });
    } else {
      location.reload();
    }

    $.each(orderPrices, function (index, value) {
      results[index] = $('.' + value);
    });

    return results;
  }

  function search1(input) {
    var searchKey = input.val().toLowerCase();
    var productList = $('.product');

    productList.each(function (index) {
      var product = $(this);
      var productInfo = product.text().toLowerCase();

      if (productInfo.indexOf(searchKey) == -1) {
        product.hide();
      } else {
        product.show();
      }
    });
  }


});