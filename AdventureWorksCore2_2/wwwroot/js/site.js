// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
'use strict';

$(function () {
    $("#btnGetTime").click(function () {
        $.ajax({
            url: "/Home/GetTime",
            success: GetTimeSucceeded,
            error: AjaxFailed,
            cache: false
        });
    });

    $("#btnGetRandomUser").click(function () {
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: gotUser,
            error: AjaxFailed
        });
    });

    $("body").on("click", "#productsTable .pagination a", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");

        $.ajax({
            url: url,
            success: function (result) {
                $("#productsTable").html(result);
            },
            failure: function (result) {
                alert(result.status);
            }
        });
    });
});

function GetTimeSucceeded(response) {
    $("#whatsTheTime").html(response).css({ "background-color": "yellow", "color": "blue", "fontsize": "larger" });
}

function gotUser(user) {
    var thisUser = user.results[0];

    $('#randomUser').html(
        '<img id=userPicture src=' + thisUser.picture.large + ' /><br /><br />' +
        thisUser.name.title + ' ' +
        thisUser.name.first + ' ' +
        thisUser.name.last + '<br />' +
        thisUser.location.street + '<br />' +
        thisUser.location.city + '<br />' +
        thisUser.nat + '<br />' +
        thisUser.email + '<br />' +
        'Username: ' +
        thisUser.login.username + '<br /><br />'
    )
        .css({
            'background-color': 'lightblue',
            'color': 'red',
            'font-size': 'large'
        });
}

function AjaxFailed(response) {
    alert(response.status + ' ' + response.statusText);
}
