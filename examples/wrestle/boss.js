/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.bossSprites = function (Q) {
    Q.Sprite.extend("Boss", {
        init: function (p) {
            this._super(p, {
                x:Q.width/2 + 200,
                y: Q.height/2,
                sprite: "boss_0",
                sheet: 'boss_0',
                scale: 1
            });

            this.add("animation");
        }
    });

    Q.animations('boss_0', {
        show: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], rate: 1/3}
    });
};