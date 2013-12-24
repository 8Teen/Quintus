/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.bossSprites = function (Q) {
    Q.Sprite.extend("Boss", {
        init: function (p) {
            this._super(p, {
                x:Q.width/2 + 200,
                y: Q.height/2 + 100,
                w: 200,
                h: 300,
                sprite: "boss",
                sheet: 'boss_hi',
                scale: 1
            });

            this.add("animation");
        },
        move: function(){
            var _self = this;

            _self.p.sheet = "boss_move";
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2 - 100, y: Q.height/2 + 100 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.weakFire();
            }});
        },
        weakFire: function(){
            this.p.sheet = "boss_attack_weak";
//            this.p.x = Q.width/2 + 100;
            this.p.y = Q.height/2 + 30;
            this.play('weakFire');
        },
        standStill: function(){
            this.p.sheet = "boss_hi";
            this.p.x = Q.width/2 + 200;
            this.p.y = Q.height/2 + 100;
            this.play('standStill');
        }
    });

    Q.animations('boss', {
        show: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], rate: 1/3 ,next : 'standStill'},
        move: { frames: [0,1,2,3,4,5,6,7,0], rate: 1/3, loop: true, trigger:'weakFire'},
        weakFire:{frames: [0,1,2,3,4,5,6,7,8,9,10,11], rate: 1/3, loop: true, trigger:'standStill'},
        standStill: { frames: [21,22,23,24,25], rate: 1/2 }
    });
};