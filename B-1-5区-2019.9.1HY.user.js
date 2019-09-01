// ==UserScript==
// @name         B-1-5区-2019.9-1HY
// @namespace    http://tampermonkey.net/
// @version      2019.9.1
// @description  try to take over the world!
// @author       Lihaorong
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @exclude      http://sword.mud.yytou.
// @grant        none
// ==/UserScript== 520  620  720
// 找不到地方，放最头上，青龙目标
var tarNPC = null;
var tarNPCinterval = null;
var zhou4TaoFan = 0;
//帮派战 战场
var Parms1 = 0;
var Parms2 = 0;
var clanWarFlag = 0; //跨服 帮派战
var kuafuBossFlag = 0; //跨服 boss
//-------------------------分割线-----------
var isDelayCmd = 1, // 是否延迟命令
    cmdCache = [],      // 命令池
    timeCmd = null,     // 定时器句柄
    paustStatus = 0,   //是否暂停执行
    cmdDelayTime = 200; // 命令延迟时间

function go_reset() {
    cmdCache = [],      // 命令池
        paustStatus = 0,   //是否暂停执行
        cmdDelayTime = 200; // 命令延迟时间
}


// 执行命令串
function go(str) {
    var arr = str.split(";");
    if (isDelayCmd && cmdDelayTime) {
        // 把命令存入命令池中
        cmdCache = cmdCache.concat(arr);

        // 当前如果命令没在执行则开始执行
        if (!timeCmd) delayCmd();
    } else {
        for (var i = 0; i < arr.length; i++) clickButton(arr[i]);
    }
}

// 执行命令池中的命令
function delayCmd() {
    // 执行命令池中第一个命令，并从池中删除
    if (paustStatus === 1) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
        return;
    }
    var cmd = cmdCache.shift();
    if (!cmd) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
        //    console.log("cmd error!");
        return;

    }
    var arr = cmd.split(",");
    if (!arr) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
        console.log("arr error!");
        return;

    }
    if (!sock) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
        console.log("sock error!");
        return;
    }
    if (paustStatus === 0) {

        if (isContains(arr[0], 'halt') ||
            isContains(arr[0], 'kill') ||
            isContains(arr[0], 'fight')) {
            paustStatus = 1;
        }
        if (isContains(arr[0], 'eval')) {
            console.log(arr[0].replace('eval_', ''));
            eval(arr[0].replace('eval_', ''));

        } else {

            clickButton(arr[0]);
        }
    }
    for (var i = arr.length - 1; i > 0; i--) {
        cmdCache.unshift(arr[i]);
    }

    // 如果命令池还有命令，则延时继续执行
    if (cmdCache.length > 0) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
    } else {
        // 没有命令 则归零
        timeCmd = 1;
        setTimeout(function () {
            if (cmdCache.length === 0)
                timeCmd = 0;
            else
                delayCmd();
        }, cmdDelayTime);
    }

}
// 停止执行
function stopDelayCmd() {
    // 清除计时器
    clearTimeout(timeCmd);

    // 归零计时器
    timeCmd = 0;

    // 清除命令池
    cmdCache = [];
}

function halt_move() {
    if ($('button.cmd_click_room').text() == "山门广场" ||
        isContains($('span.outbig_text').text(), '战斗结束')) {
        paustStatus = 0;
        return;
    }
    if ($('button.cmd_click_room').text() == "黄盖峰山道" ||
        isContains($('span.outbig_text').text(), '战斗结束')) {
        paustStatus = 0;
        return;
    }
    setTimeout(halt_move, 1000);
}


function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

//按钮加入窗体中----------------------------
var btnList = {};       // 按钮列表
var buttonWidth = '70px';   // 按钮宽度
var buttonHeight = '22px';  // 按钮高度
var currentPos = 0;        // 当前按钮距离顶端高度，初始130
var delta = 20;                 // 每个按钮间隔
// 弹窗设置
var btnBox0 = document.createElement('div');
btnBox0.style.position = 'absolute';
btnBox0.style.top = '0px'; //调整距离顶部高度
btnBox0.style.right = '0px'; //调整距离页面左边高度
btnBox0.style.width = buttonWidth;
document.body.appendChild(btnBox0);

function createButton(a, b, c) {
    btnList[a] = document.createElement('button');
    var d = btnList[a];
    d.innerText = a;
    d.style.marginTop = currentPos + "px";
    d.style.padding = '0px';
    d.style.width = '100%';
    d.style.lineHeight = buttonHeight;
    d.style.height = buttonHeight;
    d.addEventListener('click', c);
    document.body.appendChild(d);
    b.appendChild(d);
}
var popbk = {};
var popList = {};

function createPop(a) {
    popbk[a] = document.createElement('div');
    var b = popbk[a];
    b.style.position = 'absolute';
    b.style.top = '0';
    b.style.width = '100%';
    b.style.height = '100%';
    b.style.zIndex = '100';
    b.style.display = 'none';
    document.body.appendChild(b);
    var c = document.createElement('div');
    c.style.position = 'absolute';
    c.style.top = '0';
    c.style.width = '100%';
    c.style.height = '100%';
    b.appendChild(c);
    c.addEventListener('click', closepop);

    function closepop() {
        b.style.display = 'none';
    }
    popList[a] = document.createElement('div');
    var d = popList[a];
    d.style.position = 'absolute';
    d.style.top = '100px';
    d.style.left = '50%';
    d.style.width = '265px';
    d.style.padding = '10px 5px 10px 0px';
    d.style.marginLeft = '-132px';
    d.style.background = '#f0f0f0';
    d.style.textAlign = 'center';
    d.style.border = '2px solid #ccc';
    b.appendChild(d);
    return b;
}

function createPopButton(a, b, c) {
    btnList[a] = document.createElement('button');
    var d = btnList[a];
    d.innerText = a;
    d.style.padding = '0';
    d.style.margin = '5px 0 0 5px';
    d.style.width = '60px';
    d.style.height = '20px';
    d.style.height = buttonHeight;
    d.addEventListener('click', c);
    popList[b].appendChild(d);
    d.onmouseup = function () {
        popbk[b].style.display = 'none';
    };
}

//按钮列表----------------------------------
createButton('签到', btnBox0, CheckInFunc);
createButton('开领奖',btnBox0,getRewardsFunc);
createButton('晚安', btnBox0, Goodnight);
createButton('外传日常', btnBox0, WaiZhuanRiChangFunc);
createButton('直通车', btnBox0, ZhiTongCheFunc);
createButton('辅助集合', btnBox0, FuZhuJiFunc);
createButton('整理包裹', btnBox0, clearBag);
createButton('逃跑', btnBox0, escapeFunc);
createButton('摸尸体', btnBox0, AutoGetFunc);
createButton('一键恢复', btnBox0, yijianhuifuFunc);
createButton('战斗装', btnBox0, ZhuangBei);
createButton('兽雀', btnBox0, shouqueFunc);
createButton('白陀', btnBox0, baituoFunc);
//隐藏所有按钮的按钮----------------------------------
var buttonhiden = 0;
function buttonhideFunc() {
    if (buttonhiden == 0) {
        buttonhiden = 1;
        hideButton();
    } else {
        buttonhiden = 0;
        showButton();
    }
}
function hideButton() {
    btnBox0.style.visibility = "hidden";
    btnList['签到'].style.visibility = "hidden";
    btnList['开领奖'].style.visibility="hidden";
    btnList['晚安'].style.visibility = "hidden";
    btnList['外传日常'].style.visibility = "hidden";
    btnList['直通车'].style.visibility = "hidden";
    btnList['辅助集合'].style.visibility = "hidden";
    btnList['整理包裹'].style.visibility = "hidden";
    btnList['逃跑'].style.visibility = "hidden";
    btnList['摸尸体'].style.visibility = "hidden";
    btnList['一键恢复'].style.visibility = "hidden";
    btnList['战斗装'].style.visibility = "hidden";
    btnList['兽雀'].style.visibility = "hidden";
    btnList['白陀'].style.visibility = "hidden";
}
function showButton() {
    btnBox0.style.visibility = "visible";
    btnList['签到'].style.visibility = "visible";
    btnList['开领奖'].style.visibility="visible";
    btnList['晚安'].style.visibility = "visible";
    btnList['外传日常'].style.visibility = "visible";
    btnList['直通车'].style.visibility = "visible";
    btnList['辅助集合'].style.visibility = "visible";
    btnList['整理包裹'].style.visibility = "visible";
    btnList['逃跑'].style.visibility = "visible";
    btnList['摸尸体'].style.visibility = "visible";
    btnList['一键恢复'].style.visibility = "visible";
    btnList['战斗装'].style.visibility = "visible";
    btnList['兽雀'].style.visibility = "visible";
    btnList['白陀'].style.visibility = "visible";
}

//叫杀NPC-----------------------------------------------------------------------------------------------------
function Getnpcid() { tarNPC = prompt("输入NPC的ID", "changan_neigongjinwei"); }
function killnpc() {
    console.log(tarNPC);
    clickButton('kill ' + tarNPC);
}

//直通==================================================
function ZhiTongCheFunc() {
    ztc_popbk.style.display = "";
}
var ztc_popbk = createPop('直通车');
popList['直通车'].innerHTML = '<div>选择目的地</div>';

//铁血求教--------------------------------------------------
createPopButton('铁血求教','直通车',tiexueqiujiaoFunc);
function tiexueqiujiaoFunc(){
    go("jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;");
}
//木人--------------------------------------------------
createPopButton('木人','直通车',murenFunc);
function murenFunc(){ go("jh 41;se;e;e;se;se;se;se;se;se;event_1_57976870;n;n;n;event_1_91914705;"); }
//云海绝杀--------------------------------------------------
createPopButton('绝杀', '直通车', jsFunc);
function jsFunc() { go("jh 44;n;n;n;n;e;ne;ne;ne;n;n;n;n;n;nw;nw;nw;w;n;n;n;n;w;n;n;n;n;w;n;e;e;n;n;n;n;n;n;n;n;"); }
//邪分级--------------------------------------------------
createPopButton('邪分级', '直通车', xfjFunc);
function xfjFunc() { go("jh 44;n;n;n;n;e;ne;ne;ne;n;n;n;n;n;nw;nw;nw;w;n;n;n;e;e;e;e;e;e;n;n;n;n;n;n;n;n;n;n;n;n;n;;e;e;ne;ne;e;se;se;se;"); }

//幽冥门口--------------------------------------------------
createPopButton('幽冥副本', '直通车', YMfbFunc);
function YMfbFunc() { go("jh 45;ne;ne;n;n;ne;ne;e;ne;n;n;n;n;n;ne;ne;n;n;n;nw;nw;n;e;e;e;e;e;"); }

//--------------------飞格斗跑路------------------------------
createPopButton('通天寺', '直通车', ttsFunc);
function ttsFunc() { go("home;rank go 187;s;e;e;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;e;e;se;s;s;e;e;e;s;s;"); }

//直达秦王--------------------------------------------------
createPopButton('西安秦王', '直通车', QinWangFunc);
function QinWangFunc() {
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;w;w;n;n;n;n;n;n;n;n;");
}
//直达凌烟阁------------------------------------------------
createPopButton('凌烟阁', '直通车', lingyangeFunc);
function lingyangeFunc() {
    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;e;e;e;e;e;n;n;n;n;n;n;n;n;n;n;n;n;n;n;');
}
//直达赌坊--------------------------------------------------
createPopButton('西安赌坊', '直通车', goldFunc);
function goldFunc() {
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;w;w;w;w");
}
//直达明德门--------------------------------------------------
createPopButton('明德门', '直通车', MingDeMenFunc);
function MingDeMenFunc() {
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;");
}
//东市大街--------------------------------------------------
createPopButton('东市大街', '直通车', DongShiDaJieFunc);
function DongShiDaJieFunc() {
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;e;n;e;e;n;");
}
//西市大街--------------------------------------------------
createPopButton('西市大街', '直通车', XiShiDaJieFunc);
function XiShiDaJieFunc() {
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;n;w;w;n;");
}
//遇剑阁----------------------------------------------------
createPopButton('遇剑阁', '直通车', YuJianGeFunc);
function YuJianGeFunc() {
    go("jh 10;w;n;event_1_74091319;ne;n;sw;w;w;nw;w;ne;n;n;n;n;");
}
//闻人毅----------------------------------------------------
createPopButton('闻人毅', '直通车', BaiTuoWenRenYiFunc);
function BaiTuoWenRenYiFunc() {
    go("jh 21;nw;w;w;nw;nw;nw;n;w;s;event_1_47975698;s;s;sw;s;ne;e;s;s;");
}
//浣花剑派--------------------------------------------------
createPopButton('浣花贪狼', '直通车', HuanHuaJianPaiFunc);
function HuanHuaJianPaiFunc() {
    go("jh 14;sw;s;e;s;s;sw;sw;w;w;s;s;e;e;e;n;ne;e;se;s;se;e;ne;n;");
}
//西夏堂----------------------------------------------------
createPopButton('西夏堂', '直通车', XiXiaTangFunc);
function XiXiaTangFunc() {
    go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;nw;w;n;nw;n;ne;");
}

//无名山峡谷----------------------------------------------------
createPopButton('无名山谷', '直通车', WuMingFunc);

//冰火岛----------------------------------------------------
createPopButton('冰火日常', '直通车', BinghuoFunc);
function BinghuoFunc() {
    go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;home'); //冰火岛玄重铁
}

//射雕----------------------------------------------------
createPopButton('射雕', '直通车', shediaoFunc);
function shediaoFunc() {
    go("jh 28;n;w;w;w;w;w;w;nw;ne;nw;ne;nw;ne;e");//射雕
    setTimeout(tutuFunc, 3500);
}

function tutuFunc() {
    if (isContains($('span:contains(臂力达到)').text().slice(-13), '臂力达到87以上才能射雕。')) {
        console.log('臂力不足')
        return;
    }
    if (isContains($('span:contains(每次射雕)').text().slice(-17), '每次射雕需要白羽箭，你目前没有箭。')) {
        console.log('no arrow')
        return;
    }
    if (gangsFightControl() == "N") { //没进战斗， 射一发
        go('shediao', 0);
        setTimeout(tutuFunc, 500);
    }
}

//帮派称号----------------------------------------------------
createPopButton('帮派称号', '直通车', bzch);
function bzch() {
    go('jh 14;sw;s;e;s;s;sw;sw;w;w;s;s;e');//江湖侠客壁
}

//嵬名元昊--------------------------------------------------------
createPopButton('嵬名元昊', '直通车', wmyh);
function wmyh() {
    go('jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;nw;w;n;nw;n;ne;e;ne;se');//江湖侠客壁
}

//天山权杖--------------------------------------------------
createPopButton('天山权杖', '直通车', tsquanzhangFunc);
function tsquanzhangFunc() {
    go('jh 39;ne;e;n;nw;nw;w;s;s;sw;n;nw;e;sw;w;s;w;n;w;');//天山权杖宝箱
}

//欧阳敏--------------------------------------------------
createPopButton('欧阳敏', '直通车', oym);
function oym() {
    go("jh 14;w;n;n;n;n;ask tangmen_tangyun;ask tangmen_tangyun;ask tangmen_tangyun;s;e;e;n;n;ask tangmen_tangmei;ask tangmen_tangmei;ask tangmen_tangmei;e;event_1_8413183;event_1_39383240;e;s;e;n;w;n;n;");
}

//林祖师--------------------------------------------------
createPopButton('林祖师', '直通车', lzs);
function lzs() {
    go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;s;s;s;e;e;event_1_3723773;se;n;e;s;e;s;e;");
}

//铁尸--------------------------------------------------
createPopButton('铁尸', '直通车', ts);
function ts() {
    go("jh 21;nw;w;w;nw;n;n;n;n;n;n;n;n;ne;n;n;s;s;s;sw;nw;sw;sw;nw;nw;se;sw;");
}
//机关城--------------------------------------------------
createPopButton('墨家荆轲', '直通车', Jgc);
function Jgc() {
    go("jh 42;nw;ne;n;w;n;e;e;nw;w;ne;se;n;nw;w;n;e;n;n;n;n;n;n;");
}

//机关城--------------------------------------------------
createPopButton('神龙山', '直通车', Sls);
function Sls() {
    go("jh 42;nw;ne;n;w;n;e;e;nw;w;ne;se;n;nw;w;n;e;n;n;n;n;e;e;n;n;event_1_39026213;n;ne;se;s;event_1_623818;");
}

//机关城--------------------------------------------------
createPopButton('蟠龙湖', '直通车', Plh);
function Plh() {
    go("jh 42;nw;ne;n;w;n;e;e;nw;w;ne;se;n;nw;w;n;e;n;n;n;n;e;e;n;n;event_1_39026213;n;ne;se;s;event_1_623818;e;s;e;s;ne;s;sw;nw;s;se;");
}

//机关城--------------------------------------------------
createPopButton('石板大道', '直通车', Sbdd);
function Sbdd() {
    go("jh 42;nw;ne;n;w;n;e;e;nw;w;ne;se;n;nw;w;n;e;n;n;n;n;e;e;n;n;event_1_39026213;n;ne;se;s;event_1_623818;e;n;e;s;e;n;nw;e;nw;");
}

//慕容芳菱--------------------------------------------------
createPopButton('慕容芳菱', '直通车', Mrfl);
function Mrfl() {
    go("jh 32;n;n;se;e;s;s;event_1_99232080;e;e;s;e;s;e;e;e;kill miaojiang_hejiaozhu;");
}

//外传日常集合---------------------------------------------------------------------------------------------------------
function WaiZhuanRiChangFunc() {
    wzrc_popbk.style.display = "";
}
var wzrc_popbk = createPop('外传日常');
popList['外传日常'].innerHTML = '<div>选择日常</div>';
//createPopButton('开答题', '外传日常', answerQuestionsFunc);
//createPopButton('签到','外传日常',CheckInFunc);
createPopButton('V师帮', '外传日常', bangpaiANDshimenFunc);
//createPopButton('大昭壁画', '外传日常', MianBiFunc);
//createPopButton('侠客日常', '外传日常', xiakedao1);
createPopButton('冰月谷', '外传日常', bingyueFunc);
createPopButton('试剑', '外传日常', ShiJieFunc);
createPopButton('比试铜人', '外传日常', BiShiTongRenFunc);
createPopButton('本六', '外传日常', InstanceSix);
//createPopButton('苗疆炼药', '外传日常', MjlyFunc);
createPopButton('铁血日常', '外传日常', TiexueFunc);
//createPopButton('天山挂机', '外传日常', TsdzFunc);
createPopButton('打榜', '外传日常', PaiHangFunc);
//createPopButton('特殊正邪', '外传日常', DiTuSuiPianFunc);
createPopButton('天山七剑', '外传日常', TianShanQiJianFunc);
//createPopButton('白坨闯阵', '外传日常', pozhenFunc);
//createPopButton('青城孽龙', '外传日常', nielongFunc);
//createPopButton('峨眉解围', '外传日常', JinlangFunc);
//createPopButton('恒山杀神', '外传日常', shashenFunc);
//createPopButton('少林伏魔', '外传日常', dujieFunc);
//createPopButton('白坨奇袭', '外传日常', tuxiFunc);
createPopButton('毒魔', '外传日常', KunLunFeiDuFunc);
//createPopButton('V外传', '外传日常', waizhuanQuandianFunc);// 元宝点2-白坨闯阵，3-青城孽龙，5-峨眉解围，10-恒山山贼，11-唐门试炼； 12-长安糖葫芦，13-峨眉再战孤城，14-扬州听琴，15-少林伏魔，16-白坨奇袭   捐金锭换果子；帮本1，卖蛋壳
createPopButton('自动一条', '外传日常', behqOneKeyFunc);// 自动打这四个外传

//青白孽峨帮本1 全点完-------------------------
// 元宝点2-白坨闯阵，3-青城孽龙，5-峨眉解围，10-恒山山贼，12-长安糖葫芦，13-峨眉再战孤城，15-少林伏魔，16-白坨奇袭   捐金锭换果子；帮本1，卖蛋壳
function waizhuanQuandianFunc() {
    // go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;n;w;w;n;w;event_1_712982 go;");
    go('daily finish 2;daily finish 3;daily finish 5;daily finish 10;daily finish 11;daily finish 12;daily finish 13;daily finish 14;daily finish 15;daily finish 16;clan fb go_saodang shenshousenlin;');
    go('jh 8;ne;e;e;e;n;n;n;n;n;e;e;n;event_1_19360932 go;home;');
    go('jh 1;e;n;n;n;w;event_1_47493781;home;');
}

//白，峨，恒，青一键
function behqOneKeyFunc() {
    //白驼军阵
    go('jh 21;n;n;n;n;w;kill baituo_qingyidunwei;w;kill baituo_feiyushenjian;w;kill baituo_yinlangjinwei;w;fight baituo_junzhongzhushuai;home');
    //峨眉金狼 领果子
    go('jh 8;ne;e;e;e;n;kill emei_chibaosishi;n;n;kill emei_heiyingsishi;n;n;kill emei_jinlangdajiang;e;e;n;event_1_19360932 go;s;e;event_1_55885405;w;n;kill emei_qili;s;s;kill emei_heiyudijiang;n;w;s;kill emei_abaojia;n;e;e;event_1_53216521;home;');
    //恒山盗贼
    go('jh 9;event_1_20960851;kill henshan_shashenzhaifeishou;home');
    //杀孽龙
    go('jh 15;n;nw;w;nw;n;event_1_14401179;kill qingcheng_nielongzhiling;home');
    //渡劫
    go('jh 13;e;s;s;w;w;w;event_1_38874360;kill shaolin_duyunshenshi;');
    //突袭
    go('jh 21;n;n;n;n;e;e;e;e;e;e;e;s;s;event_1_66710076;s;e;ne;e;se;n;event_1_53430818;n;kill baituo_baojunzhushuai;s;s;nw;n;n;kill baituo_hujunzhushuai;s;s;se;e;e;e;kill baituo_yingjunzhushuai;w;w;w;nw;w;nw;event_1_89411813;kill baituo_xieli;')
    //毒魔
    //go("jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;n;n;n;n;w;nw;nw;event_1_70957287;kill mingjiao_jiuyoudumo;home;");
}

//白驼军阵----------------------------------------------------
function pozhenFunc() {
    go('jh 21;n;n;n;n;w;');
}
//青城孽龙----------------------------------------------------
function nielongFunc() {
    go('jh 15;n;nw;w;nw;n;event_1_14401179;');
}
//恒山杀神----------------------------------------------------
function shashenFunc() {
    go('jh 9;event_1_20960851;');
}

//峨眉金狼 领果子
function JinlangFunc() {
    go('jh 8;ne;e;e;e;n;kill emei_chibaosishi;n;n;kill emei_heiyingsishi;n;n;kill emei_jinlangdajiang;e;e;n;event_1_19360932 go;home');
}


//少林渡劫-----------------------
function dujieFunc() {
    go('jh 13;e;s;s;w;w;w;event_1_38874360;');
}

//白驼突袭----------------------------
function tuxiFunc() {
    go('jh 21;n;n;n;n;e;e;e;e;e;e;e;s;s;event_1_66710076;s;e;ne;e;se;n;event_1_53430818;n;kill baituo_baojunzhushuai;s;s;nw;n;n;kill baituo_hujunzhushuai;s;s;se;e;e;e;kill baituo_yingjunzhushuai;w;w;w;nw;w;nw;event_1_89411813;kill baituo_xieli;');
}

//昆仑飞渡-毒魔---------------------------------------------------
function KunLunFeiDuFunc() {
    go("jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;n;n;n;n;w;nw;nw;event_1_70957287;");
}
//天山七剑----------------------------------------------------
function TianShanQiJianFunc() {
    setTimeout(QiJian1Func, 200);
}
function QiJian1Func() {
    go('jh 39;ne;e;n;ne;ne;n;ne;nw;ne;nw;event_1_17801939;');
    setTimeout(QiJian2Func, 5000);
}
function QiJian2Func() {
    if (g_obj_map.get("msg_room") == undefined) {
        setTimeout(function () { QiJian2Func(); }, 200);
    } else {
        var locationname = g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        if (locationname == "星星峡") {
            console.log("。");
            go('ne;ne;nw;nw;');
        } else {
            setTimeout(QiJian1Func, 200);
        }
    }
}

// 签到--------------------------------------------------------
function CheckInFunc() {
    go('jh 1;look_npc snow_mercenary;eval_startFengyi();zhounian_lb;lq_znboss_rewards');
    //go('jh 1;w;event_1_46497436;home;');//纪念金庸
    go('jh 5;n;n;e;look_npc yangzhou_yangzhou9;eval_startShuanger();');//扬州双儿礼包
    go('home;vip drops;shop money_buy mny_shop1_N_10');//领通勤
    // go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
    go('vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig');//挖宝
    go('vip finish_fb dulongzhai;vip finish_fb dulongzhai;vip finish_fb junying;vip finish_fb junying;vip finish_fb beidou;vip finish_fb beidou;vip finish_fb youling;vip finish_fb youling;vip finish_fb siyu;vip finish_fb changleweiyang;');//副本扫荡
    go('vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;');//钓鱼
    go('clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan buy 302;clan buy 302;clan buy 302;clan buy 302;clan buy 302;clan buy 401;clan buy 501;clan buy 601;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;');//上香
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 6;share_ok 7;");//分享
    go('cangjian get_all;xueyin_shenbinggu blade get_all;xueyin_shenbinggu unarmed get_all;xueyin_shenbinggu throwing get_all;xueyin_shenbinggu spear get_all;xueyin_shenbinggu stick get_all');//闯楼奖励
    go("jh 1;e;e;event_1_63788647;w;n;e;e;e;e;n;lq_bysf_lb;lq_lmyh_lb;home;");//比翼双飞和劳模英豪
    go('jh 2;n;n;n;n;n;n;n;e;tzjh;touzi_jihua2 buygo 6;tzjh_lq;w;n;n;n;n;n;n;n;n;n;n;n;n;e;n;n;n;w;event_1_31320275;home');//采莲
    go('jh 5;n;n;n;w;sign7;home;');//扬州签到
    // go("jh 5;n;n;n;n;n;n;n;n;w;w;w;s;e;e;s;s;e;e;s;s;s;event_1_30729073;event_1_30729073 go;home");//扬州听琴
    // go('jh 14;sw;s;e;s;s;sw;sw;w;w;s;s;e;e;e;n;ne;event_1_56989555 go;home');//唐门试炼
    go('jh 26;w;w;n;e;e;event_1_18075497;home');//大招采矿
    go('jh 26;w;w;n;n;event_1_14435995;home');//大招破阵
    go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home");//绝情谷鳄鱼
    go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;home'); //冰火岛玄重铁
    //go("eval_shediaoFunc()");//射雕
}
//晚安----------------------------------------------------------------------------
function Goodnight() {
    go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;event_1_29721519;event_1_60133236;home;exercise;sleep_hanyuchuang;sort;sort fetch_reward;');//消费积分和谜题卡百宝排行榜
    //  go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
    //20次邪气
    //go('vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;');//20次正邪
    // go('vip finish_taofan 2;vip finish_taofan 2;vip finish_taofan 2;vip finish_taofan 2;vip finish_taofan 2;');//5次逃犯
    //25次师门
    //go('vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;');
    //20次帮派
    //go('vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;');
    //   go('look_room public_op12;daily finish 0;daily finish 2;daily finish 3;daily finish 5;daily finish 6;daily finish 7;daily finish 10;daily finish 11;daily finish 13;daily finish 14;daily finish 15;daily finish 16;');//日常
}

function startFengyi() {
    console.log("startfengyi");
    var npc = g_obj_map.get("msg_npc");
    if (npc == undefined) {
        setTimeout(startFengyi, 500);
    } else if (npc.get("id") != "snow_mercenary") {
        setTimeout(startFengyi, 500);
    } else {
        for (var i = 1; i < 10; i++) {
            console.log(npc.get("cmd" + i + "_name"));
            if (npc.get("cmd" + i + "_name") == undefined)
                break;
            if (npc.get("cmd" + i + "_name").match("礼包") != null && npc.get("cmd" + i + "_name").match("1元") == null && npc.get("cmd" + i + "_name").match("兑换") == null) {
                var fengyilibao = npc.get("cmd" + i);
                console.log(fengyilibao);
                clickButton(fengyilibao, 1);
            }
        }
    }
}

//扬州双儿礼包
function startShuanger() {
    console.log("startshuanger = 双儿");
    var npc = g_obj_map.get("msg_npc");
    if (npc == undefined) {
        setTimeout(startShuanger, 500);
    } else if (npc.get("id") != "yangzhou_yangzhou9") {
        console.log(npc.get("id"));
        setTimeout(startShuanger, 500);
    } else {
        for (var i = 1; i < 10; i++) {
            console.log(npc.get("cmd" + i + "_name"));
            if (npc.get("cmd" + i + "_name") == undefined)
                break;
            if (npc.get("cmd" + i + "_name").match("礼包") != null && npc.get("cmd" + i + "_name").match("1元") == null && npc.get("cmd" + i + "_name").match("兑换") == null)
                var fengyilibao = npc.get("cmd" + i);
            console.log(fengyilibao);
            clickButton(fengyilibao, 1);
        }
        go('home;');
    }
}

// 领取奖励 ------------------------------------------------
function getRewardsFunc() {
    var getRewardsdelay = 100;
    var getRewardsInterval = 5 * 60 * 1000; // ms
    if (btnList["开领奖"].innerText == '开领奖') { // 处于未领奖状态，单击开始领奖,并将状态置于停领奖状态
        console.log("开始自动领取奖励！");
        scanEscapedFish();
        scanEscaped = setInterval(scanEscapedFish, getRewardsInterval);
        maikuli_i = setInterval(maikuli, 5000 + getRewardsdelay); // 干苦力, 5s
        duancha_i = setInterval(duancha, 10 * 1000 + getRewardsdelay); // 端茶送水, 10s
        dalie_i = setInterval(dalie, 5 * 60 * 1000 + getRewardsdelay); // 上山打猎, 5 min = 300 s
        btnList["开领奖"].innerText = '停领奖';
    } else {
        console.log("停止自动领取奖励！");
        clearInterval(scanEscaped);
        clearInterval(maikuli_i);
        clearInterval(duancha_i);
        clearInterval(dalie_i);
        btnList["开领奖"].innerText = '开领奖';
    }
}
function maikuli() {
    go('work click maikuli');
}
function duancha() {
    go('work click duancha');
}
function dalie() {
    go('work click dalie');
}
function baobiao() {
    go('work click baobiao');
}
function maiyi() {
    go('work click maiyi');
}
function xuncheng() {
    go('work click xuncheng');
}
function datufei() {
    go('work click datufei');
}
function dalei() {
    go('work click dalei');
}
function kangjijinbin() {
    go('work click kangjijinbin');
}
function zhidaodiying() {
    go('work click zhidaodiying');
}
function dantiaoqunmen() {
    go('work click dantiaoqunmen');
}
function shenshanxiulian() {
    go('work click shenshanxiulian');
}
function jianmenlipai() {
    go('work click jianmenlipai');
}
function dubawulin() {
    go('work click dubawulin;');
}
function youlijianghu() {
    go('work click youlijianghu;work click yibangmaoxiang;');
}
function zhengzhanzhongyuan() {
    go('work click youlijianghu;work click zhengzhanzhongyuan;');
}

function scanEscapedFish() {
    go('public_op3'); // 向师傅磕头
    maikuli();
    duancha();
    dalie();
    baobiao();
    maiyi();
    xuncheng();
    datufei();
    dalei();
    kangjijinbin();
    zhidaodiying();
    dantiaoqunmen();
    shenshanxiulian();
    jianmenlipai();
    dubawulin();
    youlijianghu();
    zhengzhanzhongyuan();
}


// 清谜题 -----------------------------------------------
function clearPuzzleFunc() {
    go('auto_tasks cancel');
    hideButton();
    hideButton1();
    buttonhidenall = 1

}


// 换装备 -------------------------------------------------------
function ZhuangBei() {
    if (btnList["战斗装"].innerText == '战斗装') {
        console.log("切换战斗装备！");
        go('auto_equip on');       // 一键装备
     go('unwield longwulianmoge_yuyemoqiang');//脱魔枪
     go('unwield longwulianmoge_fengleixuefu');//脱风雷
     go('unwield longwulianmoge_xiefoyaochui');//脱妖锤
     go('unwield weapon_sb_unarmed11');       // 脱拳套
     go('unwield weapon_sb_sword11');       // 脱轩辕剑
     go('unwield weapon_sb_spear12');       // 脱枪
     go('wield weapon_sb_unarmed11 rumai');       // 入脉破岳掌套
     go('wield weapon_sb_spear12');       // 穿枪
     go('wield weapon_sb_sword11');        //穿轩辕剑
     go('wield weapon_sb_stick12');        //穿破宇棍

        btnList["战斗装"].innerText = '打坐装';
    }
    else {
        console.log("切换打坐装备！");
     go('auto_equip on');       // 一键装备
     go('wield sword of windspring rumai');       // 风泉
    // go('wield sword of windspring');       // 风泉
     go('wear longyuan banzhi moke');       // 龙渊
     go('wear dream hat');       // 迷幻经纶equip_head_dashi_wushuang
     go('wear equip_head_dashi_wushuang');       // 迷幻经纶
        btnList["战斗装"].innerText = '战斗装';
    }
}

// 换装备 - 入脉 -------------------------------------------------------
function ZhuangBei2() {
    if (btnList["战斗装"].innerText == '战斗装') {
        console.log("切换战斗装备！");
        go('unwield weapon_sb_sword11');       // 脱轩辕
        go('wield weapon_sb_sword11 rumai');        //穿龙吟剑
        go('auto_equip on');       // 一键装备
        btnList["战斗装"].innerText = '打坐装';
    }
    else {
        console.log("切换打坐装备！");
        //     go('unwield weapon_sb_sword11');       // 脱轩辕剑
        go('wield sword of windspring rumai');       // 风泉
        go('wear longyuan banzhi moke');       // 龙渊
        go('wear dream hat');       // 迷幻经纶
        btnList["战斗装"].innerText = '战斗装';
    }
}
//正分级任务-------------------------
function baituoFunc() {
    go('home;jh 21;');     //飞白陀
}
// 摸尸体----------------------------------------------------
var AutoGet_targetName = "尸体";
var lootFlag = 0;
function AutoGetFunc() {
    if (lootFlag == 0) {
        AutoGet1();
        lootFlag = 1;
        btnList["摸尸体"].innerText = '摸一次';
    }
    else if (lootFlag == 1) {
        AutoGet1Func();
        lootFlag = 2;
        btnList["摸尸体"].innerText = '不停摸';
    }
    else {
        clearGet();
        btnList["摸尸体"].innerText = '摸尸体';
        lootFlag = 0;
    }
}
function AutoGet1Func() {
    AutoGet1IntervalFunc = setInterval(AutoGet1, 1000);
}

function clearGet() {
    clearInterval(AutoGet1IntervalFunc);
}

function AutoGet1() {
    $("button.cmd_click3").each(
        function () {
            if (isContains($(this).html(), AutoGet_targetName))
                eval($(this).attr("onclick").replace("look_item corpse", "get corpse"));
        });
}
function AutoKill1() {
        if ($('span.outbig_text:contains(战斗结束)').length > 0) {
            clickButton('prev_combat');
            nowXueTempCount = 0;
            console.log("AutoKill1 log");
            if (lootFlag == 1) { clickButton('golook_room'); setTimeout(AutoGet1, 300); }
            paustStatus = 0;
        }
    }

//====捡钥匙=====
function JianyaoshiFunc() {
    setTimeout(JYS, 10000);
}
function JYS() {
    go('get yin yaoshi');
    setTimeout(JianyaoshiFunc, 10000);
}
//快速师门帮派---------
function bangpaiANDshimenFunc() {
    //   alert("VIP专用\n\n请手动完成最后一个任务");
    var trueBeToDo = confirm("确定VIP点100师门60帮派么?令牌吃了没？");
    if (!trueBeToDo) {
        return;
    }
    // go("home;clan;clan scene;clan task;home;");
    // go('look_room;family_quest;home;');
    var num = 60;
    for (var i = 0; i < num; i++) { // 从第一个开始循环
        go('vip finish_clan'); //帮派
    }
    var nam = 100;
    for (var j = 0; j < nam; j++) { // 从第一个开始循环
        go('vip finish_family'); //师门
    }

}
//快速兽雀---------
function shouqueFunc() {
    //   alert("VIP专用\n\n请手动完成最后一个任务");
    var trueBeToDo = confirm("直接50次哦？受得了不");
    if (!trueBeToDo) {
        return;
    }
    // go("home;clan;clan scene;clan task;home;");
    // go('look_room;family_quest;home;');
    var num = 50;
    for (var i = 0; i < num; i++) { // 从第一个开始循环
        go('event_1_36867949 pay;event_1_36867949 take;event_1_36867949 take;event_1_36867949 get;prev;'); //每轮追击一次
    }

}


// 打榜日常----------------------------
function PaiHangFunc() {
    if (btnList["打榜"].innerText == '打榜') {
        btnList["打榜"].innerText = '停止打榜';
        go('home');
        go('sort');
        go('fight_hero 1');
        setTimeout(AutoPaiHangFunc, 3000);//code
    }
}
function AutoPaiHangFunc() {
    if (isContains($('span:contains(今日挑战)').text().slice(-19), '今日挑战高手的次数已达上限，明日再来。')) {
        paustStatus = 0;
        btnList["打榜"].innerText = '打榜';
        console.log('打完收工！');
    }
    else {
        go('fight_hero 1');
        setTimeout(AutoPaiHangFunc, 3000);//code
    }
}


// 试剑----------------------------
function ShiJieFunc() {
    go('home');
    go('swords');
    go('swords select_member gaibang_hong');  //洪帮主
    go('swords select_member dali_yideng');   //古灯大师
    go('swords select_member gumu_yangguo');   //神雕大侠
    go('swords fight_test go');
    setTimeout(Shijie1, 1000);//code
}
function Shijie1() {
    if (isContains($('span:contains(你今天)').text().slice(-12), '你今天试剑次数已达限额。')) {
        paustStatus = 0;
        console.log('打完收工！');
    }
    else {
        go('swords fight_test go');
        setTimeout(Shijie1, 1000);//code
    }
}


//辅助集合-----------------------------------------------------------------------------------------------------------
function FuZhuJiFunc() {
    fzj_popbk.style.display = "";
}
var fzj_popbk = createPop('辅助集合');
popList['辅助集合'].innerHTML = '<div>辅助功能</div>';

createPopButton('设置ID', '辅助集合', Getnpcid);
createPopButton('叫杀ID', '辅助集合', killnpc);
//createPopButton('谜题卡', '辅助集合', MiTiKaFunc);
createPopButton('掌门手谕', '辅助集合', ZhangMenShouYuFunc);
createPopButton('刷碎片', '辅助集合', SnakeFunc);
//createPopButton('刷年兽', '辅助集合', XueTingNianShouFunc);
//createPopButton('刷姥姥', '辅助集合', ShuaLaoLaoFunc);
createPopButton('清谜题', '辅助集合', clearPuzzleFunc);
//createPopButton('洛阳理财', '辅助集合', LuoYangLiCaiFunc);
createPopButton('风泉剑', '辅助集合', FengquanFunc);
//createPopButton('买灵芝', '辅助集合', buyMedecineFunc);
//createPopButton('买白羽箭', '辅助集合', buyArrowFunc);
//createPopButton('买糖葫芦', '辅助集合', buyTanghuluFunc);
//createPopButton('谜题密码', '辅助集合', quizCodeFunc);
createPopButton('捡钥匙', '辅助集合', JianyaoshiFunc);
//createPopButton('合宝石', '辅助集合', heBaoshi);
createPopButton('开白银', '辅助集合', KaibaiyinFunc);
createPopButton('开青木', '辅助集合', KaiqingmuFunc);
//开白银--------------------------------------------------
function KaibaiyinFunc() {
    var numb1 = 10;
    for (var i = 0; i < numb1; i++) { // 从第一个开始循环
        function KBY(){
        go("items;items use baiyin box_N_100"); //开白银
        }
        setTimeout(KBY,300);
    }
}
//开青木--------------------------------------------------
function KaiqingmuFunc() {
   var numb2 = 10;
    for (var i = 0; i < numb2; i++) { // 从第一个开始循环
       function KQM(){
        go("items;items use obj_qingmubaoxiang_N_100"); //开青木
         }
         setTimeout(KQM,300);
    }
}

//买糖葫芦--------------------------------------------------
function buyTanghuluFunc() {
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;n;w;w;n;w;event_1_712982 go;");
}

// 掌门手谕-----------------------------------------------------
function ZhangMenShouYuFunc() {
    go("jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w;event_1_57688376;n;n;e;n;event_1_88625473;event_1_82116250;event_1_90680562;event_1_38586637;fight xiaoyao_tonglao");
}
// 刷姥姥-------------------------------------------------------
var sll_time;
function ShuaLaoLaoFunc() {
    clickButton('swords', 0);
    clearInterval(sll_time);
    sll_time = setInterval(sll, 200);
}

function sll() {
    var a = $('#out .out2').text();
    if (a.indexOf('天山姥姥') != -1) {
        clearInterval(sll_time);
    } else {
        clickButton('swords next_swords_try change');
    }
}
// 刷年兽-----------------------------------------------------
function XueTingNianShouFunc() {
    go("jh 1;e;n;n;n;n;n;");
}

// 谜题密码-----------------------------------------------------
function quizCodeFunc() {
    go("jh 1;e;n;n;n;n;w;event_1_65953349;");
}
// 洛阳理财-----------------------------------------------------
function LuoYangLiCaiFunc() {
    go("jh 2;n;n;n;n;n;n;n;e;tzjh_lq;home");
}
//使用谜题卡----------------------------------------------------
function MiTiKaFunc() {
    clickButton('items use miticska', 0);
}
// 买灵芝-------------------------------------------------------
function buyMedecineFunc() {
    var a;
    a = parseInt(prompt("请输入购买数量：", "10"));
    if (a != null) {
        go("jh 1;e;n;n;n;w;");
        nextgo = function () {
            if (a >= 10) {
                a = Math.floor(a / 10);
                go_rp('buy /map/snow/obj/qiannianlingzhi_N_10 from snow_herbalist', a);
            } else {
                go_rp('buy /map/snow/obj/qiannianlingzhi from snow_herbalist', a);
            }
        };
    }
}

// 买白羽箭囊-------------------------------------------------------
function buyArrowFunc() {
    var a;
    a = parseInt(prompt("请输入购买数量：", "6"));
    if (a != null) {
        go("jh 15;s;s;s;s;w;");
        for (var i = 0; i < a; i++) {
            go('event_1_69194627 go', 1);
            go('items use obj_baiyujian_bao', 1);
        }
    }
}


// 刷碎片 ----------------------------
var SnakeName = 'luoyang_luoyang20';

function SnakeFunc() {
    if (!(counthead = prompt("请输入剩余数量", "20"))) {
        return;
    }
    go('jh 2;n;n;n;n;n;n;n;n;n;e;');
    go('kill ' + SnakeName);
    setTimeout(killsnake, 500);
}


function killsnake() {
    if ($('span:contains(胜利)').text().slice(-3) == '胜利！') {
        clickButton('prev_combat');
        nowXueTempCount = 0;
        if (counthead > 1) {
            counthead = counthead - 1;
            console.log('杀人一次，剩余杀人次数：%d！', counthead);
            go('kill ' + SnakeName);
        }
        else {
            console.log('刷完了！');
            go('home');
            return;  // 终止
        }
    }
    else {
        if (is_fighting)
            ninesword();
        else
            go('kill ' + SnakeName);
    }
    setTimeout(killsnake, 500);
}

//一键侠客岛--------------------
//sendtell();
function xiakedao1() {
    go("jh 36");
    go('yell', 0);
    xiakedao2();
}

function xiakedao2() {
    if (g_obj_map.get("msg_room") == undefined) {
        setTimeout(function () { xiakedao2(); }, 200);
    } else {
        var locationname = g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        if ((locationname == "侠客岛渡口")) {
            go('e;ne;ne;ne;e;e;e;event_1_9179222;e;event_1_11720543;w;n;e;e;s;e;event_1_44025101;');
            setTimeout(function () { xiakedao3(); }, 500);
        } else {
            setTimeout(function () { xiakedao2(); }, 500);
        }
    }
}
function xiakedao3() {
    if (g_obj_map.get("msg_room") == undefined) {
        setTimeout(function () { xiakedao3(); }, 200);
    } else {
        var locationname = g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        if (locationname == "崖底") {
            go('event_1_4788477;nw;w;sw;w;n;n;n;w;w;s;w;nw;ne;ne;ne;e;e;e;e;e;s;e;event_1_44025101');
            setTimeout(function () { xiakedao3(); }, 500);
        } else if (locationname == "石门") {
            console.log("进入石门")
            go('event_1_36230918;e;e;s;event_1_77496481;home;');
            console.log("侠客岛日常结束");
        } else {
            console.log("我在哪里？？")
            setTimeout(function () { xiakedao3(); }, 500);
        }
    }
}

//冰月谷-------------------------
function bingyueFunc() {
    go('jh 14;w;n;n;n;n;event_1_32682066;event_1_52117466;kill bingyuegu_baiyishaonv;event_1_65929969;kill bingyuegu_xuanwujiguanshou;event_1_17623983;event_1_6670148;kill bingyuegu_hundunyaoling;s;kill bingyuegu_bingyuexianren');
}
//跨服本1 极武坛 -------------------------
function JiWuTanFunc() {
    go('fb 1;w;s;e;kill jiwutan_jiwutandizi;e;kill jiwutan_shiergongmenren;e;e;e;nw;w;kill jiwutan_jiwutandizi;nw;kill jiwutan_shiergongmenren;nw;kill jiwutan_tianhai;se;se;ne;kill jiwutan_shiergongmenren;se;kill jiwutan_kunpeng;nw;sw;nw;e;kill jiwutan_xuetong;w;ne;kill jiwutan_zuifa;sw;w;kill jiwutan_jinxi;e;se;ne;n;kill jiwutan_yinbao;s;ne;kill jiwutan_shouxu;sw;e;kill jiwutan_xiaori;w;nw;kill jiwutan_diehun;se;sw;nw;n;kill jiwutan_huokuang;s;sw;kill jiwutan_dianxing;ne;se;ne;w;kill jiwutan_daoxing;e;sw;event_1_40536215;kill jiwutan_sanlaoshicong;n;kill jiwutan_sanlaoshicong');
}
//本六-------------------------
function InstanceSix() {
    //    go('home;fb 6;event_1_94101353;kill changleweiyang_dahonglu;home;fb 6;wield sword of windspring;event_1_8221898;wield weapon_sb_sword11;kill changleweiyang_taishuling;home;fb 6;event_1_18437151;kill changleweiyang_zhijinwu;home;fb 6;event_1_74386803;kill changleweiyang_wunvling;home');
    go('home;fb 6;event_1_94101353;kill changleweiyang_dahonglu;home;fb 6;;event_1_8221898;kill changleweiyang_taishuling;home;fb 6;event_1_18437151;kill changleweiyang_zhijinwu;home;fb 6;event_1_74386803;kill changleweiyang_wunvling;home');
}
//逃跑-------------------------
function escapeFunc() {
    if (btnList["逃跑"].innerText == '逃跑') {
        AutoEscapeFunc();
        btnList["逃跑"].innerText = '取消逃跑';
    }
    else {
        clearEscape();
        { btnList["逃跑"].innerText = '逃跑'; }
    }

    function AutoEscapeFunc() {
        // 间隔500毫秒逃跑一次
        AutoEscapeFuncIntervalFunc = setInterval(AutoEscape, 500);
    }

    function clearEscape() {
        clearInterval(AutoEscapeFuncIntervalFunc);
    }

    function AutoEscape() {
        clickButton('escape');     //逃跑
        if ($('span.outbig_text:contains(战斗结束)').length > 0) {
            clearEscape();
            btnList["逃跑"].innerText = '逃跑';
            clickButton('prev_combat');
            nowXueTempCount = 0;
        }
        else if ($('button.cmd_combat_byebye').length === 0) {
            clearEscape();
            btnList["逃跑"].innerText = '逃跑';
            clickButton('prev_combat');
            nowXueTempCount = 0;
        }
    }
}
var KFQLtrigger = 0;
function KFQLFunc() {
    if (KFQLtrigger == 0) {
        KFQLtrigger = 1;
        btnList1['青龙镖车'].innerText = '停止青龙';
    } else if (KFQLtrigger == 1) {
        KFQLtrigger = 0;
        btnList1['青龙镖车'].innerText = '青龙镖车';
    }
    getKFQLListenMessage()
}
//跨服Boss
var kuafuBossInterval;
function KuafuBossFunc() {
    var realmInfo = g_obj_map.get("msg_room").get("map_id");
    if (kuafuBossFlag == 0) {
        kuafuBossFlag = 1;
        btnList1['周年跨服'].innerText = '停周年';
        var locationname = g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        KuafuBossRun();
        //mySkillLists = "千影百伤棍,八荒功";

        clearInterval(kuafuBossInterval);
        //        kuafuBossInterval = setInterval(function(){ go("event_1_22857811;event_1_75706129;");}, 500);
        kuafuBossInterval = setInterval(function () { clickButton('kill kuafu_wushuanggongzhu'); clickButton('kill kuafu_buerjianke'); }, 1000);
    } else if (kuafuBossFlag == 1) {
        clearInterval(kuafuBossInterval);
        kuafuBossFlag = 0;
        btnList1['周年跨服'].innerText = '周年跨服';
       // mySkillLists = "燎原百破";
    }
}

function KuafuBossRun() {
    go("w;w;w;w;w;w;w;w;w;e;e;e;e;e;e;e;");
}
//主界面信息监控===============================================
function QinglongMon() { //各种监控大杂烩
   // allSkillLists = mySkillLists;
    this.dispatchMessage = function (b) {
        var type = b.get("type"), subType = b.get("subtype");
        // 监控撩奇侠
        if (type == "notice") { //handle notice
            var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
            if (msg.match("对你悄声道") != null) {
                QXStop = 1;
                //               alert(msg);
                btnList1["撩奇侠"].innerText.innerText = '继续奇侠';
                //                var mijing=msg.split("悄声道：你现在去")[1].split("，应当会有发现")[0];
                console.log(msg);
                if (msg.match("山坳") != null) { ShanAoFunc(); }
                if (msg.match("桃花泉") != null) { TaoHuaFunc(); }
                if (msg.match("千尺幢") != null) { QianChiFunc(); }
                if (msg.match("猢狲愁") != null) { HuSunFunc(); }
                if (msg.match("潭畔草地") != null) { CaoDiFunc(); }
                if (msg.match("临渊石台") != null) { ShiTaiFunc(); }
                if (msg.match("长空栈道") != null) { ShiTaiFunc1(); }
                if (msg.match("玉女峰") != null) { YuNvFunc(); }
                if (msg.match("沙丘小洞") != null) { ShaQiuFunc(); }
                if (msg.match("九老洞") != null) { JiuLaoFunc(); }
                if (msg.match("悬根松") != null) { XuanSongFunc(); }
                if (msg.match("夕阳岭") != null) { XiYangFunc(); }
                if (msg.match("青云坪") != null) { QingYunFunc(); }
                if (msg.match("玉壁瀑布") != null) { YuBiFunc(); }
                if (msg.match("湖边") != null) { HuBianFunc(); }
                if (msg.match("碧水寒潭") != null) { BiShuiFunc(); }
                if (msg.match("寒水潭") != null) { HanShuiFunc(); }
                if (msg.match("悬崖") != null) { GuMuXuanYaFunc(); }
                if (msg.match("戈壁") != null) { GeBiFunc(); }
                if (msg.match("卢崖瀑布") != null) { LuYaPuBuFunc(); }
                if (msg.match("启母石") != null) { QiMuFunc(); }
                if (msg.match("无极老姆洞") != null) { WuJiDongFunc(); }
                if (msg.match("山溪畔") != null) { WuJiDongFunc1(); }
                if (msg.match("奇槐坡") != null) { QiHuaiFunc(); }
                if (msg.match("天梯") != null) { TianTiFunc(); }
                if (msg.match("小洞天") != null) { XiaoDongFunc(); }
                if (msg.match("云步桥") != null) { YunBuFunc(); }
                if (msg.match("观景台") != null) { GuanJingFunc(); }
                if (msg.match("危崖前") != null) { WeiYaQianFunc(); }
                if (msg.match("草原") != null) { CaoYuanFunc(); }
                if (msg.match("无名山峡谷") != null) { WuMingFunc(); }
            }
            // 跨服青龙信息监控
            if (msg.match("你今天完成的跨服青龙战数量已经超量") != null) {
                KFQLtrigger = 0;
                btnList1['跨服青龙'].innerText = '跨服青龙';
                clearInterval(QinglongIntervalFunc);
                return;
            }
            if (msg.match("击败跨服青龙") != null) {
                clearInterval(QinglongIntervalFunc);
                return;
            }
            // 配合自动挂起命令
            if (msg.match("这儿没有这个人") != null || msg.match("这儿不能战斗") != null || msg.match("已经太多人了") != null || msg.match("宝藏秘图任务数量已经超量") != null || msg.match("你今天试剑次数已达限额") != null || msg.match("今日挑战高手的次数已达上限") != null) {
                paustStatus = 0;
                return;
            }

        }

        //主窗口监控信息
        if (type == "main_msg") {  //handle main message;
            var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
            //         console.log(msg);
            if ((msg.match("1-5区]") != null) && (KFQLtrigger == 1)) {
                //监控 1-5  青龙(周一、周二）-
                if ((msg.match("晚香玉") != null || msg.match("凌霄花") != null || msg.match("百宜雪梅") != null || msg.match("朝开暮落花") != null || msg.match("熙颜花") != null || msg.match("夕雾草") != null || msg.match("彼岸花") != null || msg.match("洛神花") != null || msg.match("碎片") != null || PTtrigger == 1) && (msg.match("荣威镖局") == null)) { // pt triggsuer = 1 是默认， =0 时 打所有跨服青龙
                    //                  if (( msg.match("晚香玉")!=null || msg.match("凌霄花")!=null || msg.match("百宜雪梅")!=null || msg.match("朝开暮落花")!=null || msg.match("凤凰木")!=null || msg.match("熙颜花")!=null || msg.match("君影草")!=null ||msg.match("矢车菊")!=null ||msg.match("忘忧草")!=null ||msg.match("仙客来")!=null ||msg.match("雪英")!=null ||msg.match("夕雾草")!=null ||  msg.match("彼岸花")!=null || msg.match("洛神花")!=null || PTtrigger == 0) && ( msg.match("荣威镖局")==null)){ // pt triggsuer = 1 是默认， =0 时 打所有跨服青龙
                    clearInterval(QinglongIntervalFunc);
                    var url = msg.split("href;0;")[1].split("")[0];
                    tarNPC = msg.split("组织：")[1].split("正在")[0];
                    clickButton(url);
                    Qinglong();
                    QinglongIntervalFunc = setInterval(Qinglong, 500);

                }
                //监控 1-5  镖车(周日）-
                if (msg.match("1-5区]花落云") != null) {
                    if (btnList1["杀好人"].innerText == '停好人') { tarNPC = '[1-5区]花落云'; }
                    else { tarNPC = '[1-5区]墟归一'; }
                    clearInterval(QinglongIntervalFunc);
                    var url = msg.split("href;0;")[1].split("")[0];
                    clickButton(url);
                    Qinglong();
                    QinglongIntervalFunc = setInterval(Qinglong, 500);

                }
            }
            // 奇侠监控
            if (msg.match("今日亲密度操作次数") != null) {
                var qinmi = parseInt(msg.split("(")[1].split("/")[0]);
                if (qinmi == 20) {
                    QXStop = 1;
                    qinmiFinished = 1;
                    QXTalking = 0;
                    QiXiaTalkFunc11();
                }
            }
            //自动续 打坐、寒玉床
            if (msg.match("你从寒玉床上爬起，结束了这次练功") != null) {
                go('home;sleep_hanyuchuang');
                return;
            }
            if (msg.match("你停止了打坐") != null) {
                go('exercise;');
                return;
            }
        }
    }
}
//=======================================================================
//本服 青龙碎片、二娘
var QinglongIntervalFunc = null;
var currentNPCIndex = 0;

function QinglongFunc() {
    zdskill = null;
    currentNPCIndex = 0;
    console.log("开始杀青龙 qinglongfunc" + "tarNPC=" + tarNPC);
   // skillLists = mySkillLists;
    QinglongIntervalFunc = setInterval(Qinglong, 500);

}

function Qinglong() {
    if ($('span').text().slice(-7) == "不能杀这个人。") {
        currentNPCIndex = currentNPCIndex + 1;
    }
    //   console.log(" qinglong：" + "tarNPC=" + tarNPC);
    getQinglongCode();
    if ($('span:contains(胜利)').text().slice(-3) == '胜利！' || $('span:contains(战败了)').text().slice(-6) == '战败了...') {
        currentNPCIndex = 0;
        //      console.log('杀人一次！');
        clickButton('prev_combat');
        nowXueTempCount = 0;
        clickButton('golook_room');
    }
}
function getQinglongCode() {
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor = 0;
    //    console.log("getqinglongcode:" + "tarNPC=" + tarNPC);

    for (var i = 0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (tarNPC == (peopleList[i].innerText)) {
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //          console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor + 1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length) {
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0) {
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        //     console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectQinglongInfo, 200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectQinglongInfo() {
    var QinglongInfo = $('span').text();
    if (QinglongInfo.slice(-15) == "已经太多人了，不要以多欺少啊。") {
        currentNPCIndex = currentNPCIndex + 1;
    } else {
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

var qlMon = new QinglongMon;
webSocketMsg.prototype.old = gSocketMsg.dispatchMessage;
gSocketMsg.dispatchMessage = function (b) {
    this.old(b);
    qlMon.dispatchMessage(b);
}

//一键恢复------------------------
var healtriger = 0;
function yijianhuifuFunc() {
    if (healtriger == 0) {
        healtriger = 1;
        btnList["一键恢复"].innerText = '停止恢复';
        healFunc();
    } else {
        btnList["一键恢复"].innerText = '一键恢复';
        healtriger = 0;
    }
}

function healFunc() {
    if (healtriger == 0) {
        return;
    }
    var kee = parseInt(g_obj_map.get("msg_attrs").get("kee"));
    var max_kee = parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
    var force = parseInt(g_obj_map.get("msg_attrs").get("force"));
    var max_force = parseInt(g_obj_map.get("msg_attrs").get("max_force"));
    //    console.log("血量是: "+kee+"/"+max_kee);
    //    console.log("内力是: "+force+"/"+max_force);
    if (kee < max_kee) {
        if (force > 0) { clickButton('recovery'); }
        else if (force <= 0) { clickButton('items use snow_wannianlingzhi'); clickButton('items use snow_qiannianlingzhi'); }
        setTimeout(function () { healFunc() }, 300);
        return;
    }
    if (force < (max_force - 25000)) {
        clickButton('items use snow_wannianlingzhi');
        setTimeout(function () { healFunc() }, 300);
        return;
    }
    else if (force < max_force) {
        clickButton('items use snow_qiannianlingzhi');
        setTimeout(function () { healFunc() }, 300);
        return;
    }
    if ((kee >= max_kee) && (force >= max_force)) {
        btnList["一键恢复"].innerText = '一键恢复';
        healtriger = 0;
    }
}


// 吃药----------------------------------------------------
function userMedecineFunc() {
    go('items use snow_qiannianlingzhi;items use snow_qiannianlingzhi;items use snow_qiannianlingzhi;items use snow_qiannianlingzhi;items use snow_qiannianlingzhi;');
}
// ==/UserScript==------------------------------------------------------------------------------------------------------------
// 跨服、秘境列表-------------------------------------------------------------------------------------------------------------
// 跨服、秘境列表-------------------------------------------------------------------------------------------------------------
// 跨服、秘境列表-------------------------------------------------------------------------------------------------------------
var btnList1 = {};       // 按钮列表
//var buttonWidth = '70px';   // 按钮宽度
//var buttonHeight = '22px';  // 按钮高度
var currentPos = 0;        // 当前按钮距离顶端高度，初始130
//var delta = 20;                 // 每个按钮间隔
//按钮加入窗体中----------------------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function createButton1(btnName, func) {
    btnList1[btnName] = document.createElement('button');
    var myBtn = btnList1[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.left = '0px';
    //    myBtn.style.right = '80px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);
    document.body.appendChild(myBtn);
}

//按钮列表----------------------------------
createButton1('进入跨服', JinKuaFuFunc);
createButton1('杀坏人', killHongMingTargetFunc);
createButton1('杀好人', killHuangMingTargetFunc);
createButton1('青龙镖车', KFQLFunc);
//createButton1('帮派战', ClanWarFunc);
createButton1('周年跨服', KuafuBossFunc);
//createButton1('帮战',runsGonsFunc);
//createButton1('天剑队长', tianjianFunc);
createButton1('天剑大怪', killTianJianTargetFuncBoss);
createButton1('天剑小兵', killTianJianTargetFuncBing);
createButton1('极武坛', JiWuTanFunc);
createButton1('  ');
//createButton1('  ',nullFunc);
//createButton1('帮二集合',ClanInst2SumFunc);
createButton1('帮一集合', ClanInst1SumFunc);
createButton1('帮一队长', ClanInst1CapFunc);
createButton1('撩奇侠', QiXiaTalkFunc11);
createButton1('无尽深渊', wujinFunc);
createButton1('秘境优化', mijingFunc);
hideButton1();
function hideButton1() {
    btnList1['进入跨服'].style.visibility = "hidden";
    btnList1['杀坏人'].style.visibility = "hidden";
    btnList1['杀好人'].style.visibility = "hidden";
    btnList1['青龙镖车'].style.visibility = "hidden";
//    btnList1['帮派战'].style.visibility = "hidden";
    btnList1['周年跨服'].style.visibility = "hidden";
//    btnList1['天剑队长'].style.visibility = "hidden";
    btnList1['天剑大怪'].style.visibility = "hidden";
    btnList1['天剑小兵'].style.visibility = "hidden";
    btnList1['极武坛'].style.visibility = "hidden";
    btnList1['  '].style.visibility = "hidden";
    //   btnList1['帮二集合'].style.visibility="hidden";
    btnList1['帮一集合'].style.visibility = "hidden";
    btnList1['帮一队长'].style.visibility = "hidden";
    btnList1['撩奇侠'].style.visibility = "hidden";
    btnList1['无尽深渊'].style.visibility = "hidden";
    btnList1['秘境优化'].style.visibility = "hidden";
}
function showButton1() {
    btnList1['进入跨服'].style.visibility = "visible";
    btnList1['杀坏人'].style.visibility = "visible";
    btnList1['杀好人'].style.visibility = "visible";
    btnList1['青龙镖车'].style.visibility = "visible";
//    btnList1['帮派战'].style.visibility = "visible";
    btnList1['周年跨服'].style.visibility = "visible";
//    btnList1['天剑队长'].style.visibility = "visible";
    btnList1['天剑大怪'].style.visibility = "visible";
    btnList1['天剑小兵'].style.visibility = "visible";
    btnList1['极武坛'].style.visibility = "visible";
    btnList1['  '].style.visibility = "visible";
    //   btnList1['帮二集合'].style.visibility="visible";
    btnList1['帮一集合'].style.visibility = "visible";
    btnList1['帮一队长'].style.visibility = "visible";
    btnList1['撩奇侠'].style.visibility = "visible";
    btnList1['秘境优化'].style.visibility = "visible";
    btnList1['无尽深渊'].style.visibility = "visible";
}

//空白按钮--------加队伍-----------------
function nullFunc() {
    clickButton('team join u4306608');
    clickButton('team join u4306608-11a1a');
    paustStatus = 0;
}

/*
//帮二集合-------------------------------------------------------------------------------------------------------------
function ClanInst2SumFunc(){
    var trueBeToDo=confirm("确定进行帮派副本2么?");
    if (!trueBeToDo) {
        return;
    }
    go('home;clan fb enter daxuemangongdao;');
}
*/
//帮一集合-------------------------------------------------------------------------------------------------------------
function ClanInst1SumFunc() {
    var trueBeToDo = confirm("确定进行帮派副本1么?");
    if (!trueBeToDo) {
        return;
    }
    btnList1["杀坏人"].innerText = '杀坏人';
    killHongMingTargetFunc();
    go('home;clan fb enter shenshousenlin;');
    // go('event_1_40313353');//幽荧殿 镇殿神兽 守殿神兽 幽荧幼崽 幽荧兽魂 幽荧分身 幽荧王 幽荧战神
    // go('event_1_2645997');//螣蛇潭  镇潭神兽; 守潭神兽; 螣蛇幼崽 ;螣蛇兽魂 ;螣蛇分身 螣蛇王; 螣蛇战神
    // go('event_1_43755600');//应龙山 "镇山神兽","守山神兽","应龙幼崽 "应龙兽魂","应龙分身","应龙王","应龙战神"
    //  event_1_64156549 饕餮谷 "镇谷神兽 守谷神兽 饕餮幼崽 饕餮兽魂 "饕餮分身","饕餮王","饕餮战神"
}

//帮一队长-------------------------------------------------------------------------------------------------------------
function ClanInst1CapFunc() {
    /*    var myteam=g_obj_map.get("msg_team");
    console.log(myteam);
    console.log( myteam.get("is_leader"));
    if( myteam || myteam.get("is_leader")!='1'){
        alert('不是队长，别乱动 ^_^');
        return;
    }
*/
    var trueBeToDo = confirm("是队长么？只有队长才能点！！！");
    if (!trueBeToDo) {
        return;
    }
    go('s;eval_halt_move();w;eval_halt_move();w;eval_halt_move();w;eval_halt_move();e;e;e;e;eval_halt_move();e;eval_halt_move();e;eval_halt_move();w;w;w;');//一
    go('s;eval_halt_move();w;eval_halt_move();w;eval_halt_move();w;eval_halt_move();e;e;e;e;eval_halt_move();e;eval_halt_move();e;eval_halt_move();w;w;w;');//二
    go('s;eval_halt_move();w;eval_halt_move();w;eval_halt_move();w;eval_halt_move();e;e;e;e;eval_halt_move();e;eval_halt_move();e;eval_halt_move();w;w;w;');//三
    go('s;eval_halt_move();w;eval_halt_move();w;eval_halt_move();w;eval_halt_move();e;e;e;e;eval_halt_move();e;eval_halt_move();e;eval_halt_move();w;w;w;');//四
    go('s;eval_halt_move();w;eval_halt_move();w;eval_halt_move();w;eval_halt_move();e;e;e;e;eval_halt_move();e;eval_halt_move();e;eval_halt_move();w;w;w;');//五
    go('s;eval_halt_move();');//战神
}





// 包裹整理 ------
var clb_time;
var clb_flag = true;
function clearBag() {
    clb_flag = false;
    go('items', 0);
    clearInterval(clb_time);
    clb_time = setInterval(clearitem, 200);
}
var items_use = '『秘籍木盒』兰陵美酒 周年英雄令 周年热血令 神鸢宝箱 茉莉汤 云梦青 『神匠宝箱』冰糖葫芦青凤纹绶 热血印 风云宝箱 腊八粥  腊百草美酒元宵 年糕 高级狂暴丹特级狂暴丹保险卡特级大还丹高级大还丹小还丹百年紫芝百年灵草特级乾坤再造丹高级乾坤再造丹神秘宝箱冰镇酸梅汤';
var items_store = '长生石 晚香玉 凌霄花 百宜雪梅 朝开暮落花 凤凰木 熙颜花 君影草 矢车菊 忘忧草 仙客来 雪英 夕雾草 洛神花 千年紫芝千年灵草驻颜丹烧香符周年礼券玄重铁分身卡高级乾坤袋装备打折卡碎片';
var items_study = ' ';
var items_splite = '翎眼赤护 青鸾护臂 苍狼护臂 宝玉甲 天寒匕 貂皮斗篷 白玉腰束 无心匕 玄武盾 月光宝甲 沧海护腰 夜行披风虎皮腰带红光匕金丝甲羊毛斗篷破军盾金丝甲疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣';
var items_sell = '漫天花雨匕三清神冠七星翻云靴咒剑王□鲜红锦衣牛皮靴八角锤灰雁七星宝戒船桨白金项链断云斧乌夷长裙红色绸裙包子大剪刀黑水伏蛟帝王剑麻布手套银丝帽吴钩绵裙铜钹大刀紫袍铁笛圣火令绿罗裙绣花针清心散垓下刀紫金杖阿拉伯弯刀青锋剑青布袍淑女剑紫霜血蝉衣软金束带穿花蛇影鞋魔鞭翩珑大红僧袍九环禅杖精铁棒毒蒺藜暗灵桃木剑横断钩银丝链甲衣天魔刀玉竹杖叫化鸡七星剑逆钩匕银丝甲天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭硫磺木戟黑袍粗布白袍长戟回旋镖拂尘松子白色棋子黑色棋子竹节鞭白棋子木叉银色丝带波斯长袍铁鞭竹刀长虹剑莲蓬鲤鱼窄裉袄灵芝锦衣台夷头巾毛毯废焦丹废药渣台夷头巾粉红绸衫灰燕野山鸡麻雀岩鸽瑶琴维吾尔族长袍旧书桃符纸木锤木钩竹鞭木刀木枪木剑彩巾彩靴彩帽彩带彩镯彩衣砍刀绣花鞋舞蝶彩衫军刀铁扇剑割鹿刀大理雪梨圆领小袄皮帽弯月刀兔肉粗磁大碗羊肉串天山雪莲青铜盾禅杖金刚罩丝质披风暗箭青葫芦松子铁斧水蜜桃蓑衣破弯刀柴刀丝衣长鞭道德经布裙钢丝甲衣牛皮带制服金刚杖斩空刀拜月掌套金弹子新月棍白蟒鞭-草莓玉蜂浆玉蜂蜜蜂浆瓶豆浆蛋糕菠菜粉条包裹鸡叫草水密桃--新月棍银簪重甲羊角匕梅花匕日月神教腰牌船篙-丝绸马褂白缨冠白色长袍蛇杖鬼头刀拐杖古铜缎子袄裙大环刀鹿皮手套丝绸衣羊毛裙牧羊鞭牛皮酒袋麻带钢剑钢杖藤甲盾长斗篷军袍破披风木盾铁盾锦缎腰带鞶革青色道袍-鲫鱼树枝水草破烂衣服-鹿皮小靴青绫绸裙粗布衣草帽草鞋布鞋精铁甲-柳玉刀玉竹剑钢刀戒刀单刀长剑长枪铁锤木棍轻罗绸衫兽皮鞋皮鞭铁棍飞镖匕首细剑绣鞋绣花小鞋狼皮雪靴金戒金手镯铁戒银戒铁手镯银手镯铁项链银项链';

function clearitem() {
    var t = $("tr[bgcolor]:contains(万两)").siblings();
    if (t.length > 0) {
        clearInterval(clb_time);
        for (var i = 0; i < t.length; i++) {
            if (t.eq(i)[0].innerText.replace(/\s+/g, "") != "") {
                var a = t.eq(i).find('td')[0].innerText.replace('\n', "");
                var b = parseInt(t.eq(i).find('td')[1].innerText.match(/\d+/g)[0]);
                var c = t[i].getAttribute('onclick').split("'")[1].split("info ")[1];
                if (items_use.indexOf(a) != -1) {
                    console.log("使用：" + a + " 数量：" + b);
                    for (j = 0; j < b; j++) {
                        go('items use ' + c);
                    }
                } else if (items_store.indexOf(a) != -1) {
                    console.log("存仓库：" + a + " 数量：" + b);
                    go('items put_store ' + c);
                } else if (items_study.indexOf(a) != -1) {
                    console.log("学习：" + a + " 数量：" + b);
                    for (j = 0; j < b; j++) {
                        go('study ' + c);
                    }
                } else if (items_sell.indexOf(a) != -1) {
                    console.log("卖掉：" + a + " 数量：" + b);
                    for (j = 0; j < Math.floor(b / 10); j++) {
                        go('items sell ' + c + '_N_10');
                    }
                    for (j = 0; j < (b % 10); j++) {
                        go('items sell ' + c);
                    }
                } else if (items_splite.indexOf(a) != -1) {
                    console.log("分解：" + a + " 数量：" + b);
                    for (j = 0; j < Math.floor(b / 10); j++) {
                        go('items splite ' + c + '_N_10');
                    }
                    for (j = 0; j < (b % 10); j++) {
                        go('items splite ' + c);
                    }
                }
                if (a.indexOf('】璞玉') != -1) {
                    console.log("存仓库：" + a + " 数量：" + b);
                    go('items put_store ' + c);
                }
                if (a.indexOf('】青玉') != -1) {
                    console.log("存仓库：" + a + " 数量：" + b);
                    go('items put_store ' + c);
                }
                if (a.indexOf('】墨玉') != -1) {
                    console.log("存仓库：" + a + " 数量：" + b);
                    go('items put_store ' + c);
                }
                //                if(a.indexOf('残页』')!=-1){
                //                    console.log("存仓库："+a+" 数量："+b);
                //                    go('items put_store '+c);
                //                }
                // if(a.indexOf('宝石')!=-1){
                //     console.log("存仓库："+a+" 数量："+b);
                //     go('items put_store '+c);
                // }
                if (a.indexOf('基础') != -1 || a.indexOf('中级') != -1 || a.indexOf('进阶') != -1 || a.indexOf('衫') != -1 || a.indexOf('劲服') != -1 || a.indexOf('袈裟') != -1 || a.indexOf('吹雪') != -1 || a.indexOf('圣衣') != -1 || a.indexOf('道袍') != -1 || a.indexOf('水烟阁') != -1) {
                    console.log("卖掉：" + a + " 数量：" + b);
                    for (j = 0; j < b; j++) {
                        go('items sell ' + c);
                    }
                }
            }
        }
       // go('use_all');
    }
}

//比试铜人
//var tongren= 0 ;
function BiShiTongRenFunc() {
    // if (tongren == 0 ){
    AutoKillFunc();
    go('home;clan zsdg enter;n;n;n;n;n;event_1_14757697;eval_halt_move();s;s;e;e;e;e;e;e;e;e;n;n;event_1_35095441;eval_halt_move();home;');
   
}
//苗疆炼药------------------------
function MjlyFunc() {
    //    var msg = "毒藤胶和毒琥珀准备好了吗？\n苗疆地图开了吗？\n没有就点取消！";
    //    if (confirm(msg)===true){
    //        console.log("去苗疆。");
    setTimeout(Mjly1Func, 200);
    //    setTimeout(Mjly3Func,200);
    //    }else{
    //        return false;
    //    }
}
function Mjly1Func() {
    go('jh 40;s;s;s;s;e;s;se;sw;s;sw;e;e;sw;se;sw;se;');
    console.log("铁索桥。");
    go('event_1_8004914;');
    setTimeout(Mjly2Func, 6000);
}
function Mjly2Func() {
    if (g_obj_map.get("msg_room").get("short") !== "澜沧江南岸") {
        console.log("重新跑。");
        setTimeout(Mjly1Func, 100);
    } else {
        console.log("继续走。");
        go('se;s;s;e;n;n;e;s;e;ne;s;sw;e;e;ne;ne;nw;ne;ne;n;n;w;');
        setTimeout(Mjly3Func, 5000);
    }
}
function Mjly3Func() {
    if (isContains($('span.out2:contains(炼药的丹炉)').text().slice(-6), '明天再来吧！')) {
        console.log("炼完了。");
        go('home');
    } else {
        go('lianyao;');
        setTimeout(Mjly3Func, 6000);
    }
}
//铁血日常
function TiexueFunc() {
    go('jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;n;n;n;e;e;event_1_94442590;event_1_85535721;');
}
//天山挂机------------------------
function TsdzFunc() {
    //    var msg = "身上有御寒衣吗？\n要有掌门手谕并且过了碧海哟~\n走挂机10分钟，没有就点取消！";
    //    if (confirm(msg)===true){
    //        console.log("去天山。");
    setTimeout(Tsdz1Func, 200);
    //    }else{
    //        return false;
    //    }
}
function Tsdz1Func() {
    go('jh 39;ne;e;n;ne;ne;n;ne;nw;event_1_58460791;');
    setTimeout(Tsdz2Func, 5000);
}
function Tsdz2Func() {
    if (g_obj_map.get("msg_room") == undefined) {
        setTimeout(function () { Tsdz2Func(); }, 200);
    } else {
        var locationname = g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        if (locationname == "失足岩") {
            console.log("继续走。");
            go('nw;n;ne;nw;nw;w;n;n;n;e;e;s;give tianshan_hgdz;ask tianshan_hgdz;ask tianshan_hgdz;s;event_1_34855843');
        } else {
            setTimeout(Tsdz1Func, 200);
        }
    }
}
//进入跨服-------------------------------------------------------------------------------------------------------------
function JinKuaFuFunc() {
    go('jh 1;e;n;n;n;n;w;event_1_36344468');
    //    if(realmInfo == 'kuafu'){
    QLtrigger = 0;// 跨服不需要监控青龙
    btnList['青龙监听'].innerText = '青龙监听';
    KFQLtrigger = 1;
    btnList1['跨服青龙'].innerText = '停止青龙';
    getQLListenMessage()
    getKFQLListenMessage()
    setTimeout(function () { clickButton('auto_equip on') }, 6000);  // 一键装备
}


// 杀坏人----------------------------------------------------------------------------------------------------------------
var HongMingNPCList = ["天魔真身","石幽明","胡铁花","传鹰","星宿恶徒【一】","星宿恶徒【二】","星宿恶徒【三】","星宿恶徒【四】","[1-5区]段老大", "[1-5区]墟归一", "[1-5区]上官晓芙", "[1-5区]洪昭天","夜魔*恶棍", "夜魔*流寇", "夜魔*剧盗", "夜魔*云老四", "夜魔*岳老三", "夜魔*二娘", "夜魔*段老大", "黑袍公", "独孤须臾", "翼国公", "云观海", "年兽", "铁狼军", "银狼军", "金狼军", "金狼将", "十夫长", "百夫长", "月幽剑士", "濯缨剑士", "对影剑士", "夏花剑士", "[一]镇擂斧将", "[二]镇擂斧将", "天魔真身", "攻楼死士", "镇山神兽", "守山神兽", "应龙幼崽", "应龙兽魂", "应龙分身", "应龙王", "应龙战神", "镇潭神兽", "守潭神兽", "螣蛇幼崽", "螣蛇兽魂", "螣蛇分身", "螣蛇王", "螣蛇战神", "镇殿神兽", "守殿神兽", "幽荧幼崽", "幽荧兽魂", "幽荧分身", "幽荧王", "幽荧战神", "饕餮分身", "饕餮兽魂", "饕餮幼崽", "守谷神兽", "镇谷神兽", "饕餮王", "饕餮战神", "不『二』剑客"];
var HongMingNPCListClan1 = ["镇山神兽", "守山神兽", "应龙幼崽", "应龙兽魂", "应龙分身", "应龙王", "应龙战神", "镇潭神兽", "守潭神兽", "螣蛇幼崽", "螣蛇兽魂", "螣蛇分身", "螣蛇王", "螣蛇战神", "镇殿神兽", "守殿神兽", "幽荧幼崽", "幽荧兽魂", "幽荧分身", "幽荧王", "幽荧战神", "饕餮分身", "饕餮兽魂", "饕餮幼崽", "守谷神兽", "镇谷神兽", "饕餮王", "饕餮战神"];
var HongMingNPCListKuaFu = ["[1-5区]段老大", "[1-5区]墟归一", "[1-5区]上官晓芙", "[1-5区]洪昭天"];
var killHongMingIntervalFunc = null;
var currentNPCIndex = 0;
function killHongMingTargetFunc() {
    zdskill = null;
    if (btnList1["杀坏人"].innerText == '杀坏人') {
        currentNPCIndex = 0;
        console.log("开始杀红名目标NPC！");
     //   skillLists = mySkillLists;
        btnList1["杀坏人"].innerText = '停坏人';
        killHongMingIntervalFunc = setInterval(killHongMing, 500);

    } else {
        console.log("停止杀红名目标NPC！");
        btnList1["杀坏人"].innerText = '杀坏人';
        clearInterval(killHongMingIntervalFunc);
    }
}

function killHongMing() {
    if ($('span').text().slice(-7) == "不能杀这个人。") {
        currentNPCIndex = currentNPCIndex + 1;
        //       console.log("不能杀这个人！");
    }
    getHongMingTargetCode();
    if ($('span:contains(胜利)').text().slice(-3) == '胜利！' || $('span:contains(战败了)').text().slice(-6) == '战败了...') {
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
        nowXueTempCount = 0;
    }
}
function getHongMingTargetCode() {
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor = 0;
    for (var i = 0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HongMingNPCList.contains(peopleList[i].innerText)) {
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor + 1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length) {
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0) {
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        //     console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHongMingInfo, 200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHongMingInfo() {
    var HongMingInfo = $('span').text();
    if (HongMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。") {
        currentNPCIndex = currentNPCIndex + 1;
    } else {
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

// 杀好人----------------------------------------------------------------------------------------------------------------
var HuangMingNPCList = ["天剑真身","追三","无花","王铁匠", "杨掌柜", "柳绘心", "柳小花", "卖花姑娘", "刘守财", "朱老伯", "方老板", "客商", "方寡妇", "[1-5区]无一",  "无一", "铁二", "追三", "冷四", "[1-5区]花落云", "[1-5区]辰川", "[1-5区]王世仲", "守楼虎将", "天魔真身", "无『双』公主"];
//var HuangMingNPCList = ["[1-5区]王铁匠", "[1-5区]杨掌柜", "[1-5区]柳绘心", "[1-5区]柳小花", "[1-5区]卖花姑娘","[1-5区]刘守财","[1-5区]朱老伯","[1-5区]方老板", "[1-5区]客商","[1-5区]方寡妇","王铁匠", "杨掌柜", "柳绘心", "柳小花", "卖花姑娘","刘守财","朱老伯","方老板", "客商","方寡妇","[1-5区]无一","[1-5区]铁二","[1-5区]追三","[1-5区]冷四","[1-5区]花落云", "[1-5区]辰川","[1-5区]王世仲","[一]镇擂斧将","[二]镇擂斧将","饕餮分身","饕餮兽魂","饕餮幼崽","守谷神兽","镇谷神兽","守楼虎将"];
var killHuangMingIntervalFunc = null;

var currentNPCIndex = 0;

function killHuangMingTargetFunc() {
    zdskill = null;
    if (btnList1["杀好人"].innerText == '杀好人') {
        currentNPCIndex = 0;
        console.log("开始杀好人目标NPC！");
     //   skillLists = mySkillLists;
        btnList1["杀好人"].innerText = '停好人';
        killHuangMingIntervalFunc = setInterval(killHuangMing, 500);

    } else {
        console.log("停止杀好人目标NPC！");
        btnList1["杀好人"].innerText = '杀好人';
        clearInterval(killHuangMingIntervalFunc);
    }
}

function killHuangMing() {
    if ($('span').text().slice(-7) == "不能杀这个人。") {
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
    getHuangMingTargetCode();
    if ($('span:contains(胜利)').text().slice(-3) == '胜利！' || $('span:contains(战败了)').text().slice(-6) == '战败了...') {
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
        nowXueTempCount = 0;
    }
}
function getHuangMingTargetCode() {
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor = 0;
    for (var i = 0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HuangMingNPCList.contains(peopleList[i].innerText)) {
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor + 1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length) {
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0) {
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        //      console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHuangMingInfo, 200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHuangMingInfo() {
    var HuangMingInfo = $('span').text();
    if (HuangMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。") {
        currentNPCIndex = currentNPCIndex + 1;
    } else {
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};


// 杀天剑----------------------------------------------------------------------------------------------------------------
var TianJianNPCList = ["天剑", "虹风", "虹雨", "虹雷", "虹电", "天剑谷卫士"];
var TianJianNPCListAll = ["天剑", "虹风", "虹雨", "虹雷", "虹电", "天剑谷卫士"];
var TianJianNPCListBing = ["天剑谷卫士"];
var TianJianNPCListBoss = ["天剑", "虹风", "虹雨", "虹雷", "虹电"];
var killTianJianIntervalFunc = null;
var currentNPCIndex = 0;
var tianjianBoss = 0;
var tianjianBing = 0;

function killTianJianTargetFuncBoss() {
    if (tianjianBoss == 0) {
        tianjianBoss = 1;
        btnList1["天剑大怪"].innerText = '停大怪';
    } else {
        tianjianBoss = 0;
        btnList1["天剑大怪"].innerText = '天剑大怪';
    }
    killTianJianTargetFunc();
}

function killTianJianTargetFuncBing() {
    if (tianjianBing == 0) {
        tianjianBing = 1;
        btnList1["天剑小兵"].innerText = '停小兵';
    } else {
        tianjianBing = 0;
        btnList1["天剑小兵"].innerText = '天剑小兵';
    }
    killTianJianTargetFunc();
}

function killTianJianTargetFunc() {
    currentNPCIndex = 0;
    if ((tianjianBoss == 1) && (tianjianBing == 1)) {
        clearInterval(killTianJianIntervalFunc);
        TianJianNPCList = TianJianNPCListAll;
        killTianJianIntervalFunc = setInterval(killTianJian, 500);

    } else if ((tianjianBoss == 1) && (tianjianBing == 0)) {
        clearInterval(killTianJianIntervalFunc);
        TianJianNPCList = TianJianNPCListBoss;
        killTianJianIntervalFunc = setInterval(killTianJian, 500);
    } else if ((tianjianBoss == 0) && (tianjianBing == 1)) {
        clearInterval(killTianJianIntervalFunc);
        TianJianNPCList = TianJianNPCListBing;
        killTianJianIntervalFunc = setInterval(killTianJian, 500);
    } else if ((tianjianBoss == 0) && (tianjianBing == 0)) {
        clearInterval(killTianJianIntervalFunc);
    }
}


function killTianJian() {
    if ($('span').text().slice(-7) == "不能杀这个人。") {
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
        //        return;
    }
    getTianJianTargetCode();
    //setTimeout(ninesword, 200);
    if ($('span:contains(胜利)').text().slice(-3) == '胜利！' || $('span:contains(战败了)').text().slice(-6) == '战败了...') {
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
        nowXueTempCount = 0;
        clickButton('golook_room');
    }
}
function getTianJianTargetCode() {
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor = 0;
    for (var i = 0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (TianJianNPCList.contains(peopleList[i].innerText)) {
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor + 1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length) {
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0) {
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode + "，目标列表中序号：" + (currentNPCIndex));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillTianJianInfo, 200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillTianJianInfo() {
    var TianJianInfo = $('span').text();
    if (TianJianInfo.slice(-15) == "已经太多人了，不要以多欺少啊。") {
        currentNPCIndex = currentNPCIndex + 1;
    } else {
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
//===============================================================================

//撩奇侠--------------------------
var QXStop = 0;
var QXTalkcounter = 1;
var QxTalking = 0;
var finallist = [];
var qinmiFinished = 0;
var QiXiaList = [];

function QiXiaTalkFunc11() {
    var QiXiaList_Input = "";
    //打开 江湖奇侠页面。
    if (QXStop == 0) {
        clickButton('open jhqx', 0);
        GetQiXiaList();
    } else if (QXStop == 1 && qinmiFinished == 0) {
        QXStop = 0;
        QiXiaTalkButton.innerText = '奇侠领朱果';
    } else if (QXStop == 1 && qinmiFinished == 1) {
        QXStop = 0;
        QixiaList = [];
        finallist = [];
        QXTalkcounter = 1;
        QixiaTotalCounter = 0;
        clickButton('open jhqx', 0);
        GetQiXiaList();
    }
}

function GetQXID(name, QXindex) {
    if (QXStop == 1 && qinmiFinished == 1) {
        return;
    } else if (g_obj_map.get("msg_room") == undefined || QXStop == 1) {
        setTimeout(function () { GetQXID(name, QXindex); }, 500);
    } else {
        console.log("开始寻找" + name + QXindex);
        var QX_ID = "";
        var npcindex = 0;
        var els = g_obj_map.get("msg_room").elements;
        for (var i = els.length - 1; i >= 0; i--) {
            if (els[i].key.indexOf("npc") > -1) {
                if (els[i].value.indexOf(",") > -1) {
                    var elsitem_ar = els[i].value.split(',');
                    if (elsitem_ar.length > 1 && elsitem_ar[1] == name) {
                        console.log(elsitem_ar[0]);
                        npcindex = els[i].key;
                        QX_ID = elsitem_ar[0];
                    }
                }
            }
        }
        if (QX_ID == null || QX_ID == undefined || QX_ID == 0) {
            clickButton('find_task_road qixia ' + QXindex);
            setTimeout(function () { GetQXID(name, QXindex); }, 500);
        } else {
            console.log("找到奇侠编号" + QX_ID);
            if (QXTalkcounter <= 5) {
                console.log("开始与" + name + "第" + QXTalkcounter + "对话")
                QXTalkcounter++;
                clickButton('ask ' + QX_ID);
                clickButton('find_task_road qixia ' + QXindex);
                setTimeout(function () { GetQXID(name, QXindex) }, 500);
            } else if (QXTalkcounter > 5) {
                QXTalkcounter = 1;
                console.log("与" + name + "对话完成");
                QixiaTotalCounter++;
                console.log("GetQXid:奇侠第" + QixiaTotalCounter + "号状态：" + finallist[QixiaTotalCounter]);
                if (QixiaTotalCounter > 24) {
                    console.log("今日奇侠已经完成");
                } else {
                    console.log("下一个目标是" + finallist[QixiaTotalCounter]["name"]);
                }
                talktoQixia();
            }
        }

    }
}
var QixiaTotalCounter = 0;
function TalkQXBase(name, QXindex) {
    var QX_NAME = name;
    console.log("开始撩" + QX_NAME + "！");
    if (g_obj_map.get("msg_room") != undefined)
        g_obj_map.get("msg_room").clear();
    overrideclick('find_task_road qixia ' + QXindex);
    overrideclick('golook_room');
    setTimeout(function () { GetQXID(QX_NAME, QXindex); }, 500);
}

function GetQiXiaList() {
    var html = g_obj_map.get("msg_html_page");
    QxTalking = 1;
    if (html == undefined) {
        setTimeout(function () { GetQiXiaList(); }, 500);
    } else if (g_obj_map.get("msg_html_page").get("msg").match("江湖奇侠成长信息") == null) {
        setTimeout(function () { GetQiXiaList(); }, 500);
    } else {
        QiXiaList = formatQx(g_obj_map.get("msg_html_page").get("msg"));
        console.log(QiXiaList);
        SortQiXia();
    }
}
function SortQiXia() {//冒泡法排序
    var temp = {};
    var temparray = [];
    var newarray = [];
    for (var i = 0; i < QiXiaList.length; i++) {
        for (var j = 1; j < QiXiaList.length - i; j++) {
            if (parseInt(QiXiaList[j - 1]["degree"]) < parseInt(QiXiaList[j]["degree"])) {
                temp = QiXiaList[j - 1];
                QiXiaList[j - 1] = QiXiaList[j];
                QiXiaList[j] = temp;
            }
        }
    }
    var tempcounter = 0;
    console.log("奇侠好感度排序如下:");
    console.log(QiXiaList);
    //首次排序结束 目前是按照由小到大排序。现在需要找出所有的超过25000 小于30000的奇侠。找到后 排序到最上面；
    for (var i = 0; i < QiXiaList.length; i++) {
        if (parseInt(QiXiaList[i]["degree"]) >= 25000 && parseInt(QiXiaList[i]["degree"]) < 30000) {
            temparray[tempcounter] = QiXiaList[i];
            tempcounter++;
            newarray.push(i);
        }
    }
    console.log(temparray);
    console.log("提取满朱果好感度排序如下:");
    for (var i = 0; i < QiXiaList.length; i++) {
        if (newarray.indexOf(i) == -1) {
            temparray[tempcounter] = QiXiaList[i];
            tempcounter++;
        }
    }
    var over3 = [];
    console.log(temparray);//第一次排序结束。现在要挑出所有超过3万的亲密 并且放到最后。
    for (var i = 0; i < temparray.length; i++) {
        if (parseInt(temparray[i]["degree"]) >= 30000) {//找到3万以上的
            over3.push(i);//push超过3万的序号
        }
    }
    console.log(over3);
    var overarray = [];
    var overcounter = 0;
    for (var i = 0; i < temparray.length; i++) { //第一遍循环 找到不在3万列表中的
        if (over3.indexOf(i) < 0) {
            overarray[overcounter] = temparray[i];
            overcounter++;
        }
    }
    console.log(overarray);
    for (var i = 0; i < temparray.length; i++) {//第二遍循环 把列表中的插入
        if (over3.indexOf(i) >= 0) {
            overarray[overcounter] = temparray[i];
            overcounter++;
        }
    }
    finallist = [];
    finallist = overarray;
    console.log(finallist);
    getZhuguo();
}
function getZhuguo() {
    var msg = "";
    console.log(finallist);
    for (var i = 0; i < 4; i++) {//只检查 头四个奇侠是不是在师门，是不是已经死亡。
        if (finallist[i]["isOk"] != true) {
            msg += finallist[i]["name"] + " ";
        }
    }
    if (msg != "") {
        alert("根据您的奇侠亲密好感度，目前可以最优化朱果数目的以下奇侠不在江湖或者已经死亡：" + msg + "。请您稍后再尝试使用奇侠领取朱果服务。");
    } else {//头四位奇侠都在江湖中，可以开始领取朱果
        talktoQixia();
    }
}
var unfinish = "";
function talktoQixia() {
    console.log("talktoqixia-奇侠-目前计数" + QixiaTotalCounter);
    console.log(finallist[QixiaTotalCounter]);
    if (QixiaTotalCounter <= 24) {// 奇侠list仍然有元素。开始调取排列第一个的奇侠
        var Qixianame = "";
        var QixiaIndex = 0;
        console.log(finallist[QixiaTotalCounter]["name"]);
        Qixianame = finallist[QixiaTotalCounter]["name"];
        QixiaIndex = finallist[QixiaTotalCounter]["index"];
        if (finallist[QixiaTotalCounter]["isOk"] != true) {
            //            alert("奇侠"+Qixianame+"目前不在江湖，可能死亡，可能在师门。领取朱果中断，请在一段时间之后重新点击领取朱果按钮。无需刷新页面");
            console.log("talktoqixia-奇侠" + Qixianame + "目前不在江湖，可能死亡，可能在师门。");
            QixiaTotalCounter++;
            setTimeout(talktoQixia, 500);
            // return;
        } else {
            console.log(finallist[QixiaTotalCounter]);
            clickButton('find_task_road qixia ' + QixiaIndex);
            console.log(QixiaIndex);
            GetQXID(Qixianame, QixiaIndex);
        }
    } else {
        console.log("今日奇侠已经完成");
        return;
    }
}

// 格式话奇侠数据并返回数组
function formatQx(str) {
    var tmpMsg = removeSpec(str);
    var arr = tmpMsg.match(/<tr>(.*?)<\/tr>/g);
    var qxArray = [];
    var qxInfo = {};
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            qxInfo = {};
            arr2 = arr[i].match(/<td[^>]*>([^\d\(]*)\(?(\d*)\)?<\/td><td[^>]*>(.*?)<\/td><td[^>]*>(.*?)<\/td><td[^>]*>.*?<\/td>/);
            console.log(arr[i]);
            console.log(arr2);

            qxInfo["name"] = arr2[1];
            qxInfo["degree"] = arr2[2] == "" ? 0 : arr2[2];
            if (arr2[3].match("未出世") != null || arr2[4].match("师门") != null) {
                qxInfo["isOk"] = false;
            } else {
                qxInfo["isOk"] = true;
            }
            qxInfo["index"] = i;
            qxArray.push(qxInfo);

        }
        return qxArray;
    }
    return [];
}

// 去除链接以及特殊字符
function removeSpec(str) {
    var tmp = g_simul_efun.replaceControlCharBlank(str.replace(/\u0003.*?\u0003/g, ""));
    tmp = tmp.replace(/[\x01-\x09|\x11-\x20]+/g, "");
    tmp = tmp.replace(/朱果/g, "");
    return tmp;
}

// 秘境优化----------------------------------------------------------------------------------------------------------------
function mijingFunc() {
    var roominfor = g_obj_map.get("msg_room").get("map_id");
    console.log(roominfor);
    var mijingid = ["liandanshi", "langhuanyudong", "leichishan", "yaowanggu", "shanya", "dixiamigong", "tianlongshan", "dafuchuan", "fomenshiku", "dilongling", "luanshishan", "lvzhou", "taohuadu", "daojiangu", "baguamen", "binhaigucheng", "lvshuige", "nanmanzhidi", "fengduguicheng", "duzhanglin", "nanmansenlin"];
    if (mijingid.indexOf(roominfor) == -1) {
        alert("当前秘境不支持优化。");
        return;
    } else if (roominfor == "shanya") { //山崖
        clickButton('event_1_97070517', 0);
        startOptimize(roominfor);
    } else if (roominfor == "dixiamigong") {//地下迷宫
        clickButton('event_1_3668752', 0);
        startOptimize(roominfor);
    } else if (roominfor == "langhuanyudong") {//琅嬛玉洞
        clickButton('event_1_74168671', 0);
        startOptimize(roominfor);
    } else if (roominfor == "duzhanglin") {// 毒瘴林
        clickButton('event_1_30944031', 0);
        startOptimize(roominfor);
    } else if (roominfor == "yaowanggu") {// 药王谷
        clickButton('event_1_18864573', 0);
        startOptimize(roominfor);
    } else if (roominfor == "leichishan") {// 雷池山
        clickButton('event_1_32379200', 0);
        startOptimize(roominfor);
    } else if (roominfor == "liandanshi") {// 炼丹室
        clickButton('event_1_99063572', 0);
        startOptimize(roominfor);
    } else {
        clickButton(roominfor + '_saodang', 0);//点击扫荡 按钮一次;
        startOptimize(roominfor);
    }
}
function startOptimize(roominfor) {
    var promt = g_obj_map.get("msg_prompt");
    console.log(roominfor);
    if (promt == undefined) {
        setTimeout(function () { startOptimize(roominfor) }, 500);
    } else {
        var msg = promt.get("msg");
        var zhuguo = parseInt(msg.split("朱果")[1].split("。")[0].split("x")[1]);
        if (zhuguo == 0) {
            alert("当前扫荡出错了。");
            return;
        } else {
            console.log("目前朱果为:" + zhuguo);
            if (roominfor == "daojiangu") {
                if (zhuguo >= 1535) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "langhuanyudong") { // 琅嬛玉洞
                if (zhuguo >= 2980) {
                    clickButton('event_1_74168671 go', 1);
                } else {
                    clickButton('event_1_74168671', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "leichishan") { // 雷池山
                if (zhuguo >= 5980) {
                    clickButton('event_1_32379200 go', 1);
                } else {
                    clickButton('event_1_32379200', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "yaowanggu") { // 药王谷
                if (zhuguo >= 5980) {
                    clickButton('event_1_18864573 go', 1);
                } else {
                    clickButton('event_1_18864573', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "liandanshi") { // 炼丹室
                if (zhuguo >= 2980) {
                    clickButton('event_1_99063572 go', 1);
                } else {
                    clickButton('event_1_99063572', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "shanya") { // 山崖
                if (zhuguo >= 2980) {
                    clickButton('event_1_97070517 go', 1);
                } else {
                    clickButton('event_1_97070517', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "duzhanglin") { // 毒樟林
                if (zhuguo >= 2970) {
                    clickButton('event_1_30944031 go', 1);
                } else {
                    clickButton('event_1_30944031', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }

            } else if (roominfor == "dixiamigong") {//地下迷宫
                if (zhuguo >= 2970) {
                    clickButton('event_1_3668752 go', 1);
                } else {
                    clickButton('event_1_3668752', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "binhaigucheng") {
                if (zhuguo >= 3380) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "taohuadu") {
                if (zhuguo >= 1785) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "lvshuige") {
                if (zhuguo >= 1255) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "lvzhou") {
                if (zhuguo >= 2035) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "luanshishan") {
                if (zhuguo >= 2350) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "dilongling") {
                if (zhuguo >= 2385) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "fomenshiku") {
                if (zhuguo >= 2425) {

                    clickButton(roominfor + '_saodang go', 0);

                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "dafuchuan") {
                if (zhuguo >= 3080) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "binghaigucheng") {
                if (zhuguo >= 3385) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "tianlongshan") {
                if (zhuguo >= 3080) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "baguamen") {
                if (zhuguo >= 3635) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "nanmanzhidi") {
                if (zhuguo >= 3895) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            } else if (roominfor == "fengduguicheng") {
                if (zhuguo >= 3895) {
                    clickButton(roominfor + '_saodang go', 0);
                } else {
                    clickButton(roominfor + '_saodang', 0);
                    setTimeout(function () { startOptimize(roominfor) }, 500);
                }
            }
        }
    }
}
//琅嬛玉洞--------------------------------------------------
function langhuanFunc() {
    go("event_1_61856223;nw;event_1_92817399;nw;event_1_92817399;w;event_1_91110342;s;event_1_74276536;se;event_1_14726005;sw;event_1_66980486;nw;event_1_39972900;nw;event_1_61689122;w;event_1_19336706;s;event_1_30457951;sw;event_1_96023188;s;");
}
// 无尽深渊-------------------------------------------------
function wujinFunc() {
    go("event_1_73460819;event_1_52335885;e;event_1_56082528;e;event_1_96610703;s;event_1_30829528;w;event_1_20919210;w;event_1_45322510;s;event_1_53681413;s;event_1_4732228;e;event_1_24529326;n;event_1_65787232;e;event_1_39859996;s;event_1_22071325;e;event_1_37824403;e;event_1_10669895;n;event_1_87685798;w;event_1_35949241;n;event_1_27708165;e;event_1_9805486;n;event_1_39703232;w;fight henshan_guguai_laozhe;");
}
// 地下迷宫-------------------------------------------------
function dixiamigongFunc() {
    go("event_1_82876458;e;event_1_82876458;e;event_1_82876458;s;event_1_82876458;w;event_1_82876458;w;event_1_82876458;s;event_1_82876458;e;event_1_82876458;e;event_1_82876458;s;event_1_82876458;w;event_1_82876458;w;event_1_82876458;w;event_1_82876458;n;event_1_82876458;n;event_1_82876458;n;event_1_82876458;n;event_1_82876458;");
}
// 风泉剑---------------------------------------------------
function FengquanFunc() {
    go("jh 7;s;s;s;s;s;s;s;s;e;n;e;s;e;kill scholar_master;");
}
// 天山姥姥
function TianshanlaolaoFunc() {
    go("jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w;event_1_57688376;n;n;e;n;event_1_88625473;event_1_82116250;event_1_90680562;event_1_38586637;fight xiaoyao_tonglao;");
}
// 雪婷-山坳----------------------------------------------------
function ShanAoFunc() {
    go("jh 1;e;n;n;n;n;n;find_task_road secret;secret_op1;");
}
// 华山村-桃花泉---------------------------------------------------
function TaoHuaFunc() {
    go("jh 3;s;s;s;s;s;nw;n;n;e;find_task_road secret;secret_op1;taohua1_op1;");
}
// 华山-千尺幢----------------------------------------------------
function QianChiFunc() {
    go("jh 4;n;n;n;n;find_task_road secret;secret_op1");
}
// 华山-猢狲愁----------------------------------------------------
function HuSunFunc() {
    go("jh 4;n;n;n;n;n;n;e;n;n;find_task_road secret;secret_op1");
}
// 华山-潭畔草地------------------------------------------------------
function CaoDiFunc() {
    go("jh 4;n;n;n;n;n;n;n;event_1_91604710;s;s;s;find_task_road secret;secret_op1");

}
// 华山-玉女峰----------------------------------------------------
function YuNvFunc() {
    go("jh 4;n;n;n;n;n;n;n;n;w;find_task_road secret;secret_op1");
}
// 华山-临渊石台---------------------------------------------------
function ShiTaiFunc() {
    go("jh 4;n;n;n;n;n;n;n;n;n;e;n;find_task_road secret;secret_op1");
}
// 华山  长空栈道---------------------------------------------------
function ShiTaiFunc1() {
    go("jh 4;n;n;n;n;n;n;n;n;n;e;find_task_road secret;secret_op1");
}
// 丐帮-沙丘小洞-----------------------------------------------------
function ShaQiuFunc() {
    go("jh 6;event_1_98623439;ne;n;ne;ne;ne;event_1_97428251;find_task_road secret;secret_op1");
}
// 峨眉山-九老洞-------------------------------------------------
var jiulao = 0;
function JiuLaoFunc() {
    go("jh 8;w;nw;n;n;n;n;e;e;n;n;e;fight emei_shoushan;golook_room;n;eval_halt_move();golook_room;n;n;n;w;n;n;n;n;n;n;n;n;n;nw;sw;w;nw;w;find_task_road secret;secret_op1");
}
// 恒山-悬松根----------------------------------------------------
function XuanSongFunc() {
    go("jh 9;n;w;find_task_road secret;secret_op1");
}
// 恒山-夕阳岭----------------------------------------------------
function XiYangFunc() {
    go("jh 9;n;n;e;find_task_road secret;secret_op1");
}
// 少林-青云坪----------------------------------------------------
function QingYunFunc() {
    go("jh 13;e;s;s;w;w;find_task_road secret;secret_op1");
}
// 逍遥-玉壁瀑布----------------------------------------------------
function YuBiFunc() {
    go("jh 16;s;s;s;s;e;n;e;find_task_road secret;secret_op1");
}
// 逍遥-湖边----------------------------------------------------
function HuBianFunc() {
    go("jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w;find_task_road secret;secret_op1");
}
// 明教-碧水寒潭-----------------------------------------------------
function BiShuiFunc() {
    go("jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;e;e;se;se;e;find_task_road secret;secret_op1");
}
// 古墓-寒水潭----------------------------------------------------
function HanShuiFunc() {
    go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;e;se;find_task_road secret;secret_op1");
}
// 古墓-悬崖-------------------------------------------------
function GuMuXuanYaFunc() {
    go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;s;e;find_task_road secret;secret_op1");
}
// 白坨-戈壁----------------------------------------------------
function GeBiFunc() {
    go("jh 21;find_task_road secret;secret_op1");
}
// 嵩山-卢崖瀑布----------------------------------------------------
function LuYaPuBuFunc() {
    go("jh 22;n;n;n;eval_halt_move();golook_room;n;e;n;find_task_road secret;secret_op1");
}
// 嵩山-启母石----------------------------------------------------
function QiMuFunc() {
    go("jh 22;n;n;w;w;find_task_road secret;secret_op1");
}
// 嵩山-无极老母洞-------------------------------------------------
function WuJiDongFunc() {
    go("jh 22;n;n;w;n;n;n;n;find_task_road secret;secret_op1");
}
// 嵩山-无极老母洞---山溪畔-------------------------------------------------
function WuJiDongFunc1() {
    go("jh 22;n;n;w;n;n;n;n;event_1_88705407;s;s;find_task_road secret;secret_op1");

}
// 寒梅庄-奇槐坡----------------------------------------------------
function QiHuaiFunc() {
    go("jh 23;n;n;n;n;n;n;n;n;find_task_road secret;secret_op1;");

}
// 泰山-天梯----------------------------------------------------
function TianTiFunc() {
    go("jh 24;n;n;n;find_task_road secret;secret_op1");
}
// 泰山-小洞天----------------------------------------------------
function XiaoDongFunc() {
    go("jh 24;n;n;n;n;e;e;find_task_road secret;secret_op1");

}
// 泰山-云步桥----------------------------------------------------
function YunBuFunc() {
    go("jh 24;n;n;n;n;n;n;n;n;n;find_task_road secret;secret_op1");

}
// 泰山-观景台-----------------------------------------------------
function GuanJingFunc() {
    go("jh 24;n;n;n;n;n;n;n;n;n;n;n;n;e;e;n;find_task_road secret;secret_op1");
}
// 大旗门-危涯前----------------------------------------------------
function WeiYaQianFunc() {
    go("jh 25;w;find_task_road secret;secret_op1");
}
// 大昭-草原----------------------------------------------------
function CaoYuanFunc() {
    go("jh 26;w;find_task_road secret;secret_op1");
}
// 无名峡谷----------------------------------------------------
function WuMingFunc() {
    go("jh 29;n;n;n;n");
    setTimeout(MaoShanWuZhongFunc, 2000);
}
function MaoShanWuZhongFunc() {
    console.log($('span.outtitle').text());
    if ($('span.outtitle').text().indexOf("雾中") > 0) {
        go("event_1_60035830");
        setTimeout(MaoShanWuZhongFunc, 1000);
    } else if ($('span.outtitle').text().indexOf("平台") > 0) {
        setTimeout(MaoShanWuZhongFunc, 1000);
        go("event_1_65661209");
    } else if ($('span.outtitle').text().indexOf("洞口") > 0) {
        setTimeout(MaoShanWuZhongFunc, 1000);
        go("s;event_1_65661209");
    } else if ($('span.outtitle').text().indexOf("无名山峡谷") > 0) {
        go("find_task_road secret;secret_op1");
    }
}


//隐藏跨服按钮
var buttonhidenall2 = 1;
var buttonhideAllButton2 = document.createElement('button');
buttonhideAllButton2.innerText = '跨服';
buttonhideAllButton2.style.position = 'absolute';
buttonhideAllButton2.style.right = '0px';
buttonhideAllButton2.style.top = '540px';
//currentPos = currentPos + delta;
buttonhideAllButton2.style.width = buttonWidth + 66;
buttonhideAllButton2.style.height = buttonHeight + 36;
document.body.appendChild(buttonhideAllButton2);
buttonhideAllButton2.addEventListener('click', buttonhideAll2Func)
function buttonhideAll2Func() {
    if (buttonhidenall2 == 0) {
        buttonhidenall2 = 1
        buttonhiden1 = 1;
        buttonhideAllButton2.innerText = '跨服';
        hideButton1();
    } else {
        buttonhidenall2 = 0;
        buttonhiden1 = 0;
        buttonhideAllButton2.innerText = '隐藏';
        showButton1();
    }
}

//隐藏日常按钮
var buttonhidenall = 0;
var buttonhideAllButton = document.createElement('button');
buttonhideAllButton.innerText = '隐藏';
buttonhideAllButton.style.position = 'absolute';
buttonhideAllButton.style.right = '0px';
buttonhideAllButton.style.top = '520px';
//currentPos = currentPos + delta;
buttonhideAllButton.style.width = buttonWidth + 66;
buttonhideAllButton.style.height = buttonHeight + 36;
document.body.appendChild(buttonhideAllButton);
buttonhideAllButton.addEventListener('click', buttonhideAllFunc)
function buttonhideAllFunc() {
    if (buttonhidenall == 0) {
        buttonhidenall = 1
        buttonhiden = 1;
        buttonhideAllButton.innerText = '本服';
        hideButton();
    } else {
        buttonhidenall = 0;
        buttonhiden = 0;
        buttonhideAllButton.innerText = '隐藏';
        showButton();
    }
}

/* // switch 案例
    switch(localname){
        case "王蓉":
            setTimeout(TalkWangRong, currentTime); // 王蓉
            break;
        case "巫夜姬":
            setTimeout(TalkWuYeJi, currentTime);
            break;
        default:
            console.error("没有找到该奇侠：" + localname + " ！");
    }
*/

