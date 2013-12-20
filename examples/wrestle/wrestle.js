/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load', function () {
    // Set up a Quintus Instance
    var Q = window.Q = Quintus({
        imagePath: "http://gtms01.alicdn.com/tps/i1/"
    }).include("Sprites, Anim, Scenes, 2D, Touch, UI , Input");

    Q.setup({ maximize:true }).touch(Q.SPRITE_ALL);

    //background.
    Q.Sprite.extend("Background", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2,
                y: Q.height/2,
                w: Q.width,
                h: Q.height,
                repeatX: true,
                repeatY: true,
                asset:'floor.png',
                scale: 1,
                type: Q.SPRITE_ALL
            });
        }
    });

    //Vision.
    Q.Sprite.extend("Vision", {
        init: function (p) {
            this._super(p, {
                sprite: "vision_0",
                sheet: 'vision_0',
                scale: 1
            });

            this.add("animation");
        }
    });

    //sir.
    Q.Sprite.extend("Boss", {
        init: function (p) {
            this._super(p, {
                sprite: "boss_0",
                sheet: 'boss_0',
                scale: 1
            });

            this.add("animation");
        }
    });


    Q.scene("animate_tc", function (stage) {

        try{
            var vision = new Q.Vision({ x: 30, y: 180 });
            stage.insert(vision);

            vision.play('show');


            var boss = new Q.Boss({ x: 500, y: 300 });
            stage.insert(boss);

            boss.play('show');
        }
        catch (e){
            alert(e.toString());
        }
    });


    Q.animations('vision_0', {
        show: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38], rate: 1/3}
    });


    Q.animations('boss_0', {
        show: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], rate: 1/3}
    });


    Q.load([
        'T1lFQXFoXeXXbA6tP6-18088-616.png',
        'T1b9UgFoVeXXbiGiA9-3666-265.png',
        'boss.json',
        'vision.json'
    ], function () {


        try{
            Q.compileSheets("T1b9UgFoVeXXbiGiA9-3666-265.png", "boss.json");

            Q.compileSheets("T1lFQXFoXeXXbA6tP6-18088-616.png", "vision.json");

            Q.stageScene("animate_tc");
        }
        catch (e){
            alert(e.toString());
        }

    });

});
