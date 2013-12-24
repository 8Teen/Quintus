/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.ioSprites = function (Q) {

    var Eve = 'touchEnd';

    //Vision.
    Q.Sprite.extend("A", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 0,
                scale: 0.4
            });

            this.on(Eve,this,'click');

        },
        click: function(e){
            this.trigger('A.CLICK');
        }
    });


    Q.Sprite.extend("B", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 1,
                scale: 0.4
            });

            this.on(Eve,this,'click');
        },
        click: function(e){
            this.trigger('B.CLICK');
        }
    });

    Q.Sprite.extend("C", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 2,
                scale: 0.4
            });

            this.on(Eve,this,'click');
        },
        click: function(e){
            this.trigger('C.CLICK');
        }
    });

    Q.Sprite.extend("D", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 3,
                scale: 0.4
            });

            this.on(Eve,this,'click');
        },
        click: function(e){
            this.trigger('D.CLICK');
        }
    });

    Q.animation("shake",{
        frames: [0,1,2,3,4,0], rate: 1/3
    });

};