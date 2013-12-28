/**
 * Created by jiangcheng.wxd on 13-12-27.
 */
Quintus.scaffoldSprites = function (Q) {
    Q.Sprite.extend("Blood", {
        init: function (p) {
            this._super(p, {
                z:1,
                h: 15,
                scale: 1
            });
        }
    });

    Q.Sprite.extend("Avator", {
        init: function (p) {
            this._super(p, {
                z:1,
                scale: 1
            });
        }
    });
};