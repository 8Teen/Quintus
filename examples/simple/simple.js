/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus()
        .include("Sprites, Anim, Scenes, 2D, Touch, UI , Input");

    Q.setup({ maximize:true }).touch(Q.SPRITE_ALL);

    //background.
    Q.Sprite.extend("Background", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2,
                y: Q.height/2,
                w: Q.width,
                h: Q.height,
                asset:'floor.png',
                scale: 1,
                type: Q.SPRITE_ALL
            });
        }
    });

    //kid.
    Q.Sprite.extend("Kid", {
        init: function (p) {
            this._super(p, {
                z: 1,
                sprite: "kid",
                sheet: 'ManSouth',
                scale: 1
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

                if(cta > -20 && cta <= 25){
                    _self.p.sheet = 'ManEast';
                    _self.p.angle = cta;
                }

                if(cta > 25 && cta <= 70){
                    _self.p.sheet = 'ManEastSouth';
                    _self.p.angle = cta - 45;
                }

                if(cta > 70 && cta <= 115){
                    _self.p.sheet = 'ManSouth';
                    _self.p.angle = cta - 90;
                }

                if(cta > 115 && cta <= 160){
                    _self.p.sheet = 'ManWestSouth';
                    _self.p.angle = cta - 135;
                }

                if((cta > 160 && cta <= 180) || (cta >= -180 && cta <= -155)){
                    _self.p.sheet = 'ManWest';
                    _self.p.angle = cta - 180;
                }

                if(cta > -155 && cta <= -110){
                    _self.p.sheet = 'ManWestNorth';
                    _self.p.angle = cta + 135;
                }

                if(cta > -110 && cta <= -55){
                    _self.p.sheet = 'ManNorth';
                    _self.p.angle = cta + 90;
                }

                if(cta > -55 && cta <= -10){
                    _self.p.sheet = 'ManEastNorth';
                    _self.p.angle = cta + 45;
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

        //stage.add("viewport").follow(kid);

    });


    //key 图片名称
    Q.animations('kid', {
        walk: { frames: [0,1,2,3,4,5,6,7], rate: 1/8},
        standAlone: { frames: [0], rate: 1/8}
    });


    Q.load([
        'man_walk.png', 'sprites.json',
        'floor.png'
    ], function () {
        // this will create the sprite sheets sprite1name and sprite2name

        Q.compileSheets("man_walk.png", "sprites.json");

        Q.stageScene("animate_tc");
    });

});
