/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.CONS = function (Q) {
    Q.Evented.extend('Wrestle');
    Q.wrestle = new Q.Wrestle();

    Q.wrestle.boss = {};
    Q.wrestle.b_blood = {};

    Q.wrestle.player = {};
    Q.wrestle.p_blood = {};

    Q.wrestle.stage = {};
    Q.wrestle.cd = {};

    Q.wrestle.leftBottom = {};
    Q.wrestle.rightBottom = {};

    Q.wrestle.roundRunning = false;

    Q.wrestle.Career = {
        Front: 'front',
        InterAct: 'interAct',
        Vision: 'Vision',
        User:'User'
    };

    Q.wrestle.pLevel = {
        lower:5,            //攻击力,
        bad:10,             //攻击力,10/50
        medium: 15,
        good:20,
        excellent:30,
        Invincible: 50
    }
};