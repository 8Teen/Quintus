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

    var ww = window.innerWidth;
    var wh = window.innerHeight;

    Q.setup({width:800,height:400}).touch(Q.SPRITE_ALL);

    //background.
    Q.Sprite.extend("Background", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2,
                y: Q.height/2,
                height: 400,
                scale: 1,
                asset:'bg/bg.jpg'
            });
        }
    });


    Q.scene("animate_tc", function (stage) {

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

        var a = new Q.A({x: Q.width - 100, y: Q.height - 100});
        stage.insert(a);
        a.on('touch',function(){
            alert('a');
        });

//        var b = new Q.B({x: Q.width - 100, y: Q.height - 50});
//        stage.insert(b);
//
//        var c = new Q.C({x: Q.width - 50, y: Q.height - 100});
//        stage.insert(c);
//
//        var d = new Q.D({x: Q.width - 50, y: Q.height - 50});
//        stage.insert(d);

    });


    Q.load([
            "front/front_0.png","front/front.json",
            "boss/boss_0.png","boss/boss.json",
            "cd/cd.png","cd/cd.json",
            "io/io.png","io/io.json",
            "bg/bg.jpg"
        ],
        function () {

            Q.compileSheets("boss/boss_0.png", "boss/boss.json");

            Q.compileSheets("front/front_0.png", "front/front.json");

            Q.compileSheets("cd/cd.png", "cd/cd.json");

            Q.compileSheets("io/io.png", "io/io.json");

            Q.stageScene("animate_tc");

    });

});
