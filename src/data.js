//Exercice 1
// we put all the modules in a string
const modulesString =
  "88623 101095 149899 89383 54755 73496 115697 99839 65903 140201 95734 144728 113534 82199 98256 107126 54686 61243 54763 119048 58863 134097 84959 130490 145813 115794 130398 69864 133973 58382 75635 77153 132645 91661 126536 118977 137568 100341 142080 63342 84557 51961 61956 87922 92488 107572 51373 70148 80672 134880 105721 100138 80394 145117 50567 122606 112408 110737 111521 144309 65761 113147 58920 96623 65479 66576 94244 64493 142334 65969 99461 143656 134661 90115 122994 66994 135658 134336 102958 111410 107930 54711 101397 111350 86453 134383 134276 130342 80522 64875 68182 83400 121302 105996 123580 130373 123987 107932 78930 132068";

//Exercice 2
const string1 = "D8,H5,G5,B3";
const string2 = "H7,D6,B4,G4";
const string3 = "D75,B30,D83,H83,G12,B49,D71,H7,G72";
const string4 = "H62,D66,H55,D34,B71,D55,B58,D83";
const string5 = "D98,H47,D26,B63,D33,H87,G62,B20,D33,H53,D51";
const string6 = "H98,D91,B20,D16,B67,D40,H7,D15,H6,D7";
const fil1 =
  "D997,B443,G406,B393,G66,B223,D135,H452,G918,H354,G985,B402,D257,H225,D298,H369,G762,B373,D781,B935,D363,H952,G174,B529,G127,B549,D874,B993,G890,H881,D549,H537,G174,H766,D244,H131,D861,B487,D849,H304,G653,B497,G711,B916,D12,B753,D19,B528,G944,B155,G507,H552,D844,B822,D341,H948,G922,H866,D387,H973,D534,H127,D48,H744,D950,H522,D930,H320,D254,B577,G142,B29,G24,B118,G583,B683,G643,H974,G683,H985,D692,B271,G279,H62,D157,B932,G556,H574,D615,B428,D296,H551,G452,H533,D475,B302,D39,H846,D527,B433,G453,B567,D614,H807,D463,H712,G247,B436,D141,H180,D783,B65,G379,B935,D989,H945,G901,B160,D356,B828,D45,B619,D655,H104,D37,H793,G360,B242,G137,B45,G671,B844,D112,H627,D976,H10,D942,H26,G470,B284,D832,B59,D97,B9,G320,B38,D326,H317,G752,H213,D840,H789,G152,B64,G628,H326,G640,B610,G769,H183,D844,H834,D342,H630,G945,B807,G270,B472,D369,B920,D283,H440,G597,H137,G133,H458,D266,H91,D137,H536,D861,B325,D902,B971,D891,H648,G573,H139,D951,B671,D996,H864,G749,B681,D255,H306,D154,H706,G817,B798,D109,B594,D496,B867,G217,B572,G166,H723,D66,B210,D732,B741,G21,B574,G523,B646,D313,B961,G474,H990,D125,H928,G58,H726,D200,B364,D244,H622,D823,H39,D918,H549,D667,H935,D372,H241,G56,B713,G735,H735,G812,H700,G408,H980,G242,B697,G580,B34,G266,H190,D876,H857,G967,H493,D871,H563,G241,B636,G467,B793,D304,H103,G950,B503,D487,B868,G358,B747,G338,B273,G485,B686,G974,B724,G534,H561,D729,B162,D731,B17,D305,H712,D472,B158,D921,H827,G944,B303,G526,B782,D575,H948,G401,B142,G48,H766,D799,B242,D821,H673,G120";
const fil2 =
  "G991,B492,G167,B678,G228,H504,D972,H506,D900,H349,D329,B802,D616,H321,D252,H615,D494,H577,D322,B593,D348,H140,G676,H908,G528,B247,G498,B79,G247,B432,G569,H206,G668,B269,G25,H180,D181,B268,D655,B346,D716,H240,G227,B239,G223,H760,G10,B92,G633,B425,D198,H222,G542,B790,G596,H667,G87,B324,D456,H366,D888,H319,D784,B948,D641,B433,G519,H950,G689,B601,G860,H233,D21,B214,G89,H756,G361,H258,G950,B483,D252,H206,G184,H574,G540,H926,D374,H315,D357,H512,D503,H917,D745,B809,G94,B209,D616,H47,D61,B993,G589,B1,D387,B731,D782,H771,G344,H21,G88,H614,D678,H259,G311,B503,G477,H829,D861,B46,D738,B138,G564,B279,G669,H328,G664,H720,G746,H638,D790,B242,D504,B404,D409,B753,G289,H128,G603,B696,G201,B638,G902,B279,G170,B336,G311,H683,G272,H396,D180,B8,D816,B904,G129,B809,D168,B655,G459,B545,G839,H910,G642,H704,D301,B235,D469,B556,G624,B669,G174,B272,D515,B60,G668,H550,G903,B881,G600,B734,D815,H585,D39,B87,D198,B418,G150,B964,G818,B250,G198,B127,D521,H478,G489,B676,G84,H973,D384,B167,D372,B981,G733,B682,D746,B803,G834,B421,D153,H752,G381,B990,D216,H469,G446,B763,D332,B813,G701,H872,G39,B524,G469,H508,G700,B382,G598,H563,D652,B901,D638,B358,G486,B735,G232,H345,D746,H818,G13,H618,D881,B647,D191,H652,D358,H423,G137,B224,D415,H82,D778,B403,D661,B157,D393,B954,G308,B986,G293,H870,D13,H666,G232,H144,D887,H364,G507,H520,D823,B11,G927,B904,D618,H875,D143,B457,D459,B755,D677,B561,G499,H267,G721,H274,G700,B870,G612,B673,G811,B695,D929,B84,G578,H201,G745,H963,G185,B687,G662,H313,G853,H314,D336";

export { modulesString, fil1, fil2 };
