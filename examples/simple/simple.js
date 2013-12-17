/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus()
        .include("Sprites, Anim, Scenes, Touch, UI , Input");

    Q.setup({ maximize: true }).touch(Q.SPRITE_ALL);

    //background.
    Q.Sprite.extend("Background", {
        init: function (p) {
            this._super(p, {
                x: 0,
                y: 0,
                w: Q.width,
                h: Q.height,
                scale: 4,
                type: Q.SPRITE_DEFAULT
            });
        }
    });

    //kid.
    Q.Sprite.extend("Kid", {
        init: function (p) {
            this._super(p, {
                sprite: "kid",
                sheet: 'kidDown',
                scale: 0.6,
                angle: -5
            });

            this.add("animation");
            //this.on("drag");
        },
        drag: function(touch) {
            this.p.x = touch.origX + touch.dx;
            this.p.y = touch.origY + touch.dy;
        },
        options: {
            moving: false
        },
        move: function(X,Y){
            var _self = this;

            if(!_self.options.moving){
                _self.options.moving = true;
                _self.play("walk");

                _self.add("tween");


                var cta = Math.round((Math.atan2(Y-_self.p.y,X-_self.p.x)/Math.PI)*180);

                if(cta >= -45 && cta <= 45){
                    _self.p.sheet = 'kidRight';
                    _self.p.angle = cta;
                }

                if(cta > 45 && cta < 135){
                    _self.p.sheet = 'kidDown';
                    _self.p.angle = cta - 90;
                }

                if(cta <= -135 && cta >= -180){
                    _self.p.sheet = 'kidLeft';
                    _self.p.angle = cta + 180;
                }

                if(cta <= 180 && cta >= 135){
                    _self.p.sheet = 'kidLeft';
                    _self.p.angle = cta - 180;
                }

                if(cta > -135 && cta < -45){
                    _self.p.sheet = 'kidUp';
                    _self.p.angle = cta + 90;
                }

                var a = _self.p.x;
                var b = _self.p.y;
                var cos = (Math.sqrt(Math.pow((X-a),2) + Math.pow((Y-b),2))/Math.sqrt(Math.pow(_self.p.w,2) + Math.pow(_self.p.h,2))) * 2;


                _self.animate({ x: X, y: Y }, cos, Q.Easing.Linear ,{callback : function(){
                    _self.play("standAlone");

                    _self.options.moving = false;
                }});
            }
            else{
                return;
            }
        }
    });

    //background.
    Q.Sprite.extend("Circle", {
        init: function (p) {
            this._super(p, {
                x: 0,
                y: 0,
                w: Q.width,
                h: Q.height
            });
        }
    });

    Q.scene("animate_tc", function (stage) {
        //kid
        var kid = new Q.Kid({ x: 100, y: 150 });

        stage.insert(kid);

        //background.
        var bg = stage.insert(new Q.Background());
        bg.on("touch", function (e) {
            kid.move(e.x, e.y);
        });

    });


    //key 图片名称
    Q.animations('kid', {
        walk: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12], rate: 1/13},
        standAlone: { frames: [12], rate: 1/12}
    });


    Q.load([
        'kid_walk.png', 'sprites.json'
    ], function () {
        // this will create the sprite sheets sprite1name and sprite2name

        Q.compileSheets("kid_walk.png", "sprites.json");

        Q.stageScene("animate_tc");
    });

});
