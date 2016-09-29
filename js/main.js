
//左侧三个Tab面板

$(function() {
    $("#content div").hide(); // Initially hide all content
    $("#tabs li:first").attr("id","current"); // Activate first tab
    $("#content div:first").fadeIn(); // Show first tab content

    $('#tabs a').click(function(e) {
        e.preventDefault();
        $("#content div").hide(); //Hide all content
        $("#tabs li").attr("id",""); //Reset id's
        $(this).parent().attr("id","current"); // Activate this
        $('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
    });
});
//左侧三个Tab面板
//左侧折叠面板菜单
var headers = ["H1","H2","H3","H4","H5","H6"];

$(".accordion").click(function(e) {
    var target = e.target,
        name = target.nodeName.toUpperCase();

    if($.inArray(name,headers) > -1) {
        var subItem = $(target).next();

        //slideUp all elements (except target) at current depth or greater
        var depth = $(subItem).parents().length;
        var allAtDepth = $(".accordion p, .accordion div").filter(function() {
            if($(this).parents().length >= depth && this !== subItem.get(0)) {
                return true;
            }
        });
        $(allAtDepth).slideUp("fast");

        //slideToggle target content and adjust bottom border if necessary
        subItem.slideToggle("fast",function() {
            $(".accordion :visible:last").css("border-radius","0 0 10px 10px");
        });
        $(target).css({"border-bottom-right-radius":"0", "border-bottom-left-radius":"0"});
    }
});
//左侧折叠面板菜单
//左侧子菜单中checkbox脚本



//左侧子菜单中checkbox脚本
//cesium 部分
var viewer = new Cesium.Viewer('cesiumContainer');
viewer.dataSources.add(new Cesium.CzmlDataSource().load('../data/BEIDOU-3_M1_40748.czml'));
$(function($) {
    $("#gooey-upper").gooeymenu({
        bgColor: "#ff6666",
        contentColor: "white",
        style: "circle",
        horizontal: {
            menuItemPosition: "glue"
        },
        vertical: {
            menuItemPosition: "spaced",
            direction: "up"
        },
        circle: {
            radius: 80
        },
        margin: "small",
        size: 90,
        bounce: true,
        bounceLength: "small",
        transitionStep: 100,
        hover: "#e55b5b"
    });
    $("#gooey-h").gooeymenu({
        bgColor: "#68d099",
        contentColor: "white",
        style: "horizontal",
        horizontal: {
            menuItemPosition: "glue"
        },
        vertical: {
            menuItemPosition: "spaced",
            direction: "up"
        },
        circle: {
            radius: 90
        },
        margin: "small",
        size: 80,
        bounce: true,
        bounceLength: "small",
        transitionStep: 100,
        hover: "#5dbb89"
    });

    $("#gooey-v").gooeymenu({
        bgColor: "#68d099",
        contentColor: "white",
        style: "vertical",
        horizontal: {
            menuItemPosition: "glue"
        },
        vertical: {
            menuItemPosition: "spaced",
            direction: "up"
        },
        circle: {
            radius: 90
        },
        margin: "small",
        size: 70,
        bounce: true,
        bounceLength: "small",
        transitionStep: 100,
        hover: "#68d099"
    });

});