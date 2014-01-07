/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.cdSprites = function (Q) {
    //Vision.
    Q.Sprite.extend("CD", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2,
                y: Q.height/2,
                z:1,
                sprite: "cd",
                sheet: 'cd',
                scale: 1,
                sort: false
            });

            this.add("animation");
            this.on("destroy",this.deallocate);

        },
        deallocate: function(){
            this.destroy();
        }
    });

    Q.animations('cd', {
        show: {
            frames: [5,4,3,2,1],
            rate: 1,
            loop: false,
            trigger:"destroy"
        }
    });

};