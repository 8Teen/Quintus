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
        click: function(){
            this.trigger('D.CLICK');
        }
    });

    Q.Sprite.extend("UP", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 0,
                scale: 0.4
            });

            this.on(Eve,this,'click');
        },
        click: function(){
            this.trigger('UP.CLICK');
        }
    });

    Q.Sprite.extend("DOWN", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 1,
                scale: 0.4
            });

            this.on(Eve,this,'click');
        },
        click: function(){
            this.trigger('DOWN.CLICK');
        }
    });

    Q.Sprite.extend("LEFT", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 2,
                scale: 0.4
            });

            this.on(Eve,this,'click');
        },
        click: function(){
            this.trigger('LEFT.CLICK');
        }
    });

    Q.Sprite.extend("RIGHT", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                frame: 3,
                scale: 0.4
            });

            this.on(Eve,this,'click');
        },
        click: function(){
            this.trigger('RIGHT.CLICK');
        }
    });

};