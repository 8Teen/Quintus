/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.ioSprites = function (Q) {
    //Vision.
    Q.Sprite.extend("A", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 0,
                scale: 0.6
            });
        }
    });

    Q.Sprite.extend("B", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 1,
                scale: 0.6
            });
        }
    });

    Q.Sprite.extend("C", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 2,
                scale: 0.6
            });
        }
    });

    Q.Sprite.extend("D", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 3,
                scale: 0.6
            });
        }
    });

};