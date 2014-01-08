/**
 * Created by jiangcheng.wxd on 13-12-27.
 */
Quintus.scaffoldSprites = function (Q) {


    //background.
    Q.Sprite.extend("Background", {
        init: function (p) {
            this._super(p, {
                x: Q.width / 2,
                y: Q.height / 2,
                h: 200,
                scale: 1,
                asset: 'bg/bg.jpg',
                type: Q.SPRITE_NONE
            });
        }
    });

    Q.Sprite.extend("Blood", {
        init: function (p) {
            this._super(p, {
                z: 1,
                h: 15,
                scale: 1
            });
        }
    });

    Q.Sprite.extend("Avator", {
        init: function (p) {
            this._super(p, {
                z: 1,
                scale: 1
            });
        }
    });

    Q.Sprite.extend("Circle", {
        init: function (p) {
            this._super(p, {
                scale: 1
            });

            this.add('animation');
            this.add('tween');
        },
        enlarge: function () {
            var _self = this;

            _self.animate({scale:3, opacity: 0},1, Q.Easing.Linear , { callback: function(){
                _self.destroy();
            }});
        },
        draw: function (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = this.p.opacity || 1;
            ctx.fillStyle = this.p.fill || '#000';
            ctx.arc(0, 0, this.p.size, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    });
};