$(document).ready(function() {
//字体的burn特效
    $('.burning').burn({
        k: 10,
        w:10 ,
        flames : [{
            x: 0,
            hsla: [300, 100, 80, .1],
            y: 0,
            blur: .1
        },
            {
                x: 0,
                hsla: [290, 100, 80, .8],
                y: .02,
                blur: .15
            },
            {
                x: 0,
                hsla: [280, 100, 80, .7],
                y: .05,
                blur: .2
            },
            {
                x: 0,
                hsla: [260, 100, 80, .6],
                y: .1,
                blur: .25
            },
            {
                x: 0,
                hsla: [240, 100, 80, .5],
                y: .15,
                blur: .3
            },
            {
                x: 0,
                hsla: [220, 100, 80, .4],
                y: .25,
                blur: .4
            },
            {
                x: 0,
                hsla: [200, 100, 80, .3],
                y: .5,
                blur: .5
            }]

    });
});/**
 * Created with JetBrains WebStorm.
 * User: zhangyu
 * Date: 16-9-14
 * Time: 上午9:58
 * To change this template use File | Settings | File Templates.
 */
//主页图片轮播
$('.carousel').carousel({
    interval:2000,
    wrap: true
});
//主页图片轮播