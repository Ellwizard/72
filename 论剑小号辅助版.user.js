// ==UserScript==
// @name         论剑小号辅助版
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ZERO
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @exclude      http://sword.mud.yytou.cn/*
// @grant        none
// ==/UserScript==
var btnList = {};       // 按钮列表
var buttonWidth = '45px';   // 按钮宽度
var buttonHeight = '20px';  // 按钮高度
var currentPos = 30;        // 当前按钮距离顶端高度，初始130
var delta = 25;                 // 每个按钮间隔

//-------------------------分割线-----------

mySkillLists = "九天龙吟剑法;排云掌法";

//-------------------------分割线-----------
var isDelayCmd = 1, // 是否延迟命令
    cmdCache = [],      // 命令池
    timeCmd = null,     // 定时器句柄
    cmdDelayTime = 200; // 命令延迟时间

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
    var cmd=cmdCache.shift();
    var arr=cmd.split(",");
    if(!sock) {
        return;
    }
    clickButton(arr[0]);
    for(var i=arr.length-1;i>0;i--){
        cmdCache.unshift(arr[i]);
    }

    // 如果命令池还有命令，则延时继续执行
    if (cmdCache.length > 0) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
    } else {
        // 没有命令 则归零
        timeCmd = 1;
        setTimeout(function(){
            if(cmdCache.length === 0)
                timeCmd=0;
            else
                delayCmd();
        },cmdDelayTime);
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

//按钮加入窗体中----------------------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function createButton(btnName,func){
    btnList[btnName]=document.createElement('button');
    var myBtn = btnList[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.right = '0px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);
    document.body.appendChild(myBtn);
}


//按钮列表----------------------------------
createButton('签到',CheckInFunc);
createButton('挖天矿',WTKFunc);
createButton('挖地矿',WDKFunc);
createButton('梵音',CheckInFunc1);
createButton('报名',ShiJieFunc);
//createButton('吃果',SongmieguiFunc);
//createButton('送花',Songmiegui1Func);
createButton('帮本',SaodangFunc);
//createButton('元宝',SWFunc);
//createButton('金元',SJFunc);
createButton('香符',SXFunc);
createButton('镖签',BiaochehaoFunc);
createButton('论剑',LlunjianjiangliFunc);
createButton('帮战',BZFunc);
createButton('退帮',TBPFunc);
createButton('加青',JBPFunc);
createButton('测试',TestFunc);
//createButton('VIP一键',VIPFunc);

/*test:
go("jh 1;e;n;n");go("jh 2;n;n;n")
*/

//测试---------------------------------------------------
function TestFunc(){
    go('event_1_22034949;event_1_40548659;event_1_40548659;event_1_40548659;event_1_40548659;event_1_40548659;event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;');//挖矿
}



// 签到--买蜜蜂------------------------------------------------------
function CheckInFunc(){
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
    go('shop;shop buy shop37;home;jh 5;n;n;n;n;n;n;w;event_1_69751810;event_1_43899943 go 4;');//祭祀
    go('jh 1;event_1_5481885;event_1_21024726;look_npc snow_mercenary;event_1_62827855;home;jh 5;n;w;event_1_8903562;home;');//61礼包
    //go('jh 1;event_1_57666623;items use obj_molitang;home;');//逢义 礼包、喝汤
    go('jh 5;n;n;n;w;sign7;home;exercise stop;exercise;shop money_buy mny_shop1_N_10');//扬州签到、买蜜蜂
    //go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;home;');//消费积分和谜题卡
    go('jh 2;;n;n;n;n;n;n;n;e;tzjh;');
    go('touzi_jihua2 buygo 6',1)//买投资计划1
    go('touzi_jihua2 buygo 5',1)//买投资计划1
    go('tzjh_lq;home;');//领取投资计划
    //go('clan incense cx;clan incense cx;clan incense cx;clan incense cx;clan incense cx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;home;');
    go('clan fb go_saodang shenshousenlin;home');
    go('jh 2;n;n;n;n;n;n;n;n;n;n;w;w;event_1_85329567;event_1_42250469;event_1_48689119;w;w;event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22034949;event_1_40548659;event_1_40548659;event_1_40548659;event_1_40548659;event_1_40548659;event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;home;score;items;');//挖矿
}
function CheckInFunc1(){
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
    go('jh 1;event_1_26477782;event_1_82393002;event_1_9402623;event_1_75784780;event_1_66219317;zhounian_lb;items use obj_molitang;items use obj_lanlingmeijiu;home;');//礼包
    go('shop;shop buy shop37;home;jh 5;n;n;n;n;n;n;w;event_1_69751810;event_1_43899943 go 4;');//祭祀
    //go('jh 1;w;event_1_46497436;home;');//纪念金庸
    //go('jh 1;event_1_57666623;items use obj_molitang;home;');//逢义 礼包、喝汤
    go('jh 5;n;n;n;w;sign7;home;exercise stop;exercise;shop money_buy mny_shop1_N_10');//扬州签到、买蜜蜂
    //go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;home;');//消费积分和谜题卡
    go('jh 2;;n;n;n;n;n;n;n;e;tzjh;');
    go('touzi_jihua2 buygo 6',1)//买投资计划1
    go('touzi_jihua2 buygo 5',1)//买投资计划1
    go('tzjh_lq;home;');//领取投资计划
    go('clan incense cx;clan incense cx;clan incense cx;clan incense cx;clan incense cx;;home')
 //clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;home;');
 //  go('clan fb go_saodang shenshousenlin;home');

}

// 小号报名论剑----------------------------
function ShiJieFunc(){
    go('swords');
    go('swords report go');
    go('swords select_member gaibang_hong');  //洪帮主
    go('swords select_member dali_yideng');   //古灯大师
    go('swords select_member gumu_yangguo');   //神雕大侠
   
}
// 挖地矿--------天event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;-------------------------------------------
function WTKFunc(){
      go('event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;');//挖矿
}

//=========== 地go('event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;}===================================================================================================
function WDKFunc(){
      go('event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;');//挖矿
}

//========
// 送玫瑰-吃朱果---------------------------------------------------
function SongmieguiFunc(){
     go('items info zhu guo;use_all');
}
// 送玫瑰---------------------------------------------------
function Songmiegui1Func(){
     go('items use meigui hua;items use meigui hua;items use meigui hua;items use meigui hua;items use meigui hua;');
}

// 扫荡帮本-----------------------------clan scene;clan fb;-----------------------
function SaodangFunc(){

     go('clan fb open shenshousenlin;clan fb open daxuemangongdao;home;clan;clan scene;look_npc clan_boss_607182547;');
     go('clan fb go_saodang shenshousenlin;home');//扫荡帮一
     go('clan fb go_saodang daxuemangongdao;home');//扫荡帮二
     
}
//帮派元宝--clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;-------------------------------------------------
function SWFunc(){
    go('clan incense cx;clan incense cx;clan incense cx;clan incense cx;clan incense cx;home;');//上香

}
//帮派声望----------------clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;------clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;-----------------------------
function SJFunc(){
     go('clan incense cx;clan incense cx;clan incense cx;clan incense cx;clan incense cx;home;');//元宝
     go('clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;home;');//上香
}
//烧香符---------------------------------------------------
function SXFunc(){
     go('items use obj_shaoxiangfu;');
}
// 镖车-签到--买蜜蜂------------------------------------------------------
function BiaochehaoFunc(){
   go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
   go('jh 1;event_1_5481885;event_1_21024726;look_npc snow_mercenary;event_1_62827855;home;jh 5;n;w;event_1_8903562;home;');//61礼包
   //go('jh 1;w;event_1_46497436;home;');//纪念金庸
   go('shop;shop buy shop37;home;jh 5;n;n;n;n;n;n;w;event_1_69751810;event_1_43899943 go 4;');//祭祀
   go('jh 1;event_1_26477782;event_1_82393002;event_1_9402623;event_1_75784780;event_1_66219317;zhounian_lb;home;exercise stop;exercise;sleep_hanyuchuang stop;sleep_hanyuchuang;shop money_buy mny_shop1_N_10');//礼包
    //go('jh 1;event_1_57666623;items use obj_molitang;home;');//逢义 礼包、喝汤
    //go('jh 5;n;n;n;w;sign7;home;exercise stop;exercise;shop money_buy mny_shop1_N_10');//扬州签到、买蜜蜂
    //go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;home;');//消费积分和谜题卡
    go('jh 2;;n;n;n;n;n;n;n;e;tzjh;');
    go('touzi_jihua2 buygo 6',1)//买投资计划1
    go('tzjh_lq;home;');//领取投资计划
    go('jh 2;n;n;n;n;n;n;n;n;n;n;w;w;event_1_85329567;event_1_42250469;event_1_48689119;w;w;event_1_21731755;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22920188;event_1_22034949;event_1_40548659;event_1_40548659;event_1_40548659;event_1_40548659;event_1_40548659;event_1_83697921;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;event_1_64388826;score;items;');//挖矿
}
// 领论剑奖励----------
function LlunjianjiangliFunc(){
   go('home;swords;swords get_drop go;');
   go('jh 4;n;n;n;e;lq_twar;home;');
    }
// 交帮战奖励----------
function BZFunc(){
   go('clan;clan scene;give_geling;give_fengyunling;');
   go('items use obj_fengyunbaoxiang;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;home;')
   go('items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;home;')
    }
// 退帮派----------
function TBPFunc(){
   go('clan;clan_members;clan quit go;');
    }
// 加帮派----------
function JBPFunc(){

     //go('clan;clan view 15201168739187;clan join 15201168739187;');//加梵音阁
     go('clan;clan view 15432282788748;clan join 15432282788748;');//加青龙
    }
