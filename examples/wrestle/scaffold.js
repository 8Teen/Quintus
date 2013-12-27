/**
 * Created by jiangcheng.wxd on 13-12-27.
 */
Quintus.scaffoldSprites = function (Q) {
    Q.Sprite.extend("Blood", {
        init: function (p) {
            this._super(p, {
                z:1,
                w: 300,
                h: 15,
                asset: "scaffold/blood_l.png",
                scale: 1
            });
        }
    });
};