/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

(function () {

    var Q = window.Q = Quintus({
        development: true,
        audioSupported: [ 'mp3' ]
    })
    .include("Sprites, Anim, Scenes, 2D, Touch, UI , Input , Audio")
    .include("playerSprites,bossSprites,scaffoldSprites,cdSprites,ioSprites")
    .include("CONS")
    .include("Sheets");


    var AArr = [];
    var answer = [];
    var pad;
    var cursor = 0;

    var HitType;

    var role;
    var rank;

    function Init() {

        Q.setup({
//        width:500,
//        height:320,
            width: 1000,
            height: 640
//        upsampleHeight: 640,
//        upsampleWidth: 1000
        })
            .touch(Q.SPRITE_ALL)
            .enableSound();

        Q.debug = false;

        //canvas 绘图效率 http://jsperf.com/imagesmoothingenabled
        (function (enabled) {
            Q.ctx.webkitImageSmoothingEnabled && (Q.ctx.webkitImageSmoothingEnabled = enabled);
            Q.ctx.imageSmoothingEnabled && (Q.ctx.imageSmoothingEnabled = enabled);
        })(true);

        HitType = Q.wrestle.hitType;

        etCatch();
    }

    function etCatch() {
        //回合结束.
        Q.wrestle.on('round.over', function () {
            generateKeys(Q.wrestle.stage);
            Q.wrestle.roundRunning = false;
        });
    }

    function generateKeys() {
        var stage = Q.wrestle.stage;

        cursor = 0;
        answer = [];

        for(var i = 0,len = AArr.length; i < len;i++){
            AArr[i].destroy();
            delete AArr[i];
        }
        AArr = [];
        pad && pad.destroy();

        if(!stage.has(pad)){
            pad = stage.insert(new Q.UI.ImgContainer({
                x: Q.width/2,
                y: Q.height - 100,
                z: 1,
                w: 300,
                h: 40
            }));
        }

        Q.wrestle.rightBottom.show();
        Q.wrestle.leftBottom.show();

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        var rand;
        var keysNum = 3;
        var pairNum = Math.floor(keysNum/2);
        var symNum = 8;
        for(var i = 0; i < keysNum; i++){
            rand = getRandomInt(1,symNum);

            if(rand == HitType.A){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 4, type: rand}), pad));
                answer.push(1);
            }

            if(rand == HitType.B){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 5, type: rand}), pad));
                answer.push(2);
            }

            if(rand == HitType.C){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 6, type: rand}), pad));
                answer.push(3);
            }

            if(rand == HitType.D){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 7, type: rand}), pad));
                answer.push(4);
            }

            if(rand == HitType.UP){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 0, type: rand}), pad));
                answer.push(5);
            }

            if(rand == HitType.DOWN){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 1, type: rand}), pad));
                answer.push(6);
            }

            if(rand == HitType.LEFT){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 2, type: rand}), pad));
                answer.push(7);
            }

            if(rand == HitType.RIGHT){
                AArr.push(stage.insert(new Q.HIT({x: pad.p.w * (i - pairNum) / symNum, y: 0, frame: 3, type: rand}), pad));
                answer.push(8);
            }
        }

        carousel();
    };

    function carousel() {

        if (cursor >= answer.length) {
            Q.wrestle.roundRunning = true;
            Q.wrestle.player.attack();

            Q.wrestle.rightBottom.hide();
            Q.wrestle.leftBottom.hide();
            return;
        }

        if (void 0 === AArr[cursor]) return;
        AArr[cursor].enlarge(function () {

            //单帧动画内未点击
            if (Q.wrestle.Hit.realHit === Q.wrestle.hitType.Nil) {
                Q.wrestle.roundRunning = true;
                Q.wrestle.boss.attack(Q.wrestle.player.p.level);

                Q.wrestle.rightBottom.hide();
                Q.wrestle.leftBottom.hide();

                return;
            }

            if (!Q.wrestle.roundRunning) {
                Q.wrestle.Hit.realHit = Q.wrestle.hitType.Nil;
                cursor++;
                carousel();
            }
        });
    };

    function check(type) {

        //一回合.
        if(Q.wrestle.roundRunning){
            return;
        }

        var showHit = Q.wrestle.Hit.showHit;

        if (
            !((type == HitType.A && type == showHit)
                || (type == HitType.B && type == showHit)
                || (type == HitType.C && type == showHit)
                || (type == HitType.D && type == showHit)
                || (type == HitType.UP && type == showHit)
                || (type == HitType.DOWN && type == showHit)
                || (type == HitType.LEFT && type == showHit)
                || (type == HitType.RIGHT && type == showHit))
            ) {
            Q.wrestle.roundRunning = true;
            Q.wrestle.boss.attack(Q.wrestle.player.p.level);

            Q.wrestle.rightBottom.hide();
            Q.wrestle.leftBottom.hide();
        }

    };

    function leftBottom() {
        var stage = Q.wrestle.stage;
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
            sprite:'io/Shank.png'
        }));

        var up = new Q.UP({x: 0, y: -leftBottom.p.h / 3, frame: 0, type: HitType.UP});
        stage.insert(up,leftBottom);
        up.on('UP.TouchEnd',up,function(){
            check(HitType.UP,stage);
        });

        var down = new Q.DOWN({x: 0, y: leftBottom.p.h / 3, frame: 1, type: HitType.DOWN});
        stage.insert(down,leftBottom);
        down.on('DOWN.TouchEnd',down,function(){
            check(HitType.DOWN,stage);
        });

        var left = new Q.LEFT({x: -leftBottom.p.w / 3, y: 0, frame: 3, type: HitType.LEFT});
        stage.insert(left,leftBottom);
        left.on('LEFT.TouchEnd',left,function(){
            check(HitType.LEFT,stage);
        });

        var right = new Q.RIGHT({x: leftBottom.p.w / 3, y: 0, frame: 2, type: HitType.RIGHT});
        stage.insert(right,leftBottom);
        right.on('RIGHT.TouchEnd',right,function(){
            check(HitType.RIGHT,stage);
        });

    };

    function rightBottom() {
        var stage = Q.wrestle.stage;
        var rightBottom;

        //右侧控制区.
        rightBottom = Q.wrestle.rightBottom = stage.insert(new Q.UI.Container({
            radius: 40,
            x: Q.width - 200,
            y: Q.height - 200,
            z: 3,
            w: 280,
            h: 280
        }));

        var a = new Q.A({x: -rightBottom.p.w / 4, y: -rightBottom.p.h / 4, frame: 0, type: HitType.A});
        stage.insert(a,rightBottom);
        a.on('A.TouchEnd',rightBottom,function(){
            check(HitType.A,stage);
        });

        var b = new Q.B({x: rightBottom.p.w / 4, y: -rightBottom.p.h / 4, frame: 1, type: HitType.B});
        stage.insert(b,rightBottom);
        b.on('B.TouchEnd',rightBottom,function(){
            check(HitType.B,stage);
        });

        var c = new Q.C({x: -rightBottom.p.w / 4, y: rightBottom.p.h / 4, frame: 2, type: HitType.C});
        stage.insert(c,rightBottom);
        c.on('C.TouchEnd',rightBottom,function(){
            check(HitType.C,stage);
        });

        var d = new Q.D({x: rightBottom.p.w / 4, y: rightBottom.p.h / 4, frame: 3, type: HitType.D});
        stage.insert(d,rightBottom);
        d.on('D.TouchEnd',rightBottom,function(){
            check(HitType.D,stage);
        });
    };


    function leftTop() {
        var stage = Q.wrestle.stage;
        var leftTop = stage.insert(new Q.UI.ImgContainer({
            x: 230,
            y: 120,
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

        var playerAva;
        var playerNick;

        if(role === Q.wrestle.Career.Front){
            playerAva = new Q.Avator({
                asset:'scaffold/manong.png',
                scale:0.8,
                x: -180, y: -30
            });

            playerNick = new Q.UI.Text({
                label:'码农',
                size: 20,
                color: 'white',
                x: -90,
                y: -40
            });
        }

        if(role === Q.wrestle.Career.InterAct){
            playerAva = new Q.Avator({
                asset:'scaffold/jiaohu.png',
                x: -180, y: -30
            });

            playerNick = new Q.UI.Text({
                label:'焦糊',
                size: 20,
                color: 'white',
                x: -90,
                y: -40
            });
        }

        if(role === Q.wrestle.Career.Vision){
            playerAva = new Q.Avator({
                asset:'scaffold/simeigong.png',
                x: -180, y: -30
            });

            playerNick = new Q.UI.Text({
                label:'视觉',
                size: 20,
                color: 'white',
                x: -90,
                y: -40
            });
        }

        if(role === Q.wrestle.Career.User){
            playerAva = new Q.Avator({
                asset:'scaffold/yongyan.png',
                x: -180, y: -30
            });

            playerNick = new Q.UI.Text({
                label:'用研',
                size: 20,
                color: 'white',
                x: -90,
                y: -40
            });
        }

        stage.insert(playerAva,leftTop);
        stage.insert(playerNick,leftTop);
        stage.insert(Q.wrestle.p_blood,leftTop);
    };

    function rightTop() {
        var stage = Q.wrestle.stage;
        var rightTop = stage.insert(new Q.UI.ImgContainer({
            x: Q.width - 230,
            y: 120,
            z: 1,
            frame: 1,
            sprite:'scaffold/logo.png',
            sheet:'logo',
            scale: 0.8
        }));

        Q.wrestle.b_blood = new Q.Blood({
            x: -45,
            y: -14,
            angle: 180,
            frame: 0,
            sprite: 'scaffold/blood_r.png',
            sheet:'blood_r'
        });

        var bossAva = new Q.Avator({
            asset:'scaffold/boss.png',
            scale: 0.9,
            x: 210, y: -20
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

    function countDown() {
        var stage = Q.wrestle.stage;

        Q.wrestle.cd = new Q.CD();
        stage.insert(Q.wrestle.cd);
        Q.wrestle.cd.action(function () {
            generateKeys();
        });

        var topMiddle = stage.insert(new Q.UI.ImgContainer({
            x: Q.width/2,
            y: 50,
            w: 282,
            z: 1,
            asset:"scaffold/ct.png",
            scale: 1
        }));
        stage.insert(topMiddle);

        var decade = new Q.CD({x: -30, y: 40, frame: 9, scale: 0.8});
        var unit = new Q.CD({x: 30, y: 40, frame: 9, scale: 0.8});

        stage.insert(decade,topMiddle);
        stage.insert(unit,topMiddle);

        (function (){
            var span = 99;
            var tTicker = setInterval(function(){
                span--;

                var s = Math.floor(span/10);
                var f = span%10;

                decade.p.frame = s;
                unit.p.frame = f;

                if(s == 0 && f ==0){
                    clearInterval(tTicker);
                    decade.destroy();
                    unit.destroy();
                }
            },1000);
        })();

    };

    function reset(){
        Q.wrestle.roundRunning = false;
        Q.wrestle.boss.reset && Q.wrestle.boss.reset();
        Q.wrestle.player.reset && Q.wrestle.player.reset();
    };

    Q.scene("mainRoot", function (stage) {

        reset();

        //Q.audio.play('bg.mp3', {loop: true, volume: 0.5});

        Q.wrestle.stage = stage;

        var bg = new Q.Background();
        stage.insert(bg);

        leftTop(stage);

        rightTop(stage);

        rightBottom(stage);

        leftBottom(stage);

        countDown(stage);


        Q.wrestle.boss = new Q.Boss();

        if(role === Q.wrestle.Career.Front){
            Q.wrestle.player = new Q.Player({
                career: Q.wrestle.Career.Front,
                name:'前端',
                avatar:'scaffold/manong.png',
                sprite:'front_show',
                sheet:'front_show',
                level: rank
            });
        }

        if(role === Q.wrestle.Career.InterAct){
            Q.wrestle.player = new Q.Player({
                career: Q.wrestle.Career.InterAct,
                name:'焦糊',
                avatar:'scaffold/jiaohu.png',
                sprite:'interact_show',
                sheet:'interact_show',
                level: rank
            });
        }

        if(role === Q.wrestle.Career.Vision){
            Q.wrestle.player = new Q.Player({
                career: Q.wrestle.Career.Vision,
                name:'视觉',
                avatar:'scaffold/simeigong.png',
                sprite:'vision_show',
                sheet:'vision_show',
                level: rank
            });
        }

        if(role === Q.wrestle.Career.User){
            Q.wrestle.player = new Q.Player({
                career: Q.wrestle.Career.User,
                name:'用研',
                avatar:'scaffold/yongyan.png',
                sprite:'user_show',
                sheet:'user_show',
                level: rank
            });
        }

        stage.insert(Q.wrestle.boss);
        stage.insert(Q.wrestle.player);

    }, {
        sort: true
    });

    Q.scene("loading", function (stage) {
        stage.insert(new Q.UI.Text({
            label: "Loading...",
            x: Q.width / 2,
            y: Q.height / 2
        }));
    });

    Q.scene("chooseRole",function(stage){

        var bg = new Q.Background();
        stage.insert(bg);

        var ct = stage.insert(new Q.UI.Container({
            x: Q.width/2,
            y: Q.height/2,
            fill: '#FFF',
            opacity: 0.3,
            radius: 80,
            z: 1,
            w: 500,
            h: 500
        }));

        var manong = new Q.Avator({
            asset:'scaffold/manong.png',
            scale:1,
            x: -ct.p.w/4, y: ct.p.h/4
        });
        manong.on('touch',function(){
            role = Q.wrestle.Career.Front;
            Q.stageScene("mainRoot");
        });


        var jiaohu = new Q.Avator({
            asset:'scaffold/jiaohu.png',
            scale:1,
            x: ct.p.w/4, y: ct.p.h/4
        });
        jiaohu.on('touch',function(){
            role = Q.wrestle.Career.InterAct;
            Q.stageScene("mainRoot");
        });

        var simeigong = new Q.Avator({
            asset:'scaffold/simeigong.png',
            scale:1,
            x: -ct.p.w/4, y: -ct.p.h/4
        });
        simeigong.on('touch',function(){
            role = Q.wrestle.Career.Vision;
            Q.stageScene("mainRoot");
        });

        var yongyan = new Q.Avator({
            asset:'scaffold/yongyan.png',
            scale:1,
            x: ct.p.w/4, y: -ct.p.h/4
        });
        yongyan.on('touch',function(){
            role = Q.wrestle.Career.User;
            Q.stageScene("mainRoot");
        });

        stage.insert(manong,ct);
        stage.insert(jiaohu,ct);
        stage.insert(simeigong,ct);
        stage.insert(yongyan,ct);
    });

    function loadAssets() {
        Q.load([
            "front/front_show.png",
            "front/front_move.png",
            "front/front_suffer_weak.png",
            "front/front_suffer_medium.png",
            "front/front_attack_weak.png",
            "front/front_attack_medium.png",
            "front/front_attack_fierce.png",
            "front/front_stand.png",
            "front/front_lose.png",
            "front/front_win.png",

            "interact/interact_show.png",
            "interact/interact_move.png",
            "interact/interact_attack_weak.png",
            "interact/interact_attack_medium.png",
            "interact/interact_attack_fierce.png",
            "interact/interact_suffer_weak.png",
            "interact/interact_suffer_medium.png",
            "interact/interact_win.png",
            "interact/interact_lose.png",

            "vision/vision_show.png",
            "vision/vision_stand.png",
            "vision/vision_move.png",
            "vision/vision_attack_weak.png",
            "vision/vision_attack_medium.png",
            "vision/vision_attack_fierce.png",
            "vision/vision_suffer_weak.png",
            "vision/vision_suffer_medium.png",
            "vision/vision_win.png",
            "vision/vision_lose.png",

            "user/user_show.png",
            "user/user_move.png",
            "user/user_attack_weak.png",
            "user/user_attack_medium.png",
            "user/user_attack_fierce.png",
            "user/user_suffer_weak.png",
            "user/user_suffer_medium.png",
            "user/user_win.png",
            "user/user_lose.png",

            "boss/boss_hi.png",
            "boss/boss_move.png",
            "boss/boss_attack_weak.png",
            "boss/boss_attack_medium.png",
            "boss/boss_attack_fierce.png",
            "boss/boss_suffer_weak.png",
            "boss/boss_defend.png",
            "boss/boss_win.png",
            "boss/boss_lose.png",

            "bg.mp3",
            "female_show.mp3",
            "female_attack_weak.mp3",
            "female_attack_medium.mp3",
            "female_attack_fierce.mp3",
            "female_suffer_weak.mp3",
            "female_suffer_medium.mp3",

            "male_show.mp3",
            "male_attack_weak.mp3",
            "male_attack_medium.mp3",
            "male_attack_fierce.mp3",
            "male_suffer_weak.mp3",
            "male_suffer_medium.mp3",
            "male_win.mp3",
            "male_lose.mp3",

            "cd/cd.png",

            "io/Shank.png",
            "io/io_hit.png",
            "io/io.png",
            "io/direct.png",
            "io/abcd.png",

            "bg/bg.jpg",

            "scaffold/blood_l.png",
            "scaffold/logo.png",
            "scaffold/blood_l.png",
            "scaffold/blood_r.png",
            "scaffold/ct.png",

            "scaffold/win.png",
            "scaffold/lose.png",
            "scaffold/timeover.png",

            "scaffold/boss.png",
            "scaffold/jiaohu.png",
            "scaffold/simeigong.png",
            "scaffold/manong.png",
            "scaffold/yongyan.png"
        ],
            function () {

                //倒計時.
                Q.sheet("cd", "cd/cd.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 10,
                        "tilew": 112,
                        "tileh": 112
                    });

                //IO
                Q.sheet("io", "io/io.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 8,
                        "tilew": 56,
                        "tileh": 56
                    });

                Q.sheet("io_hit", "io/io_hit.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 8,
                        "tilew": 56,
                        "tileh": 56
                    });

                Q.sheet("abcd", "io/abcd.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 4,
                        "tilew": 119,
                        "tileh": 119
                    });

                Q.sheet("Shank", "io/Shank.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 1,
                        "swidth": 131,
                        "sheight": 130,
                        "tilew": 280,
                        "tileh": 280
                    });

                Q.sheet("direct", "io/direct.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 8,
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

                Q.sheet("boss_attack_medium", "boss/boss_attack_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 5525,
                        "h": 266,
                        "cols": 13,
                        "tilew": 425,
                        "tileh": 266
                    });


                Q.sheet("boss_suffer_weak", "boss/boss_suffer_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 3509,
                        "h": 312,
                        "cols": 11,
                        "tilew": 319,
                        "tileh": 312
                    });

                Q.sheet("boss_attack_fierce", "boss/boss_attack_fierce.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 6132,
                        "h": 495,
                        "cols": 14,
                        "tilew": 438,
                        "tileh": 495
                    });

                Q.sheet("boss_defend", "boss/boss_defend.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 5,
                        "tilew": 205,
                        "tileh": 172
                    });

                Q.sheet("boss_win", "boss/boss_win.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 1458,
                        "h": 290,
                        "cols": 14,
                        "tilew": 162,
                        "tileh": 290
                    });

                Q.sheet("boss_lose", "boss/boss_lose.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 1950,
                        "h": 264,
                        "cols": 10,
                        "tilew": 195,
                        "tileh": 264
                    });

                //前端.
                Q.sheet("front_show", "front/front_show.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "tilew": 359,
                        "tileh": 460
                    });

                Q.sheet("front_move", "front/front_move.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 3080,
                        "h": 297,
                        "cols": 8,
                        "tilew": 280,
                        "tileh": 297
                    });

                Q.sheet("front_stand", "front/front_stand.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "tilew": 225,
                        "tileh": 291
                    });

                Q.sheet("front_suffer_weak", "front/front_suffer_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 2580,
                        "h": 287,
                        "cols": 10,
                        "tilew": 258,
                        "tileh": 287
                    });

                Q.sheet("front_suffer_medium", "front/front_suffer_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "tilew": 410,
                        "tileh": 364
                    });

                Q.sheet("front_attack_weak", "front/front_attack_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 3852,
                        "h": 305,
                        "cols": 12,
                        "tilew": 321,
                        "tileh": 305
                    });

                Q.sheet("front_attack_medium", "front/front_attack_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 7176,
                        "h": 292,
                        "cols": 13,
                        "tilew": 552,
                        "tileh": 292
                    });

                Q.sheet("front_attack_fierce", "front/front_attack_fierce.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "w": 5960,
                        "h": 365,
                        "cols": 10,
                        "tilew": 596,
                        "tileh": 365
                    });

                Q.sheet("front_lose", "front/front_lose.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "tilew": 291,
                        "tileh": 296
                    });

                Q.sheet("front_win", "front/front_win.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "tilew": 451,
                        "tileh": 354
                    });


                //交互.
                Q.sheet("interact_show", "interact/interact_show.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 9,
                        "tilew": 292,
                        "tileh": 269
                    });

                Q.sheet("interact_move", "interact/interact_move.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 12,
                        "tilew": 285,
                        "tileh": 216
                    });

                Q.sheet("interact_attack_weak", "interact/interact_attack_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 12,
                        "tilew": 332,
                        "tileh": 264
                    });

                Q.sheet("interact_attack_medium", "interact/interact_attack_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 12,
                        "tilew": 428,
                        "tileh": 299
                    });

                Q.sheet("interact_attack_fierce", "interact/interact_attack_fierce.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 12,
                        "tilew": 710,
                        "tileh": 581
                    });

                Q.sheet("interact_suffer_weak", "interact/interact_suffer_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 10,
                        "tilew": 283,
                        "tileh": 292
                    });

                Q.sheet("interact_suffer_medium", "interact/interact_suffer_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 10,
                        "tilew": 281,
                        "tileh": 269
                    });

                Q.sheet("interact_win", "interact/interact_win.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 9,
                        "tilew": 482,
                        "tileh": 368
                    });

                Q.sheet("interact_lose", "interact/interact_lose.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 7,
                        "tilew": 295,
                        "tileh": 271
                    });

                //视觉.
                Q.sheet("vision_show", "vision/vision_show.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 14,
                        "tilew": 175,
                        "tileh": 285
                    });

                Q.sheet("vision_stand", "vision/vision_stand.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 15,
                        "tilew": 134,
                        "tileh": 286
                    });

                Q.sheet("vision_move", "vision/vision_move.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 10,
                        "tilew": 214,
                        "tileh": 286
                    });

                Q.sheet("vision_attack_weak", "vision/vision_attack_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 9,
                        "tilew": 276,
                        "tileh": 281
                    });

                Q.sheet("vision_attack_medium", "vision/vision_attack_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 7,
                        "tilew": 453,
                        "tileh": 313
                    });

                Q.sheet("vision_attack_fierce", "vision/vision_attack_fierce.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 5,
                        "tilew": 717,
                        "tileh": 369
                    });

                Q.sheet("vision_suffer_weak", "vision/vision_suffer_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 9,
                        "tilew": 155,
                        "tileh": 285
                    });

                Q.sheet("vision_suffer_medium", "vision/vision_suffer_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 9,
                        "tilew": 291,
                        "tileh": 307
                    });


                Q.sheet("vision_win", "vision/vision_win.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 9,
                        "tilew": 280,
                        "tileh": 286
                    });

                Q.sheet("vision_lose", "vision/vision_lose.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 8,
                        "tilew": 186,
                        "tileh": 284
                    });


                Q.sheet("user_show", "user/user_show.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 12,
                        "tilew": 174,
                        "tileh": 255
                    });

                Q.sheet("user_move", "user/user_move.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 8,
                        "tilew": 242,
                        "tileh": 231
                    });

                Q.sheet("user_attack_weak", "user/user_attack_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 6,
                        "tilew": 219,
                        "tileh": 256
                    });

                Q.sheet("user_attack_medium", "user/user_attack_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 10,
                        "tilew": 348,
                        "tileh": 436
                    });

                Q.sheet("user_attack_fierce", "user/user_attack_fierce.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 4,
                        "tilew": 948,
                        "tileh": 365
                    });

                Q.sheet("user_suffer_weak", "user/user_suffer_weak.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 10,
                        "tilew": 155,
                        "tileh": 235
                    });

                Q.sheet("user_suffer_medium", "user/user_suffer_medium.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 10,
                        "tilew": 250,
                        "tileh": 245
                    });

                Q.sheet("user_win", "user/user_win.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 8,
                        "tilew": 232,
                        "tileh": 382
                    });

                Q.sheet("user_lose", "user/user_lose.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 7,
                        "tilew": 154,
                        "tileh": 263
                    });


                Q.sheet("logo", "scaffold/logo.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 2,
                        "tilew": 519,
                        "tileh": 128
                    });

                Q.sheet("blood_l", "scaffold/blood_l.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 1,
                        "tilew": 385,
                        "tileh": 15
                    });

                Q.sheet("blood_r", "scaffold/blood_r.png",
                    {
                        "sx": 0,
                        "sy": 0,
                        "cols": 1,
                        "tilew": 385,
                        "tileh": 15
                    });

//                Q.stageScene("chooseRole");
                Q.stageScene("mainRoot");

            });
    };

    Q.Boot = function (userInfo, callback) {
        role = (userInfo && userInfo.Career) || Q.wrestle.Career.Front;
        rank = (userInfo && userInfo.Level) || Q.wrestle.pLevel.bad;

        Init();
        Q.enableSound();
        loadAssets();

        Q.wrestle.gameOverCb = callback;
    }
})();
