/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus()
        .include("Sprites, Anim, Scenes, Touch, UI , Input")
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

    //kid.
    Q.Sprite.extend("Kid", {
        init: function (p) {
            this._super(p, {
                sprite: "kid",
                sheet: 'kid',
                scale: 0.6,
                angle: -5
            });


            this.on("drag");
            this.add("animation");
        },
        drag: function(touch) {
            this.p.x = touch.origX + touch.dx;
            this.p.y = touch.origY + touch.dy;
        }
    });

    Q.input.on('left',function(e){
        alert(e);
    });

    //Q.input.joypadControls();

    Q.scene("animate_tc", function (stage) {

        //animation
        var kid = new Q.Kid({ x: 100, y: 150 });

        stage.insert(kid);
        kid.play("walk");

    });


    //key 图片名称
    Q.animations('kid', {
        walk: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12], rate: 1/12},
        standAlone: { frames: [12], rate: 1/12, next: 'walk'}
    });


    Q.load([
        'kid_walk.png', 'sprites.json'
    ], function () {
        // this will create the sprite sheets sprite1name and sprite2name

        Q.compileSheets("kid_walk.png", "sprites.json");

        Q.stageScene("animate_tc");
    });

});
