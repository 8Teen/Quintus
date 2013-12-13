/**
 * Created by jiangcheng.wxd on 13-12-13.
 */

window.addEventListener('load',function(){
    // Set up a Quintus Instance
    var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Touch, UI")
        .setup()
        .touch();


    Q.scene("test", function (stage) {
        var container = stage.insert(new Q.UI.Container({
            w: "0%",
            y: 50
        }));

        if (Q.touchDevice) {
            stage.insert(new Q.UI.Text({
                label: "HTML5 Audio\nnot well\nsupported\non Mobile",
                align: "center",
                y: 200
            }), container);
        }

        container.fit(20);
    });

    Q.stageScene("test");

    setTimeout(function(){
        Q.clearStages();
    },2000);

});
