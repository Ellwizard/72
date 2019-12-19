// ==UserScript==
// @name         B-1-5区-2019.10
// @namespace    http://tampermonkey.net/
// @version      2019.8.27
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
var skillstr = "神龙东来,温候戟舞,6,紫血大法";
var skillstr6 = "月夜鬼萧,神龙东来,6,紫血大法";
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
            skillstr6 = "月夜鬼萧,天外飞仙,6,紫血大法";
            skillstr9 = "打狗棒法,温候戟舞,6,紫血大法";
            mySkillLists = "温候戟舞";
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
var items_sell = '漫天花雨匕三清神冠七星翻云靴咒剑王□鲜红锦衣牛皮靴八角锤灰雁七星宝戒船桨白金项链断云斧乌夷长裙红色绸裙包子大剪刀黑水伏蛟帝王剑麻布手套银丝帽吴钩绵裙铜钹大刀紫袍铁笛圣火令绿罗裙绣花针清心散垓下刀紫金杖阿拉伯弯刀青锋剑青布袍淑女剑紫霜血蝉衣软金束带穿花蛇影鞋魔鞭翩珑大红僧袍九环禅杖精铁棒毒蒺藜暗灵桃木剑横断钩银丝链甲衣天魔刀玉竹杖叫化鸡七星剑逆钩匕银丝甲天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭硫磺木戟黑袍粗布白袍长戟回旋镖拂尘松子白色棋子黑色棋子竹节鞭白棋子木叉银色丝带波斯长袍铁鞭竹刀长虹剑莲蓬鲤鱼窄裉袄灵芝锦衣台夷头巾毛毯废焦丹废药渣台夷头巾粉红绸衫灰燕野山鸡麻雀岩鸽瑶琴维吾尔族长袍旧书桃符纸木锤木钩竹鞭木刀木枪木剑彩巾彩靴彩帽彩带彩镯彩衣砍刀绣花鞋舞蝶彩衫军刀铁扇剑割鹿刀大理雪梨圆领小袄皮帽弯月刀兔肉粗磁大碗羊肉串天山雪莲青铜盾禅杖金刚罩丝质披风暗箭青葫芦松子铁斧水蜜桃蓑衣破弯刀柴刀丝衣长鞭道德经布裙钢丝甲衣牛皮带制服金刚杖斩空刀拜月掌套金弹子新月棍白蟒鞭-草莓玉蜂浆玉蜂蜜蜂浆瓶豆浆蛋糕菠菜粉条包裹鸡叫草水密桃--新月棍银簪重甲羊角匕梅花匕日月神教腰牌船篙-丝绸马褂白缨冠白色长袍蛇杖鬼头刀拐杖古铜缎子袄裙大环刀鹿皮手套丝绸衣羊毛裙牧羊鞭牛皮酒袋麻带钢剑钢杖藤甲盾长斗篷军袍破披风木盾铁盾锦缎腰带鞶革青色道袍-鲫鱼树枝水草破烂衣服-鹿皮小靴青绫绸裙粗布衣草帽草鞋布鞋精铁甲-柳玉刀玉竹剑钢刀戒刀单刀长剑
