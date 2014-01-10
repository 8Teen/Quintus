/**
 * Created by jiangcheng.wxd on 14-1-9.
 */
window.addEventListener('load', function (e) {

    var Q = window.Q = Quintus({
            development: true,
            audioSupported: [ 'mp3' ]
        })
            .include("Sprites, Anim, Scenes, 2D, Touch, UI , Input , Audio")
        ;

    Q.setup({
        width: 500,
        height: 320,
        upsampleHeight: 640,
        upsampleWidth: 1000
    })
        .touch(Q.SPRITE_ALL);

    Q.debug = false;

    //canvas 绘图效率 http://jsperf.com/imagesmoothingenabled
    (function (enabled) {
        Q.ctx.webkitImageSmoothingEnabled && (Q.ctx.webkitImageSmoothingEnabled = enabled);
        Q.ctx.imageSmoothingEnabled && (Q.ctx.imageSmoothingEnabled = enabled);
    })(true);

    Q.load([
        'dice.png'
    ], function () {
        Q.sheet("dice", "dice.png",
            {
                "sx": 0,
                "sy": 0,
                "cols": 5,
                "rows": 3,
                "tilew": 189,
                "tileh": 199
            });

        Q.stageScene("mainRoot");
    });

    Q.MovingSprite.extend("Dice", {
        init: function (p) {
            this._super(p, {
                x: Q.width / 2,
                y: Q.height / 2,
                sprite: "dice",
                sheet: 'dice',
                angle: 360,
                w: 189,
                h: 199
            });

            this.add("animation");
        },
        show: function () {
            this.play('angel_a');
        }
    });

    Q.animations('dice', {
        angel_a: {
            frames: [0, 1, 2, 3, 4],
            rate: 1 / 4,
            loop: false,
            next: 'angel_b'
        },
        angel_b: {
            frames: [4, 3, 2, 1, 0],
            rate: 1 / 4,
            loop: false,
            next: 'angel_c'
        },
        angel_c: {
            frames: [5, 6, 7, 8, 9],
            rate: 1 / 4,
            loop: false,
            next: 'angel_d'
        },
        angel_d: {
            frames: [9, 8, 7, 6, 5],
            rate: 1 / 4,
            loop: false,
            next: 'angel_e'
        },
        angel_e: {
            frames: [10, 11, 12, 13, 14],
            rate: 1 / 4,
            loop: false,
            next: 'angel_f'
        },
        angel_f: {
            frames: [14, 13, 12, 11, 10],
            rate: 1 / 4,
            loop: false,
            next: 'angel_a'
        }
    });

    Q.scene("mainRoot", function (stage) {

        var dice = new Q.Dice({
            vx: 0, vy: 0,
            ax: 0, ay: 0
        });
        dice.show();
        stage.insert(dice);
    });
});