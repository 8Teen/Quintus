/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.ioSprites = function (Q) {

    var TouchEnd = 'touchEnd';
    var Touch = 'touch';
    var ScaleX = 1;
    var ScaleXX = 0.7;
    var ScaleHit = 0.5;
    var W = 119;
    var H = 119;

    Q.Sprite.extend("Letter",{
        init: function(p){
            this._super(p,{
                sheet: 'abcd',
                w: W,
                h: H,
                z: 2,
                frame: 0,
                scale: ScaleX
            });

            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.showPrint();
        },
        showPrint: function(){
            var _self = this;

            Q.wrestle.Cicle = new Q.Circle({
                opacity: 0.2,
                x: _self.p.x,
                y: _self.p.y,
                z: 3,
                size: 70,
                w: 70,
                h: 70,
                fill: '#FF000'
            });
            Q.wrestle.stage.insert(Q.wrestle.Cicle,Q.wrestle.rightBottom);
            Q.wrestle.Cicle.enlarge();
        }
    });

    Q.Letter.extend("A", {
        init: function (p) {
            this._super(p, {});

            this.on(TouchEnd,this,'TouchEnd');

        },
        TouchEnd: function(e){
            this.trigger('A.TouchEnd');
        }
    });

    Q.Letter.extend("B", {
        init: function (p) {
            this._super(p, {});

            this.on(TouchEnd,this,'TouchEnd');
        },
        TouchEnd: function(e){
            this.trigger('B.TouchEnd');
        }
    });

    Q.Letter.extend("C", {
        init: function (p) {
            this._super(p, {});

            this.on(TouchEnd,this,'TouchEnd');
        },
        TouchEnd: function(e){
            this.trigger('C.TouchEnd');
        }
    });

    Q.Letter.extend("D", {
        init: function (p) {
            this._super(p, {});

            this.on(TouchEnd,this,'TouchEnd');
        },
        TouchEnd: function(){
            this.trigger('D.TouchEnd');
        }
    });


    Q.Sprite.extend("Direct",{
        init: function(p){
            this._super(p, {
                sheet: 'direct',
                frame: 0,
                w: W,
                h: H,
                scale: ScaleXX
            });

            this.add("animation");
            this.add("tween");
        },
        showPrint: function(){
            var _self = this;

            Q.wrestle.Cicle = new Q.Circle({
                opacity: 0.3,
                x: _self.p.x,
                y: _self.p.y,
                z: 3,
                size: 50,
                w: 50,
                h: 50,
                fill: '#FF000'
            });
            Q.wrestle.stage.insert(Q.wrestle.Cicle,Q.wrestle.leftBottom);
            Q.wrestle.Cicle.enlarge();
        }
    });

    Q.Direct.extend("UP", {
        init: function (p) {
            this._super(p, {
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.p.frame = 4;
            this.showPrint();
        },
        TouchEnd: function(){
            this.p.frame = 0;
            this.trigger('UP.TouchEnd');
        }
    });

    Q.Direct.extend("DOWN", {
        init: function (p) {
            this._super(p, {
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.p.frame = 5;
            this.showPrint();
        },
        TouchEnd: function(){
            this.p.frame = 1;
            this.trigger('DOWN.TouchEnd');
        }
    });


    
    Q.Direct.extend("LEFT", {
        init: function (p) {
            this._super(p, {
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.p.frame = 7;
            this.showPrint();
        },
        TouchEnd: function(){
            this.p.frame = 3;
            this.trigger('LEFT.TouchEnd');
        }
    });

    Q.Direct.extend("RIGHT", {
        init: function (p) {
            this._super(p, {
            });

            this.on(TouchEnd,this,'TouchEnd');
            this.on(Touch,this,'Touch');
        },
        Touch: function(){
            this.p.frame = 6;
            this.showPrint();
        },
        TouchEnd: function(){
            this.p.frame = 2;
            this.trigger('RIGHT.TouchEnd');
        }
    });

    Q.Sprite.extend("HIT", {
        init: function (p) {
            this._super(p, {
                sheet: 'io',
                w: 56,
                h: 56,
                frame: 1,
                scale: ScaleHit
            });
        }
    });

};