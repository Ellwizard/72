// ==UserScript==
// @name        导航仪
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @grant        none
// ==/UserScript==
var btnList = {};		// 按钮列表
var buttonWidth = '30px';	// 按钮宽度
var buttonHeight = '20px';	// 按钮高度
var currentPos = 0;		// 当前按钮距离顶端高度，初始130
var delta = 20;	                // 每个按钮间隔
//var corpseNPCLists = prompt("请输入要摸的目标","月老的尸体");



var isDelayCmd = 1, // 是否延迟命令
    cmdCache = [],      // 命令池
    timeCmd = null,     // 定时器句柄
    paustStatus = 0,   //是否暂停执行
    cmdDelayTime = 195; // 命令延迟时间
var post_list = [];
/*setInterval(function() {
	var room = g_obj_map.get('msg_room');
	for (var t, i = 1; (t = room.get('npc' + i)) != undefined; i++) {
		t = t.split(',');
		if ((t[1] == '展昭'||t[1] == '锦毛鼠_甲'||t[1] == '锦毛鼠_乙'||t[1] == '锦毛鼠_丙'||t[1] == '锦毛鼠_丁'||t[1] == '锦毛鼠_戊'||t[1] == '锦毛鼠_己'||t[1] == '锦毛鼠_庚'||t[1] == '锦毛鼠_辛'||t[1] == '锦毛鼠_壬'||t[1] == '锦毛鼠_癸'||t[1] == '翻江鼠_甲'||t[1] == '翻江鼠_乙'||t[1] == '翻江鼠_丙'||t[1] == '翻江鼠_丁'||t[1] == '翻江鼠_戊'||t[1] == '翻江鼠_己'||t[1] == '翻江鼠_庚'||t[1] == '翻江鼠_辛'||t[1] == '翻江鼠_壬'||t[1] == '翻江鼠_癸'||t[1] == '穿山鼠_甲'||t[1] == '穿山鼠_乙'||t[1] == '穿山鼠_丙'||t[1] == '穿山鼠_丁'||t[1] == '穿山鼠_戊'||t[1] == '穿山鼠_己'||t[1] == '穿山鼠_庚'||t[1] == '穿山鼠_辛'||t[1] == '穿山鼠_壬'||t[1] == '穿山鼠_癸'||t[1] == '彻地鼠_甲'||t[1] == '彻地鼠_乙'||t[1] == '彻地鼠_丙'||t[1] == '彻地鼠_丁'||t[1] == '彻地鼠_戊'||t[1] == '彻地鼠_己'||t[1] == '彻地鼠_庚'||t[1] == '彻地鼠_辛'||t[1] == '彻地鼠_壬'||t[1] == '彻地鼠_癸'||t[1] == '钻天鼠_甲'||t[1] == '钻天鼠_乙'||t[1] == '钻天鼠_丙'||t[1] == '钻天鼠_丁'||t[1] == '钻天鼠_戊'||t[1] == '钻天鼠_己'||t[1] == '钻天鼠_庚'||t[1] == '钻天鼠_辛'||t[1] == '钻天鼠_壬'||t[1] == '钻天鼠_癸') && post_list.indexOf(t[0]) < 0) {
			post_list.push(t[0]);
			var msg =t[1] + '已刷新';
			clickButton('clan chat ' + msg);
			var data = {cate: '五鼠', value: msg, notify: 1, expiredminu: 30};
			$.post('http://122.112.197.227:8100/home/LogCommon', data).error(function (xhr) {
				console.log('error: ' + xhr.status + ' ' + xhr.statusText);
			});
		}
	}
}, 1000);
*/
//setInterval(function() {go('e;w');},2000);//自动左右走路
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
     if(paustStatus === 1) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
        return;
    }
    var cmd=cmdCache.shift();
    if(!cmd) {
          timeCmd = setTimeout(delayCmd, cmdDelayTime);
    //    console.log("cmd error!");
      return;

    }
    var arr=cmd.split(",");
      if(!arr) {
          timeCmd = setTimeout(delayCmd, cmdDelayTime);
        console.log("arr error!");
        return;

    }
   if(!sock) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
        console.log("sock error!");
        return;
    }
    if (paustStatus === 0){

        if(isContains(arr[0],'halt')||
					isContains(arr[0],'kill')||
					isContains(arr[0],'fight')){
					paustStatus = 1;
				}
        if(isContains(arr[0],'eval'))
        {
            console.log(arr[0].replace('eval_',''));
            eval(arr[0].replace('eval_',''));

        }else{

            clickButton(arr[0]);
        }
    }
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


function sleep(d){
    for(var t = Date.now();Date.now() - t <= d;);
}

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

//createButton('回主页',GoHomeFunc);

createButton('导',MyNavigatorFunc);
createButton('令',CLPFunc);
createButton('卡',CMTKFunc);
createButton('爆',VIPBFunc);
createButton(' ', );
createButton('超',CJJSFunc);
createButton('舍',SLJSFunc);
createButton('加',JSKJSFunc);
createButton('通',TTJSFunc);
createButton('买',TTBUYFunc);
createButton('雪 ',xtslFunc);
createButton('扬',yzfxtFunc);
createButton('峨',emjdFunc);
createButton('少',sllxtFunc);
createButton('明',mjbshtFunc);
createButton('泰',tsstFunc);
createButton('星',xxbctzFunc);
createButton('铁',txczwFunc);
createButton('断',djmrxFunc);
createButton('温',bhxywqFunc);
createButton('冰',bhbhFunc);
createButton('雪',bhxsfdFunc);
createButton('绝',jqdyFunc);
createButton('黑',yyhyxFunc);
createButton('朝',yyzmgFunc);
//createButton('F',FULLFunc);





function createButton(btnName,func){
    btnList[btnName]=document.createElement('button');
    var myBtn = btnList[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.right = '-10px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);

    // 按钮加入窗体中
    document.body.appendChild(myBtn);
}

//加入屏幕提示
function InforOutFunc(text) {
    var node = document.createElement("span");
    node.className = "out2";
    node.style = "color:rgb(255, 127, 0)";
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("out2").appendChild(node);
}

//回主页-------------------------
function GoHomeFunc(){
    clickButton('home');     //回主页
}
function CLPFunc(){
    clickButton('items use obj_mitiling');     //回主页
}
function CMTKFunc(){
    clickButton('vip buy_task');
    clickButton('prev');//回主页
}
function VIPBFunc(){
    clickButton('vip finish_big_task');
    clickButton('prev');//回主页
}
//加速==============================================
function CJJSFunc(){
    clickButton('tupo_speedup3');
}
function SLJSFunc(){
    clickButton('tupo_speedup4_1');
}
function JSKJSFunc(){
    clickButton('tupo_speedup2');
}
function TTJSFunc(){
    clickButton('tupo_speedup3_1');
}
function TTBUYFunc(){
    clickButton('reclaim buy 19 10000');
}
//==========================================
//主体-------------------------
function xtslFunc(){
    go('jh 1,e,e,s,ne,ne');
}
function emjdFunc(){
    go('jh 8,w,nw,n,n,n,n,e,e,n,n,e,eval_halt_move();,n,eval_halt_move();,n,n,n,w,n,n,n,n,n,n,n,n,n,nw,nw,n,n');
}
function sllxtFunc(){
    go('jh 13;n;n;n;n;n;n;n;n;n;n');
}
function mjbshtFunc(){
   go('jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,e,e,se,se,e');
}
function tsstFunc(){
  go('jh 24,n,n,n,n,n,n,n,n,w,n,n');
}
function txczwFunc(){
    go('jh 31,n,n,n,w,w,w,w,n,n,n');
}
function bhxywqFunc(){
   go('jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,s,se,w');
}
function bhbhFunc(){
   go('jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,e');
}
function bhxsfdFunc(){
   go('jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,n,n,ne,n');
}
function jqdyFunc(){
    go('jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,ne,ne');
}
function djmrxFunc(){
    go('jh 34;ne;e;e;e;e;e;n;n;n;w;w;w;n;n;yell;');
    //alert("下船向北走一步");
    djmrx1Func();
}
function djmrx1Func(){
        var locationname=g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        if(locationname=="试剑碑"){
            go('n;n;n;w;w');
        }else{
            setTimeout(function(){djmrx1Func();},2000);
        }
    }
function yyhyxFunc(){
    go('jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,sw');
}
function yyzmgFunc(){
   go('jh 43,w,n,n,n,ne,nw,nw,ne');
}
function xxbctzFunc(){
    go('jh 28,n,w,w,w,w,w,w,nw,ne,nw,ne,nw,ne,nw,ne,nw,ne,nw,ne,e');
}
function yzfxtFunc(){
     go('jh 5,n,n,n,n,n,e,n,e,n,w,n,n');
}
//巡逻=================================================
function FULLFunc(){
     xtslFunc();
    setTimeout(function(){yzfxtFunc()},3000);
    setTimeout(function(){sllxtFunc();},8000);
    setTimeout(function(){mjbshtFunc();},8000);
    setTimeout(function(){tsstFunc();},8000);
    setTimeout(function(){xxbctzFunc();},8000);
    setTimeout(function(){txczwFunc();},8000);
    setTimeout(function(){bhxywqFunc();},8000);
    setTimeout(function(){bhbhFunc();},8000);
    setTimeout(function(){bhxsfdFunc();},8000);
    setTimeout(function(){jqdyFunc();},8000);
    setTimeout(function(){yyhyxFunc();},8000);
    setTimeout(function(){yyzmgFunc();},8000);
}

//=============================================================
function MyNavigatorFunc(){
    var ljsonpath ={};
    var llnpcList = [];
    var lspath,pathindex=0;
    var ll_mapname="";
    var ll_npcname="";
    var ll_tipinfo='';
  //  console.log('paht:' + hairsfalling[ll_mapname].[ll_npcname] );



  //  InforOutFunc(lspath);
   //  console.log('paht:' + hairsfalling[ll_mapname] );

   var ll_targetName=prompt("请输入导航的目标名称：\nNPC名称\n如：农夫","");
    if (!ll_targetName) {
        return;
    }
 //   ll_mapname=ll_targetName.split('+');
 //   ll_npcname=ll_mapname[1];


     InforOutFunc(ll_targetName);

 /*    ljsonpath=hairsfalling[ll_mapname[0]];
    if (ljsonpath === undefined ){
       alert("地图名称不正确");
        return;
    }
    lspath=ljsonpath[ll_npcname];
    if (!lspath ){
       alert("NPC名称不正确");
        return;
    }
    InforOutFunc(lspath);
   // go(lspath);
   */

    $.each(hairsfalling, function(i) {
   //     alert(hairsfalling[i]);	//Coding, 100
   //     alert(i);   	//Type, Height
      //   InforOutFunc(i + '--'+typeof(hairsfalling[i]));
        if('object'===typeof(hairsfalling[i])){

            $.each(hairsfalling[i], function(j) {
             //    InforOutFunc(j +'--'+ i+ '--'+(hairsfalling[i][j]));
                if(j===ll_targetName ) {


                    llnpcList[pathindex]=(pathindex +1)+':'+i + ':'+j+':'+(hairsfalling[i][j]);
                    ll_tipinfo=ll_tipinfo+(pathindex +1)+':'+i + ':'+j+':'+(hairsfalling[i][j])+'\n';

                    pathindex=pathindex +1;
                }

            });

        }

    });

    if (pathindex>1)
    {
        var ll_targetIndex=prompt("请输入导航的目标序号：\n"+ll_tipinfo,"1");
        if (!ll_targetIndex) {
            return;
        }
        ll_targetIndex=parseInt(ll_targetIndex) - 1;
        if( ll_targetIndex < 0 || ll_targetIndex > llnpcList.length ){
             alert("导航的目标序号不正确");
            return;

        }
        lspath=llnpcList[ll_targetIndex].split(':')[3];
        InforOutFunc(lspath);
        go(lspath);

    }else if (pathindex===1)
    {
        lspath=llnpcList[0].split(':')[3];
        InforOutFunc(lspath);
        go(lspath);
    }else{
        alert("导航的目标不在数据库中！");

    }


}




hairsfalling = {
     '雪山活动': {
    '雪婷': 'jh 1,e,e,s,ne,ne',
    '峨眉': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,eval_halt_move(),n,eval_halt_move(),n,n,n,w,n,n,n,n,n,n,n,n,n,ne,nw,nw,n,n',
    '少林': 'jh 13,n,n,n,n,n,n,n,n,n,n',
    '明教': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,e,e,se,se,e',
    '泰山': 'jh 24,n,n,n,n,n,n,n,n,w,n,n',
    '铁雪': 'jh 31,n,n,n,w,w,w,w,n,n,n',
    '冰雪': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,s,se,w',
    '冰冰': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,e',
    '冰山': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,n,n,ne,n',
   '绝情': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,ne,ne',
   '断剑': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,eval_halt_move(),n,n,n,n,w,w',
   '掩月黑': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,sw',
   '掩月朝': 'jh 43,w,n,n,n,ne,nw,nw,ne',
   '星宿': 'jh 28,n,w,w,w,w,w,w,nw,ne,nw,ne,nw,ne,nw,ne,nw,ne,nw,ne,e',
   '扬州': 'jh 5,n,n,n,n,n,e,n,e,n,w,n,n',
  },
  '雪婷': {
    '逄义': 'jh 1',
    '金庸大师': 'jh 1,w',
    '胡斐': 'jh 1,w,w,n',
    '红叶禅师': 'jh 1,w,w,s',
    '霍青桐': 'jh 1,w,w,w,s',
    '苗若兰': 'jh 1,w,w,w,n',
    '郭襄': 'jh 1,w,w,w,w,s',
    '凌霜华': 'jh 1,w,w,w,w,n',
    '丁丁当当': 'jh 1,w,w,w,w,w,s',
    '乔峰': 'jh 1,w,w,w,w,w,n',
    '赵敏': 'jh 1,w,w,w,w,w,w,s',
    '郭靖': 'jh 1,w,w,w,w,w,w,n',
    '袁承志': 'jh 1,w,w,w,w,w,w,w,s',
    '李文秀': 'jh 1,w,w,w,w,w,w,w,n',
    '任飞燕': 'jh 1,w,w,w,w,w,w,w,w,s',
    '双儿': 'jh 1,w,w,w,w,w,w,w,w,n',
    '阿青': 'jh 1,w,w,w,w,w,w,w,w,w',
    '店小二': 'jh 1',
    '星河大师': 'jh 1,inn_op1',
    '崔元基': 'jh 1,inn_op1',
    '苦力': 'jh 1,e',
    '黎老八': 'jh 1,e,s',
    '农夫': 'jh 1,e,s,w',
    '老农夫': 'jh 1,e,s,w',
    '疯狗': 'jh 1,e,s,w,w',
    '魏无极': 'jh 1,e,s,w,s',
    '野狗': 'jh 1,e,e,s,ne',
    '蒙面剑客': 'jh 1,e,e,s,ne,ne',
    '庙祝': 'jh 1,e,e',
    '刘安禄': 'jh 1,e,n,e',
    '武馆弟子': 'jh 1,e,n,e,e',
    '李火狮': 'jh 1,e,n,e,e',
    '柳淳风': 'jh 1,e,n,e,e,e',
    '柳绘心': 'jh 1,e,n,e,e,e,e,n',
    '安惜迩': 'jh 1,e,n,w',
    '醉汉': 'jh 1,e,n,n',
    '收破烂的': 'jh 1,e,n,n',
    '王铁匠': 'jh 1,e,n,n,w',
    '杨掌柜': 'jh 1,e,n,n,n,w',
    '樵夫': 'jh 1,e,n,n,n,w',
    '花不为': 'jh 1,e,n,n,n,n,e',
    '杜宽': 'jh 1,e,n,n,n,n,w',
    '杜宽宽': 'jh 1,e,n,n,n,n,w',
  },
  '洛阳': {
    '农夫': 'jh 2,n',
    '守城士兵': 'jh 2,n,n',
    '客商': 'jh 2,n,n,e',
    '蓑衣男子': 'jh 2,n,n,e,s,luoyang317_op1',
    '乞丐': 'jh 2,n,n,n',
    '金刀门弟子': 'jh 2,n,n,n,e',
    '王霸天': 'jh 2,n,n,n,e,s',
    '庙祝': 'jh 2,n,n,n,w',
    '老乞丐': 'jh 2,n,n,n,w,putuan',
    '地痞': 'jh 2,n,n,n,n',
    '小贩': 'jh 2,n,n,n,n,e',
    '郑屠夫': 'jh 2,n,n,n,n,e,s',
    '何九叔': 'jh 2,n,n,n,n,w',
    '无赖': 'jh 2,n,n,n,n,w,event_1_98995501,n',
    '甄大海': 'jh 2,n,n,n,n,w,event_1_98995501,n,n,e',
    '红娘': 'jh 2,n,n,n,n,w,s',
    '柳小花': 'jh 2,n,n,n,n,w,s,w',
    '富家公子': 'jh 2,n,n,n,n,n,e,n',
    '洪帮主': 'jh 2,n,n,n,n,n,e,n,op1',
    '游客': 'jh 2,n,n,n,n,n,e,e,n',
    '绿袍老者': 'jh 2,n,n,n,n,n,e,e,n,n,e,n',
    '护卫': 'jh 2,n,n,n,n,n,e,e,n,n,w',
    '山贼': 'jh 2,n,n,n,n,n,e,e,n,n,n',
    '白面书生': 'jh 2,n,n,n,n,n,e,e,n,n,n,w',
    '守墓人': 'jh 2,n,n,n,n,n,e,e,n,n,n,n',
    '凌云': 'jh 2,n,n,n,n,n,e,e,n,n,n,n,e',
    '凌中天': 'jh 2,n,n,n,n,n,e,e,n,n,n,n,e',
    '盗墓贼': 'jh 2,n,n,n,n,n,e,e,n,n,n,n,n',
    '黑衣文士': 'jh 2,n,n,n,n,n,e,e,n,n,n,n,n',
    '黑衣女子': 'jh 2,n,n,n,n,n,e,e,n,n,n,n,n,get_silver',
    '马倌': 'jh 2,n,n,n,n,n,w,n,n,w',
    '黑衣打手': 'jh 2,n,n,n,n,n,w,w',
    '小偷': 'jh 2,n,n,n,n,n,w,w,n',
    '张逍林': 'jh 2,n,n,n,n,n,w,w,n,w,get_silver',
    '玉娘': 'jh 2,n,n,n,n,n,w,w,n,n,n,e',
    '守园老人': 'jh 2,n,n,n,n,n,w,s',
    '赛牡丹': 'jh 2,n,n,n,n,n,w,s,luoyang111_op1',
    '鲁长老': 'jh 2,n,n,n,n,n,n,e',
    '陈扒皮': 'jh 2,n,n,n,n,n,n,w',
    '卖花姑娘': 'jh 2,n,n,n,n,n,n,n',
    '刘守财': 'jh 2,n,n,n,n,n,n,n,e',
    '守城武将': 'jh 2,n,n,n,n,n,n,n,n',
    '李元帅': 'jh 2,n,n,n,n,n,n,n,n,w,luoyang14_op1',
    '疯狗': 'jh 2,n,n,n,n,n,n,n,n,n',
    '青竹蛇': 'jh 2,n,n,n,n,n,n,n,n,n,e',
    '布衣老翁': 'jh 2,n,n,n,n,n,n,n,n,n,e,n',
    '萧问天': 'jh 2,n,n,n,n,n,n,n,n,n,e,n,n',
    '藏剑楼首领': 'jh 2,n,n,n,n,n,n,n,n,n,e,n,n,n',
  },
  '长安': {
    '胡商': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '城门卫兵': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '无影卫': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '紫衣追影': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w',
    '禁卫统领': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w',
    '城门禁卫': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w',
    '蓝色城门卫兵': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n,n,n',
    '血手天魔': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n,n,n,n,n',
    '看门人': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n,n,n,n,n,nw,w,sw,s',
    '钦官': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n,n,n,n,n,nw,w,sw,s,s',
    '先锋大将': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n,n,n,n,n,n,n',
    '霍骠姚': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '江湖大盗': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,e,e',
    '李贺': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '云梦璃': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,event_1_95312623',
    '游客': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '捕快统领': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e',
    '捕快': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e',
    '刀僧卫': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '镇魂使': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,s,s,s,s,s',
    '招魂师': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,s,s,s,s,w',
    '说书人': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,n,w',
    '客栈老板': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,n,w',
    '游四海': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,w',
    '糖人张': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,w',
    '高铁匠': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,e',
    '哥舒翰': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,e',
    '若羌巨商': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,e',
    '樊天纵': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,e',
    '杨玄素': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,w',
    '乌孙马贩': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n',
    '卫青': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,w',
    '方秀珣': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,w',
    '孙三娘': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,e',
    '大宛使者': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,n',
    '马夫': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,n',
    '白衣少侠': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n',
    '玄甲卫兵': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n,n',
    '房玄龄': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n,n,n,w',
    '杜如晦': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n,n,n,e',
    '秦王': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n,n,n,n,n,n,n',
    '程知节': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n,n,n,n,n,n,n,w',
    '尉迟敬德': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n,n,n,n,n,n,n,e',
    '翼国公': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,n,n,n,n,,n,n,n,n,n,n,n,n,e',
    '独孤须臾': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '金甲卫士': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '独孤皇后': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '仇老板': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,w',
    '顾先生': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,w',
    '苗一郎': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,e',
    '董老板': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n,e',
    '护国军卫': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n,w',
    '朱老板': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n,w',
    '王府小厮': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n',
    '王府总管': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n',
    '龟兹乐师': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n,n',
    '龟兹舞女': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n,n,w',
    '卓小妹': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n,n,w',
    '上官小婉': 'jh 2,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,n,n,n,e',
  },
  '华山村': {
    '泼皮': 'jh 3',
    '松鼠': 'jh 3,n',
    '野兔': 'jh 3,n,e',
    '小男孩': 'jh 3,w',
    '村中地痞': 'jh 3,w,event_1_59520311',
    '抠脚大汉': 'jh 3,w,event_1_59520311,n',
    '庙内黑狗': 'jh 3,w,event_1_59520311,n,n',
    '青衣守卫': 'jh 3,w,event_1_59520311,n,n,n',
    '米义为': 'jh 3,w,event_1_59520311,n,n,w,get_silver',
    '葛不光': 'jh 3,w,event_1_59520311,n,n,n,n,n',
    '王老二': 'jh 3,w,n',
    '泼皮头子': 'jh 3,s',
    '采花贼': 'jh 3,s,e',
    '冯铁匠': 'jh 3,s,e,n',
    '村民': 'jh 3,s,s',
    '方老板': 'jh 3,s,s,e',
    '跛脚汉子': 'jh 3,s,s,e,s',
    '云含笑': 'jh 3,s,s,e,s,huashancun24_op2',
    '朱老伯': 'jh 3,s,s,w',
    '方寡妇': 'jh 3,s,s,w,n',
    '剑大师': 'jh 3,s,s,w,n',
    '英白罗': 'jh 3,s,s,s',
    '庙外黑狗': 'jh 3,s,s,s',
    '刘三': 'jh 3,s,s,s,s',
    '血尸': 'jh 3,s,s,s,s,huashancun15_op1',
    '藏剑楼杀手': 'jh 3,s,s,s,s,huashancun15_op1,event_1_46902878',
    '受伤的曲右使': 'jh 3,s,s,s,s,w,get_silver',
    '曲姑娘': 'jh 3,s,s,s,s,w,n',
    '毒蛇': 'jh 3,s,s,s,s,s',
    '丐帮长老': 'jh 3,s,s,s,s,s,e',
    '小狼': 'jh 3,s,s,s,s,s,nw',
    '老狼': 'jh 3,s,s,s,s,s,nw,n',
    '土匪': 'jh 3,s,s,s,s,s,nw,n,n',
    '土匪头目': 'jh 3,s,s,s,s,s,nw,n,n,e',
    '丐帮弟子': 'jh 3,s,s,s,s,s,nw,n,n,e,give huashancun_huashancun_fb9',
    '玉牡丹': 'jh 3,s,s,s,s,s,nw,n,n,e,get_silver',
    '刘龟仙': 'jh 3,s,s,s,s,s,nw,n,n,n,n',
    '萧独眼': 'jh 3,s,s,s,s,s,nw,n,n,n,n,n',
    '刘寨主': 'jh 3,s,s,s,s,s,nw,n,n,n,n,n,n',
  },
  '华山': {
    '孙驼子': 'jh 4',
    '吕子弦': 'jh 4,n',
    '女弟子': 'jh 4,n,n',
    '游客': 'jh 4,n,n,n',
    '公平子': 'jh 4,n,n,n,e',
    '豪客': 'jh 4,n,n,w',
    '白二': 'jh 4,n,n,n,n,n,n',
    '山贼': 'jh 4,n,n,n,n,n,n',
    '猿猴': 'jh 4,n,n,n,n,n,n,n',
    '李铁嘴': 'jh 4,n,n,n,n,n,n,e',
    '赵辅德': 'jh 4,n,n,n,n,n,n,e,n',
    '岳师妹': 'jh 4,n,n,n,n,n,n,n,n,w,s',
    '大松鼠': 'jh 4,n,n,n,n,n,n,n,n',
    '六猴儿': 'jh 4,n,n,n,n,n,n,n,n,w,w',
    '令狐大师哥': 'jh 4,n,n,n,n,n,n,n,n,w,w,n',
    '英黑罗': 'jh 4,n,n,n,n,n,n,n,n,n',
    '魔教喽喽': 'jh 4,n,n,n,n,n,n,n,n,n,e',
    '史大哥': 'jh 4,n,n,n,n,n,n,n,n,n,e,n',
    '史老三': 'jh 4,n,n,n,n,n,n,n,n,n,e,n,n',
    '闵老二': 'jh 4,n,n,n,n,n,n,n,n,n,e,n,n,n',
    '戚老四': 'jh 4,n,n,n,n,n,n,n,n,n,e,n,n,n,n',
    '葛长老': 'jh 4,n,n,n,n,n,n,n,n,n,e,n,n,n,n,e',
    '剑宗弟子': 'jh 4,n,n,n,n,n,n,n,event_1_91604710',
    '从云弃': 'jh 4,n,n,n,n,n,n,n,event_1_91604710,s,s',
    '尘无剑': 'jh 4,n,n,n,n,n,n,n,event_1_91604710,s,s,s',
    '封剑羽': 'jh 4,n,n,n,n,n,n,n,event_1_91604710,s,s,s,s,e',
    '岳掌门': 'jh 4,n,n,n,n,n,n,n,n,n,n,n',
    '高算盘': 'jh 4,n,n,n,n,n,n,n,n,n,n',
    '施剑客': 'jh 4,n,n,n,n,n,n,n,n,n,n,w',
    '舒奇': 'jh 4,n,n,n,n,n,n,n,n,n,n,n,n',
    '小猴': 'jh 4,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '劳师兄': 'jh 4,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '宁女侠': 'jh 4,n,n,n,n,n,n,n,n,n,n,n,n,n,get_silver',
    '梁师兄': 'jh 4,n,n,n,n,n,n,n,n,n,n,n,n,e',
    '林师弟': 'jh 4,n,n,n,n,n,n,n,n,n,n,n,n,e,s',
    '小尼姑': 'jh 4,n,n,n,n,n,n,n,n,n,n,n,n,e,s,s',
    '华山弟子': 'jh 4,n,n,n,n,n,n,n,n,n,n,w,event_1_30014247',
    '蒙面剑客': 'jh 4,n,n,n,n,n,n,n,n,n,n,w,event_1_30014247,s,s,s,s',
    '黑衣人': 'jh 4,n,n,n,n,n,n,n,n,n,n,w,event_1_30014247,s,s,s,s,s,e',
  },
  '扬州': {
    '官兵': 'jh 5',
    '花店伙计': 'jh 5,n,w,w,n',
    '大黑马': 'jh 5,n,n',
    '铁匠': 'jh 5,n,n,w',
    '双儿': 'jh 5,n,n,e',
    '黑狗子': 'jh 5,n,n,n',
    '武馆护卫': 'jh 5,n,n,n,e',
    '武馆弟子': 'jh 5,n,n,n,e,n',
    '方不为': 'jh 5,n,n,n,e,n,n',
    '王教头': 'jh 5,n,n,n,e,n,w',
    '神秘客': 'jh 5,n,n,n,e,n,n,w,n,get_silver',
    '范先生': 'jh 5,n,n,n,e,n,n,n',
    '陈有德': 'jh 5,n,n,n,e,n,n,n,n',
    '古三通': 'jh 5,n,n,n,e,n,n,n,e',
    '黄掌柜': 'jh 5,n,n,n,w',
    '游客': 'jh 5,n,n,n,n',
    '账房先生': 'jh 5,n,n,n,n,w',
    '小飞贼': 'jh 5,n,n,n,n,w',
    '飞贼': 'jh 5,n,n,n,n,w,yangzhou16_op1',
    '艺人': 'jh 5,n,n,n,n,n',
    '空空儿': 'jh 5,n,n,n,n,n',
    '马夫人': 'jh 5,n,n,n,n,n,n',
    '润玉': 'jh 5,n,n,n,n,n,n',
    '流氓': 'jh 5,n,n,n,n,n,n',
    '刘步飞': 'jh 5,n,n,n,n,n,n,w',
    '马员外': 'jh 5,n,n,n,n,n,n,n',
    '毒蛇': 'jh 5,n,n,n,n,n,n,n,n',
    '扫地僧': 'jh 5,n,n,n,n,n,n,n,n,n,w,w,n',
    '柳碧荷': 'jh 5,n,n,n,n,n,n,n,n,n,w,w,n,w',
    '张三': 'jh 5,n,n,n,n,n,n,n,n,n,w,w,n,e',
    '火工僧': 'jh 5,n,n,n,n,n,n,n,n,n,w,w,n,n,n,e',
    '顽童': 'jh 5,n,n,n,n,n,n,n,n,w,w',
    '青衣门卫': 'jh 5,n,n,n,n,n,n,n,n,w,w,w',
    '玉娇红': 'jh 5,n,n,n,n,n,n,n,n,w,w,w,s',
    '赵明诚': 'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,w',
    '青楼小厮': 'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,e',
    '苏小婉': 'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,e,e,s,s,e,e,s,s,s,s',
    '书生': 'jh 5,n,n,n,n,n,n,n,n,w,w,n',
    '李丽君': 'jh 5,n,n,n,n,n,n,n,n,w,w,n,get_silver',
    '小混混': 'jh 5,n,n,n,n,n,n,n,n,n,e',
    '北城门士兵': 'jh 5,n,n,n,n,n,n,n,n,n,n',
    '恶丐': 'jh 5,n,n,n,n,n,n,n,n,w',
    '唐老板': 'jh 5,n,n,n,n,n,n,n,w',
    '云九天': 'jh 5,n,n,n,n,n,n,n,e',
    '柳文君': 'jh 5,n,n,n,n,n,n,n,e,get_silver',
    '茶社伙计': 'jh 5,n,n,n,n,n,n,n,e',
    '醉仙楼伙计': 'jh 5,n,n,n,n,n,n,e',
    '丰不为': 'jh 5,n,n,n,n,n,n,e,n',
    '张总管': 'jh 5,n,n,n,n,n,n,e,n,n',
    '计无施': 'jh 5,n,n,n,n,n,n,e,n,n,w',
    '胡神医': 'jh 5,n,n,n,n,n,n,e,n,n,e',
    '胖商人': 'jh 5,n,n,n,n,n,n,e,n,n,n',
    '冼老板': 'jh 5,n,n,n,n,n,n,e,n,n,n,n',
    '赤练仙子': 'jh 5,n,n,n,n,n,w',
    '白老板': 'jh 5,n,n,n,n,n,w,w,s,s',
    '衙役': 'jh 5,n,n,n,n,n,w,w,n',
    '公孙岚': 'jh 5,n,n,n,n,n,w,w,n,n,w',
    '程大人': 'jh 5,n,n,n,n,n,w,w,n,n,n',
    '楚雄霸': 'jh 5,n,n,n,n,n,w,w,n,n,n,get_silver',
    '朱先生': 'jh 5,n,n,n,n,n,e,n,n,n',
  },
  '丐帮': {
    '左全': 'jh 6',
    '裘万家': 'jh 6',
    '梁长老': 'jh 6,event_1_98623439',
    '何一河': 'jh 6,event_1_98623439,s',
    '密室': 'jh 6,event_1_98623439,s,w',
    '莫不收': 'jh 6,event_1_98623439,ne,ne',
    '藏剑楼统领': 'jh 6,event_1_98623439,ne,n',
    '藏剑楼探子': 'jh 6,event_1_98623439,ne,ne,ne,event_1_16841370',
    '何不净': 'jh 6,event_1_98623439,ne,n,ne,ne',
    '马俱为': 'jh 6,event_1_98623439,ne,n,ne,ne,ne',
    '余洪兴': 'jh 6,event_1_98623439,ne,n,ne,ne,ne,event_1_97428251',
  },
  '乔阴': {
    '守城官兵': 'jh 7',
    '卖饼大叔': 'jh 7,s',
    '陆得财': 'jh 7,s',
    '卖包子的': 'jh 7,s,s,s',
    '怪人': 'jh 7,s,s,s,s,event_1_65599392,w',
    '武官': 'jh 7,s,s,s,s,s,s,e',
    '汤掌柜': 'jh 7,s,s,s,s,s,s,e',
    '家丁': 'jh 7,s,s,s,s,s,s,e,n',
    '贵公子': 'jh 7,s,s,s,s,s,s,e,n',
    '酒楼守卫': 'jh 7,s,s,s,s,s,s,e,n,n',
    '书生': 'jh 7,s,s,s,s,s,s,s,s,e',
    '丫鬟': 'jh 7,s,s,s,s,s,s,s,s,e,n,e',
    '官家小姐': 'jh 7,s,s,s,s,s,s,s,s,e,n,e',
    '乾瘪老太婆': 'jh 7,s,s,s,s,s,s,s,sw,w',
    '妇人': 'jh 7,s,s,s,s,s,s,s,sw,w,n',
    '骆云舟': 'jh 7,s,s,s,s,s,s,s,s,e,n,e,s,e',
  },
  '峨眉': {
    '参谋官': 'daily go 13',
    '王坚': 'daily go 13',
    '军械官': 'daily go 13,w,n',
    '乞利': 'daily go 13,w,n',
    '胡族军士': 'daily go 13,w,n',
    '守城军士': 'daily go 13,w,n',
    '神箭手': 'daily go 13,w,s',
    '黑羽敌将': 'daily go 13,w,s',
    '黑羽刺客': 'daily go 13,w,s',
    '运输兵': 'daily go 13,w,w',
    '粮库主薄': 'daily go 13,w,w,n',
    '斥候': 'daily go 13,w,w,s',
    '阿保甲': 'daily go 13,w,w,s',
    '先锋军士': 'jh 8,ne,e,e',
    '先锋敌将': 'jh 8,ne,e,e',
    '传令兵': 'jh 8,ne,e,e,s',
    '耶律霸': 'jh 8,ne,e,e,e',
    '赤豹死士': 'jh 8,ne,e,e,n',
    '黑鹰死士': 'jh 8,ne,e,e,n,n,n',
    '金狼死士': 'jh 8,ne,e,e,n,n,n,n,n',
    '金狼大将': 'jh 8,ne,e,e,n,n,n,n,n',
    '白猿': 'jh 8,w,nw,n,n,n,n,w',
    '文虚师太': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e',
    '看山弟子': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e',
    '文寒师太': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n',
    '文玉师太': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n',
    '巡山弟子': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n',
    '青书少侠': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,n,n,n,n,e,e',
    '小女孩': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w',
    '小贩': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w',
    '静洪师太': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n',
    '静雨师太': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n',
    '女孩': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,w,w,w,w,n',
    '尼姑': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,w,w,w,w,n',
    '小尼姑': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,w,w,w,w,sw',
    '静玄师太': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,w,w,n,n,w',
    '贝锦瑟': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,e,e,n,n,e',
    '毒蛇': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,n,n,n,n,n,n,n,n',
    '护法弟子': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,n,n,n,n,n,n,ne',
    '护法大弟子': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,n,n,n,n,n,n,ne,ne',
    '静慈师太	': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,n,n,n,n,n,n,ne,ne,se,e',
    '灭绝掌门': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,n,n,n,n,n,n,ne,ne,n',
    '方碧翠': 'jh 8,w,nw,n,n,n,n,e,e,n,n,e,em1,n,em2,n,n,n,w,n,n,n,n,n,n,n,n,n,ne,ne,n',
  },
  '恒山': {
    '山盗': 'jh 9',
    '秦卷帘': 'jh 9,n',
    '九戒大师': 'jh 9,n,w',
    '郑婉儿': 'jh 9,n,n',
    '哑太婆': 'jh 9,n,n,e',
    '云问天': 'jh 9,n,n,n',
    '柳云烟': 'jh 9,n,n,n,w',
    '石高达': 'jh 9,n,n,n,n',
    '不可不戒': 'jh 9,n,n,n,n,henshan15_op1',
    '公孙浩': 'jh 9,n,n,n,e',
    '山蛇': 'jh 9,n,n,n,n,n',
    '嵩山弟子': 'jh 9,n,n,n,n,n,event_1_85624865',
    '赵志高': 'jh 9,n,n,n,n,n,event_1_85624865,n,w',
    '司马承': 'jh 9,n,n,n,n,n,event_1_85624865,n,e',
    '沙江龙': 'jh 9,n,n,n,n,n,event_1_85624865,n,n,n,fly',
    '史师兄': 'jh 9,n,n,n,n,n,event_1_85624865,n,n,n,n',
    '定云师太': 'jh 9,n,n,n,n,n,n,n',
    '小师太': 'jh 9,n,n,n,n,n,n,n,w,n',
    '仪容': 'jh 9,n,n,n,n,n,n,n,e,n',
    '仪雨': 'jh 9,n,n,n,n,n,n,n,e,e',
    '吸血蝙蝠': 'jh 9,n,n,n,n,n,n,n,n',
    '定安师太': 'jh 9,n,n,n,n,n,n,n,n,n',
    '神教杀手': 'jh 9,n,n,n,n,n,n,n,n,n,w',
    '魔教杀手': 'jh 9,n,n,n,n,n,n,n,n,n,w,n,e,henshan_qinqitai23_op1',
    '魔教头目': 'jh 9,n,n,n,n,n,n,n,n,n,w,n,n,n,n',
  },
  '武当': {
    '土匪': 'jh 10',
    '王五': 'jh 10,w',
    '剑童': 'jh 10,w,n,search',
    '野兔': 'jh 10,w,n,n,w',
    '进香客': 'jh 10,w,n,n,w,w',
    '青书少侠': 'jh 10,w,n,n,w,w',
    '知客道长': 'jh 10,w,n,n,w,w,w,n,n,n',
    '道童': 'jh 10,w,n,n,w,w,w,n,n,n,n',
    '清虚道长': 'jh 10,w,n,n,w,w,w,n,n,n,n,n',
    '宋首侠': 'jh 10,w,n,n,w,w,w,n,n,n,n,n',
    '俞莲舟': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,n,n',
    '张三丰': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,n,n,n,n,n',
    '张松溪': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,e',
    '小翠': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,e,e,s',
    '俞二侠': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,e,e,e,e',
    '蜜蜂': 'jh 10,w,n,n,w,w,w,n,n,n,n,e,e,e,e,s,e,s,e,n',
    '小蜜蜂': 'jh 10,w,n,n,w,w,w,n,n,n,n,e,e,e,e,s,e,s,e,n',
    '猴子': 'jh 10,w,n,n,w,w,w,n,n,n,n,e,e,e,e,s,e,s,e,s',
  },
  '晚月': {
    '蝴蝶': 'jh 11,e,e,s',
    '彩衣少女': 'jh 11,e,e,s,sw',
    '蓝止萍': 'jh 11,e,e,s,sw,se,w',
    '婢女': 'jh 11,e,e,s,sw,se,w',
    '蓝雨梅': 'jh 11,e,e,s,sw,se,w,n',
    '芳绫': 'jh 11,e,e,s,sw,se,w,w,n,w',
    '昭仪': 'jh 11,e,e,s,sw,se,w,w,w,w',
    '昭蓉': 'jh 11,e,e,s,sw,se,w,w,s,s,w',
    '瑷伦': 'jh 11,e,e,s,sw,se,w,w,s,s,s,e,s,s,e',
    '苗郁手': 'jh 11,e,e,s,sw,se,w,w,s,s,s',
    '圆春': 'jh 11,e,e,s,sw,se,w,w,s,s,s',
    '惜春': 'jh 11,e,e,s,sw,se,w,w,s,s,s,w,w',
    '安妮儿': 'jh 11,e,e,s,sw,se,w,w,s,s,s,w,s,s,w',
    '虞琼衣': 'jh 11,e,e,s,sw,se,w,w,s,s,s,e,s,s,w',
    '龙韶吟': 'jh 11,e,e,s,sw,se,w,w,s,s,s,e,s,s,w,s',
    '阮欣郁': 'jh 11,e,e,s,sw,se,w,w,s,s,s,e,s,s,w,s,e',
    '金仪彤': 'jh 11,e,e,s,sw,se,w,w,s,s,s,e,s,s,w,s,e',
    '凤凰': 'jh 11,e,e,s,sw,se,w,w,s,s,s,e,s,s,w,s,e,e',
  },
  '水烟': {
    '天邪虎': 'jh 12,n,n,n',
    '董老头': 'jh 12,n,n,n,e,n,n',
    '水烟阁武士': 'jh 12,n,n,n',
    '潘军禅': 'jh 12,n,n,n,n',
    '萧辟尘': 'jh 12,n,n,n,n',
    '水烟阁红衣武士': 'jh 12,n,n,n,w,n,nw',
    '水烟阁司事': 'jh 12,n,n,n,w,n,nw,e',
    '於兰天武': 'jh 12,n,n,n,w,n,nw,e,n',
  },
  '少林': {
    '山猪': 'jh 13',
    '虚通': 'jh 13',
    '虚明': 'jh 13,n',
    '僧人': 'jh 13,n',
    '田鼠': 'jh 13,n,w',
    '道品禅师': 'jh 13,n,w',
    '小孩': 'jh 13,n,w,w',
    '道觉禅师': 'jh 13,n,w,w',
    '扫地和尚': 'jh 13,n,n',
    '慧色尊者': 'jh 13,n,n',
    '慧如尊者': 'jh 13,n,n',
    '道成禅师': 'jh 13,n,n,w',
    '挑水僧': 'jh 13,n,n,w',
    '洒水僧': 'jh 13,n,n,e',
    '玄痛大师': 'jh 13,n,n,n',
    '小北': 'jh 13,n,n,n',
    '进香客': 'jh 13,n,n,n,n',
    '慧名尊者': 'jh 13,n,n,n,n',
    '慧空尊者': 'jh 13,n,n,n,n',
    '狱卒': 'jh 13,n,n,n,n,w',
    '道尘禅师': 'jh 13,n,n,n,n,w',
    '行者': 'jh 13,n,n,n,n,e',
    '扫地僧': 'jh 13,n,n,n,n,e',
    '道象禅师': 'jh 13,n,n,n,n,n',
    '小南': 'jh 13,n,n,n,n,n',
    '托钵僧': 'jh 13,n,n,n,n,n,n',
    '巡寺僧人': 'jh 13,n,n,n,n,n,n',
    '盈盈': 'jh 13,n,n,n,n,n,n,w',
    '打坐僧人': 'jh 13,n,n,n,n,n,n,e',
    '黑衣大汉': 'jh 13,n,n,n,n,n,n,n',
    '清缘比丘': 'jh 13,n,n,n,n,n,n,n',
    '清晓比丘': 'jh 13,n,n,n,n,n,n,n',
    '灰衣僧': 'jh 13,n,n,n,n,n,n,n,shaolin27_op1',
    '守经僧人': 'jh 13,n,n,n,n,n,n,n,shaolin27_op1,event_1_34680156',
    '小沙弥': 'jh 13,n,n,n,n,n,n,n,n',
    '清为比丘': 'jh 13,n,n,n,n,n,n,n,n',
    '清闻比丘': 'jh 13,n,n,n,n,n,n,n,n',
    '清无比丘': 'jh 13,n,n,n,n,n,n,n,n',
    '慧洁尊者': 'jh 13,n,n,n,n,n,n,n,n,w',
    '慧合尊者': 'jh 13,n,n,n,n,n,n,n,n,w',
    '玄苦大师': 'jh 13,n,n,n,n,n,n,n,n,w',
    '玄悲大师': 'jh 13,n,n,n,n,n,n,n,n,e',
    '清乐比丘': 'jh 13,n,n,n,n,n,n,n,n,n',
    '玄慈大师': 'jh 13,n,n,n,n,n,n,n,n,n',
    '清善比丘': 'jh 13,n,n,n,n,n,n,n,n,n',
    '叶十二娘': 'jh 13,n,n,n,n,n,n,n,n,n,shaolin25_op1',
    '立雪亭': 'jh 13,n,n,n,n,n,n,n,n,n,n',
    '清观比丘': 'jh 13,n,n,n,n,n,n,n,n,n,n',
    '清法比丘': 'jh 13,n,n,n,n,n,n,n,n,n,n',
    '白眉老僧': 'jh 13,n,n,n,n,n,n,n,n,n,n',
    '慧真尊者': 'jh 13,n,n,n,n,n,n,n,n,n,n,n',
    '慧虚尊者': 'jh 13,n,n,n,n,n,n,n,n,n,n,n',
    '青松': 'jh 13,n,n,n,n,n,n,n,n,n,n,n',
    '道一禅师': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,w',
    '道正禅师': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,w',
    '玄难大师': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,w',
    '冷幽兰': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,e',
    '慧轮': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,n',
    '慧修尊者': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,n',
    '砍柴僧': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '道相禅师': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '达摩老祖': 'jh 13,n,n,n,n,n,n,n,n,n,n,n,n,w,n,get_silver',
    '渡雨': 'jh 13,e,s,s,w,w,w',
    '渡云': 'jh 13,e,s,s,w,w,w',
    '渡风': 'jh 13,e,s,s,w,w,w',
  },
  '唐门': {
    '张之岳': 'jh 14,e,event_1_10831808,n',
    '唐门弟子': 'jh 14,w,n',
    '黄色唐门弟子': 'jh 14,w,n,n,n,e,e,n',
    '唐风': 'jh 14,w,n,n',
    '唐看': 'jh 14,w,n,n,n',
    '唐鹤': 'jh 14,w,n,n,n,w,s',
    '唐镖': 'jh 14,w,n,n,n,w,w,s',
    '唐芳': 'jh 14,w,n,n,n,w,w,w,n',
    '唐缘': 'jh 14,w,n,n,n,w,w,w,s',
    '方媃': 'jh 14,w,n,n,n,n',
    '唐怒': 'jh 14,w,n,n,n,n',
    '唐健': 'jh 14,w,n,n,n,e,e,n',
    '唐情': 'jh 14,w,n,n,n,e,e,n,n',
    '唐刚': 'jh 14,w,n,n,n,e,e,n,n',
    '默剑客': 'jh 14,sw,s,e,s,s,sw,sw,w,w,s,s,e,e,e',
    '欧阳敏': 'jh 14,w,n,n,n,e,e,n,n,ask tangmen_tangmei,ask tangmen_tangmei,e,event_1_8413183,event_1_39383240,e,s,e,n,w,n,n',
  },
  '青城': {
    '海公公': 'jh 15',
    '游方郎中': 'jh 15,n',
    '仵作': 'jh 15,s,ne',
    '青城派弟子': 'jh 15,n,nw,w,nw,w,s,s',
    '青城弟子': 'jh 15,n,nw,w,nw,w,s,s',
    '候老大': 'jh 15,n,nw,w,nw,w,s,s',
    '罗老四': 'jh 15,n,nw,w,nw,w,s,s,s',
    '吉人英': 'jh 15,n,nw,w,nw,w,s,s,s,w,w',
    '小室': 'jh 15,n,nw,w,nw,w,s,s,s,w,w,n',
    '贾老二': 'jh 15,n,nw,w,nw,w,s,s,s,w,w,n',
    '余大掌门': 'jh 15,n,nw,w,nw,w,s,s,s,w,w,w',
    '青袍老道': 'jh 15,n,nw,w,nw,w,s,s,s,w,w,w,n',
    '黄袍老道': 'jh 15,n,nw,w,nw,w,s,s,s,w,w,w,n',
    '于老三': 'jh 15,n,nw,w,nw,w,s,s,s,w,w,w,n,w',
    '仆人': 'jh 15,s,s',
    '恶少': 'jh 15,s,s',
    '屠夫': 'jh 15,s,s,e',
    '小甜': 'jh 15,s,s,s,e',
    '读千里': 'jh 15,s,s,s,s,e',
    '福州府尹': 'jh 15,s,s,s,s,s,e',
    '店小二': 'jh 15,s,s,w',
    '酒店老板': 'jh 15,s,s,w',
    '酒店女老板': 'jh 15,s,s,w,n',
    '女侍': 'jh 15,s,s,w,n',
    '阿美': 'jh 15,s,s,s,w,w,n',
    '镖局弟子': 'jh 15,s,s,s,w,w,s,s',
    '黄衣镖师': 'jh 15,s,s,s,w,w,s,s',
    '红衣镖师': 'jh 15,s,s,s,w,w,s,s',
    '黄衣镖师': 'jh 15,s,s,s,w,w,s,s',
    '林师弟': 'jh 15,s,s,s,w,w,w,w,w,n',
    '兵器贩子': 'jh 15,s,s,s,s,w',
    '木道神': 'jh 15,s,s,s,s,s,s,w',
    '背剑老人': 'jh 15,s,s,s,s,s,s,s,s,s,e,s',
  },
  '逍遥': {
    '天山姥姥': 'jh 16,s,s,s,s,e,n,e,event_1_5221690,s,w,event_1_57688376,n,n,e,n,event_1_88625473,event_1_82116250,event_1_90680562,event_1_38586637',
    '吴统领': 'jh 16,s,s,s,s,e,e,s,w',
    '逍遥祖师': 'jh 16,s,s,s,s,e,n,e,event_1_5221690,s,w,event_1_57688376,n,n',
    '常一恶': 'jh 16,s,s,s,s,e,n,e',
    '蒙面人': 'jh 16,s,s,s,s,e,e,s,w',
    '范棋痴': 'jh 16,s,s,s,s,e,e,s,w,n',
    '冯巧匠': 'jh 16,s,s,s,s,e,e,s,w,s,s',
    '苏先生': 'jh 16,s,s,s,s,e,e,s,w,w',
    '石师妹': 'jh 16,s,s,s,s,e,e,s,w,w,n',
    '薛神医': 'jh 16,s,s,s,s,e,e,s,w,w,n,n',
    '康琴癫': 'jh 16,s,s,s,s,e,e,s,w,w,s,s',
    '苟书痴': 'jh 16,s,s,s,s,e,e,s,w,w,w',
    '李唱戏': 'jh 16,s,s,s,s,e,e,s,w,w,w,w,s',
  },
  '开封': {
    '骆驼': 'jh 17',
    '毒蛇': 'jh 17,event_1_97081006',
    '野猪': 'jh 17,event_1_97081006,s',
    '黑鬃野猪': 'jh 17,event_1_97081006,s,s,s,s',
    '野猪王': 'jh 17,event_1_97081006,s,s,s,s,s',
    '白面人': 'jh 17,event_1_97081006,s,s,s,s,s,w,kaifeng_yezhulin05_op1',
    '鹤发老人': 'jh 17,event_1_97081006,s,s,s,s,s,w,w',
    '鹿杖老人': 'jh 17,event_1_97081006,s,s,s,s,s,w,w',
    '灯笼小贩': 'jh 17,n',
    '小男孩': 'jh 17,n',
    '赵大夫': 'jh 17,n,w',
    '欧阳春': 'jh 17,n,e',
    '展昭': 'jh 17,n,e',
    '包拯': 'jh 17,n,e,s',
    '皮货商': 'jh 17,n,n',
    '新郎官': 'jh 17,n,n,w',
    '混混张三': 'jh 17,n,n,w,n',
    '刘财主': 'jh 17,n,n,w,n,n',
    '铁翼': 'jh 17,n,n,w,n,n',
    '李四': 'jh 17,n,n,n',
    '陈举人': 'jh 17,n,n,n,e',
    '流浪汉': 'jh 17,n,n,n,n',
    '天波侍卫': 'jh 17,n,n,n,n,w',
    '杨排风': 'jh 17,n,n,n,n,w',
    '柴郡主': 'jh 17,n,n,n,n,w,w,w',
    '侍女': 'jh 17,n,n,n,n,w,w,w,s',
    '佘太君': 'jh 17,n,n,n,n,w,w,w,s,s,w',
    '穆桂英': 'jh 17,n,n,n,n,w,w,w,n,n',
    '杨文姬': 'jh 17,n,n,n,n,w,w,w,n,n,w',
    '杨延昭': 'jh 17,n,n,n,n,w,w,w,w',
    '富家弟子': 'jh 17,n,n,n,n,e',
    '赵虎': 'jh 17,n,n,n,n,n',
    '踏青妇人': 'jh 17,n,n,n,n,n,e',
    '平夫人': 'jh 17,n,n,n,n,n,e,n,n',
    '恶狗': 'jh 17,n,n,n,n,n,e,n,n,n',
    '平怪医': 'jh 17,n,n,n,n,n,e,n,n,n,event_1_27702191',
    '官兵': 'jh 17,e',
    '七煞堂弟子': 'jh 17,e,s',
    '七煞堂打手': 'jh 17,e,s,s',
    '七煞堂护卫': 'jh 17,e,s,s,s,s',
    '七煞堂堂主': 'jh 17,e,s,s,s,s,s',
    '武官': 'jh 17,n,n,e',
    '高衙内': 'jh 17,n,n,e,s',
    '护寺僧人': 'jh 17,n,n,e,s,s',
    '烧香老太': 'jh 17,n,n,e,s,s,s',
    '素斋师傅': 'jh 17,n,n,e,s,s,s,w',
    '泼皮': 'jh 17,n,n,e,s,s,s,e',
    '老僧人': 'jh 17,n,n,e,s,s,s,e,e',
    '烧火僧人': 'jh 17,n,n,e,s,s,s,e,s',
    '张龙': 'jh 17,n,n,e,s,s,s,s',
    '孔大官人': 'jh 17,n,n,e,s,s,s,s,w',
    '菜贩子': 'jh 17,n,n,e,e',
    '王老板': 'jh 17,n,n,e,e,s',
    '码头工人': 'jh 17,n,n,e,e,n',
    '船老大': 'jh 17,n,n,e,e,n,n',
    '落魄书生': 'jh 17,n,n,e,e,n,get_silver',
    '新娘': 'jh 17,sw,nw',
    '耶律夷烈': 'jh 17,sw,s,sw,nw,ne',
  },
  '明教1': {
    '村民': 'jh 18',
    '沧桑老人': 'jh 18,e',
    '村妇': 'jh 18,w',
    '老太婆': 'jh 18,w,n',
    '小男孩': 'jh 18,w,n',
    '神秘女子': 'jh 18,n,nw,n,n,w',
    '明教小圣使': 'jh 18,n,nw,n,n,n,n,n',
    '闻旗使': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n',
    '韦蝠王': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n',
    '彭散玉': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n',
    '明教小喽啰': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,w',
    '唐旗使': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,e,e',
    '周散仙': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,e,e,n',
    '庄旗使': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,e,e,n,n',
    '布袋大师': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,w,w,n',
    '颜旗使': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,w,w,n,n',
    '辛旗使': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,w,w',
    '冷步水': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n',
    '冷文臻': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n',
    '张散仙': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,e',
    '殷鹰王': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n',
    '明教教众': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n',
    '黛龙王': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,w',
    '九幽毒魔': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,w,nw,nw,event_1_70957287',
    '九幽童子': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,w,nw,nw,event_1_70957287',
    '青衣女孩': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,w,nw,nw,event_1_70957287',
    '谢狮王': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,e',
    '张教主': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,n',
    '范右使': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,n,n',
    '小昭': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,n,n,n',
  },
  '全真': {
    '终南山游客': 'jh 19,s,s,s,sw,s,e',
    '野马': 'jh 19,s',
    '男童': 'jh 19,s,s,s,sw,s,e,n,nw',
    '全真女弟子': 'jh 19,s,s,s,sw,s,e,n,nw,n',
    '迎客道长': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n',
    '程遥伽': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n',
    '练功弟子': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n',
    '尹志平': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n',
    '健马': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,w,w,w,s',
    '李四': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,w,w,w,s',
    '孙不二': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,e,e,e',
    '柴火道士': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,e,e,n,n',
    '马钰': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n',
    '丘处机': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n',
    '小道童': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,w',
    '王处一': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n',
    '青年弟子': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n',
    '鹿道清': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,e',
    '蓝色小道童': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,w,w,w,s',
    '郝大通': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,w,w,w,w,n,n,n',
    '王重阳': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,w,w,s',
    '老道长': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,e',
    '观想兽': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,w',
    '观想兽': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,w',
    '赵师兄': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,w,n',
    '老顽童': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,w,w,n',
    '谭处端': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,e',
    '刘处玄': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,e,e',
    '小麻雀': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,e,e,e,n',
    '老人': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '蜜蜂': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,n',
  },
  '古墓': {
    '天蛾': 'jh 20,w,w,s,e,s,s,s',
    '食虫虻': 'jh 20,w,w,s,e,s,s,s,s,s,sw',
    '白色玉蜂': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s',
    '玉蜂': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s',
    '红色玉蜂': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,e',
    '龙儿': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,s,s,e,e',
    '林祖师': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,s,s,e,e,event_1_3723773,se,n,e,s,e,s,e',
    '孙婆婆': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,s,s,s,s,s,e,e,e,e,s,e',
  },
  '白陀': {
    '玉门守将': 'jh 21,n,n,n,n,e',
    '傅介子': 'jh 21',
    '青衣盾卫': 'jh 21,n,n,n,n,w',
    '飞羽神箭': 'jh 21,n,n,n,n,w,w',
    '银狼近卫': 'jh 21,n,n,n,n,w,w,w',
    '军中主帅': 'jh 21,n,n,n,n,w,w,w,w',
    '匈奴杀手': 'jh 21,n,n,n,n,e,n,n,n',
    '玉门守军': 'jh 21,n,n,n,n,e,e',
    '玄甲骑兵': 'jh 21,n,n,n,n,e,e,e',
    '车夫': 'jh 21,n,n,n,n,e,e,e,e',
    '天策大将': 'jh 21,n,n,n,n,e,e,e,e,e',
    '玄甲参将': 'jh 21,n,n,n,n,e,e,e,e,e',
    '凤七': 'jh 21,n,n,n,n,e,e,e,e,e,s,s,w',
    '慕容孤烟': 'jh 21,n,n,n,n,e,e,e,e,e,e,e,s',
    '醉酒男子': 'jh 21,n,n,n,n,e,e,e,e,e,e,e,s',
    '马匪': 'jh 21,n,n,n,n,e,e,e,e,e,e,e,e,e',
    '花花公子': 'jh 21,nw',
    '寡妇': 'jh 21,nw,ne,ne',
    '小山贼': 'jh 21,nw,ne,n,n',
    '山贼': 'jh 21,nw,ne,n,n,ne,n',
    '侍杖': 'jh 21,nw,ne,n,n,ne,w',
    '雷横天': 'jh 21,nw,ne,n,n,ne,n,n',
    '金花': 'jh 21,nw,ne,n,n,ne,n,n,w',
    '铁匠': 'jh 21,nw,s',
    '农民': 'jh 21,nw,w',
    '舞蛇人': 'jh 21,nw,w',
    '店小二': 'jh 21,nw,w,n',
    '村姑': 'jh 21,nw,w,w',
    '小孩': 'jh 21,nw,w,w,nw',
    '农家妇女': 'jh 21,nw,w,w,nw,e',
    '樵夫': 'jh 21,nw,w,w,nw,nw,nw',
    '玄衣中年': 'jh 21,nw,w,w,nw,nw,nw,n,w,s',
    '闻人毅': 'jh 21,nw,w,w,nw,nw,nw,n,w,s',
    '门卫': 'jh 21,nw,w,w,nw,n,n',
    '仕卫': 'jh 21,nw,w,w,nw,n,n,n,w',
    '丫环': 'jh 21,nw,w,w,nw,n,n,n,n',
    '欧阳少主': 'jh 21,nw,w,w,nw,n,n,n,n',
    '李教头': 'jh 21,nw,w,w,nw,n,n,n,n,n',
    '小青': 'jh 21,nw,w,w,nw,n,n,n,n,n,w,s',
    '黑冠巨蟒': 'jh 21,nw,w,w,nw,n,n,n,n,n,w,w,w,n',
    '蟒蛇': 'jh 21,nw,w,w,nw,n,n,n,n,n,w,w,w,n,n,n',
    '教练': 'jh 21,nw,w,w,nw,n,n,n,n,n,e',
    '陪练童子': 'jh 21,nw,w,w,nw,n,n,n,n,n,e,ne',
    '管家': 'jh 21,nw,w,w,nw,n,n,n,n,n,n',
    '白衣少女': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n',
    '老毒物': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n',
    '肥肥': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,e',
    '老材': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,e,e',
    '张妈': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,nw',
    '白兔': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,ne',
    '狐狸': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,ne,w',
    '老虎': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,ne,w',
    '野狼': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,ne,w',
    '雄狮': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,ne,w',
    '竹叶青蛇': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,ne,e',
    '金环蛇': 'jh 21,nw,w,w,nw,n,n,n,n,n,n,n,n,ne,e',
  },
  '嵩山': {
    '脚夫': 'jh 22',
    '秋半仙': 'jh 22,n',
    '风骚少妇': 'jh 22,n',
    '锦袍老人': 'jh 22,n,n',
    '游客': 'jh 22,n,n,w',
    '野狼': 'jh 22,n,n,w,n',
    '山贼': 'jh 22,n,n,w,n,n,n',
    '林立德': 'jh 22,n,n,w,n,n',
    '修行道士': 'jh 22,n,n,w,n,n,n,n',
    '黄色毒蛇': 'jh 22,n,n,w,n,n,n,n,event_1_88705407',
    '麻衣刀客': 'jh 22,n,n,w,n,n,n,n,event_1_88705407,s,s',
    '白板煞星': 'jh 22,n,n,w,n,n,n,n,event_1_88705407,s,s,s,s',
    '小猴': 'jh 22,n,n,w,n,n,n,n,n',
    '万大平': 'jh 22,n,n,w,n,n,n,n,n,e',
    '芙儿': 'jh 22,n,n,w,n,n,n,n,n,e,e',
    '嵩山弟子': 'jh 22,n,n,w,n,n,n,n,n,e,n',
    '麻衣汉子': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,w,n',
    '史师兄': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n',
    '白头仙翁': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n',
    '左挺': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n',
    '钟九曲': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,e',
    '乐老狗': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,w',
    '伙夫': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,w,n,w',
    '冷峻青年': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,w,n,n',
    '沙秃翁': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,w,w',
    '陆太保': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,n',
    '邓神鞭': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,n,n',
    '聂红衣': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,n,n,e',
    '高锦毛': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,n,e',
    '左盟主': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,n,n,n',
    '吸血蝙蝠': 'jh 22,n,n,w,w,s',
    '瞎眼剑客': 'jh 22,n,n,w,w,s,s',
    '瞎眼刀客': 'jh 22,n,n,w,w,s,s,s,s,w',
    '瞎眼老者': 'jh 22,n,n,w,w,s,s,s,s,s',
    '柳易之': 'jh 22,n,n,n,n',
    '卢鸿一': 'jh 22,n,n,n,n,e',
    '英元鹤': 'jh 22,n,n,n,n,e,n',
  },
  '梅庄': {
    '柳府家丁': 'jh 23',
    '柳玥': 'jh 23,n,n',
    '老者': 'jh 23,n,n',
    '筱西风': 'jh 23,n,n,e',
    '梅庄护院': 'jh 23,n,n,n',
    '施令威': 'jh 23,n,n,n,n,n,n',
    '丁管家': 'jh 23,n,n,n,n,n,n,n',
    '向左使': 'jh 23,n,n,n,n,n,n,n,w,w',
    '地鼠': 'jh 23,n,n,n,n,n,n,n,w,w',
    '地牢看守': 'jh 23,n,n,n,n,n,n,n,w,w',
    '奎孜墨': 'jh 23,n,n,n,n,n,n,n,w,w',
    '任教主': 'jh 23,n,n,n,n,n,n,n,w,w',
    '黑老二': 'jh 23,n,n,n,n,n,n,n,e,s',
    '瘦小汉子': 'jh 23,n,n,n,n,n,n,n,n',
    '丹老四': 'jh 23,n,n,n,n,n,n,n,n,e,n',
    '柳蓉': 'jh 23,n,n,n,n,n,n,n,n,w',
    '丁二': 'jh 23,n,n,n,n,n,n,n,n,w,n',
    '聋哑老人': 'jh 23,n,n,n,n,n,n,n,n,w,w',
    '上官香云': 'jh 23,n,n,n,n,n,n,n,n,n,n',
    '秃笔客': 'jh 23,n,n,n,n,n,n,n,n,n,n,e',
    '琴童': 'jh 23,n,n,n,n,n,n,n,n,n,n,w',
    '黄老朽': 'jh 23,n,n,n,n,n,n,n,n,n,n,w,n',
    '黑衣刀客': 'jh 23,n,n,n,n,n,n,n,n,n,n,event_1_8188693,n',
    '青衣剑客': 'jh 23,n,n,n,n,n,n,n,n,n,n,event_1_8188693,n,n',
    '紫袍老者': 'jh 23,n,n,n,n,n,n,n,n,n,n,event_1_8188693,n,n,w',
    '红衣僧人': 'jh 23,n,n,n,n,n,n,n,n,n,n,event_1_8188693,n,n,n,n',
    '黄衫婆婆': 'jh 23,n,n,n,n,n,n,n,n,n,n,event_1_8188693,n,n,n,e,n',
  },
  '泰山': {
    '挑夫': 'jh 24',
    '镖师': 'jh 24,se',
    '黄衣刀客': 'jh 24,n',
    '瘦僧人': 'jh 24,n,n',
    '柳安庭': 'jh 24,n,n,n',
    '石云天': 'jh 24,n,n,n,n',
    '程不为': 'jh 24,n,n,n,n,w',
    '朱莹莹': 'jh 24,n,n,n,n,e',
    '温青青': 'jh 24,n,n,n,n,e,e',
    '易安居士': 'jh 24,n,n,n,n,e,e',
    '欧阳留云': 'jh 24,n,n,n,n,e,s',
    '吕进': 'jh 24,n,n,n,n,n',
    '司马玄': 'jh 24,n,n,n,n,n,n',
    '桑不羁': 'jh 24,n,n,n,n,n,n,e',
    '鲁刚': 'jh 24,n,n,n,n,n,n,w',
    '于霸天': 'jh 24,n,n,n,n,n,n,n',
    '神秘游客': 'jh 24,n,n,n,n,n,n,n,e',
    '海棠杀手': 'jh 24,n,n,n,n,n,n,n,n,w',
    '路独雪': 'jh 24,n,n,n,n,n,n,n,n,w,n,n',
    '铁云': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n',
    '孔翎': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,n,n',
    '姬梓烟': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w',
    '朱樱林': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n',
    '柳兰儿': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n',
    '布衣男子': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n,event_1_15941870',
    '阮小': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n,event_1_15941870,n',
    '史义': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n,event_1_15941870,n,e',
    '阮大': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n,event_1_15941870,n,w',
    '司马墉': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n,event_1_15941870,n,n,n,w',
    '林忠达': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n,event_1_15941870,n,n,n,n',
    '铁面人': 'jh 24,n,n,n,n,n,n,n,n,w,n,n,n,w,n,event_1_15941870,n,n,n,n,n',
    '李三': 'jh 24,n,n,n,n,n,n,n,n,n',
    '仇霸': 'jh 24,n,n,n,n,n,n,n,n,n,e',
    '平光杰': 'jh 24,n,n,n,n,n,n,n,n,n,n',
    '玉师弟': 'jh 24,n,n,n,n,n,n,n,n,n,n,w',
    '玉师兄': 'jh 24,n,n,n,n,n,n,n,n,n,n,n',
    '玉师伯': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n',
    '任娘子': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e',
    '黄老板': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,s',
    '红衣卫士': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e',
    '西门允儿': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e,n,n,w',
    '白飞羽': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e,n,e',
    '商鹤鸣': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e,n,n,e',
    '钟逍林': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e,n,n,n,n',
    '冯太监': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e,n,n,n,n',
    '西门宇': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e,n,n,n,n,n',
    '黑衣密探': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '毒蛇': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,w,n',
    '筱墨客': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,w,n,n,w',
    '铁恶人': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,w,n,n,n,n,e',
    '迟一城': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '泰山弟子': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '建除': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e',
    '天柏': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '天松': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '玉师叔': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '泰山掌门': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
  },
  '大旗': {
    '宾奴': 'jh 25,w',
    '小贩': 'jh 11,e,e,s,n,nw,w,nw,e',
    '酒肉和尚': 'jh 11,e,e,s,n,nw,w,nw,e,e,e,n,w',
    '陈子昂': 'jh 11,e,e,s,n,nw,w,nw,e,e,e,se',
    '渔夫': 'jh 25,e,e,e',
    '叶缘': 'jh 25,e,e,e,e,s',
    '老婆子': 'jh 25,e,e,e,e,s,yell',
    '潘兴鑫': 'jh 25,e,e,e,e,s,yell,s',
    '罗少羽': 'jh 25,e,e,e,e,s,yell,e',
    '青衣少女': 'jh 25,e,e,e,e,s,yell,e,ne',
    '日岛主': 'jh 25,e,e,e,e,s,yell,e,ne,se,e,e,e,e',
    '铁掌门': 'jh 25,e,e,e,e,s,yell,s,e,event_1_81629028',
    '夜皇': 'jh 25,e,e,e,e,s,yell,s,e,event_1_81629028,s,e,n,w,w',
    '红衣少女': 'jh 25,e,e,e,e,s,yell,s,e,event_1_81629028,s,e,n,w,w,s,w',
    '紫衣少女': 'jh 25,e,e,e,e,s,yell,s,e,event_1_81629028,s,e,n,w,w,s,w',
    '蓝衣少女': 'jh 25,e,e,e,e,s,yell,s,e,event_1_81629028,s,e,n,w,w,s,w',
    '橙衣少女': 'jh 25,e,e,e,e,s,yell,s,e,event_1_81629028,s,e,n,w,w,s,w',
  },
  '大昭': {
    '小绵羊': 'jh 26,w',
    '草原狼': 'jh 26,w',
    '大绵羊': 'jh 26,w,w',
    '牧羊女': 'jh 26,w,w,w',
    '李将军': 'jh 26,w,w,n',
    '神秘甲士': 'jh 26,w,w,n,w',
    '地宫暗哨': 'jh 26,w,w,n,w,w',
    '守山力士': 'jh 26,w,w,n,w,w,w',
    '镇魂将': 'jh 26,w,w,n,w,w,w,n,e',
    '镇魂鬼卫': 'jh 26,w,w,n,w,w,w,n,e',
    '镇魂墓将': 'jh 26,w,w,n,w,w,w,n,e',
    '头狼': 'jh 26,w,w,n,w,w,w,n,e',
    '突厥先锋大将': 'jh 26,w,w,n,n',
    '小羊羔': 'jh 26,w,w,w',
    '城卫': 'jh 26,w,w,w,w,w',
    '塔僧': 'jh 26,w,w,w,w,w,n',
    '紫衣妖僧': 'jh 26,w,w,w,w,w,n',
    '关外旅客': 'jh 26,w,w,w,w,w,w',
    '护寺喇嘛': 'jh 26,w,w,w,w,w,w',
    '余洪兴': 'jh 26,w,w,w,w,w,w,s',
    '店老板': 'jh 26,w,w,w,w,w,w,s,e',
    '陶老大': 'jh 26,w,w,w,w,w,w,s,w',
    '野狗': 'jh 26,w,w,w,w,w,w,s,s,w,w,w,w',
    '樵夫': 'jh 26,w,w,w,w,w,w,s,s,w,w,w,w',
    '收破烂的': 'jh 26,w,w,w,w,w,w,s,s,w,w,w,w',
    '乞丐': 'jh 26,w,w,w,w,w,w,s,s,w,w,w,w,n,n',
    '护寺藏尼': 'jh 26,w,w,w,w,w,w,n',
    '黄色护寺藏尼': 'jh 26,w,w,w,w,w,w,w,w,w,w',
    '卜一刀': 'jh 26,w,w,w,w,w,w,n,n,e',
    '疯狗': 'jh 26,w,w,w,w,w,w,n,n,w',
    '胭松': 'jh 26,w,w,w,w,w,w,w,w,n,e',
    '塔祝': 'jh 26,w,w,w,w,w,w,w,w,w',
    '灵空': 'jh 26,w,w,w,w,w,w,w,w,w,w',
    '葛伦': 'jh 26,w,w,w,w,w,w,w,w,w,w,ask lama_master,event_1_91837538',
  },
  '明教': {
    '店小二': 'jh 27,ne,w',
    '客店老板': 'jh 27,ne,w',
    '外面船夫': 'jh 27,ne,nw,w,nw,w,w',
    '里面船夫': 'jh 27,ne,nw,w,nw,w,w,yell',
    '黑熊': 'jh 27,se,e',
    '怪人': 'jh 27,se,e,e,e',
    '冉无望': 'jh 27,ne,n,ne',
    '魔教弟子': 'jh 27,ne,nw,w,nw,w,w,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n',
    '白色魔教弟子': 'jh 27,ne,nw,w,nw,w,w,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n',
    '青色魔教弟子': 'jh 27,ne,nw,w,nw,w,w,yell,w,nw,n,n,n,n,n',
    '蓝色魔教弟子': 'jh 27,ne,nw,w,nw,w,w,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n',
    '黄色魔教弟子': 'jh 27,ne,nw,w,nw,w,w,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n',
    '见钱开': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,e',
    '上官云': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,w,n',
    '葛停香': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,w,nw',
    '桑三娘': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,w,ne',
    '鲍长老': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,w,w',
    '贾布': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,w,sw',
    '罗烈': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,w,se',
    '王诚': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,ne',
    '紫色魔教犯人': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,e,n',
    '青色魔教犯人': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,e,e,e,n',
    '红色魔教犯人': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,e,e,e,e,n',
    '蓝色魔教犯人': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,e,e,e,e,e,n',
    '紫色魔教弟子': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n',
    '亮蓝色魔教弟子': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,n',
    '花想容': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,w',
    '曲右使': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,w,w',
    '张矮子': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,w,w,w',
    '张白发': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w',
    '赵长老': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w',
    '独孤风': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,e',
    '杨延庆': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,e,e',
    '范松': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,e,e,e',
    '巨灵': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e',
    '楚笑': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,e,e,e,e,e',
    '莲亭': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,n',
    '东方教主': 'jh 27,ne,nw,w,nw,w,w,kill heimuya_shaogong,yell,w,nw,n,n,n,n,n,n,n,w,n,n,n,n,n,n,n,n,n,n,yell,n,n,n,n,n,n,n,n,n,n,n,n,n,event_1_57107759,e,e,n,w',
  },
  '星宿': {
    '狮吼师兄': 'jh 28,n,n',
    '星宿派鼓手': 'jh 28,n,n',
    '星宿派号手': 'jh 28,n,n',
    '星宿派钹手': 'jh 28,n,n',
    '摘星大师兄': 'jh 28,n,n,n',
    '丁老怪': 'jh 28,n,n,n,n,n,n,n',
    '采花子': 'jh 28,n,n,n,n,n,n,nw,w',
    '牧羊人': 'jh 28,n',
    '紫姑娘': 'jh 28,n,w',
    '采药人': 'jh 28,n,w,w',
    '周女侠': 'jh 28,n,w,w,w,w',
    '雪豹': 'jh 28,n,w,w,w,w,w,w,nw,ne,nw,w',
    '牦牛': 'jh 28,n,w,w,w,w,w,w,nw,ne,nw,w',
    '射雕': 'jh 28,n,w,w,w,w,w,w,nw,ne,nw,ne,nw,ne,e',
    '玄衣刀妖': 'jh 28,n,w,w,w,se',
    '毒蛇': 'jh 28,n,w,w,w,w,n',
    '天狼师兄': 'jh 28,n,w,n',
    '出尘师弟': 'jh 28,n,w,n,n',
    '波斯商人': 'jh 28',
    '梅师姐': 'jh 28,sw',
    '天梵密使': 'jh 28,nw,w,buy /map/xingxiu/npc/obj/fire from xingxiu_maimaiti,e,se,sw,event_1_83637364',
    '铁尸': 'jh 28,sw,nw,sw,sw,nw,nw,se,sw',
    '伊犁': 'jh 28,nw',
    '矮胖妇女': 'jh 28,nw',
    '波斯老者': 'jh 28,nw,sw',
    '唐冠': 'jh 28,nw',
    '买卖提': 'jh 28,nw,w',
    '巴依': 'jh 28,nw,e',
    '小孩': 'jh 28,nw,e',
    '阿拉木罕': 'jh 28,nw,nw',
    '伊犁马': 'jh 28,nw,nw',
    '阿凡提': 'jh 28,nw,e,e',
  },
  '茅山': {
    '野猪': 'jh 29,n',
    '张天师': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n',
    '万年火龟': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n',
    '阳明居士': 'jh 29,n,n,n,n,event_1_60035830,e',
    '道士': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,e',
    '孙天灭': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n',
    '道灵': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n,event_1_98579273',
    '护山使者': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n,event_1_98579273,w',
    '林忌': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n,event_1_98579273,n',
  },
  '桃花': {
    '陆废人': 'jh 30',
    '神雕大侠': 'jh 30,n,n,ne',
    '老渔夫': 'jh 30,n,n,n,n,n,n',
    '后院桃花岛弟子': 'jh 30,n,n,n,n,n,n,n',
    '哑仆人': 'jh 30,n,n,n,n,n,n,n,w,w',
    '丁高阳': 'jh 30,n,n,n,n,n,n,n,n,n,n,e,s',
    '曲三': 'jh 30,n,n,n,n,n,n,n,n,n,n,e,e,n',
    '习武房桃花岛弟子': 'jh 30,n,n,n,n,n,n,n,n,n,n,w',
    '药房桃花岛弟子': 'jh 30,n,n,n,n,n,n,n,n,n,n,w,w,s',
    '哑仆': 'jh 30,n,n,n,n,n,n,n,n,n,n,w,w,s',
    '黄岛主': 'jh 30,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '蓉儿': 'jh 30,n,n,n,n,n,n,n,n,n,n,n,n,n,n,se,s',
    '傻姑': 'jh 30,yell,w,n',
    '戚总兵': 'jh 30,yell,w,n,e',
  },
  '铁血': {
    '樵夫': 'jh 31,n,n,n',
    '红色樵夫': 'jh 31,n,n,n,w',
    '老张': 'jh 31,n,n,n,w,w,w,w,n',
    '雪鸳': 'jh 31,n,n,n,w,w,w,w,n,n',
    '铁少': 'jh 31,n,n,n,w,w,w,w,n,n,n',
    '雪蕊儿': 'jh 31,n,n,n,w,w,w,w,n,n,n',
    '小翠': 'jh 31,n,n,n,w,w,w,w,n,n,n',
    '黑袍公': 'jh 31,n,n,n,w,w,w,w,n,n,n,n',
    '白袍公': 'jh 31,n,n,n,w,w,w,w,n,n,n,n',
    '陳小神': 'jh 31,n,se',
    '剑荡八荒': 'jh 31,n,se,e',
    '魏娇': 'jh 31,n,se,e,se',
    '神仙姐姐': 'jh 31,n,se,e,se,s',
    '小飞': 'jh 31,n,se,e,se,s,w',
    '寒夜·斩': 'jh 31,n,se,e,se,s,s',
    '他': 'jh 31,n,se,e,se,s,s,sw',
    '出品人◆风云': 'jh 31,n,se,e,se,s,s,sw,se',
    '二虎子': 'jh 31,n,se,e,se,s,s,sw,se,se',
    '老妖': 'jh 31,n,se,e,se,s,s,sw,se,se',
    '欢乐剑客': 'jh 31,n,se,e,se,s,s,sw,se,se,e',
    '黑市老鬼': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw',
    '纵横老野猪': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e',
    '无头苍蝇': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne',
    '神弑☆铁手': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n',
    '禅师': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne',
    '道一': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n',
    '采菊隐士': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n',
    '【人间】雨修': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n',
    '剑仙': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n,n,n,w,w,sw',
    '男主角◆番茄': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n,n,n,w,n',
    '冷泉心影': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n,n,n,e,n',
    '汉时叹': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n,n,n,e,e,',
    '阿不': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n,n,n,n,n,n,w,w',
    '铁血打坐': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n,n,n,n,n,n,w,w',
    '烽火戏诸侯': 'jh 31,n,se,e,se,s,s,sw,se,se,e,nw,e,ne,n,ne,n,n,n,n,n,n,n,n,n,e,e',
  },
  '慕容': {
    '家丁': 'jh 32,n,n',
    '邓家臣': 'jh 32,n,n,se',
    '朱姑娘': 'jh 32,n,n,se,e,s,s',
    '船工小厮': 'jh 32,n,n,se,e,s,s,event_1_99232080',
    '芳绫': 'jh 32,n,n,se,e,s,s,event_1_99232080,e,e,s,e,s,e,e,e',
    '千夜甲士': 'jh 32,n,n,se,e,s,s,event_1_99232080,e,e,s,e,s,e,e,e',
    '无影斥候': 'jh 32,n,n,se,e,s,s,event_1_99232080,e,e,s,e,s,e,e,e,n',
    '柳掌门': 'jh 32,n,n,se,e,s,s,event_1_99232080,e,e,s,e,s,e,e,e,s,s,event_1_92057893,e,s,event_1_8205862',
    '慕容老夫人': 'jh 32,n,n,se,n',
    '慕容侍女': 'jh 32,n,n,se,n',
    '公冶家臣': 'jh 32,n,n,se,n,n',
    '包家将': 'jh 32,n,n,se,n,n,n,n',
    '风波恶': 'jh 32,n,n,se,n,n,n,n,n',
    '慕容公子': 'jh 32,n,n,se,n,n,n,n,w,w,n',
    '慕容家主': 'jh 32,n,n,se,n,n,n,n,w,w,w,n,event_1_72278818,event_1_35141481,w',
    '小兰': 'jh 32,n,n,se,n,n,n,n,w,w,w,n,w',
    '神仙姐姐': 'jh 32,n,n,se,n,n,n,n,w,w,w,n,w,n,e,n,e,n,e',
    '严妈妈': 'jh 32,n,n,se,n,n,n,n,w,w,w,n,w,n,e,n,e,n,w',
    '王夫人': 'jh 32,n,n,se,n,n,n,n,w,w,w,n,w,n,e,n,e,n,n',
    '小茗': 'jh 32,n,n,se,n,n,n,n,w,w,w,n,w,n,e,n,e,n,n',
  },
  '大理': {
    '摆夷女子': 'jh 33,sw,sw',
    '士兵': 'jh 33,sw,sw,s,s',
    '武将': 'jh 33,sw,sw,s,s',
    '乌夷商贩': 'jh 33,sw,sw,s,s,s,nw,n',
    '台夷商贩': 'jh 33,sw,sw,s,s,s,nw,n',
    '土匪': 'jh 33,sw,sw,s,s,s,nw,n,ne,n,n,ne',
    '猎人': 'jh 33,sw,sw,s,s,s,nw,n,nw,n',
    '皮货商': 'jh 33,sw,sw,s,s,s,nw,n,nw,n',
    '牧羊女': 'jh 33,sw,sw,s,s,s,nw,n,nw,n,n,n,n,e,e',
    '牧羊人': 'jh 33,sw,sw,s,s,s,nw,n,nw,n,n,n,n,e,e',
    '破嗔': 'jh 33,sw,sw,s,s,s,s,w,w,n',
    '破疑': 'jh 33,sw,sw,s,s,s,s,w,w,n',
    '段恶人': 'jh 33,sw,sw,s,s,s,s,w,w,n,se',
    '吴道长': 'jh 33,sw,sw,s,s,s,s,w,w,w,w',
    '农夫': 'jh 33,sw,sw,s,s,s,s,w,w,w,w,w,n,e',
    '乌夷老祭祀': 'jh 33,sw,sw,s,s,s,s,w,w,w,w,w,n,w,se',
    '少女': 'jh 33,sw,sw,s,s,s,s,w,w,w,w,w,n,ne',
    '山羊': 'jh 33,sw,sw,s,s,s,s,w,w,w,w,w,n,n',
    '孟加拉虎': 'jh 33,sw,sw,s,s,s,s,w,w,w,w,w,s,s,w,w',
    '神农帮弟子': 'jh 33,sw,sw,s,s,s,s,w,w,s',
    '无量剑弟子': 'jh 33,sw,sw,s,s,s,s,w,w,s,nw',
    '朱护卫': 'jh 33,sw,sw,s,s,s,s,s,w',
    '锦衣卫士': 'jh 33,sw,sw,s,s,s,s,s,w',
    '太监': 'jh 33,sw,sw,s,s,s,s,s,w,n,n',
    '宫女': 'jh 33,sw,sw,s,s,s,s,s,w,n,n,n,n',
    '傅护卫': 'jh 33,sw,sw,s,s,s,s,s,e',
    '褚护卫': 'jh 33,sw,sw,s,s,s,s,s,e,n',
    '家丁': 'jh 33,sw,sw,s,s,s,s,s,e,n,se',
    '丹顶鹤': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,w,e,e',
    '养花女': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,w,e,e,e,e,e',
    '霍先生': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,w',
    '华司徒': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,n,w',
    '范司马': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,n,e',
    '巴司空': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,n,n',
    '段王妃': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e',
    '石人': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e,s',
    '段无畏': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e,n',
    '古护卫': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e,n,n',
    '王府御医': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e,n,n,n',
    '段皇爷': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e,n,n,n,ne,n',
    '婉清姑娘': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e,n,n,n,ne,e,e,n',
    '薛老板': 'jh 33,sw,sw,s,s,s,s,s,s,e,n',
    '石匠': 'jh 33,sw,sw,s,s,s,s,s,s,e,e',
    '摆夷小孩': 'jh 33,sw,sw,s,s,s,s,s,s,w',
    '江湖艺人': 'jh 33,sw,sw,s,s,s,s,s,s,s',
    '太和居店小二': 'jh 33,sw,sw,s,s,s,s,s,s,s,e',
    '歌女': 'jh 33,sw,sw,s,s,s,s,s,s,s,e,n',
    '南国姑娘': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,e,s',
    '摆夷老叟': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,e,s',
    '野兔': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,se',
    '盛皮罗客商': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s',
    '客店店小二': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,e',
    '古灯大师': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s',
    '渔夫': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,se,sw,n',
    '台夷猎人': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,se,sw,s',
    '台夷妇女': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,se,sw,w',
    '台夷姑娘': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,sw,sw',
    '水牛': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,sw,sw,n',
    '台夷农妇': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,sw,sw,s',
    '采笋人': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,sw,sw,w',
    '族长': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,e,n,n',
    '祭司': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,e,n,n,n',
    '侍者': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,w,w,se',
    '高侯爷': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,w,w,se,n',
    '素衣卫士': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,w,w,se,n',
    '陪从': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,w,w,se,n,n,w,se',
    '傣族首领': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,w,w,se,n,n,e,e,se',
    '大土司': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,n,w,n',
    '族头人': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,n,w,n,se,ne',
    '黄衣卫士': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,n,w,s',
    '毒蜂': 'jh 33,sw,sw,s,s,s,s,e,e,n',
    '「平通镖局」镖头': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s',
    '麻雀': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,s',
    '小道姑': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,s,w',
    '刀俏尼': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,s,w,n',
    '僧人': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,e,e',
    '枯大师': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,e,e,e,n',
    '恶奴': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,e,e,e,e,e',
    '贵公子': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,e,e,e,e,e',
    '游客': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e',
    '村妇': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e',
    '段公子': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne',
    '竹叶青蛇': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw',
    '台夷商贩2': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e',
    '老祭司': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,ne,e,n',
    '采桑女': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,s',
    '采笋人1': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s',
    '砍竹人': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s,s',
    '养蚕女': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s,s,e,e',
    '纺纱女': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s,s,e,n,e,n',
    '老祭祀': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,ne,e,n',
  },
  '断剑': {
    '黑袍老人': 'jh 34,ne,e,e,e,e,e,n,e,n',
    '白袍老人': 'jh 34,ne,e,e,e,e,e,n,e,n',
    '和尚': 'jh 34,ne,e,e,e,e,e,n,n,n,n,n,w',
    '尼姑': 'jh 34,ne,e,e,e,e,e,n,n,n,n,n,n,e',
    '摆渡老人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '天怒剑客': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,e,e',
    '任笑天': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,w,w',
    '摘星老人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,w,s,w',
    '落魄中年': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,w,s',
    '栽花老人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,n',
    '背刀人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,n,e,e',
    '雁南飞': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,n,e,n,e',
    '梦如雪': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,n,n,w,w',
    '剑痴': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,n,n,n,n',
    '雾中人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,n,n,n,n,n',
    '独孤不败': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell,n,n,n,n,n,n,e,e,event_1_10251226',
  },
  '冰火岛': {
    '火麒麟王': 'jh 35,nw,nw,nw,n,ne,nw',
    '火麒麟': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,n,nw',
    '麒麟幼崽': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,n,nw',
    '游方道士': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e',
    '梅花鹿': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e',
    '雪狼': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,s,se,w,nw',
    '白熊': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,s,se,w,nw,s,s,s,s,s,s',
    '殷夫人': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,s,se,w,nw,s,s,s,s,s,s,e',
    '张五侠': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,s,se,w,nw,s,s,s,s,s,s,w,w,n,e,n,w,w,s,s',
    '赵郡主': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,n,n',
    '谢狮王': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,n,n,ne,n',
    '黑衣杀手': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,n,n,w,n,w,nw',
    '元真和尚': 'jh 35,nw,nw,nw,n,ne,nw,w,nw,e,e,e,e,e,se,n,n,w,n,w,nw,sw,se,s,sw,sw,se,se',
  },
  '侠客岛': {
    '黄衣船夫': 'jh 36,yell',
    '侠客岛厮仆': 'jh 36,yell',
    '张三': 'jh 36,yell,e',
    '云游高僧': 'jh 36,yell,e,ne,ne',
    '王五': 'jh 36,yell,e,ne,ne,ne,e,s',
    '白衣弟子': 'jh 36,yell,e,ne,ne,ne,e,s',
    '店小二': 'jh 36,yell,e,ne,ne,ne,e,s,e',
    '侠客岛闲人': 'jh 36,yell,e,ne,ne,ne,e,s,w',
    '石公子': 'jh 36,yell,e,ne,ne,ne,e,n',
    '书生': 'jh 36,yell,e,ne,ne,ne,e,n',
    '丁当': 'jh 36,yell,e,ne,ne,ne,e,n,n',
    '白掌门': 'jh 36,yell,e,ne,ne,ne,e,n,w',
    '马六': 'jh 36,yell,e,ne,ne,ne,e,e',
    '侠客岛弟子': 'jh 36,yell,e,ne,ne,ne,e,e',
    '李四': 'jh 36,yell,e,ne,ne,ne,e,e,n',
    '蓝衣弟子': 'jh 36,yell,e,ne,ne,ne,e,e,n',
    '童子': 'jh 36,yell,e,ne,ne,ne,e,e,e',
    '龙岛主': 'jh 36,yell,e,ne,ne,ne,e,e,e',
    '木岛主': 'jh 36,yell,e,ne,ne,ne,e,e,e,fly,e',
    '侍者': 'jh 36,yell,e,ne,ne,ne,e,e,e,e',
    '史婆婆': 'jh 36,yell,e,ne,ne,ne,e,e,e,e,e',
    '矮老者': 'jh 36,yell,e,ne,ne,ne,e,e,e,e,e,e,n,n,n,e,ne,nw',
    '高老者': 'jh 36,yell,e,ne,ne,ne,e,e,e,e,e,e,n,n,n,e,ne,nw,w',
    '谢居士': 'jh 36,yell,e,ne,ne,ne,e,e,e,e,e,e,n,e,e,ne',
    '朱熹': 'jh 36,yell,e,ne,ne,ne,e,e,e,e,e,e,n,n,n,w,w',
    '小猴子': 'jh 36,yell,e,se,e',
    '樵夫': 'jh 36,yell,e,se,e,e',
    '医者': 'jh 36,yell,e,se,e,e,e,e',
    '石帮主': 'jh 36,yell,e,se,e,e,n,e,s',
    '野猪': 'jh 36,yell,e,se,e,e,w',
    '渔家男孩': 'jh 36,yell,e,se,e,e,s,s,s,w',
    '渔夫': 'jh 36,yell,e,se,e,e,s,s,s,s',
    '渔家少女': 'jh 36,yell,e,se,e,e,s,s,s,e',
    '阅书老者': 'jh 36,yell,e,se,e,e,s,s,s,e,ne',
    '青年海盗': 'jh 36,yell,e,se,e,e,s,s,s,e,ne,e,e,n',
    '老海盗': 'jh 36,yell,e,se,e,e,s,s,s,e,ne,e,e,n,e,n',
  },
  '绝情谷': {
    '土匪': 'jh 37,n',
    '村民': 'jh 37,n,e,e',
    '野兔': 'jh 37,n,e,e,nw,nw,w,n,nw,n,n',
    '绝情谷弟子': 'jh 37,n,e,e,nw,nw,w,n,nw,n,n,ne,n,nw',
    '天竺大师': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w',
    '养花女': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n',
    '侍女': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n',
    '谷主夫人': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,nw',
    '门卫': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,nw,n,nw',
    '绝情谷谷主': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,nw,n,nw,n,nw',
    '谷主分身': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,nw,n,nw,n,nw',
    '白衣女子': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,nw,ne,n,ne',
    '采花贼': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,nw,n,ne,e,ne,e,n',
    '拓跋嗣': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,ne',
    '没藏羽无': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,ne,e',
    '野利仁嵘': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,ne,e,ne',
    '嵬名元昊': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,nw,w,n,nw,n,ne,e,ne,se',
    '雪若云': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,ne,ne,event_1_16813927',
    '养鳄人': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,ne,ne,se',
    '鳄鱼': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,ne,ne,se',
    '囚犯': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,ne,ne,se,s,s,s',
    '地牢看守': 'jh 37,n,e,e,nw,nw,w,n,e,n,e,e,e,ne,ne,ne,se,s,s,s,w',
  },
  '碧海': {
    '法明大师': 'jh 38,n,n,w',
    '僧人': 'jh 38,n,n,w',
    '隐士': 'jh 38,n,n,n,n,w',
    '野兔': 'jh 38,n,n,n,n,w,w',
    '护卫': 'jh 38,n,n,n,n,n,n,n',
    '侍女': 'jh 38,n,n,n,n,n,n,n,w,w,nw',
    '尹秋水': 'jh 38,n,n,n,n,n,n,n,w,w,nw,w',
    '养花女': 'jh 38,n,n,n,n,n,n,n,w,w,nw,w,w,n,n',
    '家丁': 'jh 38,n,n,n,n,n,n,n,n',
    '耶律楚哥': 'jh 38,n,n,n,n,n,n,n,n,n',
    '护卫总管': 'jh 38,n,n,n,n,n,n,n,n,n',
    '易牙传人': 'jh 38,n,n,n,n,n,n,n,n,n,e,se,s',
    '砍柴人': 'jh 38,n,n,n,n,n,n,n,n,n,e,se,s,e',
    '独孤雄': 'jh 38,n,n,n,n,n,n,n,n,n,n,n,e,e,se,se,e,n',
    '王子轩': 'jh 38,n,n,n,n,n,n,n,n,n,n,n,e,e,se,se,e,n,n,n',
    '王昕': 'jh 38,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
  },
  '天山': {
    '周教头': 'jh 39,ne',
    '辛怪人': 'jh 39,ne,e,n,ne',
    '穆小哥': 'jh 39,ne,e,n,ne,ne,n',
    '牧民': 'jh 39,ne,e,n,nw',
    '塞外胡兵': 'jh 39,ne,e,n,nw,nw,w,s,s',
    '胡兵头领': 'jh 39,ne,e,n,nw,nw,w,s,s,sw,n,nw,e,sw,w',
    '乌刀客': 'jh 39,ne,e,n,nw,nw,w,s,s,sw,n,nw,e,sw,w,s,w',
    '波斯商人': 'jh 39,ne,e,n,ne,ne,se',
    '贺好汉': 'jh 39,ne,e,n,ne,ne,se,e',
    '铁好汉': 'jh 39,ne,e,n,ne,ne,se,e',
    '刁屠夫': 'jh 39,ne,e,n,ne,ne,se,e,n',
    '金老板': 'jh 39,ne,e,n,ne,ne,se,e,n',
    '韩马夫': 'jh 39,ne,e,n,ne,ne,se,e,e',
    '蒙面女郎': 'jh 39,ne,e,n,ne,ne,se,e,s,e,se',
    '宝箱': 'jh 39,ne,e,n,nw,nw,w,s,s,sw,n,nw,e,sw,w,s,w,n,w,event_1_69872740',
    '武壮士': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n',
    '程首领': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw',
    '菊剑': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,n',
    '石嫂': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,w',
    '兰剑': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n',
    '符针神': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n',
    '梅剑': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n,e',
    '竹剑': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n,w',
    '余婆': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n,n,e,nw',
    '九翼': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n,n,e,nw,w,ne',
    '天山死士': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n,n,e,nw,w,nw',
    '天山大剑师': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n,n,e,nw,w,nw',
    '护关弟子': 'jh 39,ne,e,n,ne,ne,n,ne,nw,event_1_58460791,ts1,nw,n,ne,nw,nw,w,n,n,n,e,e,s',
    '楚大师兄': 'jh 39,ne,e,n,ne,ne,n,ne,nw,ne,nw,event_1_17801939,ts2',
    '傅奇士': 'jh 39,ne,e,n,ne,ne,n,ne,nw,ne,nw,event_1_17801939,ts2,ne,ne,nw',
    '杨英雄': 'jh 39,ne,e,n,ne,ne,n,ne,nw,ne,nw,event_1_17801939,ts2,ne,ne,nw,nw',
    '胡大侠': 'jh 39,ne,e,n,ne,ne,n,ne,nw,ne,nw,event_1_17801939,ts2,ne,ne,nw,nw,nw,w',
  },
  '苗疆': {
    '温青': 'jh 40,s,s,s,s',
    '苗村长': 'jh 40,s,s,s,s,w,w,w',
    '苗家小娃': 'jh 40,s,s,s,s,w,w,w,n',
    '苗族少年': 'jh 40,s,s,s,s,w,w,w,w',
    '苗族少女': 'jh 40,s,s,s,s,w,w,w,w',
    '田嫂': 'jh 40,s,s,s,s,e,s,se',
    '金背蜈蚣': 'jh 40,s,s,s,s,e,s,se,sw,s,s',
    '人面蜘蛛': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,s,sw',
    '吸血蜘蛛': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,s,sw',
    '樵夫': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e',
    '蓝姑娘': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,sw',
    '莽牯朱蛤': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s',
    '阴山天蜈': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,s',
    '食尸蝎': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s',
    '蛇': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e',
    '五毒教徒': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw',
    '沙护法': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n',
    '五毒弟子': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n',
    '毒郎中': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,e',
    '白鬓老者': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,w',
    '何长老': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,w,sw',
    '毒女': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,n',
    '潘左护法': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,n,n',
    '大祭司': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,n,n,e',
    '岑秀士': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,n,n,nw',
    '齐长老': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,n,n,nw,ne,ne,se,se',
    '五毒护法': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,n,n,nw,ne,ne,nw,ne,e',
    '何教主': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw,se,sw,se,event_1_8004914,se,s,s,e,n,n,e,s,e,ne,s,sw,e,e,ne,ne,nw,ne,ne,n,n,n,n,nw,ne,ne,nw,ne,e',
  },
  '白帝城': {
    '白衣弟子': 'jh 41,se,e,e',
    '白衣少年': 'jh 41,se,e,e,se,se,se,se',
    '李峰': 'jh 41,se,e,e,se,se,se,se,s,s',
    '李白': 'jh 41,se,e,e,se,se,se,se,s,s,s',
    '“妖怪”': 'jh 41,se,e,e,se,se,se,se,s,s,s,e',
    '庙祝': 'jh 41,se,e,e,se,se,se,se,s,s,s,e,e,ne',
    '狱卒': 'jh 41,se,e,e,se,se,se,se,se,se,event_1_57976870,w,w,w',
    '白帝': 'jh 41,se,e,e,se,se,se,se,se,se,event_1_57976870,n,n,n',
    '木人': 'jh 41,se,e,e,se,se,se,se,se,se,event_1_57976870,n,n,n',
    '练武士兵1': 'jh 41,se,e,e,se,se,se,se,se,se,event_1_57976870,e,e',
    '镇长': 'jh 41,se,e,e,ne,ne,se,e,e,ne',
    '李巡': 'jh 41,se,e,e,ne,ne,se,e,e,s,w',
    '守门士兵': 'jh 41,se,e,e,nw,nw',
    '公孙将军': 'jh 41,se,e,e,nw,nw,n,n,e,ne,e',
    '练武士兵': 'jh 41,se,e,e,nw,nw,n,n,e,ne,e',
    '贴身侍卫': 'jh 41,se,e,e,nw,nw,n,n,e,ne,e',
    '粮官': 'jh 41,se,e,e,nw,nw,n,n,e,ne,n,nw,n',
    '白衣士兵': 'jh 41,se,e,e,nw,nw,n,n,w,w',
    '文将军': 'jh 41,se,e,e,nw,nw,n,n,w,w,n,n,e',
  },
  '墨家': {
    '索卢参': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n',
    '墨家弟子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n',
    '高孙子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n',
    '燕丹': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,n,n',
    '荆轲': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,n,n',
    '庖丁': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,n,n,n,n,n',
    '县子硕': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,w,w,n,e',
    '魏越': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,w,w,n,n,e',
    '公尚过': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,w,w,n,n,n,e',
    '高石子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,w',
    '大博士': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,w',
    '治徒娱': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,n,w',
    '黑衣人': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213',
    '徐夫子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,s,e,s,ne,s,sw,nw,s,se,s,sw,s,s',
    '屈将子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,s,e,s,ne,s,sw,nw,s,se,s,e,e',
    '偷剑贼': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,s,e,s,ne,s,sw,nw,s,se,s,e,e,e',
    '大匠师': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,w,w',
    '随巢子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,e',
    '高何': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,sw',
    '随师弟': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,sw,sw',
    '曹公子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,n,e',
    '鲁班': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,n,w',
    '耕柱子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,n,nw',
    '墨子': 'jh 42,nw,ne,n,e,nw,e,nw,w,ne,se,n,nw,e,n,w,n,n,n,n,e,e,n,n,event_1_39026213,n,ne,se,s,event_1_623818,e,n,e,s,e,n,nw,e,nw,n,ne',
  },
  '掩月': {
    '执定长老': 'jh 43',
    '佩剑少女': 'jh 43',
    '野狗': 'jh 43',
    '穿山甲': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne',
    '黑衣老者': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,se,se,n,n,sw,s',
    '六道禅师': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,se,se,n,n,sw,s,sw,sw,sw,sw',
    '火狐': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw',
    '黄鹂': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se',
    '夜攸裳': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se',
    '云卫': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n',
    '云将': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e',
    '女眷': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e',
    '莫邪传人': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,n',
    '老仆': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,n,n',
    '狄仁啸': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e',
    '青云仙子': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e',
    '秦东海': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e,e',
    '执剑长老': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e,e',
    '执典长老': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e,e,event_1_89957254,ne,ne,se,s,s,s',
    '野兔': 'jh 43,n,ne,ne,n,n,n,nw',
    '杂货脚夫': 'jh 43,n,ne,ne,n,n,n,nw,n',
    '老烟杆儿': 'jh 43,n,ne,ne,n,n,n,nw,n',
    '短衫剑客': 'jh 43,n,ne,ne,n,n,n,nw,n,ne',
    '巧儿': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne',
    '青牛': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n',
    '骑牛老汉': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n',
    '书童': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w',
    '赤尾雪狐': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,sw',
    '泥鳅': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,sw,sw',
    '灰衣血僧': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,sw,sw,sw,s,s',
    '白鹭': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,sw,sw,sw,s,s,s',
    '青衫女子': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw',
    '樊川居士': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw',
    '无影暗侍': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw,nw',
    '琴仙子': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw,nw,n,n,n,n,ne,ne,nw,ne,ne,n,n',
    '百晓居士': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw,nw,n,n,n,n,ne,ne,nw,ne,ne,n,n,ne,e',
    '清风童子': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw,nw,n,n,n,n,ne,ne,nw,ne,ne,n,n,ne,e,se,se',
    '刀仆': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw,nw,n,n,n,n,ne,ne,nw,ne,ne,n,n,ne,e,se,se,se,sw,sw',
    '天刀宗师': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw,nw,n,n,n,n,ne,ne,nw,ne,ne,n,n,ne,e,se,se,se,sw,sw',
    '虬髯长老': 'jh 43,n,ne,ne,n,n,n,nw,n,ne,ne,n,n,w,nw,nw,n,n,n,n,ne,ne,nw,ne,ne,n,n,ne,e,se,se,se,sw,sw,s,e,s,s,s,event_1_69228002',
    '仆人': 'jh 43,w',
    '醉酒男子': 'jh 43,w',
    '候君凛': 'jh 43,w,n',
    '紫衣仆从': 'jh 43,w,n',
    '轻纱女侍': 'jh 43,w,n,n',
    '抚琴女子': 'jh 43,w,n,n',
    '黑纱舞女': 'jh 43,w,n,n,w',
    '女官人': 'jh 43,w,n,n,w',
    '小厮': 'jh 43,w,n,n,n',
    '梅映雪': 'jh 43,w,n,n,n,ne',
    '舞眉儿': 'jh 43,w,n,n,n,ne,nw,nw,nw',
    '寄雪奴儿': 'jh 43,w,n,n,n,ne,nw,nw,ne',
    '琴楚儿': 'jh 43,w,n,n,n,ne,nw,nw,ne',
    '赤髯刀客': 'jh 43,w,w',
    '华衣女子': 'jh 43,w,w',
    '老乞丐': 'jh 43,w,w',
    '候君凛': 'jh 43,w,w,w',
    '马帮弟子': 'jh 43,w,w,w',
    '养马小厮': 'jh 43,w,w,w,n',
    '客栈掌柜': 'jh 43,w,w,w,n,n',
    '店小二': 'jh 43,w,w,w,n,n',
    '蝮蛇': 'jh 43,w,w,w,w',
    '东方秋': 'jh 43,w,w,w,w,nw,n,n',
    '函谷关官兵': 'jh 43,w,w,w,w,nw,n,n,nw',
    '长刀敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw',
    '黑虎敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w',
    '长鞭敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw',
    '巨锤敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s',
    '狼牙敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw',
    '金刚敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw,sw,sw',
    '蛮斧敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw,sw,sw,nw,n',
    '血枪敌将': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw,sw,sw,nw,n,n,n,nw',
    '夜魔': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw,sw,sw,nw,n,n,n,nw,nw',
    '千夜精锐': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw,sw,sw,nw,n,n,n,nw,nw,n',
    '胡人王子': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw,sw,sw,nw,n,n,n,nw,nw,n,n,ne',
    '夜魔侍从': 'jh 43,w,w,w,w,nw,n,n,nw,nw,nw,nw,w,sw,nw,sw,s,sw,sw,sw,nw,n,n,n,nw,nw,n,n,ne,ne,ne',
    '行脚贩子': 'jh 43,sw',
    '六婆婆': 'jh 43,sw,sw,sw,w',
    '农家少妇': 'jh 43,sw,sw,sw,w',
    '青壮小伙': 'jh 43,sw,sw,sw,w,w',
    '店老板': 'jh 43,sw,sw,sw,s,se,se,se',
    '白衣弟子': 'jh 43,sw,sw,sw,s,se,se,se,e',
    '黑衣骑士': 'jh 43,sw,sw,sw,s,se,se,se,e,n',
    '青衫铁匠': 'jh 43,sw,sw,sw,s,se,se,se,e,e',
    '青鬃野马': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw',
    '牧民': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw',
    '小马驹儿': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se',
    '绛衣剑客': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,se',
    '白衣公子': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,se,ne',
    '老仆': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,se,ne',
    '的卢幼驹': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne',
    '乌骓马': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne',
    '秦惊烈': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s',
    '千小驹': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s',
    '牧羊犬': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e',
    '追风马': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e',
    '诸侯秘使': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne',
    '赤菟马': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,ne',
    '风如斩': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,ne,ne',
    '白狐': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,ne,ne,nw',
    '小鹿': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,ne,ne,nw,nw',
    '破石寻花': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,ne,ne,nw,nw,w',
    '爪黄飞电': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se',
    '黑狗': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se,s',
    '照夜玉狮子': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se,s,s',
    '灰耳兔': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se,s,s,sw,sw',
    '闻香寻芳': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se,s,s,sw,sw,sw',
    '鲁总管': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se,s,s,se',
    '风花侍女': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se,s,s,se',
    '天玑童子': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e,e,e,ne,se,s,s,se,e',
  },
  '海云': {
    '马夫': 'jh 44',
    '野狗': 'jh 44,n',
    '老镇长': 'jh 44,n,n',
    '烟袋老头': 'jh 44,n,n,w',
    '青年女子': 'jh 44,n,n,w',
    '背枪客': 'jh 44,n,n,n',
    '小孩': 'jh 44,n,n,n,n',
    '游客': 'jh 44,n,n,n,n,e,ne',
    '野兔': 'jh 44,n,n,n,n,w,w',
    '青年剑客': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e',
    '石邪王': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,w,w,w,w,w,w,n,n,n,n,n,e,e,s,s',
    '啸林虎': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n',
    '暗哨': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '天杀': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w',
    '陆大刀': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e',
    '水剑侠': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne',
    '乘风客': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne',
    '血刀妖僧': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se',
    '花铁枪': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se,ne,ne',
    '水姑娘': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se,ne,ne,n,n,n,n,nw',
    '狄小侠': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se,ne,ne,n,n,n,n,nw',
    '地杀': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,s,s',
    '青纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n',
    '红纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n',
    '紫纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n',
    '白纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n',
    '海东狮': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n',
    '绝杀': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n',
    '海云长老': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n',
    '虬髯犯人': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,w,w,w,w,w,n,n,nw,w,w,nw',
  },
  '花街': {
    '花札敖': 'jh 46,e',
    '尊信门杀手': 'jh 46,e',
    '山赤岳': 'jh 46,e,e',
    '鹰飞': 'jh 46,e,e,e',
    '由蚩敌': 'jh 46,e,e,e,e',
    '强望生': 'jh 46,e,e,e,e,e',
    '莫意闲': 'jh 46,e,e,e,e,e,e',
    '甄素善': 'jh 46,e,e,e,e,e,e,e',
    '谈应手': 'jh 46,e,e,e,e,e,e,e,e',
    '戚长征': 'jh 46,e,e,e,e,e,e,e,e,e',
    '韩柏': 'jh 46,e,e,e,e,e,e,e,e,e,e',
    '烈震北': 'jh 46,e,e,e,e,e,e,e,e,e,e,e',
    '赤尊信': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e',
    '乾罗': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e,e',
    '厉若海': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e,e,e',
    '浪翻云': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e',
    '怒蛟高手': 'jh 46,e,e,e,e,e,e,e,e,e,e,e',
    '方夜羽': 'jh 46,e,e,e,e,e,e,e,e,n',
    '封寒': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e',
    '盈散花': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,n',
    '寒碧翠': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,e',
    '薄昭如': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,s',
  },
  '西凉': {
    '响尾蛇': 'jh 47,ne',
    '官差': 'jh 47,ne,n,n,n,nw',
    '官兵': 'jh 47,ne,n,n,n,nw',
    '驿卒': 'jh 47,ne,n,n,n,ne,ne,e',
    '苦力': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne',
    '屠凌心': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se',
    '金凌霜': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s',
    '醉汉': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s',
    '钱凌异': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s,s',
    '齐伯川': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s,s,s',
    '樵夫': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n',
    '疯狗': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne',
    '慧清': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,e,e,n,n,n,n,n',
    '止观大师': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,e,e,n,n,n,n,n',
    '止观分身': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,e,e,n,n,n,n,n',
    '野狗': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n',
    '捕快': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,w,w',
    '农民': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n',
    '马夫': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n',
    '管家': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,nw,nw,ne,n,ne',
    '李铁杉': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,nw,nw,ne,n,ne,n',
    '齐润翔': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,nw',
    '黑衣镖师': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,nw',
    '镖师': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,nw,nw',
  },
  '高昌': {
    '苏普': 'jh 48,e,ne',
    '阿曼': 'jh 48,e,ne',
    '糟老头子': 'jh 48,e,ne',
    '陈达海': 'jh 48,e,ne',
    '太行刀手': 'jh 48,e,ne',
    '哈卜拉姆': 'jh 48,e,ne,ne',
    '天铃鸟': 'jh 48,e,ne,ne,s',
    '牧民': 'jh 48,e,ne,ne,se',
    '霍元龙': 'jh 48,e,se',
    '恶狼': 'jh 48,e,se,e,ne,se',
    '响尾蛇': 'jh 48,e,se,e,ne,se,e',
    '骆驼': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,se,se,s',
    '老翁': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,se,se,s,s,s,sw,sw,s',
    '李文秀': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,se,se,s,s,s,sw,sw,s,sw,se',
    '苏鲁克': 'jh 48,e,se,e,ne,se,e,e,e,ne,ne,event_1_54621',
    '车尔库': 'jh 48,e,se,e,ne,se,e,e,e,ne,ne,event_1_54621,n',
    '瓦耳拉齐': 'jh 48,e,se,e,ne,se,e,e,e,ne,ne,event_1_54621,n,n,n',
    '分身': 'jh 48,e,se,e,ne,se,e,e,e,ne,ne,event_1_54621,n,n,n',
  },
  '京城': {
    '饥民': 'jh 49',
    '武将': 'jh 49,n,n,n,n',
    '捕快': 'jh 49,n,n,n,n',
    '侯府小姐': 'jh 49,n,n,n,n,n',
    '小丫鬟': 'jh 49,n,n,n,n,n',
    '学士': 'jh 49,n,n,n,n,n,w',
    '书生': 'jh 49,n,n,n,n,n,w,w',
    '打手': 'jh 49,n,n,n,n,n,w,w,n',
    '藏六福': 'jh 49,n,n,n,n,n,w,w,n',
    '看场打手': 'jh 49,n,n,n,n,n,w,w,n,event_1_23520182',
    '琼芳': 'jh 49,n,n,n,n,n,w,w,n,event_1_23520182',
    '荷官': 'jh 49,n,n,n,n,n,w,w,s',
    '胡媚儿': 'jh 49,n,n,n,n,n,w,w,s',
    '杂货贩子': 'jh 49,n,n,n,n,n,w,w,w',
    '苦力': 'jh 49,n,n,n,n,n,w,w,w,w',
    '掌柜': 'jh 49,n,n,n,n,n,w,w,w,w,s',
    '醉汉': 'jh 49,n,n,n,n,n,w,w,w,w,w',
    '游客': 'jh 49,n,n,n,n,n,w,w,w,w,w,w',
    '顾倩兮': 'jh 49,n,n,n,n,n,w,w,w,w,w,w,n',
    '莫凌山': 'jh 49,n,n,n,n,n,e',
    '昆仑弟子': 'jh 49,n,n,n,n,n,e',
    '安道京': 'jh 49,n,n,n,n,n,e,e',
    '东厂高手': 'jh 49,n,n,n,n,n,e,e',
    '伍崇卿': 'jh 49,n,n,n,n,n,e,e,s',
    '苏颖超': 'jh 49,n,n,n,n,n,e,e,s',
    '店伙计': 'jh 49,n,n,n,n,n,e,e,s',
    '郝震湘': 'jh 49,n,n,n,n,n,e,e,e',
    '锦衣卫': 'jh 49,n,n,n,n,n,e,e,e',
    '韦子壮': 'jh 49,n,n,n,n,n,e,e,e,e',
    '王府卫士': 'jh 49,n,n,n,n,n,e,e,e,e',
    '风流司郎中': 'jh 49,n,n,n,n,n,e,e,e,e,n',
    '九华山女弟子': 'jh 49,n,n,n,n,n,n',
    '娟儿': 'jh 49,n,n,n,n,n,n',
    '东厂侍卫': 'jh 49,n,n,n,n,n,n,n',
    '城门官兵': 'jh 49,n,n,n,n,n,n,n,n',
    '严松': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_54676242',
    '祝老太婆': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_9774218',
    '高天威': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_48836125',
    '宋公迈': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_57722966',
    '灵音禅师': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_8302301',
    '灵定禅师': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_81340060',
    '元易道长': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_92928219',
    '灵真禅师': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_15456839',
    '灵智禅师': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n,event_1_47182812',
    '王一通': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw',
    '贵妇': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw',
    '项天寿': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_15467958',
    '言二娘': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_9302105',
    '郝震湘': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_15467958',
    '陆孤瞻': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_18189689',
    '石刚': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_12962473',
    '韩毅': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_87347064',
    '青衣秀士': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_18392435',
    '方子敬': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_31866559',
    '秦仲海': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n,event_1_21438965',
    '银川公主': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,nw,nw,n',
    '小太监': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,ne,ne,n,n,nw',
    '刘敬': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,ne,ne,n,n,nw',
    '柳府铁卫': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '江充': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '柳昂天': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
  },
  '越王': {
    '樵夫': 'jh 50',
    '毒蛇': 'jh 50,ne',
    '欧余刀客': 'jh 50,ne,ne',
    '西施': 'jh 50,ne,ne,n,n',
    '山狼': 'jh 50,ne,ne,n,n',
    '山狼王': 'jh 50,ne,ne,n,n',
    '范蠡': 'jh 50,ne,ne,n,n,n,ne',
    '吴国暗探': 'jh 50,ne,ne,n,n,n,ne',
    '老奶奶': 'jh 50,ne,ne,n,n,n,ne,ne,ne',
    '青竹巨蟒': 'jh 50,ne,ne,n,n,n,ne,ne,ne,n',
    '猎人': 'jh 50,ne,ne,n,n,n,ne,ne,ne,n,n',
    '白猿': 'jh 50,ne,ne,n,n,n,ne,ne,ne,n,n,n',
    '锦衣剑士': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se',
    '青衣剑士': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se',
    '采药人': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se',
    '山羊': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s',
    '牧羊少女': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s',
    '采药少女': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s',
    '风胡子': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,sw,sw,sw',
    '三少爷': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_61129504',
    '丹枫老人': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_26427119',
    '黄杉女子': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_99138879',
    '西门吹雪': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_79085149',
    '郭嵩阳': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_76965640',
    '木道神': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_6220788',
    '宫九': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_81120263',
    '沈浪': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_27926026',
    '阿青': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,w,event_1_53092576',
    '越王': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n',
    '金衣剑士': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n',
    '文种': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n',
    '薛烛': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n',
    '铸剑师': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n',
    '南仁通': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_61129504',
    '六先生': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_26427119',
    '孔周': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_99138879',
    '独孤不败': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_79085149',
    '张鸦九': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_76965640',
    '陶弘景': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_6220788',
    '曾从子': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_81120263',
    '烛庸子': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_27926026',
    '欧冶子': 'jh 50,ne,ne,n,n,n,ne,ne,ne,se,se,se,s,s,s,s,se,se,e,n,n,n,n,n,n,n,n,n,n,n,ne,event_1_53092576',
  },
  '江陵': {
    '茶叶贩子': 'jh 51',
    '书生': 'jh 51,n',
    '乞丐': 'jh 51,n,n',
    '米店伙计': 'jh 51,n,n,w',
    '米三江': 'jh 51,n,n,w',
    '妇人': 'jh 51,n,n,w',
    '花小倩': 'jh 51,n,n,e',
    '巡城府兵': 'jh 51,n,n,n,n',
    '巡城参将': 'jh 51,n,n,n,n',
    '客栈小二': 'jh 51,n,n,n,n,w',
    '酒保': 'jh 51,n,n,n,n,w,w',
    '江小酒': 'jh 51,n,n,n,n,w,w,n',
    '江老板': 'jh 51,n,n,n,n,w,w,n,n',
    '雷动山': 'jh 51,n,n,n,n,n,n,w',
    '唐经天': 'jh 51,n,n,n,n,n,n,w,event_1_61129504',
    '慧明禅师': 'jh 51,n,n,n,n,n,n,w,event_1_26427119',
    '金世遗': 'jh 51,n,n,n,n,n,n,w,event_1_99138879',
    '李布衣': 'jh 51,n,n,n,n,n,n,w,event_1_79085149',
    '沈虎禅': 'jh 51,n,n,n,n,n,n,w,event_1_76965640',
    '米苍穹': 'jh 51,n,n,n,n,n,n,w,event_1_6220788',
    '关七': 'jh 51,n,n,n,n,n,n,w,event_1_81120263',
    '方歌吟': 'jh 51,n,n,n,n,n,n,w,event_1_27926026',
    '李沉舟': 'jh 51,n,n,n,n,n,n,w,event_1_53092576',
    '苦力': 'jh 51,n,n,n,n,e',
    '驿使': 'jh 51,n,n,n,n,e,e,e',
    '江陵府卫': 'jh 51,n,n,n,n,e,e,e,e',
    '参将': 'jh 51,n,n,n,n,e,e,e,e,s',
    '萧劲': 'jh 51,n,n,n,n,e,e,e,e,s',
    '醉汉': 'jh 51,n,n,n,n,e,e,e,e,e,e',
    '黑衣人': 'jh 51,n,n,n,n,e,e,e,e,e,e,s',
    '城门守卫': 'jh 51,n,n,n,n,e,e,e,e,e,e,s,s,s',
    '癞蛤蟆': 'jh 51,n,n,n,n,e,e,e,e,e,e,s,s,s,se,se',
    '霍无双': 'jh 51,n,n,n,n,e,e,e,e,e,e,s,s,s,se,se,e,e',
    '金莲': 'jh 51,n,n,n,n,e,e,e,e,e,e,e,e',
    '邋遢男子': 'jh 51,n,n,n,n,e,e,e,e,e,e,e,e,se',
    '酒坊伙计': 'jh 51,n,n,n,n,e,e,e,e,e,e,e,e,se,e,e',
    '九叔': 'jh 51,n,n,n,n,e,e,e,e,e,e,e,e,se,e,e',
    '趟子手': 'jh 51,n,n,n,n,e,e,e,e,n,n',
    '萧长河': 'jh 51,n,n,n,n,e,e,e,e,n,n,w',
    '分身': 'jh 51,n,n,n,n,e,e,e,e,n,n,w',
    '周长老': 'jh 51,n,n,n,n,e,e,e,e,n,n,w,w',
    '脱不花马': 'jh 51,n,n,n,n,e,e,e,e,n,n,w,w',
    '渔老': 'jh 51,n,n,n,n,e,e,e,e,n,n,e',
    '余小鱼': 'jh 51,n,n,n,n,e,e,e,e,n,n,e',
    '截道恶匪': 'jh 51,n,n,n,n,e,e,e,e,n,n,n,n,nw,n',
    '漕帮好手': 'jh 51,n,n,n,n,e,e,e,e,n,n,n,n,nw,n,n,n',
    '扬子鳄': 'jh 51,n,n,n,n,e,e,e,e,n,n,n,n,nw,n,n,n,e,e',
    '金冠巨蟒': 'rank go 222,nw,nw',
    '亡魂分身': 'rank go 222',
  },
};
