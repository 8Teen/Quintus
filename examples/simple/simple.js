/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus()
        .include("Sprites, Anim, Scenes, Touch, UI")
        .setup()
        .touch();


    //Turtle.
    Q.Sprite.extend("Turtle", {
        init: function (p) {
            this._super(p, {
                sprite: "animado",
                sheet: 'animado'
            });


            this.add("animation");
        }
    });


    Q.scene("animate_tc", function (stage) {

        //animation
        var turtle = new Q.Turtle({ x: 100, y: 150 });

        stage.insert(turtle);
        turtle.play("expand");


    });


    //key 图片名称
    Q.animations('animado', {
        expand: { frames: [0, 1, 2, 3, 4, 5 , 6 , 7], rate: 1/3},
        standAlone: { frames: [0], rate: 2, next: 'expand'}
    });


    Q.load([
        'animado.gif', 'sprites.json'
    ], function () {
        // this will create the sprite sheets sprite1name and sprite2name

        Q.compileSheets("animado.gif", "sprites.json");

        Q.stageScene("animate_tc");
    });

});
