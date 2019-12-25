// ==UserScript==
// @name         B20191219
// @namespace    http://tampermonkey.net/
// @version      2019.12.19
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

//自动连招变量
var sixqpvp = 0

//-------------------------分割线-----------
//var mySkillLists = "九天龙吟剑法;排云掌法;如来神掌;覆雨剑法;雪饮狂刀;翻云刀法;";
var zdskill = null;
var mySkillLists = "燎原百击;昊云破周斧;四海断潮斩;神龙东来;温厚折戟;冰月破魔枪;";
var mySkillListsHeal = "道种心魔经;紫血大法;";
var mySkillListsUnarmed = "天魔策;降龙廿八掌;";
var mySkillListsSword = "不凡三剑;天外飞仙;无剑之剑;";
var mySkillListsBlade = "天刀八诀;左手刀法;";
//-----自动绝学阵变量
var skillstr = "无剑之剑,温候戟舞,6,紫血大法";
var skillstr6 = "月夜鬼萧,无剑之剑,6,紫血大法";
var skillstr9 = "打狗棒法,温候戟舞,6,紫血大法";


// 突破用技能集合---------------------------------------------------
var SkillSet = {
    "油流麻香手": "spicyclaw",
    "小步玄剑": "mystsword",
    "无相金刚掌": "wuxiang-jingang-quan", "大力金刚拳": "jingang-quan", "无常杖法": "wuchang-zhang", "拈花指": "nianhua-zhi", "如来千叶手": "qianye-shou", "龙爪功": "longzhua-gong", "一指禅": "yizhi-chan", "散花掌": "sanhua-zhang", "达摩剑": "damo-jian", "般若掌": "banruo-zhang", "慈悲刀": "cibei-dao", "鹰爪功": "yingzhua-gong",
    "辟邪剑法": "pixie-sword", "葵花宝典": "kuihua-shengong", "魔闪诀": "mo-shan-jue",
    "倚天剑法": "yitian-sword", "天罡指": "tiangang-zhi", "金顶绵掌": "jinding-mianzhang", "雁行刀": "yanxing-dao", "诸天化身法": "zhutian",
    "蛤蟆神拳": "hamaquan", "蛤蟆神功": "hamashengong", "星宿毒掌": "xingxiu-duzhang", "连珠腐尸功": "lianzhu-fushi",
    "暴雨梨花针": "baoyu-lihua", "唐诗剑法": "tangshi-jian", "踏雪无痕": "notracesnow",
    "碧海潮生剑": "bihai-sword", "落英神剑掌": "luoying-zhang",
    "八荒功": "bahuang-gong", "天羽奇剑": "tianyu-qijian", "如意刀": "ruyi-dao",
    "七星夺魄剑": "sevenstar-sword-plus", "凌虚锁云步": "lingxubu",
    "独孤九剑": "dugu-jiujian",
    "屠龙刀法": "tulong-blade", "乾坤大挪移": "qiankun-danuoyi", "逍遥掌": "xiaoyao-zhang",
    "九阴噬骨刀": "jiuyin-blade", "九阴真经": "jiuyin", "九阴白骨爪": "jiuyin-baiguzhao",
    "七星剑法": "qixing-sword",
    "天师灭神剑": "tao-mieshen-sword", "天师剑法": "taosword",
    "太极神功": "taiji-shengong", "真武七截剑": "zhenwu-jian",
    "降龙十八掌": "xianglong-zhang", "逍遥游": "xiaoyaoyou",
    "帝王剑法": "king-sword",
    "短歌刀法": "shortsong-blade", "回风拂柳剑": "fuliu-jian", "雁行刀": "yanxing-dao", "天罡指": "tiangang-zhi",
    "柳家拳法": "liuh-ken", "封山剑法": "fonxansword",
    "白云杖法": "cloudstaff", "密宗大手印": "bloodystrike",
    "寒雪鞭法": "snowwhip", "柔虹指法": "tenderzhi",
    "斗战棍典 ": "douzhangundian", "霜寒十四棍": "shshisigun",
    "龙渊玉英杖": "tongshouzhang", "十二都天神杖": "tianshenzhang",
    "无归鞭法": "huimengwuheng", "捆仙鞭法": "kunxianbianfa",
    "不动明王诀": "budongmwj", "万象流云刀法": "wanxianglyd", "片雪疾剑": "pianxuejijian", "万仞血杀刀": "wanrenshadao", "十阳灭冥箭": "shiyangjian",
    "碧血心法": "bxxf", "烈血十式": "lxss", "镇国龙枪": "zglq", "天波九转": "tbjz",
    "九天龙吟剑法": "jiutian-sword", "覆雨剑法": "fuyu-sword", "织冰剑法": "binggong-jianfa",
    "如来神掌": "rulai-zhang", "排云掌法": "paiyun-zhang",
    "翻云刀法": "fanyun-blade",
    "孔雀翎": "kongqueling", "飞刀绝技": "feidao",
    "道种心魔经": "dzxinmojing",
    "生生造化功": "sszaohuagong",
    "玄天杖法": "xtzf", "辉月杖法": "hyzf",
    "拈花解语鞭": "zhjyb", "十怒绞龙索": "snjls",
    "万流归一": "wanliuguiyi",
    "九溪断月枪": "jxdyq", "燎原百破": "lybp",
    "千影百伤棍": "qybsg", "破军棍诀": "pjgj",
};
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


//战斗调用通用脚本----------------------------------------------------
var banSkills = "天师灭神剑|茅山道术";
function ninesword() {
    zdskill = mySkillLists;
    setTimeout(ninesword1, 1000);
    if ($('span.outbig_text:contains(战斗结束)').length > 0) {
        clickButton('prev_combat');
        nowXueTempCount = 0;
        paustStatus = 0;
    }
}
/*
function nineswordUnarmed() {
    zdskill = mySkillListsUnarmed;
    setTimeout(ninesword1, 1000);
    if ($('span.outbig_text:contains(战斗结束)').length > 0) {
        clickButton('prev_combat');
        nowXueTempCount = 0;
        paustStatus = 0;
    }
}
*/
function ninesword1() {
    // 如果找到设置的技能则释放
    for (var i = 1; i < 8; i++) {
        skillName = $('#skill_' + i).children().children().text();
        if (skillName !== "" && isContains(zdskill, skillName)) {
            console.log(skillName);
            clickButton('playskill ' + i);
            return;
        }
    }
/*
    // 如果没找到设置技能，随便用一个非招bb的技能
    for (i = 1; i < 7; i++) {
        skillName = $('#skill_' + i).children().children().text();
        if (skillName !== "" && !isContains(banSkills, skillName)) {
            console.log(skillName);
           // clickButton('playskill ' + i);
            return;
        }
    }
 */
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
createButton('晚安', btnBox0, Goodnight);
createButton('外传日常', btnBox0, WaiZhuanRiChangFunc);
createButton('直通车', btnBox0, ZhiTongCheFunc);
createButton('辅助集合', btnBox0, FuZhuJiFunc);
//createButton('整理包裹', btnBox0, clearBag);
createButton('一键恢复', btnBox0, yijianhuifuFunc);
createButton('战斗补血', btnBox0, addXueFunc);
createButton('战斗装', btnBox0, ZhuangBei);
createButton('摸尸体', btnBox0, AutoGetFunc);
createButton('逃跑', btnBox0, escapeFunc);
createButton('开单阵', btnBox0, autoBattleFunc);
createButton('自动三气', btnBox0, AutoKillFunc);
createButton('青龙监听', btnBox0, listenQLFunc);
createButton('兽雀', btnBox0, shouqueFunc);
createButton('换技能', btnBox0, huanjinengFunc);
createButton('白陀', btnBox0, btsFunc);
//createButton('开领奖',btnBox0,getRewardsFunc);
//createButton('合宝石', btnBox0, heBaoshi);
//createButton('怼人', btnBox0, PaLou);
//createButton('连招', btnBox0, LianZhao);
//createButton('设单阵', btnBox0, settingSkillstr6);
//createButton('设群阵', btnBox0, settingSkillstr9);

//createButton('交悬红', btnBox0, LingxuanhongFunc);
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
    btnList['晚安'].style.visibility = "hidden";
    btnList['外传日常'].style.visibility = "hidden";
    btnList['直通车'].style.visibility = "hidden";
    btnList['辅助集合'].style.visibility = "hidden";
    //btnList['整理包裹'].style.visibility = "hidden";
    btnList['一键恢复'].style.visibility = "hidden";
    btnList['战斗补血'].style.visibility = "hidden";
    btnList['战斗装'].style.visibility = "hidden";
    btnList['摸尸体'].style.visibility = "hidden";
    btnList['逃跑'].style.visibility = "hidden";
    btnList['开单阵'].style.visibility = "hidden";
    btnList['自动三气'].style.visibility = "hidden";
    btnList['青龙监听'].style.visibility = "hidden";
    btnList['兽雀'].style.visibility = "hidden";
    btnList['换技能'].style.visibility = "hidden";
    btnList['白陀'].style.visibility = "hidden";
}
    // btnList['开领奖'].style.visibility="hidden";
    //    btnList['合宝石'].style.visibility = "hidden";
    //    btnList['怼人'].style.visibility = "hidden";
    //    btnList['设单阵'].style.visibility = "hidden";
//    btnList['设群阵'].style.visibility = "hidden";

//    btnList['连招'].style.visibility = "hidden";
function showButton() {
    btnBox0.style.visibility = "visible";
    btnList['签到'].style.visibility = "visible";
    btnList['晚安'].style.visibility = "visible";
    btnList['外传日常'].style.visibility = "visible";
    btnList['直通车'].style.visibility = "visible";
    btnList['辅助集合'].style.visibility = "visible";
  //  btnList['整理包裹'].style.visibility = "visible";
    btnList['一键恢复'].style.visibility = "visible";
    btnList['战斗补血'].style.visibility = "visible";
    btnList['战斗装'].style.visibility = "visible";
    btnList['摸尸体'].style.visibility = "visible";
    btnList['逃跑'].style.visibility = "visible";
    btnList['开单阵'].style.visibility = "visible";
    btnList['自动三气'].style.visibility = "visible";
    btnList['青龙监听'].style.visibility = "visible";
    btnList['兽雀'].style.visibility = "visible";
    btnList['换技能'].style.visibility = "visible";
    btnList['白陀'].style.visibility = "visible";
     // btnList['开领奖'].style.visibility="visible";
    //    btnList['合宝石'].style.visibility = "visible";
    //    btnList['怼人'].style.visibility = "visible";
//    btnList['设单阵'].style.visibility = "visible";
//    btnList['设群阵'].style.visibility = "visible";

//    btnList['连招'].style.visibility = "visible";
}

//我是谁？？？
var myname = "我是谁";
var myMaxKee = 0;
var myMaxForce = 0;
var myForcePercent = 100;
var myID = '', sm_MastID;
function WhoAmIFunc() {
    clickButton("score");
    var llmyattrs = g_obj_map.get("msg_attrs");
    if (llmyattrs) {
        myID = llmyattrs.get("id"); //自己的ID
        sm_MastID = llmyattrs.get("master_id");
        if (myID == 'u7755231') {   // 1区圆
            skillstr6 = "冰月破魔枪,6,道种心魔经";
            skillstr9 = "月夜鬼萧,冰月破魔枪,6,紫血大法";
            mySkillLists = "冰月破魔枪";
            //listenQLFunc();
            // AutoKillFunc();
            // autoBattleFunc();
            addXueFunc();
        }
        if (myID == 'u6728898') {   // 天马
            skillstr6 = "月夜鬼萧,无剑之剑,6,紫血大法";
            skillstr9 = "打狗棒法,温候戟舞,6,紫血大法";
            mySkillLists = "温候戟舞,无剑之剑";
            //autoBattleFunc();
            addXueFunc();
            healtriger = 0;
        }
        if (myID == 'u6744859') {   //川哥
            skillstr6 = "玄天杖法,织冰剑法,6,道种心魔经";
            skillstr9 = "千影百伤棍,四海断潮斩,6,道种心魔经";
            mySkillLists = "四海断潮斩";
            // listenQLFunc();
            // AutoKillFunc();
            // autoBattleFunc();
            addXueFunc();
        }
         if (myID == 'u7226745'){   // 和尚
              skillstr6 = "月夜鬼萧,月夜鬼萧,4,紫血大法";
              skillstr9 = "月夜鬼萧,神龙东来,6,紫血大法";
              mySkillLists = "冰月破魔枪,神龙东来,燎原白击";
              //autoBattleFunc();
              addXueFunc();
               healtriger = 0;
          }
        /*  if (myID == 'u7630388'){   // 烦
              skillstr6 = "玄天杖法,九溪断月枪,6,道种心魔经";
              skillstr9 = "千影百伤棍,燎原百破,6,道种心魔经";
              mySkillLists = "九溪断月枪;燎原百破";
              autoBattleFunc();
              addXueFunc();
          }*/
        getSettingSkillsMessage()
        // 监听青龙
        //listenQLFunc();
        // 监听云远寺
        //DiTuSuiPianFunc();
        console.log(myID + "--" + g_simul_efun.replaceControlCharBlank(llmyattrs.get("name")) + "--" + llmyattrs.get("master_id"));
    }
    setTimeout(WhoAmI1Func, 2000);
}

function WhoAmI1Func() {
    console.log("whoami1");
    var elem = $('span.out3:contains(】)').first();
    var m = elem.text().match(/】(.*)/);
    var qixue = $('span.out3:contains(【气血】)').text();
    var neili = $('span.out3:contains(【内力】)').text();
    console.log(qixue);
    var qixueNum = qixue.match(/\d{1,}/g);// 气血
    var neiliNum = neili.match(/\d{1,}/g);// 内力
    var isMax = qixueNum[1] - qixueNum[0];
    myMaxKee = qixueNum[1];
    myMaxForce = neiliNum[1];
    if (m !== null) {
        myname = g_simul_efun.replaceControlCharBlank(m[1]);
    } else {
        WhoAmIFunc();
    }
    clickButton("prev");
}

setTimeout(function () { WhoAmIFunc(); }, 2000);

function getGretting(qu, llmyattrs, myID) {
    recvNetWork2("<span class='out2'><span style='color:rgb(32, 209, 235)'>您好， </span><span style='color:rgb(118, 235, 32)'>" + qu + " 区 " + g_simul_efun.replaceControlCharBlank(llmyattrs.get("name")) + " , 您的 ID 为 " + myID + " </span></span>")
}

function getSettingSkillsMessage() {
    recvNetWork2("<span class='out2'><span style='color:rgb(235, 218, 32)'>开启阵: </span><span style='color:rgb(118, 235, 32)'>" + skillStatus + "</span></span>" +
        "<span class='out2'><span style='color:rgb(235, 218, 32)'>单阵: </span><span style='color:rgb(118, 235, 32)'>" + skillstr6 + "</span></span>" +
        "<span class='out2'><span style='color:rgb(235, 218, 32)'>群阵: </span><span style='color:rgb(118, 235, 32)'>" + skillstr9 + "</span></span>")
}

function getQLListenMessage() {
    recvNetWork2("<span class='out2'><span style='color:rgb(235, 218, 32)'>青龙监听: " + (QLtrigger === 1 ? "</span><span style='color:rgb(118, 235, 32)'>开启" : '关闭') + "</span></span>")
}

function getKFQLListenMessage() {
    recvNetWork2("<span class='out2'><span style='color:rgb(235, 218, 32)'>跨服青龙(镖车)监听: " + (KFQLtrigger === 1 ? "</span><span style='color:rgb(118, 235, 32)'>开启" : '关闭') + "</span></span>")
}

function getYWSListtenMessage() {
    recvNetWork2("<span class='out2'><span style='color:rgb(235, 218, 32)'>云远寺监听: " + (ditusuipian === 1 ? "</span><span style='color:rgb(118, 235, 32)'>开启" : '关闭') + "</span></span>")
}

//叫杀NPC-----------------------------------------------------------------------------------------------------
function Getnpcid() { tarNPC = prompt("输入NPC的ID", "changan_neigongjinwei"); }

function killnpc() {
    console.log(tarNPC);
    clickButton('kill ' + tarNPC);
}

function settingSkillstr6() {
    let skillstr_s = prompt("设置单阵: 技能1,技能2,攒气数,技能3(攒气数为9时可释放) 例如: 排云掌法,九天龙吟剑法,6,道种心魔经 （逗号为英文字母逗号)", skillstr6);
    if (skillstr_s && checkInputSkill(skillstr_s)) {
        skillstr6 = skillstr_s
        getSettingSkillsMessage()
    }
}
function settingSkillstr9() {
    let skillstr_s = prompt("设置群阵: 技能1,技能2,攒气数,技能3(攒气数为9时可释放) 例如: 千影百伤棍,燎原百破,9,道种心魔经 （逗号为英文字母逗号)", skillstr9);
    if (skillstr_s && checkInputSkill(skillstr_s)) {
        skillstr9 = skillstr_s
        getSettingSkillsMessage()
    }
}

function checkInputSkill(skillstr_s) {
    let skills = skillstr_s.split(",");
    if (!skills || skills.length < 3) {
        recvNetWork2(skillstr_s)
        recvNetWork2("<span class='out2'><span style='color:rgb(255, 10, 10)'>逗号请使用英文输入法逗号.</span><span style='color:rgb(118, 235, 32)'>设置: 技能1,技能2,攒气数,技能3(攒气数为9时可释放) 例如: 排云掌法,九天龙吟剑法,6,千影百伤棍 （逗号为英文字母逗号) </span></span>")
        return false
    }
    let skillname1 = skills[0];
    let skillname2 = skills[1];
    let power = skills[2];
    if (!skillname1 || !skillname2 || !SkillSet[skillname1] || !SkillSet[skillname2]) {
        recvNetWork2("<span class='out2'><span style='color:rgb(255, 10, 10)'>技能名称有误.</span><span style='color:rgb(118, 235, 32)'>设置: 技能1,技能2,攒气数,技能3(攒气数为9时可释放) 例如: 排云掌法,九天龙吟剑法,6,千影百伤棍 （逗号为英文字母逗号) </span></span>")
        return false
    }

    if (!power || !Number.isInteger(Number(power)) || Number(power) < 1 || Number(power) > 9) {
        recvNetWork2("<span class='out2'><span style='color:rgb(255, 10, 10)'>攒气数有误.</span><span style='color:rgb(118, 235, 32)'>设置: 技能1,技能2,攒气数,技能3(攒气数为9时可释放) 例如: 排云掌法,九天龙吟剑法,6,千影百伤棍 （逗号为英文字母逗号) </span></span>")
        return false
    }
    return true
}

//自动绝学阵|| btnList['自动绝学'].innerText == '自动绝学
var autoBattleTimer;
var skillStatus = '停阵'
function autoBattleFunc() {
    var playerName = sessionStorage.getItem("playerName");
    var playerMaxHp = sessionStorage.getItem("playerMaxHp");
    console.log(playerName + playerMaxHp);
    clearInterval(autoBattleTimer);
    if (btnList['开单阵'].innerText == '开单阵') {
        btnList['开单阵'].innerText = '开群阵';
        skillStatus = '开单阵'
        skillstr = skillstr6;
        //   clickButton('enable mapped_skills restore go 1', 1);
        //  clickButton('golook_room');
        autoBattleTimer = setInterval(function () { doAttack(skillstr, playerName, playerMaxHp) }, 1000);
    } else if (btnList['开单阵'].innerText == '开群阵') {
        btnList['开单阵'].innerText = '停 阵';
        skillStatus = '开群阵'
        skillstr = skillstr9;
        console.log(skillstr9);
        // clickButton('enable mapped_skills restore go 2', 1);
        //  clickButton('golook_room');
        autoBattleTimer = setInterval(function () { doAttack(skillstr, playerName, playerMaxHp) }, 1000);
    } else if (btnList['开单阵'].innerText == '停 阵') {
        btnList['开单阵'].innerText = '开单阵';
        skillStatus = '停阵'
        skillstr = null;
        clearInterval(autoBattleTimer);
        //   clickButton('enable mapped_skills restore go 3', 1);
    }
}

function doAttack(skillstr, playerName, playerMaxHp) {
    //
    if ($('span.outbig_text:contains(战斗结束)').length > 0) {
        clickButton('prev_combat');
        nowXueTempCount = 0;
        console.log("doAttack log");
        if (lootFlag == 1) { clickButton('golook_room'); setTimeout(AutoGet1, 300); }
        paustStatus = 0;
    }
    if (gangsFightControl() == "Y") { //在战斗中时才干活
        var skills = skillstr.split(",");
        var skillname1 = skills[0];
        var skillname2 = skills[1];
        var power = skills[2];
        var skillname3 = skills[3];

        var skillButtons = document.getElementById("page").getElementsByClassName('cmd_skill_button');
        var skill1;
        var skill2;
        var skill3;
        for (var i = 0; i < skillButtons.length; i++) {
            var onclickValue = skillButtons[i].getAttribute('onclick');
            var iStart = onclickValue.indexOf("clickButton('");
            var iEnd = onclickValue.indexOf("', 0)");

            if (skillButtons[i].textContent == skillname1) {
                skill1 = onclickValue.substring(iStart + 13, iEnd);
            }
            else if (skillButtons[i].textContent == skillname2) {
                skill2 = onclickValue.substring(iStart + 13, iEnd);
            }
            else if (skillButtons[i].textContent == skillname3) {
                skill3 = onclickValue.substring(iStart + 13, iEnd);
            }
        }

        var powerLine = document.getElementById('combat_xdz_text')
        var powerPoint = powerLine.innerText;
        var pp = powerPoint.substring(0, powerPoint.indexOf('/'));
        //        if(pp >= power){
        if (pp - power >= 0) {
            console.log('attack!');
            clickButton(skill1, 0);
            clickButton(skill2, 0);
            if (power == 9) { clickButton(skill3, 0) }
        }
    }
}
//======================================
function btsFunc() { go("jh 21;"); }

//直通目的地---------------------------------------------------------------------------------------------------------
function ZhiTongCheFunc() {
    ztc_popbk.style.display = "";
}
var ztc_popbk = createPop('直通车');
popList['直通车'].innerHTML = '<div>选择目的地</div>';

//幽冥门口--------------------------------------------------
createPopButton('幽冥副本', '直通车', YMfbFunc);
function YMfbFunc() { go("jh 45;ne;ne;n;n;ne;ne;e;ne;n;n;n;n;n;ne;ne;n;n;n;nw;nw;n;e;e;e;e;e;"); }

//越女白猿--------------------------------------------------
createPopButton('白猿', '直通车', YNBYFunc);
function YNBYFunc() { go("jh 50;ne;ne;n;n;n;ne;ne;ne;n;n;n;"); }
//---jh 8;w;nw;n;n;n;n;e;e;n;n;e;fight emei_shoushan;golook_room;n;eval_halt_move();golook_room;n;n;n;w;----

//西凉铁剑--------------------------------------------------
createPopButton('铁剑', '直通车', XLTJFunc);
function XLTJFunc() { go("jh 47;ne;n;n;n;ne;ne;e;e;e;e;ne;n;ne;n;n;n;n;n;nw;nw;ne;n;ne;n;"); }


//铸剑洞--------------------------------------------------
createPopButton('铸剑洞', '直通车', ZJDFunc);
function ZJDFunc() { go("jh 50;ne;ne;n;n;n;ne;ne;ne;se;se;se;;s;s;s;s;se;se;e;n;n;n;n;n;n;n;n;n;n;n;ne;"); }

//霹雳堂--------------------------------------------------
createPopButton('霹雳堂', '直通车', JLPLTFunc);
function JLPLTFunc() { go("jh 51;n;n;n;n;n;n;w;"); }

//大昭寺--------------------------------------------------
createPopButton('大昭紫僧', '直通车', dzsFunc);
function dzsFunc() { go("jh 26;w;w;w;w;w;n"); }
//西市大街--------------------------------------------------
createPopButton('西市大街', '直通车', XiShiDaJieFunc);
function XiShiDaJieFunc() {
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;n;w;w;n;");
}
//西凉方子敬--------------------------------------------------
createPopButton('方子敬', '直通车', XLFZJFunc);
function XLFZJFunc() { go("jh 47;ne;n;n;n;ne;ne;e;e;e;e;ne;n;ne;e;e;n;n;n;n;n;n;ne;n;event_1_33181360;"); }

//少林罗汉--------------------------------------------------
createPopButton('少林罗汉','直通车',SLLHFunc);
function SLLHFunc(){ go("jh 13;n;n;n;n;enable mapped_skills restore 2;"); }

//称号飞白猿-------------------------
createPopButton('飞白猿','直通车',FbyFunc);
function FbyFunc() {
    go('rank go 209;sw;s;s;s;s;s;s;s;s;s;s;s;w;w;n;n;n;n;nw;nw;nw;nw;n;n;n;');     //飞白陀
}
//称号飞葬剑-------------------------
createPopButton('飞葬剑','直通车',FzjFunc);
function FzjFunc() {
    go('rank go 222');//飞
}

//KB--------------------------------------------------
createPopButton('  ', '直通车', KB1Func);
function KB1Func() { go(""); }

/*
//KB--------------------------------------------------
createPopButton('   ', '直通车', KB2Func);
function KB2Func() { go(""); }
//武当山--------------------------------------------------
createPopButton('武当广场', '直通车', wdFunc);
function wdFunc() { go("jh 10;w;n;n;w;w;w;n;n;n;n;"); }

//晚月--------------------------------------------------
createPopButton('晚月大门', '直通车', wyFunc);
function wyFunc() { go("jh 11;e;e;s;sw;se;"); }

//水烟阁--------------------------------------------------
createPopButton('水烟阁', '直通车', sygFunc);
function sygFunc() { go("jh 12;"); }

//少林寺--------------------------------------------------
createPopButton('少林寺', '直通车', slsFunc);
function slsFunc() { go("jh 13;"); }

//唐门--------------------------------------------------
createPopButton('唐门', '直通车', tmFunc);
function tmFunc() { go("jh 14;"); }

//青城--------------------------------------------------
createPopButton('青城', '直通车', qcFunc);
function qcFunc() { go("jh 15;"); }

//逍遥林--------------------------------------------------
createPopButton('逍遥吴统', '直通车', xylFunc);
function xylFunc() { go("jh 16;s;s;s;s;e;e;s;w;w;"); }

//开封--------------------------------------------------
createPopButton('开封', '直通车', kfFunc);
function kfFunc() { go("jh 17;"); }

//明教--------------------------------------------------
createPopButton('明教', '直通车', mjFunc);
function mjFunc() { go("jh 18;"); }

//全真教--------------------------------------------------
createPopButton('全真大门', '直通车', qzjFunc);
function qzjFunc() { go("jh 19;s;s;s;sw;s;e;n;nw;n;n;n;"); }

//古墓--------------------------------------------------
createPopButton('古墓墓门', '直通车', gmFunc);
function gmFunc() { go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;s;"); }


//嵩山--------------------------------------------------
createPopButton('嵩山', '直通车', ssFunc);
function ssFunc() { go("jh 22;"); }

//寒梅庄--------------------------------------------------
createPopButton('寒梅庄', '直通车', hmzFunc);
function hmzFunc() { go("jh 23;"); }

//泰山--------------------------------------------------
createPopButton('泰山', '直通车', tsFunc);
function tsFunc() { go("jh 24;"); }

//大旗门--------------------------------------------------
createPopButton('大旗门', '直通车', dqmFunc);
function dqmFunc() { go("jh 25;"); }


//魔教--------------------------------------------------
createPopButton('魔教', '直通车', mojFunc);
function mojFunc() { go("jh 27;"); }

//28星宿海--------------------------------------------------
createPopButton('星宿海', '直通车', xxhFunc);
function xxhFunc() { go("jh 28;"); }

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

function glz() {
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "侠客岛渡口") {
        alert("请位于 #侠客岛渡口# 位置再点 #高老者# 按钮！");
        return;
    }
    go("e;ne;ne;ne;e;e;e;e;e;e;n;n;n;e;ne;nw;");
}

function xlsc() {
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "彩虹瀑布") {
        alert("请位于 #彩虹瀑布# 位置再点 #雪林深处# 按钮！");
        return;
    }
    go("w;w;w;n;e;n;w;w;s;");
}
function cxl() {
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "彩虹瀑布") {
        alert("请位于 #彩虹瀑布# 位置再点 #雪林深处# 按钮！");
        return;
    }
    go("w;n;e;e;n;se;");
}
function sbz() {
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "侠客岛渡口") {
        alert("请位于 #侠客岛渡口# 位置再点 #雪林深处# 按钮！");
        return;
    }
    go("e;se;e;e;n;e;s;");
}
function zx() {
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "侠客岛渡口") {
        alert("请位于 #侠客岛渡口# 位置再点 #朱熹# 按钮！");
        return;
    }
    go("e;ne;ne;ne;e;e;e;e;e;e;n;n;n;w;w;");
}
function xyk() {
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "侠客岛渡口") {
        alert("请位于 #侠客岛渡口# 位置再点 #谢烟客# 按钮！");
        return;
    }
    go("e;ne;ne;ne;e;e;e;e;e;e;n;e;e;ne;");
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

*/
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
createPopButton('试剑', '外传日常', ShiJianFunc);
createPopButton('比试铜人', '外传日常', BiShiTongRenFunc);
createPopButton('本六', '外传日常', InstanceSix);
//createPopButton('苗疆炼药', '外传日常', MjlyFunc);
//createPopButton('铁血日常', '外传日常', TiexueFunc);
//createPopButton('天山挂机', '外传日常', TsdzFunc);
createPopButton('打榜', '外传日常', PaiHangFunc);
createPopButton('特殊正邪', '外传日常', DiTuSuiPianFunc);
createPopButton('自动一条', '外传日常', behqOneKeyFunc);// 自动打这四个外传
createPopButton('天山七剑', '外传日常', TianShanQiJianFunc);
//createPopButton('白坨闯阵', '外传日常', pozhenFunc);
//createPopButton('青城孽龙', '外传日常', nielongFunc);
//createPopButton('峨眉解围', '外传日常', JinlangFunc);
//createPopButton('恒山杀神', '外传日常', shashenFunc);
//createPopButton('少林伏魔', '外传日常', dujieFunc);
//createPopButton('白坨奇袭', '外传日常', tuxiFunc);
createPopButton('毒魔', '外传日常', KunLunFeiDuFunc);
//createPopButton('V外传', '外传日常', waizhuanQuandianFunc);// 元宝点2-白坨闯阵，3-青城孽龙，5-峨眉解围，10-恒山山贼，11-唐门试炼； 12-长安糖葫芦，13-峨眉再战孤城，14-扬州听琴，15-少林伏魔，16-白坨奇袭   捐金锭换果子；帮本1，卖蛋壳

createPopButton('绝杀', '外传日常', jsFunc);
createPopButton('木人','外传日常',murenFunc);
createPopButton('铁血求教','外传日常',tiexueqiujiaoFunc);
createPopButton('邪分级', '外传日常', xfjFunc);
createPopButton('射雕', '外传日常', shediaoFunc);
createPopButton('佳人觅香', '外传日常', JRMXFunc);
//佳人觅香------------------------------------------------
function JRMXFunc(){
 go("jh 32;n;n;se;e;s;s;event_1_99232080;e;e;s;e;s;e;e;e;event_1_2207248");
}
//射雕----------------------------------------------------
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

//云海绝杀--------------------------------------------------
function jsFunc() { go("jh 44;n;n;n;n;e;ne;ne;ne;n;n;n;n;n;nw;nw;nw;w;n;n;n;n;w;n;n;n;n;w;n;e;e;n;n;n;n;n;n;n;n;"); }

//木人--------------------------------------------------
function murenFunc(){ go("jh 41;se;e;e;se;se;se;se;se;se;event_1_57976870;n;n;n;event_1_91914705;e;e;e;"); }

//铁血求教--------------------------------------------------
function tiexueqiujiaoFunc(){
    go("jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;n;n;n;w;w;event_1_57281457;");
}

//邪分级--------------------------------------------------
function xfjFunc() { go("jh 44;n;n;n;n;e;ne;ne;ne;n;n;n;n;n;nw;nw;nw;w;n;n;n;e;e;e;e;e;e;n;n;n;n;n;n;n;n;n;n;n;n;n;;e;e;ne;ne;e;se;se;se;"); }


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
    //go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
    go('vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig');//挖宝
    go('vip finish_fb dulongzhai;vip finish_fb dulongzhai;vip finish_fb junying;vip finish_fb junying;vip finish_fb beidou;vip finish_fb beidou;vip finish_fb youling;vip finish_fb youling;vip finish_fb siyu;vip finish_fb changleweiyang;vip finish_fb heishuihuangling;vip finish_fb jiandangfenglingdu; ');//副本扫荡
    go('vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;');//钓鱼
    go('clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan buy 302;clan buy 302;clan buy 302;clan buy 302;clan buy 302;clan buy 401;clan buy 501;clan buy 601;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;');//上香
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 6;share_ok 7;");//分享
    go('cangjian get_all;xueyin_shenbinggu blade get_all;xueyin_shenbinggu unarmed get_all;xueyin_shenbinggu throwing get_all;xueyin_shenbinggu spear get_all;xueyin_shenbinggu stick get_all;xueyin_shenbinggu whip get_all;xueyin_shenbinggu staff get_all;');//闯楼奖励
 //   go("jh 1;e;e;event_1_63788647;w;n;e;e;e;e;n;lq_bysf_lb;lq_lmyh_lb;home;");//比翼双飞和劳模英豪
    go('jh 2;n;n;n;n;n;n;n;e;tzjh;touzi_jihua2 buygo 6;tzjh_lq;w;n;n;n;n;n;n;n;n;n;n;n;n;e;n;n;n;w;event_1_31320275;home');//理财采莲
    go('jh 5;n;n;n;w;sign7;home;');//扬州签到
    // go("jh 5;n;n;n;n;n;n;n;n;w;w;w;s;e;e;s;s;e;e;s;s;s;event_1_30729073;event_1_30729073 go;home");//扬州听琴
    // go('jh 14;sw;s;e;s;s;sw;sw;w;w;s;s;e;e;e;n;ne;event_1_56989555 go;home');//唐门试炼
    go('jh 26;w;w;n;e;e;event_1_18075497;home');//大招采矿
    go('jh 26;w;w;n;n;event_1_14435995;home');//大招破阵
    go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home");//绝情谷鳄鱼
    go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;home'); //冰火岛玄重铁
    go("eval_shediaoFunc()");//射雕
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


// 换装备 -----在用--------------------------------------------------
function ZhuangBei() {
    if (btnList["战斗装"].innerText == '战斗装') {
        console.log("切换战斗装备！");
        go('auto_equip on');// 一键装备
     go('unwield longwulianmoge_yuyemoqiang');//脱魔枪
     go('unwield longwulianmoge_fengleixuefu');//脱风雷
     go('unwield longwulianmoge_xiefoyaochui');//脱妖锤
     go('unwield longwulianmoge_mojianlianhun');//脱魔剑
   //go('unwield weapon_sb_unarmed11');       // 脱拳套
   //go('unwield weapon_sb_sword12');       // 脱轩辕剑
   //go('unwield weapon_sb_spear12');       // 脱枪
     go('wield weapon_sb_spear12 rumai');// 入脉枪
   //go('wield weapon_sb_spear12');       // 穿枪
   //go('wield weapon_sb_sword12');        //穿轩辕剑
   //go('wield weapon_sb_stick12 rumai');        //穿破宇棍

        btnList["战斗装"].innerText = '打坐装';
    }
    else {
        console.log("切换打坐装备！");
     go('auto_equip on');       // 一键装备
     go('unwield weapon_sb_stick12');       // 脱棍子
     go('unwield weapon_sb_sword12');       // 脱剑
   //go('wield sword of windspring rumai');       // 风泉
     go('wield sword of windspring');       // 风泉
     go('wear longyuan banzhi moke');       // 龙渊
     go('wear equip_finger_kongdong_bulao');       // 博睿扳指equip_head_dashi_wushuang
     go('wear equip_head_tianji_jiuxuan'); // 天机帽
     go('wear tianlongsi_mumianjiasha'); //木棉衣服
   //go('wield longwulianmoge_mojianlianhun');//穿魔剑
     go('wield weapon_stick_miaoyun_lhx');       // 装笛子
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
        go('wear equip_finger_kongdong_bulao');       // 博睿扳指equip_head_dashi_wushuang
        go('wear equip_head_tianji_jiuxuan');       // 天机帽
        btnList["战斗装"].innerText = '战斗装';
    }
}


//接悬红-------------------------
function LingxuanhongFunc() {
    go('home;jh 1;w;event_1_40923067;');     //接悬红
}
//嵩山任务-------------------------
function SongshanFunc() {
    go('home;jh 22;n;n;w;n;n;n;n;n;e;n;n;n;n;n;n;n;n;event_1_55671421;');     //接嵩山
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


//自动战斗--------------------------
function AutoKillFunc() {
    if (btnList["自动三气"].innerText == '自动三气') {
        AutoKill1Func();
        btnList["自动三气"].innerText = '手动战斗';
    }
    else {
        clearKill2();
        { btnList["自动三气"].innerText = '自动三气'; }
    }
    function AutoKill1Func() {
        // 间隔500毫秒查找比试一次
        AutoKill1FuncIntervalFunc = setInterval(AutoKill1, 500);
    }

    function clearKill2() {
        clearInterval(AutoKill1FuncIntervalFunc);
    }

    function AutoKill1() {
        ninesword();
        if ($('span.outbig_text:contains(战斗结束)').length > 0) {
            clickButton('prev_combat');
            nowXueTempCount = 0;
            console.log("AutoKill1 log");
            if (lootFlag == 1) { clickButton('golook_room'); setTimeout(AutoGet1, 300); }
            paustStatus = 0;
        }
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
//导入技能1-------------------------
function huanjinengFunc(){
    go("enable mapped_skills restore 1;");
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
var ShiJianFlg = 0;
    function ShiJianFunc(){
    if(ShiJianFlg == 0){
        go('home');
        go('swords');
        go('swords select_member xiaoyao_tonglao');//天山童姥
        go('swords select_member taoist_zhangtianshi');//张天师
        go('swords select_member mingjiao_zhang');//张教主
        go('swords fight_test go');
		ShiJianFlg = 1;
    }
    else{
         ShiJianFlg = 0;
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
//createPopButton('突破练习', '辅助集合', PTFunc);
//createPopButton('谜题卡', '辅助集合', MiTiKaFunc);
//createPopButton('掌门手谕', '辅助集合', ZhangMenShouYuFunc);
//createPopButton('刷碎片', '辅助集合', SnakeFunc);
//createPopButton('刷年兽', '辅助集合', XueTingNianShouFunc);
//createPopButton('刷姥姥', '辅助集合', ShuaLaoLaoFunc);
createPopButton('清谜题', '辅助集合', clearPuzzleFunc);
//createPopButton('洛阳理财', '辅助集合', LuoYangLiCaiFunc);
createPopButton('风泉剑', '辅助集合', FengquanFunc);
createPopButton('买灵芝', '辅助集合', buyMedecineFunc);
//createPopButton('买白羽箭', '辅助集合', buyArrowFunc);
//createPopButton('买糖葫芦', '辅助集合', buyTanghuluFunc);
//createPopButton('谜题密码', '辅助集合', quizCodeFunc);
//createPopButton('捡钥匙', '辅助集合', JianyaoshiFunc);
//createPopButton('合宝石', '辅助集合', heBaoshi);
createPopButton('开白银', '辅助集合', KaibaiyinFunc);
createPopButton('开青木', '辅助集合', KaiqingmuFunc);
createPopButton('开盒子', '辅助集合', KaihezhiFunc);
createPopButton('用耀玉', '辅助集合', YongyaoyuFunc);
createPopButton('用黄金', '辅助集合', YonghuangjinFunc);
createPopButton('用铂金', '辅助集合', YongbojinFunc);
createPopButton('挖天证', '辅助集合', WTZFunc);
createPopButton('挖地证', '辅助集合', WDZFunc);
createPopButton('对话', '辅助集合', DHFunc);
//对话--------------------------------------------------
function DHFunc() {
    var numb1 = 4000;
    for (var i = 0; i < numb1; i++) { // 从第一个开始循环
        function DHT(){
        go("ask tianlongsi_chaishao"); //开白银
        }
        setTimeout(DHT,800);
    }
}//开白银--------------------------------------------------
function KaibaiyinFunc() {
    var numb1 = 4000;
    for (var i = 0; i < numb1; i++) { // 从第一个开始循环
        function KBY(){
        go("items;items use baiyin box_N_100"); //开白银
        }
        setTimeout(KBY,800);
    }
}
//挖天证--------------------------------------------------
function WTZFunc() {
    for (var i = 0; i < 100; i++) { // 从第一个开始循环
        go("event_1_21731755"); //进洞
             for(var j = 0;j<5;j++){
             go("event_1_22920188");
             }
        setTimeout(800);
      }
   }
//挖地证--------------------------------------------------
function WDZFunc() {
    for (var i = 0; i < 100; i++) { // 从第一个开始循环
        go("event_1_83697921"); //进洞
             for(var j = 0;j<5;j++){
             go("event_1_64388826");
             }
        setTimeout(800);
      }
}
//开青木--------------------------------------------------
function KaiqingmuFunc() {
   var numb2 = 700;
    for (var i = 0; i < numb2; i++) { // 从第一个开始循环
       function KQM(){
        go("items;items use obj_qingmubaoxiang_N_100"); //铂金obj_box3耀玉obj_yaoyubaoxiang；开青木obj_qingmubaoxiang_N_100;千年灵草qiannianlingcao_N_100;千年紫芝qiannian zizhi_N_100
         }
         setTimeout(KQM,800);
    }
}
//用耀玉--------------------------------------------------
function YongyaoyuFunc() {
   var numb2 = 700;
    for (var i = 0; i < numb2; i++) { // 从第一个开始循环
       function YYYM(){
        go("items;items use obj_yaoyubaoxiang"); //铂金obj_box3耀玉；开青木obj_qingmubaoxiang_N_100;千年灵草qiannianlingcao_N_100;千年紫芝qiannian zizhi_N_100
         }
         setTimeout(YYYM,800);
    }
}
//用铂金--------------------------------------------------
function YongbojinFunc() {
   var numb2 = 700;
    for (var i = 0; i < numb2; i++) { // 从第一个开始循环
       function YBJM(){
        go("items;items use obj_box3"); //铂金obj_box3耀玉obj_yaoyubaoxiang；开青木obj_qingmubaoxiang_N_100;千年灵草qiannianlingcao_N_100;千年紫芝qiannian zizhi_N_100
         }
         setTimeout(YBJM,800);
    }
}
//用黄金--------------------------------------------------
function YonghuangjinFunc() {
   var numb2 = 700;
    for (var i = 0; i < numb2; i++) { // 从第一个开始循环
       function YHJM(){
        go("items;items use huangjin box"); //铂金obj_box3耀玉obj_yaoyubaoxiang；开青木obj_qingmubaoxiang_N_100;千年灵草qiannianlingcao_N_100;千年紫芝qiannian zizhi_N_100
         }
         setTimeout(YHJM,800);
    }
}
//开盒子--------------------------------------------------
function KaihezhiFunc() {
   var numb2 = 700;
    for (var i = 0; i < numb2; i++) { // 从第一个开始循环
       function KHZM(){
        go("items;items use obj_mijimuhe"); //铂金obj_box3耀玉obj_yaoyubaoxiang；开青木obj_qingmubaoxiang_N_100;千年灵草qiannianlingcao_N_100;千年紫芝qiannian zizhi_N_100
         }
         setTimeout(KHZM,800);
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


//大昭壁画-------------------------
function MianBiFunc() {
    go('jh 26;w;w;n;w;w;w;n;n;e;event_1_12853448;home');
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


//自动突破，练习技能
var PTtrigger = 0;
function PTFunc() {
    if (PTtrigger == 1) {
        PTtrigger = 0;
        btnList['突破练习'].innerText = '暂停中';
    } else if (PTtrigger == 0) {
        PTtrigger = 1;
        btnList['突破练习'].innerText = '突破练习';
    }
}

var QLtrigger = 0;
function listenQLFunc() {
    if (QLtrigger == 0) {
        QLtrigger = 1;
        btnList['青龙监听'].innerText = '停止青龙';
    } else if (QLtrigger == 1) {
        QLtrigger = 0;
        btnList['青龙监听'].innerText = '青龙监听';
    }
    getQLListenMessage()
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


var YXtrigger = 0;
function listenYXFunc() {
    if (YXtrigger == 0) {
        YXtrigger = 1;
        btnList['游侠监听'].innerText = '停止监听';
    } else if (YXtrigger == 1) {
        YXtrigger = 0;
        btnList['游侠监听'].innerText = '游侠监听';
    }
}

function LianZhao() {
    if (btnList["连招"].innerText == '连招') {
        sixqpvp = 1;
        btnList["连招"].innerText = '停跟招';
    }
    else {
        sixqpvp = 0;
        { btnList["连招"].innerText = '连招'; }
    }
}

var papapa = 0;
function PaLou() {
    if (btnList["怼人"].innerText == '怼人') {
        papapa = 1;
        btnList["怼人"].innerText = '停怼人';
    }
    else {
        papapa = 0;
        { btnList["怼人"].innerText = '怼人'; }
    }
}

// 地图碎片监控---------------------------------------------------
var ditusuipian = 0;
function DiTuSuiPianFunc() {
    if (ditusuipian == 0) {
        ditusuipian = 1;
        btnList['特殊正邪'].innerText = '停止正邪';
    } else if (ditusuipian == 1) {
        ditusuipian = 0;
        btnList['特殊正邪'].innerText = '特殊正邪';
    }
    getYWSListtenMessage()
}


//帮派战
function ClanWarFunc() {
    var realmInfo = g_obj_map.get("msg_room").get("map_id");
    if (clanWarFlag == 0 && realmInfo == 'kuafu') {
        clanWarFlag = 1;
        btnList1['帮派战'].innerText = '停帮战';
        var locationname = g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        var ClanWarParm = prompt("帮派战场及阁名的代码，用逗号分开：至尊殿-1，翰海楼-2，八荒谷-3，九州城-4，怒蛟泽-5； 阁名：天阁-1；龙阁-2:", "1,1");
        sessionStorage.setItem("ClanWarParm", ClanWarParm);
        var Parms = ClanWarParm.split(",");
        Parms1 = Parms[0];
        Parms2 = Parms[1];
        ClanWarFuncRun();

    } else if (clanWarFlag == 1) {
        clanWarFlag = 0;
        btnList1['帮派战'].innerText = '帮派战';
    }
}

function ClanWarFuncRun() {
    if (Parms1 == '1') {
        if (Parms2 == '1') { go("w;w;w;w;w;w;w;w;w;s;w;"); }
        else { go("w;w;w;w;w;w;w;w;w;s;sw;"); }
    }
    else if (Parms1 == '2') {
        if (Parms2 == '1') { go("w;w;w;w;w;w;w;w;w;e;s;w;"); }
        else { go("w;w;w;w;w;w;w;w;w;e;s;sw;"); }
    }
    else if (Parms1 == '3') {
        if (Parms2 == '1') { go("w;w;w;w;w;w;w;w;w;e;e;s;w;"); }
        else { go("w;w;w;w;w;w;w;w;w;e;e;s;sw;"); }
    }
    else if (Parms1 == '4') {
        if (Parms2 == '1') { go("w;w;w;w;w;w;w;w;w;e;e;e;s;w;"); }
        else { go("w;w;w;w;w;w;w;w;w;e;e;e;s;sw;"); }
    }
    else if (Parms1 == '5') {
        if (Parms2 == '1') { go("w;w;w;w;w;w;w;w;w;e;e;e;e;s;w;"); }
        else { go("w;w;w;w;w;w;w;w;w;e;e;e;e;s;sw;"); }
    }
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
        mySkillLists = "千影百伤棍,八荒功";

        clearInterval(kuafuBossInterval);
        //        kuafuBossInterval = setInterval(function(){ go("event_1_22857811;event_1_75706129;");}, 500);
        kuafuBossInterval = setInterval(function () { clickButton('kill kuafu_wushuanggongzhu'); clickButton('kill kuafu_buerjianke'); }, 1000);
    } else if (kuafuBossFlag == 1) {
        clearInterval(kuafuBossInterval);
        kuafuBossFlag = 0;
        btnList1['周年跨服'].innerText = '周年跨服';
        mySkillLists = "燎原百破";
    }
}

function KuafuBossRun() {
    go("w;w;w;w;w;w;w;w;w;e;e;e;e;e;e;e;");
}

function QinglongMon() { //各种监控大杂烩
  var allSkillLists = mySkillLists;
    this.dispatchMessage = function (b) {
        var type = b.get("type"), subType = b.get("subtype");
        if ((type == "vs" && subType == "text") && (sixqpvp == 1 || papapa == 1)) {
            var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
            // 自动连招
            var number_xdz = "";
            if (sixqpvp == 1) {
                if (msg !== "" && (msg.indexOf("--九天龙吟剑法--") > -1 || msg.indexOf("--排云掌法--") > -1 || msg.indexOf("--千影百伤棍--") > -1)) {
                    //        console.log("行动值数据："+$('#combat_xdz').text());
                    // number_xdz = parseInt($('#combat_xdz').text().split(";")[2].split("/")[0]);
                    //  if (number_xdz>= 5){
                    for (var i = 1; i < 7; i++) {
                        skillName = $('#skill_' + i).children().children().text();
                        if (skillName !== "" && isContains(allSkillLists, skillName)) {
                            console.log(skillName);
                            clickButton('playskill ' + i);
                            break;
                        }
                    }
                }
                //}
            }
            // PVP战斗！！！//
            if (papapa == 1) {
                if ((msg.match("席卷你") != null || msg.match("大绅倒悬") != null || msg.match("直劈你") != null || msg.match("无敌蛤蟆") != null || msg.match("直取你") != null || msg.match("要你") != null || msg.match("在你") != null || msg.match("你被震退") != null || msg.match("引渡你") != null || msg.match("你的") != null || msg.match("对着你") != null || msg.match("向你") != null || msg.match("将你") != null || msg.match("往你") != null || msg.match("朝你") != null || msg.match("直卷你") != null || msg.match("直扑你") != null || msg.match("落在你") != null) && msg.match("扰乱你的") == null) {
                    //           nineswordUnarmed();
                    ninesword();
                }
            }
        }

        //战斗结束 挂起状态清掉等等
        if (type == "vs" && subType == "combat_result") {
            clickButton('prev_combat');
            nowXueTempCount = 0;
            console.log("QinglongMon - type = vs, subtype = combat_result log");
            if (lootFlag == 1) { clickButton('golook_room'); setTimeout(AutoGet1, 300); }
            paustStatus = 0;
        }

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
            //自动续 突破
            if (msg.match("成功向前突破了") != null && PTtrigger == 1) {
                var onGoingSkill = msg.split("你的")[1].split("成功向前突破了")[0]; // 提取skill
                for (var skill in SkillSet) {
                    if (isContains(skill, onGoingSkill)) {
                        var onGoingSkillID = SkillSet[skill];
                        console.log(onGoingSkillID);
                        eval("clickButton('enable " + onGoingSkillID + "')");
                        eval("clickButton('tupo try," + onGoingSkillID + "', 1)");  //'tupo try,jiuyang-shengong'
                        clickButton('enable mapped_skills restore go 1', 1);
                        eval("clickButton('tupo_speedup2 " + onGoingSkillID + " go', 1)");  //try all
                        eval("clickButton('tupo_speedup " + onGoingSkillID + " go', 1)");  //
                        clickButton('golook_room');
                    }
                }
                return;
            }
            //自动使用加速卡（新突破技能时）
            if (msg.match("突破丹，开始突破「") != null && PTtrigger == 1) {
                var onGoingSkill = msg.split("突破丹，开始突破「")[1].split("」！")[0]; // 提取skill
                console.log(onGoingSkill);
                for (var skill in SkillSet) {
                    if (isContains(skill, onGoingSkill)) {
                        var onGoingSkillID = SkillSet[skill];
                        console.log(onGoingSkillID);
                        eval("clickButton('tupo_speedup2 " + onGoingSkillID + " go', 1)");  //try all
                        eval("clickButton('tupo_speedup " + onGoingSkillID + " go', 1)");  //
                    }
                }
                return;
            }
            if (msg.match("宝藏秘图任务数量已经超量") != null || msg.match("是你今天完成的第4/4") != null) {
                ditusuipian = 0;
                paustStatus = 0;
                btnList['地图碎片'].innerText = '地图碎片';
                return;
            }
            // 跨服逃犯信息监控
            if (msg.match("你今天的逃犯任务次数已达到上限") != null) {
                btnList1["跨服逃犯"].innerText = '跨服逃犯';
                kuafuzhuitao = 0;
                return;
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
            //监控 本服 碎片青龙
            if (QLtrigger == 1) {
                if (msg.match("青龙会组织") != null) {
                    //                    console.log(msg);
                    if ((msg.match("晚香玉") != null || msg.match("凌霄花") != null || msg.match("百宜雪梅") != null || msg.match("朝开暮落花") != null || msg.match("凤凰木") != null || msg.match("熙颜花") != null || msg.match("君影草") != null || msg.match("矢车菊") != null || msg.match("忘忧草") != null || msg.match("仙客来") != null || msg.match("雪英") != null || msg.match("夕雾草") != null || msg.match("彼岸花") != null || msg.match("洛神花") != null || msg.match("碎片") != null || msg.match("斩龙") != null) || ((msg.match("残阳棍") != null) && (msg.match("明月") == null) && (msg.match("烈日") == null)) || (msg.match("乾坤再造丹") != null) || (msg.match("月光宝甲衣") != null) || (msg.match("小还丹") != null) || (msg.match("紫芝") != null) || (msg.match("狂暴丹") != null) || (msg.match("屠龙刀") != null) || (msg.match("倚天剑") != null) || (msg.match("冰魄银针") != null) || (msg.match("墨玄掌套") != null) || (msg.match("碧磷鞭") != null) || (msg.match("西毒蛇杖") != null)|| (msg.match("星月大斧") != null) || (msg.match("碧玉锤") != null)|| (msg.match("破冥斧") != null) || (msg.match("霸王枪") != null)|| (msg.match("伏虎杖") != null) || (msg.match("斩神刀") != null)|| (msg.match("龙象拳套") != null) || (msg.match("诛仙剑") != null)|| (msg.match("暴雨梨花针") != null) || (msg.match("七星鞭") != null) || (msg.match("撼魂锤") != null) || (msg.match("赤焰枪") != null)|| (msg.match("龙皮至尊衣") != null)|| (msg.match("赤焰枪") != null)|| (msg.match("飞宇天怒刀") != null)|| (msg.match("九天龙吟剑") != null)|| (msg.match("小李飞刀") != null)|| (msg.match("乌金玄火鞭") != null)|| (msg.match("开天宝棍") != null)|| (msg.match("达摩杖") != null)|| (msg.match("天罡掌套") != null)|| (msg.match("天雷断龙斧") != null)|| (msg.match("烛幽鬼煞锤") != null)) {
                        var url = msg.split("href;0;")[1].split("")[0];
                        tarNPC = msg.split("组织：")[1].split("正在")[0];
                        clickButton(url);
                        Qinglong();
                        setInterval(Qinglong, 500);
                    }
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
            //监控帮派拼图
            if (msg.match("宝藏地图。") != null) {
                clickButton('clan bzmt puzz');
                //                clickButton('clan bzmt puzz');
                return;
            }
            /*  //  鉴于11区管事的太勤快，这个没必要
              if (msg.match("获得了1个秘图碎片。")!=null){
                  clickButton('clan bzmt puzz');
                  return;
              }*/

            if (msg.match("是你今天完成的第4/4") != null) {
                ditusuipian = 0;
                btnList['地图碎片'].innerText = '地图碎片';
                return;
            }

            //自动续 打坐、寒玉床
            if (msg.match("你从寒玉床上爬起，结束了这次练功") != null && QLtrigger == 1) {
                go('home;sleep_hanyuchuang');
                return;
            }
            if ((msg.match("你停止了打坐") != null) && QLtrigger == 1) {
                go('exercise;');
                return;
            }
            //自动续 练习
            if (msg.match("你停止了练习") != null && PTtrigger == 1) {
                var onGoingSkill = msg.split("你停止了练习")[1].split("。")[0]; // 提取skill
                for (var skill in SkillSet) {
                    if (isContains(skill, onGoingSkill)) {
                        var onGoingSkillID = SkillSet[skill];
                        console.log(onGoingSkillID);
                        eval("clickButton('enable " + onGoingSkillID + "')");
                        eval("clickButton('practice " + onGoingSkillID + "', 1)");
                        clickButton('enable mapped_skills restore go 1', 1);
                        clickButton('golook_room');
                    }
                }
                return;
            }
            // 死了自动恢复，帮派战 自动跑路
            if (msg.match("好在有保险卡，没有降低技能等级") != null) {
                healtriger = 0;
                healFunc();
                if (clanWarFlag == 1) {
                    setTimeout(ClanWarFuncRun, 16000); // 回复好，跑路去战场
                }
                //                if (kuafuBossFlag == 1){
                //                    setTimeout(KuafuBossRun,16000); // 回复好，跑路去战场
                //                }
                return;
            }

        }
        //系统通知信息（消息）
        if (type == "channel" && subType == "sys") {
            var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
            //监控 1-5  周四跨服逃犯
            if (msg.match("1-5区]段老大慌不择路") != null && kuafuzhuitao == 1) {
                var url = msg.split("href;0;")[1].split("")[0];
                if (btnList1["杀好人"].innerText == '停好人') { tarNPC = '[1-5区]无一'; }
                else { tarNPC = '[1-5区]段老大'; }
                clearInterval(QinglongIntervalFunc);
                Qinglong();
                QinglongIntervalFunc = setInterval(Qinglong, 500);
                zhou4TaoFan = 1;
                clickButton(url);
                return;
            }

            //监控地图碎片-自动打
            if (msg.match("看来你是在劫难逃") != null && ditusuipian == 1) {
                if (g_obj_map.get("msg_room").get("short") != "地室") {
                    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;s;s;s;s;e;event_1_2215721;');
                }

                if (msg.match("云观海") != null) {
                    go('n;kill changan_yunguanhai1;s;');
                } else if (msg.match("翼国公") != null) {
                    go('s;kill changan_yiguogong1;n;');
                } else if (msg.match("黑袍公") != null) {
                    go('w;kill changan_heipaogong1;e;');
                } else if (msg.match("独孤须臾") != null) {
                    go('e;kill changan_duguxuyu1;w;');
                }
                return;
            }
        }
        //帮派通知信息（消息）
        if (type == "channel" && subType == "clan") {
            var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
            //监控 帮派boss
            if (msg.match("帮派BOSS") != null && QLtrigger == 1) {
                clickButton('clan scene', 0);
            }
        }
    }
}

//本服 青龙碎片、二娘
var QinglongIntervalFunc = null;
var currentNPCIndex = 0;

function QinglongFunc() {
    zdskill = null;
    currentNPCIndex = 0;
    console.log("开始杀青龙 qinglongfunc" + "tarNPC=" + tarNPC);
    skillLists = mySkillLists;
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
/*
var qlMon = new QinglongMon;
webSocketMsg.prototype.old = gSocketMsg.dispatchMessage;
gSocketMsg.dispatchMessage = function (b) {
    this.old(b);
    qlMon.dispatchMessage(b);
}
*/
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

// 战斗补血

var pubAddXueFunc;
var addXueOutOfFightRun = "false" //是否是战斗外加血
var addXueInFightRun = "false" //是否是战斗中加血
var fubenHUifu = "false" //是否要恢复副本设置
var nowXueTemp;//记录当前血量
var nowXueTempCount = 0//获取当前血量次数

function addXueFunc() {
    if (btnList["战斗补血"].innerText == '战斗补血') {
        btnList["战斗补血"].innerText = '停止补血';
        pubAddXueFunc = setInterval(addXue, 1000)
    } else {
        btnList["战斗补血"].innerText = '战斗补血';
        clearInterval(pubAddXueFunc)
    }
}

function addXue() {
    var kee = parseInt(g_obj_map.get("msg_attrs").get("kee")); //当前血量
    var max_kee = parseInt(g_obj_map.get("msg_attrs").get("max_kee"));//血量上限
    var force = parseInt(g_obj_map.get("msg_attrs").get("force"));//当前蓝
    var max_force = parseInt(g_obj_map.get("msg_attrs").get("max_force"));//蓝上限
    if (gangsFightControl() == "Y") {
        if (kee / max_kee > 1 / 2) {
            if (force < 50000) {  //血量大于1/3 且蓝小于10000时 回蓝
                JiaLanFight();
            } else {
                setTimeout(addXue, 500);
            }
        }
        else { //使用内功加血
            if (addXueInFightRun == "false") {
                addXueInFightRun = "true";//设置状态为战斗中加血
            }
           /* var powerLine = document.getElementById('combat_xdz_text')
            var powerPoint = powerLine.innerText;
            var pp = powerPoint.substring(0, powerPoint.indexOf('/'));
            if (nowXueTempCount >= 3) { //加血次数判断
                console.log("内功补血,加血后血量11：" + kee);
                console.log("911");
              //  AutoEscapeFunc();
            }*/ else {
                JiaXueFight();  //加血
                nowXueTempCount = nowXueTempCount + 1;
                // kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));//获取最新血量
                setTimeout(addXue, 500);
            }
        }
    }
}
//------------------------自动加血end----------------------
function JiaXueFight() {
    var skillButtons = document.getElementById("page").getElementsByClassName('cmd_skill_button');
    var healSkill;
    for (var i = 0; i < skillButtons.length; i++) {
        var onclickValue = skillButtons[i].getAttribute('onclick');
        var iStart = onclickValue.indexOf("clickButton('");
        var iEnd = onclickValue.indexOf("', 0)");

        if (skillButtons[i].textContent == mySkillListsHeal) {
            healSkill = onclickValue.substring(iStart + 13, iEnd);
            console.log(healSkill);
        }
    }
    clickButton(healSkill, 0);
}
//------------------------自动加蓝end----------------------
function JiaLanFight() {
    var skillButtons = document.getElementById("page").getElementsByClassName('cmd_skill_button');
    var healSkill;
    for (var i = 0; i < skillButtons.length; i++) {
        var onclickValue = skillButtons[i].getAttribute('onclick');
        var iStart = onclickValue.indexOf("clickButton('");
        var iEnd = onclickValue.indexOf("', 0)");

        if (skillButtons[i].textContent == '紫血大法') {
            healSkill = onclickValue.substring(iStart + 13, iEnd);
            console.log(healSkill);
        }
    }
    clickButton(healSkill, 0);
}

//-------------------------帮派战-----------
var wuLinSquareMap = {
    "天下至尊": "武林广场1", "至尊殿": "武林广场1",
    "四海潜龙": "武林广场2", "翰海楼": "武林广场2",
    "八荒之君": "武林广场3", "八荒谷": "武林广场3",
    "九州之将": "武林广场4", "九州城": "武林广场4",
    "七湖怒蛟": "武林广场5", "怒蛟泽": "武林广场5",
    "五岳之巅": "武林广场6", "凌云峰": "武林广场6",
    "江左霸师": "武林广场7", "江左营": "武林广场7",
    "呼啸山林": "武林广场8", "虎啸林": "武林广场8",
    "开山立派": "武林广场9", "青云山": "武林广场9",
    "江湖聚义": "武林广场10", "论剑堂": "武林广场10"
};

var gangsAddress = ""  //
var gangsArea = "" ////
var attackOrDefense = ""//攻击还是防守  attack: 进攻方     defense: 防守方
var gangsIshf = "N" //是否点击了加血按钮
var gongsFunc = null

function runsGonsFunc() {
    if (btnList1['帮派战'].innerText == '帮派战') {
        btnList1['帮派战'].innerText = '停帮战';
        gongsFunc = setInterval(gonsFunc, 300)
    } else {
        btnList1['帮派战'].innerText = '帮派战';
        gangsAddress = ""
        gangsArea = ""
        attackOrDefense = ""
        clearInterval(gongsFunc)
    }
}

/**
* 检查是否进入了战斗
*/

function gangsFightControl() {
    var gangsIsFight = 'N'
    if ($("#out2 span.out2 ").html().indexOf("auto_fight") != -1) {
        //        console.log("检测到进入了战斗")
        gangsIsFight = 'Y'
    } else {
        gangsIsFight = 'N'
    }
    return gangsIsFight
}


/**
	*自动识别帮战地点
	**/
function gongsAddressCheck() {
    //当前地点
    var gangsNowAddress = $("#out span.out span.outtitle").text().replace(/[\r\n]/g, "").replace(/\s/g, "").replace(/\ +/g, "") //获取当前地址
    if (gangsNowAddress == "")
        gangsNowAddress = $("#out_top span.out_top span.outtitle").text().replace(/[\r\n]/g, "").replace(/\s/g, "").replace(/\ +/g, "") //获取当前地址

    console.log("当前地点：" + gangsNowAddress)
    var wuLinTargetAddress = "武林广场3"
    if (gangsNowAddress.indexOf("武林广场") != -1) {
        if (gangsNowAddress == wuLinTargetAddress) { //在武林广场
            go('event_1_20705356') //打开帮派风云战
            console.log("打开帮派风云战")
        } else {
            var wulinNowNu = parseInt(gangsNowAddress.substring(4)); //当前武林地址的编号
            var wuLinTargetNu = parseInt(wuLinTargetAddress.substring(4)); //目的武林地址的编号
            if (wuLinTargetNu > wulinNowNu) { //往东走{
                //for(int i=0;i<(wuLinTargetNu-wulinNowNu);i++)
                //此处注释掉,使用异步方式 寻路
                go('e')
                console.log("查看帮派风云战,当前位置：【" + gangsNowAddress + "】,去往【" + wuLinTargetAddress + "】,往东走")

            } else if (wuLinTargetNu < wulinNowNu) {
                //往西走
                go("go west")
                console.log("查看帮派风云战,当前位置：【" + gangsNowAddress + "】,去往【" + wuLinTargetAddress + "】,往西走")
            } else {
                //容错处理 就在目的地的武林广场处
                //就在目的地的武林广场处
                go('event_1_20705356') //打开帮派风云战
                console.log("查看帮派风云战,到达目的武林广场3,打开帮派风云战")
            }
        }

    } else if (gangsNowAddress == "帮派风云战") {
        if (gangsAddress == "" || gangsArea == "" || attackOrDefense == "") {
            console.log("正在查看帮派风云战")
            $("#out tbody").find("tr").each(function () {
                var tdArr = $(this).children();
                var tdContent = tdArr.text().replace(/[\r\n]/g, "").replace(/\s/g, "").replace(/\ +/g, "");
                if (tdContent.indexOf("[72区]梵音战阁") != -1) {
                    gangsAddress = tdArr.eq(0).text();//识别地点  例如 九州城
                    console.log("当前帮战地点为：【" + gangsAddress + "】")

                    //循环span
                    tdArr.children("span").each(function (j) {
                        if ($(this).text().indexOf("[72区]梵音战阁") != -1) {
                            //识别地点  例如 玄阁
                            gangsArea = $(this).text().substring($(this).text().indexOf("(") + 1, $(this).text().indexOf(")"))
                            console.log("当前帮战所属阁为：【" + gangsArea + "】")
                        }
                    });
                    //循环td
                    tdArr.each(function (j) {
                        if ($(this).text().indexOf("[72区]梵音战阁") != -1) {
                            var gongsTeam = $(this).text().substring($(this).text().indexOf("[") + 1, $(this).text().indexOf("]"));
                            var gongsTeamNum = parseInt(gongsTeam.substring(0, gongsTeam.indexOf("队")));

                            //奇数队伍为防守方：defense,偶数队伍为进攻方：attack
                            attackOrDefense = (gongsTeamNum % 2 == 0) ? "attack" : "defense";
                            console.log("当前帮战队伍为【" + gongsTeam + "】")
                            if (attackOrDefense == "attack") {
                                if (!biaocheNPCList.contains("守楼虎将"))
                                    biaocheNPCList.unshift("守楼虎将")
                            } else {
                                if (!biaocheNPCList.contains("攻楼死士"))
                                    biaocheNPCList.unshift("攻楼死士")
                            }
                            console.log("杀人数组：" + biaocheNPCList)

                        }

                    });

                }
            });
        } else {
            clickButton('prev')
            console.log("查看完风云榜,返回武林广场")
        }

    } else {
        console.log("请行至武林广场")
        //未成功识别地点
        return "false";
    }
}


function gonsFunc() {

    if (gangsAddress == "" || gangsArea == "" || attackOrDefense == "") {
        console.log("未定位帮战位置,先跑去查看....")
        gongsAddressCheck();//查找帮战位置,和攻守方
        return;
    }

    if (gangsFightControl() == "Y") { //在战斗中时不跑地图
        return;
    }
    var gangsNowAddress = $("#out span.out span.outtitle").text().replace(/[\r\n]/g, "").replace(/\s/g, "").replace(/\ +/g, "") //获取当前地址
    if (gangsNowAddress == "")
        gangsNowAddress = $("#out_top span.out_top span.outtitle").text().replace(/[\r\n]/g, "").replace(/\s/g, "").replace(/\ +/g, "") //获取当前地址
    if (gangsNowAddress == "帮派风云战") { //还在查看风云榜
        clickButton('prev')
        console.log("查看完风云榜,返回武林广场")
        return;
    }

    var wuLinTargetAddress = wuLinSquareMap[gangsAddress]; //目的武林广场跑：需要跑到武林广场几
    if (gangsNowAddress.indexOf("武林广场") != -1) { //在武林广场,需要往 目的武林广场跑


        //跑地图前 先加满血和蓝 ----start------- 加完血后在进入最终地图
        var kee = parseInt(g_obj_map.get("msg_attrs").get("kee"));
        var max_kee = parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
        var force = parseInt(g_obj_map.get("msg_attrs").get("force"));
        var max_force = parseInt(g_obj_map.get("msg_attrs").get("max_force"));
        if (kee < max_kee || force < max_force) { //血 或 蓝不满时,自动加血 且不跑地图
            if (gangsIshf == "N") {
                yijianhuifuFunc();
                gangsIshf = "Y";
            }
            return;
        }
        //跑地图时,说明已经加满血了,将加血按钮重置
        gangsIshf = "N"
        //跑地图前 先加满血和蓝 ----endt-------


        if (gangsNowAddress == wuLinTargetAddress) {
            //就在目的地的武林广场处
            var gangsAreaHtmlStr = $("#out span.out button:contains(" + gangsAddress + ")").prop("outerHTML")
            var gangsFangXiang = gangsAreaHtmlStr.substring(gangsAreaHtmlStr.indexOf("'") + 1, gangsAreaHtmlStr.lastIndexOf("'"))
            var gangsFangXiangJH = gangsFangXiang.substring(0, gangsFangXiang.indexOf("."))
            clickButton(gangsFangXiangJH)//进入 怒蛟泽
            console.log("当前位置：【" + gangsNowAddress + "】,到达目的武林广场")
        } else {
            var wulinNowNu = parseInt(gangsNowAddress.substring(4)); //当前武林地址的编号
            var wuLinTargetNu = parseInt(wuLinTargetAddress.substring(4)); //目的武林地址的编号
            if (wuLinTargetNu > wulinNowNu) { //往东走{
                //for(int i=0;i<(wuLinTargetNu-wulinNowNu);i++)
                //此处注释掉,使用异步方式 寻路
                clickButton("go east")
                console.log("当前位置：【" + gangsNowAddress + "】,去往【" + wuLinTargetAddress + "】,往东走")

            } else if (wuLinTargetNu < wulinNowNu) {
                //往西走
                clickButton("go west")
                console.log("当前位置：【" + gangsNowAddress + "】,去往【" + wuLinTargetAddress + "】,往西走")
            } else {
                //容错处理 就在目的地的武林广场处
                //就在目的地的武林广场处
                var gangsAreaHtmlStr = $("#out span.out button:contains(" + gangsAddress + ")").prop("outerHTML")
                var gangsFangXiang = gangsAreaHtmlStr.substring(gangsAreaHtmlStr.indexOf("'") + 1, gangsAreaHtmlStr.lastIndexOf("'"))
                var gangsFangXiangJH = gangsFangXiang.substring(0, gangsFangXiang.indexOf("."))
                clickButton(gangsFangXiangJH)//进入 怒蛟泽
                console.log("当前位置：【" + gangsNowAddress + "】,到达目的武林广场")
            }


        }

    } else if (gangsNowAddress == gangsAddress) {// 在 怒蛟泽 处
        var gangsAreaHtmlStr = $("#out span.out button:contains(" + gangsArea + ")").prop("outerHTML")
        var gangsFangXiang = gangsAreaHtmlStr.substring(gangsAreaHtmlStr.indexOf("'") + 1, gangsAreaHtmlStr.lastIndexOf("'"))
        var gangsFangXiangJH = gangsFangXiang.substring(0, gangsFangXiang.indexOf("."))
        clickButton(gangsFangXiangJH)//进入 玄阁
        console.log("当前位置：【" + gangsNowAddress + "】")
    } else if (gangsNowAddress == gangsArea) {// 在 地阁 处
        console.log("已经在【" + gangsArea + "】处")
        if (attackOrDefense == "attack") {
            if (!biaocheNPCList.contains("守楼虎将"))
                biaocheNPCList.unshift("守楼虎将")
        } else {
            if (!biaocheNPCList.contains("攻楼死士"))
                biaocheNPCList.unshift("攻楼死士")
        }
    } else {
        console.log("地图错误,请回到广场中。。。")
    }
}

//-------------------------帮战结束-----------


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
createButton1('消生死', XSSFunc);
createButton1('杀坏人', killHongMingTargetFunc);
createButton1('杀好人', killHuangMingTargetFunc);
createButton1('青龙镖车', KFQLFunc);
//createButton1('广场好人', killHuangMingTarget1Func);
//createButton1('广场坏人', killHuangMingTarget1Func);
//createButton1('跨服逃犯', Zhou4Func);
//createButton1('帮派战', ClanWarFunc);
//createButton1('周年跨服', KuafuBossFunc);
//createButton1('帮战',runsGonsFunc);
//createButton1('天剑队长', tianjianFunc);
createButton1('天剑大怪', killTianJianTargetFuncBoss);
createButton1('天剑小兵', killTianJianTargetFuncBing);
createButton1('极武坛', JiWuTanFunc);
createButton1('  ');
//createButton1('  ',nullFunc);
//createButton1('帮二集合',ClanInst2SumFunc);
//createButton1('帮一集合', ClanInst1SumFunc);
createButton1('帮一队长', ClanInst1CapFunc);
createButton1('撩奇侠', QiXiaTalkFunc11);
createButton1('无尽深渊', wujinFunc);
createButton1('秘境优化', mijingFunc);
hideButton1();
function hideButton1() {
    btnList1['消生死'].style.visibility = "hidden";
    btnList1['杀坏人'].style.visibility = "hidden";
    btnList1['杀好人'].style.visibility = "hidden";
    btnList1['青龙镖车'].style.visibility = "hidden";
//    btnList1['跨服逃犯'].style.visibility = "hidden";
//    btnList1['帮派战'].style.visibility = "hidden";
//    btnList1['周年跨服'].style.visibility = "hidden";
//    btnList1['天剑队长'].style.visibility = "hidden";
    btnList1['天剑大怪'].style.visibility = "hidden";
    btnList1['天剑小兵'].style.visibility = "hidden";
    btnList1['极武坛'].style.visibility = "hidden";
    btnList1['  '].style.visibility = "hidden";
//   btnList1['帮二集合'].style.visibility="hidden";
//    btnList1['帮一集合'].style.visibility = "hidden";
    btnList1['帮一队长'].style.visibility = "hidden";
    btnList1['撩奇侠'].style.visibility = "hidden";
    btnList1['无尽深渊'].style.visibility = "hidden";
    btnList1['秘境优化'].style.visibility = "hidden";
}
function showButton1() {
    btnList1['消生死'].style.visibility = "visible";
    btnList1['杀坏人'].style.visibility = "visible";
    btnList1['杀好人'].style.visibility = "visible";
    btnList1['青龙镖车'].style.visibility = "visible";
//    btnList1['跨服逃犯'].style.visibility = "visible";
//    btnList1['帮派战'].style.visibility = "visible";
//    btnList1['周年跨服'].style.visibility = "visible";
//    btnList1['天剑队长'].style.visibility = "visible";
    btnList1['天剑大怪'].style.visibility = "visible";
    btnList1['天剑小兵'].style.visibility = "visible";
    btnList1['极武坛'].style.visibility = "visible";
    btnList1['  '].style.visibility = "visible";
//   btnList1['帮二集合'].style.visibility="visible";
//    btnList1['帮一集合'].style.visibility = "visible";
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




//合成宝石------------------------------------------------------------------------------------------------------------
var bs_id = "hongbaoshi";
var bs_name = "红宝石";
var bs_num = 3;
var bs_namelist = ['无暇红', '完美红', '君王红', '皇帝红', '无暇蓝', '完美蓝', '君王蓝', '皇帝蓝', '无暇紫', '完美紫', '君王紫', '皇帝紫', '无暇绿', '完美绿', '君王绿', '皇帝绿', '无暇黄', '完美黄', '君王黄', '皇帝黄'];
var hbs_time;
var hbs_popbk = createPop('合宝石');
popList['合宝石'].innerHTML = '<div>选择你要合成的宝石</div>';
function heBaoshi() {
    hbs_popbk.style.display = "";
}
for (var i = 0; i < bs_namelist.length; i++) {
    createPopButton(bs_namelist[i], '合宝石', xuanBaoshi);
}

function xuanBaoshi() {
    var n = this.innerText;
    if (n.indexOf('红') > -1) {
        bs_name = "红宝石";
        bs_id = "hongbaoshi";
    }
    if (n.indexOf('蓝') > -1) {
        bs_name = "蓝宝石";
        bs_id = "lanbaoshi";
    }
    if (n.indexOf('紫') > -1) {
        bs_name = "紫宝石";
        bs_id = "zishuijing";
    }
    if (n.indexOf('绿') > -1) {
        bs_name = "绿宝石";
        bs_id = "lvbaoshi";
    }
    if (n.indexOf('黄') > -1) {
        bs_name = "黄宝石";
        bs_id = "huangbaoshi";
    }
    if (n.indexOf('无暇') > -1) {
        bs_num = 3;
    }
    if (n.indexOf('完美') > -1) {
        bs_num = 4;
    }
    if (n.indexOf('君王') > -1) {
        bs_num = 5;
    }
    if (n.indexOf('皇帝') > -1) {
        bs_num = 6;
    }
    xuanBaoshi2();
}

function xuanBaoshi2() {
    //    go_reset();
    for (i = 1; i <= bs_num + 1; i++) {
        go('items get_store /obj/baoshi/' + bs_id + i);
        console.log('items get_store /obj/baoshi/' + bs_id + i);
    }
    //    nextgo = function() {
    clickButton('items', 0);
    hbs_time = setInterval(check_bs, 200);
    //    };
    //    go_step();
}

function check_bs() {
    //    go_reset();
    var t = $("tr[bgcolor]:contains(" + bs_name + ")");
    if (t.length > 0) {
        clearInterval(hbs_time);
        var a = ['碎裂的' + bs_name, '裂开的' + bs_name, bs_name, '无暇的' + bs_name, '完美的' + bs_name, '君王的' + bs_name, '皇帝的' + bs_name];
        var b = [];
        var c = {};
        var d = 0;
        var i, j, k;
        c.n = [];
        c.t = [];
        for (i = 0; i < bs_num; i++) {
            c.n[i] = 0;
            c.t[i] = Math.pow(3, bs_num - 1 - i);
            for (j = 0; j < t.length; j++) {
                var e = t.eq(j).find('td')[0].innerText.replace('\n', "");
                var f = parseInt(t.eq(j).find('td')[1].innerText.match(/\d+/g)[0]);
                if (e == a[i]) {
                    c.n[i] = f;
                    d += f * Math.pow(3, i);
                    for (k = 0; k < i; k++) {
                        c.t[k] -= f * Math.pow(3, i - 1 - k);
                    }
                    break;
                }
            }
        }
        if (d < Math.pow(3, bs_num)) {
            alert('宝石不够合成');
            for (i = 1; i < bs_num; i++) {
                //                go('items put_store ' + bs_id + i);
            }
        } else {
            for (i = 1; i <= bs_num; i++) {
                var n = c.t[i - 1];
                console.log(a[i] + "--" + n + '次');
                for (j = 0; j < Math.floor(n / 10); j++) {
                    go('items hecheng ' + bs_id + i + '_N_10');
                }
                for (j = 0; j < (n % 10); j++) {
                    go('items hecheng ' + bs_id + i + '_N_1');
                }
            }
            //            go('items put_store ' + bs_id + "1");
        }
        //        go_delay = 300;
        //        go_step();
    }
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
var items_use = '『秘籍木盒』 兰陵美酒 周年英雄令 周年热血令 神鸢宝箱 茉莉汤 云梦青 『神匠宝箱』冰糖葫芦青凤纹绶 热血印 风云宝箱 腊八粥  腊百草美酒年糕 高级狂暴丹特级狂暴丹保险卡特级大还丹高级大还丹特级乾坤再造丹高级乾坤再造丹神秘宝箱冰镇酸梅汤';
var items_store = '长生石 晚香玉 凌霄花 百宜雪梅 朝开暮落花 凤凰木 熙颜花 君影草 矢车菊 忘忧草 仙客来 雪英 夕雾草 洛神花千年紫芝千年灵草驻颜丹烧香符周年礼券玄重铁分身卡高级乾坤袋装备打折卡碎片鎏金黑玉锥';
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
                }/*
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
                }*/
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
    /*
    go('enable unmap_all',0);      //一键取消技能
    go('auto_equip off',0);      //一键脱衣服
    go('enforce 0',0);      //enforce=0
    go('event_1_14757697',1);  //挑战铜人 1
    go('event_1_35095441',1);  //挑战铜人 2
    go('enable map_all',0);
    //        go('enable mapped_skills restore go 3', 1);
    go('auto_equip on',0);      //一键穿衣服
    go('enforce 1459');      //enforce

    tongren = 1;
} else{
    go('home;clan zsdg enter;n;n;n;n;n;n;n;e;e;e;e;e;e;e;e;s;s;');
    /*
    go('enable unmap_all',0);      //一键取消技能
    go('auto_equip off',0);      //一键脱衣服
    go('enforce 0',0);      //enforce=0
    go('event_1_35095441',1);  //挑战铜人 2
    go('enable map_all',0);
    //      go('enable mapped_skills restore go 3', 1);
    go('auto_equip on',0);      //一键穿衣服
    go('enforce 1459');      //enforce
    */
    //    tongren = 0;
    //  }
}

//createButton('苗疆炼药',MjlyFunc);

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
//-------------------------分割线-----------
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
//---------消生死-----------------------------------
function XSSFunc(){
go('jh 1;e;n;n;n;n;w;event_1_44575766');
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
//广场杀好人-----------------------------------------------

//广场杀坏人------------------------------------------------

// 杀坏人----------------------------------------------------------------------------------------------------------------
var HongMingNPCList = ["阴九幽","白开心","李大嘴","慕容博","庞斑","方夜羽","东方不败","祝玉妍","李秋水","石观音","白猿","凌未风","萧秋水","蒙赤行","叶孤城","厉工","石幽明","胡铁花","星宿恶徒【二】","星宿恶徒【一】","星宿恶徒【三】","星宿恶徒【四】","夜魔*恶棍", "夜魔*流寇", "夜魔*剧盗", "夜魔*云老四", "夜魔*岳老三", "夜魔*二娘", "夜魔*段老大", "黑袍公", "独孤须臾", "翼国公", "云观海", "年兽", "铁狼军", "银狼军", "金狼军", "金狼将", "十夫长", "百夫长", "月幽剑士", "濯缨剑士", "对影剑士", "夏花剑士", "[一]镇擂斧将", "[二]镇擂斧将", "天魔真身", "攻楼死士", "镇山神兽", "守山神兽", "应龙幼崽", "应龙兽魂", "应龙分身", "应龙王", "应龙战神", "镇潭神兽", "守潭神兽", "螣蛇幼崽", "螣蛇兽魂", "螣蛇分身", "螣蛇王", "螣蛇战神", "镇殿神兽", "守殿神兽", "幽荧幼崽", "幽荧兽魂", "幽荧分身", "幽荧王", "幽荧战神", "饕餮分身", "饕餮兽魂", "饕餮幼崽", "守谷神兽", "镇谷神兽", "饕餮王", "饕餮战神", "不『二』剑客"];
var HongMingNPCListClan1 = ["镇山神兽", "守山神兽", "应龙幼崽", "应龙兽魂", "应龙分身", "应龙王", "应龙战神", "镇潭神兽", "守潭神兽", "螣蛇幼崽", "螣蛇兽魂", "螣蛇分身", "螣蛇王", "螣蛇战神", "镇殿神兽", "守殿神兽", "幽荧幼崽", "幽荧兽魂", "幽荧分身", "幽荧王", "幽荧战神", "饕餮分身", "饕餮兽魂", "饕餮幼崽", "守谷神兽", "镇谷神兽", "饕餮王", "饕餮战神"];
var HongMingNPCListKuaFu = ["[1-5区]段老大", "[1-5区]墟归一", "[1-5区]上官晓芙", "[1-5区]洪昭天"];
var killHongMingIntervalFunc = null;
currentNPCIndex = 0;
function killHongMingTargetFunc() {
  //  zdskill = null;
    if (btnList1["杀坏人"].innerText == '杀坏人') {
        currentNPCIndex = 0;
        console.log("开始杀红名目标NPC！");
     //  var skillLists = mySkillLists;
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
        targetCode = thisonclick.split("'")[1].split(" ")[1];
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
var HuangMingNPCList = ["浪翻云","令狐冲","乔峰","乾罗","令狐冲","天山童姥","楚昭南","阿青","楚留香","朱大天王","石之轩","追三","西门吹雪","令东来","传鹰","无花", "守楼虎将", "天魔真身", "无『双』公主",];
//var HuangMingNPCList = ["[1-5区]王铁匠", "[1-5区]杨掌柜", "[1-5区]柳绘心", "[1-5区]柳小花", "[1-5区]卖花姑娘","[1-5区]刘守财","[1-5区]朱老伯","[1-5区]方老板", "[1-5区]客商","[1-5区]方寡妇","王铁匠", "杨掌柜", "柳绘心", "柳小花", "卖花姑娘","刘守财","朱老伯","方老板", "客商","方寡妇","[1-5区]无一","[1-5区]铁二","[1-5区]追三","[1-5区]冷四","[1-5区]花落云", "[1-5区]辰川","[1-5区]王世仲","[一]镇擂斧将","[二]镇擂斧将","饕餮分身","饕餮兽魂","饕餮幼崽","守谷神兽","镇谷神兽","守楼虎将"];
var killHuangMingIntervalFunc = null;
currentNPCIndex = 0;
function killHuangMingTargetFunc() {
   // zdskill = null;
    if (btnList1["杀好人"].innerText == '杀好人') {
        currentNPCIndex = 0;
        console.log("开始杀好人目标NPC！");
  //      skillLists = mySkillLists;
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
        targetCode = thisonclick.split("'")[1].split(" ")[1];
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


// 跨服追逃-------------------------------------------------------
var kuafuzhuitao = 0;

function Zhou4Func() {
    if (kuafuzhuitao == 0) {
        btnList1["跨服逃犯"].innerText = '停追逃';
        kuafuzhuitao = 1;
    } else {
        btnList1["跨服逃犯"].innerText = '跨服逃犯';
        kuafuzhuitao = 0;
    }
}

//周四跨服自动用的
var Zhou4NPCList = ["[1-5区]段老大"];
//var Zhou4NPCList = ["[1-5区]无一"];
var Zhou4IntervalFunc = null;
var currentNPCIndex = 0;
function Zhou4() {
    if ($('span').text().slice(-7) == "不能杀这个人。") {
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
    if ($('span').text().slice(-6) == "明天继续吧。") {
        clearInterval(Zhou4IntervalFunc);
        console.log("打满就不打了！");
    }
    getZhou4Code();
    if ($('span:contains(胜利)').text().slice(-3) == '胜利！' || $('span:contains(战败了)').text().slice(-6) == '战败了...') {
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
        nowXueTempCount = 0;
    }
}
function getZhou4Code() {
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor = 0;
    for (var i = 0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (Zhou4NPCList.contains(peopleList[i].innerText)) {
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
        setTimeout(detectZhou4Info, 200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectZhou4Info() {
    var Zhou4Info = $('span').text();
    if (Zhou4Info.slice(-15) == "已经太多人了，不要以多欺少啊。") {
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
var TianJianNPCList = ["天剑", "天剑真身", "虹风", "虹雨", "虹雷", "虹电", "天剑谷卫士"];
var TianJianNPCListAll = ["天剑", "天剑真身", "虹风", "虹雨", "虹雷", "虹电", "天剑谷卫士"];
var TianJianNPCListBing = ["天剑谷卫士"];
var TianJianNPCListBoss = ["天剑", "天剑真身", "虹风", "虹雨", "虹雷", "虹电"];
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
    zdskill = mySkillLists;
    skillLists = mySkillLists;
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

// 天剑谷自动移动版。。。

var tianjianTrigger = 0;
function tianjianFunc() {
    zdskill = mySkillLists;
    if (tianjianTrigger == 0) {
        btnList1["天剑队长"].innerText = '停止车头';
        tianjianTrigger = 1;
        killtianjian();
        tianjianmove();
        currentNPCIndex = 0;
        console.log("开始杀天剑目标NPC！");
        skillLists = mySkillLists;
        killTianJianIntervalFunc = setInterval(killTianJian, 500);
    } else if (tianjianTrigger == 1) {
        btnList1["天剑队长"].innerText = '天剑队长';
        tianjianTrigger = 0;
        tjroomclear = 0;
        path = [];
        tjfight = 0;
        preroomrandom = "";
        clearInterval(killTianJianIntervalFunc);
    }
}

var path = [];
var tjfight = 0;
var tjroomclear = 0;
var preroomrandom = "";
var direction = ["west", "east", "south", "north", "southwest", "southeast", "northeast", "northwest"];//八个方向
function tianjianmove() {
    var roominfo = g_obj_map.get("msg_room");
    if ((roominfo == undefined || tjroomclear == 0) && tianjianTrigger == 1) {//房间信息没有刷新，或者在战斗，或者房间内还有npc
        setTimeout(function () { tianjianmove(); }, 500);
    } else {
        console.log(path);
        for (var i = 0; i < 8; i++) {
            if (roominfo.get(direction[i]) != undefined) {
                if (roominfo.get(direction[i]).match("峡谷") == null && (path.length <= 10 || Math.random() > 0.4)) {//不包含峡谷两个字，为特殊房间
                    preroomrandom = roominfo.get("go_random");
                    tjroomclear = 0;
                    path.push(g_obj_map.get("msg_room").get(direction[i]));
                    console.log("go " + direction[i]);
                    clickButton("go " + direction[i]); //移动到特殊房间
                    if (tianjianTrigger == 1) {
                        tianjianmove();
                        setTimeout(killtianjian, 100);
                    }
                    return;
                }
            }

        }
        //没有特殊房间，开始寻找普通房间
        for (var i = 0; i < 8; i++) {
            if (roominfo.get(direction[i]) != undefined) {
                if (path.indexOf(g_obj_map.get("msg_room").get(direction[i])) == -1) {
                    path.push(g_obj_map.get("msg_room").get(direction[i]));
                    preroomrandom = roominfo.get("go_random");
                    tjroomclear = 0;
                    clickButton("go " + direction[i], 0);
                    if (tianjianTrigger == 1) {
                        tianjianmove();
                        setTimeout(killtianjian, 100);
                    }
                    return;
                }
            }
        }
        preroomrandom = roominfo.get("go_random");
        var randomdirect = Math.round((Math.random() * 7));
        while (roominfo.get(direction[randomdirect]) == undefined) {
            randomdirect = Math.round((Math.random() * 7));
        }
        tjroomclear = 0;
        clickButton("go " + direction[randomdirect], 0);
        if (tianjianTrigger == 1) {
            tianjianmove();
            setTimeout(killtianjian, 100);
        }
    }
}
function tianjianGu() {
    this.dispatchMessage = function (b) {
        var type = b.get("type"), subType = b.get("subtype");
        console.log(type); console.log(subType);
        if (type == "vs" && subType == "vs_info") { //这是进入战斗的提示
            // ninesword();//绝学先放个
        } else if (subType == "combat_result") {//战斗结束 继续调取击
            tjfight = 0;
            send("look_room\n");
            setTimeout(killtianjian, 100);
        }
    }
}
function killtianjian() {
    var npclist = g_obj_map.get("msg_room");
    if ((npclist == undefined || tjfight == 1) && tianjianTrigger == 1) {
        setTimeout(function () { killtianjian(); }, 500);
    } else {
        if (npclist.get("go_random") == preroomrandom && g_obj_map.get("msg_team") == undefined) {   // 没动啊，是队长或者一个人的话就再次调用移动
            tjroomclear = 1;
            return;
        } else if (npclist.get("go_random") == preroomrandom && g_obj_map.get("msg_team").get("is_learder") == undefined) {
            tjroomclear = 1;
            return;
        } else if (npclist.get("go_random") == preroomrandom && g_obj_map.get("msg_team").get("is_learder") == 1) {
            tjroomclear = 1;
            return;
        }
        for (var i = 1; i < 10; i++) {
            if (npclist.get("npc" + i) == undefined) {
                if (g_obj_map.get("msg_team") == undefined) {
                    break;
                } else if (g_obj_map.get("msg_team").get("is_learder") == undefined) {
                    break;
                } else if (g_obj_map.get("msg_team").get("is_learder") == 1) {
                    break;
                } else if (parseInt(g_obj_map.get("msg_team").get("is_leader")) == 0) {
                    break;
                }
            }
            if (npclist.get("npc" + i).split(",")[0] != "kuafu_tjgws" && npclist.get("npc" + i).split(",")[1].match("符兵") == null) {
                tjfight = 1;
                //  clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
                break;
            }

        }
        for (var i = 1; i < 10; i++) {
            if (npclist.get("npc" + i) == undefined) {
                if (g_obj_map.get("msg_team") == undefined) {
                    tjroomclear = 1;
                    return;
                } else if (g_obj_map.get("msg_team").get("is_learder") == undefined) {
                    tjroomclear = 1;
                    return;
                } else if (g_obj_map.get("msg_team").get("is_learder") == 1) {
                    tjroomclear = 1;
                    return;
                } else if (parseInt(g_obj_map.get("msg_team").get("is_leader")) == 0) {
                    if (tianjianTrigger == 1)
                        setTimeout(killtianjian, 200);
                }
            }
            if (npclist.get("npc" + i).split(",")[0] == "kuafu_tjgws") {
                tjfight = 1;
                console.log("kill " + npclist.get("npc" + i).split(",")[0]);
                //   clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
                return;
            }
        }
        killtianjian();
    }
}
var tianjian = new tianjianGu;

//------------------------------------------------

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
    /*    if (jiulao == 0 ){
        go("jh 8;w;nw;n;n;n;n;e;e;n;n;e;kill emei_shoushan;");
        jiulao = 1;
    }
    else{
        if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "山门广场"){
            alert("请位于 #山门广场# 位置再点 #九老洞# 按钮！");
            return;
        }
        go("n;n;n;w;n;n;n;n;n;n;n;n;n;nw;sw;w;nw;w;find_task_road secret;secret_op1");
    }
   */
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


// 答题 ---------------------------------------------------
var answerQuestionsInterval = null;
var QuestAnsLibs = {
    "“白玉牌楼”场景是在哪个地图上？": "c",
    "“百龙山庄”场景是在哪个地图上？": "b",
    "“冰火岛”场景是在哪个地图上？": "b",
    "“常春岛渡口”场景是在哪个地图上？": "c",
    "“跪拜坪”场景是在哪个地图上？": "b",
    "“翰墨书屋”场景是在哪个地图上？": "c",
    "“花海”场景是在哪个地图上？": "a",
    "朱姑娘是哪个门派的师傅": "a",
    "“留云馆”场景是在哪个地图上？": "b",
    "“日月洞”场景是在哪个地图上？": "b",
    "“蓉香榭”场景是在哪个地图上？": "c",
    "“三清宫”场景是在哪个地图上？": "c",
    "“三清殿”场景是在哪个地图上？": "b",
    "“双鹤桥”场景是在哪个地图上？": "b",
    "“无名山脚”场景是在哪个地图上？": "d",
    "“伊犁”场景是在哪个地图上？": "b",
    "“鹰记商号”场景是在哪个地图上？": "d",
    "“迎梅客栈”场景是在哪个地图上？": "d",
    "“子午楼”场景是在哪个地图上？": "c",
    "8级的装备摹刻需要几把刻刀": "a",
    "NPC公平子在哪一章地图": "a",
    "瑷伦在晚月庄的哪个场景": "b",
    "安惜迩是在那个场景": "c",
    "阳刚之劲是哪个门派的阵法": "c",
    "黯然销魂掌有多少招式？": "c",
    "黯然销魂掌是哪个门派的技能": "a",
    "八卦迷阵是哪个门派的阵法？": "b",
    "八卦迷阵是那个门派的阵法": "a",
    "白金戒指可以在哪位npc那里获得？": "b",
    "白金手镯可以在哪位那里获得？": "a",
    "白金项链可以在哪位那里获得？": "b",
    "白蟒鞭的伤害是多少？": "a",
    "白驼山第一位要拜的师傅是谁": "a",
    "白银宝箱礼包多少元宝一个": "d",
    "白玉腰束是腰带类的第几级装备？": "b",
    "拜师风老前辈需要正气多少": "b",
    "拜师老毒物需要蛤蟆功多少级": "a",
    "拜师铁翼需要多少内力": "b",
    "拜师小龙女需要容貌多少": "c",
    "拜师张三丰需要多少正气": "b",
    "包家将是哪个门派的师傅": "a",
    "包拯在哪一章": "d",
    "宝石合成一次需要消耗多少颗低级宝石？": "c",
    "宝玉帽可以在哪位那里获得？": "d",
    "宝玉鞋击杀哪个可以获得": "a",
    "宝玉鞋在哪获得": "a",
    "暴雨梨花针的伤害是多少？": "c",
    "北斗七星阵是第几个的组队副本": "c",
    "北冥神功是哪个门派的技能": "b",
    "北岳殿神像后面是哪位npc": "b",
    "匕首加什么属性": "c",
    "碧海潮生剑在哪位师傅处学习": "a",
    "碧磷鞭的伤害是多少？": "b",
    "镖局保镖是挂机里的第几个任务": "d",
    "冰魄银针的伤害是多少？": "b",
    "病维摩拳是哪个门派的技能": "b",
    "不可保存装备下线多久会消失": "c",
    "不属于白驼山的技能是什么": "b",
    "沧海护腰可以镶嵌几颗宝石": "d",
    "沧海护腰是腰带类的第几级装备？": "a",
    "藏宝图在哪个NPC处购买": "a",
    "藏宝图在哪个处购买": "b",
    "藏宝图在哪里那里买": "a",
    "草帽可以在哪位那里获得？": "b",
    "成功易容成异性几次可以领取易容成就奖": "b",
    "成长计划第七天可以领取多少元宝？": "d",
    "成长计划六天可以领取多少银两？": "d",
    "成长计划需要多少元宝方可购买？": "a",
    "城里打擂是挂机里的第几个任务": "d",
    "城里抓贼是挂机里的第几个任务": "b",
    "充值积分不可以兑换下面什么物品": "d",
    "出生选武学世家增加什么": "a",
    "闯楼第几层可以获得称号“藏剑楼护法”": "b",
    "闯楼第几层可以获得称号“藏剑楼楼主”": "d",
    "闯楼第几层可以获得称号“藏剑楼长老”": "c",
    "闯楼每多少层有称号奖励": "a",
    "春风快意刀是哪个门派的技能": "b",
    "春秋水色斋需要多少杀气才能进入": "d",
    "从哪个处进入跨服战场": "a",
    "摧心掌是哪个门派的技能": "a",
    "达摩在少林哪个场景": "c",
    "达摩杖的伤害是多少？": "d",
    "打开引路蜂礼包可以得到多少引路蜂？": "b",
    "打排行榜每天可以完成多少次？": "a",
    "打土匪是挂机里的第几个任务": "c",
    "打造刻刀需要多少个玄铁": "a",
    "打坐增长什么属性": "a",
    "大保险卡可以承受多少次死亡后不降技能等级？": "b",
    "大乘佛法有什么效果": "d",
    "大旗门的修养术有哪个特殊效果": "a",
    "大旗门的云海心法可以提升哪个属性": "c",
    "大招寺的金刚不坏功有哪个特殊效果": "a",
    "大招寺的铁布衫有哪个特殊效果": "c",
    "当日最低累积充值多少元即可获得返利？": "b",
    "刀法基础在哪掉落": "a",
    "倒乱七星步法是哪个门派的技能": "d",
    "等级多少才能在世界频道聊天？": "c",
    "第一个副本需要多少等级才能进入": "d",
    "貂皮斗篷是披风类的第几级装备？": "b",
    "丁老怪是哪个门派的终极师傅": "a",
    "丁老怪在星宿海的哪个场景": "b",
    "东方教主在魔教的哪个场景": "b",
    "斗转星移是哪个门派的技能": "a",
    "斗转星移阵是哪个门派的阵法": "a",
    "毒龙鞭的伤害是多少？": "a",
    "毒物阵法是哪个门派的阵法": "b",
    "独孤求败有过几把剑？": "d",
    "独龙寨是第几个组队副本": "a",
    "读书写字301-400级在哪里买书": "c",
    "读书写字最高可以到多少级": "b",
    "端茶递水是挂机里的第几个任务": "b",
    "断云斧是哪个门派的技能": "a",
    "锻造一把刻刀需要多少玄铁碎片锻造？": "c",
    "锻造一把刻刀需要多少银两？": "a",
    "兑换易容面具需要多少玄铁碎片": "c",
    "多少消费积分换取黄金宝箱": "a",
    "多少消费积分可以换取黄金钥匙": "b",
    "翻译梵文一次多少银两": "d",
    "方媃是哪个门派的师傅": "b",
    "飞仙剑阵是哪个门派的阵法": "b",
    "风老前辈在华山哪个场景": "b",
    "风泉之剑加几点悟性": "c",
    "风泉之剑可以在哪位npc那里获得？": "b",
    "风泉之剑在哪里获得": "d",
    "疯魔杖的伤害是多少？": "b",
    "伏虎杖的伤害是多少？": "c",
    "副本完成后不可获得下列什么物品": "b",
    "副本一次最多可以进几人": "a",
    "副本有什么奖励": "d",
    "富春茶社在哪一章": "c",
    "改名字在哪改？": "d",
    "丐帮的绝学是什么": "a",
    "丐帮的轻功是哪个": "b",
    "干苦力是挂机里的第几个任务": "a",
    "钢丝甲衣可以在哪位那里获得？": "d",
    "高级乾坤再造丹加什么": "b",
    "高级乾坤再造丹是增加什么的？": "b",
    "高级突破丹多少元宝一颗": "d",
    "割鹿刀可以在哪位npc那里获得？": "b",
    "葛伦在大招寺的哪个场景": "b",
    "根骨能提升哪个属性": "c",
    "功德箱捐香火钱有什么用": "a",
    "功德箱在雪亭镇的哪个场景？": "c",
    "购买新手进阶礼包在挂机打坐练习上可以享受多少倍收益？": "b",
    "孤独求败称号需要多少论剑积分兑换": "b",
    "孤儿出身增加什么": "d",
    "古灯大师是哪个门派的终极师傅": "c",
    "古灯大师在大理哪个场景": "c",
    "古墓多少级以后才能进去？": "d",
    "寒玉床睡觉修炼需要多少点内力值": "c",
    "寒玉床睡觉一次多久": "c",
    "寒玉床需要切割多少次": "d",
    "寒玉床在哪里切割": "a",
    "寒玉床在那个地图可以找到？": "a",
    "黑狗血在哪获得": "b",
    "黑水伏蛟可以在哪位那里获得？": "c",
    "红宝石加什么属性？": "b",
    "洪帮主在洛阳哪个场景": "c",
    "虎皮腰带是腰带类的第几级装备？": "a",
    "花不为在哪一章": "a",
    "花花公子在哪个地图": "a",
    "华山村王老二掉落的物品是什么": "a",
    "华山施戴子掉落的物品是什么": "b",
    "华山武器库从哪个NPC进": "d",
    "黄宝石加什么属性": "c",
    "黄岛主在桃花岛的哪个场景": "d",
    "黄袍老道是哪个门派的师傅": "c",
    "积分商城在雪亭镇的哪个场景？": "c",
    "技能柳家拳谁教的？": "a",
    "技能数量超过了什么消耗潜能会增加": "b",
    "嫁衣神功是哪个门派的技能": "b",
    "剑冢在哪个地图": "a",
    "街头卖艺是挂机里的第几个任务": "a",
    "金弹子的伤害是多少？": "a",
    "金刚不坏功有什么效果": "a",
    "金刚杖的伤害是多少？": "a",
    "金戒指可以在哪位npc那里获得？": "d",
    "金手镯可以在哪位npc那里获得？": "b",
    "金丝鞋可以在哪位npc那里获得？": "b",
    "金项链可以在哪位npc那里获得？": "d",
    "金玉断云是哪个门派的阵法": "a",
    "锦缎腰带是腰带类的第几级装备？": "a",
    "精铁棒可以在哪位那里获得？": "d",
    "九区服务器名称": "d",
    "九阳神功是哪个门派的技能": "c",
    "九阴派梅师姐在星宿海哪个场景": "a",
    "军营是第几个组队副本": "b",
    "开通VIP月卡最低需要当天充值多少元方有购买资格？": "a",
    "可以召唤金甲伏兵助战是哪个门派？": "a",
    "客商在哪一章": "b",
    "孔雀氅可以镶嵌几颗宝石": "b",
    "孔雀氅是披风类的第几级装备？": "c",
    "枯荣禅功是哪个门派的技能": "a",
    "跨服是星期几举行的": "b",
    "跨服天剑谷每周六几点开启": "a",
    "跨服需要多少级才能进入": "c",
    "跨服在哪个场景进入": "c",
    "兰花拂穴手是哪个门派的技能": "a",
    "蓝宝石加什么属性": "a",
    "蓝止萍在哪一章": "c",
    "蓝止萍在晚月庄哪个小地图": "b",
    "老毒物在白驮山的哪个场景": "b",
    "老顽童在全真教哪个场景": "b",
    "莲花掌是哪个门派的技能": "a",
    "烈火旗大厅是那个地图的场景": "c",
    "烈日项链可以镶嵌几颗宝石": "c",
    "林祖师是哪个门派的师傅": "a",
    "灵蛇杖法是哪个门派的技能": "c",
    "凌波微步是哪个门派的技能": "b",
    "凌虚锁云步是哪个门派的技能": "b",
    "领取消费积分需要寻找哪个NPC？": "c",
    "鎏金缦罗是披风类的第几级装备？": "d",
    "柳淳风在哪一章": "c",
    "柳淳风在雪亭镇哪个场景": "b",
    "柳文君所在的位置": "a",
    "六脉神剑是哪个门派的绝学": "a",
    "陆得财是哪个门派的师傅": "c",
    "陆得财在乔阴县的哪个场景": "a",
    "论剑每天能打几次": "a",
    "论剑是每周星期几": "c",
    "论剑是什么时间点正式开始": "a",
    "论剑是星期几进行的": "c",
    "论剑是星期几举行的": "c",
    "论剑输一场获得多少论剑积分": "a",
    "论剑要在晚上几点前报名": "b",
    "论剑在周几进行？": "b",
    "论剑中步玄派的师傅是哪个": "a",
    "论剑中大招寺第一个要拜的师傅是谁": "c",
    "论剑中古墓派的终极师傅是谁": "d",
    "论剑中花紫会的师傅是谁": "c",
    "论剑中青城派的第一个师傅是谁": "a",
    "论剑中青城派的终极师傅是谁": "d",
    "论剑中逍遥派的终极师傅是谁": "c",
    "论剑中以下不是峨嵋派技能的是哪个": "b",
    "论剑中以下不是华山派的人物的是哪个": "d",
    "论剑中以下哪个不是大理段家的技能": "c",
    "论剑中以下哪个不是大招寺的技能": "b",
    "论剑中以下哪个不是峨嵋派可以拜师的师傅": "d",
    "论剑中以下哪个不是丐帮的技能": "d",
    "论剑中以下哪个不是丐帮的人物": "a",
    "论剑中以下哪个不是古墓派的的技能": "b",
    "论剑中以下哪个不是华山派的技能的": "d",
    "论剑中以下哪个不是明教的技能": "d",
    "论剑中以下哪个不是魔教的技能": "a",
    "论剑中以下哪个不是魔教的人物": "d",
    "论剑中以下哪个不是全真教的技能": "d",
    "论剑中以下哪个不是是晚月庄的技能": "d",
    "论剑中以下哪个不是唐门的技能": "c",
    "论剑中以下哪个不是唐门的人物": "c",
    "论剑中以下哪个不是铁雪山庄的技能": "d",
    "论剑中以下哪个不是铁血大旗门的技能": "c",
    "论剑中以下哪个是大理段家的技能": "a",
    "论剑中以下哪个是大招寺的技能": "b",
    "论剑中以下哪个是丐帮的技能": "b",
    "论剑中以下哪个是花紫会的技能": "a",
    "论剑中以下哪个是华山派的技能的": "a",
    "论剑中以下哪个是明教的技能": "b",
    "论剑中以下哪个是青城派的技能": "b",
    "论剑中以下哪个是唐门的技能": "b",
    "论剑中以下哪个是天邪派的技能": "b",
    "论剑中以下哪个是天邪派的人物": "a",
    "论剑中以下哪个是铁雪山庄的技能": "c",
    "论剑中以下哪个是铁血大旗门的技能": "b",
    "论剑中以下哪个是铁血大旗门的师傅": "a",
    "论剑中以下哪个是晚月庄的技能": "a",
    "论剑中以下哪个是晚月庄的人物": "a",
    "论剑中以下是峨嵋派技能的是哪个": "a",
    "论语在哪购买": "a",
    "骆云舟在哪一章": "c",
    "骆云舟在乔阴县的哪个场景": "b",
    "落英神剑掌是哪个门派的技能": "b",
    "吕进在哪个地图": "a",
    "绿宝石加什么属性": "c",
    "漫天花雨匕在哪获得": "a",
    "茅山的绝学是什么": "b",
    "茅山的天师正道可以提升哪个属性": "d",
    "茅山可以招几个宝宝": "c",
    "茅山派的轻功是什么": "b",
    "茅山天师正道可以提升什么": "c",
    "茅山学习什么技能招宝宝": "a",
    "茅山在哪里拜师": "c",
    "每次合成宝石需要多少银两？": "a",
    "每个玩家最多能有多少个好友": "b",
    "乌檀木刀可以在哪位npc那里获得？": "d",
    "“双鹤桥”场景是在哪个地图上？": "b",
    "vip每天不可以领取什么": "b",
    "每天的任务次数几点重置": "d",
    "每天分享游戏到哪里可以获得20元宝": "a",
    "每天能挖几次宝": "d",
    "每天能做多少个谜题任务": "a",
    "每天能做多少个师门任务": "c",
    "每天微信分享能获得多少元宝": "d",
    "每天有几次试剑": "b",
    "每天在线多少个小时即可领取消费积分？": "b",
    "每突破一次技能有效系数加多少": "a",
    "密宗伏魔是哪个门派的阵法": "c",
    "灭绝师太在第几章": "c",
    "灭绝师太在峨眉山哪个场景": "a",
    "明教的九阳神功有哪个特殊效果": "a",
    "明月帽要多少刻刀摩刻？": "a",
    "摹刻10级的装备需要摩刻技巧多少级": "b",
    "摹刻烈日宝链需要多少级摩刻技巧？": "c",
    "摹刻扬文需要多少把刻刀？": "a",
    "魔鞭诀在哪里学习": "d",
    "魔教的大光明心法可以提升哪个属性": "d",
    "莫不收在哪一章": "a",
    "墨磷腰带是腰带类的第几级装备？": "d",
    "木道人在青城山的哪个场景": "b",
    "慕容家主在慕容山庄的哪个场景": "a",
    "慕容山庄的斗转星移可以提升哪个属性": "d",
    "哪个NPC掉落拆招基础": "a",
    "哪个处可以捏脸": "a",
    "哪个分享可以获得20元宝": "b",
    "哪个技能不是魔教的": "d",
    "哪个门派拜师没有性别要求": "d",
    "哪个npc属于全真七子": "b",
    "哪样不能获得玄铁碎片": "c",
    "能增容貌的是下面哪个技能": "a",
    "捏脸需要花费多少银两？": "c",
    "捏脸需要寻找哪个NPC？": "a",
    "欧阳敏是哪个门派的？": "b",
    "欧阳敏是哪个门派的师傅": "b",
    "欧阳敏在哪一章": "a",
    "欧阳敏在唐门的哪个场景": "c",
    "排行榜最多可以显示多少名玩家？": "a",
    "逄义是在那个场景": "a",
    "披星戴月是披风类的第几级装备？": "d",
    "劈雳拳套有几个镶孔": "a",
    "霹雳掌套的伤害是多少": "b",
    "辟邪剑法是哪个门派的绝学技能": "a",
    "辟邪剑法在哪学习": "b",
    "婆萝蜜多心经是哪个门派的技能": "b",
    "七宝天岚舞是哪个门派的技能": "d",
    "七星鞭的伤害是多少？": "c",
    "七星剑法是哪个门派的绝学": "a",
    "棋道是哪个门派的技能": "c",
    "千古奇侠称号需要多少论剑积分兑换": "d",
    "乾坤大挪移属于什么类型的武功": "a",
    "乾坤一阳指是哪个师傅教的": "a",
    "青城派的道德经可以提升哪个属性": "c",
    "青城派的道家心法有哪个特殊效果": "a",
    "清风寨在哪": "b",
    "清风寨在哪个地图": "d",
    "清虚道长在哪一章": "d",
    "去唐门地下通道要找谁拿钥匙": "a",
    "全真的道家心法有哪个特殊效果": "a",
    "全真的基本阵法有哪个特殊效果": "b",
    "全真的双手互搏有哪个特殊效果": "c",
    "日月神教大光明心法可以提升什么": "d",
    "如何将华山剑法从400级提升到440级？": "d",
    "如意刀是哪个门派的技能": "c",
    "山河藏宝图需要在哪个NPC手里购买？": "d",
    "上山打猎是挂机里的第几个任务": "c",
    "少林的混元一气功有哪个特殊效果": "d",
    "少林的易筋经神功有哪个特殊效果": "a",
    "蛇形刁手是哪个门派的技能": "b",
    "什么影响打坐的速度": "c",
    "什么影响攻击力": "d",
    "什么装备不能镶嵌黄水晶": "d",
    "什么装备都能镶嵌的是什么宝石？": "c",
    "什么装备可以镶嵌紫水晶": "c",
    "神雕大侠所在的地图": "b",
    "神雕大侠在哪一章": "a",
    "神雕侠侣的时代背景是哪个朝代？": "d",
    "神雕侠侣的作者是?": "b",
    "升级什么技能可以提升根骨": "a",
    "生死符的伤害是多少？": "a",
    "师门磕头增加什么": "a",
    "师门任务每天可以完成多少次？": "a",
    "师门任务每天可以做多少个？": "c",
    "师门任务什么时候更新？": "b",
    "师门任务一天能完成几次": "d",
    "师门任务最多可以完成多少个？": "d",
    "施令威在哪个地图": "b",
    "石师妹哪个门派的师傅": "c",
    "使用朱果经验潜能将分别增加多少？": "a",
    "首次通过乔阴县不可以获得那种奖励？": "a",
    "受赠的消费积分在哪里领取": "d",
    "兽皮鞋可以在哪位那里获得？": "b",
    "树王坟在第几章节": "c",
    "双儿在扬州的哪个小地图": "a",
    "孙天灭是哪个门派的师傅": "c",
    "踏雪无痕是哪个门派的技能": "b",
    "踏云棍可以在哪位那里获得？": "a",
    "唐门的唐门毒经有哪个特殊效果": "a",
    "唐门密道怎么走": "c",
    "天蚕围腰可以镶嵌几颗宝石": "d",
    "天蚕围腰是腰带类的第几级装备？": "d",
    "天山姥姥在逍遥林的哪个场景": "d",
    "天山折梅手是哪个门派的技能": "c",
    "天师阵法是哪个门派的阵法": "b",
    "天邪派在哪里拜师": "b",
    "天羽奇剑是哪个门派的技能": "a",
    "铁戒指可以在哪位那里获得  ": "a",
    "铁手镯 可以在哪位npc那里获得？  ": "a",
    "铁血大旗门云海心法可以提升什么": "a",
    "通灵需要花费多少银两？": "d",
    "通灵需要寻找哪个NPC？": "c",
    "突破丹在哪里购买": "b",
    "屠龙刀法是哪个门派的绝学技能": "b",
    "屠龙刀是什么级别的武器": "a",
    "挖剑冢可得什么": "a",
    "弯月刀可以在哪位那里获得？": "b",
    "玩家每天能够做几次正邪任务": "c",
    "玩家想修改名字可以寻找哪个NPC？": "a",
    "晚月庄的内功是什么": "b",
    "晚月庄的七宝天岚舞可以提升哪个属性": "b",
    "晚月庄的小贩在下面哪个地点": "a",
    "晚月庄七宝天岚舞可以提升什么": "b",
    "晚月庄主线过关要求": "a",
    "王铁匠是在那个场景": "b",
    "王重阳是哪个门派的师傅": "b",
    "魏无极处读书可以读到多少级？": "a",
    "魏无极身上掉落什么装备": "c",
    "魏无极在第几章": "a",
    "闻旗使在哪个地图": "a",
    "乌金玄火鞭的伤害是多少？": "d",
    "钨金腰带是腰带类的第几级装备？": "d",
    "武当派的绝学技能是以下哪个": "d",
    "武穆兵法提升到多少级才能出现战斗必刷？": "d",
    "武穆兵法通过什么学习": "a",
    "武学世家加的什么初始属性": "a",
    "舞中之武是哪个门派的阵法": "b",
    "西毒蛇杖的伤害是多少？": "c",
    "吸血蝙蝠在下面哪个地图": "a",
    "下列哪项战斗不能多个玩家一起战斗？": "a",
    "下列装备中不可摹刻的是": "c",
    "下面哪个不是古墓的师傅": "d",
    "下面哪个不是门派绝学": "d",
    "下面哪个不是魔教的": "d",
    "下面哪个地点不是乔阴县的": "d",
    "下面哪个门派是正派": "a",
    "下面哪个是天邪派的师傅": "a",
    "下面有什么是寻宝不能获得的": "c",
    "向师傅磕头可以获得什么？": "b",
    "逍遥步是哪个门派的技能": "a",
    "逍遥林是第几章的地图": "c",
    "逍遥林怎么弹琴可以见到天山姥姥": "b",
    "逍遥派的绝学技能是以下哪个": "a",
    "萧辟尘在哪一章": "d",
    "小李飞刀的伤害是多少？": "d",
    "小龙女住的古墓是谁建造的？": "b",
    "小男孩在华山村哪里": "a",
    "新人礼包在哪个npc处兑换": "a",
    "新手礼包在哪里领取": "a",
    "新手礼包在哪领取？": "c",
    "需要使用什么衣服才能睡寒玉床": "a",
    "选择孤儿会影响哪个属性": "c",
    "选择商贾会影响哪个属性": "b",
    "选择书香门第会影响哪个属性": "b",
    "选择武学世家会影响哪个属性": "a",
    "学习屠龙刀法需要多少内力": "b",
    "雪莲有什么作用": "a",
    "雪蕊儿是哪个门派的师傅": "a",
    "雪蕊儿在铁雪山庄的哪个场景": "d",
    "扬文的属性": "a",
    "扬州询问黑狗能到下面哪个地点": "a",
    "扬州在下面哪个地点的处可以获得玉佩": "c",
    "羊毛斗篷是披风类的第几级装备？": "a",
    "阳刚之劲是哪个门派的阵法": "c",
    "杨过小龙女分开多少年后重逢?": "c",
    "杨过在哪个地图": "a",
    "夜行披风是披风类的第几级装备？": "a",
    "夜皇在大旗门哪个场景": "c",
    "一个队伍最多有几个队员": "c",
    "一天能完成谜题任务多少个": "b",
    "一天能完成师门任务有多少个": "c",
    "一天能完成挑战排行榜任务多少次": "a",
    "一张分身卡的有效时间是多久": "c",
    "一指弹在哪里领悟": "b",
    "移开明教石板需要哪项技能到一定级别": "a",
    "以下不是步玄派的技能的哪个": "c",
    "以下不是天宿派师傅的是哪个": "c",
    "以下不是隐藏门派的是哪个": "d",
    "铁手镯可以在哪位npc那里获得": "a",
    "以下哪个宝石不能镶嵌到戒指": "c",
    "以下哪个宝石不能镶嵌到内甲": "a",
    "以下哪个宝石不能镶嵌到披风": "c",
    "以下哪个宝石不能镶嵌到腰带": "c",
    "以下哪个宝石不能镶嵌到衣服": "a",
    "以下哪个不是道尘禅师教导的武学？": "d",
    "以下哪个不是何不净教导的武学？": "c",
    "以下哪个不是慧名尊者教导的技能？": "d",
    "以下哪个不是空空儿教导的武学？": "b",
    "以下哪个不是梁师兄教导的武学？": "b",
    "以下哪个不是论剑的皮肤？": "d",
    "以下哪个不是全真七子？": "c",
    "以下哪个不是宋首侠教导的武学？": "d",
    "以下哪个不是微信分享好友、朋友圈、QQ空间的奖励？": "a",
    "以下哪个不是岳掌门教导的武学？": "a",
    "以下哪个不是在洛阳场景 ": "d",
    "以下哪个不是在雪亭镇场景": "d",
    "以下哪个不是在扬州场景": "d",
    "以下哪个不是知客道长教导的武学？": "b",
    "以下哪个门派不是隐藏门派？": "c",
    "以下哪个门派是正派？": "d",
    "以下哪个门派是中立门派？": "a",
    "以下哪个是步玄派的祖师": "b",
    "以下哪个是封山派的祖师": "c",
    "以下哪个是花紫会的祖师": "a",
    "以下哪个是晚月庄的祖师": "d",
    "以下哪些物品不是成长计划第二天可以领取的？": "c",
    "以下哪些物品不是成长计划第三天可以领取的？": "d",
    "以下哪些物品不是成长计划第一天可以领取的？": "d",
    "以下哪些物品是成长计划第四天可以领取的？": "a",
    "以下哪些物品是成长计划第五天可以领取的？": "b",
    "以下属于邪派的门派是哪个": "b",
    "以下属于正派的门派是哪个": "a",
    "以下谁不精通降龙十八掌？": "d",
    "以下有哪些物品不是每日充值的奖励？": "d",
    "倚天剑加多少伤害": "d",
    "倚天屠龙记的时代背景哪个朝代？": "a",
    "易容后保持时间是多久": "a",
    "易容面具需要多少玄铁兑换": "c",
    "易容术多少级才可以易容成异性NPC": "a",
    "易容术可以找哪位NPC学习？": "b",
    "易容术向谁学习": "a",
    "易容术在哪里学习": "a",
    "易容术在哪学习？": "b",
    "银手镯可以在哪位那里获得？": "b",
    "银丝链甲衣可以在哪位npc那里获得？": "a",
    "银项链可以在哪位那里获得？": "b",
    "尹志平是哪个门派的师傅": "b",
    "隐者之术是那个门派的阵法": "a",
    "鹰爪擒拿手是哪个门派的技能": "a",
    "影响你出生的福缘的出生是？": "d",
    "油流麻香手是哪个门派的技能": "a",
    "游龙散花是哪个门派的阵法": "d",
    "玉蜂浆在哪个地图获得": "a",
    "玉女剑法是哪个门派的技能": "b",
    "岳掌门在哪一章": "a",
    "云九天是哪个门派的师傅": "c",
    "云问天在哪一章": "a",
    "在洛阳萧问天那可以学习什么心法": "b",
    "在庙祝处洗杀气每次可以消除多少点": "a",
    "在哪个NPC可以购买恢复内力的药品？ ": "c",
    "在哪个处可以更改名字": "a",
    "在哪个处领取免费消费积分": "d",
    "在哪个处能够升级易容术": "b",
    "在哪里可以找到“香茶”？": "a",
    "在哪里捏脸提升容貌": "d",
    "在哪里消杀气": "a",
    "在逍遥派能学到的技能是哪个": "a",
    "在雪亭镇李火狮可以学习多少级柳家拳": "b",
    "在战斗界面点击哪个按钮可以进入聊天界面": "d",
    "在正邪任务中不能获得下面什么奖励？": "d",
    "怎么样获得免费元宝": "a",
    "赠送李铁嘴银两能够增加什么": "a",
    "张教主在明教哪个场景": "d",
    "张三丰在哪一章": "d",
    "张三丰在武当山哪个场景": "d",
    "张松溪在哪个地图": "c",
    "张天师是哪个门派的师傅": "a",
    "张天师在茅山哪个场景": "d",
    "长虹剑在哪位那里获得？": "a",
    "长剑在哪里可以购买？": "a",
    "正邪任务杀死好人增长什么": "b",
    "正邪任务一天能做几次": "a",
    "正邪任务中客商的在哪个地图": "a",
    "正邪任务中卖花姑娘在哪个地图": "b",
    "正邪任务最多可以完成多少个？": "d",
    "支线对话书生上魁星阁二楼杀死哪个NPC给10元宝": "a",
    "朱姑娘是哪个门派的师傅": "a",
    "朱老伯在华山村哪个小地图": "b",
    "追风棍可以在哪位npc那里获得？": "a",
    "追风棍在哪里获得": "b",
    "紫宝石加什么属性": "d",
    "下面哪个npc不是魔教的": "d",
    "藏宝图在哪里npc那里买": "a",
    "从哪个npc处进入跨服战场": "a",
    "钻石项链在哪获得": "a",
    "在哪个npc处能够升级易容术": "b",
    "扬州询问黑狗子能到下面哪个地点": "a",
    "北岳殿神像后面是哪位npc": "b",
    "兽皮鞋可以在哪位npc那里获得？": "b",
    "在哪个npc处领取免费消费积分": "d",
    "踏云棍可以在哪位npc那里获得？": "a",
    "钢丝甲衣可以在哪位npc那里获得？": "d",
    "铁手镯  可以在哪位npc那里获得？": "a",
    "哪个npc处可以捏脸": "a",
    "草帽可以在哪位npc那里获得？": "b",
    "铁戒指可以在哪位npc那里获得？": "a",
    "银项链可以在哪位npc那里获得？": "b",
    "在哪个npc处可以更改名字": "a",
    "长剑在哪里可以购买？": "a",
    "宝玉帽可以在哪位npc那里获得？": "d",
    "论剑中以下哪个不是晚月庄的技能": "d",
    "清风寨在哪": "b",
    "精铁棒可以在哪位npc那里获得？": "d",
    "弯月刀可以在哪位npc那里获得？": "b",
    "密宗伏魔是哪个门派的阵法": "c",
    "vip每天不可以领取什么": "b",
    "华山施戴子掉落的物品是什么": "b",
    "钻石项链在哪获得": "a",
    "藏宝图在哪个npc处购买": "b",
    "宝玉鞋击杀哪个npc可以获得": "a",
    "银手镯可以在哪位npc那里获得？": "b",
    "莲花掌是哪个门派的技能": "a",
    "九区服务器名称": "d",
    "以下哪个不是在洛阳场景": "d",
    "扬州在下面哪个地点的npc处可以获得玉佩": "c",
    "清风寨在哪": "b",
    "花不为在哪一章": "a",
    "跨服天剑谷是星期几举行的": "b",
    "白金手镯可以在哪位npc那里获得？": "a",
    "长虹剑在哪位npc那里获得？": "a",
    "全真的基本阵法有哪个特殊效果": "b",
    "以下哪个门派不是隐藏门派？": "c",
    "追风棍在哪里获得？": "b",
    "林祖师是哪个门派的师傅": "a",
    "丁老怪是哪个门派的终极师傅": "a",
    "武学世家加的什么初始属性": "a",
    "白金项链可以在哪位npc那里获得？": "b",
    "黑水伏蛟可以在哪位npc那里获得？": "c",
    "“翰墨书屋”场景是在哪个地图上？": "c"
};
function answerQuestionsFunc() {
    if (btnList["开答题"].innerText == "开答题") {
        console.log("准备自动答题！");
        answerQuestionsInterval = setInterval(answerQuestions, 500);
        btnList["开答题"].innerText = "停答题";
    }
    //else{
    //  console.log("停止自动答题！");
    // btnList["开答题"].innerText = "开答题";
    //  clearInterval(answerQuestionsInterval);
    // }
}

function answerQuestions() {
    if ($('span:contains(每日武林知识问答次数已经)').text().slice(-46) == "每日武林知识问答次数已经达到限额，请明天再来。每日武林知识问答次数已经达到限额，请明天再来。") {
        // 今天答题结束了
        console.log("完成自动答题！");
        btnList["开答题"].innerText = "开答题";
        clearInterval(answerQuestionsInterval);
    }
    go('question');
    setTimeout(getAndAnsQuestion, 200); // 200 ms之后提取问题，查询答案，并回答
}

function getAndAnsQuestion() {
    // 提取问题
    //alert($(".out").text());
    var theQuestion = A = $(".out").text().split("题")[1].split("A")[0];
    // 左右去掉空格

    //var theQuestion = A = $(".out").text();
    //theQuestion=theQuestion.split("题")[1];
    //theQuestion=theQuestion.split("A.")[0];
    theQuestion = theQuestion.replace(/^\theQuestion*/, "");
    theQuestion = theQuestion.replace(/\theQuestion*$/, "");
    theQuestion = theQuestion.slice(1);
    //theQuestion = theQuestion.trim(" ","left").trim(" ","right");
    //alert(theQuestion);
    // 查找某个问题，如果问题有包含关系，则
    var theAnswer = getAnswer2Question(theQuestion);
    if (theAnswer !== "failed") {
        eval("go('question " + theAnswer + "')");
    }
    //  else{
    //alert("没有找到答案，请手动完成该题目！");
    //      console.log("停止自动答题！");
    //     btnList["开答题"].innerText = "开答题";
    //      clearInterval(answerQuestionsInterval);
    //      return;
    //  }
    setTimeout(printAnswerInfo, 300);

}
function printAnswerInfo() {
    console.log("完成一道武林知识问答：");
    console.log($('span:contains(知识问答第)').text().split("继续答题")[0]);
}
function getAnswer2Question(localQuestion) {
    // 如果找到答案，返回响应答案，a,b,c或者d
    // 如果没有找到答案，返回 "failed"

    var resultsFound = [];
    var countor = 0;
    for (var quest in QuestAnsLibs) {
        if (isContains(quest, localQuestion)) { //包含关系就可
            resultsFound[countor] = quest;
            countor = countor + 1;
        } else if (isContains(quest, localQuestion.replace("npc", "")) || isContains(quest, localQuestion.replace("NPC", ""))) {

        }

    }
    if (resultsFound.length == 1) {
        return QuestAnsLibs[resultsFound[0]];
    }
    else {
        console.log("题目 " + localQuestion + " 找不到答案或存在多个答案，请手动作答！");
        return "failed";
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
