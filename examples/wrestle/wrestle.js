/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus({
        development: true,
        scale:0.5
    })
    .include("Sprites, Anim, Scenes, 2D, Touch, UI , Input")
    .include("frontEndSprites,bossSprites,cdSprites,ioSprites")
    .include("Sheets");


    Q.setup({
        width:500,
        height:320,
        upsampleHeight: 640,
        upsampleWidth: 1000
    })
    .touch(Q.SPRITE_ALL);


    Q.setImageSmoothing = function(enabled) {
        Q.ctx.mozImageSmoothingEnabled && (Q.ctx.mozImageSmoothingEnabled = enabled);
        Q.ctx.webkitImageSmoothingEnabled && (Q.ctx.webkitImageSmoothingEnabled = enabled);
        Q.ctx.msImageSmoothingEnabled && (Q.ctx.msImageSmoothingEnabled = enabled);
        Q.ctx.imageSmoothingEnabled && (Q.ctx.imageSmoothingEnabled = enabled);
    };

    Q.setImageSmoothing(true);

    //background.
    Q.Sprite.extend("Background", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2,
                y: Q.height/2,
                h: 200,
                scale: 1,
                asset:'bg/bg.jpg',
                type: Q.SPRITE_NONE
            });
        }
    });


    var AArr = [];
    var answer = [];
    var pad;
    var cursor = 0;
    function generateKeys(stage){

        cursor = 0;
        answer = [];

        for(var i = 0,len = AArr.length; i < len;i++){
            AArr[i].destroy();
        }
        AArr = [];

        if(pad == void 0){
            pad = stage.insert(new Q.UI.Container({
                fill:"transparent",
                color: "red",
                x: Q.width/2,
                y: Q.height - 100,
                w: 200,
                h: 40
            }));
        }

        pad.show();

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }


        var rand;
        var keysNum = 5;
        var symNum = keysNum - 1;
        for(var i = 0; i < keysNum; i++){
            rand = getRandomInt(1,symNum);

            if(rand == HitType.A){
                AArr.push(stage.insert(new Q.A({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(1);
            }

            if(rand == HitType.B){
                AArr.push(stage.insert(new Q.B({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(2);
            }

            if(rand == HitType.C){
                AArr.push(stage.insert(new Q.C({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(3);
            }

            if(rand == HitType.D){
                AArr.push(stage.insert(new Q.D({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(4);
            }

            if(rand == HitType.UP){
                AArr.push(stage.insert(new Q.A({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(5);
            }

            if(rand == HitType.DOWN){
                AArr.push(stage.insert(new Q.B({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(6);
            }

            if(rand == HitType.LEFT){
                AArr.push(stage.insert(new Q.C({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(7);
            }

            if(rand == HitType.RIGHT){
                AArr.push(stage.insert(new Q.D({x: pad.p.w * (i-2)/symNum, y: 0, scale:0.3}),pad));
                answer.push(8);
            }

        }
    };


    var HitType = {
        A:1,
        B:2,
        C:3,
        D:4,
        UP:5,
        DOWN:6,
        LEFT:7,
        RIGHT:8
    };

    function check(type,stage){

        //一回合.
        if(Q.wrestle.roundRunning){
            return;
        }


        for(var i = 0,len = AArr.length; i < len; i++){
            AArr[i].p.sheet = 'io';
        };

        if(type == HitType.A && HitType.A == answer[cursor]){
            AArr[cursor].p.sheet = 'io_hit';
            cursor++;
        }
        else if(type == HitType.B && HitType.B == answer[cursor]){
            AArr[cursor].p.sheet = 'io_hit';
            cursor++;
        }
        else if(type == HitType.C && HitType.C == answer[cursor]){
            AArr[cursor].p.sheet = 'io_hit';
            cursor++;
        }
        else if(type == HitType.D && HitType.D == answer[cursor]){
            AArr[cursor].p.sheet = 'io_hit';
            cursor++;
        }
        else{
            Q.wrestle.roundRunning = true;
            Q.wrestle.boss.attack_fierce();
            pad.hide();
        }

        if(cursor >= answer.length){
            Q.wrestle.roundRunning = true;
            Q.wrestle.front.attack_fierce();
        }
    };

    Q.Evented.extend('Wrestle');
    Q.wrestle = new Q.Wrestle();

    Q.wrestle.boss = {};
    Q.wrestle.front = {};
    Q.wrestle.stage = {};
    Q.wrestle.cd = {};

    Q.wrestle.roundRunning = false;

    //回合结束.
    Q.wrestle.on('round.over',function(){
        Q.wrestle.roundRunning = false;
        generateKeys(Q.wrestle.stage);
    });

    Q.scene("mainRoot", function (stage) {
        //stage.viewport(600, 320);

        Q.wrestle.stage = stage;

        var bg = new Q.Background();
        stage.insert(bg);

        Q.wrestle.boss = new Q.Boss();
        stage.insert(Q.wrestle.boss);

        Q.wrestle.front = new Q.Front();
        stage.insert(Q.wrestle.front);

        Q.wrestle.cd = new Q.CD();
        stage.insert(Q.wrestle.cd);


        Q.wrestle.cd.play('show');
        Q.wrestle.boss.play('show');
        Q.wrestle.front.play('show');

        //右侧控制区.
        var rightPad = stage.insert(new Q.UI.Container({
            fill:"transparent",
            x: Q.width - 90,
            y: Q.height - 120,
            w: 100,
            h: 100
        }));

        var a = new Q.A({x: -rightPad.p.w/4, y: -rightPad.p.h/4});
        stage.insert(a,rightPad);
        a.on('A.CLICK',a,function(){
            check(HitType.A,stage);
        });

        var b = new Q.B({x: -rightPad.p.w/4, y: rightPad.p.h/4});
        stage.insert(b,rightPad);
        b.on('B.CLICK',b,function(){
            check(HitType.B,stage);
        });

        var c = new Q.C({x: rightPad.p.w /4, y: -rightPad.p.h/4});
        stage.insert(c,rightPad);
        c.on('C.CLICK',c,function(){
            check(HitType.C,stage);
        });

        var d = new Q.D({x: rightPad.p.w/4, y: rightPad.p.h/4});
        stage.insert(d,rightPad);
        d.on('D.CLICK',d,function(){
            check(HitType.D,stage);
        });


        //左侧控制区.
        var leftPad = stage.insert(new Q.UI.Container({
            fill:"transparent",
            x: 90,
            y: Q.height - 120,
            w: 100,
            h: 100
        }));

        var up = new Q.UP({x: -leftPad.p.w/4, y: -leftPad.p.h/4});
        stage.insert(up,leftPad);
        up.on('UP.CLICK',up,function(){
            check(HitType.UP,stage);
        });

        var down = new Q.DOWN({x: -leftPad.p.w/4, y: leftPad.p.h/4});
        stage.insert(down,leftPad);
        down.on('DOWN.CLICK',down,function(){
            check(HitType.DOWN,stage);
        });

        var left = new Q.LEFT({x: leftPad.p.w /4, y: -leftPad.p.h/4});
        stage.insert(left,leftPad);
        left.on('LEFT.CLICK',left,function(){
            check(HitType.LEFT,stage);
        });

        var right = new Q.RIGHT({x: leftPad.p.w/4, y: leftPad.p.h/4});
        stage.insert(right,leftPad);
        right.on('RIGHT.CLICK',right,function(){
            check(HitType.RIGHT,stage);
        });

        generateKeys(stage);
    });

});
