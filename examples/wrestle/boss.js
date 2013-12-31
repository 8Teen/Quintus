/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.bossSprites = function (Q) {

    //攻击力.
    var weak_ATK = 10;
    var medium_ATK = 30;
    var fierce_ATK = 40;

    Q.Sprite.extend("Boss", {
        init: function (p) {
            this._super(p, {
                x:Q.width/2 + 200,
                y: Q.height/2 + 90,
                z: 1,
                w: 200,
                h: 300,
                sprite: "boss",
                sheet: 'boss_hi',
                level: Q.wrestle.pLevel.excellent,
                scale: 1,
                life: 100
            });

            this.add("animation");

            this.on('standStill',this,this.standStill);
            this.on('_attack_end',this,this._attack_end);
            this.on('win',function(){

                var lose = new Q.Sprite({
                    x: Q.width/2,
                    y: Q.height/2,
                    z: 2,
                    asset:'scaffold/lose.png'
                });

                Q.wrestle.stage.insert(lose);

            });
            this.on('lose',function(){
                var win = new Q.Sprite({
                    x: Q.width/2,
                    y: Q.height/2,
                    z: 2,
                    asset:'scaffold/win.png'
                });

                Q.wrestle.stage.insert(win);
            });

            this.play('show');
        },
        attack: function(level){
            var rand = Math.random();

            if(level == Q.wrestle.pLevel.lower){

                //50%大招
                if(rand > 0.5){
                    this._attack_fierce();
                }
                else{
                    this._attack_medium();
                }

            }
            else if(level == Q.wrestle.pLevel.bad){
                //30%大招
                if(rand > 0.7){
                    this._attack_fierce();
                }
                else{
                    this._attack_medium();
                }
            }
            else if(level == Q.wrestle.pLevel.medium){
                //40%大招
                if(rand > 0.6){
                    this._attack_fierce();
                }
                else if(rand <= 0.6 && rand > 0.4){
                    this._attack_medium();
                }
                else{
                    this._attack_weak();
                }
            }
            else if(level == Q.wrestle.pLevel.good){
                //30%大招
                if(rand > 0.7){
                    this._attack_fierce();
                }
                else if(rand > 0.4 && rand <= 0.7){
                    this._attack_medium();
                }
                else{
                    this._attack_weak();
                }
            }
            else if(level == Q.wrestle.pLevel.excellent){
                //20%概率中级技能
                if(rand > 0.8){
                    this._attack_medium();
                }
                //30%大招
                else if(rand > 0.5 && rand <= 0.8){
                    this._attack_fierce();
                }
                else{
                    this._attack_weak();
                }
            }
        },
        _attack_weak: function(){
            var _self = this;

            _self.p.sheet = "boss_move";
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 100 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "boss_attack_weak";
                _self.p.x = Q.width/2  - 100;
                _self.p.y = Q.height/2 + 30;
                _self.play('_attack_weak');

                Q.audio.play('male_attack_weak.mp3');
                Q.wrestle.player.suffer_weak(weak_ATK);
            }});
        },
        _attack_medium: function(){
            var _self = this;

            _self.p.sheet = "boss_move";
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 100 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "boss_attack_medium";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 100;
                _self.play('_attack_medium');

                Q.audio.play('male_attack_medium.mp3');
                Q.wrestle.player.suffer_weak(medium_ATK);
            }});
        },
        _attack_fierce: function(){
            var _self = this;

            _self.p.sheet = "boss_move";
            _self.play('move');

            _self.add("tween");

            _self.animate({ x: Q.width/2, y: Q.height/2 + 100 }, 1, Q.Easing.Linear ,{callback : function(){
                _self.p.sheet = "boss_attack_fierce";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 - 100;
                _self.play('_attack_fierce');

                Q.audio.play('male_attack_fierce.mp3');
                Q.wrestle.player.suffer_medium(fierce_ATK);
            }});
        },
        defend: function(){
            var _self = this;

            _self.p.sheet = "boss_defend";
            _self.p.x = Q.width/2 + 220;
            _self.p.y = Q.height/2 + 180;
            _self.play('boss_defend');
        },
        _attack_end: function(){
            this.standStill();

            Q.wrestle.trigger('round.over');
        },
        suffer_weak: function(loss){
            var _self = this;

            _self.p.life -= loss;

            Q.wrestle.b_blood.sheet().tileW = (_self.p.life/100) * Q.wrestle.b_blood.p.w;

            if(_self.p.life <= 0){

                Q.wrestle.b_blood.sheet().tileW = 0;

                _self.lose();

                Q.wrestle.player.win();
            }
            else{
                _self.p.sheet = "boss_suffer_weak";
                _self.p.x = Q.width/2 + 120;
                _self.p.y = Q.height/2 + 55;
                _self.play('suffer_weak');

                Q.audio.play('male_suffer_weak.mp3');
            }
        },
        standStill: function(){

            this.p.sheet = "boss_hi";
            this.p.x = Q.width/2 + 200;
            this.p.y = Q.height/2 + 100;
            this.play('standStill');

            //Q.audio.play('male_show.mp3');
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
        _attack_weak:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11],
            rate: 1/3,
            loop:false,
            trigger:'_attack_end'
        },
        _attack_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12],
            rate: 1/3,
            loop:false,
            trigger:'_attack_end'
        },
        _attack_fierce:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
            rate: 1/3,
            loop:false,
            trigger:'_attack_end'
        },
        boss_defend:{
            frames: [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4],
            rate: 1/3,
            loop:false,
            trigger:'standStill'
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
            loop:false,
            trigger:'win'
        },
        lose:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            rate: 1/2,
            loop:false,
            trigger:'lose'
        },
        standStill: {
            frames: [21,22,23,24,25],
            loop: true,
            rate: 1/2
        }
    });
};