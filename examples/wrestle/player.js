/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.playerSprites = function (Q) {
    //攻击力.
    var weak_ATK = 10;
    var medium_ATK = 30;
    var fierce_ATK = 40;



    Q.Sprite.extend("Player", {
        init: function (p) {
            this._super(p, {
                x: Q.width/2 - 200,
                y: Q.height/2 - 10,
                z: 1,
                sprite:'front_show',
                sheet:'front_show',
                level: Q.wrestle.pLevel.lower,
                scale: 1,
                life: 100
            });


            this.add("animation");

            this.on('front_show_stand',this._show_stand);
            this.on('front_attack_end',this._attack_end);

            this.on('interact_attack_end',this._attack_end);
            this.on('interact_show_stand',this._show_stand);

            this.on('vision_stand',this._show_stand);
            this.on('vision_attack_end',this._attack_end);

            this.on('user_attack_end',this._attack_end);


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

            if(_self.p.career === Q.wrestle.Career.Front){
                _self.p.sheet = "front_stand";
                _self.p.x = Q.width/2  - 180;
                _self.p.y = Q.height/2 + 140;
                _self.play('front_show_stand');
            }


            if(_self.p.career === Q.wrestle.Career.InterAct){
                _self.show();
            }

            if(_self.p.career === Q.wrestle.Career.Vision){
                _self.p.sheet = "vision_stand";
                _self.p.x = Q.width/2  - 210;
                _self.p.y = Q.height/2 + 70;
                _self.play('vision_stand');
            }

            if(_self.p.career === Q.wrestle.Career.User){
                _self.show();
            }
        },
        _attack_weak: function(){
            var _self = this;

            if(_self.p.career == Q.wrestle.Career.Front){
                _self.p.sheet = "front_move";
                _self.p.y = Q.height/2 + 150;
                _self.play('front_move');

                _self.add("tween");

                _self.animate({ x: Q.width/2, y: Q.height/2 + 150 }, 1, Q.Easing.Linear ,{callback : function(){
                    _self.p.sheet = "front_attack_weak";
                    _self.p.x = Q.width/2;
                    _self.p.y = Q.height/2 + 150;
                    _self.play('front_attack_weak');

                    Q.wrestle.boss.suffer_weak(weak_ATK);
                }});
            }

            if(_self.p.career == Q.wrestle.Career.InterAct){
                _self.p.sheet = "interact_move";
                _self.p.y = Q.height/2 + 120;
                _self.play('interact_move');

                _self.add("tween");

                _self.animate({ x: Q.width/2, y: Q.height/2 + 120 }, 1, Q.Easing.Linear ,{callback : function(){
                    _self.p.sheet = "interact_attack_weak";
                    _self.p.x = Q.width/2;
                    _self.p.y = Q.height/2 + 80;
                    _self.play('interact_attack_weak');

                    Q.wrestle.boss.suffer_weak(weak_ATK);
                }});
            }

            if(_self.p.career == Q.wrestle.Career.Vision){
                _self.p.sheet = "vision_move";
                _self.p.y = Q.height/2 + 60;
                _self.play('vision_move');

                _self.add("tween");

                _self.animate({ x: Q.width/2 - 90, y: Q.height/2 + 60 }, 1, Q.Easing.Linear ,{callback : function(){
                    _self.p.sheet = "vision_attack_weak";
                    _self.p.x = Q.width/2;
                    _self.p.y = Q.height/2 + 80;
                    _self.play('vision_attack_weak');

                    Q.wrestle.boss.suffer_weak(weak_ATK);
                }});
            }

            if(_self.p.career == Q.wrestle.Career.User){
                _self.p.sheet = "user_move";
                _self.p.y = Q.height/2 + 90;
                _self.play('user_move');

                _self.add("tween");

                _self.animate({ x: Q.width/2, y: Q.height/2 + 90 }, 1, Q.Easing.Linear ,{callback : function(){
                    _self.p.sheet = "user_attack_weak";
                    _self.p.x = Q.width/2;
                    _self.p.y = Q.height/2 + 70;
                    _self.play('user_attack_weak');

                    Q.audio.play('female_attack_weak.mp3');

                    Q.wrestle.boss.suffer_weak(weak_ATK);
                }});
            }

        },
        _attack_medium: function(){
            var _self = this;

            if(_self.p.career == Q.wrestle.Career.Front){
                _self.p.sheet = "front_move";
                _self.p.y = Q.height/2 + 150;
                _self.play('front_move');

                _self.add("tween");

                _self.animate({ x: Q.width/2, y: Q.height/2 + 150 }, 1, Q.Easing.Linear ,{callback : function(){
                    _self.p.sheet = "front_attack_medium";
                    _self.p.x = Q.width/2;
                    _self.p.y = Q.height/2 + 150;
                    _self.play('front_attack_medium');



                    Q.wrestle.boss.suffer_weak(medium_ATK);
                }});
            }

            if(_self.p.career == Q.wrestle.Career.InterAct){
                _self.p.sheet = "interact_attack_medium";
                _self.p.y = Q.height/2 + 40;
                _self.play('interact_attack_medium');

                Q.wrestle.boss.suffer_weak(medium_ATK);
            }

            if(_self.p.career == Q.wrestle.Career.Vision){
                _self.p.sheet = "vision_attack_medium";
                _self.p.y = Q.height/2 + 40;
                _self.play('vision_attack_medium');

                Q.wrestle.boss.suffer_weak(medium_ATK);
            }

            if(_self.p.career == Q.wrestle.Career.User){
                _self.p.sheet = "user_attack_medium";
                _self.p.x = Q.width/2 - 30;
                _self.p.y = Q.height/2 - 40;
                _self.play('user_attack_medium');

                Q.audio.play('female_attack_medium.mp3');

                Q.wrestle.boss.suffer_weak(medium_ATK);
            }

        },
        _attack_fierce: function(){
            var _self = this;


            if(_self.p.career == Q.wrestle.Career.Front){
                _self.p.sheet = "front_attack_fierce";
                _self.p.x = Q.width/2 - 100;
                _self.p.y = Q.height/2 + 70;
                _self.play('front_attack_fierce');

                Q.wrestle.boss.suffer_weak(fierce_ATK);
            }

            if(_self.p.career == Q.wrestle.Career.InterAct){
                _self.p.sheet = "interact_attack_fierce";
                _self.p.x = Q.width/2 - 300;
                _self.p.y = Q.height/2 - 220;
                _self.play('interact_attack_fierce');

                Q.wrestle.boss.suffer_weak(fierce_ATK);
            }

            if(_self.p.career == Q.wrestle.Career.Vision){
                _self.p.sheet = "vision_attack_fierce";
                _self.p.x = Q.width/2 - 300;
                _self.p.y = Q.height/2;
                _self.play('vision_attack_fierce');

                Q.wrestle.boss.suffer_weak(fierce_ATK);
            }

            if(_self.p.career == Q.wrestle.Career.User){
                _self.p.sheet = "user_attack_fierce";
                _self.p.x = Q.width/2 - 300;
                _self.p.y = Q.height/2;
                _self.play('user_attack_fierce');

                Q.audio.play('female_attack_fierce.mp3');

                Q.wrestle.boss.suffer_weak(fierce_ATK);
            }
        },
        _attack_end: function(){
            this._show_stand();

            Q.wrestle.trigger('round.over');
        },
        suffer_weak: function(loss){
            var _self = this;

            _self.p.life -= loss;

            Q.wrestle.p_blood.sheet().tileW = (_self.p.life/100) * Q.wrestle.p_blood.p.w;

            if(_self.p.life <= 0){

                Q.wrestle.p_blood.sheet().tileW = 0;

                _self.lose();
                Q.wrestle.boss.win();
            }
            else{


                if(_self.p.career === Q.wrestle.Career.Front){
                    _self.p.sheet = "front_suffer_weak";
                    _self.p.x = Q.width/2  - 200;
                    _self.p.y = Q.height/2 + 150;
                    _self.play('front_suffer_weak');
                }


                if(_self.p.career === Q.wrestle.Career.InterAct){
                    _self.p.sheet = "interact_suffer_weak";
                    _self.p.x = Q.width/2  - 220;
                    _self.p.y = Q.height/2 + 50;
                    _self.play('interact_suffer_weak');
                }

                if(_self.p.career === Q.wrestle.Career.Vision){
                    _self.p.sheet = "vision_suffer_weak";
                    _self.p.x = Q.width/2  - 220;
                    _self.p.y = Q.height/2 + 90;
                    _self.play('vision_suffer_weak');
                }

                if(_self.p.career === Q.wrestle.Career.User){

                    Q.audio.play('female_suffer_weak.mp3');

                    _self.p.sheet = "user_suffer_weak";
                    _self.p.x = Q.width/2  - 220;
                    _self.p.y = Q.height/2 + 90;
                    _self.play('user_suffer_weak');
                }
            }
        },
        suffer_medium: function(loss){
            var _self = this;

            _self.p.life -= loss;

            Q.wrestle.p_blood.sheet().tileW = (_self.p.life/100) * Q.wrestle.p_blood.p.w;

            if(_self.p.life <= 0){

                //血值
                Q.wrestle.p_blood.sheet().tileW = 0;

                _self.lose();
                Q.wrestle.boss.win();
            }
            else{

                if(_self.p.career === Q.wrestle.Career.Front){
                    _self.p.sheet = "front_suffer_medium";
                    _self.p.x = Q.width/2  - 300;
                    _self.p.y = Q.height/2 + 150;
                    _self.play('front_suffer_medium');
                }

                if(_self.p.career === Q.wrestle.Career.InterAct){
                    _self.p.sheet = "interact_suffer_medium";
                    _self.p.x = Q.width/2  - 220;
                    _self.p.y = Q.height/2 + 70;
                    _self.play('interact_suffer_medium');
                }

                if(_self.p.career === Q.wrestle.Career.Vision){
                    _self.p.sheet = "vision_suffer_medium";
                    _self.p.x = Q.width/2  - 340;
                    _self.p.y = Q.height/2 + 60;
                    _self.play('vision_suffer_medium');
                }

                if(_self.p.career === Q.wrestle.Career.User){

                    Q.audio.play('female_suffer_medium.mp3');

                    _self.p.sheet = "user_suffer_medium";
                    _self.p.x = Q.width/2  - 300;
                    _self.p.y = Q.height/2 + 70;
                    _self.play('user_suffer_medium');

                }

            }
        },
        lose: function(){
            var _self = this;

            if(_self.p.career === Q.wrestle.Career.Front){
                _self.p.sheet = "front_lose";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 150;
                _self.play('front_lose');
            }

            if(_self.p.career === Q.wrestle.Career.InterAct){
                _self.p.sheet = "interact_lose";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 80;
                _self.play('interact_lose');
            }

            if(_self.p.career === Q.wrestle.Career.Vision){
                _self.p.sheet = "vision_lose";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 80;
                _self.play('vision_lose');
            }

            if(_self.p.career === Q.wrestle.Career.User){
                _self.p.sheet = "user_lose";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 80;
                _self.play('user_lose');
            }

        },
        win: function(){
            var _self = this;

            if(_self.p.career === Q.wrestle.Career.Front){
                _self.p.sheet = "front_win";
                _self.p.x = Q.width/2  - 360;
                _self.p.y = Q.height/2 + 80;
                _self.play('front_win');
            }

            if(_self.p.career === Q.wrestle.Career.InterAct){
                _self.p.sheet = "interact_win";
                _self.p.x = Q.width/2  - 230;
                _self.p.y = Q.height/2;
                _self.play('interact_win');
            }

            if(_self.p.career === Q.wrestle.Career.Vision){
                _self.p.sheet = "vision_win";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 70;
                _self.play('vision_win');
            }

            if(_self.p.career === Q.wrestle.Career.User){
                _self.p.sheet = "user_win";
                _self.p.x = Q.width/2  - 220;
                _self.p.y = Q.height/2 - 65;
                _self.play('user_win');
            }

        },
        show: function(){
            var _self = this;

            if(_self.p.career === Q.wrestle.Career.Front){
                _self.p.sheet = "front_show";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 30;
                _self.play('front_show');
            }

            if(_self.p.career === Q.wrestle.Career.InterAct){
                _self.p.sheet = "interact_show";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 80;
                _self.play('interact_show');
            }

            if(_self.p.career === Q.wrestle.Career.Vision){
                _self.p.sheet = "vision_show";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 70;
                _self.play('vision_show');
            }

            if(_self.p.career === Q.wrestle.Career.User){
                _self.p.sheet = "user_show";
                _self.p.x = Q.width/2  - 200;
                _self.p.y = Q.height/2 + 70;
                _self.play('user_show');

                Q.audio.play('female_show.mp3');
            }
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
            rate: 1/3
        },
        front_win: {
            frames: [0,1,2,3,4,5,6,7,8,9,10],
            loop: false,
            rate: 1/3
        }
    });

    Q.animations('interact_show', {
        interact_show: {
            frames: [0,1,2,3,4,5,6,7,8],
            loop: true,
            rate: 1/2
        },
        interact_move:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11],
            loop: true,
            rate: 1/5
        },
        interact_attack_weak:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11],
            loop: false,
            rate: 1/3,
            trigger:'interact_attack_end'
        },
        interact_attack_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/3,
            trigger:'interact_attack_end'
        },
        interact_attack_fierce:{
            frames: [0,1,2,3,4,5],
            loop: false,
            rate: 1/2,
            trigger:'interact_attack_end'
        },
        interact_suffer_weak:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/4,
            trigger:'interact_show_stand'
        },
        interact_suffer_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/4,
            trigger:'interact_show_stand'
        },
        interact_win:{
            frames: [0,1,2,3,4,5,6,7,8],
            loop: false,
            rate: 1/4
        },
        interact_lose:{
            frames: [0,1,2,3,4,5,6],
            loop: false,
            rate: 1/4
        }
    });

    Q.animations('vision_show', {
        vision_show: {
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
            loop: false,
            rate: 1/2,
            trigger:'vision_stand'
        },
        vision_stand:{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
            loop: true,
            rate: 1/2
        },
        vision_move:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: true,
            rate: 1/5
        },
        vision_attack_weak:{
            frames: [0,1,2,3,4,5,6,7,8],
            loop: false,
            rate: 1/3,
            trigger:'vision_attack_end'
        },
        vision_attack_medium:{
            frames: [0,1,2,3,4,5,6],
            loop: false,
            rate: 1/3,
            trigger:'vision_attack_end'
        },
        vision_attack_fierce:{
            frames: [0,1,2,3,4],
            loop: false,
            rate: 1/2,
            trigger:'vision_attack_end'
        },
        vision_suffer_weak:{
            frames: [0,1,2,3,4,5,6,7,8],
            loop: false,
            rate: 1/4,
            trigger:'vision_attack_end'
        },
        vision_suffer_medium:{
            frames: [0,1,2,3,4,5,6,7,8],
            loop: false,
            rate: 1/4,
            trigger:'vision_attack_end'
        },
        vision_win:{
            frames: [0,1,2,3,4,5,6,7,8],
            loop: false,
            rate: 1/4
        },
        vision_lose:{
            frames: [0,1,2,3,4,5,6,7],
            loop: false,
            rate: 1/4
        }
    });

    Q.animations('user_show', {
        user_show: {
            frames: [0,1,2,3,4,5,6,7,8,9,10,11],
            loop: true,
            rate: 1/2
        },
        user_move:{
            frames: [0,1,2,3,4,5,6,7],
            loop: true,
            rate: 1/4
        },
        user_attack_weak:{
            frames: [0,1,2,3,4,5],
            loop: false,
            rate: 1/3,
            trigger:'user_attack_end'
        },
        user_attack_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/3,
            trigger:'user_attack_end'
        },
        user_attack_fierce:{
            frames: [0,1,2,3],
            loop: false,
            rate: 1/2,
            trigger:'user_attack_end'
        },
        user_suffer_weak:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/4,
            trigger:'user_attack_end'
        },
        user_suffer_medium:{
            frames: [0,1,2,3,4,5,6,7,8,9],
            loop: false,
            rate: 1/4,
            trigger:'user_attack_end'
        },
        user_win:{
            frames: [0,1,2,3,4,5,6,7],
            loop: false,
            rate: 1/4
        },
        user_lose:{
            frames: [0,1,2,3,4,5,6],
            loop: false,
            rate: 1/4
        }
    });

};