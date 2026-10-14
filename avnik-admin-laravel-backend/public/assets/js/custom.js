function articleImage(e) {
    "use strict";
    var a = new FormData;
    a.append("image", e), swal({ text: "Image uploading. Please Wait! ...", button: !1 }), fetch("/article-image", { method: "POST", body: a, headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") } }).then(e => e.json()).then(e => { $("#summernote").summernote("insertImage", e) }).then(() => { swal({ icon: "success", text: "Uploaded successfully" }) }).catch(e => { swal({ icon: "error", text: e }) })
}
$(document).ready(function() {
    $(".alert").alert(), window.setTimeout(function() { $(".alert").alert("close") }, 9e3), $("#summernote").summernote(), $("#dataTable").DataTable({"stateSave": true, "stateSaveCallback": function(settings,data) {
        localStorage.setItem( 'DataTables_' + settings.sInstance, JSON.stringify(data) )
    }, "stateLoadCallback": function(settings) {
        return JSON.parse( localStorage.getItem( 'DataTables_' + settings.sInstance ) )
      },"ordering": false }), $("#birthday input").datepicker({ format: "yyyy-mm-dd" }), $image_crop = $(".image-preview").croppie({ enableExif: !0, enforceBoundary: !1, enableOrientation: !0, viewport: { width: 200, height: 200, type: "square" }, boundary: { width: 300, height: 300 } }), $(" #avatarCrop ").change(function() {
        $("#avatar-holder").addClass("d-none"), $("#avatar-updater").removeClass("d-none");
        var e = new FileReader;
        e.onload = function(e) { $image_crop.croppie("bind", { url: e.target.result }) }, e.readAsDataURL(this.files[0])
    }), $("#toggleClose").click(function() { $("#toggleClose").css("display", "none"), $(".app-logo").css("display", "none"), $(".toggleopen").css("display", "block") }), $(".toggleopen").click(function() { $(".toggleopen").css("display", "none"), $(".app-logo").css("display", "block"), $("#toggleClose").css("display", "block") }), $("#rotate-image").click(function(e) { $image_crop.croppie("rotate", 90) }), $("#crop_image").click(function() {
        $image_crop.croppie("result", { type: "canvas", size: "viewport" }).then(function(e) {
            var a = $("input[name=avatar-url]").val(),
                t = $('meta[name="csrf-token"]').attr("content"),
                o = $("#crop_image");
            o.html("Saving Avatar..."), o.attr("disabled", "disabled"), $.ajaxSetup({ headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") } }), $.ajax({ url: a, type: "POST", data: { avatar: e, _token: t }, dataType: "json", success: function(e) {}, complete: function(e) { location.reload() } })
        })
    }), $("#avatar-cancel-btn").click(function() { $("#avatar-holder").removeClass("d-none"), $("#avatar-updater").addClass("d-none") });
    $("#backup-file-btn").click(function() { swal({ text: "Application file backup is disabled by Administrator", icon: 'error', }); });
    $("#backup-database-btn").click(function() { swal({ text: "Database backup is disabled by Administrator", icon: 'error', }); });
});
$("#summernote").summernote({
    toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["codeview"]]
    ],
    height: 300,
    minHeight: null,
    maxHeight: null,
    focus: 0,
    spellCheck: !0,
    callbacks: { onImageUpload: function(e) { articleImage(e[0]) }, onImageLinkInsert: function(e) { $("#summernote").summernote("insertImage", e) } }
});
$("#plan-description").summernote({
    toolbar: [
        ["font", ["bold"]],
        ["para", ["ul", "ol"]],
    ],
    height: 150,
    minHeight: 150,
    maxHeight: 150,
    focus: 0,
    spellCheck: !0,
    callbacks: { onImageUpload: function(e) { articleImage(e[0]) }, onImageLinkInsert: function(e) { $("#plan-description").summernote("insertImage", e) } }
});
$(function() { $('[data-toggle="tooltip"]').tooltip() });




$('.manual-ajax').click(function(event) {
    //event.preventDefault();
    //this.blur(); // Manually remove focus from clicked link.
    var url = $(this).attr('href');
    $('#ex1').modal('show');
    $('#ourcontent').load(url);

});

function delete_data(current) {
    var current_url = $(current).attr('data-link');
    var current_head = $(current).attr('data-head');
    var tokenfield = $(current).attr('data-token-field');
    var token = $(current).attr('data-token');
    var d_image = $(current).attr('data-image');
    var d_type = $(current).attr('data-x');
    if (d_type == 'A') { d_method = 'GET'; } else { d_method = 'DELETE'; }
    if (d_image != '') {
        iUrl = d_image;
    } else {
        iUrl = '';
    }
    Swal.fire({
        title: current_head,
        text: "Are you sure you want to delete",
        icon: 'warning',
        input: 'checkbox',
        inputValue: 0,
        inputPlaceholder: 'I understand that deleting is permanent and can not be undone',
        imageUrl: iUrl,
        imageWidth: 500,

        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        inputValidator: (result) => { return !result && 'You need to agree with Terms & Conditions' }
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: d_method,
                url: current_url,
                data: { "_token": token },
                success: function(res) {
                    location.reload();
                }
            });
        }
    })
}