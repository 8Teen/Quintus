/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.bossSprites = function (Q) {
    Q.Sprite.extend("Boss", {
        init: function (p) {
            this._super(p, {
                x:Q.width/2 + 200,
                y: Q.height/2 + 90,
                w: 200,
                h: 300,
                sprite: "boss",
                sheet: 'boss_hi',
                scale: 1
            });

            this.add("animation");

            this.on('standStill',this,this.standStill);
            this.on('_attack_end',this,this._attack_end);
        },
        attack_weak: function(){
            var _self = this;

            _self.p.sheet = "boss_move";
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 100 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "boss_attack_weak";
                _self.p.x = Q.width/2  - 100;
                _self.p.y = Q.height/2 + 30;
                _self.play('attack_weak');

                Q.wrestle.front.suffer_weak();
            }});
        },
        attack_medium: function(){
            var _self = this;

            _self.p.sheet = "boss_move";
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 100 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "boss_attack_medium";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 100;
                _self.play('attack_medium');

                Q.wrestle.front.suffer_weak();
            }});
        },
        attack_fierce: function(){
            var _self = this;

            _self.p.sheet = "boss_move";
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 100 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "boss_attack_fierce";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 - 100;
                _self.play('attack_fierce');

                Q.wrestle.front.suffer_medium();
            }});
        },
        _attack_end: function(){
            this.standStill();

            Q.wrestle.trigger('round.over');
        },
        suffer_weak: function(){
            var _self = this;

            _self.p.sheet = "boss_suffer_weak";
            _self.p.x = Q.width/2 + 120;
            _self.p.y = Q.height/2 + 55;
            _self.play('suffer_weak');
        },
        standStill: function(){

            this.p.sheet = "boss_hi";
            this.p.x = Q.width/2 + 200;
            this.p.y = Q.height/2 + 100;
            this.play('standStill');
        },
        win: function(){
            this.p.sheet = "boss_win";
            this.p.x = Q.width/2 + 200;
            this.p.y = Q.height/2 + 80;
            this.play('win');
        },
        lose: function(){
            this.p.sheet = "boss_lose";
            this.p.x = Q.width/2 + 200;
            this.p.y = Q.height/2 + 100;
            this.play('lose');
        }
    });

    Q.animations('boss', {
        show: {
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
            rate: 1/3 ,
            next : 'standStill'
        },
        move: {
            frames: [0,1,2,3,4,5,6,7,0],
            rate: 1/3,
            loop: true
        },
        attack_weak:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11],
            rate: 1/3,
            loop:false,
            trigger:'_attack_end'
        },
        attack_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12],
            rate: 1/3,
            loop:false,
            trigger:'_attack_end'
        },
        attack_fierce:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
            rate: 1/3,
            loop:false,
            trigger:'_attack_end'
        },
        suffer_weak:{
            frames: [0,1,2,3,4,5],
            rate: 2/3,
            loop:false,
            trigger:'standStill'
        },
        win:{
            frames: [0,1,2,3,4,5,6,7,8],
            rate: 2/3,
            loop:true,
            trigger:'win'
        },
        lose:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            rate: 1/2,
            loop:true,
            trigger:'lose'
        },
        standStill: {
            frames: [21,22,23,24,25],
            loop: true,
            rate: 1/2
        }
    });
};