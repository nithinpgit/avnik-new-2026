$('.category').on('change', function(){
	var market_place_category_id = this.value;
	var url = $('.category').attr('data-subCategory-url');
	var token = $('.category').attr('data-token');
    $(".marketPlaceSubcategory").html('');
    $.ajax({
        url: url,
        type: "POST",
        data: {market_place_category_id: market_place_category_id,_token: token},
        dataType: 'json',
        success: function (result) 
        {
            if(result.status == true)
            {
                $.each(result.data, function (key, value) {
                    $(".marketPlaceSubcategory").append('<option value="' + value.id + '">' + value.title + '</option>');
                });    
            }
            else
            {
                $(".marketPlaceSubcategory").append('<option value="">' + result.message + '</option>');
            }
        }
    });
});
$(".marketPlaceSubcategory").select2({
    placeholder: "Select Subcategory",
});