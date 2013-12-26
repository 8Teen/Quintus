/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.frontEndSprites = function (Q) {
    //Vision.
    Q.Sprite.extend("Front", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2 - 200,
                y: Q.height/2 - 10,
                sprite: "front_show",
                sheet: 'front_show',
                scale: 1
            });

            this.add("animation");

            this.on('_show_stand',this._show_stand);
            this.on('_attack_end',this._attack_end);
        },
        _show_stand: function(){
            var _self = this;
            _self.p.sheet = "front_stand";
            _self.p.x = Q.width/2  - 180;
            _self.p.y = Q.height/2 + 140;
            _self.play('show_stand');
        },
        attack_weak: function(){
            var _self = this;
            _self.p.sheet = "front_move";
            _self.p.y = Q.height/2 + 150;
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 150 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "front_attack_weak";
                _self.p.x = Q.width/2;
                _self.p.y = Q.height/2 + 150;
                _self.play('attack_weak');

                Q.wrestle.boss.suffer_weak();
            }});
        },
        attack_medium: function(){
            var _self = this;
            _self.p.sheet = "front_move";
            _self.p.y = Q.height/2 + 150;
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 150 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "front_attack_medium";
                _self.p.x = Q.width/2;
                _self.p.y = Q.height/2 + 150;
                _self.play('attack_medium');

                Q.wrestle.boss.suffer_weak();
            }});
        },
        attack_fierce: function(){
            var _self = this;

            _self.p.sheet = "front_attack_fierce";
            _self.p.x = Q.width/2 - 100;
            _self.p.y = Q.height/2 + 70;
            _self.play('attack_fierce');

            Q.wrestle.boss.suffer_weak();
        },
        _attack_end: function(){
            this._show_stand();

            Q.wrestle.trigger('round.over');
        },
        suffer_weak: function(){
            var _self = this;
            _self.p.sheet = "front_suffer_weak";
            _self.p.x = Q.width/2  - 200;
            _self.p.y = Q.height/2 + 150;
            _self.play('suffer_weak');
        },
        suffer_medium: function(){
            var _self = this;
            _self.p.sheet = "front_suffer_medium";
            _self.p.x = Q.width/2  - 300;
            _self.p.y = Q.height/2 + 150;
            _self.play('suffer_medium');
        },
        show: function(){
            var _self = this;
            _self.p.sheet = "front_show";
            _self.p.x = Q.width/2  - 200;
            _self.p.y = Q.height/2 + 30;
            _self.play('show');
        }
    });

    Q.animations('front_show', {
        show: {
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12],
            loop: false,
            rate: 1/6,
            trigger: '_show_stand'
        },
        show_stand: {
            frames: [0,1,2,3,4],
            loop: true,
            rate: 1/2
        },
        move:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: true,
            rate: 1/3
        },
        suffer_weak: {
            frames: [0,1,2,3,4,5,6,7,8,9,6],
            loop: false,
            rate: 1/2,
            trigger: '_show_stand'
        },
        suffer_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9,10],
            loop: false,
            rate: 1/2,
            trigger: '_show_stand'
        },
        attack_weak: {
            frames: [0,1,2,3,4,5,6,7,8,9,10,11],
            loop: false,
            rate: 1/3,
            trigger: '_attack_end'
        },
        attack_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12],
            loop: false,
            rate: 1/5,
            trigger: '_attack_end'
        },
        attack_fierce:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/3,
            trigger: '_attack_end'
        }
    });

};