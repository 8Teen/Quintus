/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.Sheets = function (Q) {

    Q.load([
        "front/front_show.png",
        "front/front_move.png",
        "front/front_suffer_weak.png",
        "front/front_suffer_medium.png",
        "front/front_attack_weak.png",
        "front/front_attack_medium.png",
        "front/front_attack_fierce.png",
        "front/front_stand.png",

        "boss/boss_hi.png",
        "boss/boss_move.png",
        "boss/boss_attack_weak.png",
        "boss/boss_attack_medium.png",
        "boss/boss_attack_fierce.png",
        "boss/boss_suffer_weak.png",
        "boss/boss_win.png",
        "boss/boss_lose.png",

        "cd/cd.png",
        "io/io_hit.png",
        "io/io.png",
        "bg/bg.jpg"
    ],
        function () {

            //倒計時.
            Q.sheet("cd", "cd/cd.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 1025,
                    "h": 198,
                    "cols": 5,
                    "tilew": 205,
                    "tileh": 198
                });

            //IO
            Q.sheet("io", "io/io.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 476,
                    "h": 119,
                    "cols": 4,
                    "tilew": 119,
                    "tileh": 119
                });

            Q.sheet("io_hit", "io/io_hit.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 476,
                    "h": 119,
                    "cols": 4,
                    "tilew": 119,
                    "tileh": 119
                });

            //boss
            Q.sheet("boss_hi", "boss/boss_hi.png",
                {
                    sx: 0,
                    sy: 0,
                    w: 3666,
                    h: 265,
                    tilew: 141,
                    tileh: 265
                });

            Q.sheet("boss_move", "boss/boss_move.png",
                {
                    sx: 0,
                    sy: 0,
                    cols: 7,
                    tilew: 191,
                    tileh: 274
                });

            Q.sheet("boss_attack_weak", "boss/boss_attack_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 3912,
                    "h": 325,
                    "cols": 12,
                    "tilew": 326,
                    "tileh": 325
                });

            Q.sheet("boss_attack_medium", "boss/boss_attack_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 5525,
                    "h": 266,
                    "cols": 13,
                    "tilew": 425,
                    "tileh": 266
                });


            Q.sheet("boss_suffer_weak", "boss/boss_suffer_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 3509,
                    "h": 312,
                    "cols": 11,
                    "tilew": 319,
                    "tileh": 312
                });

            Q.sheet("boss_attack_fierce", "boss/boss_attack_fierce.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 6132,
                    "h": 495,
                    "cols": 14,
                    "tilew": 438,
                    "tileh": 495
                });

            Q.sheet("boss_win", "boss/boss_win.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 1458,
                    "h": 290,
                    "cols": 14,
                    "tilew": 162,
                    "tileh": 290
                });

            Q.sheet("boss_lose", "boss/boss_lose.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 1950,
                    "h": 264,
                    "cols": 10,
                    "tilew": 195,
                    "tileh": 264
                });

            //前端.
            Q.sheet("front_show", "front/front_show.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "tilew": 359,
                    "tileh": 460
                });

            Q.sheet("front_move", "front/front_move.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 3080,
                    "h": 297,
                    "cols": 8,
                    "tilew": 280,
                    "tileh": 297
                });

            Q.sheet("front_stand", "front/front_stand.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "tilew": 225,
                    "tileh": 291
                });

            Q.sheet("front_suffer_weak", "front/front_suffer_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 2580,
                    "h": 287,
                    "cols": 10,
                    "tilew": 258,
                    "tileh": 287
                });

            Q.sheet("front_suffer_medium", "front/front_suffer_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "tilew": 410,
                    "tileh": 364
                });

            Q.sheet("front_attack_weak", "front/front_attack_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 3852,
                    "h": 305,
                    "cols": 12,
                    "tilew": 321,
                    "tileh": 305
                });

            Q.sheet("front_attack_medium", "front/front_attack_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 7176,
                    "h": 292,
                    "cols": 13,
                    "tilew": 552,
                    "tileh": 292
                });

            Q.sheet("front_attack_fierce", "front/front_attack_fierce.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "w": 5960,
                    "h": 365,
                    "cols": 10,
                    "tilew": 596,
                    "tileh": 365
                });

            Q.stageScene("mainRoot");

        });


};