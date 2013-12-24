/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus({
        development: true
    })
    .include("Sprites, Anim, Scenes, 2D, Touch, UI , Input")
    .include("frontEndSprites,bossSprites,cdSprites,ioSprites")
    .include("Sheets");

    Q.setup({width:1200,height:504}).touch(Q.SPRITE_ALL);

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
                y: Q.height - 40,
                w: 200,
                h: 40
            }));
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }


        var rand;
        for(var i = 0; i < 5; i++){
            rand = getRandomInt(1,4);

            if(rand == HitType.A){
                AArr.push(stage.insert(new Q.A({x: pad.p.w * (i-2)/4, y: 0, scale:0.3}),pad));
                answer.push(1);
            }

            if(rand == HitType.B){
                AArr.push(stage.insert(new Q.B({x: pad.p.w * (i-2)/4, y: 0, scale:0.3}),pad));
                answer.push(2);
            }

            if(rand == HitType.C){
                AArr.push(stage.insert(new Q.C({x: pad.p.w * (i-2)/4, y: 0, scale:0.3}),pad));
                answer.push(3);
            }

            if(rand == HitType.D){
                AArr.push(stage.insert(new Q.D({x: pad.p.w * (i-2)/4, y: 0, scale:0.3}),pad));
                answer.push(4);
            }

        }
    };


    var HitType = {
        A:1,
        B:2,
        C:3,
        D:4
    };

    function check(type,stage){

//        if(cursor >= answer.length){
//            generateKeys(stage);
//        }

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
//            for(var i = 0,len = AArr.length; i < len; i++){
//                AArr[i].p.sheet = 'io';
//            };

            boss.move();
            //generateKeys(stage);
        }
    };

    var boss;
    Q.scene("mainRoot", function (stage) {
        var bg = new Q.Background();
        stage.insert(bg);

        boss = new Q.Boss();
        stage.insert(boss);

        var front = new Q.Front();
        stage.insert(front);

        var cd = new Q.CD();
        stage.insert(cd);


        cd.play('show');
        boss.play('show');
        front.play('show');

        var rightPad = stage.insert(new Q.UI.Container({
            fill:"transparent",
            x: Q.width - 90,
            y: Q.height - 80,
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


        generateKeys(stage);
    });




    Q.load([
        "front/front_hi.png",
        "boss/boss_hi.png",
        "boss/boss_move.png",
        "boss/boss_attack_weak.png",
        "cd/cd.png",
        "io/io_hit.png",
        "io/io.png",
        "bg/bg.jpg"
    ],
        function () {

            //倒計時.
            Q.sheet("cd", "cd/cd.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 1025,
                    "h": 198,
                    "cols": 5,
                    "tilew": 205,
                    "tileh": 198
                });

            //IO
            Q.sheet("io", "io/io.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 476,
                    "h": 119,
                    "cols": 4,
                    "tilew": 119,
                    "tileh": 119
                });

            Q.sheet("io_hit", "io/io_hit.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 476,
                    "h": 119,
                    "cols": 4,
                    "tilew": 119,
                    "tileh": 119
                });


            //boss
            Q.sheet("boss_hi", "boss/boss_hi.png",
                {
                    sx: 0,
                    sy: 0,
                    w: 3666,
                    h: 265,
                    tilew: 141,
                    tileh: 265
                });

            Q.sheet("boss_move", "boss/boss_move.png",
                {
                    sx: 0,
                    sy: 0,
                    cols: 7,
                    tilew: 191,
                    tileh: 274
                });

            Q.sheet("boss_attack_weak", "boss/boss_attack_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 3912,
                    "h": 325,
                    "cols": 12,
                    "tilew": 326,
                    "tileh": 325
                });


            //前端.
            Q.sheet("front_hi", "front/front_hi.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 7600,
                    "h": 259,
                    "cols": 38,
                    "tilew": 200,
                    "tileh": 259
                });

            Q.stageScene("mainRoot");

        });


});
