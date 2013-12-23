/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus({
        development: true
    })
    .include("Sprites, Anim, Scenes, 2D, Touch, UI , Input")
    .include("frontEndSprites,bossSprites,cdSprites,ioSprites");

    Q.setup({width:800,height:400}).touch(Q.SPRITE_ALL);

    //background.
    Q.Sprite.extend("Background", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2,
                y: Q.height/2,
                h: 200,
                scale: 0.7,
                asset:'bg/bg.jpg',
                type: Q.SPRITE_NONE
            });
        }
    });


    var Keys = [];
    var answer = [];
    var cursor = 0;
    function generateKeys(stage){

        cursor = 0;
        answer = [];

        for(var i = 0,len = Keys.length; i < len;i++){
            Keys[i].destroy();
        }

        var pad = stage.insert(new Q.UI.Container({
            fill:"transparent",
            border: 1,
            color: "red",
            x: Q.width/2,
            y: Q.height - 80,
            w: 200,
            h: 40
        }));

        Keys.push(pad);


        Keys.push(stage.insert(new Q.A({x: -pad.p.w * 2/4, y: 0, scale:0.3}),pad));
        answer.push(1);
        Keys.push(stage.insert(new Q.B({x: -pad.p.w * 1/4, y: 0, scale:0.3}),pad));
        answer.push(2);
        Keys.push(stage.insert(new Q.C({x: 0, y: 0, scale:0.3}),pad));
        answer.push(3);
        Keys.push(stage.insert(new Q.D({x: pad.p.w * 1/4, y: 0, scale:0.3}),pad));
        answer.push(4);
        Keys.push(stage.insert(new Q.A({x: pad.p.w * 2/4, y: 0, scale:0.3}),pad));
        answer.push(1);
    };


    var HitType = {
        A:1,
        B:2,
        C:3,
        D:4
    };

    function check(type,stage){
        if(type == HitType.A && HitType.A == answer[cursor]){
            Keys[cursor].play('shake');
            cursor++;
        }


        if(type == HitType.B && HitType.B == answer[cursor]){
            Keys[cursor].p.anim = 'shake';
            cursor++;
        }

        if(type == HitType.C && HitType.C == answer[cursor]){
            Keys[cursor].p.anim = 'shake';
            cursor++;
        }

        if(type == HitType.D && HitType.D == answer[cursor]){
            Keys[cursor].p.anim = 'shake';
            cursor++;
        }

        if(cursor == answer.length){
            generateKeys(stage);
        }
    };

    Q.scene("mainRoot", function (stage) {
        var bg = new Q.Background();
        stage.insert(bg);

        var boss = new Q.Boss();
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
            border: 1,
            color: "red",
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
            "front/front_0.png","front/front.json",
            "boss/boss_0.png","boss/boss.json",
            "cd/cd.png","cd/cd.json",
            "io/io_hit.png",
            "io/io.png","io/io.json",
            "bg/bg.jpg"
        ],
        function () {

            Q.compileSheets("boss/boss_0.png", "boss/boss.json");

            Q.compileSheets("front/front_0.png", "front/front.json");

            Q.compileSheets("cd/cd.png", "cd/cd.json");

            Q.compileSheets("io/io.png", "io/io.json");

//            Q.compileSheets("io/io_hit.png", "io/io.json");

            Q.stageScene("mainRoot");

    });

});
