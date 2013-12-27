/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.ioSprites = function (Q) {

    var TouchEnd = 'touchEnd';
    var Touch = 'touch';
    var ScaleX = 1;
    var ScaleXX = 0.7;
    var W = 119;
    var H = 119;

    //Vision.
    Q.Sprite.extend("A", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                w: W,
                h: H,
                z: 2,
                border: 4,
                frame: 0,
                scale: ScaleX
            });

            this.on(TouchEnd,this,'TouchEnd');

        },
        TouchEnd: function(e){
            this.trigger('A.TouchEnd');
        }
    });

    Q.Sprite.extend("B", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                w: W,
                h: H,
                frame: 1,
                scale: ScaleX
            });

            this.on(TouchEnd,this,'TouchEnd');
        },
        TouchEnd: function(e){
            this.trigger('B.TouchEnd');
        }
    });

    Q.Sprite.extend("C", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                w: W,
                h: H,
                frame: 2,
                scale: ScaleX
            });

            this.on(TouchEnd,this,'TouchEnd');
        },
        TouchEnd: function(e){
            this.trigger('C.TouchEnd');
        }
    });

    Q.Sprite.extend("D", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                w: W,
                h: H,
                frame: 3,
                scale: ScaleX
            });

            this.on(TouchEnd,this,'TouchEnd');
        },
        TouchEnd: function(){
            this.trigger('D.TouchEnd');
        }
    });

    Q.Sprite.extend("UP", {
        init: function (p) {
            this._super(p, {
                sheet: 'direct',
                w: W,
                h: H,
                frame: 0,
                scale: ScaleXX
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.trigger('UP.Touch');
        },
        TouchEnd: function(){
            this.trigger('UP.TouchEnd');
        }
    });

    Q.Sprite.extend("DOWN", {
        init: function (p) {
            this._super(p, {
                sheet: 'direct',
                w: W,
                h: H,
                frame: 1,
                scale: ScaleXX
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.trigger('DOWN.Touch');
        },
        TouchEnd: function(){
            this.trigger('DOWN.TouchEnd');
        }
    });

    
    
    
    Q.Sprite.extend("LEFT", {
        init: function (p) {
            this._super(p, {
                sheet: 'direct',
                w: W,
                h: H,
                frame: 3,
                scale: ScaleXX
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.trigger('LEFT.Touch');
        },
        TouchEnd: function(){
            this.trigger('LEFT.TouchEnd');
        }
    });

    Q.Sprite.extend("RIGHT", {
        init: function (p) {
            this._super(p, {
                sheet: 'direct',
                w: W,
                h: H,
                frame: 2,
                scale: ScaleXX
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.trigger('RIGHT.Touch');
        },
        TouchEnd: function(){
            this.trigger('RIGHT.TouchEnd');
        }
    });

};