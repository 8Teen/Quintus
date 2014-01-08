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

    Q.wrestle.gameOverCb;

    Q.wrestle.Cicle = {};

    Q.wrestle.pLevel = {
        lower: 5,
        bad: 10,
        medium: 15,
        good:20,
        excellent:30,
        Invincible: 50
    }

    Q.wrestle.hitType = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        UP: 5,
        DOWN: 6,
        LEFT: 7,
        RIGHT: 8,
        Nil: -1
    };

    Q.wrestle.Hit = {
        showHit: Q.wrestle.hitType.Nil,
        realHit: Q.wrestle.hitType.Nil
    };
};