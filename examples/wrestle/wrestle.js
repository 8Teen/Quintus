/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus({
        development: true,
        audioSupported: [ 'mp3' ]
    })
    .include("Sprites, Anim, Scenes, 2D, Touch, UI , Input , Audio")
    .include("playerSprites,bossSprites,scaffoldSprites,cdSprites,ioSprites")
    .include("CONS")
    .include("Sheets");

    //var h = window.innerHeight;

    Q.setup({
        width:500,
        height:320,
//        width:1000,
//        height:640
        upsampleHeight: 640,
        upsampleWidth: 1000
    })
    .touch(Q.SPRITE_ALL)
    .enableSound();

    Q.debug = false;
//    Q.debugFill = true;

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
            pad = stage.insert(new Q.UI.ImgContainer({
                x: Q.width/2,
                y: Q.height - 100,
                z: 1,
                w: 200,
                h: 40
            }));
        }

        Q.wrestle.rightBottom.show();
        Q.wrestle.leftBottom.show();

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

        if(pad.p.hidden){
            pad.show();
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

    var isFirstInCheck = true;
    var oldTime;
    function check(type,stage){

        if(isFirstInCheck){
            oldTime = Date.now();
            isFirstInCheck = false;
        }
        else{
            if(Date.now() - oldTime > 8000){

                Q.wrestle.rightBottom.hide();
                Q.wrestle.leftBottom.hide();

                var timeover = new Q.Sprite({
                    x: Q.width/2,
                    y: Q.height/2,
                    z: 2,
                    asset:'scaffold/timeover.png'
                });

                Q.wrestle.stage.insert(timeover);

                return;
            }
        }

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
            isFirstInCheck = true;
            Q.wrestle.boss.attack(Q.wrestle.player.p.level);

            Q.wrestle.rightBottom.hide();
            Q.wrestle.leftBottom.hide();
        }

        if(cursor >= answer.length){
            Q.wrestle.roundRunning = true;
            isFirstInCheck = true;
            Q.wrestle.player.attack();

            Q.wrestle.rightBottom.hide();
            Q.wrestle.leftBottom.hide();
        }
    };

    //回合结束.
    Q.wrestle.on('round.over',function(){
        generateKeys(Q.wrestle.stage);
        Q.wrestle.roundRunning = false;
    });


    function leftBottom(stage){

        var leftBottom;
        //左侧控制区.
        leftBottom = Q.wrestle.leftBottom = stage.insert(new Q.UI.ImgContainer({
            //fill:"transparent",
            x: 200,
            y: Q.height - 200,
            z: 3,
            w: 280,
            h: 280,
            sheet:'Shank',
            sprite:'scaffold/Shank.png'
        }));

        var up = new Q.UP({x: 0,  y: -leftBottom.p.h/3});
        stage.insert(up,leftBottom);
        up.on('UP.Touch',up,function(){
            this.p.frame = 4;
        });
        up.on('UP.TouchEnd',up,function(){
            this.p.frame = 0;
            check(HitType.UP,stage);
        });

        var down = new Q.DOWN({x: 0, y: leftBottom.p.h/3});
        stage.insert(down,leftBottom);
        down.on('DOWN.Touch',down,function(){
            this.p.frame = 5;
        });
        down.on('DOWN.TouchEnd',down,function(){
            this.p.frame = 1;
            check(HitType.DOWN,stage);
        });

        var left = new Q.LEFT({x: -leftBottom.p.w /3, y: 0});
        stage.insert(left,leftBottom);
        left.on('LEFT.Touch',left,function(){
            this.p.frame = 7;
        });
        left.on('LEFT.TouchEnd',left,function(){
            this.p.frame = 3;
            check(HitType.LEFT,stage);
        });

        var right = new Q.RIGHT({x: leftBottom.p.w/3, y: 0});
        stage.insert(right,leftBottom);
        right.on('RIGHT.Touch',right,function(){
            this.p.frame = 6;
        });
        right.on('RIGHT.TouchEnd',right,function(){
            this.p.frame = 2;
            check(HitType.RIGHT,stage);
        });

    };

    function rightBottom(stage){
        var rightBottom;

        //右侧控制区.
        rightBottom = Q.wrestle.rightBottom = stage.insert(new Q.UI.Container({
            fill:"transparent",
            x: Q.width - 150,
            y: Q.height - 200,
            z: 3,
            w: 280,
            h: 280
        }));

        var a = new Q.A({x: -rightBottom.p.w/4, y: -rightBottom.p.h/4 ,z: 5});
        stage.insert(a,rightBottom);
        a.on('A.TouchEnd',rightBottom,function(){
            check(HitType.A,stage);
        });

        var b = new Q.B({x: -rightBottom.p.w/4, y: rightBottom.p.h/4,z: 5});
        stage.insert(b,rightBottom);
        b.on('B.TouchEnd',rightBottom,function(){
            check(HitType.B,stage);
        });

        var c = new Q.C({x: rightBottom.p.w /4, y: -rightBottom.p.h/4,z: 5});
        stage.insert(c,rightBottom);
        c.on('C.TouchEnd',rightBottom,function(){
            check(HitType.C,stage);
        });

        var d = new Q.D({x: rightBottom.p.w/4, y: rightBottom.p.h/4,z: 5});
        stage.insert(d,rightBottom);
        d.on('D.TouchEnd',rightBottom,function(){
            check(HitType.D,stage);
        });
    };

    function leftTop(stage){
        var leftTop = stage.insert(new Q.UI.ImgContainer({
            x: 250,
            y: 90,
            z: 1,
            frame: 0,
            sprite:'scaffold/logo.png',
            sheet:'logo',
            scale: 0.8
        }));

        Q.wrestle.p_blood = new Q.Blood({
            x: 45,
            y: -14,
            frame: 0,
            sprite: 'scaffold/blood_l.png',
            sheet:'blood_l'
        });

        var playerAva = new Q.Avator({
            asset:'scaffold/manong.png',
            x: -170, y: -30
        });

//        var playerAva = new Q.Avator({
//            asset:'scaffold/jiaohu.png',
//            x: -170, y: -30
//        });

//        var playerAva = new Q.Avator({
//            asset:'scaffold/simeigong.png',
//            x: -170, y: -30
//        });

//        var playerAva = new Q.Avator({
//            asset:'scaffold/yongyan.png',
//            x: -170, y: -30
//        });

        var playerNick = new Q.UI.Text({
            label:'码农',
            size: 20,
            color: 'white',
            x: -90,
            y: -40
        });

//        var playerNick = new Q.UI.Text({
//            label:'焦糊',
//            size: 20,
//            color: 'white',
//            x: -90,
//            y: -40
//        });

//        var playerNick = new Q.UI.Text({
//            label:'视觉',
//            size: 20,
//            color: 'white',
//            x: -90,
//            y: -40
//        });

//        var playerNick = new Q.UI.Text({
//            label:'用研',
//            size: 20,
//            color: 'white',
//            x: -90,
//            y: -40
//        });

        stage.insert(playerAva,leftTop);
        stage.insert(playerNick,leftTop);
        stage.insert(Q.wrestle.p_blood,leftTop);
    };

    function rightTop(stage){
        var rightTop = stage.insert(new Q.UI.ImgContainer({
            x: Q.width - 250,
            y: 90,
            z: 1,
            frame: 1,
            sprite:'scaffold/logo.png',
            sheet:'logo',
            scale: 0.8
        }));

        Q.wrestle.b_blood = new Q.Blood({
            x: -48,
            y: -22,
            angle: 180,
            frame: 0,
            sprite: 'scaffold/blood_r.png',
            sheet:'blood_r'
        });

        var bossAva = new Q.Avator({
            asset:'scaffold/boss.png',
            x: 200, y: -25
        });

        var bossNick = new Q.UI.Text({
            label:'无线抗总教官',
            size: 20,
            color: 'white',
            x: 70,
            y: -50
        });

        stage.insert(bossAva,rightTop);
        stage.insert(bossNick,rightTop);
        stage.insert(Q.wrestle.b_blood,rightTop);
    };

    Q.scene("mainRoot", function (stage) {
        //stage.viewport(600, 320);

        Q.audio.play('bg.mp3',{loop: true, volume: 0.5});

        Q.wrestle.stage = stage;

        var bg = new Q.Background();
        stage.insert(bg);


        leftTop(stage);

        rightTop(stage);

        rightBottom(stage);

        leftBottom(stage);


        Q.wrestle.boss = new Q.Boss();

        Q.wrestle.player = new Q.Player({
            career: Q.wrestle.Career.Front,
            name:'前端',
            avatar:'scaffold/manong.png',
            sprite:'front_show',
            sheet:'front_show',
            level: Q.wrestle.pLevel.excellent
        });

//        Q.wrestle.player = new Q.Player({
//            career: Q.wrestle.Career.InterAct,
//            name:'焦糊',
//            avatar:'scaffold/jiaohu.png',
//            sprite:'interact_show',
//            sheet:'interact_show',
//            level: Q.wrestle.pLevel.excellent
//        });

//        Q.wrestle.player = new Q.Player({
//            career: Q.wrestle.Career.Vision,
//            name:'视觉',
//            avatar:'scaffold/simeigong.png',
//            sprite:'vision_show',
//            sheet:'vision_show',
//            level: Q.wrestle.pLevel.excellent
//        });

//        Q.wrestle.player = new Q.Player({
//            career: Q.wrestle.Career.User,
//            name:'用研',
//            avatar:'scaffold/yongyan.png',
//            sprite:'user_show',
//            sheet:'user_show',
//            level: Q.wrestle.pLevel.excellent
//        });

        Q.wrestle.cd = new Q.CD();


        stage.insert(Q.wrestle.boss);
        stage.insert(Q.wrestle.player);
        stage.insert(Q.wrestle.cd);


        generateKeys(stage);

    }, {
        sort: true
    });

});
