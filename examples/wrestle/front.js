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
                z: 1,
                sprite: "front_show",
                sheet: 'front_show',
                level: Q.wrestle.pLevel.lower,
                scale: 1,
                life: 100
            });

            this.add("animation");

            this.on('front_show_stand',this._show_stand);
            this.on('front_attack_end',this._attack_end);

            this.show();
        },
        attack: function(){
            var rand = Math.random();

            if(this.p.level == Q.wrestle.pLevel.lower){

                //20%概率中级技能
                if(rand > 0.8){
                    this._attack_medium();
                }
                else{
                    this._attack_weak();
                }

            }
            else if(this.p.level == Q.wrestle.pLevel.bad){
                //30%概率中级技能
                if(rand > 0.7){
                    this._attack_medium();
                }
                else{
                    this._attack_weak();
                }
            }
            else if(this.p.level == Q.wrestle.pLevel.medium){
                //40%概率中级技能
                if(rand > 0.6){
                    this._attack_medium();
                }
                else{
                    this._attack_weak();
                }
            }
            else if(this.p.level == Q.wrestle.pLevel.good){
                //40%概率中级技能
                if(rand > 0.5){
                    this._attack_medium();
                }
                //10%大招
                else if(rand > 0.4 && rand <= 0.5){
                    this._attack_fierce();
                }
                else{
                    this._attack_weak();
                }
            }
            else if(this.p.level == Q.wrestle.pLevel.excellent){
                //40%概率中级技能
                if(rand > 0.5){
                    this._attack_medium();
                }
                //30%大招
                else if(rand > 0.2 && rand <= 0.5){
                    this._attack_fierce();
                }
                else{
                    this._attack_weak();
                }
            }
        },
        _show_stand: function(){
            var _self = this;
            _self.p.sheet = "front_stand";
            _self.p.x = Q.width/2  - 180;
            _self.p.y = Q.height/2 + 140;
            _self.play('front_show_stand');
        },
        _attack_weak: function(){
            var _self = this;
            _self.p.sheet = "front_move";
            _self.p.y = Q.height/2 + 150;
            _self.play('front_move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 150 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "front_attack_weak";
                _self.p.x = Q.width/2;
                _self.p.y = Q.height/2 + 150;
                _self.play('front_attack_weak');

                Q.wrestle.boss.suffer_weak(this.p.level);
            }});
        },
        _attack_medium: function(){
            var _self = this;
            _self.p.sheet = "front_move";
            _self.p.y = Q.height/2 + 150;
            _self.play('front_move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 150 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "front_attack_medium";
                _self.p.x = Q.width/2;
                _self.p.y = Q.height/2 + 150;
                _self.play('front_attack_medium');

                Q.wrestle.boss.suffer_weak(this.p.level + 10);
            }});
        },
        _attack_fierce: function(){
            var _self = this;

            _self.p.sheet = "front_attack_fierce";
            _self.p.x = Q.width/2 - 100;
            _self.p.y = Q.height/2 + 70;
            _self.play('front_attack_fierce');

            Q.wrestle.boss.suffer_weak(this.p.level + 15);
        },
        _attack_end: function(){
            this._show_stand();

            Q.wrestle.trigger('round.over');
        },
        suffer_weak: function(loss){
            var _self = this;

            _self.p.life -= loss;

            if(_self.p.life < 0){
                _self.lose();
                Q.wrestle.boss.win();
            }
            else{
                _self.p.sheet = "front_suffer_weak";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 150;
                _self.play('front_suffer_weak');
            }
        },
        suffer_medium: function(loss){
            var _self = this;

            _self.p.life -= loss;

            if(_self.p.life < 0){
                _self.lose();
                Q.wrestle.boss.win();
            }
            else{
                _self.p.sheet = "front_suffer_medium";
                _self.p.x = Q.width/2  - 300;
                _self.p.y = Q.height/2 + 150;
                _self.play('front_suffer_medium');
            }
        },
        lose: function(){
            var _self = this;
            _self.p.sheet = "front_lose";
            _self.p.x = Q.width/2  - 200;
            _self.p.y = Q.height/2 + 150;
            _self.play('front_lose');
        },
        win: function(){
            var _self = this;
            _self.p.sheet = "front_win";
            _self.p.x = Q.width/2  - 360;
            _self.p.y = Q.height/2 + 80;
            _self.play('front_win');
        },
        show: function(){
            var _self = this;
            _self.p.sheet = "front_show";
            _self.p.x = Q.width/2  - 200;
            _self.p.y = Q.height/2 + 30;
            _self.play('front_show');
        }
    });

    Q.animations('front_show', {
        front_show: {
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12],
            loop: false,
            rate: 1/6,
            trigger: 'front_show_stand'
        },
        front_show_stand: {
            frames: [0,1,2,3,4],
            loop: true,
            rate: 1/2
        },
        front_move:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: true,
            rate: 1/3
        },
        front_suffer_weak: {
            frames: [0,1,2,3,4,5,6,7,8,9,6],
            loop: false,
            rate: 1/2,
            trigger: 'front_show_stand'
        },
        front_suffer_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9,10],
            loop: false,
            rate: 1/2,
            trigger: 'front_show_stand'
        },
        front_attack_weak: {
            frames: [0,1,2,3,4,5,6,7,8,9,10,11],
            loop: false,
            rate: 1/3,
            trigger: 'front_attack_end'
        },
        front_attack_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12],
            loop: false,
            rate: 1/5,
            trigger: 'front_attack_end'
        },
        front_attack_fierce:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/3,
            trigger: 'front_attack_end'
        },
        front_lose: {
            frames: [0,1,2,3,4,5,6,7],
            loop: false,
            rate: 1/3,
            trigger: 'front_lose'
        },
        front_win: {
            frames: [0,1,2,3,4,5,6,7,8,9,10],
            loop: false,
            rate: 1/3,
            trigger: 'front_win'
        }
    });

};