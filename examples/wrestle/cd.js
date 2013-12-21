/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.cdSprites = function (Q) {
    //Vision.
    Q.Sprite.extend("CD", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2,
                y: Q.height/2,
                sprite: "cd",
                sheet: 'cd',
                scale: 1
            });

            this.add("animation");
        }
    });

    Q.animations('cd', {
        show: { frames: [0,1,2,3,4,5], rate: 1, loop: false}
    });

};