/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.frontEndSprites = function (Q) {
    //Vision.
    Q.Sprite.extend("Front", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2 - 200,
                y: Q.height/2 + 100,
                sprite: "front_hi",
                sheet: 'front_hi',
                scale: 1
            });

            this.add("animation");
        }
    });

    Q.animations('front_hi', {
        show: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37], rate: 1/2}
    });

};