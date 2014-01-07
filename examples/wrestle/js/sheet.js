/**
 * Created by jiangcheng.wxd on 13-12-21.
 */
Quintus.Sheets = function (Q) {

    Q.enableSound();

    Q.stageScene("loading");

    Q.load([
        "front/front_show.png",
        "front/front_move.png",
        "front/front_suffer_weak.png",
        "front/front_suffer_medium.png",
        "front/front_attack_weak.png",
        "front/front_attack_medium.png",
        "front/front_attack_fierce.png",
        "front/front_stand.png",
        "front/front_lose.png",
        "front/front_win.png",

        "interact/interact_show.png",
        "interact/interact_move.png",
        "interact/interact_attack_weak.png",
        "interact/interact_attack_medium.png",
        "interact/interact_attack_fierce.png",
        "interact/interact_suffer_weak.png",
        "interact/interact_suffer_medium.png",
        "interact/interact_win.png",
        "interact/interact_lose.png",

        "vision/vision_show.png",
        "vision/vision_stand.png",
        "vision/vision_move.png",
        "vision/vision_attack_weak.png",
        "vision/vision_attack_medium.png",
        "vision/vision_attack_fierce.png",
        "vision/vision_suffer_weak.png",
        "vision/vision_suffer_medium.png",
        "vision/vision_win.png",
        "vision/vision_lose.png",

        "user/user_show.png",
        "user/user_move.png",
        "user/user_attack_weak.png",
        "user/user_attack_medium.png",
        "user/user_attack_fierce.png",
        "user/user_suffer_weak.png",
        "user/user_suffer_medium.png",
        "user/user_win.png",
        "user/user_lose.png",

        "boss/boss_hi.png",
        "boss/boss_move.png",
        "boss/boss_attack_weak.png",
        "boss/boss_attack_medium.png",
        "boss/boss_attack_fierce.png",
        "boss/boss_suffer_weak.png",
        "boss/boss_defend.png",
        "boss/boss_win.png",
        "boss/boss_lose.png",

        "bg.mp3",
        "female_show.mp3",
        "female_attack_weak.mp3",
        "female_attack_medium.mp3",
        "female_attack_fierce.mp3",
        "female_suffer_weak.mp3",
        "female_suffer_medium.mp3",

        "male_show.mp3",
        "male_attack_weak.mp3",
        "male_attack_medium.mp3",
        "male_attack_fierce.mp3",
        "male_suffer_weak.mp3",
        "male_suffer_medium.mp3",

        "cd/cd.png",

        "io/Shank.png",
        "io/io_hit.png",
        "io/io.png",
        "io/direct.png",
        "io/abcd.png",

        "bg/bg.jpg",

        "scaffold/blood_l.png",
        "scaffold/logo.png",
        "scaffold/blood_l.png",
        "scaffold/blood_r.png",
        "scaffold/ct.png",

        "scaffold/win.png",
        "scaffold/lose.png",
        "scaffold/timeover.png",

        "scaffold/boss.png",
        "scaffold/jiaohu.png",
        "scaffold/simeigong.png",
        "scaffold/manong.png",
        "scaffold/yongyan.png"
    ],
        function () {


            //倒計時.
            Q.sheet("cd", "cd/cd.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 10,
                    "tilew": 112,
                    "tileh": 112
                });

            //IO
            Q.sheet("io", "io/io.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 8,
                    "tilew": 56,
                    "tileh": 56
                });

            Q.sheet("io_hit", "io/io_hit.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 8,
                    "tilew": 56,
                    "tileh": 56
                });

            Q.sheet("abcd", "io/abcd.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 4,
                    "tilew": 119,
                    "tileh": 119
                });

            Q.sheet("Shank", "io/Shank.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 1,
                    "swidth":131,
                    "sheight":130,
                    "tilew": 280,
                    "tileh": 280
                });

            Q.sheet("direct", "io/direct.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 8,
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

            Q.sheet("boss_defend", "boss/boss_defend.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 5,
                    "tilew": 205,
                    "tileh": 172
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

            Q.sheet("front_lose", "front/front_lose.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "tilew": 291,
                    "tileh": 296
                });

            Q.sheet("front_win", "front/front_win.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "tilew": 451,
                    "tileh": 354
                });


            //交互.
            Q.sheet("interact_show", "interact/interact_show.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 9,
                    "tilew": 292,
                    "tileh": 269
                });

            Q.sheet("interact_move", "interact/interact_move.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 12,
                    "tilew": 285,
                    "tileh": 216
                });

            Q.sheet("interact_attack_weak", "interact/interact_attack_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 12,
                    "tilew": 332,
                    "tileh": 264
                });

            Q.sheet("interact_attack_medium", "interact/interact_attack_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 12,
                    "tilew": 428,
                    "tileh": 299
                });

            Q.sheet("interact_attack_fierce", "interact/interact_attack_fierce.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 12,
                    "tilew": 710,
                    "tileh": 581
                });

            Q.sheet("interact_suffer_weak", "interact/interact_suffer_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 10,
                    "tilew": 283,
                    "tileh": 292
                });

            Q.sheet("interact_suffer_medium", "interact/interact_suffer_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 10,
                    "tilew": 281,
                    "tileh": 269
                });

            Q.sheet("interact_win", "interact/interact_win.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 9,
                    "tilew": 482,
                    "tileh": 368
                });

            Q.sheet("interact_lose", "interact/interact_lose.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 7,
                    "tilew": 295,
                    "tileh": 271
                });

            //视觉.
            Q.sheet("vision_show", "vision/vision_show.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 14,
                    "tilew": 175,
                    "tileh": 285
                });

            Q.sheet("vision_stand", "vision/vision_stand.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 15,
                    "tilew": 134,
                    "tileh": 286
                });

            Q.sheet("vision_move", "vision/vision_move.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 10,
                    "tilew": 214,
                    "tileh": 286
                });

            Q.sheet("vision_attack_weak", "vision/vision_attack_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 9,
                    "tilew": 276,
                    "tileh": 281
                });

            Q.sheet("vision_attack_medium", "vision/vision_attack_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 7,
                    "tilew": 453,
                    "tileh": 313
                });

            Q.sheet("vision_attack_fierce", "vision/vision_attack_fierce.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 5,
                    "tilew": 717,
                    "tileh": 369
                });

            Q.sheet("vision_suffer_weak", "vision/vision_suffer_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 9,
                    "tilew": 155,
                    "tileh": 285
                });

            Q.sheet("vision_suffer_medium", "vision/vision_suffer_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 9,
                    "tilew": 291,
                    "tileh": 307
                });


            Q.sheet("vision_win", "vision/vision_win.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 9,
                    "tilew": 280,
                    "tileh": 286
                });

            Q.sheet("vision_lose", "vision/vision_lose.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 8,
                    "tilew": 186,
                    "tileh": 284
                });


            Q.sheet("user_show", "user/user_show.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 12,
                    "tilew": 174,
                    "tileh": 255
                });

            Q.sheet("user_move", "user/user_move.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 8,
                    "tilew": 242,
                    "tileh": 231
                });

            Q.sheet("user_attack_weak", "user/user_attack_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 6,
                    "tilew": 219,
                    "tileh": 256
                });

            Q.sheet("user_attack_medium", "user/user_attack_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 10,
                    "tilew": 348,
                    "tileh": 436
                });

            Q.sheet("user_attack_fierce", "user/user_attack_fierce.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 4,
                    "tilew": 948,
                    "tileh": 365
                });

            Q.sheet("user_suffer_weak", "user/user_suffer_weak.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 10,
                    "tilew": 155,
                    "tileh": 235
                });

            Q.sheet("user_suffer_medium", "user/user_suffer_medium.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 10,
                    "tilew": 250,
                    "tileh": 245
                });

            Q.sheet("user_win", "user/user_win.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 8,
                    "tilew": 232,
                    "tileh": 382
                });

            Q.sheet("user_lose", "user/user_lose.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 7,
                    "tilew": 154,
                    "tileh": 263
                });


            Q.sheet("logo", "scaffold/logo.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 2,
                    "tilew": 519,
                    "tileh": 128
                });

            Q.sheet("blood_l", "scaffold/blood_l.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 1,
                    "tilew": 385,
                    "tileh": 15
                });

            Q.sheet("blood_r", "scaffold/blood_r.png",
                {
                    "sx": 0,
                    "sy": 0,
                    "cols": 1,
                    "tilew": 385,
                    "tileh": 15
                });

            Q.stageScene("chooseRole");

        });


};