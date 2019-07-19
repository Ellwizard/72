	// ==UserScript==
	// @name         21脚本五一版
	// @namespace    http://tampermonkey.net/
	// @version      3.0.18-180718
	// @description  脚本有风险 使用需谨慎
	// @author       坏熊无双和毛毛，后期筑梦师幻影修改,江南改版
    // @match        http://sword-direct21.yytou.cn:8084/*
	// @match        http://*.yytou.cn/*
	// @match        http://sword-direct40.yytou.cn:8086/*
	// @match        http://sword-direct3.yytou.cn:8081/*
	// @match        http://sword-direct33.yytou.cn:8081/*
    // @match        http://sword-direct43.yytou.cn:8081/*
    // @match        http://sword-inter1-direct.yytou.cn:8882/*
    // @exclude      http://res.yytou.cn/*
	// @grant        none
	// ==/UserScript==
	/**
	 * Created by MoBeiHuYang on 2017/7/5.
	 *	Updated by Jeffrey on 20/10/2017 and shadow 7/7/2018 and nokill 18/7/2018
	 */
	var DragonBonusA = ["明月鞋","月光宝甲衣","明月戒","明月帽","明月项链","明月手镯","屠龙刀","倚天剑","冰魄银针","墨玄掌套","碧磷鞭","烈日棍","西毒蛇杖","星月大斧","碧玉锤","霸王枪"];
	var DragonBonusB = ["烈日宝靴","日光宝甲衣","烈日宝戒","烈日帽","烈日宝链","烈日宝镯","斩神刀","诛仙剑","暴雨梨花针","龙象拳套","七星鞭","残阳棍","伏虎杖","破冥斧","撼魂锤","赤焰枪"];
	var DragonBonusC = ["斩龙宝靴","龙皮至尊甲衣","斩龙宝戒","斩龙帽","斩龙宝链","斩龙宝镯","飞宇天怒刀","九天龙吟剑","小李飞刀","天罡掌套","乌金玄火鞭","开天宝棍","达摩杖","天雷断龙斧","烛幽鬼煞锤","斩龙鎏金枪"];
	var DragonBonusD = ["君影草","矢车菊","忘忧草","仙客来","雪英","朝开暮落花","夕雾草","凤凰木","熙颜花","晚香玉","凌霄花","彼岸花","洛神花","百宜雪梅","胤天宝帽碎片","胤天项链碎片","胤天宝戒碎片","鱼肠碎片","轩辕剑碎片","破岳拳套碎片","胤天宝镯碎片","胤天宝靴碎片","胤天紫金衣碎片","昊天龙旋铠碎片","水羽云裳碎片","奉天金带碎片","凤羽乾坤盾碎片","玄冰凝魄枪碎片","雷霆诛神刀碎片","天雨玄镖碎片","天神杖碎片","轰天巨棍碎片","神龙怒火鞭碎片","胤武伏魔斧碎片","九天灭世锤碎片"];
	var DragonBonus = [];
	var DragonBonus0 = [];
	var DragonBonus1 = [];
	var DragonBonus2 = [];
	var DragonBonus3 = [];
	var DragonBonus4 = [];
	var DragonBonus5 = [];
	var enforcePoints = 895;
	mySkillLists = "燎原百破;九溪断月枪;四海断潮斩;飞刀绝技;孔雀翎;雪饮狂刀;翻云刀法;九天龙吟剑法;覆雨剑法;织冰剑法;如来神掌;排云掌法;千影百伤棍;破军棍诀;玄天杖法;辉月杖法;昊云破周斧;四海断潮斩;玄胤天雷;天火飞锤;十怒绞龙索;拈花解语鞭;冰月破魔枪;不凡三剑;燎原百击;正道十七;月夜鬼萧;打狗棒法;游龙剑;子母龙凤环;幻阴指锤;九字真言印;";
	spearSkillLists = "燎原百破;九溪断月枪;四海断潮斩;昊云破周斧;天火飞锤;玄胤天雷;不凡三剑;燎原百击;正道十七;月夜鬼萧;神龙东来;幻阴指锤;独孤斧诀;青冥血斧;冰月破魔枪;玉石俱焚;六道轮回;";
	otherSkillLists = "飞刀绝技;孔雀翎;雪饮狂刀;翻云刀法;九天龙吟剑法;覆雨剑法;织冰剑法;如来神掌;排云掌法;";
	buttonHeight = '20px';
	var knownlist=[];
	var ButtonId = "";
   	var autoreconnectTrigger=0;
	var healflg = 0;
	var AutoRecoverFlg = 0;
	var BB3flg = 0;
	var Learderflg = 0;
    var xuanhong_flag ;

var isDelayCmd = 1, // 是否延迟命令
    cmdCache = [],      // 命令池
    timeCmd = null,     // 定时器句柄
    paustStatus = 0,   //是否暂停执行
    cmdDelayTime = 200; // 命令延迟时间


// 执行命令串
function godirect(str) {
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

function xuanHongFunc(){



}



function sleep(d){
    for(var t = Date.now();Date.now() - t <= d;);
}
	function InforOutFunc(text) {
		var node = document.createElement("span");
		node.className = "out2";
		node.style = "color:rgb(255, 127, 0)";
		var textnode = document.createTextNode(text);
		node.appendChild(textnode);
		document.getElementById("out2").appendChild(node);
	}

function MyNavigatorFunc(){
    var ljsonpath ={};
    var llnpcList = [];
    var lspath,pathindex=0;
    var ll_mapname="";
    var ll_npcname="";
    var ll_tipinfo='';


	var ll_targetName = sessionStorage.getItem("ll_targetName");
	if (ll_targetName == "")
	{
		ll_targetName = prompt("请输入导航的目标名称：\nNPC名称\n如：农夫",ll_targetName);
	}
	sessionStorage.setItem("ll_targetName","");

	var ll_targetAddress = sessionStorage.getItem("ll_targetAddress");

    if (!ll_targetName) {
        return;
    }

     InforOutFunc(ll_targetName);

    $.each(hairsfalling, function(i) {
        if('object'===typeof(hairsfalling[i])){
            $.each(hairsfalling[i], function(j) {
                if(j===ll_targetName ) {
                    llnpcList[pathindex]=(pathindex +1)+':'+i + ':'+j+':'+(hairsfalling[i][j]);
                    ll_tipinfo=ll_tipinfo+(pathindex +1)+':'+i + ':'+j+':'+(hairsfalling[i][j])+'\n';
					if (i===ll_targetAddress)
					{
						sessionStorage.setItem("ll_targetAddress_Index",pathindex+1);
					}
                    pathindex=pathindex +1;
                }
            });
        }
    });

    if (pathindex>1)
    {
		var ll_targetIndex = sessionStorage.getItem("ll_targetAddress_Index");
		if (ll_targetIndex == "")
			{
				ll_targetIndex=prompt("请输入导航的目标序号：\n"+ll_tipinfo,ll_targetIndex);
			}
		sessionStorage.setItem("ll_targetAddress_Index","");
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
        godirect(lspath);

    }else if (pathindex===1)
    {
        lspath=llnpcList[0].split(':')[3];
        InforOutFunc(lspath);
        godirect(lspath);

    }else{
        alert("导航的目标不在数据库中！");
    }
}

var hairsfalling = {
  '雪亭镇': {
    '逄义': 'jh 1',
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
    '华山游客': 'jh 4,n,n,n',
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
    '卢大哥': 'jh 4,n,n,n,n,n,n,n,n,n,e,n',
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
    '扬州游客': 'jh 5,n,n,n,n',
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
    '顽童':     'jh 5,n,n,n,n,n,n,n,n,w,w',
    '青衣门卫': 'jh 5,n,n,n,n,n,n,n,n,w,w,w',
    '玉娇红':   'jh 5,n,n,n,n,n,n,n,n,w,w,w,s',
    '赵明诚':   'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,w',
    '青楼小厮': 'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,e',
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
    '青衣门卫': 'jh 5,n,n,n,n,n,n,n,n,w,w,w',
    '玉娇红':   'jh 5,n,n,n,n,n,n,n,n,w,w,w,s',
    '赵明诚':   'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,w',
    '青楼小厮': 'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,e',
    '苏小婉':   'jh 5,n,n,n,n,n,n,n,n,w,w,w,s,e,e,s,s,e,e,s,s,s',
  },

  '丐帮': {
    '左全': 'jh 6',
    '裘万家': 'jh 6',
    '梁长老': 'jh 6,event_1_98623439',
    '何一河': 'jh 6,event_1_98623439,s',
    '密室': 'jh 6,fly,s,w',
    '莫不收': 'jh 6,event_1_98623439,ne,ne',
    '藏剑楼统领': 'jh 6,event_1_98623439,ne,n',
    '藏剑楼探子': 'jh 6,event_1_98623439,ne,ne,ne,event_1_16841370',
    '何不净': 'jh 6,event_1_98623439,ne,n,ne,ne',
    '马俱为': 'jh 6,event_1_98623439,ne,n,ne,ne,ne',
    '余洪兴': 'jh 6,event_1_98623439,ne,n,ne,ne,ne,event_1_97428251',
  },

  '乔阴县': {
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

  '峨眉山': {
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
    '先锋军士': 'jh 8,ne,e,e,e',
    '先锋敌将': 'jh 8,ne,e,e,e',
    '传令兵': 'jh 8,ne,e,e,e,s',
    '耶律霸': 'jh 8,ne,e,e,e,e',
    '赤豹死士': 'jh 8,ne,e,e,e,n',
    '守城军士': 'jh 8,ne,e,e,e,n,n',
    '黑鹰死士': 'jh 8,ne,e,e,e,n,n,n',
    '金狼死士': 'jh 8,ne,e,e,e,n,n,n,n,n',
    '金狼大将': 'jh 8,ne,e,e,e,n,n,n,n,n',
    '运输兵': 'jh 8,ne,e,e,e,n,n,n,n,n,e',
    '粮库主薄': 'jh 8,ne,e,e,e,n,n,n,n,n,e,n',
    '斥候': 'jh 8,ne,e,e,e,n,n,n,n,n,e,s',
    '参谋官': 'jh 8,ne,e,e,e,n,n,n,n,n,e,e,e',
    '王坚': 'jh 8,ne,e,e,e,n,n,n,n,n,e,e,e',
    '军械官': 'jh 8,ne,e,e,e,n,n,n,n,n,e,e,n',
    '神箭手': 'jh 8,ne,e,e,e,n,n,n,n,n,e,e,s',
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
    '公孙浩': 'jh 9,n,n,n,n,e',
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

  '武当山': {
    '土匪': 'jh 10',
    '王五': 'jh 10,w',
    '野兔': 'jh 10,w,n,n,w',
    '进香客': 'jh 10,w,n,n,w,w',
    '青书少侠': 'jh 10,w,n,n,w,w',
    '知客道长': 'jh 10,w,n,n,w,w,w,n,n,n',
    '道童': 'jh 10,w,n,n,w,w,w,n,n,n,n',
    '清虚道长': 'jh 10,w,n,n,w,w,w,n,n,n,n,n',
    '练功弟子': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,w',
    '宋首侠': 'jh 10,w,n,n,w,w,w,n,n,n,n,n',
    '俞莲舟': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,n,n',
    '张三丰': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,n,n,n,n,n',
    '张松溪': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,e',
    '小翠': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,e,e,s',
    '俞二侠': 'jh 10,w,n,n,w,w,w,n,n,n,n,n,e,e,e,e',
    '蜜蜂': 'jh 10,w,n,n,w,w,w,n,n,n,n,e,e,e,e,s,e,s,e,n',
    '小蜜蜂': 'jh 10,w,n,n,w,w,w,n,n,n,n,e,e,e,e,s,e,s,e,n',
    '猴子': 'jh 10,w,n,n,w,w,w,n,n,n,n,e,e,e,e,s,e,s,e,s',
    '剑童': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,n,n',
    '剑遇安': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,n,n,n',
    '布衣弟子': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,',
    '剑遇南': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,nw,nw',
    '剑遇穆': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,nw,nw,n',
    '剑遇治': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,ne,n,n',
    '剑遇山': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,ne,n,n,e',
    '剑遇行': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,ne,s,e',
    '剑遇鸣': 'jh 10,w,n,event_1_74091319,ne,n,sw,nw,w,ne,n,n,n,n,ne,s,sw',
  },

  '晚月庄': {
    '蝴蝶': 'jh 11,e,e,s',
    '铁血小贩': 'jh 11,e,e,s,n,nw,w,nw,e',
    '酒肉和尚': 'jh 11,e,e,s,n,nw,w,nw,e,e,e,n,w',
    '陈子昂': 'jh 11,e,e,s,n,nw,w,nw,e,e,e,se',
    '彩衣少女': 'jh 11,e,e,s,sw',
    '蓝止萍': 'jh 11,e,e,s,sw,se,w',
    '婢女': 'jh 11,e,e,s,sw,se,w',
    '蓝雨梅': 'jh 11,e,e,s,sw,se,w,n',
    '芳绫': 'jh 11,e,e,s,sw,se,w,w,n,w',
    '昭仪': 'jh 11,e,e,s,sw,se,w,w,w,w',
    '昭蓉': 'jh 11,e,e,s,sw,se,w,w,s,s,w',
    '瑷伦': 'jh 11,e,e,s,sw,se,w,w,s,s,s,s,e,s,s,e',
  },

  '水烟阁': {
    '天邪虎': 'jh 12,n,n,n',
    '董老头': 'jh 12,n,n,n,e,n,n',
    '水烟阁武士': 'jh 12,n,n,n',
    '潘军禅': 'jh 12,n,n,n,n',
    '萧辟尘': 'jh 12,n,n,n,n',
    '水烟阁红衣武士': 'jh 12,n,n,n,w,n,nw',
    '水烟阁司事': 'jh 12,n,n,n,w,n,nw,e',
    '於兰天武': 'jh 12,n,n,n,w,n,nw,e,n',
  },

  '少林寺': {
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
    '高一毅': 'jh 14,e',
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
    '唐鹤': 'jh 14,w,n,n,n,w,s',
    '唐健': 'jh 14,w,n,n,n,e,e,n',
    '唐情': 'jh 14,w,n,n,n,e,e,n,n',
    '唐刚': 'jh 14,w,n,n,n,e,e,n,n',
    '欧阳敏': 'jh 14,w,n,n,n,e,e,n,n,ask tangmen_tangmei,ask tangmen_tangmei,e,event_1_8413183,event_1_39383240,e,s,e,n,w,n,n',
    '默剑客': 'jh 14,sw,s,e,s,s,sw,sw,w,w,s,s,e,e,e',
    '炼药': 'jh 14,sw,s,e,s,s,sw,sw,w,w,s,s,e,e,e,n,ne,e,se',
    '鹿熙吟': 'jh 14,sw,s,e,s,s,sw,sw,w,w,s,s,e,e,e,n,ne,e,se,s,se,e,ne,n',
  },

  '青城山': {
    '海公公': 'jh 15',
    '仵作': 'jh 15,s,ne',
    '游方郎中': 'jh 15,n',
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

  '逍遥林': {
    '天山姥姥': 'jh 16,s,s,s,s,e,n,e,event_1_5221690,s,w,event_1_57688376,n,n,e,n,event_1_88625473,event_1_82116250,event_1_90680562,event_1_38586637',
    '常一恶': 'jh 16,s,s,s,s,e,n,e,event_1_56806815',
    '吴统领': 'jh 16,s,s,s,s,e,e,s,w',
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
    '骆驼开封': 'jh 17',
    '新娘': 'jh 17,sw,nw',
    '毒蛇': 'jh 17,event_1_97081006',
    '野猪': 'jh 17,event_1_97081006,s',
    '黑鬃野猪': 'jh 17,event_1_97081006,s,s,s,s',
    '野猪王': 'jh 17,event_1_97081006,s,s,s,s,s',
    '白面人': 'jh 17,event_1_97081006,s,s,s,s,s,w,kaifeng_yezhulin05_op1',
    '鹤发老人': 'jh 17,event_1_97081006,s,s,s,s,s,w,w',
    '鹿杖老人': 'jh 17,event_1_97081006,s,s,s,s,s,w,w',
    '灯笼小贩': 'jh 17,n',
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
    '玄衣少年': 'jh 17,n,n,e,e',
    '王老板': 'jh 17,n,n,e,e,s',
    '码头工人': 'jh 17,n,n,e,e,n',
    '船老大': 'jh 17,n,n,e,e,n,n',
    '落魄书生': 'jh 17,n,n,e,e,n,get_silver',
  },

  '明教': {
    '村民': 'jh 18',
    '沧桑老人': 'jh 18,e',
    '村妇': 'jh 18,w',
    '老太婆': 'jh 18,w,n',
    '小男孩明': 'jh 18,w,n',
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
    '明教毒魔': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,w,nw,nw,event_1_15705584,event_1_70957287',
    '青衣女孩': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,w,nw,nw,event_1_15705584,event_1_70957287,event_1_39374335',
    '谢狮王': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,e',
    '张教主': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,n',
    '范右使': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,n,n',
    '小昭': 'jh 18,n,nw,n,n,n,n,n,ne,n,n,n,n,n,n,n,n,n,n,n,n',
  },

  '全真教': {
    '终南山游客': 'jh 19,s,s,s,sw,s,e',
    '男童': 'jh 19,s,s,s,sw,s,e,n,nw',
    '全真女弟子': 'jh 19,s,s,s,sw,s,e,n,nw,n',
    '迎客道长': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n',
    '程遥伽': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n',
    '全真练功弟子': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n',
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
    '赵师兄': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,w,n',
    '老顽童': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,w,w,n',
    '谭处端': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,e',
    '刘处玄': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,e,e',
    '掌厨道士': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,e,e,e',
    '小麻雀': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,e,e,e,n',
    '老人': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '蜜蜂': 'jh 19,s,s,s,sw,s,e,n,nw,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w,n',
  },

  '古墓': {
    '天蛾': 'jh 20,w,w,s,e,s,s,s',
    '食虫虻': 'jh 20,w,w,s,e,s,s,s,s,s,sw',
    '白玉蜂': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s',
    '红玉蜂': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,e',
    '龙儿': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,s,s,e,e',
    '林祖师': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,s,s,e,e,event_1_3723773,se,n,e,s,e,s,e',
    '孙婆婆': 'jh 20,w,w,s,e,s,s,s,s,s,sw,sw,s,s,s,s,s,s,s,e,e,e,e,s,e',
  },

  '白驼山': {
    '傅介子': 'jh 21',
    '玉门守将': 'jh 21,n,n,n,n,e',
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
    '嵩山游客': 'jh 22,n,n,w',
    '野狼': 'jh 22,n,n,w,n',
    '山贼': 'jh 22,n,n,w,n,n,n',
    '林立德': 'jh 22,n,n,w,n,n',
    '修行道士': 'jh 22,n,n,w,n,n,n,n',
    '黄色毒蛇': 'jh 22,n,n,w,n,n,n,n,event_1_88705407',
    '麻衣刀客': 'jh 22,n,n,w,n,n,n,n,event_1_88705407,s,s',
    '白板煞星': 'jh 22,n,n,w,n,n,n,n,event_1_88705407,s,s,s,s',
    '小猴': 'jh 22,n,n,w,n,n,n,n,n',
    '万大平': 'jh 22,n,n,w,n,n,n,n,n,e',
    '芙儿': 'jh 22,n,n,w,n,n,n,n,n,e,n,e',
    '嵩山弟子': 'jh 22,n,n,w,n,n,n,n,n,e,n',
    '麻衣汉子': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,w,n',
    '史师兄': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n',
    '白头仙翁': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n',
    '左挺': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n',
    '钟九曲': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,e',
    '乐老狗': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,w',
    '冷峻青年': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,w,n,n',
    '伙夫': 'jh 22,n,n,w,n,n,n,n,n,e,n,n,n,n,n,w,n,w',
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

  '寒梅庄': {
    '柳府家丁': 'jh 23',
    '柳玥': 'jh 23,n,n',
    '老者': 'jh 23,n,n',
    '筱西风': 'jh 23,n,n,e',
    '梅庄护院': 'jh 23,n,n,n',
    '梅庄家丁': 'jh 23,n,n,n,n,n',
    '施令威': 'jh 23,n,n,n,n,n,n',
    '丁管家': 'jh 23,n,n,n,n,n,n,n',
    '向左使': 'jh 23,n,n,n,n,n,n,n,w,w',
    '地牢看守': 'jh 23,n,n,n,n,n,n,n,w,w,give meizhuang_meizhuang3',
    '地鼠': 'jh 23,n,n,n,n,n,n,n,w,w,give meizhuang_meizhuang3,n,n',
    '奎孜墨': 'jh 23,n,n,n,n,n,n,n,w,w,give meizhuang_meizhuang3,n,n,n,n,n',
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
    '西门宇': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,e,e,n,n,n,n,n',
    '黑衣密探': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '毒蛇': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,w,n',
    '筱墨客': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,w,n,n,w',
    '迟一城': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '泰山弟子': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '建除': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,e',
    '天柏': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '天松': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '玉师叔': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,w',
    '泰山掌门': 'jh 24,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
  },

  '大旗门': {
    '宾奴': 'jh 25,w',
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

  '大昭寺': {
    '小绵羊': 'jh 26,w',
    '草原狼': 'jh 26,w',
    '大绵羊': 'jh 26,w,w',
    '牧羊女': 'jh 26,w,w',
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

  '魔教': {
    '店小二魔': 'jh 27,ne,w',
    '客店老板': 'jh 27,ne,w',
    '外面船夫': 'jh 27,ne,nw,w,nw,w,w',
    '船夫': 'jh 27,ne,nw,w,nw,w,w,yell',
    '魔教犯人': 'jh 27,ne,nw,w,nw,w,w,yell',
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

  '星宿海': {
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
    '毒蛇': 'jh 28,n,w,w,w,w',
    '周女侠': 'jh 28,n,w,w,w,w',
    '牦牛': 'jh 28,n,w,w,w,w,w,w,nw,ne,nw,w',
    '天狼师兄': 'jh 28,n,w,n',
    '出尘师弟': 'jh 28,n,w,n,n',
    '波斯商人': 'jh 28',
    '梅师姐': 'jh 28,sw',
    '天梵密使': 'jh 28,sw,event_1_83637364',
    '铁尸': 'jh 28,sw,nw,sw,sw,nw,nw,se,sw',
    '伊犁': 'jh 28,nw',
    '矮胖妇女': 'jh 28,nw',
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
    '道士': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,e',
    '孙天灭': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n',
    '道灵': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n,event_1_98579273',
    '护山使者': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n,event_1_98579273,w',
    '林忌': 'jh 29,n,n,n,n,event_1_60035830,event_1_65661209,n,n,n,n,n,n,n,event_1_98579273,n',
  },

  '桃花岛': {
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

  '铁血山庄': {
    '樵夫铁': 'jh 31,n,n,n',
    '红色樵夫': 'jh 31,n,n,n,w',
    '老张': 'jh 31,n,n,n,w,w,w,w,n',
    '雪鸳': 'jh 31,n,n,n,w,w,w,w,n,n',
    '铁少': 'jh 31,n,n,n,w,w,w,w,n,n,n',
    '雪蕊儿': 'jh 31,n,n,n,w,w,w,w,n,n,n',
    '小翠铁': 'jh 31,n,n,n,w,w,w,w,n,n,n',
    '黑袍公': 'jh 31,n,n,n,w,w,w,w,n,n,n,n',
    '白袍公': 'jh 31,n,n,n,w,w,w,w,n,n,n,n',
    '番茄': 'jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;w,n',
  },

  '慕容山庄': {
    '家丁': 'jh 32,n,n',
    '邓家臣': 'jh 32,n,n,se',
    '朱姑娘': 'jh 32,n,n,se,e,s,s',
    '船工小厮': 'jh 32,n,n,se,e,s,s,event_1_99232080',
    '芳绫': 'jh 32,n,n,se,e,s,s,event_1_99232080,e,e,s,e,s,e,e,e',
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
    '下关城台夷商贩': 'jh 33,sw,sw,s,s,s,nw,n',
    '乌夷商贩': 'jh 33,sw,sw,s,s,s,nw,n',
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
    '丹顶鹤': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e',
    '霍先生': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,w',
    '华司徒': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,n,w',
    '范司马': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,n,e',
    '巴司空': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,n,n',
    '段王妃': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e',
    '养花女': 'jh 33,sw,sw,s,s,s,s,s,e,n,se,e,e,e,e',
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
    '武定镇采笋人': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,sw,sw,w',
    '族长': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,e,n,n',
    '祭祀': 'jh 33,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,e,n,n,n',
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
    '大理游客': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e',
    '村妇': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e',
    '段公子': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne',
    '摆夷农夫': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e',
    '竹叶青蛇': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw',
    '阳宗镇台夷商贩': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e',
    '采桑女': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,s',
    '阳宗镇采笋人': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s',
    '砍竹人': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s,s',
    '养蚕女': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s,s,e,e',
    '纺纱女': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,sw,s,s,e,n,e,n',
    '老祭祀': 'jh 33,sw,sw,s,s,s,s,e,e,e,e,se,s,e,e,e,ne,e,e,se,e,e,ne,e,n',
  },

  '断剑山庄': {
    '黑袍老人': 'jh 34,ne,e,e,e,e,e,n,e,n',
    '白袍老人': 'jh 34,ne,e,e,e,e,e,n,e,n',
    '和尚': 'jh 34,ne,e,e,e,e,e,n,n,n,n,n,w',
    '尼姑': 'jh 34,ne,e,e,e,e,e,n,n,n,n,n,n,e',
    '摆渡老人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '天怒剑客': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '任笑天': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '摘星老人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '落魄中年': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '栽花老人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '背刀人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '雁南飞': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '梦如雪': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '剑痴': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '雾中人': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
    '独孤不败': 'jh 34,ne,e,e,e,e,e,n,n,n,w,w,w,n,n,yell',
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
    '白掌门': 'jh 36,yell',
    '马六': 'jh 36,yell,e,ne,ne,ne,e,e',
    '侠客岛弟子': 'jh 36,yell,e,ne,ne,ne,e,e',
    '李四': 'jh 36,yell,e,ne,ne,ne,e,e,n',
    '蓝衣弟子': 'jh 36,yell,e,ne,ne,ne,e,e,n',
    '童子': 'jh 36,yell',
    '龙岛主': 'jh 36,yell,e,ne,ne,ne,e,e,e',
    '木岛主': 'jh 36,yell,e,ne,ne,ne,e,e,e,fly,e',
    '侍者': 'jh 36,yell,e,ne,ne,ne,e,e,e,e',
    '史婆婆': 'jh 36,yell,e,ne,ne,ne,e,e,e,e,e',
    '矮老者': 'jh 36,yell',
    '高老者': 'jh 36,yell',
    '谢居士': 'jh 36,yell',
    '朱熹': 'jh 36,yell,e,ne,ne,ne,e,e,e,e,e,e,n,n,n,w,w',
    '小猴子': 'jh 36,yell',
    '樵夫': 'jh 36,yell,e,se,e,e',
    '医者': 'jh 36,yell,e,se,e,e,e,e',
    '石帮主': 'jh 36,yell,e,se,e,e,n,e,s',
    '野猪': 'jh 36,yell',
    '渔家男孩': 'jh 36,yell',
    '渔夫': 'jh 36,yell,e,se,e,e,s,s,s,s',
    '渔家少女': 'jh 36,yell',
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

  '碧海山庄': {
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
    '三足金蟾': 'jh 40,s,s,s,s,e,s,se,sw,s,s,s,e,e,sw',
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
    '练武士兵': 'jh 41,se,e,e,se,se,se,se,se,se,event_1_57976870,e,e',
    '镇长': 'jh 41,se,e,e,ne,ne,se,e,e,ne',
    '李巡': 'jh 41,se,e,e,ne,ne,se,e,e,s,w',
    '守门士兵': 'jh 41,se,e,e,nw,nw',
    '公孙将军': 'jh 41,se,e,e,nw,nw,n,n,e,ne,e',
    '近身侍卫': 'jh 41,se,e,e,nw,nw,n,n,e,ne,e',
    '粮官': 'jh 41,se,e,e,nw,nw,n,n,e,ne,n,nw,n',
    '白衣士兵': 'jh 41,se,e,e,nw,nw,n,n,w,w',
    '文将军': 'jh 41,se,e,e,nw,nw,n,n,w,w,n,n,e',
  },
  '墨家机关城': {
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
  '掩月城': {
    '执定长老': 'jh 43',
    '佩剑少女': 'jh 43',
    '野狗': 'jh 43',
    '穿山甲': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne',
    '黑衣老者': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,se,se,s,s,sw,s',
    '六道禅师': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,se,se,s,s,sw,s,sw,sw,sw,sw',
    '火狐': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw',
    '黄鹂': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se',
    '夜攸裳': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se',
    '云卫': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n',
    '云将': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e',
    '女眷': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e',
    '制甲师': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,s',
    '试剑士': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,s,s',
    '莫邪传人': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,n',
    '老仆': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,n,n',
    '狄仁啸': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e',
    '青云仙子': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e',
    '秦东海': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e,e',
    '执法长老': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e,e',
    '执剑长老': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e,e',
    '执典长老': 'jh 43,n,ne,ne,n,e,e,se,se,e,ne,ne,n,nw,ne,e,se,se,se,se,ne,n,n,e,e,e,e,e,e',
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
    '函谷关武官': 'jh 43,w,w,w,w,nw,n,n,nw',
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
    '小马驹': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se',
    '绛衣剑客': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,se',
    '白衣公子': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,se,ne',
    '老仆': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,se,ne',
    '的卢幼驹': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne',
    '乌骓马': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne',
    '秦惊烈': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s',
    '千小驹': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s',
    '小马驹儿': 'jh 43,sw,sw,sw,s,se,se,se,e,s,sw,se,ne,se,s,e',
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
  '海云镇': {
    '海云马夫': 'jh 44',
    '野狗': 'jh 44,n',
    '老镇长': 'jh 44,n,n',
    '烟袋老头': 'jh 44,n,n,w',
    '青年女子': 'jh 44,n,n,w',
    '背枪客': 'jh 44,n,n,n',
    '小孩': 'jh 44,n,n,n,n',
    '野兔': 'jh 44,n,n,n,n,w,w',
    '海云游客': 'jh 44,n,n,n,n,e,ne',
    '青年剑客': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,w,w,w',
    '九纹龙': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,w,w,w,w,w,w',
    '蟒蛇': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,w,w,w,w,w,w,n,n,n,n',
    '暗哨': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,w,w,w,w,w,w,n,n,n,n,n',
    '石邪王': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,w,w,w,w,w,w,n,n,n,n,n,e,e,s,s',
    '穿山豹': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n',
    '地杀': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n',
    '天杀': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n',
    '海东狮': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n,n',
    '海云长老': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n,n',
    '红纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n,n',
    '青纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n,n',
    '紫纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n,n',
    '白纱舞女': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n,n',
    '六如公子': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,w,w,n,n,n',
    '萧秋水': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,e,n,n,n,n,e,n,e,e,n,n',
    '啸林虎': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n',
    '陆大刀': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e',
    '水剑侠': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne',
    '乘风客': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne',
    '血刀妖僧': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se',
    '花铁枪': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se,ne,ne',
    '狄小侠': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se,ne,ne,n,n,n,n,nw',
    '水姑娘': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,e,e,e,e,e,e,n,n,n,n,n,n,n,n,n,n,n,n,n,e,e,ne,ne,e,se,se,se,ne,ne,n,n,n,n,nw',
    '虬髯犯人': 'jh 44,n,n,n,n,w,w,nw,n,n,ne,n,n,e,n,n,n,n,w,n,n,n,n,w,n,e,e,n,n,n,n,n,n,n,n,nw,w,w,nw',
  },
  '幽冥山庄': {
    '野狗': 'jh 45,ne',
    '毒蛇': 'jh 45,ne,ne,n,n',
    '樵夫': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n',
    '鲍龙': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,e',
    '过之梗': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne',
    '翁四': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n',
    '屈奔雷': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,e',
    '伍湘云': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,e,e',
    '殷乘风': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,e,e',
    '辛仇': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n',
    '辛杀': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n',
    '蔡玉丹': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw',
    '辛十三娘': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw,n',
    '暗杀': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw,n',
    '巴司空': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw,n,w',
    '追命': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw,n,e,e',
    '艳无忧': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw,n,e,e,e',
    '摄魂鬼杀': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw,n,e,e,e',
    '幽冥山庄': 'jh 45,ne,ne,n,n,ne,ne,e,ne,n,n,n,n,n,ne,ne,n,n,n,nw,nw,n,e,e,e,e,e',
    '柳激烟': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n',
    '龟敬渊': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n',
    '凌玉象': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n',
    '沈错骨': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n',
    '慕容水云': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n',
    '金盛煌': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n,w',
    '冷血': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n,e',
    '庄之洞': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n,n',
    '高山青': 'jh 45,ne,ne,n,n,ne,ne,nw,nw,nw,n,n,n,n,n',
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
    '怒蛟高手': 'jh 46,e,e,e,e,e,e,e,e,e',
    '韩柏': 'jh 46,e,e,e,e,e,e,e,e,e,e',
    '烈震北': 'jh 46,e,e,e,e,e,e,e,e,e,e,e',
    '赤尊信': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e',
    '乾罗': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e,e',
    '厉若海': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e,e,e',
    '浪翻云': 'jh 46,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e',
    '方夜羽': 'jh 46,e,e,e,e,e,e,e,e,n',
    '封寒': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e',
    '盈散花': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,n',
    '寒碧翠': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,e',
    '薄昭如': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,s',
    '攻击': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,n',
    '血': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,e',
    '内': 'jh 46,e,e,e,e,e,e,e,e,n,n,n,e,e,s',
  },
   '西凉城': {
    '响尾蛇西凉': 'jh 47,ne',
    '官差': 'jh 47,ne,n,n,n,nw',
    '门外官兵': 'jh 47,ne,n,n,n,nw',
    '驿卒': 'jh 47,ne,n,n,n,ne,ne,e',
    '官兵': 'jh 47,ne,n,n,n,ne,ne,e,e,e',
    '苦力': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne',
    '樵夫': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n',
    '疯狗': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne',
    '野狗': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n',
    '伍定远': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,w,w',
    '捕快': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,w,w',
    '农民': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n',
    '马夫': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n',
    '黑衣镖师': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,nw',
    '齐润翔': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,nw',
    '镖师': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,nw,nw',
    '管家': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,ne,n,ne',
    '李铁杉': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,ne,n,ne,n',
    '铁剑': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,n,n,n,n,n,nw,nw,ne,n,ne,n',
    '止观大师': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,e,e,n,n,n,n,n',
    '慧清': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,e,e,n,n,n,n,n',
    '佛灯': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,n,ne,e,e,n,n,n,n,n,n,ne,n,get xiliangcheng_fodeng',
    '屠凌心': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se',
    '昆仑杀手': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se',
    '金凌霜': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s',
    '醉汉': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s',
    '钱凌异': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s,s',
    '齐伯川': 'jh 47,ne,n,n,n,ne,ne,e,e,e,e,ne,se,s,s,s',
  },
    '高昌迷宫': {
    '糟老头子': 'jh 48,e,ne',
    '阿曼': 'jh 48,e,ne',
    '苏普': 'jh 48,e,ne',
    '太行刀手': 'jh 48,e,ne',
    '陈达海': 'jh 48,e,ne',
    '哈卜拉姆': 'jh 48,e,ne,ne',
    '天铃鸟': 'jh 48,e,ne,ne,s',
    '牧民': 'jh 48,e,ne,ne,se',
    '霍元龙': 'jh 48,e,se',
    '恶狼': 'jh 48,e,se,se,e,ne,se',
    '响尾蛇高昌': 'jh 48,e,se,se,e,ne,se,e',
    '铁门': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,ne',
    '骆驼高昌': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,se,se,s',
    '男尸': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,se,se,s,s,s,sw',
    '老翁': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,se,se,s,s,s,sw,sw,s',
    '李文秀': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,se,se,s,s,s,sw,sw,s,sw,se',
    '苏鲁克': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,ne,event_1_369927',
    '车尔库': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,ne,event_1_369927,n',
    '瓦耳拉齐': 'jh 48,e,se,se,e,ne,se,e,e,e,ne,ne,event_1_369927,n,n,n',
  },
    '京城': {
    '饥民': 'jh 49',
    '捕快': 'jh 49,n,n,n,n',
    '武将': 'jh 49,n,n,n,n',
    '小丫鬟': 'jh 49,n,n,n,n,n',
    '侯府小姐': 'jh 49,n,n,n,n,n',
    '九华山女弟子': 'jh 49,n,n,n,n,n,n',
    '娟儿': 'jh 49,n,n,n,n,n,n',
    '东厂侍卫': 'jh 49,n,n,n,n,n,n,n',
    '城门官兵': 'jh 49,n,n,n,n,n,n,n,n',
    '柳昂天': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '江充': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '柳府铁卫': 'jh 49,n,n,n,n,n,n,n,n,n,n,n,n,n,n',
    '莫凌山': 'jh 49,n,n,n,n,n,e',
    '昆仑弟子': 'jh 49,n,n,n,n,n,e',
    '安道京': 'jh 49,n,n,n,n,n,e,e',
    '郝震湘': 'jh 49,n,n,n,n,n,e,e,e',
    '锦衣卫': 'jh 49,n,n,n,n,n,e,e,e',
    '韦子壮': 'jh 49,n,n,n,n,n,e,e,e,e',
    '王府卫士': 'jh 49,n,n,n,n,n,e,e,e,e',
    '风流司郎中': 'jh 49,n,n,n,n,n,e,e,e,e,n',
    '伍崇卿': 'jh 49,n,n,n,n,n,e,e,s',
    '苏颖超': 'jh 49,n,n,n,n,n,e,e,s',
    '店伙计': 'jh 49,n,n,n,n,n,e,e,s',
    '学士': 'jh 49,n,n,n,n,n,w',
    '书生': 'jh 49,n,n,n,n,n,w,w',
    '胡媚儿': 'jh 49,n,n,n,n,n,w,w,s',
    '荷官': 'jh 49,n,n,n,n,n,w,w,s',
    '白虎': 'jh 49,n,n,n,n,n,w,w,s',
    '青龙': 'jh 49,n,n,n,n,n,w,w,n',
    '打手': 'jh 49,n,n,n,n,n,w,w,n',
    '藏六福': 'jh 49,n,n,n,n,n,w,w,n',
    '杂货贩子': 'jh 49,n,n,n,n,n,w,w,w',
    '苦力京城': 'jh 49,n,n,n,n,n,w,w,w,w',
    '掌柜': 'jh 49,n,n,n,n,n,w,w,w,w,s',
    '醉汉京城': 'jh 49,n,n,n,n,n,w,w,w,w,w',
    '游客京城': 'jh 49,n,n,n,n,n,w,w,w,w,w,w',
    '顾倩兮': 'jh 49,n,n,n,n,n,w,w,w,w,w,w,n',
    '通天塔': 'jh 49,n,n,n,n,n,n,n,n,n,e,e,ne,e,e,ne,ne,n,n',
    '王一通': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw',
    '贵妇': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw',
    '红螺寺': 'jh 49,n,n,n,n,n,n,n,n,n,w,w,nw,w,n,n,n,w,nw,nw,nw,n',
  },
};
    function isContains(str, substr) {
        return str.indexOf(substr) >= 0;
    }
	var TupoSkillList = [ ["蛤蟆神拳","hamaquan"],["龙渊玉英杖","tongshouzhang"],["十二都天神杖","tianshenzhang"],["六脉神剑","liumai-shenjian"],
                         ["倚天剑法","yitian-sword"],["万象流云刀法","wanxianglyd"],["十阳灭冥箭","shiyangjian"],["降龙十八掌","xianglong-zhang"],
                         ["玄铁剑法","iron-sword"],["黯然销魂掌","anran-zhang"],["独孤九剑","dugu-jiujian"],["天师灭神剑","tao-mieshen-sword"],
                         ["屠龙刀法","tulong-blade"],["七星夺魄剑","sevenstar-sword-plus"],["七星剑法","qixing-sword"],["辟邪剑法","pixie-sword"],
                         ["斗战棍典","douzhangundian"],["霜寒十四棍","shshisigun"],["无相金刚掌","wuxiang-jingang-quan"],["暴雨梨花针","baoyu-lihua"],
                         ["神箭飞刀","sjfd"],["镇国龙枪","zglq"],["烈血十式","lxss"],["帝王剑法","king-sword"],["真武七截剑","zhenwu-jian"],
                         ["天羽奇剑","tianyu-qijian"],["覆雨剑法","fuyu-sword"],["排云掌法","paiyun-zhang"],["如来神掌","rulai-zhang"],
                         ["九天龙吟剑法","jiutian-sword"],["无归鞭法","huimengwuheng"],["捆仙鞭法","kunxianbianfa"],["九阴噬骨刀","jiuyin-blade"],
                         ["九阴白骨爪","jiuyin-baiguzhao"],["碧海潮生剑","bihai-sword"],["春风快意刀法","spring-blade"],
                         ["连珠腐尸功","lianzhu-fushi"],["千影百伤棍","qybsg"],["燎原百破","lybp"],["辉月杖法","hyzf"],["破军棍诀","pjgj"],
                         ["飞刀绝技","feidao"],["织冰剑法","binggong-jianfa"],["雪饮狂刀","xueyin-blade"],["孔雀翎","kongqueling"],
                         ["翻云刀法","fanyun-blade"],["九溪断月枪","jxdyq"],["九妙飞天术","jiumiaofts"],["乾坤大挪移","qiankun-danuoyi"],
                         ["天波九转","tbjz"],["凌波微步","lingboweibu"],["幽影幻虚步","yyhuanxubu"],["万流归一","wanliuguiyi"],
                         ["蛤蟆神功","hamashengong"],["金刚不坏功","jin-gang"],["不动明王诀","budongmwj"],["九阴真经","jiuyin"],
                         ["九阳神功","jiuyang-shengong"],["葵花宝典","kuihua-shengong"],["易筋经神功","yijinjing"],["九龙镇北","jlzb"],
                         ["碧血心法","bxxf"],["太极神功","taiji-shengong"],["八荒功","bahuang-gong"],["生生造化功","sszaohuagong"],
                         ["紫血大法","zixuedafa"] ,["白首太玄经","baishoutaixuanjing"],["龙象般若功","longxiangbanruogong"],["燎原百击","liaoyuanbaiji"],
                        ["冰月破魔枪","bingyuepomoqiang"],["弹指神通","tanzhishentong"],["降龙廿八掌","xianglongnianbazhang"],["月夜鬼萧","yueyeguixiao"]
                        ,["云梦归月","yunmengguiyue"],["天魔妙舞","tianmomiaowu"],["子母龙凤环","zimulongfenghuan"],["九星定形针","jiuxingdingxingzhen"],
                        ["九阴逆","jiuyinni"]];

	//武林广场自动回休息室
	function gohome() {
        var locationname=g_obj_map.get("msg_room").get("short");
		if(locationname=="武林广场1"){
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场2"){
            overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场3"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场4"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场5"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场6"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场7"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场8"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场9"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
		if(locationname=="武林广场10"){
            overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("event_1_18378233");
			}
    }

	//孤傲自动批准帮派
	var uid = window.location.href.split("&")[1].split("=")[1];
    function listenBPFunc(){
        var msgtxt=null;
        var msghtml=null;
        if(uid=="3739896"){
            //获取out2的数据变化判断
        $("#out2").bind('DOMNodeInserted', function(e) {
            msgtxt = $(e.target).text() ;
            msghtml = $(e.target).html() ;
            var targetCode = null;
            if (msgtxt.indexOf("申请加入帮派") > -1 )  {
                targetCode = msghtml.split("'")[3];
                clickButton(targetCode);
            }
        });
        }else{
            $("#out2").unbind();
        }
    }
	listenBPFunc();

	/*战斗系统开始*/
//自动出招
var damage = 8000000;
var skillcombo = [];
var combo = [skillcombo];
var forceSkills = ['紫血大法', '生生造化功', '易筋经神功'];
var dodgeSkills = ['万流归一'];
var skills = [];
var huixueThresh = 0.5;//回血阈值
var huineiThresh = 0.1;//回内阈值
var enemySide = 0;
var enemyKee = {};
var lastPlaySkill = ''; //上次出招技能
function chuzhao3() {
    ////console.log('3气出招');
     if (g_obj_map.get("skill_button1")!=undefined)
            skills[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
    else
        skills[0]="";
    if (g_obj_map.get("skill_button2")!=undefined)
        skills[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
    else
        skills[1]="";
    if (g_obj_map.get("skill_button3")!=undefined)
        skills[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
    else
        skills[2]="";
    if (g_obj_map.get("skill_button4")!=undefined)
        skills[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
    else
        skills[3]="";
    if (g_obj_map.get("skill_button5")!=undefined)
            skills[4]=ansi_up.ansi_to_text(g_obj_map.get("skill_button5").get("name"));
    else
        skills[4]="";
    if (g_obj_map.get("skill_button6")!=undefined)
        skills[5]=ansi_up.ansi_to_text(g_obj_map.get("skill_button6").get("name"));
    else
        skills[5]="";
    // 遍历所有的可能组合
    for (var i = 0; i < combo.length; i++) {
        var comboSkill = combo[i];
        for (var j = 0; j < comboSkill.length; j++) {
            // 当前组合是否在技能列表里，在就返回
            for (var k = 0; k < skills.length; k++) {
                if (skills[k].indexOf(combo[i][j].toString()) >= 0){
                    clickButton('playskill ' + (k + 1)); //出招
                    return;
                }
            }
        }
    }
}

function chuzhao6() {
    ////console.log('6气出招');
    var pos = [];
    var comboed = false;
    var i;
     if (g_obj_map.get("skill_button1")!=undefined)
            skills[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
    else
        skills[0]="";
    if (g_obj_map.get("skill_button2")!=undefined)
        skills[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
    else
        skills[1]="";
    if (g_obj_map.get("skill_button3")!=undefined)
        skills[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
    else
        skills[2]="";
    if (g_obj_map.get("skill_button4")!=undefined)
        skills[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
    else
        skills[3]="";
    if (g_obj_map.get("skill_button5")!=undefined)
            skills[4]=ansi_up.ansi_to_text(g_obj_map.get("skill_button5").get("name"));
    else
        skills[4]="";
    if (g_obj_map.get("skill_button6")!=undefined)
        skills[5]=ansi_up.ansi_to_text(g_obj_map.get("skill_button6").get("name"));
    else
        skills[5]="";
    // 遍历所有的可能组合
    for (i = 0; i < combo.length; i++) {
        var comboSkill = combo[i];
        pos = [];
        for (var j = 0; j < comboSkill.length; j++) {
            // 当前组合是否在技能列表里
            for (var k = 0; k < skills.length; k++) {
                if (skills[k].indexOf(combo[i][j]) >= 0) {
                    ////console.log(k);
                    pos.push(k);
                }
            }
        }

        //按钮技能必须和combo列表符合
        if (pos.length == comboSkill.length)
            break;
    }
    // 出招
    for (i = 0; i < pos.length; i++)
        clickButton('playskill ' + (pos[i] + 1));
}

function chuzhao9() {
    var pos = [];
    var comboed = false;
    var i;
     if (g_obj_map.get("skill_button1")!=undefined)
            skills[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
    else
        skills[0]="";
    if (g_obj_map.get("skill_button2")!=undefined)
        skills[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
    else
        skills[1]="";
    if (g_obj_map.get("skill_button3")!=undefined)
        skills[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
    else
        skills[2]="";
    if (g_obj_map.get("skill_button4")!=undefined)
        skills[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
    else
        skills[3]="";
    if (g_obj_map.get("skill_button5")!=undefined)
            skills[4]=ansi_up.ansi_to_text(g_obj_map.get("skill_button5").get("name"));
    else
        skills[4]="";
    if (g_obj_map.get("skill_button6")!=undefined)
        skills[5]=ansi_up.ansi_to_text(g_obj_map.get("skill_button6").get("name"));
    else
        skills[5]="";
    // 遍历所有的可能组合
    for (i = 0; i < combo.length; i++) {
        var comboSkill = combo[i];
        pos = [];
        for (var j = 0; j < comboSkill.length; j++) {
            // 当前组合是否在技能列表里
            for (var k = 0; k < skills.length; k++) {
                if (skills[k].indexOf(combo[i][j]) >= 0) {
                    ////console.log(k);
                    pos.push(k);
                }
            }
        }

        //按钮技能必须和combo列表符合
        if (pos.length == comboSkill.length)
            break;
    }
    // 出招
    clickButton('playskill ' + (pos[0] + 1));
    setTimeout("clickButton('playskill " + (pos[1] + 1)+"')", 400);
    setTimeout("clickButton('playskill " + (pos[0] + 1)+"')", 410);
}

/* 破招开始 */
var attackKey = ["你如","教你","向你","点你","指你","你只觉","你为","往你","割向你","你反应","青城","大嵩阳","裹向你","你的对攻无法击破","推向你","倒刺","击向你",
                 "准你","你的姿态","奔你","渡你","取你","朝你","刺你","击你","你面对","你根本","抓向你","劈下","砍向你","扣你","并力","你这一招","吹向你",
                 "到你","至你","你被","卷你","将你","了你","于你","你再","你已是","你已是","双目内视",
                 "你愕然","扫你","从你","你的招式尽","削你","扑你","取你","令你",
                 "单手舞动，单刀离背而出","冲你","你一时","落在你","拍你","切你","斩你",
                 "砍你","砸你","趁你","封你","待你","在你","与你","劈你","然你",
                 "你正搜寻","你发现时","你犹如","袭你","使你","你受困","你在极端",
                 "钻你","你未被击中却亦是身受","你避无可避","你分身乏术","算你","你被滚滚",
                 "哪怕你","你唯有","你瞬不及","你步步陷危","你顿时","你已呈九死","锁你","你观之",
                 "中你","只见你","你受此浩劲","你急急而挡","你神识早已","你纵使","你难抗",
                 "瞬间你已是","你愕然","使你","你躲闪不及","逼近你","你宛如一叶","你抵御不住",
                 "你自感","纵是你","捣你","你唯有","你颓然","你挡无可挡","你心头一痛","尽的你",
                 "你当场受创","你脸露惧","管你"];
//'招式之间组合','这几招配合起来','将招式连成', todo
var ignoreList = ['你招式之间组合', '将你的力道卸去大半', '你这几招配合起来', '你将招式连成'];
var bCounterStrike = false;

function counterStrike(msg) {
    //var xdz = parseInt(b.get('xdz'));
    //if (xdz >= 3) {
    for (var i = 0; i < attackKey.length; i++) {
        // find key
        if (msg.indexOf(attackKey[i]) >= 0) {
            // if in banlist
            for (var j = 0; j < ignoreList.length; j++) {
                if (msg.indexOf(ignoreList[j]) >= 0)
                    return;
            }
            console.log('反击：' + msg);
            chuzhao3();
            return;
        }
    }
    if(gSocketMsg.get_xdz()>=9){chuzhao6();;}
    //倾泻一下行动值
    //if (xdz >= 9) {
    //    qinggong();
    //}
    //}
}
/* 破招结束 */
    /*function kezhi(zhaoshi){ //1是剑法 2是拳法 3是刀法 4是暗器
        console.log(zhaoshi);
        var chuzhao=0; //1剑法 2拳法 3刀法 4暗器
        var skillname="";
        var skillbutton=[];
        if (g_obj_map.get("skill_button1")!=undefined)
            skillbutton[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
        else
            skillbutton[0]=0;
        if (g_obj_map.get("skill_button2")!=undefined)
            skillbutton[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
        else
            skillbutton[1]=0;
        if (g_obj_map.get("skill_button3")!=undefined)
            skillbutton[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
        else
            skillbutton[2]=0;
        if (g_obj_map.get("skill_button4")!=undefined)
            skillbutton[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
        else
            skillbutton[3]=0;

        if (zhaoshi==1){ //找自己的技能里有没有剑法
            for (var i=1;i<=4;i++){
                if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){
                    skillname=skillbutton[i-1];
                    lianzhen(skillname,i);
                    return;
                }
            }
            for (var i=1;i<=4;i++){
                if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){
                    skillname=skillbutton[i-1];
                    lianzhen(skillname,i);
                    return;
                }
            }
            for (var i=1;i<=4;i++){
                if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){
                    skillname=skillbutton[i-1];
                    lianzhen(skillname,i);
                    return;
                }
            }
            for (var i=1;i<=4;i++){
                if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){
                    skillname=skillbutton[i-1];
                    lianzhen(skillname,i);
                    return;
                }
            }
            //还他妈没有？你是不是没有武墓或者没有江湖绝学啊？那你破个屁招啊
            }else if (zhaoshi==2){  //找自己的技能里有没有拳法
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){
                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){
                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){

                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){

                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
            }else if (zhaoshi==3){
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){
                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){
                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){
                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }

                }
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){
                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
            }else if (zhaoshi==4){ //暗器绝学，无所谓什么招。找到一个绝学就上。
                for (var i=1;i<=4;i++){
                    if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){

                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                    if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){

                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                    if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){

                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                    if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){

                        skillname=skillbutton[i-1];
                        lianzhen(skillname,i);
                        return;
                    }
                }
            }
    }
function checkzhen(skillname,skillbutton){//按照按钮编号返回数值 0就是没有可以成阵的按钮
    console.log(skillname+"是我刚刚用的");
    console.log(skillbutton);
    if (skillname=="九天龙吟剑法"){
        if (skillbutton.indexOf("排云掌法")>=0)
            return skillbutton.indexOf("排云掌法");
        if (skillbutton.indexOf("雪饮狂刀")>=0)
            return skillbutton.indexOf("雪饮狂刀");
        return -1;
    }
    if (skillname=="排云掌法"){
        if (skillbutton.indexOf("九天龙吟剑法")>=0)
            return skillbutton.indexOf("九天龙吟剑法");
        if (skillbutton.indexOf("雪饮狂刀")>=0)
            return skillbutton.indexOf("雪饮狂刀");
        return -1;
    }
    if (skillname=="雪饮狂刀"){
        if (skillbutton.indexOf("排云掌法")>=0)
            return skillbutton.indexOf("排云掌法");
        if (skillbutton.indexOf("九天龙吟剑法")>=0)
            return skillbutton.indexOf("九天龙吟剑法");
        return -1;
    }
    if (skillname=="翻云刀法"){
        if (skillbutton.indexOf("覆雨剑法")>=0)
            return skillbutton.indexOf("覆雨剑法");
        if (skillbutton.indexOf("飞刀绝技")>=0)
            return skillbutton.indexOf("飞刀绝技");
        return -1;
    }
    if (skillname=="覆雨剑法"){
        if (skillbutton.indexOf("如来神掌")>=0)
            return skillbutton.indexOf("如来神掌");
        if (skillbutton.indexOf("翻云刀法")>=0)
            return skillbutton.indexOf("翻云刀法");
        return -1;
    }
    if (skillname=="飞刀绝技"){
        if (skillbutton.indexOf("翻云刀法")>=0)
            return skillbutton.indexOf("翻云刀法");
        if (skillbutton.indexOf("织冰剑法")>=0)
            return skillbutton.indexOf("织冰剑法");
        return -1;
    }
    if (skillname=="织冰剑法"){
        if (skillbutton.indexOf("飞刀绝技")>=0)
            return skillbutton.indexOf("飞刀绝技");
        if (skillbutton.indexOf("孔雀翎")>=0)
            return skillbutton.indexOf("孔雀翎");
        return -1;
    }
    if (skillname=="孔雀翎"){
        if (skillbutton.indexOf("织冰剑法")>=0)
            return skillbutton.indexOf("织冰剑法");
        if (skillbutton.indexOf("如来神掌")>=0)
            return skillbutton.indexOf("如来神掌");
        return -1;
        }
            if (skillname=="如来神掌"){
            if (skillbutton.indexOf("孔雀翎")>=0)
                return skillbutton.indexOf("孔雀翎");
            if (skillbutton.indexOf("覆雨剑法")>=0)
                return skillbutton.indexOf("覆雨剑法");
            return -1;
        }

    }
    function lianzhen(skillname,i){//连阵 连阵毕竟是危险的事情，那么只有在几种情况下。第一 对面敌人数目只有一人。 第二 我的气大于等于6 敌人小于等于3 这样我出阵 大不了敌人破招而已。
        var enemycounter=0;
        console.log("目前我有气"+gSocketMsg.get_xdz());
        for (i=1;i<=8;i++){
            if (g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+i)!=undefined){
                enemycounter++;
            }
        }
        var skillbutton=[];
        if (g_obj_map.get("skill_button1")!=undefined)
            skillbutton[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
        else
            skillbutton[0]=0;
        if (g_obj_map.get("skill_button2")!=undefined)
            skillbutton[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
        else
            skillbutton[1]=0;
        if (g_obj_map.get("skill_button3")!=undefined)
            skillbutton[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
        else
            skillbutton[2]=0;
        if (g_obj_map.get("skill_button4")!=undefined)
            skillbutton[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
        else
            skillbutton[3]=0;
        skillname=ansi_up.ansi_to_text(skillname);
        console.log("使用按钮"+i);
        console.log("出招"+skillname);
        var enemyxdz=0;
        if (enemycounter!=1){
            for (var i=1;i<=8;i++){
                if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+i)!=undefined){
                    enemyxdz=g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+i);
                    break;
                }
            }
        }

        clickButton('playskill '+(skillbutton.indexOf(skillname)+1),0); //无论是谁，我先反击一下??????
        var xdz=gSocketMsg.get_xdz(); //获取我当时的行动值
        //重新获取我们按钮的布局
        if (g_obj_map.get("skill_button1")!=undefined)
            skillbutton[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
        else
            skillbutton[0]=0;
        if (g_obj_map.get("skill_button2")!=undefined)
            skillbutton[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
        else
            skillbutton[1]=0;
        if (g_obj_map.get("skill_button3")!=undefined)
            skillbutton[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
        else
            skillbutton[2]=0;
        if (g_obj_map.get("skill_button4")!=undefined)
            skillbutton[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
        else
            skillbutton[3]=0;
        var checkbutton=-1;
        checkbutton=checkzhen(skillname,skillbutton);
        if (checkbutton>=0){//enemyxdz<=3
            if (xdz>=3){
                console.log("连阵按钮"+(checkbutton+1));
                console.log("我要出的绝学是"+g_obj_map.get("skill_button"+(checkbutton+1)).get("name"));
                clickButton('playskill '+(checkbutton+1),0);
            }
        }
    }
    function whofighting(msg,oblist,melist){
        if(gSocketMsg.get_xdz()<3||msg==undefined){return 0;}
            if(msg.indexOf("施展出九阳神功") >=0|| msg.indexOf("铁锁横江") >=0
                   || msg.indexOf("运起太极神功") >=0|| msg.indexOf("手脚无力") >=0
                  || msg.indexOf("的招式尽数被") >=0|| msg.indexOf("打了个寒颤") >=0
                  || msg.indexOf("心神一动") >=0|| msg.indexOf("使出一招「苦海无涯」") >=0
                  || msg.indexOf("似乎受了点轻伤") >=0|| msg.indexOf("手脚迟缓") >=0
                  || msg.indexOf("这几招配合起来") >=0|| msg.indexOf("受伤过重") >=0
                  || msg.indexOf("身型微展") >=0|| msg.indexOf("深深吸了几口气") >=0
                  || msg.indexOf("心中默念") >=0|| msg.indexOf("双目赤红") >=0
              || msg.indexOf("身子突然晃了两晃") >=0|| msg.indexOf("脸上突然冒出一阵红光") >=0
              || msg.indexOf("加入了战团") >=0|| msg.indexOf("已是飞出数丈之外") >=0){
                return 0;
            }
        if (fanjiTrigger==1){
            //for (var i=0;i<4;i++){
                if (msg.indexOf("你如")>-1||msg.indexOf("上了你")>-1||gSocketMsg.get_xdz()>=9
                             ||msg.indexOf("你的招式尽数被")>-1||msg.indexOf("向你")>-1||msg.indexOf("点你")>-1||msg.indexOf("指你")>-1||msg.indexOf("你只觉")>-1||msg.indexOf("你为")>-1
                          ||msg.indexOf("往你")>-1||msg.indexOf("准你")>-1||msg.indexOf("你的姿态")>-1||msg.indexOf("奔你")>-1||msg.indexOf("渡你")>-1
                          ||msg.indexOf("取你")>-1||msg.indexOf("朝你")>-1||msg.indexOf("刺你")>-1||msg.indexOf("击你")>-1||msg.indexOf("你面对")>-1
                          ||msg.indexOf("到你")>-1||msg.indexOf("至你")>-1||msg.indexOf("你被")>-1||msg.indexOf("卷你")>-1||msg.indexOf("将你")>-1
                ||msg.indexOf("了你")>-1||msg.indexOf("于你")>-1||msg.indexOf("你再")>-1||msg.indexOf("你已是")>-1||msg.indexOf("你愕然")>-1
                ||msg.indexOf("扫你")>-1||msg.indexOf("从你")>-1||msg.indexOf("你的招式尽")>-1||msg.indexOf("削你")>-1||msg.indexOf("扑你")>-1
                ||msg.indexOf("取你")>-1||msg.indexOf("令你")>-1||msg.indexOf("单手舞动，单刀离背而出")>-1||msg.indexOf("冲你")>-1||msg.indexOf("你一时")>-1
                            ||msg.indexOf("落在你")>-1||msg.indexOf("拍你")>-1||msg.indexOf("切你")>-1||msg.indexOf("斩你")>-1||msg.indexOf("砍你")>-1){ //敌人出招
                    return 1;
                }
            //}
            return 0;
        }
        if(hitnpctarget==1){
            var mengyou1 = oblist[0];
            var mengyou = melist[0];
            if(msg.indexOf(mengyou1.trim()) == 0){
                console.log(msg);
                return 1;
            }else if(msg.indexOf(mengyou.trim()) == 0 && mengyou!=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name"))){
                console.log(msg);
                return 1;
                     }
            return 0;
        }
        if(followplayertarget==1){
            var Friendlist = "[21]男主角◆番茄;[21]出品人◆风云;[21]临记◆卫芷泫;[21]制片人◆戏雨;[21]凌少;[21]空城◆旧梦;[21]春不老◆青木;[1]阿不;[1]纵横老野猪;[1]无头苍蝇;[1]欢乐剑客;[1]~陌上花开~;[1]李寻花;[1]凉城惜暖玉;[1]地府-摩诃王;[2]板砖;[2]陳小神;[7]小飞;[7]冷泉心影;[12]一炮泯恩仇;[1]寒夜·斩;[4]【人间】不舍;[1]魏娇;[4]十方禅师;[1]烽火戲诸侯;[4]【人间】雨修;[21]筑梦师◆幻影";
                    for (var i=0;i<melist.length;i++){
                        //console.log(melist[i]);
                        var myFriend=melist[i];
                        if(isContains(Friendlist,myFriend)&&msg.indexOf(myFriend) >= 0&&msg.indexOf(myFriend) <= 28){
                                console.log(msg.indexOf(myFriend)+msg);
                                return 1;
                        }
                    }
            return 0;
        }
    }
    function fighttype(msg){
        var sword,cuff,blade;//判断哪个值大，用来判断最后一个阵法出现的位置
        sword=msg.lastIndexOf("剑");
        cuff=msg.lastIndexOf("掌");
        if (msg.lastIndexOf("拳")>cuff){
            cuff=msg.lastIndexOf("拳");
        }
        blade=msg.lastIndexOf("刀");
        if (sword>cuff&&sword>blade){
            return 2
        }else if (cuff>sword&&cuff>blade){
            return 3;
        }else if (blade>sword&&blade>cuff){
            return 1;
        }else{
            return 4;
        }
    }
    function pozhaofailed(msg,oblist){
        for (var i=0;i<8;i++){
            if (msg.match(oblist[i]+"的招式并未有明显破绽")!=null){
                return 1;
            }
        }
        if (msg.match("你的招式尽数被")!=null||msg.match("你的对攻无法击破")!=null||msg.match("击向了你的破绽")!=null||msg.match("你一不留神")!=null||msg.match("你这一招并未奏效")!=null){
            return 1;
        }
        return 0;
    }*/
	var obside=0;
    var myside=0;
	function Combat(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type == "vs" && subType == "text") {
				var oblist=[];
				var melist=[];
				var obxdz=[];
				var mexdz=[];
				var who=0; //1是自己这边 2是敌人
                ngcount =0;

      			//要找到我在哪边。。。。。这个比较恶心。
                if (b.get("msg")==undefined){return;}
                if (b.get("msg").match('你骤地怒吼一声')!=null){
                    g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                    g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                }
                if(gSocketMsg.get_xdz()<3){return;}
				if (g_obj_map.get("msg_attrs").get("name").match("]")==null){
					var myname=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name"));
				}

				else{
					var myname=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name")).split("]")[1];
				}
				//console.log(myname);
                /*for (var i=0;i<8;i++){
                    if (g_obj_map.get("msg_vs_info")!=undefined){
                        if(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))!=undefined){
                            if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).match("]")!=null){
                                //console.log(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).split("]")[1]);
                                if (isContains(myname,ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).split("]")[1])){
                                    obside=1;
                                    myside=2;
                                }
                            }else{
                                if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1)))==myname){
                                    obside=1;
                                    myside=2;
                                }
                            }

                        }
                    }
                    if (g_obj_map.get("msg_vs_info")!=undefined){
                        if(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))!=undefined){
                            if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).match("]")!=null){
                                //console.log(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).split("]")[1]);
                                if (isContains(myname,ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).split("]")[1])){
                                    obside=2;
                                    myside=1;
                                }
                            }else{
                                if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1)))==myname){
                                    obside=2;
                                    myside=1;
                                }
                            }
                        }
                    }
                }
                console.log(obside);
                for (var i=0;i<8;i++){//获取整个战场信息
                    if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))!=undefined){
                        if (g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1)).match("]")!=null)
                            oblist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))).split("]")[1]);
                        else
                            oblist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))));
                        obxdz.push(g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+(i+1)));
                    }
                    if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))!=undefined){
                        if (g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1)).match("]")!=null)
                            melist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))).split("]")[1]);
                        else
                            melist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))));
                        mexdz.push(g_obj_map.get("msg_vs_info").get("vs"+myside+"_xdz"+(i+1)));
                    }
                }
                //console.log(oblist);
                console.log(melist);*/
                    var msg=b.get("msg");
                    if (msg == undefined){return;}
                    msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
                    counterStrike(msg);
                    //console.log(msg);
                    //判断出招按钮位置
                    /*var zhaoshi=0; //1是剑法 2是拳法 3是刀法。

                    if (whofighting(msg,oblist,melist)){//敌人出招
                        zhaoshi=fighttype(msg);
                        //伪装代码
                        kezhi(zhaoshi,obside);

                    }
                    //尴尬了，克制都没有成功。现在只能补招了。补招的计算是优先判断是否3气 如果3气就用绝学补招 不够3气就用2气跟招。
                    if (pozhaofailed(msg,oblist)){
                        buzhao();
                    }*/
			}
			if (type == "notice" && subType == "escape") {
				console.log(g_simul_efun.replaceControlCharBlank(b.get("msg")));
			}
            else if (type=="vs"&&subType=="combat_result"){//战斗结束 继续调取击
                ngcount =0;}
		}

	}

	function buzhao(){
		var myxdz=gSocketMsg.get_xdz();
		if (myxdz>=3){
			for (var i=1;i<=4;i++){
				if (g_obj_map.get("skill_button"+i)!=undefined&&(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="飞刀绝技"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="孔雀翎"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="雪饮狂刀"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="翻云刀法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="九天龙吟剑法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="覆雨剑法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="织冰剑法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="排云掌法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="如来神掌")){
					if (g_obj_map.get("skill_button"+i).get("xdz")==3){
						clickButton('playskill '+i,0);
					}
				}

			}
		}else if (myxdz==2){
			for (var i=1;i<=4;i++){
				if (g_obj_map.get("skill_button"+i)!=undefined){
					if (g_obj_map.get("skill_button"+i).get("xdz")==2){
						clickButton('playskill '+i,0);
					}
				}

			}
		}
	}
	var combat=new Combat;

	var Debug=0;
/*
	var DebugButton = document.createElement('button');
	DebugButton.innerText = '脚本调试';
	DebugButton.style.position = 'absolute';
	DebugButton.style.left = '0px';
	DebugButton.style.top = 30 + 'px';
	DebugButton.style.width = buttonWidth+12;
	DebugButton.style.height = buttonHeight;
	document.body.appendChild(DebugButton);
	DebugButton.addEventListener('click', DebugFunc)
	function DebugFunc(){
		if (Debug==0){
			Debug=1;
			DebugButton.innerText = '停止调试';
		}else{
			Debug=0;
			DebugButton.innerText = '脚本调试';
		}
	}*/
var lastheartbeat=0;
var currentheartbeat=0;
	function DebugMode(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type!="channel"){
				console.log(type);console.log(subType);
				console.log(b);
			}
		}
	}

	//显示隐藏
    var hideNpc = 0;
	function killhideFunc(){
        if (hideNpc==0){
			hideNpc=1;
            for (var i=1;i<5;i++){
            if(g_obj_map.get("msg_vs_info")){
                var div = document.getElementById('out2');
                if(g_obj_map.get("msg_vs_info").get("vs1_pos"+i)!=undefined)
                    $("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs1_name1")+"<a style='color:rgb(255, 0, 0)' href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs1_pos1")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs1_pos1")+"', 0);\">比试</a></span>")
                if(g_obj_map.get("msg_vs_info").get("vs1_pos"+i)!=undefined)
                    $("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs2_name1")+"<a style='color:rgb(255, 0, 0)' href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs2_pos1")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs2_pos1")+"', 0);\">比试</a></span>")
                div.scrollTop = div.scrollHeight;
            }}
		}else{
			hideNpc=0;
		}
		/*var cmd=$.trim(prompt("请输入命令：","list"));
		if(cmd=="list"){
			if(g_obj_map.get("msg_vs_info")){
				$("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs1_name1")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs1_pos1")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs1_pos1")+"', 0);\">比试</a></span>")
				$("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs1_name2")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs1_pos2")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs1_pos2")+"', 0);\">比试</a></span>")
				$("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs1_name3")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs1_pos3")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs1_pos3")+"', 0);\">比试</a></span>")
				$("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs1_name4")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs1_pos4")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs1_pos4")+"', 0);\">比试</a></span>")
                $("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs2_name1")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs2_pos1")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs2_pos1")+"', 0);\">比试</a></span>")
				$("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs2_name2")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs2_pos2")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs2_pos2")+"', 0);\">比试</a></span>")
				$("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs2_name3")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs2_pos3")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs2_pos3")+"', 0);\">比试</a></span>")
				$("#out2").append("<span class='out2'>"+g_obj_map.get("msg_vs_info").get("vs2_name4")+"<a href=\"javascript:clickButton('kill "+g_obj_map.get("msg_vs_info").get("vs2_pos4")+"', 0);\">击杀</a><a href=\"javascript:clickButton('fight "+g_obj_map.get("msg_vs_info").get("vs2_pos4")+"', 0);\">比试</a></span>")
			}
		}else{
			go($.trim(prompt()));
		}*/
	}
    function showkillHide(){
        this.dispatchMessage=function(b){
            // 刚进入房间，获取好人和恶人id
            if (b.get('type') == 'jh' && b.get('subtype') == 'info') {
                var keys = b.keys();
                var Id='';
                var Name='';
                var qixiaList = ["步惊鸿", "郭济", "浪唤雨", "火云邪神", "逆风舞", "风南", "狐苍雁", "王蓉", "李宇飞", "庞统", "风行骓", "吴缜", "护竺","玄月研","狼居胥","烈九州","穆妙羽","宇文无敌","李玄霸","八部龙将","风无痕","厉沧若","夏岳卿","妙无心","巫夜姬"];
                for (i = 0; i < keys.length; i++) {
                     //console.log( b.get(keys[i])+"；和innerText："+b.get(keys[i]).split(','));
                    if (keys[i].indexOf('npc') >= 0) {
                        var npc = b.get(keys[i]).split(',');
                        Id = npc[0];
                        Name = npc[1];
                        if($.inArray(Name,qixiaList)>-1){
                            Id=npc[0].split('_')[0];
                            $("#out").append("<span class='out'><span style='color:rgb(255, 0, 0);font-size:15px'>【</span><span style='color:rgb(255, 128, 0);font-size:15px'>"+npc[1]+"</span><span style='color:rgb(255, 0, 0);font-size:15px'>】</span><span style='color:rgb(255, 128, 0);font-size:15px'>    <a style='color:rgb(255, 0, 0)' href=\"javascript:clickButton('kill "+npc[0]+"', 0);\">击杀</a>    <a style='color:rgb(255, 128, 128)' href=\"javascript:clickButton('fight "+npc[0]+"', 0);\">比试</a>    <a style='color:rgb(255, 255, 0)' href=\"javascript:clickButton('ask "+npc[0]+"', 0);\">对话</a>    <a style='color:rgb(255, 0, 255)' href=\"javascript:clickButton('auto_zsjd_"+Id+"', 1);\">1金锭</a>    <a style='color:rgb(255, 0, 255)' href=\"javascript:clickButton('auto_zsjd20_"+Id+"', 1);\">15金锭</a></span></span>");}
                            else{
                        $("#out").append("<span class='out' style='color:rgb(255, 0, 255);font-size:15px'>【"+npc[1]+"】    <a style='color:rgb(255, 0, 0)' href=\"javascript:clickButton('kill "+Id+"', 0);\">击杀</a>    <a style='color:rgb(255, 128, 128)' href=\"javascript:clickButton('fight "+Id+"', 0);\">比试</a>    <a style='color:rgb(255, 255, 0)' href=\"javascript:clickButton('ask "+Id+"', 0);\">对话</a></span>");}
                    }
                }
            }
        }
    }




    var showhide=new showkillHide;
	var debugm=new DebugMode;
	var combat1=[{},{},{},{}];
	var combat2=[{},{},{},{}];
	var GodMode=0;
    var qgSkills = "万流归一;幽影幻虚步;";
	var GodButton = document.createElement('button');
	GodButton.innerText = '战斗强化';
	//right0ButtonArray.push(GodButton);
	GodButton.addEventListener('click', GodFunc);
    var hitnpctarget=0;
    var hitNPCButton = document.createElement('button');
    hitNPCButton.innerText = '打击NPC';
    //right0ButtonArray.push(hitNPCButton);
    hitNPCButton.addEventListener('click', hitNPCFunc);
    function hitNPCFunc(){
        if (hitnpctarget==0){
            hitnpctarget=1;
            hitNPCButton.innerText = '取消NPC';
        }else if (hitnpctarget==1){
            hitnpctarget=0;
            hitNPCButton.innerText = '打击NPC';
        }
        ngcount =0;
        if(hitnpctarget==1){
                //获取out的数据变化判断
                $("#out").bind('DOMNodeInserted', function(e) {
                    var oblist=[];
                    var melist=[];
                    var obxdz=[];
                    var mexdz=[];
                    var who=0; //1是自己这边 2是敌人
                    //要找到我在哪边。。。。。这个比较恶心。
                    if(gSocketMsg.get_xdz()<3){return;}
                    if (g_obj_map.get("msg_attrs").get("name").match("]")==null){
                        var myname=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name"));
                    }

                    else{
                        var myname=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name")).split("]")[1];
                    }
                    //console.log(myname);
                    for (var i=0;i<8;i++){
                        if (g_obj_map.get("msg_vs_info")!=undefined){
                            if(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))!=undefined){
                                if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).match("]")!=null){
                                    //console.log(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).split("]")[1]);
                                    if (isContains(myname,ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).split("]")[1])){
                                        obside=1;
                                        myside=2;
                                    }
                                }else{
                                    if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1)))==myname){
                                        obside=1;
                                        myside=2;
                                    }
                                }

                            }
                        }
                        if (g_obj_map.get("msg_vs_info")!=undefined){
                            if(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))!=undefined){
                                if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).match("]")!=null){
                                    //console.log(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).split("]")[1]);
                                    if (isContains(myname,ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).split("]")[1])){
                                        obside=2;
                                        myside=1;
                                    }
                                }else{
                                    if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1)))==myname){
                                        obside=2;
                                        myside=1;
                                    }
                                }
                            }
                        }
                    }
                    console.log(obside);
                    for (var i=0;i<8;i++){//获取整个战场信息
                        if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))!=undefined){
                            if (g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1)).match("]")!=null)
                                oblist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))).split("]")[1]);
                            else
                            oblist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))));
                            obxdz.push(g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+(i+1)));
                        }
                        if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))!=undefined){
                            if (g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1)).match("]")!=null)
                                melist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))).split("]")[1]);
                            else
                            melist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))));
                            mexdz.push(g_obj_map.get("msg_vs_info").get("vs"+myside+"_xdz"+(i+1)));
                        }
                    }
                    //console.log(oblist);
                    console.log(melist);
                    var msg = $(e.target).text();
                    if (msg == undefined){return;}
                    //console.log(msg);
                    //判断出招按钮位置
                    var zhaoshi=0; //1是剑法 2是拳法 3是刀法。
                    if (whofighting(msg,oblist,melist)){//敌人出招
                        zhaoshi=fighttype(msg);
                        //伪装代码
                        kezhi(zhaoshi,obside);

                    }
                    //尴尬了，克制都没有成功。现在只能补招了。补招的计算是优先判断是否3气 如果3气就用绝学补招 不够3气就用2气跟招。
                    if (pozhaofailed(msg,oblist)){
                        buzhao();
                    }
                });
        }else if(hitnpctarget==0){
            $("#out").unbind();
        }
    }

//自动瞄准
var FightTrigger = 0;
var FightFeed = new Fightfeedback();
function Fightfeedback(){
    this.dispatchMessage=function(b){
		var type = b.get("type"), subType = b.get("subtype");
		if (type=="vs"&&subType=="text"){
			var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
			if((msg.indexOf('向'+sessionStorage.getItem("Target")) > -1) ||
			(msg.indexOf('对准'+sessionStorage.getItem("Target")) > -1) ||
			(msg.indexOf('刺'+sessionStorage.getItem("Target")) > -1) ||
			(msg.indexOf('对着'+sessionStorage.getItem("Target")) > -1) ||
			(msg.indexOf('直扑'+sessionStorage.getItem("Target")) > -1))
			{
				chuzhao6();
			}

			/*
			if(((msg.indexOf('扫你') > -1) ||
				(msg.indexOf('在你') > -1) ||
				(msg.indexOf('四面八方') > -1) ||
				(msg.indexOf('对准你') > -1) ||
				(msg.indexOf('点你') > -1) ||
				(msg.indexOf('劈你') > -1) ||
				(msg.indexOf('取你') > -1) ||
				(msg.indexOf('抓破你') > -1) ||
				(msg.indexOf('往你') > -1) ||
				(msg.indexOf('向你') > -1) ||
				(msg.indexOf('奔你') > -1) ||
				(msg.indexOf('朝你') > -1) ||
				(msg.indexOf('击你') > -1) ||
				(msg.indexOf('斩你') > -1) ||
				(msg.indexOf('对着你') > -1) ||
				(msg.indexOf('直扑你') > -1)) &&
				(msg.indexOf(sessionStorage.getItem("Target")) > -1) &&
				(msg.indexOf('紧接着') == '-1') &&
				(msg.indexOf('同时') == '-1') &&
				(msg.indexOf('身形再转') == '-1') &&
				(msg.indexOf('迅疾无比') == '-1'))
			{
				chuzhao6();
			}
			*/
        }
    }
}

//自动避开
var FriendTrigger = 0;
var FriendFeed = new Friendfeedback();
function Friendfeedback(){
    this.dispatchMessage=function(b){
		var type = b.get("type"), subType = b.get("subtype");
		if (type=="vs"&&subType=="text"){
			var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				if(((msg.indexOf('扫你') > -1) ||
					(msg.indexOf('在你') > -1) ||
					(msg.indexOf('四面八方') > -1) ||
					(msg.indexOf('对准你') > -1) ||
					(msg.indexOf('点你') > -1) ||
					(msg.indexOf('劈你') > -1) ||
					(msg.indexOf('取你') > -1) ||
					(msg.indexOf('抓破你') > -1) ||
					(msg.indexOf('往你') > -1) ||
					(msg.indexOf('向你') > -1) ||
					(msg.indexOf('奔你') > -1) ||
					(msg.indexOf('朝你') > -1) ||
					(msg.indexOf('击你') > -1) ||
					(msg.indexOf('斩你') > -1) ||
					(msg.indexOf('对着你') > -1) ||
					(msg.indexOf('直扑你') > -1)) &&
					(msg.indexOf(sessionStorage.getItem("Friend")) == '-1') &&
					(msg.indexOf('紧接着') == '-1') &&
					(msg.indexOf('同时') == '-1') &&
					(msg.indexOf('身形再转') == '-1') &&
					(msg.indexOf('迅疾无比') == '-1'))
					{
						chuzhao6();
					}
        }
    }
}

	//精确打击
	var hitplayertarget=0;
    var hitlist = null;
    function hitPLYFunc(){
        if (hitplayertarget==0){
            hitplayertarget=1;
        }else if (hitplayertarget==1){
            hitplayertarget=0;
        }
        hitlist=$.trim(prompt("请输入命令：",""));
        if(hitplayertarget==1){
                //获取out的数据变化判断
                $("#out").bind('DOMNodeInserted', function(e) {
                    var msg = $(e.target).text();
                    if (msg.match('你骤地怒吼一声')!=null){
                        g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                        g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                    }
                    if(gSocketMsg.get_xdz()<3||msg==undefined){return;}
                    if(msg.indexOf("施展出九阳神功") >=0|| msg.indexOf("铁锁横江") >=0
                       || msg.indexOf("运起太极神功") >=0|| msg.indexOf("手脚无力") >=0
                       || msg.indexOf("的招式尽数被") >=0|| msg.indexOf("打了个寒颤") >=0
                       || msg.indexOf("心神一动") >=0|| msg.indexOf("使出一招「苦海无涯」") >=0
                       || msg.indexOf("似乎受了点轻伤") >=0|| msg.indexOf("手脚迟缓") >=0
                       || msg.indexOf("这几招配合起来") >=0|| msg.indexOf("受伤过重") >=0
                       || msg.indexOf("身型微展") >=0|| msg.indexOf("深深吸了几口气") >=0
                       || msg.indexOf("心中默念") >=0|| msg.indexOf("双目赤红") >=0
                       || msg.indexOf("身子突然晃了两晃") >=0|| msg.indexOf("脸上突然冒出一阵红光") >=0
                       || msg.indexOf("加入了战团") >=0|| msg.indexOf("已是飞出数丈之外") >=0){
                        return;
                    }
                    if(msg.indexOf(hitlist)>= 0){
                        console.log(msg);
                        chuzhao6();
                        /*var jianghu=["燎原百破","九溪断月枪","飞刀绝技","孔雀翎","雪饮狂刀","翻云刀法","九天龙吟剑法","覆雨剑法","织冰剑法","排云掌法","如来神掌"];
                        for (var i=1;i<=4;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),jianghu)>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }*/
                    }
                });
        }else if(hitplayertarget==0){
            $("#out").unbind();
        }
    }

	//跨服破招
    var kuafufanjiTriger=0;
    function kuafufanjiFunc(){
        if (kuafufanjiTriger==0){
            kuafufanjiTriger=1;
        }else if (kuafufanjiTriger==1){
            kuafufanjiTriger=0;
            $("#out").unbind();
        }
        ngcount =0;
        if(kuafufanjiTriger==1){
                //获取out的数据变化判断
                $("#out").bind('DOMNodeInserted', function(e) {
                    var msg = $(e.target).text();
                    if (msg.match('你骤地怒吼一声')!=null){
                        g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                        g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                    }
                    if(gSocketMsg.get_xdz()<3||msg==undefined){return;}
                    if(msg.indexOf("施展出九阳神功") >=0|| msg.indexOf("铁锁横江") >=0
                       || msg.indexOf("运起太极神功") >=0|| msg.indexOf("手脚无力") >=0
                       || msg.indexOf("的招式尽数被") >=0|| msg.indexOf("打了个寒颤") >=0
                       || msg.indexOf("心神一动") >=0|| msg.indexOf("使出一招「苦海无涯」") >=0
                       || msg.indexOf("似乎受了点轻伤") >=0|| msg.indexOf("手脚迟缓") >=0
                       || msg.indexOf("这几招配合起来") >=0|| msg.indexOf("受伤过重") >=0
                       || msg.indexOf("身型微展") >=0|| msg.indexOf("深深吸了几口气") >=0
                       || msg.indexOf("心中默念") >=0|| msg.indexOf("双目赤红") >=0
                       || msg.indexOf("身子突然晃了两晃") >=0|| msg.indexOf("脸上突然冒出一阵红光") >=0
                       || msg.indexOf("加入了战团") >=0|| msg.indexOf("已是飞出数丈之外") >=0){
                        return;
                    }
                    if (msg.indexOf("你如")>-1||msg.indexOf("上了你")>-1||gSocketMsg.get_xdz()>=9
                        ||msg.indexOf("你的招式尽数被")>-1||msg.indexOf("向你")>-1||msg.indexOf("点你")>-1||msg.indexOf("指你")>-1||msg.indexOf("你只觉")>-1||msg.indexOf("你为")>-1
                        ||msg.indexOf("往你")>-1||msg.indexOf("准你")>-1||msg.indexOf("你的姿态")>-1||msg.indexOf("奔你")>-1||msg.indexOf("渡你")>-1
                        ||msg.indexOf("取你")>-1||msg.indexOf("朝你")>-1||msg.indexOf("刺你")>-1||msg.indexOf("击你")>-1||msg.indexOf("你面对")>-1
                        ||msg.indexOf("到你")>-1||msg.indexOf("至你")>-1||msg.indexOf("你被")>-1||msg.indexOf("卷你")>-1||msg.indexOf("将你")>-1
                        ||msg.indexOf("了你")>-1||msg.indexOf("于你")>-1||msg.indexOf("你再")>-1||msg.indexOf("你已是")>-1||msg.indexOf("你愕然")>-1
                        ||msg.indexOf("扫你")>-1||msg.indexOf("从你")>-1||msg.indexOf("你的招式尽")>-1||msg.indexOf("削你")>-1||msg.indexOf("扑你")>-1
                        ||msg.indexOf("取 你")>-1||msg.indexOf("令你")>-1||msg.indexOf("单手舞动，单刀离背而出")>-1||msg.indexOf("冲你")>-1||msg.indexOf("你一时")>-1
                        ||msg.indexOf("落在你")>-1||msg.indexOf("拍你")>-1||msg.indexOf("切你")>-1||msg.indexOf("斩你")>-1||msg.indexOf("砍你")>-1){ //敌人出招
                        console.log(msg);
                        chuzhao6();
                        /*var jianghu=["燎原百破","九溪断月枪","飞刀绝技","孔雀翎","雪饮狂刀","翻云刀法","九天龙吟剑法","覆雨剑法","织冰剑法","排云掌法","如来神掌"];
                        for (var i=1;i<=4;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),jianghu)>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }*/
                    }
                });
        }else if(kuafufanjiTriger==0){
            $("#out").unbind();
        }
    }


    var followplayertarget=0;
    var followPLYButton = document.createElement('button');
    followPLYButton.innerText = '跟随大佬';
    //right0ButtonArray.push(followPLYButton);
    followPLYButton.addEventListener('click', followPLYFunc);
    function followPLYFunc(){
        if (followplayertarget==0){
            followplayertarget=1;
            followPLYButton.innerText = '取消跟随';
        }else if (followplayertarget==1){
            followplayertarget=0;
            $("#out").unbind();
            followPLYButton.innerText = '跟随大佬';
        }
        ngcount =0;
        if(followplayertarget==1){
                //获取out的数据变化判断
                $("#out").bind('DOMNodeInserted', function(e) {
                    var oblist=[];
                    var melist=[];
                    var obxdz=[];
                    var mexdz=[];
                    var who=0; //1是自己这边 2是敌人
                    //要找到我在哪边。。。。。这个比较恶心。
                    if(gSocketMsg.get_xdz()<3){return;}
                    if (g_obj_map.get("msg_attrs").get("name").match("]")==null){
                        var myname=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name"));
                    }

                    else{
                        var myname=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name")).split("]")[1];
                    }
                    //console.log(myname);
                    for (var i=0;i<8;i++){
                        if (g_obj_map.get("msg_vs_info")!=undefined){
                            if(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))!=undefined){
                                if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).match("]")!=null){
                                    //console.log(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).split("]")[1]);
                                    if (isContains(myname,ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).split("]")[1])){
                                        obside=1;
                                        myside=2;
                                    }
                                }else{
                                    if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1)))==myname){
                                        obside=1;
                                        myside=2;
                                    }
                                }

                            }
                        }
                        if (g_obj_map.get("msg_vs_info")!=undefined){
                            if(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))!=undefined){
                                if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).match("]")!=null){
                                    //console.log(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).split("]")[1]);
                                    if (isContains(myname,ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).split("]")[1])){
                                        obside=2;
                                        myside=1;
                                    }
                                }else{
                                    if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1)))==myname){
                                        obside=2;
                                        myside=1;
                                    }
                                }
                            }
                        }
                    }
                    console.log(obside);
                    for (var i=0;i<8;i++){//获取整个战场信息
                        if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))!=undefined){
                            if (g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1)).match("]")!=null)
                                oblist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))).split("]")[1]);
                            else
                            oblist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))));
                            obxdz.push(g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+(i+1)));
                        }
                        if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))!=undefined){
                            if (g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1)).match("]")!=null)
                                melist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))).split("]")[1]);
                            else
                            melist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+myside+"_name"+(i+1))));
                            mexdz.push(g_obj_map.get("msg_vs_info").get("vs"+myside+"_xdz"+(i+1)));
                        }
                    }
                    //console.log(oblist);
                    console.log(melist);
                    var msg=g_simul_efun.replaceControlCharBlank($(e.target).text());
                    if (msg == undefined){return;}
                    console.log(msg);
                    //判断出招按钮位置
                    var zhaoshi=0; //1是剑法 2是拳法 3是刀法。
                    if (whofighting(msg,oblist,melist)){//敌人出招
                        zhaoshi=fighttype(msg);
                        //伪装代码
                        kezhi(zhaoshi,obside);
                        $("#out").empty();
                    }
                    //尴尬了，克制都没有成功。现在只能补招了。补招的计算是优先判断是否3气 如果3气就用绝学补招 不够3气就用2气跟招。
                    if (pozhaofailed(msg,oblist)){
                        buzhao();
                    }
                });
        }else if(followplayertarget==0){
            $("#out").unbind();
        }
    }
    var qgTimer=null;
	function GodFunc(){
		if (GodMode==0){
			GodMode=1;
            setTimeout(kuafuQinggong,500);
            qgTimer=setInterval(kuafuQinggong,500);
			GodButton.innerText = '停止强化';
		}else{
			GodMode=0;
            clearInterval(qgTimer);
			GodButton.innerText = '战斗强化';
		}
	}
    var fightflag=0;
	var engage=0;
 	var combattext="";
	var enemylist=[];
	var alliancelist=[];
	var meside=0;
	var aboutme=0;
	var involewho="";
	var meattack=0;
	var attackme=0;
	var genzhao=0;
	var enemyindex=0;
    var kuafu=0;
    var followNPC = "";
    var qgtargetSkill = [];
    var qgtargetIndex = [];
    var qgcountor= 0;
    var skillbutton=[];
    function kuafuQinggong(){
        var neigongCount = 0;
        var xdz = gSocketMsg.get_xdz();
        if(g_obj_map.get("msg_attrs")!=undefined&&fightflag==1){
            if(gSocketMsg.get_xdz()<3){
                return;
            }
            //出内功
            if(+g_obj_map.get("msg_attrs").get("kee")/+g_obj_map.get("msg_attrs").get("max_kee")<0.5 && neigongCount<3){
                //var neigong=["生生造化功","紫血大法","易筋经神功","八荒功","葵花宝典","紫霞神功","天邪神功","不动明王诀"];
                var neigong=["生生造化功","紫血大法"];
                for (var i=1;i<=4;i++){
                    if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),neigong)>-1){
                        clickButton('playskill '+i,0);
                        neigongCount++;
                        return;
                    }
                }
            }
        }
    }
	function GodView(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			var me=g_obj_map.get("msg_attrs").get("id").split("-")[0];
			if (type=="vs"){
				if (subType=="vs_info"){//获得一次全场更新的机会
                    fightflag=1;
					var target1={};
					var target2={};
					meside=0;
					alliancelist=[];
					enemylist=[];
					for (var i=1;i<8;i++){
						console.log(b.get("vs1_pos"+i));
						console.log(b.get("vs2_pos"+i));
						if (b.get("vs1_pos"+i)!=undefined&&b.get("vs1_pos"+i).split("-")[0]==me){
							engage=1;
							meside=1;
							//console.log("我参与了战斗");
						}
						if (b.get("vs2_pos"+i)!=undefined&&b.get("vs2_pos"+i).split("-")[0]==me){
							engage=1;
							meside=2;
							//console.log("我参与了战斗");
						}
					}
					//console.log(meside);
					for (var i=1;i<=8;i++){
						if (b.get("vs1_pos"+i)!=undefined){
							target1={};
							target1["vs1_pos"+i]=b.get("vs1_pos"+i).split("-")[0];
							target1["vs1_pos_v"+i]=b.get("vs1_pos_v"+i);
							if (b.get("vs1_name"+i).match("]")!=null){
                                console.log('kuafu:'+kuafu);
								target1["vs1_name"+i]=ansi_up.ansi_to_text(b.get("vs1_name"+i)).split("]")[1];
								if (meside==1){
									alliancelist.push(ansi_up.ansi_to_text(b.get("vs1_name"+i)).split("]")[1]);
								}else if(meside==2){
									enemylist.push(ansi_up.ansi_to_text(b.get("vs1_name"+i)).split("]")[1]);
								}
							}
							else{
								target1["vs1_name"+i]=ansi_up.ansi_to_text(b.get("vs1_name"+i));
								if (meside==1){
									alliancelist.push(ansi_up.ansi_to_text(b.get("vs1_name"+i)));
								}else if(meside==2){
									enemylist.push(ansi_up.ansi_to_text(b.get("vs1_name"+i)));
								}
							}
							target1["vs1_xdz"+i]=b.get("vs1_xdz"+i);
							target1["vs1_kee"+i]=b.get("vs1_kee"+i);
							target1["empty"]=0;
							combat1[i-1]=target1;

						}else if(b.get("vs1_pos"+i)==undefined){
							target1={};
							target1["empty"]=1;
							combat1[i-1]=target1;
						}
						if (b.get("vs2_pos"+i)!=undefined){
							target2={};
							target2["vs2_pos"+i]=b.get("vs2_pos"+i).split("-")[0];
							target2["vs2_pos_v"+i]=b.get("vs2_pos_v"+i);
							if (b.get("vs2_name"+i).match("]")!=null){
								target2["vs2_name"+i]=ansi_up.ansi_to_text(b.get("vs2_name"+i)).split("]")[1];
								if (meside==2){
									alliancelist.push(ansi_up.ansi_to_text(b.get("vs2_name"+i)).split("]")[1]);
								}else if(meside==1){
									enemylist.push(ansi_up.ansi_to_text(b.get("vs2_name"+i)).split("]")[1]);
								}
							}
							else{
								target2["vs2_name"+i]=ansi_up.ansi_to_text(b.get("vs2_name"+i));
								if (meside==2){
									alliancelist.push(ansi_up.ansi_to_text(b.get("vs2_name"+i)));
								}else if(meside==1){
									enemylist.push(ansi_up.ansi_to_text(b.get("vs2_name"+i)));
								}
							}
							target2["vs2_xdz"+i]=b.get("vs2_xdz"+i);
							target2["vs2_kee"+i]=b.get("vs2_kee"+i);
							target2["empty"]=0;
							combat2[i-1]=target2;

						}else if(b.get("vs2_pos"+i)==undefined){
							target2={};
							target2["empty"]=1;
							combat2[i-1]=target2;
						}
					}
				}else if(subType=="text"){//预留位置 以后可以判断
					//console.log(b.get("msg"));
					/*if (b.get("msg").match("你")!=null&&aboutme==0){//跟我有关
						for (var i=0;i<4;i++){
							if (b.get("msg").indexOf(enemylist[i])>=0){
								combattext=ansi_up.ansi_to_text(b.get("msg"));
								involewho=enemylist[i];
								enemyindex=i+1;
								console.log(involewho);
								aboutme=1;
								break;
							}
						}
						//console.log(enemyindex);

					}*/
                    var mengyou1=alliancelist[0]
                    var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
                    if(gSocketMsg.get_xdz()>3&&msg !==""&&msg.indexOf(mengyou1) == 0 && (msg.indexOf(mengyou1+"施展出九阳神功") == -1
                   || msg.indexOf(mengyou1+"运起太极神功") == -1|| msg.indexOf(mengyou1+"手脚无力") == -1
                  || msg.indexOf(mengyou1+"的招式尽数被") == -1|| msg.indexOf(mengyou1+"打了个寒颤") == -1
                  || msg.indexOf(mengyou1+"心神一动") == -1|| msg.indexOf(mengyou1+"使出一招「苦海无涯」") == -1
                  || msg.indexOf(mengyou1+"似乎受了点轻伤") == -1|| msg.indexOf(mengyou1+"手脚迟缓") == -1
                  || msg.indexOf(mengyou1+"这几招配合起来") == -1|| msg.indexOf(mengyou1+"受伤过重") == -1
                  || msg.indexOf(mengyou1+"身型微展") == -1|| msg.indexOf(mengyou1+"深深吸了几口气") == -1
                  || msg.indexOf(mengyou1+"心中默念") == -1|| msg.indexOf(mengyou1+"双目赤红") == -1)){
                    //console.log("第一盟友数据："+msg);
                                    // 检测轻功绝学
                        if (g_obj_map.get("skill_button1")!=undefined)
                            skillbutton[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
                        else
                            skillbutton[0]=0;
                        if (g_obj_map.get("skill_button2")!=undefined)
                            skillbutton[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
                        else
                            skillbutton[1]=0;
                        if (g_obj_map.get("skill_button3")!=undefined)
                            skillbutton[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
                        else
                            skillbutton[2]=0;
                        if (g_obj_map.get("skill_button4")!=undefined)
                            skillbutton[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
                        else
                            skillbutton[3]=0;
                        if ($.inArray("万流归一", skillbutton)>-1 && $.inArray("幽影幻虚步", skillbutton)>-1 ){
                            qgcountor = 2;
                            qgtargetIndex[0]=$.inArray("万流归一", skillbutton)+1;
                            qgtargetIndex[1]=$.inArray("幽影幻虚步", skillbutton)+1;
                            //console.log('轻功绝学数量:'+qgcountor);
                        }
                        else if($.inArray("万流归一", skillbutton)>-1 || $.inArray("幽影幻虚步", skillbutton)==-1 ){
                            qgcountor = 1;
                            qgtargetIndex[0]=$.inArray("万流归一", skillbutton)+1;
                            //console.log('轻功绝学数量:'+qgcountor);
                        }
                        else if( $.inArray("万流归一", skillbutton)==-1 || $.inArray("幽影幻虚步", skillbutton)>-1 ){
                            qgcountor = 1;
                            qgtargetIndex[0]=$.inArray("幽影幻虚步", skillbutton)+1;
                            //console.log('轻功绝学数量:'+qgcountor);
                        }
                        if (gSocketMsg.get_xdz() >= 3&&qgcountor==1) {
                            clickButton('playskill '+qgtargetIndex[0]);
                        }
                        else if (gSocketMsg.get_xdz() >= 6&&qgcountor==2) {
                            clickButton('playskill '+qgtargetIndex[0]);
                            clickButton('playskill '+qgtargetIndex[1]);
                        }
                    }
                    /*
					if (combattext.match(involewho+"的招式并未有明显破绽")!=null||combattext.match("你的对攻无法击破")!=null){
							g_gmain.notify_fail(HIR+"你破招失败了！"+NOR);
						}*/

				}else if(subType=="playskill"){
					if (aboutme==1){
						if (b.get("uid").split("-")[0]==me){//我的出招。问题是打向了谁？//combattext里已经预存了信息 可以利用
							if (meattack==0){
								if (meside==1){//
								console.log(enemyindex);
								//document.getElementById("vs2"+enemyindex).style.border="thick solid green";
								}else if(meside==2){
									console.log(enemyindex);
								//document.getElementById("vs1"+enemyindex).style.border="thick solid green";
								}
								//g_gmain.notify_fail(HIG+"打击提示：你的攻击打向了"+RED+involewho+NOR);

								meattack=1;

							}
						}
						aboutme=0;
					}

				}else if(subType=="attack"){
					if (b.get("aid").split("-")[0]==me){	//我打中别人
						meattack=0;
						if (meside==1){//
							document.getElementById("vs2"+enemyindex).style.border="0 solid green";
						}else if(meside==2){
							document.getElementById("vs1"+enemyindex).style.border="0 solid green";
						}
					}
					//console.log((new Date()).valueOf());
				}else if(subType=="die"){
					//console.log((new Date()).valueOf());
				}else if(subType=="combat_result"){//清空存储
                    fightflag=0;
					combat1=[{},{},{},{}];
					combat2=[{},{},{},{}];
					attackme=0;
					meattack=0;
					involewho="";
					meside=0;
					alliancelist=[];
					enemylist=[];
					aboutme=0;
					combattext="";
					engage=0;
                    qgcountor=0;
				}
			}
		}
	}

	var godview=new GodView;


	var fanjiTrigger=0;

	var kuafuButton = document.createElement('button');
	kuafuButton.innerText = '跨服抢坑';
	//right0ButtonArray.push(kuafuButton);
	kuafuButton.addEventListener('click', kuafuFunc);
	var kuafuTrigger=0;
	function kuafuFunc(){
		if (kuafuTrigger==0){
			kuafuButton.innerText = '停止抢坑';
			kuafuTrigger=1;
		}else if (kuafuTrigger==1){
			kuafuButton.innerText = '跨服抢坑';
			kuafuTrigger=0;
		}
	}

	//跨服天剑谷
	var tianjianTrigger=0;
	var killTJIntervalFunc =  null;
	var path=[];
	var tjfight=0;
	var tjroomclear=0;
	var preroomrandom="";
	var direction=["west","east","south","north","southwest","southeast","northeast","northwest"];//八个方向
	function tianjianmove(){
		var roominfo=g_obj_map.get("msg_room");
		if ((roominfo==undefined||tjroomclear==0)&&tianjianTrigger==1){//房间信息没有刷新，或者在战斗，或者房间内还有npc
			 setTimeout(function(){tianjianmove();},1000);
		}else{
			console.log(path);
			for (var i=0;i<8;i++){
				if (roominfo.get(direction[i])!=undefined){
					if ((roominfo.get(direction[i]).match("峡谷")==null&&(path.length<=10||Math.random()>0.4)) && (sessionStorage.getItem("boss") == "1")){//不包含峡谷两个字，为特殊房间
						preroomrandom=roominfo.get("go_random");
						tjroomclear=0;
						path.push(g_obj_map.get("msg_room").get(direction[i]));
						clickButton("go "+direction[i]); //移动到特殊房间
						if (tianjianTrigger==1){
							setTimeout(function(){tianjianmove();},1000);
						}
						return;
					} else if ((roominfo.get(direction[i]).match("峡谷")!=null) && (sessionStorage.getItem("boss") == "2")){
						preroomrandom=roominfo.get("go_random");
						tjroomclear=0;
						path.push(g_obj_map.get("msg_room").get(direction[i]));
						clickButton("go "+direction[i]); //移动到普通房间
						if (tianjianTrigger==1){
							setTimeout(function(){tianjianmove();},1000);
						}
						return;
					}
				}
			}
			//没有特殊房间，开始寻找普通房间
			for (var i=0;i<8;i++){
				if (roominfo.get(direction[i])!=undefined){
					if (path.indexOf(g_obj_map.get("msg_room").get(direction[i]))==-1){
						path.push(g_obj_map.get("msg_room").get(direction[i]));
						preroomrandom=roominfo.get("go_random");
						tjroomclear=0;
						clickButton("go "+direction[i],0);
						if (tianjianTrigger==1){
							setTimeout(function(){tianjianmove();},1000);
						}
						return;
					}
				}
			}
			preroomrandom=roominfo.get("go_random");
			var randomdirect=Math.round((Math.random()*7));
			while(roominfo.get(direction[randomdirect])==undefined){
				randomdirect=Math.round((Math.random()*7));
			}
			tjroomclear=0;
			clickButton("go "+direction[randomdirect],0);
			if (tianjianTrigger==1){
				setTimeout(function(){tianjianmove();},1000);
			}
		}
	}
	function tianjianGu(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			console.log(type);console.log(subType);
			if (type=="vs"&&subType=="vs_info"){ //这是进入战斗的提示
				tjfight=1;
				ninesword();//放个绝学先
			}else if (type=="vs"&&subType=="combat_result"){//战斗结束 继续调取击
				tjfight=0;
				send("look_room\n");
			}
		}
	}
	function killtianjian(){
		var npclist=g_obj_map.get("msg_room");
		if ((tjfight==1)&&tianjianTrigger==1){
		}else{
			for (var i=1;i<12;i++){
				if (npclist.get("npc"+i)==undefined){
					break;
				}
				if (npclist.get("npc"+i).split(",")[0]!="kuafu_tjgws"&&npclist.get("npc"+i).split(",")[1].match("符兵")==null){
					clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
					break;
				}
			}
			for (var i=1;i<12;i++){
				if (npclist.get("npc"+i)==undefined){
					tjroomclear=1;
					return;
				}
				if (npclist.get("npc"+i).split(",")[0]=="kuafu_tjgws"){
					console.log("kill "+npclist.get("npc"+i).split(",")[0]);
					clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
				}
				return;
			}
		}
	}

	var tianjian=new tianjianGu;

	/*****帮副&刷碎片start*******/
    var TianJianNPCList = ["天剑真身", "虹风", "虹雨","虹雷", "虹电",
                           "镇谷神兽", "镇山神兽", "镇殿神兽", "镇潭神兽","守谷神兽",
                       "守山神兽", "守殿神兽", "守潭神兽","饕餮幼崽", "螣蛇幼崽",
                       "应龙幼崽","幽荧幼崽", "饕餮兽魂", "螣蛇兽魂", "应龙兽魂",
                       "幽荧兽魂", "幽荧王","饕餮王", "螣蛇王", "应龙王","饕餮分身",
                           "螣蛇分身", "应龙分身","幽荧战神","饕餮战神", "螣蛇战神", "应龙战神"];
    var pathSenlin = ['look_room;w', 'look_room;w', 'look_room;w', 'e;e;e;e', 'look_room;e', 'look_room;e', 'w;w;w;s', /*一层*/
    'look_room;w', 'look_room;w', 'look_room;w', 'e;e;e;e', 'look_room;e', 'look_room;e', 'w;w;w;s',  /*二层*/
    'look_room;w', 'look_room;w', 'look_room;w', 'e;e;e;e', 'look_room;e', 'look_room;e', 'w;w;w;s', /*三层*/
    'look_room;w', 'look_room;w', 'look_room;w', 'e;e;e;e', 'look_room;e', 'look_room;e', 'w;w;w;s', /*四层*/
    'look_room;w', 'look_room;w', 'look_room;w', 'e;e;e;e', 'look_room;e', 'look_room;e', 'w;w;w;s'];/*五层*/

    var bangfuTrigger=0;
    var bangfuKilling=false;
    var bangfuTimer=null;
    var skillsTimer=null;
    var currentStep = 0;
    function bangfuFunc(){
        if (bangfuTrigger==0){
            //currentStep = 0;
            bangfuTrigger=1;
            clearInterval(bangfuTimer);
            bangfuTimer=setInterval(autoKill,500);
        }else if (bangfuTrigger==1){
            bangfuTrigger=0;
            clearInterval(bangfuTimer);
            clearInterval(skillsTimer);
        }
    }

   //领队自动------------------------------------------------------------------
   var Learder = 0;
   function LearderFunc(){
        if (Learder == 0 ){
            currentStep = 0;
            Learder =1;
        }else if (Learder == 1){
            Learder =0;
        }
    }
    var neigongPlayCount=0;
    function bangfuDo(){
        this.dispatchMessage=function(b){
            var type = b.get("type"), subType = b.get("subtype");


            //console.log(type);console.log(subType);
            if (type=="vs"&&subType=="vs_info"){ //这是进入战斗的提示
                //停止 恢复
                if(healtriger==1){
//暗改                    userMedecineFunc()
                }
                neigongPlayCount=0;
                autoSkill1();
                skillsTimer=setInterval(autoSkill1,500);
                //clearInterval(bangfuTimer);
                //setTimeout(autoSkill,500);
            }else if (type=="vs"&&subType=="text" ){
                var jianghu=[];
                    //console.log(type);console.log(subType);
                if (b.get("msg")==undefined){return;}
                if (b.get("msg").match('你骤地怒吼一声')!=null){
                    g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                    g_gmain.notify_fail(HIG+"狂吐一口血："+RED+"恭喜你碧血成功！！使劲的撸吧"+NOR);
                }
                if(gSocketMsg.get_xdz()<3){
                    return;
                }
                var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
                if((msg !=undefined&&msg.indexOf("--燎原百破--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }
                else if((msg !=undefined&&msg.indexOf("--九溪断月枪--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }
                else if((msg !=undefined&&msg.indexOf("--千影百伤棍--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }
                else if((msg !=undefined&&msg.indexOf("--冰月破魔枪--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }else if((msg !=undefined&&msg.indexOf("--燎原百击--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }else if((msg !=undefined&&msg.indexOf("--玉石俱焚--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }else if((msg !=undefined&&msg.indexOf("-正道十七-")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }else if((msg !=undefined&&msg.indexOf("--幻阴指锤--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }else if((msg !=undefined&&msg.indexOf("--独孤斧诀--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                     }else if((msg !=undefined&&msg.indexOf("--青冥血斧--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                   }else if((msg !=undefined&&msg.indexOf("--六道轮回--")>-1
                    )||(gSocketMsg.get_xdz()>=9)){
                     jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
                    for(var j=0;j<jianghu.length;j++){
                        for (var i=1;i<=6;i++){
                            if(g_obj_map.get("skill_button"+i)!=undefined&&ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")).indexOf(jianghu[j].toString())>-1){
                                clickButton('playskill '+i,0);
                                $("#out").empty();
                                return;
                            }
                        }
                    }
                    //随便出一个
                    //clickButton('playskill 1',0);
                }
            }
            else if (type=="vs"&&subType=="combat_result"){//战斗结束 继续调取击
                neigongPlayCount=0;
                clickButton("look_room");
                var mapinfor=g_obj_map.get("msg_room").get("map_id");
                //var npclist=g_obj_map.get("msg_room").get("npc1");
                //console.log("当前NPC："+ npclist);
                //一键恢复
                if(healtriger==0 && (+g_obj_map.get("msg_attrs").get("kee")/+g_obj_map.get("msg_attrs").get("max_kee")<0.8 || +g_obj_map.get("msg_attrs").get("force")/+g_obj_map.get("msg_attrs").get("max_force")<0.8)){
//暗改                    userMedecineFunc();
                }
                if(mapinfor=='shenshousenlin' && Learder==1){
                //if(mapinfor=='baituo'){
                    //g_obj_map.get("msg_team").get("is_learder");
                    //if(g_obj_map.get("msg_team").get("is_learder")==1){
                    go(pathSenlin[currentStep++]);
                    console.log("当前step："+ currentStep);
                    if (currentStep>=pathSenlin.length)
                        currentStep=0;
                    }
                //}
                    clearInterval(skillsTimer);
                    bangfuKilling=false;
                //bangfuTimer=setInterval(autoKill,500);
            }
            if (type == "notice" && subType == "escape") {
                var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
                console.log(msg);
                if (msg.match("逃跑成功")!=null){
                    escapeTrigger1=0;
                    console.log("逃跑成功！！");
                }
            }
        }
    }

	function autoSkill(){
		if(gSocketMsg.get_xdz()<3){
			return;
		}
		//出内功
		if(+g_obj_map.get("msg_attrs").get("kee")/+g_obj_map.get("msg_attrs").get("max_kee")<0.3 && neigongPlayCount<3){
			//var neigong=["生生造化功","紫血大法","易筋经神功","八荒功","葵花宝典","紫霞神功","天邪神功","不动明王诀"];
            var neigong=["生生造化功","紫血大法"];
			for (var i=1;i<=4;i++){
				if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),neigong)>-1){
					clickButton('playskill '+i,0);
					neigongPlayCount++;
					return;
                }
            }
        }
		//江湖攻击技能
		var jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
		for (var i=1;i<=4;i++){
			if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),jianghu)>-1){
				clickButton('playskill '+i,0);
				return;
			}
		}
		//随便出一个
		//clickButton('playskill 1',0);
    }
function autoSkill1(){
		//if(neigongPlayCount>=3 && +g_obj_map.get("msg_attrs").get("force")/+g_obj_map.get("msg_attrs").get("max_force")<0.2){
			//逃跑回坑
		//	escapeStart1();
		//}
		if(gSocketMsg.get_xdz()<3){
			return;
		}
		//出内功
		if(+g_obj_map.get("msg_attrs").get("kee")/+g_obj_map.get("msg_attrs").get("max_kee")<0.5 && neigongPlayCount<3){
			//var neigong=["生生造化功","紫血大法","易筋经神功","八荒功","葵花宝典","紫霞神功","天邪神功","不动明王诀"];
            var neigong=["生生造化功","紫血大法"];
			for (var i=1;i<=4;i++){
				if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),neigong)>-1){
					clickButton('playskill '+i,0);
					neigongPlayCount++;
					return;
                }
            }
        }
        var jianghu=["冰月破魔枪","燎原百击","神龙东来","玉石俱焚","正道十七","幻阴指锤","独孤斧诀","青冥血斧","六道轮回","燎原百破","九溪断月枪","昊云破周斧","四海断潮斩","天火飞锤","玄胤天雷"];
		/*//江湖攻击技能
		var jianghu=["飞刀绝技","孔雀翎","雪饮狂刀","翻云刀法","九天龙吟剑法","覆雨剑法","织冰剑法","排云掌法","如来神掌"];
		for (var i=1;i<=4;i++){
			if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),jianghu)>-1){
				clickButton('playskill '+i,0);
				return;
			}
		}*/
		//随便出一个
		//clickButton('playskill 1',0);
    }

	function autoKill(){
		//send("look_room\n");
        var peopleList = $(".cmd_click3");
        var thisonclick = null;
        var targetNPCListHere = [];
        var countor= 0;
        if(healtriger==1){
				return;
			}
        for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
            // 打印 NPC 名字，button 名，相应的NPC名
            thisonclick = peopleList[i].getAttribute('onclick');
            if (TianJianNPCList.contains(peopleList[i].innerText)){
                var targetCode = thisonclick.split("'")[1].split(" ")[1];
                //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
                targetNPCListHere[countor] = peopleList[i];
                countor = countor +1;
            }
        }
        if (targetNPCListHere.length > 0){
            thisonclick = targetNPCListHere[0].getAttribute('onclick');
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            console.log("准备杀目标NPC名字：" + targetNPCListHere[0].innerText + "，代码：" + targetCode +"，目标列表中序号：");
            clickButton('kill ' + targetCode); // 点击杀人
            bangfuKilling=true;
            //clearInterval(bangfuTimer);
            //setTimeout(detectKillTianJianInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
        }
		/*setTimeout(function(){
			if(healtriger==1){
				return;
			}
			var npclist=g_obj_map.get("msg_room");
			if (npclist!=undefined && npclist.get("npc1")!=undefined && npclist.get("npc1").split(",")[1].match("符兵")==null){
				clickButton("kill "+npclist.get("npc1").split(",")[0],0);
				bangfuKilling=true;
				clearInterval(bangfuTimer);
			}
		},200)*/
	}

	var bangfu=new bangfuDo;
	/****帮副end****/

	/**循环比试start**/
	var qiecuoButton = document.createElement('button');
	qiecuoButton.innerText = '切磋NPC';
	//right0ButtonArray.push(qiecuoButton);
	qiecuoButton.addEventListener('click', qiecuoFunc);
	var qiecuoTrigger=0;
	var qiecuoTimer=null;
	function qiecuoFunc(){
		if (qiecuoTrigger==0){
			qiecuoButton.innerText = '停止切磋';
			qiecuoTrigger=1;
			clearInterval(qiecuoTimer);
			qiecuoTimer=setInterval(autoFight,4000);
		}else if (qiecuoTrigger==1){
			qiecuoButton.innerText = '切磋NPC';
			qiecuoTrigger=0;
			clearInterval(qiecuoTimer);
		}
	}
	function autoFight(){
		if(g_obj_map.get("msg_npc")!=undefined){
			clickButton('fight '+g_obj_map.get("msg_npc").get("id"),0);
		}
	}
	/**循环比试end**/
	/**循环比试玩家start**/
	var qiecuoUserButton = document.createElement('button');
	qiecuoUserButton.innerText = '切磋玩家';
	//right0ButtonArray.push(qiecuoUserButton);
	qiecuoUserButton.addEventListener('click', qiecuoUserFunc);
	var qiecuoUserTrigger=0;
	var qiecuoUserTimer=null;
	function qiecuoUserFunc(){
		if (qiecuoUserTrigger==0){
			qiecuoUserButton.innerText = '停止切磋';
			qiecuoUserTrigger=1;
			clearInterval(qiecuoUserTimer);
			qiecuoUserTimer=setInterval(autoFightUser,1000);
		}else if (qiecuoUserTrigger==1){
			qiecuoUserButton.innerText = '切磋玩家';
			qiecuoUserTrigger=0;
			clearInterval(qiecuoUserTimer);
		}
	}
	function autoFightUser(){
		if(g_obj_map.get("msg_user")!=undefined){
			clickButton('fight '+g_obj_map.get("msg_user").get("id"),0);
		}
	}
	/**循环比试玩家end**/

// 杀敌人----------------------------------------------------------------------------------------------------------------
var killEnemyIntervalFunc =  null;
var currentNPCIndex = 0;

function killEnemy(){
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
    getEnemyTargetCode();
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getEnemyTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
		let npcname = peopleList[i].innerText.toString();

        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (peopleList[i].innerText.toString().match(sessionStorage.getItem("Enemy")) != null){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }

    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标敌人名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillEnemyInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillEnemyInfo(){
    var EnemyInfo = $('span').text();
    if (EnemyInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }
	else if (EnemyInfo.slice(-5) == "先饶了吧。")
	{
		currentNPCIndex = currentNPCIndex + 1;
	}
	else if (EnemyInfo.slice(-6) == "明天继续吧。")
	{
		currentNPCIndex = currentNPCIndex + 1;
	}
	else if (EnemyInfo.slice(-7) == "荣威镖局任务。")
	{
		currentNPCIndex = currentNPCIndex + 1;
	}
	else{
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

// 杀坏人----------------------------
    var HongMingNPCList =["无『双』公主","攻楼死士","星宿恶徒【一】","星宿恶徒【二】","星宿恶徒【三】","星宿恶徒【四】","天魔真身","虹风", "虹雨","虹雷", "虹电","[一]镇擂斧将","[21-25区]恶棍", "[21-25区]流寇", "[21-25区]剧盗","[21-25区]云老四", "[21-25区]岳老三","[21-25区]二娘","[21-25区]段老大", "[21-25区]墟归一","[21-25区]上官晓芙","[21-25区]洪昭天"];
    var killHongMingIntervalFunc =  null;
    var currentNPCIndex = 0;
	var killHongMingTargetFlg = 0;

    function killHongMingTargetFunc(){
    zdskill =  null;
    if (killHongMingTargetFlg == 0){
        currentNPCIndex = 0;
        console.log("开始杀红名目标NPC！");
        skillLists = mySkillLists;
        killHongMingTargetFlg = 1;
        killHongMingIntervalFunc = setInterval(killHongMing, 200);

    }else{
        console.log("停止杀红名目标NPC！");
        killHongMingTargetFlg = 0;
        clearInterval(killHongMingIntervalFunc);
    }
}

function killHongMing(){
	var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
	var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
	var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
	var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));

    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
	if ((AutoRecoverFlg == 1 && kee==max_kee && force>max_force*0.9) || AutoRecoverFlg == 0)
	{
		getHongMingTargetCode();
	}
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}

function getHongMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HongMingNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHongMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHongMingInfo(){
    var HongMingInfo = $('span').text();
    if (HongMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
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


// 杀好人----------------------------
var HuangMingNPCList = ["不『二』剑客","守楼虎将","[一]镇擂斧将","年兽","[21-25区]王铁匠", "[21-25区]杨掌柜", "[21-25区]柳绘心", "[21-25区]柳小花", "[21-25区]卖花姑娘","[21-25区]刘守财","[21-25区]朱老伯","[21-25区]方老板", "[21-25区]客商","[21-25区]方寡妇","[21-25区]花落云","[21-25区]辰川","[21-25区]王世仲","[21-25区]无一" ,  "天剑真身", "天剑谷卫士" , "镇谷神兽", "镇山神兽", "镇殿神兽", "镇潭神兽","守谷神兽",
                       "守山神兽", "守殿神兽", "守潭神兽","饕餮幼崽", "螣蛇幼崽",
                       "应龙幼崽","幽荧幼崽", "饕餮兽魂", "螣蛇兽魂", "应龙兽魂",
                       "幽荧兽魂", "幽荧王","饕餮王", "螣蛇王", "应龙王","幽荧战神","饕餮战神", "螣蛇战神", "应龙战神",
                        "铁狼军","银狼军","金狼军","金狼将","十夫长","百夫长","濯缨剑士","对影剑士","月幽剑士","夏花剑士",
                        "采菊童子","欢喜罗汉","魔郡主","血斧客","龙山徒","纵横圣使","千夜暗影","天梵僧","贰壹刀客","紫神将","快活居士",
                       "血剑客","白骨秀士","鬼杀","幽冥鬼杀","绛衣杀手","绛衣剑客"];
var killHuangMingIntervalFunc =  null;
var currentNPCIndex = 0;
var killHuangMingTargetFlg = 0;

function killHuangMingTargetFunc(){
    zdskill =  null;
    if (killHuangMingTargetFlg == 0){
        currentNPCIndex = 0;
        console.log("开始杀好人目标NPC！");
        skillLists = mySkillLists;
        killHuangMingTargetFlg = 1;
        killHuangMingIntervalFunc = setInterval(killHuangMing, 200);
    }else{
        console.log("停止杀好人目标NPC！");
        killHuangMingTargetFlg = 0;
        clearInterval(killHuangMingIntervalFunc);
    }
}

function killHuangMing(){
	var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
	var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
	var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
	var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));

    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
	if ((AutoRecoverFlg == 1 && kee==max_kee && force>max_force*0.9) || AutoRecoverFlg == 0)
	{
		getHuangMingTargetCode();
	}
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getHuangMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HuangMingNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHuangMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHuangMingInfo(){
    var HuangMingInfo = $('span').text();
    if (HuangMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
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

// 杀全服坏人----------------------------
    var qfHongMingNPCList =["夜魔*段老大","夜魔*二娘","夜魔*岳老三","夜魔*云老四","段老大","二娘","岳老三","云老四"];
    var qfkillHongMingIntervalFunc =  null;
    var qfcurrentNPCIndex = 0;
	var qfkillHongMingTargetFlg = 0;

    function qfkillHongMingTargetFunc(){
    zdskill =  null;
    if (qfkillHongMingTargetFlg == 0){
        qfcurrentNPCIndex = 0;
        console.log("开始杀全服坏人目标NPC！");
        skillLists = mySkillLists;
        qfkillHongMingTargetFlg = 1;
        qfkillHongMingIntervalFunc = setInterval(qfkillHongMing, 200);

    }else{
        console.log("停止杀全服坏人目标NPC！");
        qfkillHongMingTargetFlg = 0;
        clearInterval(qfkillHongMingIntervalFunc);
    }
}

function qfkillHongMing(){
	var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
	var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
	var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
	var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));

    if ($('span').text().slice(-7) == "不能杀这个人。"){
        qfcurrentNPCIndex = qfcurrentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
	if ((AutoRecoverFlg == 1 && kee==max_kee && force>max_force*0.9) || AutoRecoverFlg == 0)
	{
		qfgetHongMingTargetCode();
	}
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        qfcurrentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function qfgetHongMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (qfHongMingNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (qfcurrentNPCIndex >= targetNPCListHere.length){
        qfcurrentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[qfcurrentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[qfcurrentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (qfcurrentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(qfdetectKillHongMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function qfdetectKillHongMingInfo(){
    var HongMingInfo = $('span').text();
    if (HongMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        qfcurrentNPCIndex = qfcurrentNPCIndex + 1;
    }else{
        qfcurrentNPCIndex = 0;
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

// 杀全服好人----------------------------

var qfHuangMingNPCList = ["王铁匠", "杨掌柜","柳绘心", "柳小花", "卖花姑娘","刘守财","朱老伯","方老板", "客商","方寡妇", "无一","铁二","追三","冷四", "红衣捕快","黄衣捕快","锦衣捕快"];
var qfkillHuangMingIntervalFunc =  null;
var qfcurrentNPCIndex = 0;
var qfkillqfHuangMingTargetFlg = 0;

function qfkillqfHuangMingTargetFunc(){
    zdskill =  null;
    if (qfkillqfHuangMingTargetFlg == 0){
        qfcurrentNPCIndex = 0;
        console.log("开始杀全服好人目标NPC！");
        skillLists = mySkillLists;
        qfkillqfHuangMingTargetFlg = 1;
        qfkillHuangMingIntervalFunc = setInterval(qfkillHuangMing, 200);
    }else{
        console.log("停止杀全服好人目标NPC！");
        qfkillqfHuangMingTargetFlg = 0;
        clearInterval(qfkillHuangMingIntervalFunc);
    }
}

function qfkillHuangMing(){
	var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
	var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
	var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
	var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));

    if ($('span').text().slice(-7) == "不能杀这个人。"){
        qfcurrentNPCIndex = qfcurrentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
	if ((AutoRecoverFlg == 1 && kee==max_kee && force>max_force*0.9) || AutoRecoverFlg == 0)
	{
		qfgetHuangMingTargetCode();
	}
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        qfcurrentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}

function qfgetHuangMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (qfHuangMingNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (qfcurrentNPCIndex >= targetNPCListHere.length){
        qfcurrentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[qfcurrentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[qfcurrentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (qfcurrentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(qfdetectKillHuangMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function qfdetectKillHuangMingInfo(){
    var HuangMingInfo = $('span').text();
    if (HuangMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        qfcurrentNPCIndex = qfcurrentNPCIndex + 1;
    }else{
        qfcurrentNPCIndex = 0;
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

function FollowLeader(){//帮本三中间大路专用跟随队长函数
	let vs_hp11 = $("#vs_hp11").children().children().text();
	if(vs_hp11 == "" || vs_hp11 == 0){
		var peopleList = $(".cmd_click3");
		var countor= 0;
		for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
		let npcname = peopleList[i].innerText.toString();
			if (peopleList[i].innerText.toString().match(sessionStorage.getItem("Leader")) != null){
				countor = countor +1;
				Learderflg = 0;//找到了，Learderflg清零
			}
		}
		if (countor == 0)
		{
			Learderflg = Learderflg + 1; //一次找不到，Learderflg+1
			if (Learderflg > 1) // 两次找不到，确定队长不在，走人
			{
				Learderflg = 0;
				overrideclick("go north");
			}
		}
	}

	if (BB3flg == 1)
	{
		setTimeout(FollowLeader,500); //如果开着帮三跟杀，500ms后继续检查队长是否在场景中
	}
}

    /**秘境最优化**/
	var mijingTrigger=0;
	function mijingFunc(){
		var roominfor=g_obj_map.get("msg_room").get("map_id");
		var mijingid=["tianlongshan","dafuchuan","fomenshiku","dilongling","luanshishan","lvzhou","taohuadu","炼丹室","daojiangu","binhaigucheng","baguamen","lvshuige","langhuanyudong","shanya","wujinshenyuan","qiaoyinxiaocun","nanmanzhidi","fengduguicheng","duzhanglin"];
		if (mijingid.indexOf(roominfor)==-1){
			g_gmain.notify_fail(HIR+"当前秘境不支持优化。"+NOR);
			return;
		}else{
			clickButton(roominfor+'_saodang',0);//点击扫荡 按钮一次;
			startOptimize(roominfor);
		}
	}
	function startOptimize(roominfor){
		var promt=g_obj_map.get("msg_prompt");
		console.log(roominfor);
		if (roominfor=="langhuanyudong"){
					overrideclick("go northwest");
					overrideclick("event_1_92817399");
					overrideclick("go west");
					overrideclick("event_1_91110342");
					overrideclick("go south");
					overrideclick("event_1_74276536");
					overrideclick("go southeast");
					overrideclick("event_1_14726005");
					overrideclick("go southwest");
					overrideclick("event_1_66980486");
					overrideclick("go northwest");
					overrideclick("event_1_39972900");
					overrideclick("go northwest");
					overrideclick("event_1_61689122");
					overrideclick("go west");
					overrideclick("event_1_19336706");
					overrideclick("go south");
					overrideclick("event_1_30457951");
					overrideclick("go southwest");
					overrideclick("event_1_96023188");
					overrideclick("go south");
			return;
		}
		if (promt==undefined){
			setTimeout(function(){startOptimize(roominfor)},500);
		}else{
			var msg=promt.get("msg");
			var zhuguo=parseInt(msg.split("朱果")[1].split("。")[0].split("x")[1]);
			if (zhuguo==0){
				alert("当前扫荡出错了。");
				return;
			}else{
				console.log("目前朱果为:"+zhuguo);
				if (roominfor=="daojiangu"){
					if (zhuguo>=1535){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="taohuadu"){
					if (zhuguo>=1785){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="lvshuige"){
					if (zhuguo>=1255){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="lvzhou"){
					if (zhuguo>=2035){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="luanshishan"){
					if (zhuguo>=2350){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="dilongling"){
					if (zhuguo>=2385){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="fomenshiku"){
					if (zhuguo>=2425){

						clickButton(roominfor+'_saodang go',0);

					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="dafuchuan"){
					if (zhuguo>=3050){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="tianlongshan"){
					if (zhuguo>=3100){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="baguamen"){
					if (zhuguo>=3635){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="shanya"){
					if (zhuguo>=2920){
						clickButton('event_1_97070517 go',0);
					}else{
						clickButton('event_1_97070517',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="wujinshenyuan"){
					if (zhuguo>=2980){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="qiaoyinxiaocun"){
					if (zhuguo>=2980){
						clickButton('event_1_26314975 go',0);
				}else{
                        clickButton('event_1_26314975',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="nanmanzhidi"){
					if (zhuguo>=3890){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="duzhanglin"){
					if (zhuguo>=2910){
						clickButton('event_1_30944031 go', 0);
					}else{
						clickButton('event_1_30944031', 0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="liandanshi"){
                    if (zhuguo>=2920){
                        clickButton('event_1_99063572 go',0);
                    }else{
                        clickButton('event_1_99063572',0);
                        setTimeout(function(){startOptimize(roominfor)},500);
                    }
                }else if (roominfor=="fengduguicheng"){
					if (zhuguo>=3860){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="binhaigucheng"){
				if (zhuguo>=3300){
					clickButton(roominfor+'_saodang go',0);
				}else{
                    clickButton(roominfor+'_saodang',0);
					setTimeout(function(){startOptimize(roominfor)},500);
				}
			}else if (roominfor=="yaowanggu"){
				if (zhuguo>=5920){
					clickButton('event_1_18864573 go', 0);
				}else{
					clickButton('event_1_18864573', 0);
					setTimeout(function(){startOptimize(roominfor)},500);
				}
			}else if (roominfor=="leichishan"){
				if (zhuguo>=5920){
					clickButton('event_1_32379200 go', 0);
				}else{
					clickButton('event_1_32379200', 0);
					setTimeout(function(){startOptimize(roominfor)},500);
				}
			}else if (roominfor=="langhuanyudong"){
				if (zhuguo>=2910){
					clickButton('event_1_74168671 go', 0);
				}else{
					clickButton('event_1_74168671', 0);
					setTimeout(function(){startOptimize(roominfor)},500);
				}
			}else if (roominfor=="dixiamigong"){
				if (zhuguo>=2910){
					clickButton('event_1_3668752 go', 0);
				}else{
					clickButton('event_1_3668752', 0);
					setTimeout(function(){startOptimize(roominfor)},500);
				}
			}
		}
	}
}
function mijingProtection(){
	if(g_obj_map.get("msg_room")==undefined || g_obj_map.get("msg_room").get("map_id")==undefined){
		return true;
	}
	send("look_room\n");
	var roominfor=g_obj_map.get("msg_room").get("map_id");
	var mijingid=["tianlongshan","dafuchuan","fomenshiku","dilongling","luanshishan","lvzhou","taohuadu","daojiangu","binhaigucheng","baguamen","lvshuige","langhuanyudong","shanya","wujinshenyuan","qiaoyinxiaocun","nanmanzhidi","fengduguicheng"];
	if (mijingid.indexOf(roominfor)>-1){
		g_gmain.notify_fail(HIR+"又手抖了？该戒撸了！！！"+NOR);
		return false;
	}
	return true;
}

var jiaozheng=0;
var jzstamp=0;
var killlock=0;
	function kuafulistener(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type=="vs"&&subType=="out_watch"){ //这是离开观战进入战斗的提示
				kuafuTrigger=0;
				kuafuButton.innerText = '跨服抢坑';
			}else if(type=="vs"&&subType=="attack"){//文字有刷新，那么就意味着我可能是在观战，如果stopqiang为0 那么我就是在观战
				//所以每次有text进来都有可能有一个玩家滚蛋。 我们就在这判断。
				var targetnpc=g_obj_map.get("msg_npc").get("id");//获取目标NPC的 id
				var fighting=g_obj_map.get("msg_vs_info");
				if (fighting.get("vs1_pos1")==targetnpc){
					//先检查我们自己进没进战斗
					for (var i=2;i<=8;i++){
						if(fighting.get("vs2_pos"+i)==b.get("uid")){//npc 在vs1一号位 从2号位开始记录玩家ID
							//clickButton("kill "+targetnpc);
							break;
						}
					}
				}else if(fighting.get("vs2_pos1")==targetnpc){
					for (var i=2;i<=8;i++){
						if(fighting.get("vs1_pos"+i)==b.get("uid")){//npc 在vs2一号位 从2号位开始记录玩家ID
							//clickButton("kill "+targetnpc);
							break;
						}
					}
				}
			}else if (type=="vs"&&subType=="add_xdz"){

				var targetnpc=g_obj_map.get("msg_npc").get("id");//获取目标NPC的 id
				if (b.get("uid")==targetnpc){
					setTimeout(function(){clickButton("kill "+targetnpc);},950);
					setTimeout(function(){clickButton("kill "+targetnpc);},1950);
				}

			}
		}
	}
var jzstart=0;
function jztime(){
	jzstart=1;
	jzstamp=(new Date()).valueOf();
	send('kill 9527\n');//校正命令 无意义
	setTimeout(jztime,6000);//每隔一分钟校正一次 网络状况
}
var yanchi=0;
function jztimerec(){
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType=b.get("subtype");
		if (type=="notice"&&subType=="notify_fail"){
			if (b.get("msg").match("这儿没有这个人")!=null){
				jzstart=0;
				console.log("校正延迟");
				yanchi=((new Date()).valueOf()-jzstamp)/2;
				console.log("延迟计算:"+yanchi);
			}
		}
	}
}
var jz=new jztimerec;
	var kuafu=new kuafulistener;
	function kuafuqiang(){
		if (stopqiang==0){
			//setTimeout(function(){kuafuqiang();},100);// 循环抢坑
		}else{
			return;
		}
	}
// 试剑----------------------------
var ShiJianFlg = 0;
    function ShiJianFunc(){
    if(ShiJianFlg == 0){
        clickButton('swords');
        clickButton('swords select_member xiaoyao_tonglao');   //天山童姥
        clickButton('swords select_member taoist_zhangtianshi');  //张天师
        clickButton('swords select_member mingjiao_zhang');   //张教主
        clickButton('swords fight_test go');
		ShiJianFlg = 1;
    }
    else{
         ShiJianFlg = 0;
    }

}


// 打排行榜----------------------------
var PaiHangFlg = 0;
    function PaiHangFunc(){
    if(PaiHangFlg == 0){
        clickButton('sort');
        clickButton('fight_hero 1');
		PaiHangFlg = 1;
    }
    else{
        PaiHangFlg = 0;
    }
}

    // 整理包裹----------------------------------------------------
var od_ar;
var go_arst;
var od;
var go_st;
var go_delay_def = 150;
var go_delay = 150;
var nextgo = function() {};
var go_time;
var go_bb = function(a) {
		go_reset();
		if (a != undefined) {
			od_ar = a.split("|");
			od = od_ar[0].split(";")
		}
		go_time = setTimeout(go_step, go_delay)
	};

function go_reset() {
	clearTimeout(go_time);
	od_ar = [];
	go_arst = 0;
	go_st = 0;
	od = []
}

var gofast = function(a) {
		var d = a.split(";");
		for (var i = 0; i < d.length; i++) clickButton(d[i], 0)
	};

function go_step() {
	if (go_st < od.length) {
		console.debug("开始执行：", od[go_st]);
		clickButton(od[go_st], 0);
		go_st++;
		if (go_st % 3 == 0) {
			go_time = setTimeout(go_step, go_delay)
		} else {
			go_time = setTimeout(go_step, go_delay)
		}
	} else {
		go_arst++;
		if (go_arst < od_ar.length) {
			go_st = 0;
			od = [];
			od = od_ar[go_arst].split(";");
			nextdo = go_step;
			setTimeout(checkbusy, go_delay)
		} else {
			go_delay = go_delay_def;
			go_time = setTimeout(nextgo, 300);
			nextgo = function() {}
		}
	}
}

function go_rp(a, n) {
	go_reset();
	for (var i = 0; i < n; i++) {
		od[i] = a
	}
	go_time = setTimeout(go_step, go_delay)
}

var clb_time;

//金狮盾宝玉甲苍狼护臂青鸾护臂翎眼赤护玄武盾月光宝甲衣红光匕天寒匕无心匕星河剑沧海护腰貂皮斗篷隐龙纹臂夜行披风虎皮腰带破军盾金丝甲疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣';
//软猬甲墨玄掌套陨铁盾孔雀氅烈日棍屠龙刀残阳棍倚天剑金狮盾碧磷鞭月光宝甲明月帽明月鞋墨磷腰带明月戒明月项链西毒蛇杖明月手镯宝玉甲扬文
//var items_sell = '无心锤八角锤咒剑王□三清神冠七星翻云靴粗布鹅黄袍虞姬剑大光明经红色绸裙麻衣漫天花雨匕银丝帽天怒斧青色丝袍真武剑船桨白金项链断云斧乌夷长裙红色绸裙包子大剪刀黑水伏蛟帝王剑麻布手套银丝帽吴钩绵裙铜钹大刀紫袍铁笛圣火令绿罗裙绣花针清心散垓下刀紫金杖阿拉伯弯刀青锋剑青布袍淑女剑紫霜血蝉衣软金束带穿花蛇影鞋魔鞭翩珑大红僧袍九环禅杖精铁棒毒蒺藜暗灵桃木剑横断钩银丝链甲衣天魔刀玉竹杖叫化鸡七星剑逆钩匕银丝甲天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭硫磺木戟黑袍粗布白袍长戟回旋镖拂尘松子白色棋子黑色棋子竹节鞭白棋子木叉银色丝带波斯长袍铁鞭竹刀长虹剑莲蓬鲤鱼窄裉袄灵芝锦衣台夷头巾毛毯废焦丹废药渣台夷头巾粉红绸衫岩鸽灰雁野山鸡麻雀瑶琴维吾尔族长袍旧书桃符纸木锤木钩竹鞭木刀木枪木剑彩巾彩靴彩帽彩带彩镯彩衣砍刀绣花鞋舞蝶彩衫军刀铁扇剑割鹿刀大理雪梨圆领小袄皮帽弯月刀兔肉粗磁大碗羊肉串天山雪莲青铜盾禅杖金刚罩丝质披风暗箭青葫芦松子铁斧水蜜桃蓑衣破弯刀柴刀丝衣长鞭道德经布裙钢丝甲衣牛皮带制服金刚杖斩空刀拜月掌套金弹子新月棍白蟒鞭-草莓玉蜂浆玉蜂蜜蜂浆瓶豆浆蛋糕菠菜粉条包裹鸡叫草水密桃--新月棍银簪重甲羊角匕梅花匕日月神教腰牌船篙-丝绸马褂白缨冠白色长袍蛇杖鬼头刀拐杖古铜缎子袄裙大环刀鹿皮手套丝绸衣羊毛裙牧羊鞭牛皮酒袋麻带钢剑钢杖藤甲盾长斗篷军袍破披风木盾铁盾锦缎腰带鞶革青色道袍-鲫鱼树枝水草破烂衣服-鹿皮小靴青绫绸裙粗布衣草帽草鞋布鞋精铁甲-柳玉刀玉竹剑钢刀戒刀单刀长剑长枪铁锤木棍轻罗绸衫兽皮鞋皮鞭铁棍飞镖匕首细剑绣鞋绣花小鞋狼皮雪靴金戒金手镯铁戒银戒铁手镯银手镯铁项链银项链';
var items_sell = '逆钩匕银丝甲羊角匕梅花匕重甲白蟒鞭精铁甲废药渣废焦丹单刀破披风长斗篷军袍羊毛斗篷丝质披风木盾牛皮带铁盾拜月掌套藤甲盾青铜盾麻带鞶革锦缎腰带树枝鲤鱼鲫鱼破烂衣服水草莲蓬七星宝戒长袍单刀岩鸽麻雀灰雁野山鸡八角锤细剑全真道袍匕首金弹子';
var items_store = '玫瑰花驻颜丹空识卷轴君影草矢车菊忘忧草仙客来雪英朝开暮落花夕雾草凤凰木熙颜花晚香玉凌霄花彼岸花洛神花百宜雪梅『秘籍木盒』黄金钥匙铂金钥匙赤璃钥匙曜玉钥匙『隐武竹笺』青木宝箱周年礼券长生石凤羽乾坤盾碎片紫贪狼戒碎片夜冥鬼泣碎片九霄渡业杖碎片胤天宝镯碎片山海羲皇靴碎片胤天宝戒碎片轩辕剑碎片九鼎宝链碎片傲世圣极剑碎片武皇惊霆刀碎片天雨玄镖碎片天武护镯碎片皇极圣战铠碎片凤麟天华衣碎片奉天金带碎片雷霆诛神刀碎片神龙怒火鞭碎片胤天宝帽碎片鱼肠碎片皇天无极盾碎片霸天圣袍碎片轰天巨棍碎片烛龙神武冕碎片无间诛魂鞭碎片天神杖碎片不周开天斧碎片胤天宝靴碎片倾宇破穹棍碎片胤天项链碎片金乌流云袖碎片昊天龙旋铠碎片水羽云裳碎片狂澜碎天锤碎片胤天紫金衣碎片驭风腾云碎片玄冰凝魄枪碎片紫枫玉华环碎片破岳拳套碎片灭魂匕碎片玄重铁分身卡鱼竿鱼饵百宝令玄铁令白银宝箱黄金宝箱装备打折卡碎片武穆遗书正邪令师门令帮派令状元贴江湖令';
var items_use = '长生石宝箱神鸢宝箱包月分身卡2倍周打坐卡寒玉床加速周卡周年英雄令周年热血令高级狂暴丹特级狂暴丹高级大还丹特级大还丹保险卡高级云梦青千年紫芝百年紫芝百年灵草千年灵草神秘宝箱热血令风云宝箱青凤纹绶';
var items_splite = '破军盾虎皮腰带羊毛斗篷沧海护腰宝玉甲夜行披风苍狼护臂青鸾护臂翎眼赤护';
var items_study = '御蜂术左手兵刃研习';
var items_useonce = '腊八粥百草美酒元宵年糕冰镇酸梅汤茉莉汤兰陵美酒九花玉露丸瑶池仙酿玄冰碧火酒玄冰碧火酒冰糖葫芦巧果儿';


function clearitem() {
	go_reset();
	var t = $("tr[bgcolor]:contains(两)").siblings();
	if (t.length > 0) {
		clearInterval(clb_time);
		for (var i = 0; i < t.length; i++) {
			if (t.eq(i)[0].innerText.replace(/\s+/g, "") != "") {
				var a = t.eq(i).find('td')[0].innerText.replace('\n', "");
				var b = parseInt(t.eq(i).find('td')[1].innerText.match(/\d+/g)[0]);
				var c = t[i].getAttribute('onclick').split("'")[1].split("info ")[1];
				if (items_store.indexOf(a) != -1) {
					console.log("存仓库：" + a + " 数量：" + b);
					od.push('items put_store ' + c)
				} else if (items_use.indexOf(a) != -1) {
					console.log("使用：" + a + " 数量：" + b);
					for (j = 0; j < b; j++) {
						od.push('items use ' + c)
					}
				} else if (items_useonce.indexOf(a) != -1) {
					console.log("使用：" + a + " 数量：" + b);
						od.push('items use ' + c)
				} else if (items_study.indexOf(a) != -1) {
					console.log("学习：" + a + " 数量：" + b);
					for (j = 0; j < b; j++) {
						od.push('study ' + c)
					}
				} else if (items_sell.indexOf(a) != -1) {
					console.log("卖掉：" + a + " 数量：" + b);
					for (j = 0; j < Math.floor(b / 10); j++) {
						od.push('items sell ' + c + '_N_10')
					}
					for (j = 0; j < (b % 10); j++) {
						od.push('items sell ' + c)
					}
				} else if (items_splite.indexOf(a) != -1) {
					console.log("分解：" + a + " 数量：" + b);
					for (j = 0; j < Math.floor(b / 10); j++) {
						od.push('items splite ' + c + '_N_10')
					}
					for (j = 0; j < (b % 10); j++) {
						od.push('items splite ' + c)
					}
				}
				if (a.indexOf('残页') != -1 ||a.indexOf('宝石') != -1 || a.indexOf('璞玉') != -1 || a.indexOf('青玉') != -1 || a.indexOf('墨玉') != -1 || a.indexOf('白玉') != -1) {
					console.log("存仓库：" + a + " 数量：" + b);
					od.push('items put_store ' + c)
				}
			}
		}
		od.push('prev');
		go_delay = 300;
		go_step()
	}
}
	// 自动答题
	var answerTrigger=0;
	function answerQuestionFunc(){
		if(answerTrigger==0){
			answerTrigger=1;
			overrideclick('look_room');
			clickButton('question', 0);
		}else{
			answerTrigger=0;
		}
	}
	//  四大绝杀------------------------------------------------------------------------------------------------------
	function Juesha(){ // 四大绝杀
		if(!mijingProtection()){
			return;
		}
		GoJuesha();
	}
	function GoJuesha(){
		go("jh 44;n;n;n;n;e;ne;ne;ne;n;n;n;n;n;nw;nw;nw;w;n;n;n;n;e;n;n;n;n;n;w;w;n;n;n;n;n;n;n;n;");
	}
//  十八木人------------------------------------------------------------------------------------------------------
	function Muren(){ // 十八木人
		if(!mijingProtection()){
			return;
		}
		GoMuren();
	}
	function GoMuren(){
		go("jh 41;se;e;e;se;se;se;se;se;se;event_1_57976870;n;n;n;event_1_91914705;e;e;e;");
	}
    //  破石寻花------------------------------------------------------------------------------------------------------
    function Poshi(){ // 破石寻花
        if(!mijingProtection()){
            return;
        }
        GoPoshi();
    }
    function GoPoshi(){
        go("jh 43;sw;sw;sw;s;se;se;se;e;s;sw;se;ne;se;s;e;e;e;ne;ne;ne;nw;nw;w;event_1_95874671");
        setTimeout(function(){Xunhua();},1000);
    }
  //  闻香寻芳------------------------------------------------------------------------------------------------------
    function Xunhua(){ // 闻香寻芳
        if(!mijingProtection()){
            return;
        }
        GoXunhua();
    }

    function GoXunhua(){
        go("jh 43;sw;sw;sw;s;se;se;se;e;s;sw;se;ne;se;s;e;e;e;ne;se;s;s;sw;sw;sw");
    }
    //  佳人觅香------------------------------------------------------------------------------------------------------
    function Jiaren(){ // 佳人觅香
        if(!mijingProtection()){
            return;
        }
        GoJiaren();
    }
    function GoJiaren(){
        go("jh 32;n;n;se;e;s;s;look_npc murong_azhu;event_1_99232080;e;e;s;e;s;e;e;e;look_npc murong_fangling;event_1_2207248");
    }
	//  破障除魔------------------------------------------------------------------------------------------------------
	function PoZhangChuMo(){ // 破障除魔
		if(!mijingProtection()){
			return;
		}
		GoPoZhangChuMo();
	}
	function GoPoZhangChuMo(){
		go("jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;n;n;n;e;e;event_1_94442590;event_1_85535721");
	}
	//  大乘忘武------------------------------------------------------------------------------------------------------
	function DaChengWangWu(){ // 破障除魔
		if(!mijingProtection()){
			return;
		}
		GoDaChengWangWu();
	}
	function GoDaChengWangWu(){
		go("jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;n;n;n;w;w;event_1_57281457;event_1_71997825");
	}
// 苗疆炼药 ------------------------------------------------------------------------------------------------------
	function Miaojianglianyao(){ // 苗疆炼药
		if(!mijingProtection()){
			return;
		}
		GoToCanglangjiang();
	}
	function GoToCanglangjiang(){
		go("jh 40;s;s;s;s;e;s;se;sw;s;sw;e;e;sw;se;sw;se;event_1_8004914");
		GoToLianyaoshi();
	}
	function GoToLianyaoshi(){
		if(!hasGoToEnd()){
			setTimeout(GoToLianyaoshi,300);
			return;
		}
		if(g_obj_map.get("msg_room").get("short")!="澜沧江南岸"){
			GoToCanglangjiang();
		}else{
			go("se;s;s;e;n;n;e;s;e;ne;s;sw;e;e;ne;ne;nw;ne;ne;n;n;w;lianyao");
			DoLianyao();
		}
	}
	function DoLianyao(){
		if(!hasGoToEnd()){
			setTimeout(DoLianyao,300);
			return;
		}
		setTimeout(LianYaoIt,400);
	}
	function LianYaoIt(){
		if ($('span:contains(炼药需要毒琥珀和毒藤胶，你还没有)').length>0)		{
			go('shop money_buy mny_shop9_N_10;shop money_buy mny_shop10_N_10;lianyao');
			$('span:contains(炼药需要毒琥珀和毒藤胶，你还没有)').text("炼药需要毒琥珀和毒藤胶，刚买了10组")
			setTimeout(LianYaoIt, 2000);
		}else if($('span:contains(炼药的丹炉已经是滚得发烫)').length>0){
			clickButton('home');
		}else{
			clickButton('lianyao');
			setTimeout(LianYaoIt, 2000);
		}
	}
	//  天山打坐------------------------------------------------------------------------------------------------------
	function TianShanDaZuo(){ // 天山打坐
		if(!mijingProtection()){
			return;
		}
		overrideclick('jh');
		if (g_obj_map.get("msg_jh_list")==undefined){
			setTimeout(function(){TianShanDaZuo();},500);
		}else{
			go("items");
			gocloth()
		}
	}
	function gocloth(){
		if(!g_obj_map.get("msg_items")){
			setTimeout(function(){gocloth();},200)
			return;
		}
		//先判断是不是有衣服了
		var hasCloth=false;
		$(g_obj_map.get("msg_items").elements).each(function(i,ele){
			if(ele.key.indexOf("items")>-1 && ele.value.indexOf("yuhanyi,")==0){
				hasCloth=true;
			}
		});
		if(!hasCloth){
			go('jh 1;e;n;n;w;event_1_24319712');
		}
		gogetshouyu();
	}
	function gogetshouyu(){
		var jhlist=g_obj_map.get("msg_jh_list").get("finish16");
		if (jhlist!=undefined&&jhlist!=0){
			window.singleBattleTrigger=1;
			window.singleBattleInstance=new window.singleBattle(function(){goTianshan();});
			go('jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w;event_1_57688376;n;n;e;n;event_1_88625473;event_1_82116250;event_1_90680562;event_1_38586637;fight xiaoyao_tonglao');
			g_gmain.notify_fail(HIG+"掌门手谕"+NOR);
		}
	}
	function goTianshan(){
		go('jh 39;ne;e;n;ne;ne;n;ne;nw;event_1_58460791');
		tianshanPanshanshen();
	}
	function tianshanPanshanshen(){
		if (g_obj_map.get("msg_room")==undefined){
			setTimeout(function(){tianshanPanshanshen();},200);
		}else if(cmdlist.length==0){
			if(g_obj_map.get("msg_room").get("short")=="雪谷"){
				go('se;s;e;n;ne;nw;event_1_58460791');
				setTimeout(function(){tianshanPanshanshen();},500);
			}else if(g_obj_map.get("msg_room").get("short")=="失足岩"){
				go('nw;n;ne;nw;nw;w;n;n;n;e;e;s;give tianshan_hgdz;ask tianshan_hgdz;ask tianshan_hgdz;s;event_1_34855843');
			}
		}else{
			setTimeout(function(){tianshanPanshanshen();},500);
		}
	}


    //  天山日常------------------------------------------------------------------------------------------------------
    function TianShanfuqishi(){ // 天山
        if(!mijingProtection()){
            return;
        }
        go('jh 39;ne;e;n;ne;ne;n;ne;nw;ne;nw;event_1_17801939');
        tianshanPanshanshen1();
    }
    function tianshanPanshanshen1(){
        if (g_obj_map.get("msg_room")==undefined){
            setTimeout(function(){tianshanPanshanshen1();},200);
        }else if(cmdlist.length==0){
            if(g_obj_map.get("msg_room").get("short")=="雪谷"){
                go('se;s;e;n;ne;nw;ne;nw;event_1_17801939');
                setTimeout(function(){tianshanPanshanshen1();},800);
            }else if(g_obj_map.get("msg_room").get("short")=="星星峡"){
                go('ne;ne;nw;nw');
            }
        }else{
            setTimeout(function(){tianshanPanshanshen1();},500);
        }
    }

	// 大招壁画 ------------------------------------------------------------------------------------------------------
	var DaZhaoBiHuastep=0;
	function DaZhaoBiHua(){ // 大招壁画
		if(!mijingProtection()){
			return;
		}
		overrideclick('jh');
		if (g_obj_map.get("msg_jh_list")==undefined){
			setTimeout(function(){DaZhaoBiHua();},500);
		}else{
			go("jh 26;w;w;n;w;w;w");
			gobihua();

		}
	}
	var directions=["west","east","north","south","northwest","northeast","southwest","southeast"];
	var bihuataopaoTrigger=0;
	function gobihua(){
		if(!g_obj_map.get("msg_room")){
			setTimeout(function(){gobihua();},500);
		}else if(cmdlist.length>0){
			setTimeout(function(){gobihua();},100);
		}else if(g_obj_map.get("msg_room").get("short")=="阴山密林"||g_obj_map.get("msg_room").get("short")=="狼山"){
			bihuataopaoTrigger=1;
			for(var i=0;i<directions.length;i++){
				if(g_obj_map.get("msg_room").get(directions[i])=="阴山密林"){
					overrideclick("go "+directions[i]);
					break;
				}
			}
			gobihua();
		}else if(g_obj_map.get("msg_room").get("short")=="阴山古刹"){
			DaZhaoBiHua();
		}else if(g_obj_map.get("msg_room").get("short")=="狼山"){//头狼不杀人后遗症
			DaZhaoBiHua();
		}else if(g_obj_map.get("msg_room").get("short")=="阴山岩画"){
			bihuataopaoTrigger=0;
			go('event_1_12853448;home');
            setTimeout(function(){ShiJianFunc();},5000);
		}else{
			setTimeout(function(){gobihua();},500);
		}
	}
	var bihuataopaoTimer=null;
	function Bihuataopao(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type=="vs"&&subType=="vs_info"){ //这是进入战斗的提示
				Bihuataopaoescapeloop();
				clearInterval(bihuataopaoTimer);
                setTimeout(autoSkill,500);
				bihuataopaoTimer=setInterval(autoSkill,1000);
			}else if (type=="vs"&&subType=="combat_result"){
				clearInterval(bihuataopaoTimer);
				DaZhaoBiHua();
			}
		}
	}
	function Bihuataopaoescapeloop(){
		neigongPlayCount=0;
		overrideclick('escape', 0) //循环逃跑判定
		if (bihuataopaoTrigger==1)
		setTimeout(function(){Bihuataopaoescapeloop();},500);
	}
	var bihuataopao=new Bihuataopao();

	// 本六高突门神 ------------------------------------------------------------------------------------------------------
function Benliugaotu(){ // 本六门神
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        go("home");
        setTimeout(function(){DaZhaoBiHua();},5000);
    });
     go("fb 6;event_1_74386803;kill changleweiyang_wunvling");
    });
     go("fb 6;event_1_18437151;kill changleweiyang_yulinwei");
    });
    go("fb 6;event_1_94101353;kill changleweiyang_huagmencheng");
    });
    go("fb 6;event_1_8221898;kill changleweiyang_taishuling");
}


// 打铜人 ------------------------------------------------------------------------------------------------------
	function DaTongRen(){
		if(!mijingProtection()){
			return;
		}
		window.singleBattleTrigger=1;
		window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                go("home");
            });
//            go("n;n;e;e;e;e;e;e;e;e;s;s;auto_equip off;enable mapped_skills restore go 3;prev;event_1_35095441;enable mapped_skills restore go 1;auto_equip on");
            go("s;s;e;e;e;e;e;e;e;e;n;n;event_1_35095441");
        });
//		go("clan scene;clan zsdg enter;n;n;n;n;n;auto_equip off;enable mapped_skills restore go 3;prev;event_1_14757697;enable mapped_skills restore go 1;auto_equip on");
        go("clan zsdg enter;n;n;n;n;n;event_1_14757697");
	}

// 少林伏魔------------------------------------------------------------------------------------------------------
function slfm(){ // 少林伏魔
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        //go("home");
        setTimeout(function(){mjdm();},5000);
    });
    go("daily go 15;event_1_38874360;kill shaolin_dufengshenshi");
}

// 明教毒魔------------------------------------------------------------------------------------------------------
function mjdm(){ // 少林伏魔
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        //go("home");
        setTimeout(function(){TianShanfuqishi();},5000);
    });
    go("jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;n;n;n;n;w;nw;nw;event_1_15705584;event_1_70957287;kill mingjiao_jiuyoudumo");
}

// 白驼奇袭------------------------------------------------------------------------------------------------------
function btqx(){ // 白驼奇袭
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    go("home");
                    setTimeout(function(){slfm();},5000);
                });
                go("w;w;w;nw;w;nw;event_1_89411813;kill baituo_xieli");
            });
            go("s;s;se;e;e;e;kill baituo_yingjunzhushuai");
        });
        go("s;s;nw;n;n;kill baituo_hujunzhushuai");
    });
    go("daily go 16;event_1_53430818;n;kill baituo_baojunshiwei");
}

    // 峨眉军令------------------------------------------------------------------------------------------------------
function em(){ // 峨眉军令
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                go("s;e;event_1_53216521;w;n;event_1_19360932 go;home");
                setTimeout(function(){btqx();},5000);
            });
            go("n;n;kill emei_qili");
        });
       go("n;e;s;kill emei_heiyudijiang");
    });
    go("daily go 13;event_1_55885405;w;w;s;kill emei_abaojia");
}

	// 峨眉恒山 ------------------------------------------------------------------------------------------------------
function emhs(){ // 峨眉恒山
    if(!mijingProtection()){
        return;
    }
   window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
     window.singleBattleTrigger=1;
      window.singleBattleInstance=new window.singleBattle(function(){
       window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
         window.singleBattleTrigger=1;
          window.singleBattleInstance=new window.singleBattle(function(){
            go("home")
            setTimeout(function(){em();},5000);
             });
           go("jh 9;event_1_20960851;kill henshan_shashenzhaifeishou");
        });
           go("n;n;kill emei_jinlangdajiang");
        });
        go("n;n;kill emei_heiyingsishi");
    });
    go("jh 8;ne;e;e;e;n;kill emei_chibaosishi");
}

// 一键龙盾 ------------------------------------------------------------------------------------------------------
function qingcheng(){ // 青城白驼
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    window.singleBattleTrigger=1;
                    window.singleBattleInstance=new window.singleBattle(function(){
                        go("home")
                        setTimeout(function(){emhs();},5000);
                    });
                    go("jh 15;n;nw;w;nw;n;event_1_14401179;kill qingcheng_nielongzhiling");
                });
                go("w;fight baituo_junzhongzhushuai")
            });
           go("w;kill baituo_yinlangjinwei")
        });
        go("w;kill baituo_feiyushenjian")
    });
     go("jh 21;n;n;n;n;w;kill baituo_qingyidunwei");
}

// 跨本1自动 ---------------------------
function kuaben1(){
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    window.singleBattleTrigger=1;
                    window.singleBattleInstance=new window.singleBattle(function(){
                        window.singleBattleTrigger=1;
                        window.singleBattleInstance=new window.singleBattle(function(){
                            window.singleBattleTrigger=1;
                            window.singleBattleInstance=new window.singleBattle(function(){
                                window.singleBattleTrigger=1;
                                window.singleBattleInstance=new window.singleBattle(function(){
                                    window.singleBattleTrigger=1;
                                    window.singleBattleInstance=new window.singleBattle(function(){
                                        window.singleBattleTrigger=1;
                                        window.singleBattleInstance=new window.singleBattle(function(){
                                            window.singleBattleTrigger=1;
                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                window.singleBattleTrigger=1;
                                                window.singleBattleInstance=new window.singleBattle(function(){
                                                    window.singleBattleTrigger=1;
                                                    window.singleBattleInstance=new window.singleBattle(function(){
                                                        window.singleBattleTrigger=1;
                                                        window.singleBattleInstance=new window.singleBattle(function(){
                                                            window.singleBattleTrigger=1;
                                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                                window.singleBattleTrigger=1;
                                                                window.singleBattleInstance=new window.singleBattle(function(){
                                                                    window.singleBattleTrigger=1;
                                                                    window.singleBattleInstance=new window.singleBattle(function(){
                                                                        window.singleBattleTrigger=1;
                                                                        window.singleBattleInstance=new window.singleBattle(function(){
                                                                            window.singleBattleTrigger=1;
                                                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                                                window.singleBattleTrigger=1;
                                                                                window.singleBattleInstance=new window.singleBattle(function(){
                                                                                    window.singleBattleTrigger=1;
                                                                                    window.singleBattleInstance=new window.singleBattle(function(){
                                                                                        window.singleBattleTrigger=1;
                                                                                        window.singleBattleInstance=new window.singleBattle(function(){
                                                                                            go("w;event_1_63703896");
                                                                                        });
                                                                                        go("e;e;kill jiwutan_sanlaoshicong");
                                                                                    });
                                                                                    go("s;w;kill jiwutan_sanlaoshicong");
                                                                                });
                                                                                go("n;kill jiwutan_sanlaoshicong");
                                                                            });
                                                                            go("n;kill jiwutan_sanlaoshicong");
                                                                        });
                                                                        go("e;sw;event_1_40536215;kill jiwutan_sanlaoshicong");
                                                                    });
                                                                    go("ne;se;ne;w;kill jiwutan_daoxing");
                                                                });
                                                                go("s;sw;kill jiwutan_dianxing");
                                                            });
                                                            go("se;sw;nw;n;kill jiwutan_huokuang");
                                                        });
                                                        go("w;nw;kill jiwutan_diehun");
                                                    });
                                                    go("sw;e;kill jiwutan_xiaori");
                                                });
                                                go("s;ne;kill jiwutan_shouxu");
                                            });
                                            go("e;se;ne;n;kill jiwutan_yinbao");
                                        });
                                        go("sw;w;kill jiwutan_jinxi");
                                    });
                                    go("w;ne;kill jiwutan_zuifa");
                                });
                                go("nw;sw;nw;e;kill jiwutan_xuetong");
                            });
                            go("se;kill jiwutan_kunpeng");
                        });
                        go("se;se;ne;kill jiwutan_shiergongmenren");
                    });
                    go("nw;kill jiwutan_tianhai");
                });
                go("nw;kill jiwutan_shiergongmenren")
            });
           go("e;e;e;nw;w;kill jiwutan_jiwutandizi")
        });
        go("e;kill jiwutan_shiergongmenren")
    });
     go("fb 1;w;s;e;kill jiwutan_jiwutandizi");
}

// 跨本3自动 ---------------------------
function kuaben3(){
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    window.singleBattleTrigger=1;
                    window.singleBattleInstance=new window.singleBattle(function(){
                        window.singleBattleTrigger=1;
                        window.singleBattleInstance=new window.singleBattle(function(){
                            window.singleBattleTrigger=1;
                            window.singleBattleInstance=new window.singleBattle(function(){
                                window.singleBattleTrigger=1;
                                window.singleBattleInstance=new window.singleBattle(function(){
                                    window.singleBattleTrigger=1;
                                    window.singleBattleInstance=new window.singleBattle(function(){
                                        window.singleBattleTrigger=1;
                                        window.singleBattleInstance=new window.singleBattle(function(){
                                            window.singleBattleTrigger=1;
                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                window.singleBattleTrigger=1;
                                                window.singleBattleInstance=new window.singleBattle(function(){
                                                    window.singleBattleTrigger=1;
                                                    window.singleBattleInstance=new window.singleBattle(function(){
                                                        window.singleBattleTrigger=1;
                                                        go("event_1_26550007;kill zhenwuwendao_jiuwushenjiang");
                                                    });
                                                    go("n;kill zhenwuwendao_ruijinshi");
                                                });
                                                go("n;kill zhenwuwendao_qingmushi");
                                            });
                                            go("n;kill zhenwuwendao_heishuishi");
                                        });
                                        go("n;kill zhenwuwendao_liehuoshi");
                                    });
                                    go("n;kill zhenwuwendao_houtushi");
                                });
                                go("n;kill zhenwuwendao_qiantianwushi");
                            });
                            go("n;kill zhenwuwendao_kundiwushi");
                        });
                        go("n;kill zhenwuwendao_xunfengwushi");
                    });
                    go("n;kill zhenwuwendao_zhenleiwushi");
                });
                go("n;kill zhenwuwendao_kanshuiwushi")
            });
           go("n;kill zhenwuwendao_lihuowushi")
        });
        go("n;kill zhenwuwendao_genshanwushi")
    });
     go("fb 3;kill zhenwuwendao_duizewushi");
}

function youming11(){ // 本11自动
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    window.singleBattleTrigger=1;
                    window.singleBattleInstance=new window.singleBattle(function(){
                        window.singleBattleTrigger=1;
                        window.singleBattleInstance=new window.singleBattle(function(){
                            window.singleBattleTrigger=1;
                            window.singleBattleInstance=new window.singleBattle(function(){
                                window.singleBattleTrigger=1;
                                window.singleBattleInstance=new window.singleBattle(function(){
                                    window.singleBattleTrigger=1;
                                    window.singleBattleInstance=new window.singleBattle(function(){
                                        window.singleBattleTrigger=1;
                                        window.singleBattleInstance=new window.singleBattle(function(){
                                            window.singleBattleTrigger=1;
                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                window.singleBattleTrigger=1;
                                                window.singleBattleInstance=new window.singleBattle(function(){
                                                    window.singleBattleTrigger=1;
                                                    window.singleBattleInstance=new window.singleBattle(function(){
                                                        window.singleBattleTrigger=1;
                                                        window.singleBattleInstance=new window.singleBattle(function(){
                                                            window.singleBattleTrigger=1;
                                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                                window.singleBattleTrigger=1;
                                                                window.singleBattleInstance=new window.singleBattle(function(){
                                                                    go("n")
                                                                });
                                                                go("e;kill ymsz_houyuan_guisha");
                                                            });
                                                            go("s;e;kill ymsz_houyuan_guisha");
                                                        });
                                                        go("n;kill ymsz_houyuan_youmingguisha");
                                                    });
                                                    go("e;kill ymsz_houyuan_guisha");
                                                });
                                                go("n;e;kill ymsz_houyuan_guisha");
                                            });
                                            go("s;kill ymsz_houyuan_youmingguisha");
                                        });
                                        go("e;e;kill ymsz_houyuan_guisha");
                                    });
                                    go("w;kill ymsz_houyuan_youmingguisha");
                                });
                                go("s;kill ymsz_houyuan_guisha");
                            });
                            go("s;kill ymsz_houyuan_guisha");
                        });
                        go("w;s;kill ymsz_houyuan_guisha");
                    });
                    go("e;e;kill ymsz_houyuan_youmingguisha");
                });
                go("w;kill ymsz_houyuan_youmingguisha")
            });
           go("s;kill ymsz_houyuan_guisha")
        });
        go("se;kill ymsz_houyuan_guisha")
    });
     go("jh 45;ne;ne;n;n;ne;ne;e;ne;n;n;n;n;n;ne;ne;n;n;n;nw;nw;n;e;e;e;e;e;event_1_77775145 ymsz_houyuan;se;kill ymsz_houyuan_guisha");
}

function youming10(){ // 本10自动
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    window.singleBattleTrigger=1;
                    window.singleBattleInstance=new window.singleBattle(function(){
                        window.singleBattleTrigger=1;
                        window.singleBattleInstance=new window.singleBattle(function(){
                            window.singleBattleTrigger=1;
                            window.singleBattleInstance=new window.singleBattle(function(){
                                window.singleBattleTrigger=1;
                                window.singleBattleInstance=new window.singleBattle(function(){
                                    window.singleBattleTrigger=1;
                                    window.singleBattleInstance=new window.singleBattle(function(){
                                        window.singleBattleTrigger=1;
                                        window.singleBattleInstance=new window.singleBattle(function(){
                                            window.singleBattleTrigger=1;
                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                window.singleBattleTrigger=1;
                                                window.singleBattleInstance=new window.singleBattle(function(){
                                                    window.singleBattleTrigger=1;
                                                    window.singleBattleInstance=new window.singleBattle(function(){
                                                        window.singleBattleTrigger=1;
                                                        window.singleBattleInstance=new window.singleBattle(function(){
                                                        });
                                                        go("sw;kill ymsz_huayuan_yuwenxiu");
                                                    });
                                                    go("nw;sw;kill ymsz_huayuan_baiguxiushi");
                                                });
                                                go("se;kill ymsz_huayuan_xuejianke");
                                            });
                                            go("sw;kill ymsz_huayuan_baiguxiushi");
                                        });
                                        go("w;sw;kill ymsz_huayuan_baiguxiushi");
                                    });
                                    go("e;kill ymsz_huayuan_xuejianke");
                                });
                                go("se;kill ymsz_huayuan_baiguxiushi");
                            });
                            go("sw;se;kill ymsz_huayuan_baiguxiushi");
                        });
                        go("ne;kill ymsz_huayuan_xuejianke");
                    });
                    go("se;ne;kill ymsz_huayuan_baiguxiushi");
                });
                go("nw;kill ymsz_huayuan_xuejianke")
            });
           go("ne;kill ymsz_huayuan_baiguxiushi")
        });
        go("e;kill ymsz_huayuan_baiguxiushi")
    });
     go("jh 45;ne;ne;n;n;ne;ne;e;ne;n;n;n;n;n;ne;ne;n;n;n;nw;nw;n;e;e;e;e;e;event_1_77775145 ymsz_huayuan;e;kill ymsz_huayuan_baiguxiushi");
}


//前院自动
function youming9(){ // 前院自动
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    window.singleBattleTrigger=1;
                    window.singleBattleInstance=new window.singleBattle(function(){
                        window.singleBattleTrigger=1;
                        window.singleBattleInstance=new window.singleBattle(function(){
                            window.singleBattleTrigger=1;
                            window.singleBattleInstance=new window.singleBattle(function(){
                                window.singleBattleTrigger=1;
                                window.singleBattleInstance=new window.singleBattle(function(){
                                    window.singleBattleTrigger=1;
                                    window.singleBattleInstance=new window.singleBattle(function(){
                                        window.singleBattleTrigger=1;
                                        window.singleBattleInstance=new window.singleBattle(function(){
                                            window.singleBattleTrigger=1;
                                            window.singleBattleInstance=new window.singleBattle(function(){
                                                go("home");
                                            });
                                            go("e;kill ymsz_qianyuan_jupeng");
                                        });
                                        go("s;kill ymsz_qianyuan_jiangyishashou");
                                    });
                                    go("s;kill ymsz_qianyuan_jiangyishashou");
                                });
                                go("sw;s;kill ymsz_qianyuan_jiangyishashou");
                            });
                            go("ne;kill ymsz_qianyuan_jiangyijianke");
                        });
                        go("e;kill ymsz_qianyuan_jiangyishashou");
                    });
                    go("n;e;kill ymsz_qianyuan_jiangyishashou");
                });
                go("s;s;kill ymsz_qianyuan_jiangyijianke")
            });
           go("n;kill ymsz_qianyuan_jiangyijianke")
        });
        go("e;kill ymsz_qianyuan_jiangyishashou")
    });
     go("jh 45;ne;ne;n;n;ne;ne;e;ne;n;n;n;n;n;ne;ne;n;n;n;nw;nw;n;e;e;e;e;e;event_1_77775145 ymsz_qianyuan;e;kill ymsz_qianyuan_jiangyishashou");
}

//本8自动三路
function ben8(){
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            window.singleBattleTrigger=1;
            window.singleBattleInstance=new window.singleBattle(function(){
                window.singleBattleTrigger=1;
                window.singleBattleInstance=new window.singleBattle(function(){
                    window.singleBattleTrigger=1;
                    window.singleBattleInstance=new window.singleBattle(function(){
                        window.singleBattleTrigger=1;
                        go("n;kill jiandangfenglingdu_bailishang");
                    });
                    go("home;fb 8;n;kill jiandangfenglingdu_yeshang");
                });
                go("w;kill jiandangfenglingdu_zhuyezhanglao")
            });
           go("home;fb 8;w;kill jiandangfenglingdu_yesha")
        });
        go("s;kill jiandangfenglingdu_qianyecijiang")
    });
     go("fb 8;s;kill jiandangfenglingdu_yeci");
}


// 冰月谷 ------------------------------------------------------------------------------------------------------
function BingYueGu(){ // 自动冰月
    if(!mijingProtection()){
        return;
    }
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
    window.singleBattleTrigger=1;
    window.singleBattleInstance=new window.singleBattle(function(){
      window.singleBattleTrigger=1;
      window.singleBattleInstance=new window.singleBattle(function(){
        window.singleBattleTrigger=1;
        window.singleBattleInstance=new window.singleBattle(function(){
            go("home");
            setTimeout(function(){Benliugaotu();},5000);
            });
            go("s;kill bingyuegu_bingyuexianren");
            });
            go("event_1_17623983;event_1_6670148;kill bingyuegu_hundunyaoling");
        });
        go("event_1_55319823;kill bingyuegu_xuanwujiguanshou");
    });
    go("jh 14;w;n;n;n;n;event_1_32682066;event_1_35756630;kill bingyuegu_yueyihan");
}

	//日常潜能
	function CheckIn4(){
		if(!mijingProtection()){
			return;
		}
		g_gmain.notify_fail(HIG+"开始领取日常潜能"+NOR);
//		overrideclick("daily finish 11");//唐门试炼
		overrideclick("jh");
		overrideclick('cangjian get_all'); // 一键领取闯楼奖励
		overrideclick("xueyin_shenbinggu unarmed get_all\n");
        overrideclick("xueyin_shenbinggu hammer get_all\n");
		overrideclick("xueyin_shenbinggu blade get_all\n");
		overrideclick("xueyin_shenbinggu throwing get_all\n");
        overrideclick("xueyin_shenbinggu spear get_all\n");
		overrideclick("xueyin_shenbinggu stick get_all\n");
		overrideclick("xueyin_shenbinggu staff get_all\n");
        overrideclick("xueyin_shenbinggu axe get_all\n");
		overrideclick("xueyin_shenbinggu whip get_all\n");
		overrideclick("jh 37");
		overrideclick("go north");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("go northwest");
		overrideclick("go northwest");
		overrideclick("go west");
		overrideclick("go north");
		overrideclick("go east");
		overrideclick("go north");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("go northeast");
		overrideclick("go northeast");
		overrideclick("go northeast");
		overrideclick("go southeast");
		overrideclick("go north");
		overrideclick('event_1_97487911');
		overrideclick("jh 36");
		overrideclick('yell',0);
		xiakedao2();
	}
	//武馆签到
	function CheckIn3(){
		if(!mijingProtection()){
			return;
		}
		g_gmain.notify_fail(HIG+"开始武馆签到"+NOR);
        go("jh 1;w;event_1_46497436;e;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;event_1_29721519;event_1_60133236;home");
	}
	//特殊签到
	function CheckIn5(){
        go("jh 1;e;n;e;e;e;e;n;lq_bysf_lb;lq_lmyh_lb;lq_dlth_lb;home");//柳绘心礼包
        go("jh 2;n;n;n;n;w;s;lq_chunhui_lb;home");//红娘礼包
        go("jh 2;n;n;n;n;n;n;n;lq_xiangshou_lb;lq_chunhui_lb;lq_fuai_lb;lq_zongzi_lb;lq_junhun_lb;lq_guishen_lb;lq_shoudao_lb;home");//卖花姑娘礼包
	}
	//洛阳扬州
	function CheckIn2(){
		if(!mijingProtection()){
			return;
		}
		g_gmain.notify_fail(HIG+"开始洛阳签到"+NOR);
		overrideclick("jh 2");
		overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go east");
		overrideclick("tzjh_lq");
		overrideclick("go west");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go east");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go west");overrideclick("event_1_31320275");
        overrideclick("home");
		g_gmain.notify_fail(HIG+"开始扬州签到"+NOR);
		overrideclick('jh 5');       // 进入章节
		overrideclick('go north');     // 南门大街
		overrideclick('go north');   // 十里长街3
        overrideclick('go east');   // 小宝在
        overrideclick("look_npc yangzhou_yangzhou9");
        startShuanger();
	}
	function startShuanger(){
		console.log("startShuanger");
		var npc=g_obj_map.get("msg_npc");
		if (npc==undefined){
			setTimeout(startShuanger,500);
		}else if(npc.get("id")!="yangzhou_yangzhou9"){
			setTimeout(startShuanger,500);
		}else{
			for (var i=1;i<10;i++){
				console.log(npc.get("cmd"+i+"_name"));
				if (npc.get("cmd"+i+"_name")==undefined)
					break;
				if (npc.get("cmd"+i+"_name").match("礼包")!=null)
					overrideclick(npc.get("cmd"+i));
			}
            overrideclick('go west');   // 十里长街3
            overrideclick('go north');    // 十里长街2
            overrideclick('go west');    // 黄鸡货铺
            overrideclick('sign7');
            overrideclick("home");
		}
	}

//一键VIP
function shimenvipFunc(){
overrideclick('vip drops');//通勤
overrideclick('shop money_buy mny_shop1_N_10');//引路蜂
overrideclick('fudi houshan fetch');//府邸桃园
overrideclick('fudi juxian fetch_zhuguo');//府邸侠客果子
for (i=0; i<100; i++)
    {
overrideclick('vip finish_family');//师门
}

for (i=0; i<60; i++)
    {
overrideclick('vip finish_clan');//帮派60次
 }
for (i=0; i<10; i++)
    {
overrideclick('vip finish_big_task');//谜题暴击10次
 }
for (i=0; i<10; i++)
    {
overrideclick('vip finish_dig');//挖宝10次
 }
for (i=0; i<10; i++)
    {
overrideclick('vip finish_diaoyu');//钓鱼10次
 }
for (i=0; i<3; i++)
    {
overrideclick('vip finish_fb dulongzhai');//独龙寨3次
 }
for (i=0; i<3; i++)
    {
overrideclick('vip finish_fb junying');//军营3次
 }
for (i=0; i<3; i++)
    {
overrideclick('vip finish_fb beidou');//北斗七星3次
 }
for (i=0; i<3; i++)
    {
overrideclick('vip finish_fb youling');//幽灵山庄3次
 }
for (i=0; i<2; i++)
    {
overrideclick('vip finish_fb siyu');//四御教派2次
 }
for (i=0; i<2; i++)
    {
overrideclick('vip finish_fb changleweiyang');//长乐未央2次
 }
for (i=0; i<2; i++)
    {
overrideclick('vip finish_fb heishuihuangling');//黑水皇陵2次
 }
for (i=0; i<2; i++)
    {
overrideclick('vip finish_fb jiandangfenglingdu');//剑荡风陵渡2次
 }
for (i=0; i<10; i++)
    {
overrideclick('clan buy 101');//帮派购买引路蜂10次
 }
for (i=0; i<2; i++)
    {
overrideclick('clan buy 201');//帮派2级物品购买
overrideclick('clan buy 202');
 }
for (i=0; i<5; i++)
    {
overrideclick('clan buy 301');//帮派3级物品购买
overrideclick('clan buy 302');
 }
overrideclick('clan buy 401');//帮派4级物品购买
overrideclick('clan buy 501');//帮派5级物品购买
for (i=0; i<1; i++)
    {
overrideclick('clan buy 601');//空识1次
 }

for (i=0; i<10; i++)
    {
overrideclick('clan buy 703');//狗卷十次
}
clickButton('home');//回主页
}

	//逢义礼包
	function CheckIn1(){
		if(!mijingProtection()){
			return;
		}
		g_gmain.notify_fail(HIG+"开始领取分享奖励和逢义礼包"+NOR);
		overrideclick("share_ok 1");
		overrideclick("share_ok 2");
		overrideclick("share_ok 3");
		overrideclick("share_ok 4");
		overrideclick("share_ok 5");
		overrideclick("share_ok 7");
		scanEscapedFish();
		fengyi();
		console.log('签到一次！');
	}

	function fengyi(){//逢义礼包
		overrideclick("exercise stop");
		overrideclick("exercise");
		overrideclick("jh 1");
        overrideclick('zhongqiu_lb');
		overrideclick('zhounian_lb');
        overrideclick('lq_nangua_lb');
        overrideclick('event_1_82393002');
        overrideclick('event_1_26477782');
		overrideclick("look_npc snow_mercenary");
		startFengyi();
	}
	function startFengyi(){
		console.log("fengyi");
		var npc=g_obj_map.get("msg_npc");
		if (npc==undefined){
			setTimeout(startFengyi,500);
		}else if(npc.get("id")!="snow_mercenary"){
			setTimeout(startFengyi,500);
		}else{
			for (var i=1;i<10;i++){
				console.log(npc.get("cmd"+i+"_name"));
				if (npc.get("cmd"+i+"_name")==undefined)
					break;
				if (npc.get("cmd"+i+"_name").match("礼包")!=null&&npc.get("cmd"+i+"_name").match("1元")==null&&npc.get("cmd"+i+"_name").match("兑换")==null)
					overrideclick(npc.get("cmd"+i));
			}
		}
	}

	function xiakedao2(){
		if (g_obj_map.get("msg_room")==undefined){
			setTimeout(function(){xiaokedao2();},200);
		}else{
			var locationname=g_obj_map.get("msg_room").get("short");
				if((locationname=="侠客岛渡口")){
					overrideclick("go east");overrideclick("go northeast");overrideclick("go northeast");overrideclick("go northeast");
					overrideclick("go east");overrideclick("go east");overrideclick("go east");overrideclick('event_1_9179222');
					overrideclick("go east");overrideclick('event_1_11720543');
					overrideclick("go west");overrideclick("go north");overrideclick("go east");overrideclick("go east");
					overrideclick("go south");overrideclick("go east");overrideclick('event_1_44025101');
					g_gmain.notify_fail(HIG+"看书结束，准备跳瀑布"+NOR);
					setTimeout(function(){xiakedao3();},500);
				}else{
					setTimeout(function(){xiakedao2();},500);
				}
		}
	}
	var curstamp=0;
	var prestamp=0;
	var cmdlist=[];

	var deadlock=0;
	function overrideclick(cmd){
		deadlock=1;
		cmdlist.push(cmd);
		//console.log(cmdlist);
		deadlock=0;
	}

	function newoverrideclick(){
		if (cmdlist.length==0){
			setTimeout(function(){newoverrideclick();},10);
		}else{
			if (cmdlist.length>0&&deadlock==1){//有指令写入 不动数组
				setTimeout(function(){newoverrideclick();},10);
			}else if(deadlock==0&&cmdlist.length>0){
				curstamp=(new Date()).valueOf();
				if ((curstamp-prestamp)>200){
					if (cmdlist.length!=0){
						//console.log("发送指令"+cmdlist[0]);
						if (qiangdipiTrigger==0){//我没有在抢物品，那么所有get带1的指令全被无视
							if (cmdlist[0].match("get1")==null){
								clickButton(cmdlist[0]);
								cmdlist.shift();
								prestamp=curstamp;
							}else{
								cmdlist.shift();
								prestamp=curstamp;
							}
						}else if (qiangdipiTrigger==1){
							if (cmdlist[0].match("get1")==null){
								clickButton(cmdlist[0]);
								cmdlist.shift();
								prestamp=curstamp;
							}else{
								if (knownlist.indexOf(cmdlist[0].split("get1")[1])<0&&cmdlist[0].split("get1")[1].match("corpse")!=null){//当前这个尸体不在列表中
									knownlist.push(cmdlist[0].split("get1")[1]);
								}
								clickButton("get"+cmdlist[0].split("get1")[1]);
								cmdlist.shift();
								prestamp=curstamp;
							}
						}


					}
					setTimeout(function(){newoverrideclick();},10);
				}else{
					setTimeout(function(){newoverrideclick();},10);//等待10毫秒执行下一次
				}
			}
		}
	}
	newoverrideclick();
	function xiakedao3(){
		if (g_obj_map.get("msg_room")==undefined){
			setTimeout(function(){xiakedao3();},200);
		}else{
			var locationname=g_obj_map.get("msg_room").get("short");
			console.log(locationname);
			if (locationname=="崖底"&&cmdlist.length==0){
			overrideclick('event_1_4788477');
			overrideclick('go northwest');
			overrideclick('go west');
			overrideclick('go southwest');
			overrideclick('go west');
			overrideclick('go north');
			overrideclick('go north');
			overrideclick('go north');
			overrideclick('go west');
			overrideclick('go west');
			overrideclick('go south');
			overrideclick('go west');
			overrideclick('go northwest');
			overrideclick('go west');
			overrideclick('go east');
			overrideclick('go northeast');
			overrideclick('go northeast');
			overrideclick('go northeast');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go south');
			overrideclick('go east');
			overrideclick('event_1_44025101');
			console.log("跳瀑布失败，回到瀑布")
			setTimeout(function(){xiakedao3();},500);
			}else if (locationname=="石门"&&cmdlist.length==0){
				console.log("进入石门")
				overrideclick('event_1_36230918');overrideclick('go east');
				overrideclick('go east');overrideclick('go south');
				overrideclick('event_1_77496481');
				g_gmain.notify_fail(HIG+"侠客岛日常结束"+NOR);
				setTimeout(function(){pozhen();},500);
			}else{
				setTimeout(function(){xiakedao3();},500);
			}
		}

	}
	function binghuodao(){
		var jhlist=g_obj_map.get("msg_jh_list").get("finish35");
		if (jhlist!=undefined&&jhlist!=0){
			overrideclick('jh 35');
			overrideclick('go northwest');      // 熔岩滩头
			overrideclick('go northwest');      // 海蚀涯
			overrideclick('go northwest');      // 峭壁崖道
			overrideclick('go north');      // 峭壁崖道
			overrideclick('go northeast') ;     // 炙溶洞口
			overrideclick('go northwest');      // 炙溶洞
			overrideclick('go west') ;     // 炙溶洞口
			overrideclick('go northwest') ;     // 熔岩小径
			overrideclick('go east') ;     // 熔岩小径
			overrideclick('go east');      // 石华林
			overrideclick('go east');      // 分岛岭
			overrideclick('go east');      // 跨谷石桥
			overrideclick('go east') ;     // 大平原
			overrideclick('go southeast');overrideclick('go north'); overrideclick('go north'); overrideclick('go west') ; overrideclick('go north');overrideclick('go west') ;overrideclick('event_1_53278632');overrideclick('sousuo');overrideclick('sousuo');overrideclick('home');
			g_gmain.notify_fail(HIG+"冰火岛日常结束"+NOR);
		}else{

		}

	}
	function pozhen(){
		var jhlist=g_obj_map.get("msg_jh_list").get("finish26");
		if (jhlist!=undefined&&jhlist!=0){
			overrideclick('jh 26');
			overrideclick('go west');
			overrideclick('go west');
			overrideclick('go north');
			overrideclick('go north');
			overrideclick('event_1_14435995');
			overrideclick('go south');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('event_1_18075497');
			g_gmain.notify_fail(HIG+"破阵日常结束"+NOR);
			setTimeout(function(){binghuodao();},500);
		}else{
			setTimeout(function(){binghuodao();},500);
		}
	}

	function scanEscapedFish() {
		var works=["maikuli","duancha","dalie","baobiao","maiyi","xuncheng","datufei","dalei","kangjijinbin","zhidaodiying","dantiaoqunmen","shenshanxiulian","jianmenlipai","dubawulin","youlijianghu","yibangmaoxian"];
		for(var i=0;i<works.length;i++){
			go("work click "+works[i]);
		}
		overrideclick('public_op3'); // 向师傅磕头
	}

	// 钓鱼------------------------------------------------------------------------------------------------------
	var fishingTrigger=0;
	var fishingButton = document.createElement('button');
	fishingButton.innerText = '开始钓鱼';
	//left0ButtonArray.push(fishingButton);
	fishingButton.addEventListener('click', fishingFunction);
	function fishingFunction(){
		console.log("打开江湖");
		overrideclick('jh',0);
		if (fishingTrigger==0){
			fishingFirstFunc();
			fishingButton.innerText = '停止钓鱼';
			fishingTrigger=1;
		}else{
			fishingButton.innerText = '开始钓鱼';
			fishingTrigger=0;
		}

	}
	function fishingFirstFunc(){
	//    console.clear();
		console.log("开始钓鱼！");
		console.log("判断是否已经开放冰火岛");
		setTimeout(function(){fishstart();},1000);
	}
	function fishstart(){
		var location=g_obj_map.get("msg_room").get("short");
		if (location=="冰湖"){
			overrideclick('diaoyu');
			return;
		}
		if (g_obj_map.get("msg_jh_list").get("finish35")==2){
			overrideclick("jh 35",0);
			fishingSecondStage();
		}else{
			fishingFirstStage();
		}
	}

	function fishingFirstStage(){
	// 进入扬州
		overrideclick('jh 5');       // 进入章节
		overrideclick('go north');     // 南门大街
		overrideclick('go north');   // 十里长街3
		overrideclick('go north');    // 十里长街2
		overrideclick('go north');      // 十里长街1
		overrideclick('go north');      // 中央广场
		overrideclick('go north');      // 十里长街4
		overrideclick('go north');      // 十里长街5
		overrideclick('go north');      // 十里长街6
		overrideclick('go north');      // 北门大街
		overrideclick('go north');      // 镇淮门
		overrideclick('go northeast') ;     // 扬州港
		overrideclick('look_npc yangzhou_chuanyundongzhu');
		overrideclick('chuhai go');
		setTimeout(function(){fishingSecondStage();},1000);
	}
	// 挖鱼饵参数
	var resFishingParas = 100;   // 系统里默认最多挖50次
	var buttonName_digworm = 'event_1_59308235';
	var cutTreeButtonName = 'event_1_45715622';
	var diaoyu_buttonName = 'diaoyu';
	var digWormFun=null;
	var firstFishingParas = true;
	var  resFishToday = 10;
	var lastFishMsg = "";
	function fishingSecondStage(){
		// 到达冰火岛
		overrideclick('chuhaigo', 0);
		overrideclick('go northwest');      // 熔岩滩头
		overrideclick('go northwest');      // 海蚀涯
		overrideclick('go northwest');      // 峭壁崖道
		overrideclick('go north');      // 峭壁崖道
		overrideclick('go northeast') ;     // 炙溶洞口
		overrideclick('go northwest');      // 炙溶洞
		overrideclick('go west') ;     // 炙溶洞口
		overrideclick('go northwest') ;     // 熔岩小径
		overrideclick('go east') ;     // 熔岩小径
		overrideclick('go east');      // 石华林
		overrideclick('go east');      // 分岛岭
		overrideclick('go east');      // 跨谷石桥
		overrideclick('go east') ;     // 大平原
		overrideclick('go southeast');
		overrideclick('go east');
		overrideclick('diaoyu');
	}
	var kanshufinish=0;
	var kanshuing=0;
	var wachonging=0;
	var wachongfinish=0;
	function kanshu(){
		overrideclick('go west');
		overrideclick('go south');
		overrideclick('go southeast');
		overrideclick('go west');
		overrideclick('go northwest');
		overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go west');overrideclick('go west');overrideclick('go north');overrideclick('go east');overrideclick('go north');overrideclick('go west');overrideclick('go west');overrideclick('go south');
		overrideclick('event_1_45715622');
	}
	function wachong(){
		overrideclick('go west');
		overrideclick('go northwest');
		overrideclick('event_1_59308235');
	}
	function fishingfeedback(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type=="notice"||type=="main_msg"){
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				overrideclick('look_room', 0);
				console.log(msg);
				//开始判断钓鱼情况
				if (msg.match("整个冰湖的渔获都快被你钓光了")!=null){
					console.log("今天钓鱼结束了");
					fishingButton.innerText = '开始钓鱼';
					fishingTrigger=0;
				}else if (msg.match("突然")!=null){
					setTimeout(function(){overrideclick('diaoyu');},5000);
				}else if (msg.match("你目前正在钓鱼中")!=null){
					setTimeout(function(){overrideclick('diaoyu');},100);
				}else if(kanshufinish==0&&msg.match("你还没有鱼竿")!=null){
					kanshu();
					kanshuing=1;
				}else if(kanshufinish==1&&msg.match("你还没有鱼竿")!=null){
					overrideclick('shop money_buy shop5');
					overrideclick('diaoyu');
				}else if(wachongfinish==0&&msg.match("你还没有鱼饵")!=null){
					wachong();
					wachonging=1;
				}else if(wachongfinish==1&&msg.match("你还没有鱼饵")!=null){
					overrideclick('shop money_buy shop6');
					overrideclick('diaoyu');
				}else if(kanshuing==1&&msg.match("你调运内功向林海一掌打去")!=null){
					setTimeout(function(){overrideclick('event_1_45715622');},5000);
				}else if(wachonging==1&&msg.match("你在湿润的土地上四处翻动")!=null){
					setTimeout(function(){overrideclick('event_1_59308235');},5000);
				}else if(wachonging==1&&msg.match("你挖掘的太快了")!=null){
					setTimeout(function(){overrideclick('event_1_59308235');},100);
				}else if(kanshuing==1&&msg.match("你砍伐树木太快了")!=null){
					setTimeout(function(){overrideclick('event_1_45715622');},100);
				}else if (kanshuing==1&&msg.match("你今天已经够累得了")!=null){
					kanshuing=0;
					kanshufinish=1;
					overrideclick('go north');overrideclick('go north');
					overrideclick('go east');overrideclick('go north');
					overrideclick('go southeast');overrideclick('go east');overrideclick('go northwest');overrideclick('go north');
					overrideclick('go east');overrideclick('diaoyu');
				}else if (wachonging==1&&msg.match("你今天已经够累得了")!=null){
					wachonging=0;
					wachongfinish=1;
					overrideclick('go southeast');
					overrideclick('go east');
					overrideclick('diaoyu');

				}
			}
		}
	}
	var fishfeedback=new fishingfeedback;

	//抢物品
	var qiangdipiTrigger=0;
	function qiangdipiFunc(){
		if (qiangdipiTrigger==0){
			qiangdipiTrigger=1;
		}else if (qiangdipiTrigger==1){
			qiangdipiTrigger=0;
			knownlist=[];//清空已知列表
		}
	}

	function Qiang(){
		this.dispatchMessage = function(b) {
			var type = b.get("type"), subType=b.get("subtype");
			if (type=="jh"&&subType=="new_item"){
				clickButton('get '+b.get("id"));
			}
		}
	}
	var qiang=new Qiang;
/*奇侠开始*/
    //奇侠朱果
    var step = 0;
    var waitTime = 300;
    var qxStarting=0;
    var dictQixia = {};
    var QiXiaList1 = [];
	var qixiaSequnce = ["步惊鸿", "郭济", "浪唤雨", "火云邪神", "逆风舞", "风南", "狐苍雁", "王蓉", "李宇飞", "庞统", "风行骓", "吴缜", "护竺","玄月研","狼居胥",
    "烈九州",
    "穆妙羽",
    "宇文无敌",
    "李玄霸",
    "八部龙将",
    "风无痕",
    "厉沧若",
    "夏岳卿",
    "妙无心",
    "巫夜姬"];    //奇侠顺序
var currentTalk = 0;
var lingguozi = false;
var qixiaMove = 0;
function qixia() {
		if (qxStarting==0){
            qxStarting=1;
            clickButton('open jhqx');
            GetQiXiaList1();
            setTimeout(talkQixia,500);
		}else if (qxStarting==1){
            qxStarting=0;
            currentTalk = 0;
            lingguozi = false;
		}
}

function talkQixia() {
    if (QiXiaList1.length<25){return;}
    for (var i=0;i<QiXiaList1.length;i++){
                dictQixia[QiXiaList1[i]["name"]]=QiXiaList1[i]["index"];
		}
    lingguozi = true;
    console.log(dictQixia);
    clickButton('find_task_road qixia ' + dictQixia[qixiaSequnce[currentTalk]]);
    //console.log(currentTalk);
}

function GetQiXiaList1(){
		var html=g_obj_map.get("msg_html_page");
		if (html==undefined){
			setTimeout(function(){GetQiXiaList1();},500);
		}else if(g_obj_map.get("msg_html_page").get("msg").match("江湖奇侠成长信息")==null){
			setTimeout(function(){GetQiXiaList1();},500);
		}else{
			QiXiaList1=formatQx(g_obj_map.get("msg_html_page").get("msg"));
			//console.log(QiXiaList1);
		}
	}
function msgQixia() {
    this.dispatchMessage=function(b){
        /*if (b.get('type') == 'notice') {
            var str = '道：你现在去';
            var index1 = b.get('msg').indexOf(str);
            if (index1 > 0) {
                var index2 = b.get('msg').indexOf('，');
                var length = index2 - index1 - str.length;
                var pos = b.get('msg').substr(index1 + str.length, length);
                step = 0;
                pathSecret = dictSecret[g_simul_efun.replaceControlCharBlank(pos)];
                console.log(pos+pathSecret);
                go(pathSecret);

            }
        }*/

        if (lingguozi) {
            if (b.get('type') == 'jh' && b.get('subtype') == 'info') {
                //console.log(b);
                var keys = b.keys();
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i].indexOf('npc') == 0) {
                        var npc = b.get(keys[i]).split(',');
                        if (npc[1] == qixiaSequnce[currentTalk]) {
                            currentTalk++;
                            step = 0;
                            for (var j = 0; j < 5; j++) {
                                //console.log(npc[0]+':'+npc[1]);
                                setTimeout('clickButton("ask ' + npc[0] + '", 1);', step * waitTime);
                                console.log(npc[1]);
                                step++;
                            }
                            if (currentTalk < qixiaSequnce.length) {
                                setTimeout(talkQixia, step * 2 * waitTime);
                            }
                            //else {
                                //clickButton('home');
                                //setTimeout('clickButton("home")', step * 2 * waitTime);
                                //lingguozi = false;
                            //}
                            break;
                        }
                    }
                }
            }

            if (b.get('type') == 'notice' && b.get('msg').indexOf('这个奇侠还没有入世') >= 0) {
                currentTalk++;
                setTimeout(talkQixia, 2 * waitTime);
            }
            if (b.get('type') == 'notice' && b.get('msg').indexOf('此人现在已不在这儿了') >= 0) {
                qixiaMove++;
                if (qixiaMove == 5) {
                    setTimeout(talkQixia, 2 * waitTime);
                }
            }
             if (b.get('type') == 'main_msg' && b.get('ctype') == 'text') {
                if (b.get('msg').indexOf('今日奇侠赠送次数125/125') >= 0) {
                    qxStarting=0;
                    currentTalk = 0;
                    lingguozi = false;
                    QiXiaTalk1Button.innerText = '自动奇侠';
                }
             }
        }
    }
}
var msgqixia= new msgQixia;
/*奇侠结束*/

    //奇侠朱果
	//var QiXiaTalkButton = document.createElement('button');
	//QiXiaTalkButton.innerText = '奇侠朱果';
	//left3ButtonArray.push(QiXiaTalkButton);
	//QiXiaTalkButton.addEventListener('click', QiXiaTalkFunc);
	var QXretried=0;
	var QXStop=0;
	var QXTalkcounter=1;
	var QxTalking=0;
	function GetQXID(name,QXindex){
		if (QXStop==1&&qinmiFinished==1){
			return;
		}else if (g_obj_map.get("msg_room")==undefined||QXStop==1){
			setTimeout(function(){GetQXID(name,QXindex);},500);
		}else{
			console.log("开始寻找"+name+QXindex);
			var QX_ID = "";
			var npcindex=0;
			var els=g_obj_map.get("msg_room").elements;
			for (var i = els.length - 1; i >= 0; i--) {
				if (els[i].key.indexOf("npc") > -1) {
					if (els[i].value.indexOf(",") > -1) {
						var elsitem_ar = els[i].value.split(',');
						if (elsitem_ar.length > 1 && elsitem_ar[1] == name) {
							console.log(elsitem_ar[0]);
							npcindex=els[i].key;
							QX_ID = elsitem_ar[0];
						}
					}
				}
		  }
		 if (QX_ID==null||QX_ID==undefined||QX_ID==0){
			 clickButton('find_task_road qixia '+QXindex);
			 setTimeout(function(){GetQXID(name,QXindex);},500);
		 }else{
			console.log("找到奇侠编号"+QX_ID);
			if (QXTalkcounter<=5){
				console.log("开始与"+name+"第"+QXTalkcounter+"对话")
				QXTalkcounter++;
				clickButton('ask '+QX_ID);
				clickButton('find_task_road qixia '+QXindex);
				setTimeout(function(){GetQXID(name,QXindex)},500);
			}else if (QXTalkcounter>5){
				QXTalkcounter=1;
				console.log("与"+name+"对话完成");
				QixiaTotalCounter++;
				if (QixiaTotalCounter>24){

					alert("今日奇侠已经完成");
				}else{
					console.log("下一个目标是"+finallist[QixiaTotalCounter]["name"]);
				}
				talktoQixia();
			}
		 }

		}
	}
	var QixiaTotalCounter=0;
	function TalkQXBase(name,QXindex){
		var QX_NAME = name;
		console.log("开始撩" + QX_NAME + "！");
		if (g_obj_map.get("msg_room")!=undefined)
		g_obj_map.get("msg_room").clear();
		overrideclick('find_task_road qixia ' + QXindex);
		overrideclick('golook_room');
		setTimeout(function(){GetQXID(QX_NAME,QXindex);},500);
	}

	function TalkLangHuanYu(){
	// 0 浪欢愉
		if (QXStop==1){
			return;
		}
		TalkQXBase("浪唤雨",0);
	}
	function TalkWangRong(){
		// 1 王蓉，要果子
		if (QXStop==1){
			return;
		}
		TalkQXBase("王蓉",1);
	}
	function TalkPangTong(){
		// 2 庞统
		if (QXStop==1){
			return;
		}
		TalkQXBase("庞统",2);
	}
	function TalkLiYuFei(){
		// 3 李宇飞，要果子
		if (QXStop==1){
			return;
		}
		TalkQXBase("李宇飞",3);
	}
	function TalkBuJingHong(){
		//4  步惊魂
		if (QXStop==1){
			return;
		}
		TalkQXBase("步惊鸿",4);
	}
	function TalkFengXingJu(){
		//5 风行骓
		if (QXStop==1){
			return;
		}
		TalkQXBase("风行骓",5);
	}
	function TalkGuoJI(){
	// 6 郭记
		if (QXStop==1){
			return;
		}
		TalkQXBase("郭济",6);
	}
	function TalkWuZhen(){
	// 7 吴缜
		if (QXStop==1){
			return;
		}
		TalkQXBase("吴缜",7);
	}
	function TalkFengNan(){
	// 8 凤南
		if (QXStop==1){
			return;
		}
		TalkQXBase("风南",8);
	}
	function TalkHuoYunXieShen(){
	//9 火云邪神
		if (QXStop==1){
			return;
		}
		TalkQXBase("火云邪神",9);
	}
	function TalkNiFengWu(){
	//10 逆风舞
		if (QXStop==1){
			return;
		}
		TalkQXBase("逆风舞",10);
	}
	function TalkCangGuYan(){
		//11 狐苍雁
		if (QXStop==1){
			return;
		}

		TalkQXBase("狐苍雁",11);
	}
	function TalkHuZhu(){
		//12 护竺
		if (QXStop==1){
			return;
		}
		TalkQXBase("护竺",12);
	}
	var currentTime  = 0;
	var delta_Time = 2000;
	var QXStop=0;
	var qinmiFinished=0;
	var QiXiaList=[];
	function QXWhisper(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subtype = b.get("subType");
			if (type=="notice"){
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				if (msg.match("对你悄声道")!=null){
					QXStop=1;
					alert(msg);
					QiXiaTalkButton.innerText = '继续奇侠';
				}
				console.log(msg);
			}else if (type=="main_msg"){
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				if (msg.match("今日亲密度操作次数")!=null){
					var qinmi=parseInt(msg.split("(")[1].split("/")[0]);
					if (qinmi==20){
						QXStop=1;
						qinmiFinished=1;
						alert("今日亲密度操作已经达到20，奇侠功能暂停。再次使用请重新点击开始领取果子。");
						QXTalking=0;
					}
				}
			}
		}
	}
	var whipser=new QXWhisper;
	function GetQiXiaList(){
		var html=g_obj_map.get("msg_html_page");
		QxTalking=1;
		if (html==undefined){
			setTimeout(function(){GetQiXiaList();},500);
		}else if(g_obj_map.get("msg_html_page").get("msg").match("江湖奇侠成长信息")==null){
			setTimeout(function(){GetQiXiaList();},500);
		}else{
			QiXiaList=formatQx(g_obj_map.get("msg_html_page").get("msg"));
			console.log(QiXiaList);
			SortQiXia();
		}
	}
	function SortQiXia(){//冒泡法排序
		var temp={};
		var temparray=[];
		var newarray=[];
		for (var i=0;i<QiXiaList.length;i++){
			for (var j=1;j<QiXiaList.length-i;j++){
				if (parseInt(QiXiaList[j-1]["degree"])<parseInt(QiXiaList[j]["degree"])){
					temp=QiXiaList[j-1];
					QiXiaList[j-1]=QiXiaList[j];
					QiXiaList[j]=temp;
				}
			}
		}
		var tempcounter=0;
		console.log("奇侠好感度排序如下:");
		console.log(QiXiaList);
		//首次排序结束 目前是按照由小到大排序。现在需要找出所有的超过25000 小于30000的奇侠。找到后 排序到最上面；
		for (var i=0;i<QiXiaList.length;i++){
			if (parseInt(QiXiaList[i]["degree"])>=25000&&parseInt(QiXiaList[i]["degree"])<30000){
				temparray[tempcounter]=QiXiaList[i];
				tempcounter++;
				newarray.push(i);
			}
		}
		console.log(temparray);
		console.log("提取满朱果好感度排序如下:");
		for (var i=0;i<QiXiaList.length;i++){
			if (newarray.indexOf(i)==-1){
				temparray[tempcounter]=QiXiaList[i];
				tempcounter++;
			}
		}
		var over3=[];
		console.log(temparray);//第一次排序结束。现在要挑出所有超过3万的亲密 并且放到最后。
		for (var i=0;i<temparray.length;i++){
			if (parseInt(temparray[i]["degree"])>=30000){//找到3万以上的
				over3.push(i);//push超过3万的序号
			}
		}
		console.log(over3);
		var overarray=[];
		var overcounter=0;
		for (var i=0;i<temparray.length;i++){ //第一遍循环 找到不在3万列表中的
			if (over3.indexOf(i)<0){
				overarray[overcounter]=temparray[i];
				overcounter++;
			}
		}
		console.log(overarray);
		for (var i=0;i<temparray.length;i++){//第二遍循环 把列表中的插入
			if (over3.indexOf(i)>=0){
			overarray[overcounter]=temparray[i];
			overcounter++;
			}
		}
		finallist=[];
		finallist=overarray;
		console.log(finallist);
		getZhuguo();
	}
	function getZhuguo(){
		var msg="";
		console.log(finallist);
		for (var i=0;i<4;i++){//只检查 头四个奇侠是不是在师门，是不是已经死亡。
			if (finallist[i]["isOk"]!=true){
				msg+=finallist[i]["name"]+" ";
			}
		}
		if (msg!=""){
			alert("根据您的奇侠亲密好感度，目前可以最优化朱果数目的以下奇侠不在江湖或者已经死亡："+msg+"。请您稍后再尝试使用奇侠领取朱果服务。");
		}else{//头四位奇侠都在江湖中，可以开始领取朱果
			talktoQixia();
		}
	}
	var unfinish="";
	function talktoQixia(){
		if (QixiaTotalCounter<=24){// 奇侠list仍然有元素。开始调取排列第一个的奇侠
			var Qixianame="";
			var QixiaIndex=0;
			console.log(finallist[0]["name"]);
			Qixianame=finallist[QixiaTotalCounter]["name"];
			QixiaIndex=finallist[QixiaTotalCounter]["index"];
			if (finallist[QixiaTotalCounter]["isOk"]!=true){
				alert("奇侠"+Qixianame+"目前不在江湖，可能死亡，可能在师门。领取朱果中断，请在一段时间之后重新点击领取朱果按钮。无需刷新页面");
				return;
			}else{
				console.log(finallist[0]);
				console.log(finallist[0]);
				clickButton('find_task_road qixia '+QixiaIndex);

				console.log(QixiaIndex);
				GetQXID(Qixianame,QixiaIndex);
			}
		}
	}
	var finallist=[];
	function QiXiaTalkFunc(){
		if(!mijingProtection()){
			return;
		}
		var QiXiaList_Input= "";
		//打开 江湖奇侠页面。
		if (QXStop==0){
			clickButton('open jhqx', 0);
			GetQiXiaList();
		}else if (QXStop==1&&qinmiFinished==0){
			QXStop=0;
			QiXiaTalkButton.innerText = '奇侠领朱果';
		}else if (QXStop==1&&qinmiFinished==1){
			QXStop=0;
			QixiaList=[];
			finallist=[];
			QXTalkcounter=1;
			QixiaTotalCounter=0;
			clickButton('open jhqx', 0);
			GetQiXiaList();
		}
	}
	// 格式话奇侠数据并返回数组
	function formatQx(str){
		var tmpMsg = removeSpec(str);
		var arr = tmpMsg.match(/<tr>(.*?)<\/tr>/g);
		var qxArray = [];
		var qxInfo = {};
		if(arr){
			for(var i = 0;i < arr.length;i++){
				qxInfo = {};
				arr2 = arr[i].match(/<td[^>]*>([^\d\(]*)\(?(\d*)\)?.*?<\/td><td[^>]*>(.*?)<\/td><td[^>]*>(.*?)<\/td><td[^>]*>.*?<\/td>/);
				qxInfo["name"] = arr2[1];
				qxInfo["degree"] = arr2[2] == "" ? 0 : arr2[2];
				console.log(arr2);
				if (arr2[3].match("未出世")!=null||arr2[4].match("师门")!=null){
					qxInfo["isOk"]=false;
				}else{
					qxInfo["isOk"]=true;
				}
				qxInfo["index"]=i;
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
		return tmp;
	}

	function talk2QiXiabyName(localname){
	//    console.log("目前是：" + localname);
		currentTime = currentTime + delta_Time;
		switch(localname){
			case "王蓉":
				setTimeout(TalkWangRong, currentTime); // 王蓉
				break;
			case "浪唤雨":
				setTimeout(TalkLangHuanYu, currentTime);
				break;
			case "庞统":
				setTimeout(TalkPangTong, currentTime);
				break;
			case "李宇飞":
				setTimeout(TalkLiYuFei, currentTime);
				break;
			case "步惊鸿":
				setTimeout(TalkBuJingHong, currentTime);
				break;
			case "风行骓":
				setTimeout(TalkFengXingJu, currentTime);
				break;
			case "郭济":
				setTimeout(TalkGuoJI, currentTime);
				break;
			case "吴缜":
				setTimeout(TalkWuZhen, currentTime);
				break;
			case "风南":
				setTimeout(TalkFengNan, currentTime);
				break;
			case "火云邪神":
				setTimeout(TalkHuoYunXieShen, currentTime);
				break;
			case "逆风舞":
				setTimeout(TalkNiFengWu, currentTime);
				break;
			case "狐苍雁":
				setTimeout(TalkCangGuYan, currentTime);
				break;
			case "护竺":
				setTimeout(TalkHuZhu, currentTime);
				break;
			default:
				console.error("没有找到该奇侠：" + localname + " ！");
		}
	}
	function getSilverKeys(){
		overrideclick('jh 20');        // 进入古墓
		overrideclick('go west') ;     // 山路
		overrideclick('go west') ;     // 山路
		overrideclick('go south') ;     // 山路
		overrideclick('go east') ;     // 终南山主峰
		overrideclick('go south') ;     // 山路
		overrideclick('go south') ;     // 空地
		overrideclick('go south') ;     // 小树林
		overrideclick('go south') ;     // 小树林
		overrideclick('go south') ;     // 小树林
		overrideclick('go southwest') ;     // 小树林
		overrideclick('go southwest') ;     // 小树林
		overrideclick('go south') ;     // 草地
		overrideclick('go south') ;     // 墓门
		overrideclick('go south') ;     // 墓道
		overrideclick('go south') ;     // 前厅
		overrideclick('go east') ;     // 墓道
		overrideclick('go east') ;     // 中厅
		overrideclick('event_1_3723773');// 翻开大匾
		overrideclick('get yin yaoshi');
		overrideclick('go south') ;     // 中厅
		overrideclick('give gumu_longnv'); //给予龙儿
		overrideclick('home');
		overrideclick('study gumu_yufeng-book'); // 学习
	}


	// 自动恢复 ------------------------------------------------------------------------------------------------------
	var healIntervalFunc=null;
	function doheal(){
		let vs_hp11 = $("#vs_hp11").children().children().text();
		if(vs_hp11 == "" || vs_hp11 == 0){
			NewhealFunc();
		}
	}

function NewhealFunc(){
	var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
	var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
	var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
	var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));
	console.log("血量是: "+kee+"/"+max_kee);
	console.log("内力是: "+force+"/"+max_force);
	if (kee<max_kee){
		if (force>0) {
			clickButton('recovery',0);
		}
		else {
			if (healflg == 0)
			{
				clickButton('items use snow_wannianlingzhi');
			} else {
				clickButton('items use snow_qiannianlingzhi');
			}
		}
	}else {
		if (force<max_force * 0.5){
			if (healflg == 0)
			{
				clickButton('items use snow_wannianlingzhi');
			} else {
				clickButton('items use snow_qiannianlingzhi');
			}
		}
		else if (force<max_force * 0.9){
			clickButton('items use snow_qiannianlingzhi');
		}
	}
}
	// 一键恢复------------------------------------------------------------------------------------------------------
	var healtriger=0;
	function userMedecineFunc(){
	   if (healtriger==0){
		   healtriger=1;
		   healFunc();
		   g_gmain.notify_fail(HIG+"开始恢复血量和内力"+NOR);
	   }else{
		   g_gmain.notify_fail(HIR+"已经停止一键恢复功能"+NOR);
		   healtriger=0;
	   }
	}

    // 自动突破 ------------------------------------------------------------------------------------------------------
	var autotupoTrigger=0;
	function autotupoFunc(){
		if(autotupoTrigger){
			autotupoTrigger=0;
		}else{
			autotupoTrigger=1;
		}
	}
	var AutoTupo =new AutoTupo();
	function AutoTupo(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
            if (b.get('type') == 'notice') {
                var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
				let matches = msg.match(/你的(.*)成功向前突破/);
                if (matches) {
					var skillname = [matches[1]];
					var skillid = TupoSkillList.filter((item, i) =>{
						let myitem = '';
						skillname.filter((value, b) =>{
							if(item[0] == value) {
								myitem = value;
							}
						});
						return myitem;
					});

					overrideclick('enable '+skillid[0][1]);
					overrideclick('tupo go,'+skillid[0][1]);
					//clickButton('tupo_speedup2 xueyin-blade go');
					//clickButton('tupo_speedup budongmwj go');
					overrideclick('golook_room');
				}
			}
		}
	}

	//  切换跨服------------------------------------------------------------------------------------------------------
	var qiehuankuafuTrigger=0;
	function qiehuankuafuFunc(){
		if(qiehuankuafuTrigger){
			qiehuankuafuTrigger=0;

			g_world_uid = g_world_port = g_world_ip = 0
            sock.close(),
            sock = 0,
            g_gmain.g_delay_connect = 0,
            connectServer();

			qiehuankuafuButton.innerText = '进入跨服';
		}else{
			qiehuankuafuTrigger=1;

			g_world_ip = "sword-inter1-direct.yytou.cn",
			g_world_port = 8881,
			g_world_uid = g_obj_map.get("msg_attrs").get("id").replace("u","")+"-21a1a",
			sock.close(),
			sock = 0,
			g_gmain.g_delay_connect = 0,
			connectServer();

			qiehuankuafuButton.innerText = '回到本服';
		}
	}
	(function(){
		if(g_world_uid){
			qiehuankuafuTrigger=1;
		}
	})();

//杀游侠
var killYXTrigger = 0;
var getYXIntervalFunc =  null;
function killYXfeedback(){
    this.dispatchMessage=function(b){
        var type = b.get("type"), subType = b.get("subtype");
        if (type=="channel"){
            var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
            if (msg.indexOf("【系统】游侠会") > -1) {
                var y = msg.match(/【系统】游侠会：听说(.*?)出来闯荡江湖了，目前正在前往(.*?)的路上。/);
            if (y) {
				let npc = y[1];
				let city = y[2];
				if (npc != "龙儿") {
                Navigation.traversal(city, npc);
				// 杀游侠----------------------------------------------------------------------------------------------------------------
				var YXNPCList = [npc];
				var killYXIntervalFunc =  null;
				var currentNPCIndex = 0;
				killYXTargetFunc();
				getYXIntervalFunc = setInterval(getYX, 300);

				function killYXTargetFunc(){
					zdskill =  mySkillLists;
					currentNPCIndex = 0;
					console.log("开始杀游侠目标NPC！");
					skillLists = mySkillLists;
					killYXIntervalFunc = setInterval(killYX, 500);
				}

				function killYX(){
					if ($('span').text().slice(-7) == "不能杀这个人。"){
						currentNPCIndex = currentNPCIndex + 1;
						console.log("不能杀这个人！");
				    }
					getYXTargetCode();
					if($('span.outbig_text:contains(战斗结束)').length>0){
						currentNPCIndex = 0;
						console.log('杀人一次！');
						clickButton('prev_combat');
						clearInterval(killYXIntervalFunc);
					}
				}

				function getYX(){
					var AutoGet_targetName = "尸体";
					$("button.cmd_click3").each(
					 function(){
						 if(isContains($(this).html() , AutoGet_targetName))
						 eval($(this).attr("onclick").replace("look_item corpse","get corpse"));
						});
				}

				function getYXTargetCode(){
				var peopleList = $(".cmd_click3");
				var thisonclick = null;
				var targetNPCListHere = [];
				var countor= 0;
				for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
					// 打印 NPC 名字，button 名，相应的NPC名
					thisonclick = peopleList[i].getAttribute('onclick');
					if (YXNPCList.contains(peopleList[i].innerText)){
						var targetCode = thisonclick.split("'")[1].split(" ")[1];
						targetNPCListHere[countor] = peopleList[i];
						countor = countor +1;
						}
					}
					// targetNPCListHere 是当前场景所有满足要求的NPC button数组
					if (currentNPCIndex >= targetNPCListHere.length){
						currentNPCIndex = 0;
					}
					if (targetNPCListHere.length > 0){
						thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
						var targetCode = thisonclick.split("'")[1].split(" ")[1];
						console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
						clickButton('kill youxia_' + targetCode); // 点击杀人
						setTimeout(detectKillYXInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
					}
				}
				function detectKillYXInfo(){
					var YXInfo = $('span').text();
					if (YXInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
						currentNPCIndex = currentNPCIndex + 1;
					}else{
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
					}
				}
            }
        }
    }
}

var killYXFeed = new killYXfeedback();

    //拼图监听
    var PTtrigger=0;
    var ptFlag=0;
    function pinTuFunc(){
        if (PTtrigger==0){
            PTtrigger=1;
            ptFlag=0;
        }else if (PTtrigger==1){
            PTtrigger=0;
        }
    }
    function PingTuMon() {
        this.dispatchMessage = function(b) {
            var type = b.get("type"), subType = b.get("subtype"),ctype=b.get('ctype');
            var msg = b.get("msg");
            if (type == "channel" && subType == "sys"&&ptFlag==0) {
                //逃犯监听
                msg = g_simul_efun.replaceControlCharBlank(msg);
                //console.log("type:"+type+";subType:"+subType+";msg:"+msg);
                if (msg.indexOf("今天你可是在我的地盘，看来你是在劫难逃") > 0) {
                    var l = msg.match(/系统】(.*)对着(.*)叫道：(.*)，今天你可是在我的地盘，看来你是在劫难逃/);
                    if(!mijingProtection()){
                        return;
                    }

					var locationname=g_obj_map.get("msg_room").get("short");
					if(locationname=="地室") {
					} else if (locationname=="万蛊堂")
					{
						overrideclick("go south");
					} else if (locationname=="百毒池")
					{
						overrideclick("go east");
					} else if (locationname=="十恶殿")
					{
						overrideclick("go west");
					} else if (locationname=="千蛇窟")
					{
						overrideclick("go north");
					} else {
						overrideclick("jh 2");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go north");
						overrideclick("go west");
						overrideclick("go south");
						overrideclick("go south");
						overrideclick("go south");
						overrideclick("go south");
						overrideclick("go east");
						overrideclick("event_1_2215721");
					}

                    if (l&&l[2]=="云观海") {
						overrideclick("go north");
                        overrideclick('kill changan_yunguanhai1');
                    }else if(l&&l[2]=="翼国公"){
						overrideclick("go south");
                        overrideclick('kill changan_yiguogong1');
                    }else if(l&&l[2]=="黑袍公"){
						overrideclick("go west");
                        overrideclick('kill changan_heipaogong1');
                    }else if(l&&l[2]=="独孤须臾"){
						overrideclick("go east");
                        overrideclick('kill changan_duguxuyu1');
                    }
                }
            }
            else if(((type=="notice" && msg && msg.indexOf("你今天完成的宝藏秘图任务数量已经超量了")>-1)||(type == "main_msg" && ctype == "text"&& msg &&msg.indexOf("这是你今天完成的第4/4")>-1))&&ptFlag==0){
                ptFlag = 1;
                console.log("拼图打npc任务数量完成！");
			}
            else if(ptFlag == 1){
                ButtonManager.resetButtonById("btnpinTu");
            }
        }
    }
    var ptMon = new PingTuMon;

    /**本服青龙监听start**/
	var BFQLtrigger=0;
    function listenBFQLFunc(){
        if (BFQLtrigger==0){
            var msgtxt=null;
            var msghtml=null;
            BFQLtrigger=1;
        }else if (BFQLtrigger==1){
            BFQLtrigger=0;
        }
        if(BFQLtrigger==1){
            //获取out2的数据变化判断
        $("#out2").bind('DOMNodeInserted', function(e) {
            msgtxt = $(e.target).text() ;
            msghtml = $(e.target).html() ;
            var targetCode = null;
            if (msgtxt.indexOf("青龙会组织：") > -1 ) {
                var l = msgtxt.match(/青龙会组织：(.*)正在(.*)施展力量，本会愿出(.*)的战利品奖励给本场战斗的最终获胜者。/);
                //寻找清单内对应碎片
                if(DragonBonus0.contains(l[3]) || DragonBonus1.contains(l[3]) || DragonBonus2.contains(l[3]) || DragonBonus3.contains(l[3]) || DragonBonus4.contains(l[3]) || DragonBonus5.contains(l[3])){
                    targetCode = msghtml.split("'")[1];
                    clickButton(targetCode);
                    badName = l[1];
                    setTimeout(fightSwordsmanBF,100);
                }
            }
        });
        }else{
            $("#out2").unbind();
        }
        function fightSwordsmanBF(){
            //杀对应好人
           /* var peopleList = $(".cmd_click3");
            //var thisonclick = null;
            for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
                // 打印 NPC 名字，button 名，相应的NPC名
                //thisonclick = peopleList[i].getAttribute('onclick');
                if (peopleList[i].innerText === badName){
                    eval(peopleList[i-1].getAttribute('onclick').replace("look_npc","kill"));
                    return;
                }
            }*/
            // 寻找指定名称的坏人并开始击杀
            $("button.cmd_click3").each(
            function(){
                if($(this).text() === badName)
                    eval($(this).attr("onclick").replace("look_npc","kill"));
            });
            // 战斗结束自动退出战斗界面
            if($('span.outbig_text:contains(战斗结束)').length>0){
                clickButton('prev_combat');
            }

        }
    }

    /**跨服青龙镖车监听start**/
	var QLtrigger=0;
    function listenQLFunc(){
        if (QLtrigger==0){
            var msgtxt=null;
            var msghtml=null;
            QLtrigger=1;
        }else if (QLtrigger==1){
            QLtrigger=0;
        }
        if(QLtrigger==1){
            //获取out2的数据变化判断
        $("#out2").bind('DOMNodeInserted', function(e) {
            msgtxt = $(e.target).text() ;
            msghtml = $(e.target).html() ;
            var targetCode = null;
            if (msgtxt.indexOf("青龙会组织：[21-25区]") > -1 ) {
                var m = msgtxt.match(/青龙会组织：\[21-25区\](.*)正在(.*)施展力量，本会愿出(.*)的战利品奖励给本场战斗的最终获胜者。/);
                //寻找清单内对应碎片
                if(DragonBonus0.contains(m[3]) || DragonBonus1.contains(m[3]) || DragonBonus2.contains(m[3]) || DragonBonus3.contains(m[3]) || DragonBonus5.contains(m[3])){
                    targetCode = msghtml.split("'")[1];
                    clickButton(targetCode);
                }
            }
            if (msgtxt.indexOf("荣威镖局:[21-25区]") > -1 )  {
                targetCode = msghtml.split("'")[1];
                clickButton(targetCode);
            }
        });
        }else{
            $("#out2").unbind();
        }
    }

    /**全服青龙监听start**/
	var QFQLtrigger=0;
    function listenQFQLFunc(){
        if (QFQLtrigger==0){
            var msgtxt=null;
            var msghtml=null;
            QFQLtrigger=1;
        }else if (QFQLtrigger==1){
            QFQLtrigger=0;
        }
        if(QFQLtrigger==1){
            //获取out2的数据变化判断
        $("#out2").bind('DOMNodeInserted', function(e) {
            msgtxt = $(e.target).text() ;
            msghtml = $(e.target).html() ;
            var targetCode = null;
            if (msgtxt.indexOf("新区") > -1) {return;}
            if (msgtxt.indexOf("武林广场") > -1&&msgtxt.indexOf("青龙") > -1) {
				var n = msgtxt.match(/青龙会组织：(.*)正在(.*)施展力量，本会愿出(.*)的战利品奖励给本场战斗的最终获胜者。/);
				if (DragonBonus.contains(n[3]))
				{
					targetCode = msghtml.split("'")[1];
                    clickButton(targetCode);
				}
            }
        });
        }else{
            $("#out2").unbind();
        }
    }
    function QinglongMon() {
        this.dispatchMessage = function(b) {
            var type = b.get("type"), subType = b.get("subtype");
            if (type == "channel" && subType == "sys" ) {
                var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
                //逃犯监听
                if (msg.indexOf("[21-25区]段老大") > 0) {
                    var targetCode = null;
                    var l = msg.match(/系统】\[21-25区\]段老大慌不择路，逃往了(.*)-(.*)/);
                    //得到逃犯的链接
                    if (l&&QLtrigger==1) {
                        var targetCode1 = l[2].split(";")[2];
                        var ChineseADD=targetCode1.match(/[\u4e00-\u9fa5]/g).join("");
                        targetCode=targetCode1.split(ChineseADD)[0];
                        //执行寻找对应的NPC
                        clickButton(targetCode);
                        return;
                    }
                }//逃犯跨服
            }
        }
    }
    var qlMon = new QinglongMon;

//定时睡床监听
var DsQLtrigger=0;
function listenDingFunc(){
    if(DsQLtrigger==1){
        var timeTask=setInterval(function(){
        var date=new Date();
		var w=date.getDay();
        var h=date.getHours();
        var m=date.getMinutes();
        var s=date.getSeconds();
		var AutoTime = sessionStorage.getItem("AutoTime");
        //alert("时间:"+h+m+s);
         if(h==5 && m==55){
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
            overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
			overrideclick('vip finish_bad 2');
            console.log("正邪任务清理！");
        }
        else if(h==6 && m==0){
            ButtonManager.clickButtonById("btnpinTu");
           }
        else if(w == 1 && h==1 && m==0){
            setTimeout(CheckIn1,1000);
			setTimeout(CheckIn2,8000);
           }
        else if(h==18 && m==1){
            go("home;sort fetch_reward");
            setTimeout(CheckIn3,1000);
           }
		else if(h==21 && m==45){
			clickButton('clan scene', 0);
           }
        },60000);
    }else{
    clearInterval(timeTask);}
}
    /**逃跑回坑并且自动进入战斗 --start**/
    var escapeTrigger=0;
	function escapeStart(){
		escapeTrigger=1;
		escapeloop();
	}
	function escapeloop(){
		console.log("我逃");
		overrideclick('escape', 0) //循环逃跑判定
		if (escapeTrigger==1)
		setTimeout(function(){escapeloop();},500);
	}

	function EscapeFunc(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			console.log(type);
			console.log(subType);
			var combat=g_obj_map.get("msg_vs_info");
			if (combat==undefined){
				return;
			}
			var npcid;
			var opnpc;
			var me=g_obj_map.get("msg_attrs").get("id");
			for (var i=0;i<4;i++){
				if (combat.get("vs1_pos"+i)==me){
					opnpc=combat.get("vs1_pos1");
					npcid=combat.get("vs2_pos1");
				}else if (combat.get("vs2_pos"+i)==me){
					opnpc=combat.get("vs2_pos1");
					npcid=combat.get("vs1_pos1");
				}
			}
			if (type == "notice" && subType == "escape") {
			var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				console.log(msg);
				if (msg.match("逃跑成功")!=null){
					escapeTrigger=0;
					//开始恢复
					if (changeTrigger==1){
						changeTrigger=0;
						clickButton("fight "+opnpc,0);
						clickButton("kill "+opnpc,0);
					}
					else if(changeTrigger==0){
						clickButton("fight "+npcid,0);
						clickButton("kill "+npcid,0);
					}

				}
			}
		}
	}
	function healFunc(){
		if (healtriger==0){
			return;
		}
		var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
		var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
		var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
		var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));
		console.log("血量是: "+kee+"/"+max_kee);
		console.log("内力是: "+force+"/"+max_force);
		if (kee<max_kee){
			if (force>0) {
				clickButton('recovery',0);
			} else {
				if (healflg == 0)
				{
					clickButton('items use snow_wannianlingzhi');
				} else {
					clickButton('items use snow_qiannianlingzhi');
				}
			}
			console.log("治疗中.....");
			setTimeout(function(){healFunc()},200);
		}else{
			if (force<max_force * 0.5){
				if (healflg == 0)
				{
					clickButton('items use snow_wannianlingzhi');
				} else {
					clickButton('items use snow_qiannianlingzhi');
				}
				console.log("治疗中.....");
				setTimeout(function(){healFunc()},200);
			}
			else if (force<max_force * 0.95){
				clickButton('items use snow_qiannianlingzhi');
				console.log("治疗中.....");
				setTimeout(function(){healFunc()},200);
			}else{
				setTimeout(function(){ButtonManager.clickButtonById("Recover")},200);
			}
		}
	}

	var escape=new EscapeFunc;
    var escape1=new Escape1Func;

    /**自动战斗 start**/
    //自动战斗--------------------------
	var AutoKillIntervalFunc = null;
	function NewAutoKill(){
		ninesword();
		if($('span.outbig_text:contains(战斗结束)').length>0){
			go('prev_combat');
		}
	}

    /**6气2连 start**/
    var xdz = 0;
	var sixqpvp = 0;
    function LianZhao(){
        if(sixqpvp  == 0){
            sixqpvp = 1;
            Auto6qFunc();
			}
        else{clearKill6();
			 ngcount =0;
             sixqpvp = 0;
            }

        function Auto6qFunc(){
           // 间隔500毫秒查找比试一次
           AutoKill61FuncIntervalFunc = setInterval(AutoKill61,500);
       }

        function clearKill6(){
           clearInterval(AutoKill61FuncIntervalFunc);
        }

        function AutoKill61(){
            ninesword6();
            if($('span.outbig_text:contains(战斗结束)').length>0){
                ngcount =0;
                clickButton('prev_combat');
            }
        }
    }

    //战斗调用通用脚本----------------------------------------------------
    var banSkills = "天师灭神剑|茅山道术|碧血心法|不动明王诀|生生造化功|道种心魔经|万流归一";
    var skillName = "";
    function ninesword(){
        setTimeout(ninesword1,1000);
        if($('span.outbig_text:contains(战斗结束)').length>0){
            clickButton('prev_combat');
        }
    }
    function ninesword1(){
		zdskill = spearSkillLists;
		var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
		var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));
        var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
		var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
		if (force<max_force*0.2){
			// 释放回内技能
			for(var i = 1;i < 7;i++){
				skillName = $('#skill_'+i).children().children().text();
				if(skillName == "不动明王诀"){
					console.log(skillName);
					go('playskill '+i);
					return;
				}
			}
		}
		if (force>=max_force*0.2)
		{
            if (kee<max_kee*0.6){
			// 释放大回血技能
                for(var i = 1;i < 7;i++){
                    skillName = $('#skill_'+i).children().children().text();
                    if(skillName == "紫血大法"){
                        console.log(skillName);
                        go('playskill '+i);
                        return;
                    }
                }
            }
			// 如果找到设置的枪技能则释放
			for(var i = 1;i < 7;i++){
				skillName = $('#skill_'+i).children().children().text();
				if(skillName !== "" && isContains(zdskill, skillName)){
					console.log(skillName);
					clickButton('playskill '+i);
					return;
				}
			}
			zdskill = otherSkillLists;
			// 如果没有枪技能，则找到设置的拳剑暗刀技能释放
			for(var i = 1;i < 7;i++){
				skillName = $('#skill_'+i).children().children().text();
				if(skillName !== "" && isContains(zdskill, skillName)){
					console.log(skillName);
					clickButton('playskill '+i);
					return;
				}
			}
		}
        // 如果没找到设置技能，随便用一个非招bb的技能
        for(i = 1;i < 7;i++){
            skillName = $('#skill_'+i).children().children().text();
            if(skillName !== "" && !isContains(banSkills, skillName)){
                console.log(skillName);
                clickButton('playskill '+i);
                return;
            }
        }
    }

    //6气连招
    var ngcount =0;
    function ninesword6(){
        zdskill6 = mySkillLists;
		let vs_hp11 = $("#vs_hp11").children().children().text();
		let vs_hp12 = $("#vs_hp12").children().children().text();
		let vs_hp13 = $("#vs_hp13").children().children().text();
		let vs_hp14 = $("#vs_hp14").children().children().text();
		let vs_hp15 = $("#vs_hp15").children().children().text();
		let vs_hp16 = $("#vs_hp16").children().children().text();
		let vs_hp17 = $("#vs_hp17").children().children().text();
		let vs_hp18 = $("#vs_hp18").children().children().text();
		if(vs_hp11 > 0 || vs_hp12 > 0 || vs_hp13 > 0 || vs_hp14 > 0 || vs_hp15 > 0 || vs_hp16 > 0 || vs_hp17 > 0 || vs_hp18 > 0){
			setTimeout(ninesword61,500);
		}
        if($('span.outbig_text:contains(战斗结束)').length>0){
            clickButton('prev_combat');
            ngcount =0;
        }
    }
    function ninesword61(){
 		let force=parseInt(g_obj_map.get("msg_attrs").get("force"));
		let max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));
        var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
        var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
		if (force<max_force*0.3){
			// 释放回内技能
			for(var i = 1;i < 7;i++){
				skillName = $('#skill_'+i).children().children().text();
				if(skillName == "不动明王诀"){
					console.log(skillName);
					go('playskill '+i);
					return;
				}
			}
		}
         else if(gSocketMsg.get_xdz()<3){
            return;
        }
        else if(+g_obj_map.get("msg_attrs").get("kee")/+g_obj_map.get("msg_attrs").get("max_kee")<0.40 && ngcount<3){
            var neigong=["紫血大法","生生造化功","道种心魔经"];
            for (var i=1;i<=6;i++){
                if(g_obj_map.get("skill_button"+i)!=undefined&&$.inArray(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name")),neigong)>-1){
                    clickButton('playskill '+i,0);
                    ngcount++;
                    break;
                }
            }
        }
        else if (gSocketMsg.get_xdz() >= 6) {
            chuzhao6();
        }
        else if (gSocketMsg.get_xdz() >= 9) {
            chuzhao9();
        }
    }

    /**逃跑换边 start**/
	var escapechangeButton = document.createElement('button');
	escapechangeButton.innerText = '逃跑换边';
	//right0ButtonArray.push(escapechangeButton);
	escapechangeButton.addEventListener('click', escapechangeStart);
	var changeTrigger=0;
	function escapechangeStart(){
		escapeTrigger=1;
		changeTrigger=1;
		escapeloop();
	}
    /**逃跑回坑 start**/
	var escapeButton = document.createElement('button');
	escapeButton.innerText = '逃跑回坑';
	//right0ButtonArray.push(escapeButton);
	escapeButton.addEventListener('click', escapeStart1);
	var escapeTrigger1=0;
	function escapeStart1(){
		escapeTrigger1=1;
		escapeloop1();
	}
	function escapeloop1(){
		console.log("我逃");
		overrideclick('escape', 0) //循环逃跑判定
		if (escapeTrigger1==1)
		setTimeout(function(){escapeloop1();},500);
	}

	function Escape1Func(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			console.log(type);
			console.log(subType);
			var combat=g_obj_map.get("msg_vs_info");
			if (combat==undefined){
				return;
			}
			var npcid;
			var opnpc;
			var me=g_obj_map.get("msg_attrs").get("id");
			for (var i=0;i<4;i++){
				if (combat.get("vs1_pos"+i)==me){
					opnpc=combat.get("vs1_pos1");
					npcid=combat.get("vs2_pos1");
				}else if (combat.get("vs2_pos"+i)==me){
					opnpc=combat.get("vs2_pos1");
					npcid=combat.get("vs1_pos1");
				}
			}
			if (type == "notice" && subType == "escape") {
			var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				console.log(msg);
				if (msg.match("逃跑成功")!=null){
					escapeTrigger1=0;
				}
			}
		}
	}

	function killer(){
		overrideclick("jh 3");
		overrideclick("go west");
		overrideclick("event_1_59520311");
		overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");
		killwatch();
	}
	function killwatch(){
		var room=g_obj_map.get("msg_room");
		if (room==undefined){
			setTimeout(killwatch,200);
		}else{
			var npc=room.get("npc1");
			if (npc==undefined){
				setTimeout(killwatch,200);
			}else{
				overrideclick("watch_vs huashancun_huashancun_fb4");
			}
		}
	}
	function bekilled(){
		overrideclick("jh 3");
		overrideclick("go west");
		overrideclick("event_1_59520311");
		overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");
		overrideclick("kill huashancun_huashancun_fb4");
	}
	function selfprotection(){
		if (killerTrigger==1&&killedid==""){
			setTimeout(selfprotection,200);
		}else if(killerTrigger==1&&killedid!=""){
			clickButton("fight "+killedid,0);
			setTimeout(selfprotection,3000);
		}
	}

	function autoGodview(){
		if (g_obj_map.get("msg_attrs")==undefined){
			setTimeout(autoGodview,500);
		}else{
			GodMode=1;
			GodButton.innerText = '停止强化';
		}
	}

	function killingstart(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type=="vs"&&killorkilled==1&&killedid==""){//我还不知道对手是谁
				var combat_info=g_obj_map.get("msg_vs_info");
				if (combat_info!=undefined){
					if (combat_info.get("vs1_pos1")=="huashancun_huashancun_fb4"){
						killedid=combat_info.get("vs2_pos1");
					}else{
						killedid=combat_info.get("vs1_pos1");
					}
					overrideclick("fight "+killedid);
					overrideclick("playskill 1");
				}
			}else if(type=="vs"&&subType=="combat_result"){
				if (killorkilled==2){//被杀者
					overrideclick("kill huashancun_huashancun_fb4");
				}else{
					overrideclick("fight "+killedid);
					overrideclick("playskill 1");
				}
			}

		}
	}
	var killing=new killingstart;

	var fullpower=0;

    //默认自动事件
    function autoEvent(){
var DiscriptSecret = [
['逄义是封山派中和柳淳风同辈的弟子，但是生性好赌的他并不受师父及同门师兄弟的喜爱，因此辈分虽高，却未曾担任门中任何重要职务。逄义经常外出，美其名曰：旅行，实则避债，碍於门规又不敢做那打家劫舍的勾当，因此经常四处寻找赚钱发财的机会。','逄义'],
['这位店小二正笑咪咪地忙著，还不时拿起挂在脖子上的抹布擦脸。','店小二'],
['帅','星河大师'],
['一个苦力打扮的汉子在这里等人来雇用。','苦力'],
['这是位生性刚直，嫉恶如仇的丐帮八袋弟子。','黎老八'],
['你看到一位面色黝黑的农夫。','农夫'],
['你看到一位面色黝黑的农夫。','老农夫'],
['一只浑身脏兮兮的野狗，一双眼睛正恶狠狠地瞪著你。','疯狗'],
['魏无极是个博学多闻的教书先生，他年轻时曾经中过举人，但是因为生性喜爱自由而不愿做官，魏无极以教书为业，如果你付他一笔学费，就可以成为他的弟子学习读书识字。','魏无极'],
['一只浑身脏兮兮的野狗。','野狗'],
['蒙着脸，身后背着一把剑，看上去武艺颇为不俗。','蒙面剑客'],
['这个老人看起来七十多岁了，看著他佝偻的身影，你忽然觉得心情沈重了下来。','庙祝'],
['刘安禄是淳风武馆的门房，除了馆主柳淳风没有人知道他的出身来历，只知到他的武艺不弱，一手快刀在这一带罕有敌手。','刘安禄'],
['你看到一位身材高大的汉子，正在辛苦地操练著。','武馆弟子'],
['李火狮是个孔武有力的大块头，他正在训练他的弟子们习练「柳家拳法」。','李火狮'],
['柳淳风是个相当高大的中年儒生，若不是从他腰间挂著的「玄苏剑」你大概猜不到眼前这个温文儒雅的中年人竟是家大武馆的馆主。','柳淳风'],
['柳绘心是淳风武馆馆主柳淳风的独生女。','柳绘心'],
['安惜迩是个看起来相当斯文的年轻人，不过有时候会有些心不在焉的样子，雪亭镇的居民对安惜迩都觉得有点神秘莫测的感觉，为什麽他年纪轻轻就身为一家大钱庄的老板，还有他一身稀奇古怪的武功，所幸安惜迩似乎天性恬淡，甚至有些隐者的风骨，只要旁人不去惹他，他也绝不会去招惹旁人。','安惜迩'],
['一个喝得醉醺醺的年轻人。。。。。','醉汉'],
['这个人不但自己收破烂，身上也穿得破烂不堪。','收破烂的'],
['王铁匠正用铁钳夹住一块红热的铁块放进炉中。打孔','王铁匠'],
['杨掌柜是这附近相当有名的大善人，常常施舍草药给付不起药钱的穷人。此外他的医术也不错，年轻时曾经跟著山烟寺的玄智和尚学医，一般的伤寒小病直接问他开药吃比医生还灵。','杨掌柜'],
['此人前几年搬到雪亭镇来，身世迷糊。','花不为'],
['杜宽担任雪亭驿的驿长已经有十几年了，虽然期间有几次升迁的机会，但是他都因为舍不得离开这个小山村而放弃了，雪亭镇的居民对杜宽的风评相当不错，常常会来到驿站跟他聊天。','杜宽'],
['不要杀我~~~~~~~~~~','杜宽宽'],
['一个戴着斗笠，正在辛勤劳作的农夫。','农夫'],
['一个守卫洛阳城的士兵','守城士兵'],
['长途跋涉至此的客商。','客商'],
['身穿蓑衣坐在船头的男子，头上的斗笠压得很低，你看不见他的脸。','蓑衣男子'],
['一个穿着破破烂烂的乞丐','乞丐'],
['这人虽然年纪不大，却十分傲慢。看来金刀门是上梁不正下梁歪。','金刀门弟子'],
['王霸天已有七十来岁，满面红光，颚下一丛长长的白须飘在胸前，精神矍铄，左手呛啷啷的玩着两枚鹅蛋大小的金胆。','王霸天'],
['洛神庙的庙祝','庙祝'],
['一个穿着破破烂烂的乞丐','老乞丐'],
['洛阳城里的地痞，人见人恶。','地痞'],
['起早贪黑养家糊口的小贩。','小贩'],
['一个唾沫四溅，满身油星的屠夫。看上去粗陋鄙俗，有些碍眼。','郑屠夫'],
['丐帮5袋弟子，衣着干净，看起来是净衣派的。','何九叔'],
['洛阳城无赖，专靠耍赖撒泼骗钱。','无赖'],
['洛阳地痞无赖头领，阴险狡黠，手段极其卑鄙。','甄大海'],
['一个肥胖的中年妇女，以做媒为生。','红娘'],
['洛阳武馆馆主的女儿，身材窈窕，面若桃花，十分漂亮。性格却是骄纵任性，大小姐脾气。','柳小花'],
['此人一副风流倜傥的样子，一看就是个不知天高地厚的公子哥。','富家公子'],
['他就是丐帮第十七任帮主，号称洪老爷子。','洪帮主'],
['来白冢游玩的人，背上的包袱里鼓鼓囊囊，不知道装了什么？','游客'],
['一身绿袍的老人，除了满头白发，强健的身姿和矍铄的眼神都不像一位老者。','绿袍老者'],
['大户人家的护卫，一身劲装。','护卫'],
['隐藏在密林中打家劫舍的贼匪。','山贼'],
['书生打扮的中年男子，手中的折扇隐露寒光。','白面书生'],
['负责看守白冢的老人，看起来也是有些功夫的。','守墓人'],
['败剑山庄少庄主，跟着父亲云游四海。','凌云'],
['好游山玩水的败剑山庄庄主。','凌中天'],
['以盗窃古墓财宝为生的人。','盗墓贼'],
['看样子很斯文，不像会欺负人哦～','黑衣文士'],
['一身紧身黑衣将其身体勾勒的曲线毕露，黑纱遮住了面容，但看那剪水双眸，已经足以勾魂','黑衣女子'],
['这是是客栈的马倌，正在悉心照料客人的马匹。','马倌'],
['一身黑衣的打手，脚下功夫还是有点的。','黑衣打手'],
['混迹在赌坊里的小偷。','小偷'],
['来洛阳游玩的游客，被困在银钩赌坊一段时间了。','张逍林'],
['肌肤如白玉般晶莹的美人，不知道在这赌坊雅舍中等谁？','玉娘'],
['守护牡丹园的老人。因为洛阳城地痞不少，所以这守园老人可不轻松。','守园老人'],
['人称赛牡丹，自然是个美人儿啦~','赛牡丹'],
['鲁长老虽然武功算不得顶尖高手，可是在江湖上却颇有声望。因为他在丐帮中有仁有义，行事光明磊落，深得洪帮主的器重。','鲁长老'],
['据洛阳城中最小气的人，号称陈扒皮，意思是见了谁都想赚个小便宜。','陈扒皮'],
['她总是甜甜的微笑，让人不忍拒绝她篮子里的鲜花。','卖花姑娘'],
['洛阳城的财主，开了一家钱庄，家财万贯。','刘守财'],
['一个守卫洛阳城的武将','守城武将'],
['吃了败仗的元帅逃在此密室，却不知是为了什么。','李元帅'],
['一只四处乱窜的疯狗，顶着一身脏兮兮的的毛发。','疯狗'],
['一条全身翠绿的毒蛇，缠绕在竹枝上。','青竹蛇'],
['一身布衣，面容慈祥的老人。','布衣老翁'],
['虽然身居陋室，衣着朴素，眼神的锐利却让人不能忽视他的存在。','萧问天'],
['一名看上去风度非凡之人，正背手闭目养神中好像等候什么。','藏剑楼首领'],
['一个身受重伤的布衣青年，手持一把染血的佩剑。','剑遇北'],
['一只在松林里觅食的小松鼠。','松鼠'],
['正在吃草的野兔。','野兔'],
['好吃懒做的无赖，整天无所事事，欺软怕硬。','泼皮'],
['扎着双髻的小男孩，正在杏林里跟小伙伴们捉迷藏。','小男孩'],
['看起来跟普通村民没什么不同，但一双眼睛却透着狡黠。','王老二'],
['村内地痞，人见人恶。','村中地痞'],
['坐在土地面前抠脚的汉子','抠脚大汉'],
['凶恶的黑狗，张开的大嘴露出锋利的獠牙。','庙内黑狗'],
['身穿青衣的守卫，武功招式看起来有些眼熟。','青衣守卫'],
['四十岁左右的中年男子，颇为好色。','葛不光'],
['好吃懒做的无赖，整天无所事事，欺软怕硬。','泼皮头子'],
['声名狼藉的采花贼，一路潜逃来到了华山村。','采花贼'],
['这名铁匠看上去年纪也不大，却是一副饱经沧桑的样子。','冯铁匠'],
['身穿布衣的村民','村民'],
['一位德高望重的老人，须发已经全白。','朱老伯'],
['颇有几分姿色的女子，是个寡妇。','方寡妇'],
['宗之潇洒美少年>举觞白眼望青天>皎如玉树临风前','剑大师'],
['平日行踪有些诡秘，看来杂货铺并不是他真正的营生。','方老板'],
['衣着普通的中年男子，右脚有些跛。','跛脚汉子'],
['眸含秋水清波流盼，香娇玉嫩，秀靥艳比花娇，指如削葱根，口如含朱丹，一颦一笑动人心魂。','云含笑'],
['这是华山派弟子，奉师命下山寻找游玩未归的小师妹。','英白罗'],
['一只黑色毛发的大狗。','庙外黑狗'],
['这一代远近闻名的恶棍，欺男霸女无恶不作','刘三'],
['这是一名身穿翠绿衣裳的少女，皮肤白皙，脸蛋清秀可爱。','曲姑娘'],
['他已经深受重伤，半躺在地上。','受伤的曲右使'],
['这是一具极为可怖的男子尸体，只见他周身肿胀，肌肤崩裂，眼角、鼻子、指甲缝里都沁出了鲜血，在这片美丽的花海里，这具尸体的出现实在诡异至极。','血尸'],
['极为冷酷无情的男人，手上不知道沾满了多少无辜生命的鲜血。','藏剑楼杀手'],
['一名脏兮兮的人，颇为怕事，显得特别畏惧。','丐帮弟子'],
['一条色彩斑斓的毒蛇','毒蛇'],
['丐帮长老，衣衫褴褛，满头白发，看起来精神不错。','丐帮长老'],
['出来觅食的小狼','小狼'],
['在山上觅食的老狼','老狼'],
['清风寨土匪','土匪'],
['清风寨土匪头目','土匪头目'],
['这是一名看不出年龄的男子，一身皮肤又白又细，宛如良质美玉，竟比闺门处子都要光滑细腻许多。若不是高大身材和脸颊上青色胡茬，他可能会让大多女子汗颜。','玉牡丹'],
['清风寨军事，诡计多端。','刘龟仙'],
['清风寨二当家，一次劫镖时被刺伤一目，自此成了独眼龙。','萧独眼'],
['清风寨寨主，对手下极为严厉。','刘寨主'],
['一名青年男子，衣衫上血迹斑斑，奄奄一息的躺在地上。','米不为'],
['一面容猥琐可憎，让人不忍直视，脊背高高隆起的驼子。','孙驼子'],
['青衣长袍的书生，前来华山游玩。','吕子弦'],
['她是华山派女弟子，不施脂粉，衣着素雅。','女弟子'],
['一名满脸彪悍之色的江湖豪客','豪客'],
['这是一名来华山游玩的中年男子，背着包裹。','华山游客'],
['这是一位仙风道骨的中年道人，早年云游四方，性好任侠，公正无私。','公平子'],
['拦路抢劫的山贼','山贼'],
['山贼头目，看起来很强壮。','白二'],
['李铁嘴是个买卜算卦的江湖术士，兼代客写书信、条幅。','李铁嘴'],
['负责打理群仙观的老人','赵辅徳'],
['华山上的猿猴，时常骚扰过路人','猿猴'],
['华山剑宗弟子','剑宗弟子'],
['华山派传人，封剑羽的师弟。','丛云弃'],
['他是华山控剑宗派的第一高手。','尘无剑'],
['他是华山控剑宗派的第一高手。','封剑羽'],
['一只在松林里觅食的小松鼠。','大松鼠'],
['华山派掌门的爱女。她看起来十多岁，容貌秀丽，虽不是绝代美人，也别有一番可人之处。','岳师妹'],
['六猴儿身材很瘦，又长的尖嘴猴腮的，但别看他其貌不扬，他在同门中排行第六，是华山派年轻一代中的好手。','六猴儿'],
['他是华山派的大师兄，英气逼人。','令狐大师哥'],
['这便是当年名震江湖的华山名宿。他身著青袍，神气抑郁脸如金纸。身材瘦长，眉宇间一直笼罩着一股淡淡的忧伤神色。','风老前辈'],
['英白罗是岳不群的第八位弟子。','英黑罗'],
['日月神教小喽喽喽','魔教喽喽'],
['日月神教教众。','戚老四'],
['日月神教教众','史老三'],
['日月神教教众','闵老二'],
['日月神教教众','卢大哥'],
['日月神教教众','葛长老'],
['气宗传人小林子，实力已是非同凡响。','小林子'],
['此人整天拿着算盘，身材高大，长得很胖，但别看他其貌不扬，他在同门中排行第五，是华山派年轻一代中的好手。','高算盘'],
['同门中排行第四，是华山派年轻一代中的好手。','施剑客'],
['华山派门下的第子。','华山弟子'],
['手握长剑的蒙面人。','蒙面剑客'],
['戴着神秘的黑衣人，压低的帽檐遮住的他的面容。','黑衣人'],
['华山掌门，他今年四十多岁，素以温文尔雅著称。','岳掌门'],
['华山派小弟子。','舒奇'],
['这是一只调皮的小猴子，虽是畜牲，却喜欢模仿人样。','小猴'],
['他就是华山排行第二的弟子。','劳师兄'],
['华山派掌门的夫人，眉宇间还少不了年轻时的英气。','宁女侠'],
['他就是华山排行第三的弟子。','梁师兄'],
['陶钧是岳不群的第七位弟子','陶钧'],
['林师弟是华山众最小的一个弟子。','林师弟'],
['一个娇俏迷人的小尼姑。','小尼姑'],
['守城的官兵，相貌可长得不好瞧。','官兵'],
['花店的伙计，正忙碌地给花淋水。','花店伙计'],
['一匹受惊的大黑马，一路狂奔到了闹市街头。','大黑马'],
['看起来很强壮的中年男子','铁匠'],
['柔善良，善解人意，乖巧聪慧，体贴贤惠，清秀可人，腼腆羞涩，似乎男人喜欢的品质都集中在她身上了。','双儿'],
['扬州街头人见人恶的地痞，嘴角一颗黑色痦子，看起来极为可憎。','黑狗子'],
['一名武馆护卫，专门对付那些想混进来闹事的人。','武馆护卫'],
['在武馆拜师学艺的弟子，看来还是会些基本功。','武馆弟子'],
['武馆管家，馆中大小事务都需要向他禀报。','方不为'],
['一名武馆内的教头，专门负责教新手武功。','王教头'],
['一名四十岁左右的中年男子，脸上一道刀疤给他平添了些许沧桑。','神秘客'],
['武馆账房先生，为人极为谨慎，账房钥匙通常带在身上。','范先生'],
['这就是武馆馆主，紫金脸庞，面带威严，威武有力，站在那里就象是一座铁塔。','陈有德'],
['一名看起来和蔼的老人，手里拿着一个旱烟袋，据说跟馆主颇有渊源。','古三通'],
['杂货铺老板，看似慵懒，实则精明过人。','黄掌柜'],
['来扬州游玩的游客，背上的包裹看起来有些重。','扬州游客'],
['满脸精明的中年男子，手里的算盘拨的飞快。','账房先生'],
['一个年级尚幼的飞贼。','小飞贼'],
['一身黑色劲装，黑巾蒙面，眼露凶光。','飞贼'],
['一名四海为家的卖艺人，满脸沧桑。','艺人'],
['一名体格魁梧的妇人，看起来极为彪悍。','马夫人'],
['买花少女，手中的花篮里装着时令鲜花。','润玉'],
['扬州城里的流氓，经常四处游荡，调戏妇女。','流氓'],
['龙门镖局的镖师，正在武庙里祭拜。','刘步飞'],
['马员外是扬州有名的善人，看起来有点郁郁不乐。','马员外'],
['一条毒蛇草丛窜出，正昂首吐信虎视眈眈地盯著你。','毒蛇'],
['一名看起来很普通的僧人','扫地僧'],
['来禅智寺上香的女子，颇有几分姿色。','柳碧荷'],
['看起来很邋遢的道士，似乎有些功夫。','张三'],
['禅智寺中专做杂事的火工僧，身体十分地强壮','火工僧'],
['一个摇头晃脑正在吟诗的书生。','书生'],
['女扮男装的女子，容颜清丽，孤身一身住在魁星阁的阁楼上。','李丽君'],
['扬州城里的小混混，整天无所事事，四处游荡。','小混混'],
['看守城门的士兵','恶丐'],
['浅月楼门口的侍卫。','青衣门卫'],
['浅月楼的老板娘，看似年不过三十，也是一个颇有姿色的女子。她抬起眼来，黛眉轻扫，红唇轻启，嘴角勾起的那抹弧度仿佛还带着丝丝嘲讽。当她眼波一转，流露出的风情似可让人忘记一切。红色的外袍包裹着洁白细腻的肌肤，她每走一步，都要露出细白水嫩的小腿。脚上的银铃也随着步伐轻轻发出零零碎碎的声音。','玉娇红'],
['当朝仆射，也是一代名士，致力于金石之学，幼而好之，终生不渝。','赵明诚'],
['这是一个青楼的小侍从，不过十五六岁。','青楼小厮'],
['名满天下的第一琴姬，苏小婉是那种文人梦中的红颜知己。这样美貌才智具备的女子，怕是世间几百年才能出现一位。曾有人替她惋惜，说如若她是一大家闺秀，或许也能寻得一志趣相投之人，也会有“赌书消得泼茶香”的美谈。即使她只是一贫家女子，不读书亦不学艺，纵使是貌胜西子，或许仍可安稳一生。然而命运时常戏弄人，偏偏让那如花美眷落入淤泥，误了那似水流年。本想为一人盛开，却被众人窥去了芳颜。可她只是微微一笑，说道：『寻一平凡男子，日出而作日落而息，相夫教子，如湮没于历史烟尘中的所有女子一般。那样的生活，不是我做不到，只是不愿意。没有燃烧过的，只是一堆黑色的粉末，哪里能叫做烟火？』','苏小婉'],
['看守城门的士兵','北城门士兵'],
['一个顽皮的小童。','顽童'],
['广陵当铺老板，肩宽体壮，看起来颇为威严。','唐老板'],
['他是大旗门的掌刑长老，最是严厉不过。','云九天'],
['茶社老板娘，扬州闻名的才女，姿色娇美，精通音律，善弹琴。许多文人墨客慕名前来，茶社总是客满为患。','柳文君'],
['提着茶壶的伙计，目露精光，看起来不简单。','茶社伙计'],
['这是醉仙楼伙计，看起来有些功夫。','醉仙楼伙计'],
['一个常在酒楼混吃混喝的地痞，不知酒店老板为何不将他逐出。','丰不为'],
['一名中年男子，目露凶光。','张总管'],
['一名剑眉星目的白衣剑客。','计无施'],
['这就是江湖中有名的胡神医，看起来很普通。','胡神医'],
['一名衣着华丽，体态臃肿，手脚看起来极短的中年男子。','胖商人'],
['醉仙楼老板，能将这家祖传老店买下来，其来历应该没那么简单。','冼老板'],
['她生得极为美貌，但冰冷的目光让人不寒而栗。','赤练仙子'],
['玉器店老板，对珍宝古玩颇为熟稔。','白老板'],
['扬州官衙衙役，看起来一脸疲态。','衙役'],
['扬州官衙有名的神捕，据说曾经抓获不少江湖大盗。','公孙岚'],
['扬州知府，脸色阴沉，微有怒色，','程大人'],
['江湖有名的江洋大盗，五短身材，貌不惊人。','楚雄霸'],
['这就是当今大儒朱先生。','朱先生'],
['一个摇头晃脑正在吟诗的书生。','书生（书院）'],
['因嗜酒如命，故从少林叛出，顺便盗取些许经书以便拿来换酒。','少林恶僧'],
['此人一身黝黑的皮肤，几道深深的岁月的沟壑在他脸上烙下了印记。深邃凹进的眼眶中显露出干练的眼神。显露出不凡的船上阅历。','船运东主'],
['这是位豪爽大方的丐帮七袋弟子，看来是个北地豪杰。','左全'],
['这是位衣著邋塌，蓬头垢面的丐帮二袋弟子。','裘万家'],
['梁长老是丐帮出道最久，武功最高的长老，在武林中享名已久。丐帮武功向来较强，近来梁长老一力整顿，更是蒸蒸日上。','梁长老'],
['他是丐帮新近加入的弟子，可也一步步升到了五袋。他长的极其丑陋，脸上坑坑洼洼。','何一河'],
['这是位衣著邋塌，蓬头垢面的丐帮三袋弟子。','莫不收'],
['此人似乎是这群人的头目，正在叮嘱手下办事。','藏剑楼统领'],
['这是位衣著邋塌，蓬头垢面的丐帮七袋弟子。','何不净'],
['这是位武艺精强，却沉默寡言的丐帮八袋弟子。','马俱为'],
['这是位笑眯眯的丐帮八袋弟子，生性多智，外号小吴用。','余洪兴'],
['这是个正在这里站岗的守城官兵，虽然和许多武林人物比起来，官兵们的武功实在稀松平常，但是他们是有组织、有纪律的战士，谁也不轻易地招惹他们。','守城官兵'],
['一个相貌朴实的卖饼大叔，憨厚的脸上挂著和蔼的笑容。','卖饼大叔'],
['陆得财是一个浑身脏兮兮的老丐，一副无精打采要死不活的样子，可是武林中人人都识得他身上打著二十三个结的皮酒囊，这不但是「花紫会」龙头的信物，更是名镇漠南的「黑水伏蛟」独门兵器，只不过陆得财行踪诡密，据说各处随时都有七、八的他的替身在四处活动，所以你也很难确定眼前这个陆得财到底是不是真的。','陆得财'],
['这个卖包子的小贩对你微微一笑，说道：热腾腾的包子，来一笼吧。','卖包子的'],
['一位相貌威武的武官，独自一个人站在这里发呆，似乎正有什麽事困扰著他。','武官'],
['体型与小孩一般，脸上却满是皱纹，头发已经掉光。','怪人'],
['汤掌柜是这家大酒楼的主人，别看他只是一个小小的酒楼老板，乔阴县境内除了知县老爷以外，恐怕就属他最财大势大。','汤掌柜'],
['一个穿著家人服色的男子，必恭必敬地垂手站在一旁。','家丁'],
['一个相貌俊美的年轻贵公子正优雅地欣赏著窗外的景物。','贵公子'],
['一个身穿蓝布衣的人，从他锐利的眼神跟神情，显然是个练家子。','酒楼守卫'],
['一个看起来相当斯文的书生，正拿著一本书摇头晃脑地读著。','书生'],
['一个服侍有钱人家小姐的丫鬟，正无聊地玩弄著衣角。','丫鬟'],
['一个看起来像是有钱人家的女子，正在这里游湖。','官家小姐'],
['这个老太婆怀中抱了个竹篓，似乎在卖什麽东西，也许你可以跟她问问价钱？','乾瘪老太婆'],
['一个衣饰华丽的妇人正跪在这里虔诚地膜拜著。','妇人'],
['骆云舟本是世家公子，因喜爱诗酒剑法，不为家族中人所偏爱。因此他年少离家，常年在外漂泊，时至今日，倒是武有所成，在文学的造诣上，也是深不可测了。','骆云舟'],
['一名谈吐不凡的中年男子，备受手下尊崇','藏剑楼长老'],
['此人文质彬彬，手持一本书册，正不断的翻阅似乎想在里面找到想要的答案。','藏剑楼学者'],
['这是一头全身白色毛发的猿猴。','白猿'],
['她是峨眉派的“文”辈弟子。','文虚师太'],
['一个女弟子，手上拿着一把长剑。','看山弟子'],
['她是峨眉派的“文”辈弟子。','文寒师太'],
['她是峨眉派的“文”辈弟子。','文玉师太'],
['一个拿着武器，有点气势的巡山弟子。','巡山弟子'],
['他今年二十岁，乃是武当第三代中出类拔萃的人物。','青书少侠'],
['这是个小女孩。','小女孩'],
['峨眉山上做点小生意的小贩。','小贩'],
['她是峨眉派的“静”辈弟子。','静洪师太'],
['她是峨眉派的“静”辈弟子。','静雨师太'],
['这是个少女，虽然只有十二、三岁，身材已经开始发育。','女孩'],
['这是一个年轻尼姑，似乎有几手武功。','尼姑'],
['这是一个年轻尼姑。','尼姑'],
['一个年纪赏小的尼姑。','小尼姑'],
['她是峨眉派的“静”辈弟子。','静玄师太'],
['她是峨嵋派的第四代俗家弟子。','贝锦瑟'],
['一条剧毒的毒蛇。','毒蛇'],
['她是一位年轻的师太。是灭绝石台座前的护法弟子。','护法弟子'],
['她是一位年轻的师太。是灭绝石台座前的护法弟子。','护法大弟子'],
['这是一位年纪不算很大的师太。','静慈师太'],
['她是峨嵋派的第三代弟子，现任峨嵋派掌门人。','灭绝掌门'],
['她是峨嵋派的第四代俗家弟子。','方碧翠'],
['钓鱼城派往长安求援的传令兵，行色匆匆，满面尘土。','传令兵'],
['负责运送器械的士兵。','运输兵'],
['负责侦查敌情的军士','斥候'],
['管理军械库的一位中年军官，健壮有力。','军械官'],
['钓鱼城守城大军的神箭手，百步穿杨，箭无虚发。','神箭手'],
['辽国皇族后裔，蒙古宰相耶律楚材之子，金狼军主帅。他骁勇善战，精通兵法，凭借着一手堪可开山破岳的好斧法杀得武林中人无人可挡闻之色变。视天波杨门为心腹之患欲处之而后快。','耶律霸'],
['攻城大军的先锋军士，满脸凶狠，却也掩饰不住疲乏之色。','先锋军士'],
['攻城先锋大将，长期毫无进展的战事让他难掩烦躁。','先锋敌将'],
['攻城大军的赤豹营死士，战力蛮横，重盔重甲，防御极好。','赤豹死士'],
['守城的军士，英勇强悍，不畏生死。','守城军士'],
['攻城大军的黑鹰营死士，出手极准。','黑鹰死士'],
['攻城大军将领的近身精锐。','金狼死士'],
['攻城大将，曾是江湖上一等一的好手。','金狼大将'],
['管理粮库的军官，双眼炯炯有神，一丝一毫的细节都牢记于心。','粮库主薄'],
['守军参谋军官，负责传递消息和提出作战意见。','参谋官'],
['钓鱼城守城大将，智勇双全，有条不紊地指挥着整座城市的防御工作。','王坚'],
['此人手持长剑，正虎视眈眈的留神周围，准备伺机而动。','藏剑楼剑客'],
['一个盘踞山林的盗匪。','山盗'],
['恒山派俗家弟子，脸上没有一丝表情，让人望而却步。','秦卷帘'],
['虽着一身袈裟，但一脸络腮胡让他看起来颇有些凶悍。','九戒大师'],
['恒山派俗家弟子，看起来清丽可人。','郑婉儿'],
['一身黑衣，头发虽已花白，但俏丽的容颜却让人忍不住多看两眼','哑太婆'],
['身背行囊的游客，看起来会些功夫。','云问天'],
['一身短装的女子，头戴纱帽，一张俏脸在面纱后若隐若现，让人忍不住想掀开面纱瞧个仔细。','柳云烟'],
['一名身份可疑的男子，最近常在山上游荡。','石高达'],
['一名行走五湖四海的游侠，看起来功夫还不错。','公孙浩'],
['曾经是江湖上有名的采花大盗，被不戒和尚用药迷倒，剪掉了作案工具，剃度后收为徒弟。','不可不戒'],
['一条吐着红舌头的毒蛇','山蛇'],
['恒山派白云庵庵主，外刚内和，脾气虽然暴躁，心地却极慈祥。','定云师太'],
['恒山派大弟子','仪容'],
['恒山派二弟子','仪雨'],
['恒山入门弟子','小师太'],
['这是一只黑色的吸血蝙蝠','吸血蝙蝠'],
['恒山派掌门，心细如发，虽然平时极少出庵，但于江湖上各门各派的人物，无一不是了如指掌，其武功修为极高。','定安师太'],
['日月神教杀手，手段极其凶残。','神教杀手'],
['魔教杀手，一张黄脸让人过目难忘。','魔教杀手'],
['看起来风流倜傥的中年男子，魔教的小头目。','魔教头目'],
['嵩山派弟子','嵩山弟子'],
['嵩山派高手，看起来颇有些修为。','赵志高'],
['嵩山派高手，看起来颇有些修为。','司马承'],
['嵩山派高手，看起来颇有些修为。','沙江龙'],
['嵩山派大弟子，武功修为颇高。','史师兄'],
['这家伙满脸横肉一付凶神恶煞的模样，令人望而生畏。','土匪'],
['这家伙满脸杀气，一付凶神恶煞的模样，令人望而生畏。','土匪头'],
['一位邋邋遢遢的道士。','王五'],
['一只好可爱的小野兔。','野兔'],
['一位前往武当山进香的人。','进香客'],
['他今年二十岁，乃是武当第三代中出类拔萃的人物。','青书少侠'],
['他是武当山的知客道长。','知客道长'],
['他是武当山的小道童。','道童'],
['他就是清虚道长。他今年四十岁，主管武当派的俗事。','清虚道长'],
['一位正在练功的青年弟子，但似乎很不耐烦。','练功弟子'],
['他就是张三丰的大弟子、武当七侠之首。身穿一件干干净净的灰色道袍。他已年过六十，身材瘦长，满脸红光。恬淡冲和，沉默寡言。','宋首侠'],
['他就是张三丰的二弟子俞莲舟。他今年五十岁，身材魁梧，气度凝重。虽在武当七侠中排名第二，功夫却是最精。','俞莲舟'],
['他就是武当派开山鼻祖、当今武林的泰山北斗，中华武功承先启后、继往开来的大宗师。身穿一件污秽的灰色道袍，不修边幅。身材高大，年满百岁，满脸红光，须眉皆白。','张三丰'],
['他就是张三丰的四弟子张松溪。他今年四十岁，精明能干，以足智多谋著称。','张松溪'],
['这是个年年龄不大的小姑娘，但宽松的道袍也遮不住她过早发育的身体。一脸聪明乖巧，满口伶牙俐齿。见有人稍微示意，便过去加茶倒水。','小翠'],
['服下丹药之后的他武功似乎提升了不少，实力不容小觑。','俞二侠'],
['这是一只蜜蜂，正忙着采蜜。','蜜蜂'],
['这是一只蜜蜂，正忙着采蜜。','小蜜蜂'],
['这只猴子在在桃树间跳上跳下，还不时津津有味地啃几口着蜜桃。','猴子'],
['遇剑阁的一名剑童，长得十分可爱。','剑童'],
['一位似乎身重剧毒的老前辈，但仍能看出其健康之时武功不凡。','剑遇安'],
['一个布衣青年，腰间系着一把配剑。','剑遇南'],
['一位布衣长者，看起来道风仙骨。','剑遇穆'],
['一位身形肥胖的布衣青年。','剑遇治'],
['一位看起来非常高傲的老前辈。','剑遇山'],
['遇剑阁的一位弟子，不知是哪个长老门下的。','布衣弟子'],
['一问看起来非常慈祥的老前辈。','剑遇行'],
['一位看起来非常自负的老前辈。','剑遇鸣'],
['一只翩翩起舞的小蝴蝶哦!','蝴蝶'],
['小姑娘是晚月庄的女弟子，虽说身形单薄，可眼神里透出的傲气让人感到并不好欺负。','彩衣少女'],
['一名婢女，长的到也清秀。','婢女'],
['蓝止萍是一个十分出色的美女，她弹的一手琵琶更是闻名千里，许多王侯子弟，富商豪客都为她天下无双的美貌与琴艺倾倒。','蓝止萍'],
['蓝雨梅是晚月庄主蓝止萍的养女，由於庄主不信任男子，因此晚月庄接待外宾的工作向来由她负责。','蓝雨梅'],
['她看起来像个小灵精，头上梳两个小包包头。她坐在地上，看到你看她便向你作了个鬼脸!你想她一定是调皮才会在这受罚!','芳绫'],
['她看起来非常可爱。身材玲珑有致，曲线苗条。第一眼印象，你觉的她舞蹈一定跳的不错，看她的一举一动有一种说不出的流畅优雅！','昭仪'],
['她长得十分漂亮！让你忍不住多瞧她几眼，从她身上你闻到淡淡的香气。她很有礼貌的向你点头，优雅的动作，轻盈的步伐，好美哦!','昭蓉'],
['她看起来很有活力，两眼明亮有神。给你一种巾帼不让须眉的气势，但刚毅之中似又隐含著女孩子有的娇柔。','苗郁手'],
['她是惜春的妹妹，跟姐姐从小就在晚月庄长大。因为与双亲失散，被庄主收留。平常帮忙庄内琐碎事务。','圆春'],
['一名婢女，长的到也清秀。','婢女'],
['她看起来成熟中带有一些稚气。飘逸的长发十分迷人。她是个孤儿，从小与妹妹圆春被庄主收留，她很聪明，在第四代弟子中算是武功很出色的一个。','惜春'],
['火神「凤凰」乃勇士寒於的魂魄所化成的十三个精灵之一。由於其奇异神迹，被晚月庄供奉为护庄神兽。','凤凰'],
['她国色天香，娇丽无伦；温柔娴静，秀绝人寰。可惜眉心上有一道地煞纹干犯紫斗，恐要玉手染血，浩劫武林。','金仪彤'],
['她已是步入老年，但仍风采依旧。','瑷伦'],
['她国色天香，娇丽无伦；温柔娴静，秀绝人寰。她姿容绝美，世所罕见。从她身旁你闻道一寒谷幽香。','曲馥琪'],
['一个狂放书生，显是出自豪富之家，轻财好施，慷慨任侠。','陈子昂'],
['这小贩左手提着个篮子，右手提着个酒壶。篮上系着铜铃，不住叮铛作响。','铁血小贩'],
['这是一个僧不僧俗不俗，满头乱发的怪人','酒肉和尚'],
['一个风尘仆仆的侠客。。','梦玉楼'],
['这是一只天邪派的灵兽「天邪虎」，火红的毛皮上有著如白银般的白纹，湛蓝色的眼珠中散发出妖异的光芒。','天邪虎'],
['这是一个水烟阁武士。','水烟阁武士'],
['於兰天武的亲兵，追随於兰天武多年，如今隐居于水烟阁，继续保护王爷','董老头'],
['这个人身著红色水烟阁武士服色，眼神十分锐利。','水烟阁红衣武士'],
['这个人看起来十分和蔼可亲，一双眼睛炯炯有神。','水烟阁司事'],
['萧辟尘自幼生长於岚城之中，看起来仙风道骨，不食人间烟火。','萧辟尘'],
['潘军禅是当今武林的一位传奇性人物，以他仅仅二十八岁的年龄竟能做到水烟阁执法使的职位，著实是一位不简单的人物。潘军禅是封山剑派掌门柳淳风的结拜义弟，但是他为人其实十分风趣，又好交朋友，丝毫不会摆出武林执法者的架子。','潘军禅'],
['於兰天武是当今皇上的叔父，但是他毕生浸淫武学，甘愿抛弃荣华富以换取水烟阁传功使一职，以便阅读水烟阁中所藏的武学典籍，无论你有什麽武学上的疑难，他都能为你解答。','於兰天武'],
['黑色山猪，披着一身刚硬的鬃毛。','山猪'],
['一只脏兮兮的田鼠，正在田间觅食。','田鼠'],
['少林寺僧人，负责看守山门。','僧人'],
['勤劳朴实的山民，皮肤黝黑粗糙。','乔三槐'],
['一个农家小孩，不知道在这里干什么。','小孩'],
['一名年轻僧人，身穿灰色僧衣。','扫地和尚'],
['一名年轻僧人，身穿灰色僧衣。','挑水僧'],
['一名年轻僧人，身穿灰色僧衣。','洒水僧'],
['天真无邪的小沙弥','青松'],
['这是一个天真活泼的小沙弥，刚进寺不久，尚未剃度','小北'],
['青衣小沙弥，尚未剃度。','小南'],
['身穿黄色僧衣的僧人，负责看守藏经阁。','巡寺僧人'],
['来寺里进香的中年男子，看起来满脸疲惫。','进香客'],
['一名看起来凶神恶煞的狱卒','狱卒'],
['游历四方学艺的僧人，看起来武功修为颇高。','行者'],
['他是一位云游四方的行者，风霜满面，行色匆匆，似乎正在办一件急事。','行者'],
['一个年老的僧人，看上去老态龙钟，但是双目间却有一股精气？','扫地僧'],
['他是一位未通世故的青年和尚，脸上挂着孩儿般的微笑。','托钵僧'],
['一名灰衣僧人，灰布蒙面，一双眼睛里透着过人的精明。','灰衣僧'],
['一位守着少林药楼的高僧。','守药僧'],
['一名年轻僧人，身穿灰色僧衣。','砍柴僧'],
['他是一位须发花白的老僧，身穿一袭金边黑布袈裟。他身材瘦高，太阳穴高高鼓起，似乎身怀绝世武功。','澄X'],
['他是一位身穿黄布袈裟的青年僧人。脸上稚气未脱，身手却已相当矫捷，看来似乎学过一点武功。','虚通'],
['他是一位身材高大的中年僧人，两臂粗壮，膀阔腰圆。他手持兵刃，身穿一袭灰布镶边袈裟，似乎有一身武艺。','道X禅师'],
['他是一位两鬓斑白的老僧，身穿一袭青布镶边袈裟。他身材略高，太阳穴微凸，双目炯炯有神。','慧X尊者'],
['他是一位体格强健的壮年僧人，他身得虎背熊腰，全身似乎蕴含着无穷劲力。他身穿一袭白布黑边袈裟，似乎身怀武艺。','清X比丘'],
['他是一位白须白眉的老僧，身穿一袭银丝棕黄袈裟。他身材极瘦，两手更象鸡爪一样。他双目微闭，一副没精打采的模样。','玄难大师'],
['他是一位白须白眉的老僧，身穿一袭金丝绣红袈裟。他身材略显佝偻，但却满面红光，目蕴慈笑，显得神完气足。','玄慈大师'],
['他是一位白须白眉的老僧，身穿一袭银丝棕黄袈裟。他身材高大，两手过膝。双目半睁半闭，却不时射出一缕精光。','玄痛大师'],
['他是一位白须白眉的老僧，身穿一袭银丝棕黄袈裟。他身材瘦高，脸上满布皱纹，手臂处青筋绽露，似乎久经风霜。','玄苦大师'],
['他是一位白须白眉的老僧，身穿一袭银丝棕黄袈裟。他身材甚高，但骨瘦如柴，顶门高耸，双目湛然有神。','玄悲大师'],
['魔教任教主之女，有倾城之貌，闭月之姿，流转星眸顾盼生辉，发丝随意披散，慵懒不羁。','盈盈'],
['正在禅室打坐修行的僧人。','打坐僧人'],
['似乎常年镇守于藏经阁，稀稀疏疏的几根长须已然全白，正拿着经书仔细研究。','守经僧人'],
['一名憨头憨脑的和尚，手里端着茶盘。','小沙弥'],
['黑布蒙面，只露出一双冷电般的眼睛的黑衣大汉。','黑衣大汉'],
['契丹绝顶高手之一，曾随汉人学武，契丹鹰师总教头。','萧远山'],
['少林寺高僧，武功修为无人能知。','白眉老僧'],
['颇有姿色的中年女子，一双大眼里似乎隐藏着无穷愁苦、无限伤心。','叶十二娘'],
['“吐秀乔林之下，盘根众草之旁。虽无人而见赏，且得地而含芳。”她如同空谷幽兰一般素雅静谧，纤巧削细，面若凝脂，眉目如画，神若秋水。','冷幽兰'],
['少林寺弟子，虚竹的师傅，武功修为平平。','慧轮'],
['这是少林派的开山祖师达摩老祖他身材高大，看起来不知有多大年纪，目光如炬，神光湛然！','达摩老祖'],
['五代十国神枪王后人，英气勃发，目含剑气。','高一毅'],
['张宪之子，身形高大，威风凛凛','张之岳'],
['这是唐门的弟子，不苟言笑。','唐门弟子'],
['唐风是唐门一个神秘之人，世人对他知之甚少。他在唐门默默地传授武艺，极少说话。','唐风'],
['这是嫡系死士之一，一身的功夫却是不凡。','唐看'],
['唐门门主，在江湖中地位很高。','唐怒'],
['一个美丽的中年妇女，使得一手好暗器。','方媃'],
['唐门中的高层，野心很大，一直想将唐门称霸武林。','唐鹤'],
['唐门中所有的绝门镖法，他都会用。','唐镖'],
['人如其名，虽然年幼，但已是能看出美人胚子了。','唐缘'],
['虽然是一个少女，但武艺已达精进之境界了。','唐芳'],
['他身怀绝技，心气也甚高。','唐健'],
['这是嫡系死士之一，一身的功夫却是不凡。用毒高手。','唐舌'],
['一个小女孩，十分可爱。','唐情'],
['一个尚未成年的小男孩，但也已经开始学习唐门的武艺。','唐刚'],
['一个老妇人，眼睛中射出道道精光，一看就是武艺高强之人。','欧阳敏'],
['曾是两淮一代最有天赋的年轻剑客，在观海庄追杀徽北剧盗之战一剑破对方七人刀阵，自此“倾城剑客”之名响彻武林。','程倾城'],
['一位没有名字的剑客，他很可能是曾经冠绝武林的剑术高手。','无名剑客'],
['这是一个沉默不语的剑客，数年来不曾说过一句话，专注地参悟着剑池绝学。','默剑客'],
['湖竺家一门七进士，竺霁庵更是天子门生独占鳌头，随身喜携带一柄折扇。后因朝廷乱政心灰意冷，弃仕从武，更拜入少林成为俗家弟子。不足二十三岁便学尽少林绝学，武功臻至登峰造极之化境。后在燕北之地追凶时偶遇当时也是少年的鹿熙吟和谢麟玄，三人联手血战七日，白袍尽赤，屠尽太行十八夜骑。三人意气相投，志同道合，结为异姓兄弟，在鹿谢二人引荐下，终成为浣花剑池这一代的破军剑神。','竺霁庵'],
['他的相貌看起来是那么宁静淡泊、眼睛眉毛都透着和气，嘴角弯弯一看就象个善笑的人。他不象个侠客，倒象一个孤隐的君子。不了解的人总是怀疑清秀如竹的他怎么能拿起手中那把重剑？然而，他确是浣花剑派最嫉恶如仇的剑神，武林奸邪最惧怕的名字，因为当有恶人听到『甄不恶』被他轻轻从嘴里吐出，那便往往是他听到的最后三个字。','甄不恶'],
['本是淮南渔家子弟，也并无至高的武学天赋，然其自幼喜观察鱼虫鸟兽，竟不自觉地悟出了一套气脉运转的不上心法。后因此绝学获难，被千夜旗余孽追杀，欲夺其心法为己用。上代封山剑主出手相救，并送至廉贞剑神门下，专心修炼内功，最终竟凭借其一颗不二之心，成就一代剑神。','素厉铭'],
['塞外武学世家骆家家主的千金，自幼聪慧无比，年纪轻轻便习尽骆家绝学，十八岁通过剑池试炼，成为剑池数百年来最年轻的七杀剑神。她双眸似水，却带着谈谈的冰冷，似乎能看透一切；四肢纤长，有仙子般脱俗气质。她一袭白衣委地，满头青丝用蝴蝶流苏浅浅绾起，虽峨眉淡扫，不施粉黛，却仍然掩不住她的绝世容颜。','骆祺樱'],
['一袭青缎长衫，儒雅中透着英气，好一个翩翩公子。书香门第之后，其剑学领悟大多出自绝世的琴谱，棋谱，和书画，剑法狂放不羁，处处不合武学常理，却又有着难以言喻的写意和潇洒。他擅长寻找对手的薄弱环节，猛然一击，敌阵便土崩瓦解。','谢麟玄'],
['曾经的湘西农家少年，全家遭遇匪祸，幸得上一代巨门剑神出手相救。剑神喜其非凡的武学天赋和不舍不弃的勤奋，收作关门弟子，最终得以承接巨门剑神衣钵。祝公博嫉恶如仇，公正不阿，视天道正义为世间唯一准则。','祝公博'],
['身着鹅黄裙衫的少女，一席华贵的栗色秀发真达腰际，碧色的瞳孔隐隐透出神秘。她见你走过来，冲你轻轻一笑。','黄衫少女'],
['浣花剑派当世的首席剑神，他身形挺拔，目若朗星。虽然已是中年，但岁月的雕琢更显出他的气度。身为天下第一剑派的首席，他待人和善，却又不怒自威。百晓公见过鹿熙吟之后，惊为天人，三月不知如何下笔，最后据说在百晓图录贪狼剑神鹿熙吟那一页，只留下了两个字：不凡。他的家世出身是一个迷，从来无人知晓。','鹿熙吟'],
['他一生守护在这，剑重要过他的生命。','独臂剑客'],
['神秘的江湖侠客，如今在这里不知道作甚么。','无情剑客'],
['一身黑衣，手持长剑，就像世外高人一样。','黑衣剑客'],
['一个风程仆仆的侠客。','青衣剑客'],
['傲然而立，一脸严肃，好像是在瞪着你一样。','紫衣剑客'],
['海公公是皇帝身边的红人，不知为什么在此？','海公公'],
['这是福州城外的一个仵作，专门检验命案死尸。','仵作'],
['这是福州城中人见人恶的恶少，最好别惹。','恶少'],
['恶少带着这个仆人，可是威风得紧的。','仆人'],
['一个卖肉的屠夫。','屠夫'],
['酒店老板是福州城有名的富人。','酒店老板'],
['这个店小二忙忙碌碌，招待客人手脚利索。','店小二'],
['这是一个女店小二，在福州城内，可是独一无二哦。','女侍'],
['一个漂亮的女老板，体格风骚。','酒店女老板'],
['花店中卖花的姑娘，花衬人脸，果然美不胜收。','小甜'],
['此人三十来岁，专门福州驾驶马车。','阿美'],
['福威镖局的弟子。','镖局弟子'],
['这个镖师穿着一身黄衣。','黄衣镖师'],
['这个镖师穿着一身红衣。','红衣镖师'],
['这个镖师穿着一身白衣。','白衣镖师'],
['林师弟是华山众最小的一个弟子。','林师弟'],
['一个贩卖兵器的男子，看不出有什么来历。','兵器贩子'],
['此人学富五车，摇头晃脑，只和人谈史论经。','读千里'],
['福州的捕快，整天懒懒散散，不务正业。','福州捕快'],
['此人官架子很大。','福州府尹'],
['一个青年人，眼神有悲伤、亦有仇恨。','童泽'],
['木道神是青城山的祖师级人物了，年纪虽大，但看不出岁月沧桑。','木道神'],
['一个眼神凶恶的老头，身材有点佝偻。','童隆'],
['背着一把普通的剑，神态自若，似乎有一股剑势与围于周身，退隐江湖几十年，如今沉醉于花道。','背剑老人'],
['一个到处贩卖药材的赤脚医生。','游方郎中'],
['青城派的弟子，年纪刚过二十，武艺还过得去。','青城派弟子'],
['青城派的弟子，年纪刚过二十，武艺不错，资质上乘。','青城弟子'],
['他就是「英雄豪杰，青城四秀」之一，武功也远高同门。','侯老大'],
['他就是「英雄豪杰，青城四秀」之一，武功也远高同门。','罗老四'],
['他就是和申人俊焦孟不离的吉人通。','吉人英'],
['他就是「青城派」中最为同门不齿、最下达的家伙。','贾老二'],
['青城派十八代掌门人','余大掌门'],
['一个穿着黄色道袍的老道士。','黄袍老道'],
['一个穿着青色道袍的老道士。','青袍老道'],
['他就是「英雄豪杰，青城四秀」之一，武功也远高同门。','于老三'],
['他就是「福武镖局」的总镖头林震南。','林总镖头'],
['一个蒙着面部，身穿黑色夜行衣服的神秘人。','蒙面人'],
['他雅擅丹青，山水人物，翎毛花卉，并皆精巧。拜入师门之前，在大宋朝廷做过领军将军之职，因此大家便叫他吴统领。','吴统领'],
['据说他就是鲁班的后人，本来是木匠出身。他在精于土木工艺之学，当代的第一巧匠，设计机关的能手。','冯巧匠'],
['他师从先生，学的是围棋，当今天下，少有敌手。','范棋痴'],
['此人就是苏先生，据说他能言善辩，是一个武林中的智者，而他的武功也是无人能知。','苏先生'],
['她精于莳花，天下的奇花异卉，一经她的培植，无不欣欣向荣。','石师妹'],
['据说他精通医理，可以起死回生。','薛神医'],
['只见他高额凸颡，容貌奇古，笑眯眯的脸色极为和谟，手中抱着一具瑶琴。','康琴癫'],
['他看上去也是几十岁的人了，性好读书，诸子百家，无所不窥，是一位极有学问的宿儒，却是纯然一个书呆子的模样。','苟书痴'],
['他看起来青面獠牙，红发绿须，形状可怕之极，直是个妖怪，身穿一件亮光闪闪的锦袍。他一生沉迷扮演戏文，疯疯颠颠，于这武学一道，不免疏忽了。','李唱戏'],
['马帮帮主，总管事，喜欢钱财的老狐狸。','常一恶'],
['他就是逍遥派开山祖师、但是因为逍遥派属于一个在江湖中的秘密教派，所以他在江湖中不是很多人知道，但其实他的功夫却是。。。。他年满七旬，满脸红光，须眉皆白。','逍遥祖师'],
['她乍一看似乎是个十七八岁的女子，可神情却是老气横秋。双目如电，炯炯有神，向你瞧来时，自有一股凌人的威严。','天山姥姥'],
['这是一只看起来有些疲惫的骆驼。','骆驼'],
['新郎官的未婚妻，被高衙内抓到此处。','新娘'],
['辽德宗耶律大石之子，身材高大，满面虬髯。','耶律夷烈'],
['一条剧毒的毒蛇。','毒蛇'],
['一只四肢强健的野猪，看起来很饿。','野猪'],
['这是一直体型较大的野猪，一身黑色鬃毛。','黑鬃野猪'],
['这是野猪比普通野猪体型大了近一倍，一身棕褐色鬃毛竖立着，看起来很凶残。','野猪王'],
['此人好色奸诈，但武功卓绝，乃是一代武林高手。经常与鹤发老人同闯武林。','鹿杖老人'],
['此人愚钝好酒，但武功卓绝，乃是一代武林高手。经常与鹿杖老人同闯武林。','鹤发老人'],
['一个套着白色长袍，带着白色面罩的人，犹如鬼魅，让人见之心寒','白面人'],
['这是一名官兵，虽然武艺不能跟武林人士比，但他们靠的是人多力量大','官兵'],
['江湖上臭名昭著的七煞堂弟子，最近经常聚集在禹王台，不知道有什么阴谋。','七煞堂弟子'],
['七煞堂打手，还有点功夫的','七煞堂打手'],
['七煞堂护卫，似乎有一身武艺','七煞堂护卫'],
['武功高强的护卫，乃总舵主的贴身心腹。','七煞堂护法'],
['这是七煞堂总舵主，看起道貌岸然，但眼神藏有极深的戾气。','七煞堂总舵主'],
['这是七煞堂堂主，看起来一表人才，不过据说手段极为残忍。','七煞堂堂主'],
['一个衣衫褴褛，面有饥色的10多岁小男孩，正跪在大堂前，眼里布满了绝望！','小男孩'],
['这是一个勤劳朴实的手艺人，据说他做的灯笼明亮又防风。','灯笼小贩'],
['赵大夫医术高明，尤其善治妇科各种疑难杂症。','赵大夫'],
['这就是大名鼎鼎的南侠。','展昭'],
['这是大名鼎鼎的北侠。','欧阳春'],
['这是一位皮货商，他自己也是满身皮裘。','皮货商'],
['他就是朝中的龙图大学士包丞相。只见他面色黝黑，相貌清奇，气度不凡。让你不由自主，好生敬仰。','包拯'],
['这是一名披着大红花的新郎官，脸上喜气洋洋。','新郎官'],
['他长得奸嘴猴腮的，一看就不像是个好人。','混混张三'],
['他是大旗门的元老。他刚正不阿，铁骨诤诤。','铁翼'],
['开封府中的富户，看起来脑满肠肥，养尊处优。','刘财主'],
['这名武官看起来养尊处优，不知道能不能出征打仗。','武官'],
['这就是开封府内恶名远扬的高衙内，专一爱调戏淫辱良家妇女。','高衙内'],
['他是一位身材高大的青年僧人，两臂粗壮，膀阔腰圆。他手持兵刃，身穿一袭白布镶边袈裟，似乎有一身武艺。','护寺僧人'],
['一个见佛烧香的老太太，花白的头发松散的梳着发髻，满是皱纹的脸上愁容密布','烧香老太'],
['这便是开封府霍霍有名的捕头张龙，他身体强壮，看上去武功不错。','张龙'],
['开封府中的富户，最近家中似乎有些变故。','孔大官人'],
['在寺庙中烧饭的和尚。','素斋师傅'],
['大相国寺附近的泼皮，常到菜园中偷菜。','泼皮'],
['一个老朽的僧人，脸上满是皱纹，眼睛都睁不开来了','老僧人'],
['一名专职在灶下烧火的僧人','烧火僧人'],
['一身玄衣的一个少年，似乎对开封的繁华十分向往。','玄衣少年'],
['一个老实巴交的农民，卖些新鲜的蔬菜','菜贩子'],
['王家纸马店老板，为人热诚。','王老板'],
['这是一名膀大腰圆的码头工人，也许不会什么招式，但力气肯定是有的','码头工人'],
['看起来精明能干的中年男子，坚毅的眼神让人心生敬畏。','船老大'],
['名衣衫褴褛的书生，右手摇着一柄破扇，面色焦黄，两眼无神。','落魄书生'],
['他长得奸嘴猴腮的，一看就不像是个好人。','李四'],
['看起来有些酸腐的书生，正在查看贡院布告牌。','陈举人'],
['开封的前任知府大人，如今虽退休多年，但仍然忧国忧民。','张老知府'],
['一个白白胖胖的年轻人，一看就知道是娇生惯养惯的富家子。','富家弟子'],
['天波府侍卫，个个均是能征善战的勇士！','天波侍卫'],
['容貌俏丽，风姿绰约，自幼在天波杨门长大，性情爽直勇敢，平日里常跟穆桂英练功习武，十八般武艺样样在行。曾被封为“征西先锋将军”，大败西夏国元帅殷奇。因为是烧火丫头出身，且随身武器是烧火棍，所以被宋仁宗封为“火帅”。又因为，民间称赞其为“红颜火帅”。','杨排风'],
['杨延昭是北宋抗辽名将杨业的长子，契丹人认为北斗七星中的第六颗主镇幽燕北方，是他们的克星，辽人将他看做是天上的六郎星宿下凡，故称为杨六郎。','杨延昭'],
['一个豆蔻年华的小姑娘，看其身手似也是有一点武功底子的呢。','侍女'],
['名将之女，自幼受其父兄武略的影响，青年时候就成为一名性机敏、善骑射，文武双全的女将。她与普通的大家闺秀不同，她研习兵法，颇通将略，把戍边御侵、保卫疆域、守护中原民众为己任，协助父兄练兵把关，具备巾帼英雄的气度。夫君边关打仗，她在杨府内组织男女仆人丫环习武，仆人的武技和忠勇之气个个都不亚于边关的士兵','佘太君'],
['六郎之妻，为后周世宗柴荣之女，宋太祖赵匡胤敕封皇御妹金花郡主。一名巾帼英雄、女中豪杰，成为当时著名的杨门女将之一，有当时天下第一美女之称。','柴郡主'],
['穆柯寨穆羽之女，有沉鱼落雁之容，且武艺超群，巾帼不让须眉。传说有神女传授神箭飞刀之术。因阵前与杨宗保交战，穆桂英生擒宗保并招之成亲，归于杨家将之列，为杨门女将中的杰出人物。','穆桂英'],
['乃天波杨门幺女。体态文秀儒雅、有惊鸿之貌，集万千宠爱于一身，被杨门一族视为掌上明珠。其武学集杨门之大成，却又脱胎于杨门自成一格，实属武林中不可多得的才女。','杨文姬'],
['这便是开封府霍霍有名的捕头赵虎，他身体强壮，看上去武功不错。','赵虎'],
['春天出来游玩的妇人，略有姿色。','踏青妇人'],
['方面大耳，眼睛深陷，脸上全无血色。','平夫人'],
['这是一条看家护院的恶狗。','恶狗'],
['他身材矮胖，脑袋极大，生两撇鼠须，摇头晃脑，形相十分滑稽。','平怪医'],
['这是村落里的一个村名。','村民'],
['这是一个满脸沧桑的老人。','沧桑老人'],
['一个村妇。','村妇'],
['一个满脸皱纹的老太婆。','老太婆'],
['这是个七八岁的小男孩。','小男孩明'],
['这是一个女子','神秘女子'],
['他是一个明教小圣使。','明教小圣使'],
['他是明教巨林旗掌旗使。','闻旗使'],
['明教四大护法之一，传说喜好吸人鲜血。','韦蝠王'],
['明教五散仙之一。','彭散玉'],
['明教的一个小喽啰，看起来有点猥琐，而且还有点阴险。','明教小喽啰'],
['他是明教烈焰旗掌旗使。','辛旗使'],
['他是明教五散仙之一的布袋大师说不得，腰间歪歪斜斜的挂着几支布袋。','布袋大师'],
['严垣是明教深土旗掌旗使。力，号称明教第一神力。','颜旗使'],
['他是明教白水旗掌旗使。','唐旗使'],
['明教五散仙之一','周散仙'],
['明教耀金旗掌旗使。','庄旗使'],
['明教光明左使。','杨左使'],
['她就是武林中盛传的紫衣龙王，她肤如凝脂，杏眼桃腮，容光照人，端丽难言。虽然已年过中年，但仍风姿嫣然。','黛龙王'],
['他是身材矮小，两臂粗壮，膀阔腰圆。他手持兵刃，身穿一黑色圣衣，似乎有一身武艺','明教教众'],
['千夜旗至尊九长老之一，看似一个面容慈祥的白发老人，鹤发童颜，双手隐隐的黑雾却显露了他不世的毒功！','九幽毒魔'],
['负责管理九幽毒池的童子们，个个面色阴沉，残忍好杀。','九幽毒童'],
['一个身着青衣的小女孩，被抓来此出准备炼毒之用，虽能感觉到恐惧，但双眼仍透出不屈的顽强。','青衣女孩'],
['他是明教五散仙之一。在他僵硬的面孔上看不出一点表情。','冷步水'],
['明教五散仙之一。长于风雅之做。','张散仙'],
['冷步水的侄子，较为自傲，且要面子。','冷文臻'],
['他就是赫赫有名的白眉鹰王，张大教主的外公，曾因不满明教的混乱，独自创立了飞鹰教，自从其外孙成为教主之后，便回归了明教。','殷鹰王'],
['他就是赫赫有名的金发狮王，张大教主的义父，生性耿直，只因满心仇恨和脾气暴躁而做下了许多憾事。','谢狮王'],
['年方二十多岁的年轻人。明教现今正统教主，武功集各家之长最全面，修为当世之罕见。','张教主'],
['明教光明右使。','范右使'],
['她双目湛湛有神，修眉端鼻，颊边微现梨涡，真是秀美无伦，只是年纪幼小，身材尚未长成，虽然容貌绝丽，却掩不住容颜中的稚气。','小昭'],
['外形独特，似乎是波斯传入中原并融合中原机关要术所造，力量异常强大。','傀儡'],
['用厚厚面巾蒙着脸上的武士，看不清他的真面目。','蒙面人'],
['一个身着青衣的小女孩，被抓来此出准备炼毒之用，虽能感觉到恐惧，但双眼仍透出不屈的顽强。','青衣女孩'],
['一匹健壮的野马。','野马'],
['一个来终南山游玩的游客。','终南山游客'],
['这是一个男童。','男童'],
['这是一个女道姑。','全真女弟子'],
['他是全真教内负责接待客人的道士。','迎客道长'],
['她长相清秀端庄。','程遥伽'],
['他是全真教的一个小道童。','小道童'],
['一个全真教的小道童。','蓝色小道童'],
['这是全真教的练功弟子。','全真练功弟子'],
['他是丘处机的得意大弟子尹志平，他粗眉大眼，长的有些英雄气概，在全真教第三代弟子中算得上年轻有为。身材不高，眉宇间似乎有一股忧郁之色。长的倒是长眉俊目，容貌秀雅，面白无须，可惜朱雀和玄武稍有不和。','尹志平'],
['一匹健壮的大马。','健马'],
['这是一个中年道士。','李四'],
['她就是全真教二代弟子中唯一的女弟子孙不二孙真人。她本是马钰入道前的妻子，道袍上绣着一个骷髅头。','孙不二'],
['一个负责柴火的道士。','柴火道士'],
['他就是王重阳的大弟子，全真七子之首，丹阳子马钰马真人。他慈眉善目，和蔼可亲，正笑着看着你。','马钰'],
['他就是全真教的开山祖师，其身材消瘦，精神矍铄，飘飘然仿佛神仙中人。','重阳祖师'],
['他就是全真七子中的郝大通郝真人。他身材微胖，象个富翁模样，身上穿的道袍双袖皆无。','郝大通'],
['此人年龄虽大但却顽心未改，一头乱糟糟的花白胡子，一双小眼睛透出让人觉得滑稽的神色。','老顽童'],
['一只只有道家之所才有的怪兽。','观想兽'],
['他就是全真七子之五王处一王真人。他身材修长，服饰整洁，三绺黑须飘在胸前，神态潇洒。','王处一'],
['这是一个年老的道人。','老道长'],
['一个风程仆仆的侠客。','青年弟子'],
['他就是全真次徒谭处端谭真人，他身材魁梧，浓眉大眼，嗓音洪亮，拜重阳真人为师前本是铁匠出身。','谭处端'],
['他是全真教尹志平门下第四代弟子','鹿道清'],
['他就是全真三徒刘处玄刘真人，他身材瘦小，但顾盼间自有一种威严气概。','刘处玄'],
['一个负责掌厨的道士。','掌厨道士'],
['一只叽叽咋咋的小麻雀。','小麻雀'],
['这是全真教内负责挑水的道士。','挑水道士'],
['这是一个老人，在全真教内已有几十年了。','老人'],
['一直忙碌的小蜜蜂。','蜜蜂'],
['他就是江湖上人称‘长春子’的丘处机丘真人，他方面大耳，满面红光，剑目圆睁，双眉如刀，相貌威严，平生疾恶如仇。','丘处机'],
['蜜蜂的天敌之一。','天蛾'],
['食肉昆虫，蜜蜂的天敌之一。','食虫虻'],
['这是一只玉色的蜜蜂，个头比普通蜜蜂大得多，翅膀上被人用尖针刺有字。','白玉蜂'],
['这是一只玉色的蜜蜂，个头比普通蜜蜂大得多，翅膀上被人用尖针刺有字。','红玉蜂'],
['缺','毒蟒'],
['盈盈而站着一位秀美绝俗的女子，肌肤间少了一层血色，显得苍白异常。披著一袭轻纱般的白衣，犹似身在烟中雾里。','龙儿'],
['她就是古墓派的开山祖师，虽然已经是四十许人，望之却还如同三十出头。当年她与全真教主王重阳本是一对痴心爱侣，只可惜有缘无份，只得独自在这古墓上幽居。','林祖师'],
['这是一位慈祥的老婆婆，正看着你微微一笑。','孙婆婆'],
['中原朝廷出使西域楼兰国的使臣，气宇轩昂，雍容华度，似也会一些武功。','傅介子'],
['身着青衣，手持巨盾，是敌军阵前的铁卫，看起来极难对付。','青衣盾卫'],
['百发百中的神箭手，难以近身，必须用暗器武学方可隔空攻击','飞羽神箭'],
['主帅身侧的近卫，都是万里挑一的好手','银狼近卫'],
['敌军主帅，黑盔黑甲，手持长刀。','军中主帅'],
['一位身经百战的将军，多年驻守此地，脸上满是大漠黄沙和狂风留下的沧桑。','玉门守将'],
['匈奴人杀手，手持弯刀，眼露凶光。','匈奴杀手'],
['玉门关的守卫军士，将军百战死，壮士十年归。','玉门守军'],
['黑盔黑甲的天策骑兵，连马也被锃亮的铠甲包裹着。','玄甲骑兵'],
['一名驾车的车夫，尘霜满面。','车夫'],
['天策府左将军，英勇善战，智勇双全。身穿黑盔黑甲，腰间有一柄火红的长刀。','天策大将'],
['天策玄甲军的参将，双目专注，正在认真地看着城防图。','玄甲参将'],
['无影楼金凤堂堂主，武功卓绝自是不在话下，腕上白玉镯衬出如雪肌肤，脚上一双鎏金鞋用宝石装饰。','凤七'],
['英姿飒爽的马车店女老板，汉族和鲜卑族混血，双目深邃，含情脉脉，细卷的栗色长发上夹着一个金色玉蜻蜓。','慕容孤烟'],
['此人看似已经喝了不少，面前摆着不下七八个空酒坛，两颊绯红，然而双目却仍是炯炯有神，身长不足七尺，腰别一把看似贵族名士方才有的长剑，谈笑之间雄心勃勃，睥睨天下。男子醉言醉语之间，似是自称青莲居士。','醉酒男子'],
['这是肆虐戈壁的马匪，长相凶狠，血债累累。','马匪'],
['这是个流里流气的花花公子。','花花公子'],
['一个年轻漂亮又不甘寂寞的小寡妇。','寡妇'],
['一个很健壮的壮年农民。','农民'],
['这是个尚未成年的小山贼。','小山贼'],
['雷横天的儿子，与其父亲不同，长得颇为英俊。','雷震天'],
['这是个面目可憎的山贼。','山贼'],
['他头上包着紫布头巾，一袭紫衫，没有一丝褶皱。','侍杖'],
['这是个粗鲁的山贼头。一身膘肉，看上去内力极度强劲！','雷横天'],
['一个年少貌美的姑娘。','金花'],
['铁匠正用汗流浃背地打铁。','铁匠'],
['他是一个西域来的舞蛇人。','舞蛇人'],
['这位店小二正笑咪咪地忙著招呼客人。','店小二'],
['一个很清秀的年轻农村姑娘，挎着一只盖着布小篮子。','村姑'],
['这是个农家小孩子','小孩'],
['一个很健壮的樵夫。','樵夫'],
['一个很精明能干的农家妇女。','农家妇女'],
['这是个年富力强的卫兵，样子十分威严。','门卫'],
['这是个样子威严的仕卫。','仕卫'],
['一个很能干的丫环。','丫环'],
['他一身飘逸的白色长衫，手摇折扇，风流儒雅。','欧阳少主'],
['这是个和蔼可亲的教头。','李教头'],
['这是个聪明乖巧的小姑娘，打扮的很朴素，一袭青衣，却也显得落落有致。小青对人非常热情。你要是跟她打过交道就会理解这一点！','小青'],
['一只庞然大物，它眼中喷火，好象要一口把你吞下。','黑冠巨蟒'],
['一只让人看了起毛骨悚然的金环蛇。','金环蛇'],
['一只让人看了起鸡皮疙瘩的竹叶青蛇。','竹叶青蛇'],
['一只昂首直立，吐着长舌芯的大蟒蛇。','蟒蛇'],
['这是个和蔼可亲的教练。','教练'],
['这是个陪人练功的陪练童子。','陪练童子'],
['一个老谋深算的老管家。','管家'],
['一个聪明伶俐的白衣少女。','白衣少女'],
['他是白驮山庄主，号称“老毒物”。','老毒物'],
['一个肥头大耳的厨师，两只小眼睛不停地眨巴着。','肥肥'],
['一个有名的吝啬鬼，好象他整日看守着柴房也能发财似的','老材'],
['一只雪白的小白兔，可爱之致。','白兔'],
['蛇园里面的驯蛇人，替白驼山庄驯养各种毒蛇。','驯蛇人'],
['一只独行的野狼，半张着的大嘴里露着几颗獠牙。','野狼'],
['一只矫健的雄狮，十分威风。','雄狮'],
['一只多疑成性的狐狸。','狐狸'],
['一只斑斓猛虎，雄伟极了。','老虎'],
['一个历经沧桑的老婆婆。','张妈'],
['五大三粗的汉子，看起来会些拳脚功夫。','脚夫'],
['一名算命道士，灰色道袍上缀着几个补丁。','秋半仙'],
['一个风骚的少妇，颇有几分姿色。','风骚少妇'],
['神情威猛须发花白的老人，看起来武功修为颇高。','锦袍老人'],
['朝廷通事舍人，负责传达皇帝旨意。','柳易之'],
['一名布衣老者，慈眉善目，须发皆白。','卢鸿一'],
['这是一名枯瘦矮小的黑衣老人，一双灰白的耳朵看起来有些诡异。','英元鹤'],
['身材异常高大的男子，眼神中充满杀气，脸上满布虬龙似的伤疤。','马帮精锐'],
['来嵩山游玩的男子，书生打扮，看来来颇为儒雅。','嵩山游客'],
['一只体型巨大的吸血蝙蝠。','吸血蝙蝠'],
['一名黑衣剑客，双面失明。','瞎眼剑客'],
['一名黑衣刀客，双面失明。','瞎眼刀客'],
['这是一名黑衣瞎眼老者，看起来武功修为颇高。','瞎眼老者'],
['山林觅食的野狼，看起来很饿。','野狼'],
['在嵩阳书院进学的书生，看起来有些木讷。','林立德'],
['拦路抢劫的山贼','山贼'],
['在嵩山隐居修行的道士','修行道士'],
['一条吐舌蛇信子的毒蛇。','黄色毒蛇'],
['一身麻衣，头戴斗笠的刀客','麻衣刀客'],
['没有鼻子，脸孔平平，像一块白板，看起来极为可怖','白板煞星'],
['这是一只调皮的小猴子，虽是畜牲，却喜欢模仿人样。','小猴'],
['嵩山弟子，看起来很普通。','万大平'],
['这是一名嵩山弟子，武功看起来稀松平常。','嵩山弟子'],
['一名身穿淡绿衫子的少女，只见她脸如白玉，颜若朝华，真是艳冠群芳的绝色美人。','芙儿'],
['头戴斗笠，身材瘦长，一身麻衣的中年男子，看起来有些诡异。','麻衣汉子'],
['嵩山派大弟子，武功修为颇高。','史师兄'],
['嵩山派高手，年纪不大，头花却已全白。','白头仙翁'],
['左掌门的侄子，武功平平，但多谋善断，有传闻说他是左掌门的亲生儿子。','左罗'],
['冷面短髯，相貌堂皇的青年汉子。','左挺'],
['这人矮矮胖胖，面皮黄肿，约莫五十来岁年纪，目神光炯炯，凛然生威，两只手掌肥肥的又小又厚。','乐老狗'],
['一名肥头大耳的伙夫，负责打理嵩山派一众大小伙食。','伙夫'],
['一个风程仆仆的侠客。','冷峻青年'],
['这是一名秃头老者，一双鹰眼微闭。','沙秃翁'],
['脸白无须，看起来不像练武之人。','钟九曲'],
['面目凶光的中年汉子，虽是所谓名门正派，但手段极为凶残。','陆太保'],
['须发火红的中年汉子','高锦毛'],
['一名面容黯淡的老人，但看外表，很难想到他是一名内外皆修的高手。','邓神鞭'],
['一名体态风流的少妇，酥胸微露，媚眼勾人。','聂红衣'],
['身穿杏黄长袍，冷口冷面，喜怒皆不行于色，心机颇深。','左盟主'],
['身形枯瘦，似乎被困于此多年，但眼神中仍有强烈的生存意志','枯瘦的人'],
['这是杭州有名大户柳府的家丁，穿着一身考究的短衫，一副目中无人的样子。','柳府家丁'],
['柳府二小姐，只见她眸含秋水清波流盼，香娇玉嫩，秀靥艳比花娇，指如削葱根，口如含朱丹，一颦一笑动人心魂，旖旎身姿在上等丝绸长裙包裹下若隐若现。听说柳府二千金芳名远扬，传闻柳府大小姐月夜逃婚，至今不知下落。','柳玥'],
['一个姓汪的老者，似乎有什么秘密在身上。','老者'],
['这是一名看起来很冷峻的男子，只见他鬓若刀裁，眉如墨画，身上穿着墨色的缎子衣袍，袍内露出银色镂空木槿花的镶边，腰上挂着一把长剑。','筱西风'],
['一个白发苍苍的老人，默默打扫着这万人景仰的武穆祠堂。','武悼'],
['一身家人装束的壮汉，要挂宝刀，看起来有些功夫。','梅庄护院'],
['一身家人装束的男子，看起来有些功夫。','梅庄家丁'],
['一身家人装束的老者，目光炯炯，步履稳重，看起来武功不低。','施令威'],
['一身家人装束的老者，目光炯炯，步履稳重，看起来武功不低。','丁管家'],
['这人虽然生的眉清目秀，然而脸色泛白，头发极黑而脸色极白，像一具僵尸的模样。据说此人酷爱下棋，为人工于心计。','黑老二'],
['这是一名身穿白袍的老人，容貌清癯，刻颏下疏疏朗朗一缕花白长须，身材高瘦，要挂弯刀。','向左使'],
['脸如金纸的瘦小的中年男子，一身黑衣，腰系黄带。','瘦小汉子'],
['这女子虽是一袭仆人粗布衣裳，却掩不住其俊俏的容颜。只见那张粉脸如花瓣般娇嫩可爱，樱桃小嘴微微轻启，似是要诉说少女心事。','柳蓉'],
['这是一名满脸油光的中年男子，虽然其貌不扬，据说曾是京城御厨，蒸炒煎炸样样拿手。','丁二'],
['这是一名弯腰曲背的聋哑老人，须发皆白，满脸皱纹。据说他每天都去湖底地牢送饭。','聋哑老人'],
['此人髯长及腹，一身酒气，据说此人极为好酒好丹青，为人豪迈豁达。','丹老四'],
['这女子有着倾城之貌，闭月之姿，流转星眸顾盼生辉，发丝随意披散，慵懒不羁。她是江南一带有名的歌妓，据闻琴棋书画无不精通，文人雅士、王孙公子都想一亲芳泽。','上官香云'],
['这人身型矮矮胖胖，头顶秃得油光滑亮，看起来没有半点文人雅致，却极为嗜好书法。','秃笔客'],
['这是一名青衣童子，扎着双髻，眉目清秀。','琴童'],
['这是一名身型骨瘦如柴的老人，炯炯有神的双目却让内行人一眼看出其不俗的内力。','黄老朽'],
['一身黑色劲装，手持大刀，看起来很凶狠。','黑衣刀客'],
['一身青衣，不知道练得什么邪门功夫，看起来脸色铁青。','青衣剑客'],
['看起来气度不凡的老人，紫色脸膛在紫袍的衬托下显得更是威严。','紫袍老者'],
['这人虽然身穿红色僧袍，但面目狰狞，看起来绝非善类。','红衣僧人'],
['虽已满头白发，但眉眼间依旧可见年轻时的娟秀。','黄衫婆婆'],
['身穿灰布衣裳，脸色因为常年不见阳光，看起来有些灰白。','地牢看守'],
['一只肥大的地鼠，正在觅食。','地鼠'],
['这是一名身穿黑衣的年轻男子，一张脸甚是苍白，漆黑的眉毛下是艺术按个深沉的眼睛，深沉的跟他的年龄极不相符。','奎孜墨'],
['这名老者身材甚高，一头黑发，穿的是一袭青衫，长长的脸孔，脸色雪白，更无半分血色，眉目清秀，只是脸色实在白得怕人，便如刚从坟墓中出来的僵尸一般。','任教主'],
['当地镖局的镖师，现在被狼军士兵团团围住，难以脱身。','镖师'],
['这青年汉子看起来五大三粗，估计会些三脚猫功夫。','挑夫'],
['这家伙满脸横肉，一付凶神恶煞的模样，令人望而生畏。','黄衣刀客'],
['他是一位中年游方和尚，骨瘦如柴，身上的袈裟打满了补丁。','瘦僧人'],
['这是个饱读诗书，却手无缚鸡之力的年轻书生。','柳安庭'],
['生性豁达，原本是丐帮弟子，因为风流本性难改，被逐出丐帮。','石云天'],
['艳丽的容貌、曼妙的身姿，真是数不尽的万种风情。','朱莹莹'],
['这是位中年武人，肩背长剑，长长的剑穗随风飘扬，看来似乎身怀绝艺。','欧阳留云'],
['这名女子神态娴静淡雅，穿着一身石青色短衫，衣履精致，一张俏脸白里透红，好一个美丽俏佳人。','温青青'],
['这是有“千古第一才女”之称的李清照，自幼生活优裕，其父李格非藏书甚丰，小时候就在良好的家庭环境中打下文学基础。少年时即负文学的盛名，她的词更是传诵一时。中国女作家中，能够在文学史上占一席地的，必先提李易安。她生活的时代虽在北宋南宋之间，却不愿意随着当时一般的潮流，而专意于小令的吟咏。她的名作象《醉花阴》，《如梦令》，有佳句象“花自飘零水自流，一种相思两处闲愁”等等，都脍炙人口。','易安居士'],
['此人出身神秘，常常独来独往，戴一副铁面具，不让人看到真面目，师承不明。','吕进'],
['此人出身神秘，常常独来独往，戴一副铁面具，不让人看到真面目，师承不明。','程不为'],
['这是一名白发老人，慈眉善目，据说此人精通医术和药理。','司马玄'],
['此人身似猿猴，动作矫健，因轻功出众，江湖中难有人可以追的上他，故而以刺探江湖门派消息为生。','桑不羁'],
['一名隐士，据闻此人精通铸剑。','鲁刚'],
['此人身材魁梧，身穿铁甲，看起来似乎是官府的人。','于霸天'],
['此人年纪虽不大，但须发皆白，一身黑袍，看起来气度不凡。','神秘游客'],
['这人的脸上看起来没有一丝表情，手里的刀刃闪着寒光。','海棠杀手'],
['这人便是江湖有名的海棠杀手“三剑断命”，看起来倒也算是一表人才，只是双目透出的杀气却让人见之胆寒。','路独雪'],
['据说杀手无情便无敌，这人看起来风流倜傥，却是极为冷血之人。','铁云'],
['据说他就是海棠杀手组织的首领，不过看他的样子，似乎不像是一个能统领众多杀手的人。','孔翎'],
['这是一名极为妖艳的女子，一身黑色的紧身衣将其包裹得曲线毕露，估计十个男人见了十个都会心痒难耐。','姬梓烟'],
['这是一个看起来天真烂漫的少女，不过等她的剑刺穿你的身体时，你才会意识到天真是多么好的伪装。','柳兰儿'],
['这是一名身穿粗布衣服的男子，看起来很强壮。','布衣男子'],
['这人五短身材，尖嘴猴腮。','阮小'],
['这人五短身材，尖嘴猴腮。','阮大'],
['这人身穿粗布劲装，满脸络腮胡，双眼圆瞪，似乎随时准备发怒。','史义'],
['这人穿着一身长袍，敏锐的双眼让人感觉到他的精明过人。','司马墉'],
['这人看起来很普通，是那种见过后便会忘记的人。','林忠达'],
['这人脸上蒙着一张黑铁面具，看不见他的模样，但面具后双眼却给人一种沧桑感。','铁面人'],
['铁翼是铁血大旗门的元老。他刚正不阿，铁骨诤诤，如今被囚禁于此。','铁翼'],
['一个风程仆仆的侠客。','黑衣人'],
['此人无发无眉，相貌极其丑陋。','李三'],
['此人独目秃顶，面目凶恶，来官府通缉要犯。','仇霸'],
['这是一名身穿粗布衣服的少年，背上背着一个竹篓，里面放着一些不知名的药草。','平光杰'],
['此人一身道袍，看起来颇为狡诈。','玉师弟'],
['这人面色灰白，双眼无神，看起来一副沉溺酒色的模样。','玉师兄'],
['泰山掌门的师叔，此人看起来老奸巨猾。','玉师伯'],
['这是一名艳丽少妇，勾魂双面中透出一股杀气。','任娘子'],
['双鞭客栈老板，看起来精明过人。','黄老板'],
['一身红色劲装的卫士，看起来有些功夫。','红衣卫士'],
['这人算得上是一个美男子，长眉若柳，身如玉树。','白飞羽'],
['这人生的有些难看，黑红脸膛，白发长眉，看起来有些阴郁。','商鹤鸣'],
['这是一名极有灵气的女子，穿着碧绿纱裙。','西门允儿'],
['皇帝身边鹤发童颜的太监，权势滔天，眼中闪着精光。','冯太监'],
['这是一名魁梧的中年男子，看起来内家功夫造诣不浅。','钟逍林'],
['这是一名身材伟岸的中年男子，看起来霸气逼人。','西门宇'],
['这是一名蒙面密探。','黑衣密探'],
['这是一条斑斓的大蛇，一眼看去就知道有剧毒','毒蛇'],
['这家伙满脸横肉，一付凶神恶煞的模样，令人望而生畏。','黄衣刀客'],
['这人脸上挂着难以捉摸的笑容，看起来城府极深。','筱墨客'],
['铁毅同父异母之弟，为了「大旗门」宝藏，时常算计其大哥铁毅。','铁恶人'],
['泰山弟子，剑眉星目，身姿挺拔如松。','迟一城'],
['这是一名青衣弟子，手里握着一把长剑。','泰山弟子'],
['泰山掌门的弟子，身形矫健，看起来武功不错。','建除'],
['泰山掌门的师弟，看起来英气勃勃。','天柏'],
['泰山掌门的师弟，嫉恶如仇，性子有些急躁。','天松'],
['泰山掌门的师叔，处事冷静，极有见识。','玉师叔'],
['此人为泰山掌门，此人看起来正气凛然。','泰山掌门'],
['阴宾所养的波斯猫','宾奴'],
['这是一个满脸风霜的老渔夫。','渔夫'],
['刚拜入大旗门不久的青年。','叶缘'],
['她面容被岁月侵蚀，风雨吹打，划出了千百条皱纹，显得那么衰老但一双眼睛，却仍亮如闪电，似是只要一眼瞧过去，任何人的秘密，却再也休想瞒过她。','老婆子'],
['刚拜入大旗门不久的青年。','罗少羽'],
['一个身材苗条，身着青衣的少女。','青衣少女'],
['日岛主乃大旗门第七代掌门人云翼之妻，因看不惯大旗门人对其n妻子的无情，开创常春岛一派，以收容世上所有伤心女子。','日岛主'],
['刚到拜入大旗门不久的青年。','潘兴鑫'],
['他是大旗门的传人。','铁掌门'],
['他容光焕发，须发有如衣衫般轻柔，看来虽是潇洒飘逸，又带有一种不可抗拒之威严。','夜皇'],
['她身穿轻纱柔丝，白足如霜，青丝飘扬。','橙衣少女'],
['她身穿轻纱柔丝，白足如霜，青丝飘扬。','紫衣少女'],
['她身穿轻纱柔丝，白足如霜，青丝飘扬。','红衣少女'],
['她身穿轻纱柔丝，白足如霜，蓝丝飘扬。','蓝衣少女'],
['她面上蒙着轻红罗纱，隐约间露出面容轮廓，当真美得惊人，宛如烟笼芍药，雾里看花','阴宾'],
['阴宾所养的波斯猫','宾奴'],
['风流倜傥','朱藻'],
['她身穿轻纱柔丝，白足如霜，青丝飘扬。','X衣少女'],
['闪电卓三娘轻功世无双，在碧落赋中排名第三。','卓三娘'],
['风梭风九幽，但他现在走火入魔，一动也不能动了。','风老四'],
['小白兔白又白两只耳朵竖起来。','小白兔'],
['她满面愁容，手里虽然拿着本书，却只是呆呆的出神。','水灵儿'],
['一个风程仆仆的侠客。','叶缘'],
['一个风程仆仆的侠客。','罗少羽'],
['一个风程仆仆的侠客。','潘兴鑫'],
['一只全身雪白的的绵羊。','小绵羊'],
['一只全身雪白的的绵羊。','大绵羊'],
['一只全身雪白的的绵羊。','小羊羔'],
['一个牧羊女正在放羊。','牧羊女'],
['一个牧羊女正在放羊。','红牧羊女'],
['一直凶残的草原狼。','草原狼'],
['年纪轻轻的少年，武功了得，却心狠手辣。','白衣少年'],
['一个玄甲黑盔，身披白色披风的少年将军，虽面容清秀，却不掩眉宇之间的果决和坚毅。','李将军'],
['东突厥狼军先锋大将，面目凶狠，身披狼皮铠甲，背负长弓，手持丈余狼牙棒。','突厥先锋大将'],
['身披重甲，手持长戟，不许旁人前进一步。','神秘甲士'],
['黑衣黑靴，一旦有外人靠近地宫，便手中暗器齐发。','地宫暗哨'],
['他们的双拳，便是镇守陵寝最好的武器。','守山力士'],
['一个年青的藏僧。','城卫'],
['附有邪魔之气的僧人。','紫衣妖僧'],
['一个负责看管舍利塔的藏僧。','塔僧'],
['这是一位来大昭寺游览的旅客。','关外旅客'],
['一个大招寺的藏僧。','护寺喇嘛'],
['一个大招寺的藏尼。','护寺藏尼'],
['灵空高僧是大昭寺现在的主持。','灵空'],
['葛伦高僧已在大昭寺主持多年。男女弟子遍布关外。','葛伦'],
['这个老人看起来七十多岁了，看著他佝偻的身影，你忽然觉得心情沈重了下来。','塔祝'],
['胭松是葛伦高僧的得意二弟子。','胭松'],
['这是位笑眯眯的丐帮八袋弟子，生性多智，外号小吴用。','余洪兴'],
['这是整天笑咪咪的车老板，虽然功夫不高，却也过得自在。','陶老大'],
['这位店老板正在招呼客人','店老板'],
['一只浑身脏兮兮的野狗。','野狗'],
['你看到一个粗壮的大汉，身上穿著普通樵夫的衣服。','樵夫'],
['一个收破烂的。','收破烂的'],
['一个满脸风霜之色的老乞丐。','乞丐'],
['一只浑身脏兮兮的野狗，一双眼睛正恶狠狠地瞪著你。','野狗'],
['他是个看起来相当英俊的年轻人，不过点神秘莫测的感觉。','卜一刀'],
['金盔金甲的护陵大将。','镇魂将'],
['狼群之王，体型硕大，狼牙寒锋毕露。','头狼'],
['看起来像是只妖怪一般。','怪人'],
['一只健壮的黑熊。','黑熊'],
['这是一个忙忙碌碌的小二。','店小二魔'],
['一个贼眉鼠眼的商人。','客店老板'],
['一个面容俊朗的少年，却眉头深锁，面带杀气。','冉无望'],
['一个船夫。','船夫'],
['这家伙满脸横肉，一付凶神恶煞的模样，令人望而生畏。','魔教弟子'],
['此人十分喜好钱财。','见钱开'],
['他使得一手好钩法。','贾布'],
['他一身横练的功夫，孔武有力。','鲍长老'],
['他天生神力，勇猛无比。','葛停香'],
['他使得一手好剑法。','上官云'],
['她使得一手好叉法。','桑三娘'],
['他使得一手好枪法。','罗烈'],
['他使得一手好锤法','童长老'],
['他使得一手好刀法。','王诚'],
['一个魔教的犯人，他们都是到魔教卧底的各大门派弟子事泄被捕的','魔教犯人'],
['她使得一手好刀法。','花想容'],
['他使得一手好钩法。','曲右使'],
['他使得一手好武功。','张矮子'],
['他使得一手好掌法。','张白发'],
['她使得一手好叉法。','赵长老'],
['此人是用剑高手。','独孤风'],
['他使得一手好枪法。','杨延庆'],
['他使得一手好斧法。','范松'],
['他使得一手好锤法。','巨灵'],
['虽是女子，但武功绝不输于须眉。','楚笑'],
['他身形魁梧，满脸虬髯，形貌极为雄健。','莲亭'],
['他就是日月神教教主。号称无人可敌。','东方教主'],
['此人一脸干皱的皮肤，双眼深陷，犹如一具死尸。','梅师姐'],
['天梵宗主密使，遮住了容貌，神秘莫测。','天梵密使'],
['一个高鼻蓝眼的波斯商人。他看着你脸上露出狡猾的笑容。','波斯商人'],
['一个很胖的中年妇女。','矮胖妇女'],
['唐门中的贵公子，父亲是唐门中的高层，看起来极自负','唐冠'],
['一个老者来自波斯，似乎是一个铁匠，脸上看起来有点阴险的感觉。','波斯老者'],
['买卖提是个中年商人，去过几次中原，能讲一点儿汉话','买卖提'],
['她身段不肥也不瘦。她的眉毛像弯月，她的眼睛很多情','阿拉木罕'],
['这是一匹雄壮的母马，四肢发达，毛发油亮。','伊犁马'],
['一个风尘仆仆的侠客。。','巴依'],
['这是个小孩子。','小孩'],
['他头上包着头巾，长着向上翘的八字胡，最喜欢捉弄巴依、帮助穷人。他常给别人出谜语。','阿凡提'],
['一个老汉，赶着几十只羊。','牧羊人'],
['她就是丁老怪弟子紫姑娘。她容颜俏丽，可眼神中总是透出一股邪气。','紫姑娘'],
['一个辛苦工作的采药人。','采药人'],
['一个白发老人，身着紫衣，眼神凶狠，太阳穴隆起，显是有不低的内力修为。','玄衣刀妖'],
['身形修长，青裙曳地。皮肤白嫩，美若天人。恍若仙子下凡，是人世间极少的绝美女子。其武功修为十分了得。','周女侠'],
['一只有着三角形脑袋的蛇，尾巴沙沙做响。','毒蛇'],
['这是一头常见的昆仑山野牦牛。','牦牛'],
['这是一头通体雪白的昆仑山雪豹，极为罕有。','雪豹'],
['他就是丁老怪的三弟子。','天狼师兄'],
['他就是丁老怪的八弟子。他身才矮胖，可手中握的钢杖又长又重。','出尘师弟'],
['他是星宿派的吹号手。他手中拿着一只铜号，鼓足力气一脸沉醉地吹着。','星宿派号手'],
['他是星宿派的击钹手。他手中拿着一对铜钹，一边敲一边扯着嗓子唱些肉麻的话。','星宿派钹手'],
['他是星宿派的吹鼓手。他面前放着一只铜鼓，一边敲一边扯着嗓子唱些肉麻的话。','星宿派鼓手'],
['他就是丁老怪的二弟子。他三十多岁，狮鼻阔口，一望而知不是中土人士。','狮吼师兄'],
['他就是丁老怪的大弟子、星宿派大师兄。他三十多岁，脸庞瘦削，眼光中透出一丝乖戾之气。','摘星大师兄'],
['他就是星宿派开山祖师、令正派人士深恶痛绝的星宿老怪丁老怪。可是他看起来形貌清奇，仙风道骨。','丁老怪'],
['采花子是星宿派的一个小喽罗，武功虽不好，但生性淫邪，经常奸淫良家妇女，是官府通缉的犯人，故而星宿派名义上也不承认有这个弟子。','采花子'],
['这人全身干枯，不像一个人，倒像是一具干尸。','铁尸'],
['一只笨笨的野猪。','野猪'],
['阳明居士潇洒俊逸，一代鸿儒，学识渊博且深谙武事，有「军神」之美誉，他开创的「阳明心学」更是打破了朱派独霸天下的局面。','阳明居士'],
['茅山派的道士，着一身黑色的道袍。','道士'],
['孙天灭外号六指小真人，是林忌最喜爱的徒弟。他尽得林忌真传！','孙天灭'],
['道灵真人是林忌的师弟，也是上代掌门的关门弟子，虽然比林忌小了几岁，但道行十分高深，「谷衣心法」已修炼到极高境界了。','道灵'],
['护山使者是茅山派的护法，着一身黑色的道袍。','护山使者'],
['林忌是一位道行十分高深的修道者，你发现他的眼珠一个是黑色的，一个是金色的，这正是「谷衣心法」修炼到极高境界的徵兆。','林忌'],
['一只尺许大小，通体火红的乌龟。','万年火龟'],
['他是龙虎山太乙一派的嫡系传人，他法力高强，威名远播。','张天师'],
['必须先打败最强的自己。','心魔'],
['他是黄岛主的三弟子。','陆废人'],
['他就是神雕大侠，一张清癯俊秀的脸孔，剑眉入鬓。','神雕大侠'],
['一个看上去毫不起眼的老渔夫，然而……','老渔夫'],
['一个二十出头的小伙子，身板结实，双目有神，似乎练过几年功夫。','习武房桃花岛弟子'],
['一个二十多岁的小伙子，身板结实，双目有神，似乎练过几年功夫。。','药房桃花岛弟子'],
['一个三十出头的小伙子，身板结实，双目有神，似乎练过几年功夫。','后院桃花岛弟子'],
['又聋又哑，似乎以前曾是一位武林高手。','哑仆人'],
['这是一个桃花岛的哑仆。他们全是十恶不赦的混蛋，黄药师刺哑他们，充为下御。','哑仆'],
['曲三的一位好友，神态似乎非常着急。','丁高阳'],
['他是黄岛主的四弟子。','曲三'],
['他就是黄岛主，喜怒无常，武功深不可测。','黄岛主'],
['她是黄岛主的爱女，长得极为漂亮。','蓉儿'],
['这位姑娘长相还算端正，就是一副傻头傻脑的样子。','傻姑'],
['此乃东南海防驻军主将，英武之气凛凛逼人，威信素著，三军皆畏其令，从不敢扰民。','戚总兵'],
['一个砍柴为生的樵夫。','樵夫铁'],
['一个砍柴为生的樵夫。','红樵夫'],
['华夏铸剑第一人，许多神剑曾出自他手。','欧冶子'],
['铁血山庄的门卫。','老张'],
['神秘的绿衣女子，似乎隐居在铁雪山庄，无人能知其来历。','雪鸳'],
['铁山是一个风流倜傥的公子。','铁少'],
['雪蕊儿肤白如雪，很是漂亮。在这铁雪山庄中，和铁少过着神仙一般的日子。','雪蕊儿'],
['铁雪山庄的一个丫鬟。','小翠铁'],
['一个一袭白衣的老翁。','白袍公'],
['一个一袭黑衣的老翁。','黑袍公'],
['快活林里小神仙，一个眉清目秀的江湖新人，据说机缘巧合下得到了不少江湖秘药，功力非同一般，前途不可限量。','陳小神'],
['虬髯大汉，要凭一把铁剑战胜天下高手，八荒无敌。','剑荡八荒'],
['女扮男装的青衣秀士，手持长剑，英姿飒爽，好一个巾帼不让须眉。','魏娇'],
['白裙袭地，仙气氤氲，武林中冉冉升起的新星，誓要问鼎至尊榜，执天下之牛耳。','神仙姐姐'],
['『不落皇朝』的二当家，为人洒脱风趣，酷爱蹴鞠，酒量超群，以球入道。传闻只要饮下三杯佳酿，带醉出战，那么不论是踢全场、转花枝、大小出尖，流星赶月，他都能凭借出色的技艺独占鳌头。','小飞'],
['一副浪荡书生打扮的中年剑客，据说他也曾是一代高手。','寒夜·斩'],
['这人的名字颇为奇怪，只一个字。行为也颇为怪诞，总是藏在花丛里。不过武功底子看起来却一点都不弱。','他'],
['江湖豪门『21世纪影业』的核心长老之一，与帮主番茄携手打下一片江山，江湖中威震一方的豪杰。','出品人◆风云'],
['一个已过盛年的江湖高手，像是曾有过辉煌，却早已随风吹雨打去。他曾有过很多名字，现在却连一个像样的都没有留下，只剩下喝醉后嘴里呢喃不清的“大师”，“二二二”，“泯恩仇”，你也听不出个所以然。','二虎子'],
['一个金眼赤眉的老人，传说来自遥远的黑森之山，有着深不可测的妖道修为。','老妖'],
['『地府』威震江湖的右护法，手中大斧不知道收留了多少江湖高手的亡魂。','欢乐剑客'],
['江湖人无人不知，无人不晓的黑市老鬼头，包裹里无奇不有，无所不卖，只要你有钱，什么稀奇的货品都有，比如黑鬼的凝视，眼泪，咆哮，微笑。。。一应俱全。','黑市老鬼'],
['两件普通的黑布衣衫罩在身上，粗犷的眉宇间英华内敛，目光凝实如玉，显出极高的修行。《参同契》有云：「故铅外黑，内怀金华，被褐怀玉，外为狂夫」。目睹此人，可窥一斑。','纵横老野猪'],
['一个佝偻着身躯的玄衣老头，从后面看去，似是没有头一样，颇为骇人。','无头苍蝇'],
['武林中数一数二的后起之秀，和所有崛起的江湖高手一样，潜心修炼，志气凌云。','神弑☆铁手'],
['一个退隐的禅师，出家人连名字都忘怀了，只剩下眼中隐含的光芒还能看出曾是问鼎武林的高手。','禅师'],
['后起之秀，面若中秋之月，色如春晓之花，鬓若刀裁，眉如墨画。','道一'],
['一个与世无争的清修高人，无心江湖，潜心修仙。用「美男子」来形容他一点也不为过。身高近七尺，穿着一袭绣绿纹的紫长袍，外罩一件亮绸面的乳白色对襟袄背子。','采菊隐士'],
['曾经的江湖第二豪门『天傲阁』的大当家，武勇过人，修为颇深。怎奈何门派日渐式微，江湖声望一日不如一日，让人不禁扼腕叹息，纵使一方霸主也独木难支。','【人间】雨修'],
['江湖豪门『21世纪影业』的灵魂，当世绝顶高手之一，正在此潜心修练至上武学心法，立志要在这腥风血雨的江湖立下自己的声威！','番茄'],
['白须白发，仙风道骨，离世独居的高人。','剑仙'],
['『不落皇朝』当之无愧的君主和领袖，致力破除心中习武障魔，参得无上武道。头上戴着束发嵌宝紫金冠，齐眉勒着二龙抢珠金抹额，如同天上神佛降临人世。','冷泉心影'],
['身穿水墨色衣、头戴一片毡巾，生得风流秀气。『地府』帮的开山祖师，曾是武功横绝一时的江湖至尊。手中暗器『大巧不工』闻者丧胆，镖身有字『挥剑诀浮云』。','汉时叹'],
['身躯凛凛，相貌堂堂。一双眼光射寒星，两弯眉浑如刷漆。胸脯横阔，有万夫难敌之威风。武林至尊榜顶尖剑客，一人一剑，手持『春雷』荡平天剑谷，天下武林无人不晓！神剑剑身一面刻“凤年”，一面刻着“天狼”。','烽火戏诸侯'],
['器宇轩昂，吐千丈凌云之志气。白衣黑发，双手负于背后，立于巨岩之顶，直似神明降世。这是武林至尊榜第一高手，不世出的天才剑客，率『纵横天下』帮独尊江湖。手持一柄『穿林雨』长枪，枪柄上刻着一行小字：『归去，也无风雨也无晴』。','阿不'],
['一个穿着仆人服装的家丁。','家丁'],
['他是慕容家四大家臣之首，功力最为深厚。','邓家臣'],
['这是个身穿红衣的女郎，大约十七八岁，一脸精灵顽皮的神气。一张鹅蛋脸，眼珠灵动，别有一番动人风韵。','朱姑娘'],
['她身穿古铜缎子袄裙，腕带玉镯，珠翠满头，打扮的雍容华贵，脸上皱纹甚多，眼睛迷迷朦朦，似乎已经看不见东西。','慕容老夫人'],
['一个侍女，年龄不大。','慕容侍女'],
['他是慕容家四大家臣之二，为人稳重。','公冶家臣'],
['他是慕容家四大家臣之三，生性喜欢饶舌。','包家将'],
['他是慕容家四大家臣之四，最喜欢打架，轻易却不服输。','风波恶'],
['他是姑苏慕容的传人，他容貌俊雅，风度过人，的确非寻常人可比。','慕容公子'],
['他是姑苏慕容的传人，可以说是自慕容龙城以下武功最为杰出之人。不仅能贯通天下百家之长，更是深为精通慕容家绝技。','慕容家主'],
['这是一个蔓陀山庄的丫环。','小茗'],
['一个中年妇女，身上的皮肤黝黑，常年不见天日的结果。','严妈妈'],
['她秀美的面庞之上，端庄中带有稚气，隐隐含着一丝忧色。见你注目看她不觉低头轻叹。只听得这轻轻一声叹息。霎时之间，你不由得全身一震，一颗心怦怦跳动。心想：“这一声叹息如此好听，世上怎能有这样的声音？”听得她唇吐玉音，更是全身热血如沸！','神仙姐姐'],
['她身穿鹅黄绸衫，眉目口鼻均美艳无伦，脸上却颇有风霜岁月的痕迹。','王夫人'],
['这是一个蔓陀山庄的丫环。','小兰'],
['这是个身穿绿衣的女郎，约十六七岁年纪，满脸都是温柔，满身都是秀气。一张可爱的瓜子脸，肤白如新剥鲜藕，说话声音极甜极清，令人一听之下说不出的舒适。嘴角边一粒细细的黑痔，更增俏媚。','碧姑娘'],
['一位年轻的船工。表情看上去很消沉，不知道发生了什么。','船工小厮'],
['她看起来像个小灵精，头上梳两个小包包头。她坐在地上，看到你看她便向你作了个鬼脸!你想她一定是调皮才会在这受罚!','芳绫'],
['经常在孔府徘徊的斥候。','无影斥候'],
['封山剑派掌门，看似中了某种迷香，昏昏沉沉的睡着。','柳掌门'],
['她是一个身着白衣的摆夷女子，长发飘飘，身态娥娜。','摆夷女子'],
['他是一个大理国禁卫军士兵，身着锦衣，手执钢刀，双目精光炯炯，警惕地巡视着四周的情形。','士兵'],
['他站在那里，的确有说不出的威风。','武将'],
['一位台夷族的商贩，正在贩卖一竹篓刚打上来的活蹦乱跳的鲜鱼。','下关城台夷商贩'],
['一位乌夷族的商贩，挑着一担皮毛野味在贩卖。','乌夷商贩'],
['这家伙满脸横肉一付凶神恶煞的模样，令人望而生畏。','土匪'],
['一位身强力壮的乌夷族猎手。','猎人'],
['一位来远道而来的汉族商人，来此采购皮货。','皮货商'],
['她是一个摆夷牧羊女子。','牧羊女'],
['他一个摆夷牧羊男子。','牧羊人'],
['他是一个和尚，是黄眉大师的二弟子。','破嗔'],
['他是一个和尚，是黄眉大师的大弟子。','破疑'],
['他身穿一件青布长袍，身高五尺有余，脸上常年戴一张人皮面具，喜怒哀乐一丝不露。','段恶人'],
['一个看起来道风仙骨的道士。','吴道长'],
['一位乌夷族的农夫，束发总于脑后，用布纱包着，上半身裸露，下著兽皮。','农夫'],
['一位身强体壮的摆夷族农夫。','摆夷农夫'],
['一个乌夷族的祭司，身披乌夷大麾，戴着颇多金银饰物，显示其地位不凡。','乌夷老祭祀'],
['一位乌夷族的少女，以酥泽发，盘成两环，上披蓝纱头巾，饰以花边。','少女'],
['一头短角山羊，大理地区常见的家畜。','山羊'],
['一只斑斓孟加拉虎，雄伟极了。','孟加拉虎'],
['这是一个神农帮的帮众，身穿黄衣，肩悬药囊，手持一柄药锄。','神农帮弟子'],
['这是无量剑派的一名弟子，腰挎一柄长剑，神情有些鬼祟，象是惧怕些什么。','无量剑弟子'],
['他是大理国四大护卫之一。一副书生酸溜溜的打扮行头。','朱护卫'],
['这是位锦衣卫士，身着锦衣，手执钢刀，双目精光炯炯，警惕地巡视着四周的情形。','锦衣卫士'],
['一个风尘仆仆的侠客。。','太监'],
['一只全身洁白的丹顶鹤，看来是修了翅膀，没法高飞了。','丹顶鹤'],
['一位大理皇宫乌夷族宫女，以酥泽发，盘成两环，一身宫装，目无表情。','宫女'],
['他是大理国四大护卫之一。','傅护卫'],
['他是大理国四大护卫之一。身穿黄衣，脸上英气逼人。手持一根铁杆。','褚护卫'],
['他是大理国镇南王府的家丁。','家丁'],
['他一身邋遢，形容委琐，整天迷迷糊糊的睡不醒模样。可是他的账务十几年来无可挑剔。原来他就是伏牛派的崔百泉，为避仇祸隐居于此。','霍先生'],
['他是大理国三大公之一。华司徒本名阿根，出身贫贱，现今在大理国位列三公，未发迹时，干部的却是盗墓掘坟的勾当，最擅长的本领是偷盗王公巨贾的坟墓。这些富贵人物死后，必有珍异宝物殉葬，华阿根从极远处挖掘地道，通入坟墓，然后盗取宝物。所花的一和虽巨，却由此而从未为人发觉。有一次他掘入一坟，在棺木中得到了一本殉葬的武功秘诀，依法修习，练成了一身卓绝的外门功夫，便舍弃了这下贱的营生，辅佐保定帝，累立奇功，终于升到司徒之职。','华司徒'],
['他是大理国三公之一。','范司马'],
['他是大理国三公之一。一个又瘦又黑的汉子，但他的擅长轻功。','巴司空'],
['大理王妃，徐娘半老，风韵犹存。','段王妃'],
['一个练功用的比武石人，雕凿得很精细，如同真人一般。','石人'],
['他是大理国镇南王府管家。','段无畏'],
['他是大理国四大护卫之一。','古护卫'],
['一个风程仆仆的侠客。','王府御医'],
['他就是大理国的镇南王，当今皇太弟，是有名的爱情圣手。','段皇爷'],
['她长得似新月清晕，如花树堆雪，一张脸秀丽绝俗，只是过于苍白，没半点血色，想是她长时面幕蒙脸之故，两片薄薄的嘴唇，也是血色极淡，神情楚楚可怜，娇柔婉转。','婉清姑娘'],
['这是一个经验老到的生意人，一双精明的眼睛不停的打量着你。','薛老板'],
['他是一个打磨大理石的石匠，身上只穿了一件坎肩，全身布满了厚实的肌肉。','石匠'],
['一个幼小的摆夷儿童。','摆夷小孩'],
['他是一个外地来的江湖艺人，手里牵着一只金丝猴儿，满脸风尘之色。','江湖艺人'],
['这位店小二正笑咪咪地忙著，还不时拿起挂在脖子上的抹布擦脸。','太和居店小二'],
['她是一个卖唱为生的歌女。','歌女'],
['南国的大姑娘颇带有当地优美秀丽山水的风韵，甜甜的笑，又有天真的浪漫。她穿着白色上衣，蓝色的宽裤，外面套着黑丝绒领褂，头上缠着彩色的头巾。','南国姑娘'],
['一个摆夷老叟大大咧咧地坐在竹篱板舍门口，甩着三四个巴掌大的棕吕树叶，瞧着道上来来往往的人们，倒也快活自在。','摆夷老叟'],
['一只好可爱的小野兔。','野兔'],
['这是一位从印度来的客商，皮肤黝黑，白布包头，大理把印度人叫作盛皮罗。','盛皮罗客商'],
['这位店小二正笑咪咪地忙著，还不时拿起挂在脖子上的抹布擦脸。','客店店小二'],
['他身穿粗布僧袍，两道长长的白眉从眼角垂了下来，面目慈祥，长须垂肩，眉间虽隐含愁苦，但一番雍容高华的神色，却是一望而知。大师一生行善，积德无穷。','古灯大师'],
['一位台夷族的渔夫，扛这两条竹桨，提着一个鱼篓。','渔夫'],
['一位台夷族的猎手，擅用短弩，射飞鸟。','台夷猎人'],
['一位中年的台夷妇女，上着无领衬花对襟，下穿五色筒裙，正在编织渔网。','台夷妇女'],
['一位年轻的台夷姑娘，上着无领衬花对襟，下穿五色筒裙。','台夷姑娘'],
['一头南方山区常见的水牛，是耕作的主力，也用来拉车载物。由于水草茂盛，长得十分肥壮。','水牛'],
['一位年轻的台夷农妇，在田里辛勤地劳作着。','台夷农妇'],
['一个卢鹿部的青年台夷妇女，背后背了个竹筐，手拿一把砍柴刀，来采竹笋。','武定镇采笋人'],
['一位满脸皱纹的老年妇女，正是本村的族长。台夷时处母系氏族，族中权贵皆为妇女。','族长'],
['一位满脸皱纹的老年妇女，是本村的大祭司，常年司守祭台。台夷时处母系氏族，祭司要职皆为妇女。','祭祀'],
['他看上去长的眉清目秀。','侍者'],
['大理国侯爷，这是位宽袍大袖的中年男子，三缕长髯，形貌高雅','高侯爷'],
['这是位身怀绝技的武士。','素衣卫士'],
['一个部族头领的陪从。','陪从'],
['这是一个身裹虎皮的高大男性。','傣族首领'],
['大土司是摆夷族人氏，是苍山纳苏系的。他倒是长的肥头大耳的，每说一句话，每有一点表情，满脸的肉纹便象是洱海里的波浪一样。他身着彩绸，头带凤羽，脚踩藤鞋，满身挂着不同色彩的贝壳。只见他傲气凛然地高居上座，不把来人看在眼里。','大土司'],
['这位倒也打扮的利索，一身短打，白布包头，翘起的裤腿，一双洁白的布鞋，格外醒目。他正准备出去筹备白尼族一年一度的大会。','侍从'],
['这位是哈尼的族头人，哈尼是大理国的第三大族，大多聚在大都附近。此人貌甚精明，身穿对襟衣，亦是白布包头。他坐在大土司的右下首，对来人细细打量着。','族头人'],
['这是位黄衣卫士，身着锦衣，手执钢刀，双目精光炯炯，警惕地巡视着四周的情形。','黄衣卫士'],
['一只色彩斑斓大个野蜂，成群结队的。','毒蜂'],
['一个风尘仆仆的侠客。。','平通镖局镖头'],
['一只叽叽喳喳，飞来飞去的小麻雀。','麻雀'],
['玉虚观的小道姑，她是在这接待香客的。','小道姑'],
['这是个容貌秀丽的中年道姑，是个摆夷族女子，颇有雍容气质。','刀俏尼'],
['一个精壮僧人。','僧人'],
['他的面容奇特之极，左边的一半脸色红润，皮光肉滑，有如婴儿，右边的一半却如枯骨，除了一张焦黄的面皮之外全无肌肉，骨头突了出来，宛然便是半个骷髅骨头。这是他修习枯荣禅功所致。','枯大师'],
['他看上去膀大腰粗，横眉怒目，满面横肉。看来手下倒也有点功夫。','恶奴'],
['这是一介翩翩贵公子，长得到也算玉树临风、一表人才，可偏偏一双眼睛却爱斜着瞟人。','贵公子'],
['一个远道来的汉族游客，风尘仆仆，但显然为眼前美景所动，兴高彩烈。','大理游客'],
['一个年轻的摆夷村妇。','村妇'],
['他是一个身穿青衫的年轻男子。脸孔略尖，自有一股书生的呆气。','段公子'],
['一只让人看了起鸡皮疙瘩的竹叶青蛇。','竹叶青蛇'],
['一个台夷妇女，背着个竹篓贩卖些丝织物品和手工艺品。','阳宗镇台夷商贩'],
['一个年轻的摆夷采桑姑娘。','采桑女'],
['一个壮年村民，住在数里外的村庄，背后背了个竹筐，手拿一把砍柴刀，上山来采竹笋。','阳宗镇采笋人'],
['一个壮年村民，住在山下的村落里，是上山来砍伐竹子的。','砍竹人'],
['一个年轻的摆夷村妇，养蚕纺丝为生。','养蚕女'],
['一个年轻的摆夷村妇，心灵手巧，专擅纺纱。','纺纱女'],
['一个颇老朽的摆夷老人，穿戴齐整，是本村的祭司，权力颇大，相当于族长。','老祭祀'],
['一生黑装的老人。','黑袍老人'],
['一生白装的老人。','白袍老人'],
['出了家的人，唯一做的事就是念经了。','和尚'],
['一个正虔诚念经的尼姑。','尼姑'],
['一个饱经风霜的摆渡老人。','摆渡老人'],
['他是独孤求败的爱徒，但他和师傅的性格相差极远。他从不苟言笑，他的脸永远冰冷，只因他已看透了世界，只因他杀的人已太多。他永远只在杀人的时候微笑，当剑尖穿过敌人的咽喉，他那灿烂的一笑令人感到温暖，只因他一向认为——死者无罪！','天怒剑客'],
['这是一个中年男子。正静静地站着，双目微闭，正在听海！','任笑天'],
['他站在这里已经有几十年了。每天看天上划过的流星，已经完全忘记了一切……甚至他自己。','摘星老人'],
['一位落魄的中年人，似乎是一位铁匠。','落魄中年'],
['一个饱经风霜的栽花老人。','栽花老人'],
['此人背着一把生锈的刀，他似乎姓浪，武功深不可测。','背刀人'],
['这是一个绝美的女子，正在静静地望着天上的圆月。她的脸美丽而忧伤，忧伤得令人心碎。','雁南飞'],
['这是一个寻梦的人。他已厌倦事实。他只有寻找曾经的梦，不知道这算不算是一种悲哀呢？','梦如雪'],
['他是剑痴，剑重要过他的生命。','剑痴'],
['这个人全身都是模糊的，仿佛是一个并不真正存在的影子。只因他一生都生活在雾中，雾朦胧，人亦朦胧。','雾中人'],
['这就是一代剑帝独孤求败。独孤求败五岁练剑，十岁就已经罕有人能敌。被江湖称为剑术天才。','独孤不败'],
['浑身充满灼热的气息，嘴巴可吐出高温烈焰，拥有强韧的利爪以及锋利的尖齿，是主宰冰火岛上的兽王。岛上酷热的火山地带便是他的领地，性格极其凶残，会将所看到闯入其领地的生物物焚烧殆尽。','火麒麟王'],
['磷甲刀枪不入，四爪孔武有力速度奇快。浑身能散发极高温的火焰，喜热厌冷，嗜好吞噬火山晶元。现居于冰焰岛火山一侧。','火麒麟'],
['火麒麟的爱子，生人勿近。','麒麟幼崽'],
['一名云游四海的道士，头束白色发带，身上的道袍颇为残旧，背驮着一个不大的行囊，脸上的皱纹显示饱经风霜的游历，双目却清澈异常，仿佛包容了天地。','游方道士'],
['一身赭黄色的皮毛，背上还有许多像梅花白点。头上岔立着的一双犄角，看上去颇有攻击性。行动十分机敏。','梅花鹿'],
['毛色净白，眼瞳红如鲜血，牙齿十分锐利，身形巨大强壮，速度极快。天性狡猾，通常都是群体出动。','雪狼'],
['全身长满白色长毛，双爪极度锋利，身材颇为剽悍，十分嗜血狂暴。是冰焰岛上最强的猎食者。','白熊'],
['此女容貌娇艳无伦，虽已过中年但风采依稀不减。为人任性长情，智计百出，武功十分了得。立场亦正亦邪。乃张五侠结发妻子，张大教主亲生母亲。','殷夫人'],
['在武当七侠之中排行第五，人称张五侠。虽人已过中年，但脸上依然俊秀。为人彬彬有礼，谦和中又遮不住激情如火的风发意气。可谓文武双全，乃现任张大教主的亲生父亲。','张五侠'],
['天下兵马大元帅汝阳王之女，大元第一美人。明艳不可方物，艳丽非凡，性格精灵俊秀，直率豪爽，对张大教主一往情深，为爱放弃所有与其共赴冰焰岛厮守终身。','赵郡主'],
['他就是明教的四大护法之一的金毛狮王。他身材魁伟异常，满头金发散披肩头。但双目已瞎。在你面前一站，威风凛凛，真如天神一般。','谢狮王'],
['穿着极其神秘的黑衣人，黑色的面巾遮住了他的面容。武功十分高强。','黑衣杀手'],
['颇为精明能干。闪烁的双眼散发毋容置疑的威望。乃是这群不明来历黑衣人的统领头目。','杀手头目'],
['此人武功极高，极富智谋，心狠手辣杀人如麻。因与前明教教主私怨而恼羞成怒，出家剃度意图挑拨江湖各大派，以达歼灭明教颠覆武林之目的。与谢狮王也有过一段不为人知的恩怨情仇。','元真和尚'],
['蓬头垢面，衣服千丝万缕，显然被关在这里已经很久了。','蓬面老头'],
['这是个身着黄衣的三十几岁汉子，手持木桨，面无表情。','黄衣船夫'],
['他是岛上的一个仆人，手底下似乎很有两下子。','侠客岛厮仆'],
['乃江湖传闻中赏善罚恶使者之一，其精明能干，为人大公无私。但平时大大咧咧表情十分滑稽。','张三'],
['一位云游四方的行者，风霜满面，行色匆匆，似乎正在办一件急事。','云游高僧'],
['他大约二十多岁，精明能干，笑嘻嘻的和蔼可亲。','王五'],
['乃侠客岛龙岛主门下的一个弟子。身上穿着洗得发白的锦衣，头上带着秀才帽，一脸的书呆子气，怎麽看也不象是个武林中人。','白衣弟子'],
['一个鹤发童颜的老头，穿得荒诞不经，但看似武功十分了得。','丁三'],
['位店小二正笑咪咪地忙著，还不时拿起挂在脖子上的抹布擦脸。','店小二'],
['他是岛上一个游手好闲的人。不怀好意。','侠客岛闲人'],
['这是一个年轻公子，面若中秋之月，色如春晓之花，鬓若刀裁，眉如墨画，鼻如悬胆，情若秋波，虽怒而时笑，即视而有情。','石公子'],
['他看过去像个落泊的书生，呆头呆脑的一付书呆子的样子。但只要你留心，你就发现他两眼深沉，而且腰挂一把长剑。','书生'],
['一个十七八岁的少女，身穿淡绿衫子，一张瓜子脸，秀丽美艳。','丁当'],
['他就是雪山剑派的掌门人，习武成性，自认为天下武功第一，精明能干，嫉恶如仇，性如烈火。','白掌门'],
['他身材魁梧，圆脸大耳，笑嘻嘻地和蔼可亲。','马六'],
['这是身材魁梧的壮汉，膀大腰圆，是岛主从中原招募来的。力气十分之大。','侠客岛弟子'],
['身形甚高，但十分瘦削，留一撇鼠尾须，脸色阴沉。就是江湖传闻中赏善罚恶使者之一，其精明能干，但总是阴沉着脸。','李四'],
['她是木岛主的女弟子，专管传授岛上弟子的基本功夫。','蓝衣弟子'],
['这是一个十五六岁的少年，眉清目秀，聪明伶俐，深得岛主喜爱。','童子'],
['就是天下闻之色变的侠客岛岛主，号称“不死神龙”。他须眉全白，脸色红润，有如孩童。看不出他的实际年纪。','龙岛主'],
['他就是天下闻之色变的侠客岛岛主，号称“叶上秋露”。只见他长须稀稀落落，兀自黑多白少，但一张脸却满是皱纹。看不出他的实际年纪。','木岛主'],
['这是个身着黄衣的三十几岁汉子，垂手站立，面无表情。','侍者'],
['她是雪山派白掌门的妻子，虽说现在人已显得苍老，但几十年前提起“江湖一枝花”史小妹来，武林中却是无人不知。','史婆婆'],
['此老身躯矮小，但气度非凡，令人不敢小窥。他与其师弟高老者闭关已久，江湖上鲜闻其名。武功之高，却令人震惊。','矮老者'],
['他身形高大硕状，满面红光。举止滑稽，带点傻气，武功却是极高。他因不常在江湖上露面，是以并非太多人知闻其名。','高老者'],
['他就是摩天崖的主人。是个亦正亦邪的高手，但信守承诺，年轻时好武成兴，无比骄傲，自认为天下第一。','谢居士'],
['他是个精通诗理的学者，原本是被逼而来到侠客岛，但学了武功後死心塌地的留了下来。','朱熹'],
['一只机灵的猴子，眼巴巴的看着你，大概想讨些吃的。','小猴子'],
['一个一辈子以砍材为生的老樵夫，由于饱受风霜，显出与年龄不相称的衰老。','樵夫'],
['一位白发银须的老者。据说当年曾经是江湖上一位著名的神医。他看起来懒洋洋的，你要是想请他疗伤的话恐怕不那么容易。','医者'],
['为人忠厚老实，性情温和，天赋极高，记性极好。穿着一身破烂的衣服，却也挡不住他一身的英气。似乎身怀绝世武功。','石帮主'],
['这是一只凶猛的野猪，长得极为粗壮，嘴里还不断发出可怕的哄声。','野猪'],
['这是个渔家少年，大概由于长期在室外的缘故，皮肤已晒得黝黑，人也长得很粗壮了。','渔家男孩'],
['看过去像个平平凡凡的渔夫，脸和赤裸的臂膀都晒得黑黑的。但只要你留心，你就发现他两眼深沉，而且腰挂一把长剑。','渔夫'],
['这是个渔家少女，虽然只有十二、三岁，但身材已经发育得很好了，眼睛水汪汪很是诱人。','渔家少女'],
['一个精神矍烁的老者，他正手持书籍，稳站地上，很有姜太公之风。','阅书老者'],
['一个青年海盗，颇为精壮，，眼角中展露出了凶相。','青年海盗'],
['一个年老的海盗，虽然胡子一大把了，但还是凶巴巴的。','老海盗'],
['在山谷下烧伤抢掠的恶人。','土匪'],
['世代生活于此的人，每日靠着进山打打猎生活。','村民'],
['正在吃草的野兔。','野兔'],
['年纪不大，却心狠手辣，一直守候在绝情山庄。','绝情谷弟子'],
['身体犹如冰块透明般的蛇。','冰蛇'],
['一条通体雪白的大蛇。','千年寒蛇'],
['在绝情谷中研究怎么破解情花之毒的医学圣手。','天竺大师'],
['照顾着绝情谷的花花草草的少女。','养花女'],
['好色的绝情谷谷主从来劫来的少女。','侍女'],
['绝情谷上一任谷主的女儿，被现任谷主所伤，终日只得坐在轮椅之上。','谷主夫人'],
['这是个年富力强的卫兵，样子十分威严。','门卫'],
['好色、阴险狡诈的独眼龙。','绝情谷谷主'],
['一个宛如仙女般的白衣女子。','白衣女子'],
['声名狼藉的采花贼，一路潜逃来到了绝情谷。','采花贼'],
['鲜卑皇族后裔，自幼就表现出过人的军事天赋，十七岁时就远赴河套抗击柔然骑兵，迫使柔然不敢入侵。','拓跋嗣'],
['多权谋，善用计，所率西夏堂刺客素以神鬼莫测著称，让对头心惊胆战。','没藏羽无'],
['西夏皇族后裔，黑道威名赫赫的杀手头领，决策果断，部署周密，讲究战法，神出鬼没。','野利仁嵘'],
['一副圆圆的面孔，炯炯的目光下，鹰勾鼻子耸起，刚毅中带着几分凛然不可侵犯的神态。中等身材，却显得魁梧雄壮，英气逼人。平素喜穿白色长袖衣，头戴黑色冠帽，身佩弓矢。此人城府心机深不可测，凭借一身最惊世骇俗的的锤法位居西夏堂最处尊居显之位，力图在天波杨门与燕云世家三方互相牵制各自鼎立态势下，为本门谋求最大之利益。','嵬名元昊'],
['身着黑色纱裙，面容精致秀美，神色冷若冰雪，嘴角却隐隐透出一股温暖的笑意。现在似是在被仇家围攻，已是身受重伤。','雪若云'],
['饲养鳄鱼的年轻汉子。','养鳄人'],
['悠闲的在鳄鱼潭边休息，看似人畜无害，但是无人敢靠近它们。','鳄鱼'],
['被关押在暗无天日的地牢内，落魄的样子无法让你联想到他们曾是江湖好汉。','囚犯'],
['看守着地牢的武者，一脸严肃，不知道在想些什么。','地牢看守'],
['管理龙王殿的高僧，龙王殿大大小小的事物都是他在负责。','法明大师'],
['龙王殿僧人，负责每年祭祀龙王。','僧人'],
['厌倦了这世间的纷纷扰扰，隐居于此的世外高人。','隐士'],
['正在吃草的兔子。','野兔'],
['他是一个身材高大的中年男子，看起来凶神恶煞，招惹不得。','护卫'],
['打理碧海山庄上上下下的杂物。','侍女'],
['她肌肤胜雪，双目犹似一泓清水，顾盼之际，自有一番清雅高华的气质，让人为之所摄、自惭形秽、不敢亵渎。但那冷傲灵动中颇有勾魂摄魄之态，又让人不能不魂牵蒙绕。','尹秋水'],
['一位养花少女，她每天就是照顾这数也数不清的花。','养花女'],
['碧海山庄的家丁。','家丁'],
['出身契丹皇族，为人多智谋，善料敌先机，骑术了得，为大辽立下赫赫卓著战功。故而被奉为燕云世家之主。与天波杨门缠斗一生，至死方休。','耶律楚哥'],
['身材瘦小，可是一身武艺超群，碧海山庄之内能胜他者不超过五人','护卫总管'],
['一身厨艺已经傲世天下，煎、熬、燔、炙，无所不精。','易牙传人'],
['碧海山庄所需木柴都由他来供给。','砍柴人'],
['一个风程仆仆的侠客。','独孤雄'],
['碧海山庄少庄主，整日沉迷于一些稀奇古怪的玩意。','王子轩'],
['年过半百的中年男子，长相平庸，很难让人把他与碧海山庄庄主这个身份联想起来。','王昕'],
['大内军教头，外表朴实无华，实则锋芒内敛。有着一腔江湖豪情。','周教头'],
['性情古怪，不好交往，喜用新招，每每和对方对招之际，学会对方的招式，然后拿来对付对方，令到对方啼笑皆非。。是个狼养大的孩子，他很能打，打起来不要命，一个性情古怪的人，有着一段谜一样的过去。','辛怪人'],
['一个只有十八九岁的小伙子，乐观豁达，无处世经验，对情感也茫然无措，擅长进攻，变化奇快。','穆小哥'],
['这是一位边塞牧民，正在驱赶羊群。','牧民'],
['一副凶神恶煞的长相，来自塞外。以掳掠关外牧民卫生。','塞外胡兵'],
['手持一根狼牙棒，背负一口长弓。身材高大，面目可憎。','胡兵头领'],
['他就是名动江湖的乌老大，昔日曾谋反童姥未遂而被囚禁于此。','乌刀客'],
['这是一位来自波斯的商人，经商手段十分高明。','波斯商人'],
['乃行走江湖的绿林好汉，脾气极为暴躁。','贺好汉'],
['邱莫言重金雇佣的绿林好汉，贺兰山草寇。缺乏主见，使一柄没有太多特色的单刀，虽是为财而来，却也不失为江湖义士','铁好汉'],
['乃龙门客栈屠夫，此人凭借常年累月的剔骨切肉练就一身好刀法。','刁屠夫'],
['龙门客栈老板娘，为人八面玲珑。左手使镖，右手使刀，体态婀娜多姿，妩媚泼辣。','金老板'],
['一位憨直的汉子，面容普通，但本性古道热肠，有侠义本色。','韩马夫'],
['这是个身材娇好的女郎，轻纱遮面，一双秀目中透出一丝杀气。','蒙面女郎'],
['他身穿一件藏蓝色古香缎夹袍，腰间绑着一根青色蟒纹带，一头暗红色的发丝，有着一双深不可测眼睛，体型挺秀，当真是风度翩翩飒爽英姿。','武壮士'],
['她是「灵柩宫」九天九部中钧天部的副首领','程首领'],
['这是个容貌姣好的女子，瓜子脸蛋，眼如点漆，清秀绝俗。','菊剑'],
['她是[灵柩宫]的厨师。','石嫂'],
['这是个容貌姣好的女子，瓜子脸蛋。','兰剑'],
['她是「灵柩宫」九天九部中阳天部的首领她号称「针神」','符针神'],
['她有着白皙的面容，犹如梅花般的亲丽脱俗，堆云砌黑的浓发，整个人显得妍姿俏丽惠质兰心。','梅剑'],
['这是个容貌姣好的女子，瓜子脸蛋，眼如点漆，清秀绝俗。你总觉得在哪见过她','竹剑'],
['她是「灵柩宫」九天九部中昊天部的首领。她跟随童姥多年，出生入死，饱经风霜。','余婆'],
['他是西夏一品堂礼聘的高手，身材高瘦，脸上总是阴沉沉的他轻功极高，擅使雷公挡，凭一手雷公挡功夫，成为江湖的一流高手。','九翼'],
['是掌门从武林掳掠天资聪明的小孩至天山培养的弟子，自小就相互厮杀，脱颖而出者便会成为天山死士，只听命于掌门一人，倘若有好事者在天山大动干戈，他将毫不犹豫的将对方动武，至死方休。','天山死士'],
['弃尘世而深居天山颠峰，数十年成铸剑宗师，铸成七把宝剑。此七把剑代表晦明大师在天山上经过的七个不同剑的境界。','天山大剑师'],
['这是掌门最忠心的护卫，武功高深莫测。正用警惕的眼光打量着你','护关弟子'],
['有“塞外第一剑客”之称、“游龙一出，万剑臣服”之勇。性傲、极度自信、重情重义、儿女情长，具有英雄气盖，但容易感情用事，做事走极端。乃天山派大师兄。','楚大师兄'],
['一个三绺长须、面色红润、儒冠儒服的老人，不但医术精妙，天下无匹，而且长于武功，在剑法上有精深造诣。除此之外，他还是书画名家。','傅奇士'],
['一个有情有义的好男儿，他武功高强大义凛然，乃天山派二师兄。','杨英雄'],
['因其武功高强神出鬼没。在江湖上人送外号「雪山飞狐」。他身穿一件白色长衫，腰间别着一把看起来很旧的刀。他满腮虬髯，根根如铁，一头浓发，却不结辫。','胡大侠'],
['此人俊秀异常，个性温和有风度，喜好游历山水是一位姿态优雅的翩翩君子。','温青'],
['这是本村的村长，凡是村里各家各户，老老少少的事他没有不知道的。','苗村长'],
['此娃肥肥胖胖，走路一晃一晃，甚是可爱。','苗家小娃'],
['一个身穿苗族服饰的英俊少年。','苗族少年'],
['一个身穿苗族服饰的妙龄少女。','苗族少女'],
['一个白皙丰满的中年妇人．','田嫂'],
['一条三尺多长，张牙舞爪的毒蜈蚣。','金背蜈蚣'],
['一只面盆大小，长着人样脑袋的大蜘蛛。','人面蜘蛛'],
['一只拳头大小，全身绿毛的毒蜘蛛。','吸血蜘蛛'],
['一只拳头大小通身金黄的小蟾蜍，据说只有月宫才有。','三足金蟾'],
['一位面色黑红，悠然自得的樵夫。','樵夫'],
['此女千娇百媚，风韵甚佳，声音娇柔宛转，荡人心魄。年龄约莫二十三四岁。喜欢养毒蛇，能炼制传说中苗族人的蛊毒，还善于配置各种剧毒。喜欢吹洞箫，口哨也很好。','蓝姑娘'],
['一只拳头大小，叫声洪亮的毒蛤蟆。','莽牯朱蛤'],
['一条三寸多长，长有一双翅膀剧毒蜈蚣。','阴山天蜈'],
['一条三尺来长，全身铁甲的毒蝎子。','食尸蝎'],
['一条七尺多长，手腕般粗细的毒蛇。十分骇人。','蛇'],
['一个五毒的基层教徒，看来刚入教不久。','五毒教徒'],
['他就是五毒教的护法弟子，身材魁梧，方面大耳。在教中转管招募教众，教授弟子们的入门功夫。','沙护法'],
['五毒教一个身体强壮的苗族青年，看来武功已小由所成。','五毒弟子'],
['一位身穿道服，干瘪黑瘦的中年苗人．','毒郎中'],
['一个须发皆白的老者，精神矍铄，满面红光。','白鬓老者'],
['她就是五毒教的长老，教主的姑姑。随然是教主的长辈，但功夫却是一块跟上代教主学的。据说她曾经被立为教主继承人，但后来犯下大错，所以被罚到此处面壁思过，以赎前罪。她穿着一身破旧的衣衫，满脸疤痕，长得骨瘦如柴，双目中满是怨毒之色。','何长老'],
['年纪约20岁，冷艳绝伦，背景离奇，混身是毒，外号毒女曼陀罗，涉嫌下毒命案，其实她是个十分善良的女子。与铁捕快有一段缠绵悱恻的爱情，花耐寒而艳丽。','毒女'],
['他就是五毒教的左护法，人称笑面阎罗。别看他一脸笑眯眯的，但是常常杀人于弹指之间，一手五毒钩法也已达到登峰造极的境界。','潘左护法'],
['乃苗疆最为德高望重的祭师。但凡祭祀之事皆是由其一手主持。','大祭司'],
['他就是五毒教的右护法，人称五毒秀士。经常装扮成一个白衣秀士的模样，没事总爱附庸风雅。','岑秀士'],
['他就是五毒教的长老，人称锦衣毒丐。乃是教主的同门师兄，在教中一向飞扬跋扈，大权独揽。他长的身材魁梧，面目狰狞，身穿一件五彩锦衣，太阳穴高高坟起。','齐长老'],
['乃帮主的贴身护法，为人忠心耿耿，武艺深不可测。帮主有难时，会豁尽全力以护佑她人身安全。','五毒护法'],
['你对面的是一个一身粉红纱裙，笑靥如花的少女。她长得肌肤雪白，眉目如画，赤着一双白嫩的秀足，手脚上都戴着闪闪的金镯。谁能想到她就是五毒教的教主，武林人士提起她无不胆颤心惊。','何教主'],
['身穿白衣的青年弟子，似乎身手不凡，傲气十足。','白衣弟子'],
['身穿白帝城军服的士兵。','守门士兵'],
['身穿白衣的士兵，正在街上巡逻。','白衣士兵'],
['白帝城公孙氏的外戚，主要在紫阳城替白帝城防御外敌。','文将军'],
['负责管理紫阳城的粮仓的官员。','粮官'],
['正在奋力操练的士兵。','练武士兵'],
['公孙将军的近身侍卫，手执长剑。','近身侍卫'],
['公孙氏的一位将军，深受白帝信任，被派到紫阳城担任守城要务。','公孙将军'],
['身穿白帝城统一服饰的少年，长相虽然一般，但神态看起来有点傲气。','白衣少年'],
['精神奕奕的中年汉子，看起来非常自信。','李峰'],
['字太白，号青莲居士，又号“谪仙人”，他拿着一壶酒，似乎醉醺醺的样子。','李白'],
['一个公孙氏的纨绔弟子，无聊得假扮妖怪到处吓人。','“妖怪”'],
['一个风程仆仆的侠客。','庙祝'],
['一个普通的狱卒，似乎在这发呆。','狱卒'],
['现任白帝，乃公孙氏族长，看起来威严无比，在他身旁能感受到不少压力。','白帝'],
['白发苍苍的老头，貌似是李峰的父亲。','李巡'],
['白发苍苍的镇长，看起来还挺精神的。','镇长'],
['一声正气禀然的装束，乃天下间心存侠义之人仰慕墨家风采而成为其中一员。','墨家弟子'],
['此人乃墨子学生，为人特别诚恳，因此被指派负责接待外宾司仪一职。','索卢参'],
['为墨子的学生，口才十分了得。故而负责机关城与外界联系。','高孙子'],
['此人乃前朝皇族，灭国之后投身到墨家麾下四处行侠仗义神秘莫测。','燕丹'],
['墨家绝顶刺客，剑法在墨家中出类拔萃，为人慷慨侠义。备受墨家弟子所敬重。','荆轲'],
['一名憨厚开朗的大胖子，其刀法如神，是个烧遍天下美食的名厨。','庖丁'],
['为墨子的学生，有过目不忘之才数目分明之能，因此在节用市坐镇负责机关城资源调配。','治徒娱'],
['对天下学术有着极高造诣的宗师，主管墨家学说的传承。','大博士'],
['此人乃墨子的学生，深受墨子欣赏。曾经当过高官，现主管墨家日常政务。','高石子'],
['此人乃墨子学生，与高何一样无恶不作，后师从墨子，收心敛性，专职培养墨家人才。','县子硕'],
['为墨子的学生，此人天敏而好学，时常不耻下问，因此被墨子钦点在此顾守书籍。','魏越'],
['一身蒙面黑衣，鬼鬼祟祟，不知是何人。','黑衣人'],
['墨家最优秀的铸匠，毕生致力精研铸剑术，很多名震天下的神兵利刃皆是出自他手。','徐夫子'],
['此人乃资深航海师，墨家麾下的殸龙船便是由其掌控。','屈将子'],
['身穿黑色夜行衣，举手投足之间尽显高手风范，实力不容小觑。','偷剑贼'],
['此人乃墨子学生，面相凶神恶煞，因而负责机关城的安全事务。','高何'],
['随巢子的师弟，因犯事被暂时关于此地。','随师弟'],
['铸艺高超的墨家宗师，主管墨家兵器打造。','大匠师'],
['此人乃墨子的学生，沉迷于打造大型机关兽，木鸢便是出自其手。','随巢子'],
['机关术的专家，以善于发明各种机关而闻名。木匠出身，在机关术上有着天人一般的精湛技艺。如今不知为何来到墨家机关城。','鲁班'],
['早年曾质疑墨子之道，后被博大精深的墨家机关术所折服，专职看守天工坞。','曹公子'],
['为墨子的学生，此人天资异禀，但骄傲自满，因此被墨子惩罚到兼爱祠看管。','耕柱子'],
['墨家的开山祖师，以一人之力开创出机关流派，须眉皆白，已不知其岁数几何，但依然满脸红光，精神精神焕发。','墨子'],
['墨子的弟子，深得墨子器重，为人大公无私，现主管墨家的检察维持门内秩序。','公尚过'],
['两个年方豆蔻的小女孩，身上背着一把短剑，腰间系着一块『出云』玉牌，脸上全是天真烂漫。','佩剑少女'],
['一条低头啃着骨头的野狗。','野狗'],
['出云阁四大长老之一，负责出云庄在城中的各种日常事务，也带一些难得下山的年轻小弟子来城中历练。虽表情严肃，却深受晚辈弟子的喜爱。','执定长老'],
['一名喝得酩酊大醉的男子，看起来似是个浪荡的公子哥。','醉酒男子'],
['富家公子的仆人，唯唯诺诺地跟在身后。','仆人'],
['身着紫衣的侍从，不像是青楼守卫，却更有豪门王府门卫的气派。','紫衣仆从'],
['一名中年男子，虽是平常侠客打扮，却颇有几分朝廷中人的气度。','候君凛'],
['一名身着轻纱的女子，黛眉轻扫，红唇轻启，嘴角勾起的那抹弧度仿佛还带着丝丝嘲讽。眼波一转。流露出的风情让人忘记一切。','轻纱女侍'],
['身着红衣的抚琴少女，红色的外袍包裹着洁白细腻的肌肤，她偶尔站起走动，都要露出细白水嫩的小腿。脚上的银铃也随着步伐轻轻发出零零碎碎的声音。纤细的手指划过古朴的琵琶。令人骚动的琴声从弦衫流淌下来。','抚琴女子'],
['犹怜楼的女主事，半老徐娘，风韵犹存。','女官人'],
['一个在大厅中间舞台上表演的舞女，身着黑纱。她玉足轻旋，在地上留下点点画痕，水袖乱舞，沾染墨汁勾勒眼里牡丹，裙摆旋舞，朵朵莲花在她脚底绽放，柳腰轻摇，勾人魂魄，暗送秋波，一时间天地竞相为此美色而失色羞愧。可谓是丝竹罗衣舞纷飞！','黑纱舞女'],
['楼里的小厮，看起来乖巧得很。','小厮'],
['一名英姿飒爽的女剑客，身手非凡，负责把守通向后院的小路。','梅映雪'],
['犹怜楼内最善舞的女子，云袖轻摆招蝶舞、纤腰慢拧飘丝绦。她似是一只蝴蝶翩翩飞舞、一片落叶空中摇曳，又似是丛中的一束花、随着风的节奏扭动腰肢。若有若无的笑容始终荡漾在她脸上，清雅如同夏日荷花。','舞眉儿'],
['一条从西域带来的波斯猫。','寄雪奴儿'],
['女子长长的秀发随着绝美的脸庞自然垂下，月光下，长发上似乎流动着一条清澈的河流，直直泻到散开的裙角边，那翠色欲流的玉箫轻轻挨着薄薄的红唇，萧声凄美苍凉。她的双手洁白无瑕，轻柔的流动在乐声中，白色的衣裙，散落的长发，流离凄美。她眉宇间，忧伤像薄薄的晨雾一样笼罩着。没有金冠玉饰，没有尊贵华杉。她却比任何人都美。','琴楚儿'],
['衣着华贵的女子，年纪尚轻，身上似藏有一些秘密。','华衣女子'],
['一名面向粗旷威武的刀客，胡髯全是火红之色，似是钟馗一般。','赤髯刀客'],
['衣衫破烂却不污秽的老乞丐，身上有八个口袋，似是丐帮净衣八袋弟子。','老乞丐'],
['漠北马帮的得力弟子。','马帮弟子'],
['这是客栈门口负责为客人牵马喂马的小厮。','养马小厮'],
['卧马客栈的大掌柜的。','客栈掌柜'],
['一个跑前跑后的小二，忙得不可开交。','店小二'],
['当地特有的毒蛇，嘶嘶地发出警告，你最好不要靠近。','蝮蛇'],
['一名年青剑客，腰插一块显是王府内的令牌，让人对其身份产生了好奇。','东方秋'],
['这是镇守函谷关的官兵，在渡口侦探敌情。','函谷关官兵'],
['函谷关统兵武官，驻守渡口监视着敌人的动向。','函谷关武官'],
['这是一名手持长刀的敌将。','长刀敌将'],
['这是一名手持精钢拳套的敌将。','黑虎敌将'],
['这是一名手持长鞭的敌将。','长鞭敌将'],
['这是一名手持巨锤的敌将。','巨锤敌将'],
['这是一名手持狼牙棒的敌将。','狼牙敌将'],
['这是一名手持紫金杖的敌将。','金刚敌将'],
['这是一只穿山甲。','穿山甲'],
['一个表情凶狠的黑衣老者，你最好还是不要招惹他。','黑衣老者'],
['曾经的武林禅宗第一高手，武功修为极高，内力深厚，一身真气护体的功夫，寻常人难以企及。','六道禅师'],
['这是无影楼长老雪若云，此刻正在榻上打坐静养。','雪若云'],
['这是一只红色皮毛的狐狸。','火狐'],
['这是一只黄鹂鸟儿，吱吱呀呀地唱着。','黄鹂'],
['一个来自波斯国的女子，看似穿着华裙，内中却是劲衣。头上扎着一个侧髻，斜插着一支金玉双凤钗。','夜攸裳'],
['这是守卫出云庄大门的守卫，气度不凡。','云卫'],
['这是统管出云庄护卫的将领，龙行虎步，神威凛凛。','云将'],
['这是出云庄的女眷，虽为女流，却精通武艺。','女眷'],
['这是一个顶尖的制造甲胄的大师。','制甲师'],
['这是一个试炼各式兵器和器械的武士。','试剑士'],
['这是一个顶尖的铸炼天匠，据传曾是莫邪的弟子。','莫邪传人'],
['一名忠心耿耿的老仆人，一言不发地守在公子身后。','老仆'],
['这是一个能征战四方的将军，出云庄的得力大将。','狄啸'],
['这是一个游历四方的道姑，姿态飘逸，身负古琴，能成为出云庄的客人，怕也是来头不小。','青云仙子'],
['是出云庄的主人，也是出云部军队的大统帅。身穿狮头麒麟铠，腰佩神剑。','秦东海'],
['这是出云庄四大长老之一的执剑长老，负责传授庄中武士的武艺，其一身武功之高自是不在话下。','执剑长老'],
['这是出云庄四大长老之一的执法长老，负责庄中的法规制度的执行，严肃公正，一丝不苟。','执法长老'],
['这是出云庄四大长老之一的执典长老，负责维护管理庄中重要的典籍和秘书。','执典长老'],
['这是一只灰耳白尾的野兔','野兔'],
['一名白发苍苍的老人，手持一柄烟杆儿。','老烟杆儿'],
['一个负责运送日常杂货的脚夫。','杂货脚夫'],
['一个身着短衫，利落干净的剑客。','短衫剑客'],
['一个聪明伶俐，娇小可爱的小丫头。','巧儿'],
['一个黑衫华发的老人，腰佩长剑。','骑牛老汉'],
['一头通体泛青，健硕无比的公牛。','青牛'],
['一名年不及二八的小书童，身上背着书篓。','书童'],
['一只通体雪白，尾稍赤红如火的狐狸。','赤尾雪狐'],
['一条乌黑油亮的小泥鳅，在溪水中畅快地游着。','泥鳅'],
['一个满面煞气，身着灰色僧袍，手持大环刀的中年恶僧。','灰衣血僧'],
['一只羽毛如雪的白鹭，双翅一展有丈许，直欲振翅上九天而去。','白鹭'],
['一名身着青衫，头戴碧玉簪的年青女子。手里拿着一支绿色玉箫。','青衫女子'],
['百年难得一出的天纵英才，诗文当世无二，其诗雄姿英发。而人如其诗，个性张扬，如鹤舞长空，俊朗飘逸。','樊川居士'],
['这是一个无影楼守门的侍卫，全身黑衣，面带黑纱。','无影暗侍'],
['一个身着朴素白裙，满头青丝垂下的少女，手指轻动，天籁般的琴音便流淌而出。琴声之间还包含了极深的内力修为。','琴仙子'],
['这是一个江湖事无所不晓的老头，总是一副若有所思的样子。','百晓居士'],
['这是无影楼的小侍童。','清风童子'],
['这是天刀宗师的仆人，忠心耿耿。','刀仆'],
['一个白发老人，身形挺拔，传说这是二十年前突然消失于武林的天下第一刀客。','天刀宗师'],
['这是无影阁四大长老之一的虬髯公，满面赤色的虬髯，腰间一把帝王之剑。','虬髯长老'],
['这是一个远道而来的商人，满面风尘。','行脚贩子'],
['附近农家的新婚妇人，一边带着孩子，一边浣洗着衣服。','农家少妇'],
['年长的妇女，总忍不住要善意地指导一下年轻女孩们的家务。','六婆婆'],
['在井边打水的健壮少年，浑身都是紧实的肌肉，总是在有意无意之间展示着自己的力量。','青壮小伙'],
['马车店老板，年近不惑。','店老板'],
['出云庄的年轻弟子，第一次来到市集，看什么都是新鲜。','白衣弟子'],
['穿着马靴的黑衣少年，似是在维持市场的秩序。','黑衣骑士'],
['一个深藏不露的铁匠，据说能打出最上乘的武器。','青衫铁匠'],
['一个风霜满面却面带微笑的中年男子。','牧民'],
['野外的空阔辽远，青鬃马扬起鬃毛，收腰扎背，四蹄翻飞，跨阡度陌，跃丘越壑，尽情地奔驰在自由的风里。','青鬃野马'],
['出生不足一年的小马驹，虽不知其名，但显是有着极纯正优秀的血统，世人皆说风花牧场尽收天下名驹，此言非虚。','小马驹'],
['额上有白点，通体黝黑的神骏幼驹。','的卢幼驹'],
['通体黑缎子一样，油光放亮，唯有四个马蹄子部位白得赛雪。乌骓背长腰短而平直，四肢关节筋腱发育壮实，这样的马有个讲头，名唤“踢雪乌骓”。','乌骓马'],
['一名身着绛色短衫的剑客，太阳穴微微鼓起，显是有着极强内力修为。','绛衣剑客'],
['手持折扇，白衣飘飘的俊美公子，似是女扮男装。','白衣公子'],
['一名忠心耿耿的老仆人，一言不发地守在公子身后。','老仆'],
['一个身高七尺的伟岸男子，腰里挂着弯刀，明明是满脸虬髯，脸上却总是带着温和的微笑。','秦惊烈'],
['一个年近弱冠的小孩子，身着皮袄，手拿小鞭，自幼在牧场长大，以马驹为名，也极善与马儿相处，据说他能听懂马儿说话。','千小驹'],
['一只刚出生不久的小马驹，虽步行踉跄，却也已能看出纯种烈血宝马的一二分风采。','小马驹儿'],
['牧民们的牧羊犬，威风凛凛，忠心耿耿。','牧羊犬'],
['中原诸侯梦寐以求的军中良马，可日行六百，四蹄翻飞，逐风不休。','追风马'],
['一个来求购良马的使者，不知道哪个诸侯派出，身份隐秘。','诸侯秘使'],
['人中吕布，马中赤兔，如龙如神，日行千里，红影震慑千军阵！','赤菟马'],
['风花牧场上最好的牧人之一，左耳吊坠是一只狼王之齿，腰间的马刀也是功勋赫赫！','风如斩'],
['据说是魏武帝最爱的名驹，体型高大，气势磅礴，万马之中也可一眼看出。','爪黄飞电'],
['一条牧场上的黑狗，汪汪地冲你叫着。','黑狗'],
['此马天下无双，通体上下，一色雪白，没有半根杂色，浑身雪白，传说能日行千里，产于西域，是极品中的极品。','照夜玉狮子'],
['风花牧场的总管，上上下下的诸多事情都归他打理，内务外交都会经他之手。他却一副好整以暇的样子，似是经纬尽在掌握。','鲁总管'],
['风花牧场的侍女，虽名义上都是仆从，但却神色轻松，喜笑颜开，和主人管事们都亲热非常。','风花侍女'],
['一只白色的兔子，耳朵却是灰色。','灰耳兔'],
['一只通体雪白的小狐狸，在树洞里伸出头来看着你。','白狐'],
['一只满身梅花的小鹿，抬起头看着你。','小鹿'],
['天玑楼里的小童子，身穿青衫，头系蓝色发带。','天玑童子'],
['这是一个等候主人的马夫，耐心地打扫着马车。','海云马夫'],
['一只浑身脏兮兮的野狗','野狗'],
['这是海云镇的镇长，平日里也没啥事情可管，便拿着个烟袋闲逛。','老镇长'],
['一个显然有着不低功夫底子的老头子，手拿一个烟袋。','烟袋老头'],
['一个青年女剑客，年方二八，身姿矫健。','青年女子'],
['这是一个青年武士，背后背着一把亮银长枪。','背枪客'],
['这是海云镇的一个小孩子，年方五六岁，天真烂漫。','小孩'],
['正在吃草的兔子。','野兔'],
['这是一个游客，背着手享受着山海美景。','海云游客'],
['这是一个青年剑客，眼含剑气。','青年剑客'],
['这是海云阁四大杀手之一的九纹龙，凶狠非常。','九纹龙'],
['一只昂首直立，吐着长舌芯的大蟒蛇。','蟒蛇'],
['这是海云阁的暗哨，身穿平常的布衣，却掩饰不了眼神里的狡黠和敏锐。','暗哨'],
['据说这曾是武林魔道名门掌门，其武学造诣也是登峰造极。','石邪王'],
['这事海云阁四大杀手之一的穿山豹，行动敏捷，狡黠异常。','穿山豹'],
['这是一名海云阁高级杀手。','地杀'],
['这是一名海云阁高级杀手。','天杀'],
['这是海云阁四大杀手之首的海东狮，近十年来从未失手，手底已有数十个江湖名门掌门的性命。','海东狮'],
['这是海云阁内的长老级杀手。','海云长老'],
['这是一个身着轻纱的舞女，穿着轻薄，舞姿极尽媚态，眉目轻笑之间却隐含着淡淡的杀气。','红纱舞女'],
['这是一个身着轻纱的舞女，穿着轻薄，舞姿极尽媚态，眉目轻笑之间却隐含着淡淡的杀气。','青纱舞女'],
['这是一个身着轻纱的舞女，穿着轻薄，舞姿极尽媚态，眉目轻笑之间却隐含着淡淡的杀气。','紫纱舞女'],
['这是一个身着轻纱的舞女，穿着轻薄，舞姿极尽媚态，眉目轻笑之间却隐含着淡淡的杀气。','白纱舞女'],
['这是一个隐士，武学修为极高，也似乎并不受海云阁辖制。','六如公子'],
['传闻他出自天下第一名门浣花剑派，却无人知晓他的名讳。','萧秋水'],
['这事海云阁四大杀手之一的啸林虎，武功极高。','啸林虎'],
['江湖南四奇之首，人称仁义陆大刀。','陆大刀'],
['江湖南四奇之一，外号叫作“冷月剑”','水剑侠'],
['江湖南四奇之一，外号叫作“柔云剑”。','乘风客'],
['「血刀圣教」掌门人，自称「武林第一邪派高手」，门下都作和尚打扮，但个个都是十恶不赦的淫僧。','血刀妖僧'],
['江湖南四奇之一，外号叫作“中平枪”','花铁枪'],
['其貌不扬，但却有情有义，敢爱敢恨，性格鲜明。','狄小侠'],
['白衫飘飘，样貌清秀俏丽，人品俊雅，嫉恶如仇。','水姑娘'],
['这人满脸虬髯，头发长长的直垂至颈，衣衫破烂不堪，简直如同荒山中的野人','虬髯犯人'],
['一条低头啃着骨头的野狗。','野狗'],
['当地特有的毒蛇，嘶嘶地发出警告，你最好不要靠近。','毒蛇'],
['一个砍柴为生的樵夫。','樵夫'],
['虬髯怒目的大汉。','鲍龙'],
['年约四五十岁，长眉黑髯，样子十分刚正。','过之梗'],
['武功不弱，而且为人正义，素得侠名。','翁四'],
['行事于正邪之间，性格刚烈，脾气古怪，不过从不作伤天害理之事，只是明目张胆的抢劫烧杀，这人可干得多了；据说他武功很高，内功外功兼备，铁斧也使得出神入化。','屈奔雷'],
['一身彩衣，垂发如瀑，腰上挽了一个小花结，结上两柄玲珑的小剑，更显得人娇如花，容光照人。','伍湘云'],
['身段颀长而略瘦，但眉宇之间，十分精明锐利，犹如琼瑶玉树，丰神英朗','殷乘风'],
['自幼残肢断臂，受人歧视，故苦练奇技，仇杀江湖，无人不畏之如神鬼也。','辛仇'],
['一个风程仆仆的侠客。','辛杀'],
['家财万贯，是丝绸商人，但仁侠异常，喜助人，义疏财，武功很高。','蔡玉丹'],
['这女魔头似具有动物的本能护体色，如贴在树上动也不动，便像一张叶子一般，如坐在地上动也不动，便像一颗岩石一般；在黑夜里便像是夜色的一部分，在雪地上就变成了雪花，谁也认不出来。','辛十三娘'],
['这是跟随辛十三娘的杀手。','暗杀'],
['他是大理国三公之一。一个又瘦又黑的汉子，但他的擅长轻功。','巴司空'],
['脚力无双，所以轻功也奇佳，追踪术一流，嗜酒如命。','追命'],
['江湖中一大魔头，年轻貌美，因她擅‘吸血功’，以别人之鲜血，保持她的青春与容貌。','艳无忧'],
['这是跟随艳无忧的杀手，武功颇为高深。','摄魂鬼杀'],
['五湖九州、黑白两道、十二大派都尊称为“捕神”的六扇门第一把好手。','柳激烟'],
['一名鹑衣百结、满脸黑须的老人，眼睛瞪得像铜钱一般大，粗眉大目，虽然比较矮，但十分粗壮，就像铁罩一般，一双粗手，也比常人粗大一二倍。这人身上并无兵器，但一身硬功，“铁布衫”横练，再加上“十三太保”与“童于功”，据说已有十一成的火候，不但刀剑不入，就算一座山塌下来，也未必把他压得住！','龟敬渊'],
['银眉白须，容貌十分清灌，身形颀长，常露慈蔼之色，背插长剑','凌玉象'],
['一个白发斑斑，但脸色泛红的老者，腰问一柄薄而利的缅刀，终日不离身，左右太阳穴高高鼓起，显然内功已入化境。','慕容水云'],
['一个装扮似道非道的老者，黑发长髯，态度冷傲，手中一把拂尘。','沈错骨'],
['富甲一方，武功盖世的“三十六手蜈蚣鞭”。','金盛煌'],
['善剑法，性坚忍，他的剑法是没有名堂的，他刺出一剑是一剑，快、准而狠，但都是没招式名称的。','冷血'],
['高头大马，高山青拿着的是一条玉一般的桃木棍，棒身细滑，杖尖若刀，长七尺六寸。','高山青'],
['腰间缠着椎链子，一副精明能干的样子。','庄之洞'],
['魔宗长老，紫色瞳孔彰显他天魔功法已经大成。','花札敖'],
['尊信门叛将带领的杀手，个个心狠手辣。','尊信门杀手'],
['魔宗长老，使一对八角大锤。','山赤岳'],
['魔宗后起高手，是魔宗的希望。','鹰飞'],
['蒙古两大高手之一，擅用连环索。','由蚩敌'],
['火须红发，蒙古两大高手之一。','强望生'],
['江湖黑道邪派高手之一，列名十大高手榜。','莫意闲'],
['黑道最富有诱惑力的女人，风情万种。','甄素善'],
['黑道高手，十恶庄庄主，一方霸主。','谈应手'],
['江湖中的后起之秀，新一代高手中最好的刀客，得左手刀封寒亲传。','戚长征'],
['这是黑道第一大帮-怒蛟帮的顶尖高手。','怒蛟高手'],
['阴差阳错成为高手的小书童。','韩柏'],
['黑道最负盛名的神医，义气干云。','烈震北'],
['尊信门门主，黑榜十大高手之一。','赤尊信'],
['山城门主，黑榜十大高手之一。','乾罗'],
['黑道高手排名第三，也有人说他实力与浪翻云相较也不差半分。','厉若海'],
['黑榜之首，江湖第一大帮的核心人物。','浪翻云'],
['「魔师」庞斑的关门弟子，有「小魔师」之称，文秀之极，肌肤比少女还滑嫩，但身形颇高，肩宽膊阔，秀气透出霸气，造成一种予人文武双全的感觉。','方夜羽'],
['黑榜天下第二的高手，天下第一刀客。','封寒'],
['据说来自西域，擅长波斯舞，每日来观舞之人络绎不绝，虽耗费颇高，但据说观舞可以领悟出武学攻击招式的奥秘。','盈散花'],
['清雅十分，舞姿倾城，据说观舞可领悟出防御之道。','薄昭如'],
['优雅十分，舞姿倾城，据说观舞可领悟出长生之道。','寒碧翠'],
['一条带有剧毒，尾环在御敌时发出嗡嗡响的响尾蛇。','响尾蛇西凉'],
['这是西凉城衙门的一名官差，呆呆的不言不动，只是浑身颤抖。','官差'],
['西凉城的官兵，透着几分疲惫。','官兵'],
['这是别的城市前来此处送信的驿卒，满面尘土。','驿卒'],
['一个苦力打扮的汉子在这里等人来雇用。','苦力'],
['你看到一个粗壮的大汉，身上穿著普通樵夫的衣服。','樵夫'],
['一只浑身脏兮兮的野狗，一双眼睛正恶狠狠地瞪著你。','疯狗'],
['一只浑身脏兮兮的野狗。','野狗'],
['西凉城的捕快，腰佩单刀。','捕快'],
['黝黑的四方脸上一派威严，一望便知是这些官差的头儿，衙门的捕头。','伍定远'],
['一个戴着斗笠，正在辛勤劳作的农民。','农民'],
['这是一个等候主人的马夫，耐心地打扫着马车。','马夫'],
['身着黑衣的镖师，一看就是经验丰富的老江湖。','黑衣镖师'],
['一名老者坐在镖局大厅，须长及胸，生得一张紫膛脸，正是燕陵镖局的总镖头齐润翔。','齐润翔'],
['燕陵镖局的年青镖师，正在发呆。','镖师'],
['铁剑山庄管家，约莫五十来岁。','管家'],
['一名红光满面的高大老者。','李铁杉'],
['一名白衣灰须的老僧，双眼炯炯有神。','止观大师'],
['止观大师的亲传弟子，灰色衣袍。','慧清'],
['身材矮小，一张脸丑陋无比，满是刀疤伤痕。','屠凌心'],
['一个风程仆仆的侠客。','昆仑杀手'],
['一个喝得醉醺醺的年轻人。。。。。','醉汉'],
['六十来岁年纪，双目神光湛然。','金凌霜'],
['一名高瘦的汉子，眼神阴毒。','钱凌异'],
['燕陵镖局的少镖头，平日里飞扬跋扈，现在却是一副落魄样子。','齐伯川'],
['他满头白发，竟无一根是黑的，身材甚是高大，只是弓腰曲背，衰老已极','糟老头子'],
['貌美如花的哈萨克女子，苏普的妻子。','阿曼'],
['年轻俊朗的小伙子，虎背熊腰，是大漠第一勇士苏鲁克的儿子。','苏普'],
['当地的刀功绝活大师，随便放在江湖中都是个了不起的刀霸。','太行刀手'],
['一个身穿羊皮袄的高大汉子，虬髯满腮，他腰间上左右各插著一柄精光闪亮的短剑。两柄短剑的剑把一柄金色，一柄银色。','陈达海'],
['铁延部中精通「可兰经」、最聪明最有学问的老人。','哈卜拉姆'],
['这鸟儿的歌声像是天上的银铃。它只在晚上唱歌，白天睡觉。有人说，这是天上的星星掉下来之後变的。又有些哈萨克人说，这是草原上一个最美丽、最会唱歌的少女死了之後变的。她的情郎不爱她了，她伤心死的。','天铃鸟'],
['哈萨克牧民，正在做着晚餐。','牧民'],
['虬髯大汉，身挎长刀，一脸凶神恶煞。','霍元龙'],
['一头大灰狼，闪着尖利的牙齿。','恶狼'],
['戈壁滩上的响尾蛇，你要小心了！','响尾蛇高昌'],
['行走于沙漠的商队骆驼。','骆驼高昌'],
['一具男尸，看身上的装束似是中原武士。','男尸'],
['身形瘦弱，形容枯槁，愁眉苦脸，身上穿的是汉人装束，衣帽都已破烂不堪。但他头发卷曲，却又不大像汉人。','老翁'],
['身着哈萨克长袍的汉族少女，眉清目秀，貌美如花。有人说，她唱出的歌声，便如同那天铃鸟一般动人。','李文秀'],
['哈萨克第一勇士，力大无穷。','苏鲁克'],
['哈萨克第二勇士，苏鲁克的好朋友。','车尔库'],
['白衣白袍的哈萨克高手，为李文秀所救。','瓦耳拉齐'],
['天下灾荒四起，流民失所，饥肠辘辘，只能上京城来乞食。','饥民'],
['京城的捕快，自是与外地的不同。','捕快'],
['京城武将，虎背熊腰，胆大心细。','武将'],
['这是一个侯府的小姐，身着华丽，谈吐优雅。','侯府小姐'],
['一个笑嘻嘻的小丫头，侯府的丫鬟，跟小姐显是关系亲密。','小丫鬟'],
['青衣秀士徒弟，艳婷之师妹，对师傅师姐有极强的依赖心，情牵阿傻，然而阿傻恢复记忆后忘记与娟儿的一切经历，离娟儿而去。','娟儿'],
['九华剑派的女弟子，身姿绰约，腰带长剑。','九华山女弟子'],
['东厂的鹰犬，怕是又在做什么坏事','东厂侍卫'],
['镇守京城的官兵，银盔银甲，威风凛凛。','城门官兵'],
['胆小的大将军，赳赳武夫，官拜大都督，统领数十万兵马，却是个怯懦政客。他表面是天下英雄的领袖和希望，然而却一再屈从于强权，虚伪而懦弱。他不是残害忠良之辈，但也不会为了公道正义损害自己的功名利禄；与奸臣斗，并非因为伸张正义，而是因为自己也不好过。弱小者的沉默也许还能借口能力有限自身难保，然而处在这样位高权重的位置，胆小却是他千秋万世的罪恶。','柳昂天'],
['柳府的私人卫队。','柳府铁卫'],
['大奸臣，年约五十，十八省总按察，官拜太子太师。阴谋诡诈，多疑善变，是景泰王朝的第一权臣，与东厂刘敬、征北大都督柳昂天鼎足而立。为一宗多年尘封的旧案屡出天山，威势所逼，终令朝廷要员弃官亡命，也让许多江湖人物走投无路。一个没有武功、没有文才的矮胖小人，凭着三寸不烂之舌和掌控他人的心理，便能够驱使天下英杰如驱使猪狗。所有祸端皆应他而起，纵你有神佛之能也要被他诬陷、算计。都说只因奸臣当道，所以才有天下英雄皆不得志。然，哪朝没有奸臣，何曾有过断绝？当皇帝被蒙蔽、直言之人死于横祸、天下黎民尽皆哀嚎的时候，为何朝堂之上鸦雀无声；而元凶授首、挫骨扬灰之际，却又为何如此人声鼎沸、争先恐后？其实，胆怯的我们都曾是小人的帮凶，在每个时代里，扮演着每一个肮脏的庞然大物的吹鼓手。江充，便是所有沉默的天下人心里开出的恶之花。','江充'],
['昆仑剑派高手之一，心狠手辣。','莫凌山'],
['昆仑剑派的弟子，白衣长剑。','昆仑弟子'],
['东厂大太监之一，功夫深不可测。','安道京'],
['东厂高手，面目冷漠。','东厂高手'],
['本是一方名捕，奈何受人冤枉入狱，为保家人性命不得已委身于锦衣卫旗下，满面惆怅。','郝震湘'],
['本是朝廷卫士，却已受东厂所辖。','锦衣卫'],
['武当弟子，现为侯府卫士统领，功力深厚。','韦子壮'],
['善穆侯府的卫士，双目炯炯有神，腰挂长刀。','王府卫士'],
['俊俏无比的当朝司郎中，风流倜傥，当朝大学士之子，也是少林天绝神僧关门弟子。','风流司郎中'],
['伍定远的义子，本为一流浪儿，伍定远收养了他，并取名伍崇卿。武英帝复辟后为“义勇人”成员。后性情大变，怨伍定远懦弱退缩。想用自己的方式保护伍定远。曾在“魁星站五关”后蒙面黑衣独自一人杀入太医院，击败了包括苏颖超、哲尔丹在内的众多高手。','伍崇卿'],
['武林四大宗师之一华山派掌门宁不凡嫡传弟子，宁不凡退隐后，接任华山掌门，为武林新一代的俊杰。才貌双全的苏颖超，和「紫云轩」少阁主琼芳一见钟情，可谓青梅竹马。在太医院中被黑衣人伍崇卿击败后，接着练剑遭遇瓶颈，背负上了沉重的心理包袱。','苏颖超'],
['一个酒楼的小伙计，十五六岁上下。','店伙计'],
['一个在六部任职的学士，虽着便服，但气度不凡。','学士'],
['一个斯文的书生，穿着有些寒酸。','书生'],
['赌坊打手，满脸横肉，手持大锤。','打手'],
['青龙赌坊的老板，五十岁上下，腰间系着一块绝世玉璧，眼睛里闪着狡黠的光芒。','藏六福'],
['绝美无比的性感尤物，她虽使毒厉害，但却是一个极重情义之人。她认死理，为江充办事，便是一心一意，纵然江充势败，也是全力为其寻找玉玺。后来遇见卢云，两人日久相处，产生爱意，更是愿意为了卢云牺牲自己的一切。后来在与卢云返回自己家乡的途中遭到“镇国铁卫”的追杀迫害，不得已成为“镇国铁卫”的一员，加入了“客栈”。','胡媚儿'],
['白虎赌坊的荷官，身姿曼妙，烟视媚行。','荷官'],
['一个卖杂货的贩子，你也许可以看看需要些什么。','杂货贩子'],
['进城找活路的苦力，衣着随便，满身灰尘。','苦力京城'],
['驿站的大掌柜，眼神深邃。','掌柜'],
['赌坊里出来的醉汉，嘴里嘟嘟囔囔些什么，也许是一些赌坊的秘密。','醉汉京城'],
['来京城游玩的外地人，对大城市的繁华目不暇接，满眼都是惊喜的神色。','游客京城'],
['出生扬州，其父乃景泰朝兵部尚书顾嗣源，未婚夫是景泰朝状元卢云，后因为卢云掉入水瀑音讯全无，一边抚养卢云留下的小婴儿杨神秀，一边为父亲被正统皇帝下狱的事而四处奔波，后因其父在狱中自杀，为继承父亲的志向开办书林斋，批判朝政，与正统皇帝针锋相对。后嫁给佛国的创始人杨肃观。正统十年，再遇卢云。是典型的学识渊博，见识不凡的奇女子，当之无愧的扬州第一美女。','顾倩兮'],
['千万个小人物中的一个，读过书算过账，没有经世致用之才，没有平定一方之力，匡扶天下他没有这个志气，建功立业怕也没有这个本事。老婆刚又生了个孩子，家里却又有债主上门，正急得如热锅上的蚂蚁。','王一通'],
['城里大户人家的贵妇，正要上山拜佛还愿。','贵妇'],
];
    var ManSecret = "";
var dictSecret = {
    '小洞天': 'jh 24;n;n;n;n;e;e;find_task_road secret',
    '沙丘小洞': 'jh 6;event_1_98623439;ne;n;ne;ne;ne;event_1_97428251;find_task_road secret',
    '戈壁': 'jh 21;find_task_road secret',
    '潭畔草地': 'jh 4;n;n;n;n;n;n;n;event_1_91604710;s;s;s;find_task_road secret',
    '青云坪': 'jh 13;e;s;s;w;w;find_task_road secret',
    '九老洞': 'jh 8;w;nw;n;n;n;n;e;e;n;n;e;n;n;n;n;w;n;n;n;n;n;n;n;n;n;nw;sw;w;nw;w',
    '石街': 'jh 2',
    '天梯': 'jh 24;n;n;n;find_task_road secret',
    '湖边': 'jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w;find_task_road secret',
    '山溪畔': 'jh 22;n;n;w;n;n;n;n;event_1_88705407;s;s;find_task_road secret',
    '碧水寒潭': 'jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;e;e;se;se;e;find_task_road secret',
    '卢崖瀑布': 'jh 22;n;n;n;n;e;n;find_task_road secret',
    '悬根松': 'jh 9;n;w;find_task_road secret',
    '玉壁瀑布': 'jh 16;s;s;s;s;e;n;e;find_task_road secret',
    '启母石': 'jh 22;n;n;w;w;find_task_road secret',
    '奇槐坡': 'jh 23;n;n;n;n;n;n;n;n;find_task_road secret',
    '草原': 'jh 26;w;find_task_road secret',
    '悬崖': 'jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;s;e;find_task_road secret',
    '云步桥': 'jh 24;n;n;n;n;n;n;n;n;n;find_task_road secret',
    '寒水潭': 'jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;e;se;find_task_road secret',
    '千尺幢': 'jh 4;n;n;n;n;find_task_road secret',
    '危崖前': 'jh 25;w;find_task_road secret',
    '山坳': 'jh 1;e;n;n;n;n;n;find_task_road secret',
    '猢狲愁': 'jh 4;n;n;n;n;n;n;n;event_1_91604710;nw;find_task_road secret',
    '桃花泉': 'jh 3;s;s;s;s;s;nw;n;n;e;find_task_road secret',
    '观景台': 'jh 24;n;n;n;n;n;n;n;n;n;n;n;n;e;e;n;find_task_road secret',
    '临渊石台': 'jh 4;n;n;n;n;n;n;n;n;n;e;n;find_task_road secret',
    '无极老姆洞': 'jh 22;n;n;w;n;n;n;n;find_task_road secret',
    '夕阳岭': 'jh 9;n;n;e;find_task_road secret',
    '玉女峰': 'jh 4;n;n;n;n;n;n;n;n;w;find_task_road secret',
    '无名山峡谷': 'jh 29;n;n;n;n',
    '长空栈道': 'jh 4;n;n;n;n;n;n;n;n;n;e;find_task_road secret'
};
   
    var pathSecret = [];
		this.dispatchMessage=function(b){
			var type = b.get("type"),subtype = b.get("subtype");
            if (b.get("type") == 'notice') {
                //你打坐完毕，收起全身的真气游走，站起身来
                if (b.get('msg').indexOf('你打坐完毕') >= 0) {
                    clickButton('exercise', 0);
                }
                //自动回到悬红
                if (b.get('msg').indexOf('【江湖悬红榜】任务已完成') >= 0) {
                   go('jh 1;w;event_1_40923067');
                }


                //你从寒玉床上爬起，结束了这次练功
                if (b.get('msg').indexOf('你从寒玉床上爬起') >= 0) {
					if (holdflg)
					{
						clickButton('home');
					}
					clickButton('look room');
                    clickButton('sleep_hanyuchuang', 0);
                }
                if (b.get('msg').indexOf('挑战排行榜高手胜利') >= 0) {
                    clickButton('fight_hero 1');
                }
                if (b.get('msg').indexOf('试剑胜利') >= 0) {
                    clickButton('swords fight_test go');
                }
                //今日挑战高手的次数已达上限，明日再来
                if (b.get('msg').indexOf('今日挑战高手的次数已达上限') >= 0) {
                    ButtonManager.resetButtonById("paihang");
                    clickButton('home');
                }
                if (b.get('msg').indexOf('你今天试剑次数已达限额') >= 0) {
                    ButtonManager.resetButtonById("shijian");
                }
				if (b.get('msg').indexOf('南斗鬼煞阵升级完毕') >= 0) {
                    clickButton('hhjz xiulian go', 1);
                }
            }


            if (b.get('type') == 'main_msg' && b.get('ctype') == 'text') {
                //你打坐完毕，收起全身的真气游走，站起身来
                if (b.get('msg').indexOf('你打坐完毕') >= 0) {
                    clickButton('exercise', 0);
                }
                //自动回到悬红
                if (b.get('type').indexOf('【江湖悬红榜】任务已完成') >= 0) {
                   go('jh 1;w;event_1_40923067');
                }
                //你从寒玉床上爬起，结束了这次练功
                if (b.get('msg').indexOf('你从寒玉床上爬起') >= 0) {
                    if (holdflg)
					{
						clickButton('home');
					}
                    clickButton('sleep_hanyuchuang', 0);
                }
				if (b.get('msg').indexOf('再继续下去全身经脉恐怕要被被极寒冻断') >= 0) {
                    clickButton('home');
                }
				if (b.get('msg').indexOf('片玄铁碎片') >= 0 && b.get('msg').indexOf('的尸体里搜出') >= 0) {
					clearInterval(getYXIntervalFunc);
                    clickButton('home');
                }
				if (b.get('msg').indexOf('这是你今天完成的第') >= 0 && (b.get('msg').indexOf('游侠') >= 0 || b.get('msg').indexOf('场跨服青龙') >= 0 || b.get('msg').indexOf('逃犯') >= 0)) {
                    clickButton('home');
					setTimeout(gohome,1000);
                }
				if (b.get('msg').indexOf('好在有保险卡，没有降低技能等级！') >= 0) {
                    clickButton('score');
					clickButton('prev');
                }
                if (BB3flg == 1) {
					let BB3msg = g_simul_efun.replaceControlCharBlank(b.get('msg')).match('(.*?)对著(.*?)喝道(.*?)');
					if (BB3msg != null)
					{
						sessionStorage.setItem("Enemy",BB3msg[2]);
					}
                }
            }
            //自动飞奇侠秘境
            if (type == "notice" ){
                var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
				var str = '道：你现在去';
				var index1 = b.get('msg').indexOf(str);
				if (index1 > 0) {
					var index2 = b.get('msg').indexOf('，');
					var length = index2 - index1 - str.length;
					var pos = b.get('msg').substr(index1 + str.length, length);
					pathSecret = dictSecret[g_simul_efun.replaceControlCharBlank(pos)];
					console.log(pos+pathSecret);
					go(pathSecret);
				}
            }

            triggers.newTrigger(/领取【江湖悬红榜】任务奖励获得(.*)朱果，这是今天第(.*)\/15次任务，已连续完成(.*)次。/, function(m) {
		if (m[2] != 15 ) {
			console.log('已完成' + m[2] + '个悬红任务，继续领取');
             if(xuanhong_flag ==1){
			go('event_1_40923067');}
             triggers.disableByCls("xuanhong");

		} else {
			console.log('今日悬红任务已经完成或到达最大难度');
              triggers.disableByCls("xuanhong");
			go_home()
		}
	}, "xuanhong", "");
	triggers.newTrigger(/(哎，我都累死了，等下再来好吗？|系统更新中，请稍候再试。)/, function(m) {
		go('event_1_40923067')
	}, "xuanhong", "");
	triggers.newTrigger(/^你今天江湖悬红榜任务数量已经达到上限，请明天再来吧。/, function(m) {
		console.log('今日悬红任务已上限，如需继续请使用悬红令');
		go_home()
	}, "xuanhong", "");

            //自动飞悬红
            if (b.get('type') == 'main_msg' && b.get('ctype') == 'text'){
                var msg = g_simul_efun.replaceControlCharBlank(b.get("msg")).match('【江湖悬红榜】下一个江洋大盗的线索请找到位于『(.*?)』的『(.*?)』打听(.*?)');

				if (msg != null)
				{
					ManSecret = "";
					for(var i = 0 ; i < DiscriptSecret.length ; i++){
						var index = DiscriptSecret[i][0].match(msg[2]);
						if (index != null)
						{
							ManSecret = DiscriptSecret[i][1];

							break;
						}
					}
					if (ManSecret == "")
					{
						alert("未找到对应人物，请补充数据库。");
					} else {
						sessionStorage.setItem("ll_targetName",ManSecret);
						sessionStorage.setItem("ll_targetAddress",msg[1]);
						MyNavigatorFunc();


					}
				}

            }
		}
    }

    var autoEvent=new autoEvent();
        //抢红包
	function GetHongbao(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), msg = b.get("msg"),subtype = b.get("subtype");
			//console.log("type:"+type+";msg:"+msg+";subtype:"+b.get("subtype"));
			if (type == "channel" && subtype=="hongbao" && /hongbao qiang \d gn(\d){16}/.test(msg)) {
				if(hongbaoGetFull && /hongbao qiang 2 gn(\d){16}/.test(msg)){
					return;
				}
				var regexObj=new RegExp(/hongbao qiang \d gn(\d){16}/,"g");
				var a=regexObj.exec(msg);
				HongBaoList.unshift(a[0]);
				if(!qianghongbaoTimer){
					RunHongBao();
				}
			}

			else if(hongbaoGetFull==false && type=="notice" && subtype=="notify_fail" && msg && msg.indexOf("新春红包的次数已达到上限了，明天再抢吧")>-1){
				HongBaoList=[];
				hongbaoGetFull=true;
				setTimeout(function(){hongbaoGetFull=false;},3600000);
			}
		}
	}
	function RunHongBao(){
		if(HongBaoList.length>0){
			var up=HongBaoList.length;
			var index=Math.floor((Math.random()*up));
			var item=HongBaoList[index];
			HongBaoList.splice(index,1);
			go(item);
			qianghongbaoTimer=setTimeout(function(){RunHongBao();},5000);
		}else{
			qianghongbaoTimer=null;
		}
	}
	var qianghongbaoTimer=null;
	var HongBaoList=[];
	var getHongBao=new GetHongbao();
	var hongbaoGetFull=false;

	(function (window) {
		window.go = function(dir) {
			//console.debug("开始执行：", dir);
			var d = dir.split(";");
			for (var i = 0; i < d.length; i++)
				overrideclick(d[i], 0);
		};
		window.singleBattleTrigger=0;
		window.singleBattleInstance=null;
		window.singleBattle=function(callback){
			this.timer=null;
			this.dispatchMessage=function(b){
				var type = b.get("type"), subType = b.get("subtype");
				if (type=="vs"&&subType=="vs_info"){ //这是进入战斗的提示
					neigongPlayCount=0;
					clearInterval(this.timer);
					setTimeout(ninesword6,500);
					this.timer=setInterval(ninesword6,1000);
				}else if (type=="vs"&&subType=="combat_result"){
					window.singleBattleTrigger=0;
					clearInterval(this.timer);
					if(callback){
						callback();
					}
				}
			}
		};
        window.hasGoToEnd=function(){
            return cmdlist.length<=0;
        }

		var ql_w = {
			'书房': 1,
			'打铁铺子': 2,
			'桑邻药铺': 3,
			'南市': 4,
			'桃花别院': 5,
			'绣楼': 6,
			'北大街': 7,
			'钱庄': 8,
			'杂货铺': 9,
			'祠堂大门': 10,
			'厅堂': 11
		};
		window.go_ql = function(w) {
			zx(ql_w[w]);
		}

	//autoGodview();
		function go_yx(w){
			if (w.startsWith("雪亭镇")) {
				go("jh 1;e;n");
			} else if (w.startsWith("洛阳")) {
				go("jh 2;n;n");
			} else if (w.startsWith("华山村")) {
				go("jh 3;s;s");
			} else if (w.startsWith("华山")) {
				go("jh 4;n;n");
			} else if (w.startsWith("扬州")) {
				go("jh 5;n;n");
			} else if (w.startsWith("丐帮")) {
				go("jh 6;event_1_98623439;s");
			} else if (w.startsWith("乔阴县")) {
				go("jh 7;s;s;s");
			} else if (w.startsWith("峨眉山")) {
				go("jh 8;w;nw;n;n;n;n");
			} else if (w.startsWith("恒山")) {
				go("jh 9;n;n;n");
			} else if (w.startsWith("武当山")) {
				go("jh 10;w;n;n");
			} else if (w.startsWith("晚月庄")) {
				go("jh 11;e;e;s;sw;se;w");
			} else if (w.startsWith("水烟阁")) {
				go("jh 12;n;n;n");
			} else if (w.startsWith("少林寺")) {
				go("jh 13;n;n");
			} else if (w.startsWith("唐门")) {
				go("jh 14;w;n;n;n");
			} else if (w.startsWith("青城山")) {
				go("jh 15;s;s");
			} else if (w.startsWith("逍遥林")) {
				go("jh 16;s;s");
			} else if (w.startsWith("开封")) {
				go("jh 17;n;n");
			} else if (w.startsWith("明教")) {
				go("jh 18;n;nw;n;n");
			} else if (w.startsWith("全真教")) {
				go("jh 19;s;s");
			} else if (w.startsWith("古墓")) {
				go("jh 20;w;w");
			} else if (w.startsWith("白驮山")) {
				go("jh 21;nw;w");
			} else if (w.startsWith("嵩山")) {
				go("jh 22;n;n");
			} else if (w.startsWith("寒梅庄")) {
				go("jh 23");
			} else if (w.startsWith("泰山")) {
				go("jh 24");
			} else if (w.startsWith("大旗门")) {
				go("jh 25");
			} else if (w.startsWith("大昭寺")) {
				go("jh 26");
			} else if (w.startsWith("魔教")) {
				go("jh 27");
			}

			random_move();
		}

		function random_move() {
			var v = Math.random();
			if (v < 0.25) go("e")
			else if (v < 0.5) go("w")
			else if (v < 0.75) go("s")
			else go("n");
		}

		function zx(x) {
			x = parseInt(x);
			console.debug(x);

			if (x == 1) {
				go("jh 1;e;n;e;e;e;e;n");
			} else if (x == 2) {
				go("jh 1;e;n;n;w");
			} else if (x == 3) {
				go("jh 1;e;n;n;n;w");
			}

			if (x == 4) {
				go("jh 2;n;n;e")
			}

			if (x == 5) {
				go("jh 2;n;n;n;n;w;s");
			}
			if (x == 6) {
				go("jh 2;n;n;n;n;w;s;w");
			}
			if (x == 7) {
				go("jh 2;n;n;n;n;n;n;n");
			}
			if (x == 8) {
				go("jh 2;n;n;n;n;n;n;;n;e");
			}

			if (x == 9) {
				go("jh 3;s;s;e");
			}
			if (x == 10) {
				go("jh 3;s;s;w");
			}
			if (x == 11) {
				go("jh 3;s;s;w;n");
			}

		}


	function MyMap(){
		this.elements = [];
		this.size = function() {
			return this.elements.length

		};
		this.isEmpty = function() {
			return 1 > this.elements.length
		};
		this.clear = function() {
			this.elements = []
		};
		this.put = function(a, b) {
			for (var c = !1, d = 0; d < this.elements.length; d++)
				if (this.elements[d].key == a) {
					c = !0;
					this.elements[d].value = b;
					break
				}
			!1 == c && this.elements.push({
				key: a,
				value: b
			})
		};
		this.remove = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].key == a)
						return this.elements.splice(c, 1), !0
			} catch (d) {
				b =
				!1
			}
			return b
		};
		this.get = function(a) {
			try {
				for (var b = 0; b < this.elements.length; b++)
					if (this.elements[b].key == a)
						return this.elements[b].value
			} catch (c) {
				return null
			}
		};
		this.copy = function(a) {
			null == a && (a = new Map);
			try {
				for (var b = 0; b < this.elements.length; b++)
					a.put(this.elements[b].key, this.elements[b].value);
				return a
			} catch (c) {
				return null
			}
		};
		this.element = function(a) {
			return 0 > a || a >= this.elements.length ? null : this.elements[a]
		};
		this.containsKey = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].key ==
					a) {
						b = !0;
						break
					}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.containsValue = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].value == a) {
						b = !0;
						break
					}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.values = function() {
			for (var a = [], b = 0; b < this.elements.length; b++)
				a.push(this.elements[b].value);
			return a
		};
		this.keys = function() {
			for (var a = [], b = 0; b < this.elements.length; b++)
				a.push(this.elements[b].key);
			return a
		}
	}

	function Question() {
			this.answers = new MyMap;
			this.answers.put("锦缎腰带是腰带类的第几级装备", "a");
			this.answers.put("扬州询问黑狗子能到下面哪个地点", "a");
			this.answers.put("跨服天剑谷每周六几点开启", "a");
			this.answers.put("青城派的道德经可以提升哪个属性", "c");
			this.answers.put("论剑中以下哪个不是晚月庄的技能", "d");
			this.answers.put("跨服天剑谷是星期几举行的", "b");
			this.answers.put("玉女剑法是哪个门派的技能", "b");
			this.answers.put("玉草帽可以在哪位npc那里获得？", "b");
			this.answers.put("逍遥林是第几章的地图", "c");
			this.answers.put("精铁棒可以在哪位npc那里获得", "d");
			this.answers.put("鎏金缦罗是披风类的第几级装备", "d");
			this.answers.put("神雕大侠在哪一章", "a");
			this.answers.put("华山武器库从哪个NPC进", "d");
			this.answers.put("首冲重置卡需要隔多少天才能在每日充值奖励中领取", "b");
			this.answers.put("以下哪个不是空空儿教导的武学", "b");
			this.answers.put('“迎梅客栈”场景是在哪个地图上', "d");
			this.answers.put('独孤求败有过几把剑', "d");
			this.answers.put('晚月庄的小贩在下面哪个地点', "a");
			this.answers.put('扬州询问黑狗能到下面哪个地点', "a");
			this.answers.put('“清音居”场景是在哪个地图上', "a");
			this.answers.put('一天能完成师门任务有多少个', "c");
			this.answers.put('林祖师是哪个门派的师傅', "a");
			this.answers.put('九区服务器名称', "d");
			this.answers.put('去唐门地下通道要找谁拿钥匙', "a");
			this.answers.put('能增容貌的是下面哪个技能', "a");
			this.answers.put('铁手镯  可以在哪位npc那里获得', "a");
			this.answers.put('街头卖艺是挂机里的第几个任务', "a");
			this.answers.put('“三清宫”场景是在哪个地图上', "c");
			this.answers.put('论剑中以下哪个是大理段家的技能', "a");
			this.answers.put('藏宝图在哪里npc那里买', "a");
			this.answers.put('六脉神剑是哪个门派的绝学', "a");
			this.answers.put('如何将华山剑法从400级提升到440级', "d");
			this.answers.put('王重阳是哪个门派的师傅', "b");
			this.answers.put('在庙祝处洗杀气每次可以消除多少点', "a");
			this.answers.put('以下哪个宝石不能镶嵌到衣服', "a");
			this.answers.put('达摩杖的伤害是多少', "d");
			this.answers.put('嫁衣神功是哪个门派的技能', "b");
			this.answers.put('可以召唤金甲伏兵助战是哪个门派', "a");
			this.answers.put('端茶递水是挂机里的第几个任务', "b");
			this.answers.put('下列哪项战斗不能多个玩家一起战斗', "a");
			this.answers.put('寒玉床在哪里切割', "a");
			this.answers.put('拜师风老前辈需要正气多少', "b");
			this.answers.put('每天微信分享能获得多少元宝', "d");

			this.answers.put('丐帮的绝学是什么', "a");
			this.answers.put('以下哪个门派不是隐藏门派', "c");
			this.answers.put('玩家想修改名字可以寻找哪个NPC', "a");
			this.answers.put('论剑中以下哪个不是古墓派的的技能', "b");
			this.answers.put('安惜迩是在那个场景', "c");
			this.answers.put('神雕侠侣的时代背景是哪个朝代', "d");
			this.answers.put('论剑中以下哪个是华山派的技能的', "a");
			this.answers.put('夜皇在大旗门哪个场景', "c");
			this.answers.put('什么装备可以镶嵌紫水晶', "c");
			this.answers.put('乌檀木刀可以在哪位npc那里获得', "d");
			this.answers.put('易容后保持时间是多久', "a");
			this.answers.put('以下哪个不是宋首侠教导的武学', "d");
			this.answers.put('踏云棍可以在哪位npc那里获得', "a");
			this.answers.put('玉女剑法是哪个门派的技能', "b");
			this.answers.put('根骨能提升哪个属性', "c");
			this.answers.put('论剑中以下哪个是铁血大旗门的技能', "b");
			this.answers.put('明教的九阳神功有哪个特殊效果', "a");
			this.answers.put('辟邪剑法在哪学习', "b");
			this.answers.put('论剑中古墓派的终极师傅是谁', "d");
			this.answers.put('论剑中青城派的终极师傅是谁', "d");
			this.answers.put('逍遥林怎么弹琴可以见到天山姥姥', "b");
			this.answers.put('论剑一次最多能突破几个技能', "c");
			this.answers.put('劈雳拳套有几个镶孔', "a");
			this.answers.put('仓库最多可以容纳多少种物品', "b");
			this.answers.put('以下不是天宿派师傅的是哪个', "c");
			this.answers.put('易容术在哪学习', "b");
			this.answers.put('瑷伦在晚月庄的哪个场景', "b");
			this.answers.put('羊毛斗篷是披风类的第几级装备', "a");
			this.answers.put('弯月刀可以在哪位npc那里获得', "b");
			this.answers.put('骆云舟在乔阴县的哪个场景', "b");
			this.answers.put('屠龙刀是什么级别的武器', "a");
			this.answers.put('天蚕围腰可以镶嵌几颗宝石', "d");
			this.answers.put('“蓉香榭”场景是在哪个地图上', "c");
			this.answers.put('施令威在哪个地图', "b");
			this.answers.put('扬州在下面哪个地点的npc处可以获得玉佩', "c");
			this.answers.put('拜师铁翼需要多少内力', "b");
			this.answers.put('九区服务器名称', "d");
			this.answers.put('"白玉牌楼"场景是在哪个地图上', "c");
			this.answers.put('宝玉鞋在哪获得', "a");
			this.answers.put('落英神剑掌是哪个门派的技能', "b");
			this.answers.put('下面哪个门派是正派', "a");
			this.answers.put('兑换易容面具需要多少玄铁碎片', "c");
			this.answers.put('以下哪些物品是成长计划第五天可以领取的', "b");
			this.answers.put('论剑中以下哪个是晚月庄的人物', "a");
			this.answers.put('论剑中以下哪个不是魔教的技能', "a");
			this.answers.put('匕首加什么属性', "c");
			this.answers.put('钢丝甲衣可以在哪位npc那里获得', "d");
			this.answers.put('论剑中花紫会的师傅是谁', "c");
			this.answers.put('暴雨梨花针的伤害是多少', "c");
			this.answers.put('吸血蝙蝠在下面哪个地图', "a");
			this.answers.put('论剑中以下是峨嵋派技能的是哪个', "a");
			this.answers.put('蓝止萍在晚月庄哪个小地图', "b");
			this.answers.put('下面哪个地点不是乔阴县的', "d");
			this.answers.put('领取消费积分需要寻找哪个NPC', "c");
			this.answers.put('下面哪个不是门派绝学', "d");
			this.answers.put('人物背包最多可以容纳多少种物品', "a");
			this.answers.put('什么装备不能镶嵌黄水晶', "d");
			this.answers.put('古灯大师在大理哪个场景', "c");
			this.answers.put('草帽可以在哪位npc那里获得', "b");
			this.answers.put('西毒蛇杖的伤害是多少', "c");
			this.answers.put('成长计划六天可以领取多少银两', "d");
			this.answers.put('朱老伯在华山村哪个小地图', "b");
			this.answers.put('论剑中以下哪个是唐门的技能', "b");
			this.answers.put('游龙散花是哪个门派的阵法', "d");
			this.answers.put('高级乾坤再造丹加什么', "b");
			this.answers.put('唐门的唐门毒经有哪个特殊效果', "a");
			this.answers.put('葛伦在大招寺的哪个场景', "b");
			this.answers.put('“三清殿”场景是在哪个地图上', "b");
			this.answers.put('哪样不能获得玄铁碎片', "c");
			this.answers.put('在哪里捏脸提升容貌', "d");
			this.answers.put('论剑中以下哪个是天邪派的技能', "b");
			this.answers.put('向师傅磕头可以获得什么', "b");
			this.answers.put('骆云舟在哪一章', "c");
			this.answers.put('论剑中以下哪个不是唐门的技能', "c");
			this.answers.put('华山村王老二掉落的物品是什么', "a");
			this.answers.put('下面有什么是寻宝不能获得的', "c");
			this.answers.put('寒玉床需要切割多少次', "d");
			this.answers.put('绿宝石加什么属性', "c");
			this.answers.put('魏无极处读书可以读到多少级', "a");
			this.answers.put('天山姥姥在逍遥林的哪个场景', "d");
			this.answers.put('天羽奇剑是哪个门派的技能', "a");
			this.answers.put('大招寺的铁布衫有哪个特殊效果', "c");
			this.answers.put('挖剑冢可得什么', "a");
			this.answers.put('灭绝师太在峨眉山哪个场景', "a");
			this.answers.put('论剑是星期几举行的', "c");
			this.answers.put('柳淳风在雪亭镇哪个场景', "b");
			this.answers.put('萧辟尘在哪一章', "d");
			this.answers.put('论剑中以下哪个是明教的技能', "b");
			this.answers.put('天邪派在哪里拜师', "b");
			this.answers.put('钨金腰带是腰带类的第几级装备', "d");
			this.answers.put('灭绝师太在第几章', "c");
			this.answers.put('一指弹在哪里领悟', "b");
			this.answers.put('翻译梵文一次多少银两', "d");
			this.answers.put('刀法基础在哪掉落', "a");
			this.answers.put('黯然消魂掌有多少招式', "c");
			this.answers.put('黑狗血在哪获得', "b");
			this.answers.put('雪蕊儿在铁雪山庄的哪个场景', "d");
			this.answers.put('东方教主在魔教的哪个场景', "b");
			this.answers.put('以下属于正派的门派是哪个', "a");
			this.answers.put('选择武学世家会影响哪个属性', "a");
			this.answers.put('寒玉床睡觉一次多久', "c");
			this.answers.put('魏无极在第几章', "a");
			this.answers.put('孙天灭是哪个门派的师傅', "c");
			this.answers.put('易容术在哪里学习', "a");
			this.answers.put('哪个NPC掉落拆招基础', "a");
			this.answers.put('七星剑法是哪个门派的绝学', "a");
			this.answers.put('以下哪些物品不是成长计划第二天可以领取的', "c");
			this.answers.put('以下哪个门派是中立门派', "a");
			this.answers.put('黄袍老道是哪个门派的师傅', "c");
			this.answers.put('舞中之武是哪个门派的阵法', "b");
			this.answers.put('隐者之术是那个门派的阵法', "a");
			this.answers.put('踏雪无痕是哪个门派的技能', "b");
			this.answers.put('以下哪个不是在雪亭镇场景', "d");
			this.answers.put('排行榜最多可以显示多少名玩家', "a");
			this.answers.put('貂皮斗篷是披风类的第几级装备', "b");
			this.answers.put('武当派的绝学技能是以下哪个', "d");
			this.answers.put('兰花拂穴手是哪个门派的技能', "a");
			this.answers.put('油流麻香手是哪个门派的技能', "a");
//	        this.answers.put('清风寨在哪', "b");
			this.answers.put('披星戴月是披风类的第几级装备', "d");
			this.answers.put('当日最低累积充值多少元即可获得返利', "b");
			this.answers.put('追风棍在哪里获得', "b");
			this.answers.put('长剑在哪里可以购买', "a");
			this.answers.put('莫不收在哪一章', "a");
			this.answers.put('读书写字最高可以到多少级', "b");
			this.answers.put('哪个门派拜师没有性别要求', "d");
			this.answers.put('墨磷腰带是腰带类的第几级装备', "d");
			this.answers.put('不属于白驼山的技能是什么', "b");
			this.answers.put('婆萝蜜多心经是哪个门派的技能', "b");
			this.answers.put('乾坤一阳指是哪个师傅教的', "a");
			this.answers.put('“日月洞”场景是在哪个地图上', "b");
			this.answers.put('倚天屠龙记的时代背景哪个朝代', "a");
			this.answers.put('八卦迷阵是哪个门派的阵法', "b");
			this.answers.put('七宝天岚舞是哪个门派的技能', "d");
			this.answers.put('断云斧是哪个门派的技能', "a");
			this.answers.put('跨服需要多少级才能进入', "c");
			this.answers.put('易容面具需要多少玄铁兑换', "c");
			this.answers.put('张教主在明教哪个场景', "d");
			this.answers.put('玉蜂浆在哪个地图获得', "a");
			this.answers.put('在逍遥派能学到的技能是哪个', "a");
			this.answers.put('每日微信分享可以获得什么奖励', "a");
			this.answers.put('红宝石加什么属性', "b");
			this.answers.put('金玉断云是哪个门派的阵法', "a");
			this.answers.put('正邪任务一天能做几次', "a");
			this.answers.put('白金戒指可以在哪位npc那里获得', "b");
			this.answers.put('金戒指可以在哪位npc那里获得', "d");
			this.answers.put('柳淳风在哪哪一章', "c");
			this.answers.put('论剑是什么时间点正式开始', "a");
			this.answers.put('黯然销魂掌是哪个门派的技能', "a");
			this.answers.put('在正邪任务中不能获得下面什么奖励', "d");
			this.answers.put('孤儿出身增加什么', "d");
			this.answers.put('丁老怪在星宿海的哪个场景', "b");
			this.answers.put('读书写字301-400级在哪里买书', "c");
			this.answers.put('闯楼第几层可以获得称号“藏剑楼长老”', "c");
			this.answers.put('以下属于邪派的门派是哪个', "b");
			this.answers.put('论剑中以下哪个不是丐帮的人物', "a");
			this.answers.put('论剑中青城派的第一个师傅是谁', "a");
			this.answers.put('以下哪个不是何不净教导的武学', "c");
			this.answers.put('吕进在哪个地图', "a");
			this.answers.put('拜师老毒物需要蛤蟆功多少级', "a");
			this.answers.put('蛇形刁手是哪个门派的技能', "b");
			this.answers.put('乌金玄火鞭的伤害是多少', "d");
			this.answers.put('张松溪在哪个地图', "c");
			this.answers.put('欧阳敏是哪个门派的', "b");
			this.answers.put('以下哪个门派是正派', "d");
			this.answers.put('成功易容成异性几次可以领取易容成就奖', "b");
			this.answers.put('论剑中以下不是峨嵋派技能的是哪个', "b");
			this.answers.put('城里抓贼是挂机里的第几个任务', "b");
			this.answers.put('每天的任务次数几点重置', "d");
			this.answers.put('莲花掌是哪个门派的技能', "a");
			this.answers.put('大招寺的金刚不坏功有哪个特殊效果', "a");
			this.answers.put('多少消费积分可以换取黄金钥匙', "b");
			this.answers.put('什么装备都能镶嵌的是什么宝石', "c");
			this.answers.put('什么影响打坐的速度', "c");
			this.answers.put('蓝止萍在哪一章', "c");
			this.answers.put('寒玉床睡觉修炼需要多少点内力值', "c");
			this.answers.put('武穆兵法通过什么学习', "a");
			this.answers.put('倒乱七星步法是哪个门派的技能', "d");
			this.answers.put('闯楼第几层可以获得称号“藏剑楼护法”', "b");
			this.answers.put('兽皮鞋可以在哪位npc那里获得', "b");
			this.answers.put('寒玉床在那个地图可以找到', "a");
			this.answers.put('易容术可以找哪位NPC学习', "b");
			this.answers.put('铁戒指可以在哪位npc那里获得', "a");
			this.answers.put('通灵需要寻找哪个NPC', "c");
			this.answers.put('功德箱在雪亭镇的哪个场景', "c");
			this.answers.put('蓝宝石加什么属性', "a");
			this.answers.put('每天分享游戏到哪里可以获得20元宝', "a");
			this.answers.put('选择书香门第会影响哪个属性', "b");
			this.answers.put('以下哪个不是微信分享好友、朋友圈、QQ空间的奖励', "a");
			this.answers.put('新手礼包在哪领取', "c");

			this.answers.put('春风快意刀是哪个门派的技能', "b");
			this.answers.put('朱姑娘是哪个门派的师傅', "a");
			this.answers.put('出生选武学世家增加什么', "a");
			this.answers.put('以下哪个宝石不能镶嵌到内甲', "a");
			this.answers.put('生死符的伤害是多少', "a");
			this.answers.put('扬文的属性', "a");
			this.answers.put('云问天在哪一章', "a");
			this.answers.put('首次通过桥阴县不可以获得那种奖励', "a");
			this.answers.put('剑冢在哪个地图', "a");
			this.answers.put('在哪里消杀气', "a");
			this.answers.put('闯楼每多少层有称号奖励', "a");
			this.answers.put('打坐增长什么属性', "a");
			this.answers.put('从哪个npc处进入跨服战场', "a");
			this.answers.put('下面哪个是天邪派的师傅', "a");
			this.answers.put('每天能做多少个谜题任务', "a");
			this.answers.put('小男孩在华山村哪里', "a");
			this.answers.put('追风棍可以在哪位npc那里获得', "a");
			this.answers.put('逍遥派的绝学技能是以下哪个', "a");
			this.answers.put('沧海护腰是腰带类的第几级装备', "a");
			this.answers.put('花花公子在哪个地图', "a");
			this.answers.put('每次合成宝石需要多少银两', "a");
			this.answers.put('以下哪个不是微信分享好友、朋友圈、QQ空间的奖励', "a");
			this.answers.put('打排行榜每天可以完成多少次', "a");
			this.answers.put('夜行披风是披风类的第几级装备', "a");
			this.answers.put('白蟒鞭的伤害是多少', "a");
			this.answers.put('易容术向谁学习', "a");
			this.answers.put('支线对话书生上魁星阁二楼杀死哪个NPC给10元宝', "a");
			this.answers.put('斗转星移是哪个门派的技能', "a");
			this.answers.put('杨过在哪个地图', "a");
			this.answers.put('钻石项链在哪获得', "a");
			this.answers.put('多少消费积分换取黄金宝箱', "a");
			this.answers.put('每突破一次技能有效系数加多少', "a");
			this.answers.put('茅山学习什么技能招宝宝', "a");
			this.answers.put('陆得财在乔阴县的哪个场景', "a");
			this.answers.put('独龙寨是第几个组队副本', "a");
			this.answers.put('以下哪个是花紫会的祖师', "a");
			this.answers.put('金弹子的伤害是多少', "a");
			this.answers.put('明月帽要多少刻刀摩刻', "a");
			this.answers.put('论剑输一场获得多少论剑积分', "a");
			this.answers.put('论剑中以下哪个是铁血大旗门的师傅', "a");
			this.answers.put('8级的装备摹刻需要几把刻刀', "a");
			this.answers.put('赠送李铁嘴银两能够增加什么', "a");
			this.answers.put('金刚不坏功有什么效果', "a");
			this.answers.put('少林的易筋经神功有哪个特殊效果', "a");
			this.answers.put('大旗门的修养术有哪个特殊效果', "a");
			this.answers.put('金刚杖的伤害是多少', "a");
			this.answers.put('双儿在扬州的哪个小地图', "a");
			this.answers.put('花不为在哪一章', "a");
			this.answers.put('铁项链可以在哪位npc那里获得', "a");
			this.answers.put('武学世家加的什么初始属性', "a");
			this.answers.put('师门磕头增加什么', "a");

			this.answers.put('全真的道家心法有哪个特殊效果', "a");
			this.answers.put('功德箱捐香火钱有什么用', "a");
			this.answers.put('雪莲有什么作用', "a");
			this.answers.put('论剑中以下哪个是花紫会的技能', "a");
			this.answers.put('柳文君所在的位置', "a");
			this.answers.put('岳掌门在哪一章', "a");
			this.answers.put('长虹剑在哪位npc那里获得？', "a");
			this.answers.put('副本一次最多可以进几人', "a");
			this.answers.put('师门任务每天可以完成多少次', "a");
			this.answers.put('逍遥步是哪个门派的技能', "a");
			this.answers.put('新人礼包在哪个npc处兑换', "a");
			this.answers.put('使用朱果经验潜能将分别增加多少', "a");
			this.answers.put('欧阳敏在哪一章', "a");
			this.answers.put('辟邪剑法是哪个门派的绝学技能', "a");
			this.answers.put('在哪个npc处可以更改名字', "a");
			this.answers.put('毒龙鞭的伤害是多少', "a");
			this.answers.put('晚月庄主线过关要求', "a");
			this.answers.put('怎么样获得免费元宝', "a");
			this.answers.put('成长计划需要多少元宝方可购买', "a");
			this.answers.put('青城派的道家心法有哪个特殊效果', "a");
			this.answers.put('藏宝图在哪个NPC处购买', "a");
			this.answers.put('丁老怪是哪个门派的终极师傅', "a");
			this.answers.put('斗转星移阵是哪个门派的阵法', "a");
			this.answers.put('挂机增长什么', "a");
			this.answers.put('鹰爪擒拿手是哪个门派的技能', "a");
			this.answers.put('八卦迷阵是那个门派的阵法', "a");
			this.answers.put('一天能完成挑战排行榜任务多少次', "a");
			this.answers.put('论剑每天能打几次', "a");
			this.answers.put('需要使用什么衣服才能睡寒玉床', "a");
			this.answers.put('张天师是哪个门派的师傅', "a");
			this.answers.put('技能柳家拳谁教的', "a");
			this.answers.put('九阴派梅师姐在星宿海哪个场景', "a");
			this.answers.put('哪个npc处可以捏脸', "a");
			this.answers.put('论剑中步玄派的师傅是哪个', "a");
			this.answers.put('宝玉鞋击杀哪个npc可以获得', "a");
			this.answers.put('慕容家主在慕容山庄的哪个场景', "a");
			this.answers.put('闻旗使在哪个地图', "a");
			this.answers.put('虎皮腰带是腰带类的第几级装备', "a");
			this.answers.put('在哪里可以找到“香茶”？', "a");
			this.answers.put('打造刻刀需要多少个玄铁', "a");
			this.answers.put('包家将是哪个门派的师傅', "a");
			this.answers.put('论剑中以下哪个是天邪派的人物', "a");
			this.answers.put('升级什么技能可以提升根骨', "a");
			this.answers.put('NPC公平子在哪一章地图', "a");
			this.answers.put('逄义是在那个场景', "a");
			this.answers.put('锻造一把刻刀需要多少银两', "a");
			this.answers.put('以下哪个不是岳掌门教导的武学', "a");
			this.answers.put('捏脸需要寻找哪个NPC？', "a");
			this.answers.put('论剑中以下哪个是晚月庄的技能', "a");
			this.answers.put('碧海潮生剑在哪位师傅处学习', "a");
			this.answers.put('干苦力是挂机里的第几个任务', "a");
			this.answers.put('铁血大旗门云海心法可以提升什么', "a");
			this.answers.put('以下哪些物品是成长计划第四天可以领取的？', "a");
			this.answers.put('易容术多少级才可以易容成异性NPC', "a");
			this.answers.put('摹刻扬文需要多少把刻刀？', "a");
			this.answers.put('正邪任务中客商的在哪个地图', "a");
			this.answers.put('白驼山第一位要拜的师傅是谁', "a");
			this.answers.put('枯荣禅功是哪个门派的技能', "a");
			this.answers.put('漫天花雨匕在哪获得', "a");
			this.answers.put('摧心掌是哪个门派的技能', "a");
			this.answers.put('“花海”场景是在哪个地图上？', "a");
			this.answers.put('雪蕊儿是哪个门派的师傅', "a");
			this.answers.put('新手礼包在哪里领取', "a");
			this.answers.put('论语在哪购买', "a");
			this.answers.put('银丝链甲衣可以在哪位npc那里获得？', "a");
			this.answers.put('乾坤大挪移属于什么类型的武功', "a");
			this.answers.put('移开明教石板需要哪项技能到一定级别', "a");
			this.answers.put('开通VIP月卡最低需要当天充值多少元方有购买资格', "a");
			this.answers.put('黯然销魂掌有多少招式', "c");
			this.answers.put('“跪拜坪”场景是在哪个地图上', "b");
			this.answers.put('孤独求败称号需要多少论剑积分兑换', "b");
			this.answers.put('孔雀氅可以镶嵌几颗宝石', "b");
			this.answers.put('客商在哪一章', "b");
			this.answers.put('疯魔杖的伤害是多少', "b");
			this.answers.put('丐帮的轻功是哪个', "b");
			this.answers.put('霹雳掌套的伤害是多少', "b");
			this.answers.put('方媃是哪个门派的师傅', "b");
			this.answers.put('拜师张三丰需要多少正气', "b");
			this.answers.put('天师阵法是哪个门派的阵法', "b");
			this.answers.put('选择商贾会影响哪个属性', "b");
			this.answers.put('银手镯可以在哪位npc那里获得？', "b");
			this.answers.put('在雪亭镇李火狮可以学习多少级柳家拳', "b");
			this.answers.put('华山施戴子掉落的物品是什么', "b");
			this.answers.put('尹志平是哪个门派的师傅', "b");
			this.answers.put('病维摩拳是哪个门派的技能', "b");
			this.answers.put('茅山的绝学是什么', "b");
			this.answers.put('茅山派的轻功是什么', "b");
			this.answers.put('风泉之剑可以在哪位npc那里获得？', "b");
			this.answers.put('凌波微步是哪个门派的技能', "b");
			this.answers.put('藏宝图在哪个npc处购买', "b");
			this.answers.put('军营是第几个组队副本', "b");
			this.answers.put('北岳殿神像后面是哪位npc', "b");
			this.answers.put('王重阳是哪个门派的师傅', "b");
			this.answers.put('跨服是星期几举行的', "b");
			this.answers.put('学习屠龙刀法需要多少内力', "b");
			this.answers.put('高级乾坤再造丹是增加什么的', "b");
			this.answers.put('银项链可以在哪位npc那里获得', "b");
			this.answers.put('每天在线多少个小时即可领取消费积分', "b");
			this.answers.put('晚月庄的内功是什么', "b");
			this.answers.put('冰魄银针的伤害是多少', "b");
			this.answers.put('论剑中以下哪个是丐帮的技能', "b");
			this.answers.put('神雕大侠所在的地图', "b");
			this.answers.put('突破丹在哪里购买', "b");
			this.answers.put('白金手镯可以在哪位npc那里获得', "a");
			this.answers.put('金手镯可以在哪位npc那里获得', "b");
			this.answers.put('以下哪个不是梁师兄教导的武学', "b");
			this.answers.put('技能数量超过了什么消耗潜能会增加', "b");
			this.answers.put('白金项链可以在哪位npc那里获得', "b");
			this.answers.put('小龙女住的古墓是谁建造的', "b");
			this.answers.put('打开引路蜂礼包可以得到多少引路蜂', "b");
			this.answers.put('购买新手进阶礼包在挂机打坐练习上可以享受多少倍收益', "b");
			this.answers.put('白玉腰束是腰带类的第几级装备', "b");
			this.answers.put('老顽童在全真教哪个场景', "b");
			this.answers.put('神雕侠侣的作者是', "b");
			this.answers.put('晚月庄的七宝天岚舞可以提升哪个属性', "b");
			this.answers.put('论剑在周几进行', "b");
			this.answers.put('vip每天不可以领取什么', "b");
			this.answers.put('每天有几次试剑', "b");
			this.answers.put('晚月庄七宝天岚舞可以提升什么', "b");
			this.answers.put('哪个分享可以获得20元宝', "b");
			this.answers.put('大保险卡可以承受多少次死亡后不降技能等级', "b");
			this.answers.put('凌虚锁云步是哪个门派的技能', "b");
			this.answers.put('屠龙刀法是哪个门派的绝学技能', "b");
			this.answers.put('金丝鞋可以在哪位npc那里获得', "b");
			this.answers.put('老毒物在白驮山的哪个场景', "b");
			this.answers.put('毒物阵法是哪个门派的阵法', "b");
			this.answers.put('以下哪个不是知客道长教导的武学', "b");
			this.answers.put('飞仙剑阵是哪个门派的阵法', "b");
			this.answers.put('副本完成后不可获得下列什么物品', "b");
//            this.answers.put('清风寨在哪个地图', "d");
			this.answers.put('晚月庄意寒神功可以提升什么', "b");
			this.answers.put('北冥神功是哪个门派的技能', "b");
			this.answers.put('论剑中以下哪个是青城派的技能', "b");
			this.answers.put('六阴追魂剑是哪个门派的技能', "b");
			this.answers.put('王铁匠是在那个场景', "b");
			this.answers.put('以下哪个是步玄派的祖师', "b");
			this.answers.put('在洛阳萧问天那可以学习什么心法', "b");
			this.answers.put('在哪个npc处能够升级易容术', "b");
			this.answers.put('摹刻10级的装备需要摩刻技巧多少级', "b");
			this.answers.put('师门任务什么时候更新', "b");
			this.answers.put('哪个npc属于全真七子', "b");
			this.answers.put('正邪任务中卖花姑娘在哪个地图', "b");
			this.answers.put('风老前辈在华山哪个场景', "b");
			this.answers.put('“留云馆”场景是在哪个地图上？', "b");
			this.answers.put('割鹿刀可以在哪位npc那里获得', "b");
			this.answers.put('论剑中以下哪个是大招寺的技能', "b");
			this.answers.put('全真的基本阵法有哪个特殊效果', "b");
			this.answers.put('论剑要在晚上几点前报名', "b");
			this.answers.put('碧磷鞭的伤害是多少？', "b");
			this.answers.put('一天能完成谜题任务多少个', "b");
			this.answers.put('正邪任务杀死好人增长什么', "b");
			this.answers.put('木道人在青城山的哪个场景', "b");
			this.answers.put('论剑中以下哪个不是大招寺的技能', "b");
			this.answers.put('“伊犁”场景是在哪个地图上？', "b");
			this.answers.put('“冰火岛”场景是在哪个地图上', "b");
			this.answers.put('“双鹤桥”场景是在哪个地图上', "b");
			this.answers.put('“百龙山庄”场景是在哪个地图上？', "b");
            this.answers.put('“首次通过乔阴县不可以获得那种奖励？', "a");
			this.answers.put('九阳神功是哪个门派的技能', "c");
			this.answers.put('树王坟在第几章节', "c");
			this.answers.put('阳刚之劲是哪个门派的阵法', "c");
			this.answers.put('上山打猎是挂机里的第几个任务', "c");
			this.answers.put('一张分身卡的有效时间是多久', "c");
			this.answers.put('锻造一把刻刀需要多少玄铁碎片锻造', "c");
			this.answers.put('论剑中以下哪个不是铁血大旗门的技能', "c");
			this.answers.put('如意刀是哪个门派的技能', "c");
			this.answers.put('跨服在哪个场景进入', "c");
			this.answers.put('在哪个NPC可以购买恢复内力的药品？', "c");
			this.answers.put('欧阳敏在唐门的哪个场景', "c");
			this.answers.put('密宗伏魔是哪个门派的阵法', "c");
			this.answers.put('孔雀氅是披风类的第几级装备？', "c");
			this.answers.put('天山折梅手是哪个门派的技能', "c");
			this.answers.put('玩家每天能够做几次正邪任务', "c");
			this.answers.put('柳淳风在哪一章', "c");
			this.answers.put('茅山天师正道可以提升什么', "c");
			this.answers.put('洪帮主在洛阳哪个场景', "c");
			this.answers.put('以下哪个不是全真七子？', "c");
			this.answers.put('云九天是哪个门派的师傅', "c");
			this.answers.put('摹刻烈日宝链需要多少级摩刻技巧', "c");
			this.answers.put('伏虎杖的伤害是多少', "c");
			this.answers.put('灵蛇杖法是哪个门派的技能', "c");
			this.answers.put('“子午楼”场景是在哪个地图上', "c");
			this.answers.put('什么装备可以镶嵌紫水晶', "c");
			this.answers.put('石师妹哪个门派的师傅', "c");
			this.answers.put('烈火旗大厅是那个地图的场景', "c");
			this.answers.put('打土匪是挂机里的第几个任务', "c");
			this.answers.put('捏脸需要花费多少银两', "c");
			this.answers.put('大旗门的云海心法可以提升哪个属性', "c");
			this.answers.put('论剑中以下哪个是铁雪山庄的技能', "c");
			this.answers.put('“白玉牌楼”场景是在哪个地图上', "c");
			this.answers.put('以下哪个宝石不能镶嵌到披风', "c");
			this.answers.put('魏无极身上掉落什么装备', "c");
			this.answers.put('以下不是步玄派的技能的哪个', "c");
			this.answers.put('“常春岛渡口”场景是在哪个地图上', "c");
			this.answers.put('北斗七星阵是第几个的组队副本', "c");
			this.answers.put('宝石合成一次需要消耗多少颗低级宝石', "c");
			this.answers.put('烈日项链可以镶嵌几颗宝石', "c");
			this.answers.put('达摩在少林哪个场景', "c");
			this.answers.put('积分商城在雪亭镇的哪个场景', "c");
			this.answers.put('全真的双手互搏有哪个特殊效果', "c");
			this.answers.put('论剑中以下哪个不是唐门的人物', "c");
			this.answers.put('棋道是哪个门派的技能', "c");
			this.answers.put('七星鞭的伤害是多少', "c");
			this.answers.put('富春茶社在哪一章', "c");
			this.answers.put('等级多少才能在世界频道聊天', "c");
			this.answers.put('以下哪个是封山派的祖师', "c");
			this.answers.put('论剑是星期几进行的', "c");
			this.answers.put('师门任务每天可以做多少个', "c");
			this.answers.put('风泉之剑加几点悟性', "c");
			this.answers.put('黑水伏蛟可以在哪位npc那里获得？', "c");
			this.answers.put('陆得财是哪个门派的师傅', "c");
			this.answers.put('拜师小龙女需要容貌多少', "c");
			this.answers.put('下列装备中不可摹刻的是', "c");
			this.answers.put('古灯大师是哪个门派的终极师傅', "c");
			this.answers.put('“翰墨书屋”场景是在哪个地图上', "c");
			this.answers.put('论剑中大招寺第一个要拜的师傅是谁', "c");
			this.answers.put('杨过小龙女分开多少年后重逢', "c");
			this.answers.put('选择孤儿会影响哪个属性', "c");
			this.answers.put('论剑中逍遥派的终极师傅是谁', "c");
			this.answers.put('不可保存装备下线多久会消失', "c");
			this.answers.put('一个队伍最多有几个队员', "c");
	//        this.answers.put('论语在哪购买', "c");
			this.answers.put('以下哪个宝石不能镶嵌到戒指', "c");
			this.answers.put('论剑是每周星期几', "c");
			this.answers.put('茅山在哪里拜师', "c");
			this.answers.put('以下哪个宝石不能镶嵌到腰带', "c");
			this.answers.put('黄宝石加什么属性', "c");
			this.answers.put('茅山可以招几个宝宝', "c");
			this.answers.put('唐门密道怎么走', "c");
			this.answers.put('论剑中以下哪个不是大理段家的技能', "c");
			this.answers.put('论剑中以下哪个不是魔教的人物', "d");
			this.answers.put('每天能做多少个师门任务', "c");
			this.answers.put('一天能使用元宝做几次暴击谜题', "c");

			this.answers.put('成长计划第七天可以领取多少元宝', "d");
			this.answers.put('每天能挖几次宝', "d");
			this.answers.put('日月神教大光明心法可以提升什么', "d");
			this.answers.put('在哪个npc处领取免费消费积分', "d");
			this.answers.put('副本有什么奖励', "d");
			this.answers.put('论剑中以下不是华山派的人物的是哪个', "d");
			this.answers.put('论剑中以下哪个不是丐帮的技能', "d");
			this.answers.put('以下哪个不是慧名尊者教导的技能', "d");
			this.answers.put('慕容山庄的斗转星移可以提升哪个属性', "d");
			this.answers.put('论剑中以下哪个不是铁雪山庄的技能', "d");
			this.answers.put('师门任务一天能完成几次', "d");
			this.answers.put('以下有哪些物品不是每日充值的奖励', "d");
			this.answers.put('论剑中以下哪个不是华山派的技能的', "d");
			this.answers.put('武穆兵法提升到多少级才能出现战斗必刷', "d");
			this.answers.put('论剑中以下哪个不是全真教的技能', "d");
			this.answers.put('师门任务最多可以完成多少个', "d");
			this.answers.put('张三丰在哪一章', "d");
			this.answers.put('倚天剑加多少伤害', "d");
			this.answers.put('以下谁不精通降龙十八掌', "d");
			this.answers.put('论剑中以下哪个不是明教的技能', "d");
			this.answers.put('受赠的消费积分在哪里领取', "d");
			this.answers.put('以下哪个不是道尘禅师教导的武学', "d");
			this.answers.put('古墓多少级以后才能进去', "d");
			this.answers.put('千古奇侠称号需要多少论剑积分兑换', "d");
			this.answers.put('魔鞭诀在哪里学习', "d");
			this.answers.put('通灵需要花费多少银两', "d");
			this.answers.put('白银宝箱礼包多少元宝一个', "d");
			this.answers.put('以下哪个不是论剑的皮肤', "d");
			this.answers.put('小李飞刀的伤害是多少', "d");
			this.answers.put('下面哪个npc不是魔教的', "d");
			this.answers.put('天蚕围腰是腰带类的第几级装备', "d");
			this.answers.put('黄岛主在桃花岛的哪个场景', "d");
			this.answers.put('宝玉帽可以在哪位npc那里获得？', "d");
			this.answers.put('什么影响攻击力', "d");
			this.answers.put('紫宝石加什么属性', "d");
			this.answers.put('少林的混元一气功有哪个特殊效果', "d");
			this.answers.put('以下哪个是晚月庄的祖师', "d");
			this.answers.put('以下不是隐藏门派的是哪个', "d");
			this.answers.put('第一个副本需要多少等级才能进入', "d");
			this.answers.put('风泉之剑在哪里获得', "d");
			this.answers.put('镖局保镖是挂机里的第几个任务', "d");
			this.answers.put('下面哪个不是古墓的师傅', "d");
			this.answers.put('每个玩家最多能有多少个好友', "b");
			this.answers.put('以下哪个不是在扬州场景', "d");
			this.answers.put('茅山的天师正道可以提升哪个属性', "d");
			this.answers.put('“无名山脚”场景是在哪个地图上', "d");
			this.answers.put('闯楼第几层可以获得称号“藏剑楼楼主”', "d");
			this.answers.put('充值积分不可以兑换下面什么物品', "d");
			this.answers.put('魔教的大光明心法可以提升哪个属性', "d");
			this.answers.put('以下哪些物品不是成长计划第三天可以领取的', "d");
			this.answers.put('论剑中以下哪个不是峨嵋派可以拜师的师傅', "d");
			this.answers.put('哪个技能不是魔教的', "d");
			this.answers.put('沧海护腰可以镶嵌几颗宝石', "d");
			this.answers.put('城里打擂是挂机里的第几个任务', "d");
			this.answers.put('以下哪个不是鲁长老教导的武学', "d");
			this.answers.put('以下哪些物品不是成长计划第一天可以领取的', "d");
			this.answers.put('包拯在哪一章', "d");
			this.answers.put('张天师在茅山哪个场景', "d");
			this.answers.put('山河藏宝图需要在哪个NPC手里购买？', "d");
			this.answers.put('影响你出生的福缘的出生是', "d");
			this.answers.put('张三丰在武当山哪个场景', "d");
			this.answers.put('春秋水色斋需要多少杀气才能进入', "d");
			this.answers.put('论剑中以下哪个不是是晚月庄的技能', "d");
			this.answers.put('大乘佛法有什么效果', "d");
			this.answers.put('正邪任务最多可以完成多少个', "d");
			this.answers.put('高级突破丹多少元宝一颗', "d");
			this.answers.put('清虚道长在哪一章', "d");
			this.answers.put('在战斗界面点击哪个按钮可以进入聊天界面', "d");
			this.answers.put('“鹰记商号”场景是在哪个地图上？', "d");
			this.answers.put('改名字在哪改', "d");
			this.answers.put('以下哪个不是在洛阳场景', "d");
	//        this.answers.put('青城派的道德经可以提升哪个属性', "d");
			this.answers.put('金项链可以在哪位npc那里获得', "d");
            this.answers.put('首次通过乔阴县不可以获得那种奖励', "a");

			this.answer = function(a) {
	//          alert("答案是：" + a);
				overrideclick("question " + a,0);
	//            go("question");
			}

			this.dispatchMessage = function(b) {
				var type = b.get("type"), msg= b.get("msg")
				if (type == "show_html_page" && msg.indexOf("知识问答第") > 0) {
					console.log(msg);
					if (msg.indexOf("回答正确！") > 0) {
						overrideclick("question");
						return;
					}

					var q = this.answers.keys();
					for (var i in q) {
						var k = q[i];

						if (msg.indexOf(k) > 0) {
							this.answer(this.answers.get(k));
							break;
						}
					}

	//                else if (msg.indexOf("正邪任务一天能做几次") > 0) this.answer("b")

				}
			}
		}

		var question = new Question
			function Trigger(r, h, c, n) {
			this.regexp = r;
			this.handler = h;
			this.class = c;
			this.name = n;

			this.enabled = true;

			this.trigger = function(line) {
				if (!this.enabled) return;

				if (!this.regexp.test(line)) return;

				console.log("触发器: " + this.regexp + "触发了");
				var m = line.match(this.regexp);
				this.handler(m);
			}

			this.enable = function() {
				this.enabled = true;
			}

			this.disable = function() {
				this.enabled = false;
			}

		}

		jh = function(w) {
			if (w == 'xt') w = 1;
			if (w == 'ly') w = 2;
			if (w == 'hsc') w = 3;
			if (w == 'hs') w = 4;
			if (w == 'yz') w = 5;
			if (w == 'gb') w = 6;
			if (w == 'qy') w = 7;
			if (w == 'em') w = 8;
			if (w == 'hs2') w = 9;
			if (w == 'wd') w = 10;
			if (w == 'wy') w = 11;
			if (w == 'sy') w = 12;
			if (w == 'sl') w = 13;
			if (w == 'tm') w = 14;
			if (w == 'qc') w = 15;
			if (w == 'xx') w = 16;
			if (w == 'kf') w = 17;
			if (w == 'gmd') w = 18;
			if (w == 'qz') w = 19;
			if (w == 'gm') w = 20;
			if (w == 'bt') w = 21;
			if (w == 'ss') w = 22;
			if (w == 'mz') w = 23;
			if (w == 'ts') w = 24;


			overrideclick("jh " + w, 0);

		};


		function Triggers() {
			this.allTriggers = [];

			this.trigger = function(line) {
				var t = this.allTriggers.slice(0);
				for (var i = 0, l = t.length; i < l; i++) {
					t[i].trigger(line);
				}
			}

			this.newTrigger = function(r, h, c, n) {
				var t = new Trigger(r, h, c, n);
				if (n) {
					for (var i = this.allTriggers.length - 1; i >= 0; i--) {
						if (this.allTriggers[i].name == n) this.allTriggers.splice(i, 1);
					}
				}

				this.allTriggers.push(t);

				return t;
			}

			this.enableTriggerByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) t.enable();
				}
			}

			this.disableTriggerByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) t.disable();
				}
			}

			this.enableByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.class == c) t.enable();
				}
			}

			this.disableByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.class == c) t.disable();
				}
			}

			this.removeByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t && t.class == c) this.allTriggers.splice(i, 1);
				}
			}

			this.removeByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) this.allTriggers.splice(i, 1);
				}
			}
		}

		window.triggers = new Triggers;

		triggers.newTrigger(/似乎以下地方藏有宝物(.*)/, function(m) {
			m = m[1].split(/\d+/);
			var bl_found = false;
			for (i = 0, l = m.length; i < l; i++) {
				var a = m[i];
				console.log(a);
				if (/一片翠绿的草地/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/大诗人白居易之墓，墓碑上刻着“唐少傅白公墓”。四周环绕着冬青。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正站在雪亭镇南边的一家小客栈里，这家客栈虽小，却是方圆五百里/.test(a)) {
					jh('xt');
					go('dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇镇前广场的空地，地上整齐地铺著大石板。广场中央有一个木头搭的架子，经过多年的风吹日晒雨淋，看来非常破旧。四周建筑林立。往西你可以看到一间客栈，看来生意似乎很好。/.test(a)) {
					jh('xt');
					go('e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间十分老旧的城隍庙，在你面前的神桌上供奉著一尊红脸的城隍，庙虽老旧，但是神案四周已被香火薰成乌黑的颜色，显示这里必定相当受到信徒的敬仰。/.test(a)) {
					jh('xt');
					go('e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条普通的黄土小径，弯弯曲曲往东北一路盘旋上山，北边有一间城隍庙，往西则是雪亭镇的街道。/.test(a)) {
					jh('xt');
					go('e;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条普通的黄土小径，小径往西南通往一处山间的平地，从这里可以望见不少房屋错落在平地上，往东北则一路上山。/.test(a)) {
					jh('xt');
					go('e;e;s;ne;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条说宽不宽，说窄倒也不窄的山路，路面用几块生满青苔的大石铺成，西面是一段坡地，从这里可以望见西边有几间房屋错落在林木间，东面则是山壁，山路往西南衔接一条黄土小径，往北则是通往山上的石阶。/.test(a)) {
					jh('xt');
					go('e;e;s;ne;ne;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的街口，往北是一个热闹的广场，南边是条小路通往一座林子，东边则有一条小径沿著山腰通往山上，往西是一条比较窄的街道，参差不齐的瓦屋之间传来几声犬吠。从这里向东南走就是进出关的驿道了。/.test(a)) {
					jh('xt');
					go('e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的街道，你的北边有一家客栈，从这里就可以听到客栈里人们饮酒谈笑/.test(a)) {
					jh('xt');
					go('e;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间宽敞的书院，虽然房子看起来很老旧了，但是打扫得很整洁，墙壁上挂著一幅山水画，意境颇为不俗，书院的大门开在北边，西边有一扇木门通往边厢。/.test(a)) {
					jh('xt');
					go('e;s;w;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条宽敞坚实的青石板铺成的大道，路上车马的痕迹已经在路面上留下一条条明显的凹痕，往东是一条较小的街道通往雪亭镇。/.test(a)) {
					jh('xt');
					go('e;s;w;w;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正走在雪亭镇的街道上，东边不远处有一间高大的院子，门口立著一根粗大的旗杆/.test(a)) {
					jh('xt');
					go('e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间素来以公平信用著称的钱庄，钱庄的老板还是个曾经中过举人的读书人/.test(a)) {
					jh('xt');
					go('e;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正站在一间大宅院的入口，两只巨大的石狮镇守在大门的两侧，一阵阵吆喝与刀剑碰撞的声音从院子中传来，通过大门往东可以望见许多身穿灰衣的汉子正在操练。/.test(a)) {
					jh('xt');
					go('e;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正站在一个宽敞的教练场中，地上铺著黄色的细砂，许多人正在这里努力地操练著，北边是一间高大的兵器厅，往东则是武馆师父们休息的大厅。/.test(a)) {
					jh('xt');
					go('e;n;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间堆满各式兵器、刀械的储藏室，各式武器都依照种类、长短、依次放在一起，并且擦拭得一尘不染，储藏室的出口在你的南边，面对出口的左手边有一个架子/.test(a)) {
					jh('xt');
					go('e;n;e;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是淳风武馆的正厅，五张太师椅一字排开面对著门口，这是武馆中四位大师傅与馆主柳淳风的座位/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是淳风武馆中的天井，往西走可以回到正厅/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间整理得相当乾净的书房，红木桌椅上铺著蓝绸巾，显得十分考究，西面的立著一个书架，上面放著一排排的古书，往南走出房门可以看到天井。/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间布置得相当雅致的厢房，从窗子可以看到北边的天井跟南边的庭园中各式各样的奇花异草，以及他们所带来的淡淡香气，厢房的东面墙上还挂著一幅仕女图/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这里是淳风武馆的内院，平常武馆弟子没有馆主的允许是不敢到这里来的/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正走在雪亭镇的大街，往南直走不远处是镇上的广场，在你的东边是一间大宅院/.test(a)) {
					jh('xt');
					go('e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间打铁铺子，从火炉中冒出的火光将墙壁映得通红，屋子的角/.test(a)) {
					jh('xt');
					go('e;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的大街，东边有一栋陈旧的建□，看起来像是什麽店铺，但是并没有任何招牌，只有一扇门上面写著一个大大的/.test(a)) {
					jh('xt');
					go('e;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一家中等规模的当铺，老旧的柜台上放著一张木牌/.test(a)) {
					jh('xt');
					go('e;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是丰登当铺的储藏室，有时候当铺里的大朝奉会把铺里存不下的死当货物拿出来拍卖/.test(a)) {
					jh('xt');
					go('e;n;n;n;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的大街，一条小巷子通往东边，西边则是一间驿站/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是负责雪亭镇官府文书跟军令往来的雪亭驿/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/一间小木屋，在这北方的风中吱吱作响。/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一处山坳，往南就是雪亭镇，一条蜿蜒的小径往东通往另一个邻近的小山村/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里便是有名的龙门石窟，石窟造像，密布于两岸的崖壁上。远远可以望见琵琶峰上的白冢。/.test(a)) {
					jh('ly');
					go('dig go');
					bl_found = true;
					break;
				}
				if (/城南官道，道路两旁是一片树林，远处是一片片的农田了。田地里传来农人的呼号，几头黄牛悠闲的趴卧着。/.test(a)) {
					jh('ly');
					go('n;dig go');
					bl_found = true;
					break;
				}
				if (/由此洛阳城南门出去，就可以通往南市的龙门石窟。城门处往来客商络绎不绝，几名守城官兵正在检查过往行人。/.test(a)) {
					jh('ly');
					go('n;n;dig go');
					bl_found = true;
					break;
				}
				if (/洛阳最繁华的街市，这里聚集着各国客商。/.test(a)) {
					jh('ly');
					go('n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里便是洛水渡口静静的洛水由此向东，汇入滚滚黄河。码头上正泊着一艘船坞，常常的缆绳垂在水中。/.test(a)) {
					jh('ly');
					go('n;n;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/一艘普通的船坞，船头坐着一位蓑衣男子。/.test(a)) {
					jh('ly');
					go('n;n;e;s;luoyang317_op1;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是洛阳的南面了，街上有好几个乞丐在行乞。/.test(a)) {
					jh('ly');
					go('n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是一座供奉洛神的小庙。小庙的地上放着几个蒲团。/.test(a)) {
					jh('ly');
					go('n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这儿就是洛阳金刀世家了。金刀门虽然武功不算高，但也是有两下子的。/.test(a)) {
					jh('ly');
					go('n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/金刀世家的练武场。金刀门的门主王天霸在这儿教众弟子习武。/.test(a)) {
					jh('ly');
					go('n;n;n;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是洛神庙下面的地道，上面人走动的声音都隐约可听见。/.test(a)) {
					jh('ly');
					go('n;n;n;w;putuan;dig go');
					bl_found = true;
					break;
				}
				if (/湿润的青石路显然是刚刚下过雨，因为来往行人过多，路面多少有些坑坑凹凹，一不留神很容易被绊到。/.test(a)) {
					jh('ly');
					go('n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这儿就是菜市口。各种小贩商人十分嘈杂，而一些地痞流氓也混迹人群伺机作案。/.test(a)) {
					jh('ly');
					go('n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/一个猪肉摊，在这儿摆摊卖肉已经十多年了。/.test(a)) {
					jh('ly');
					go('n;n;n;n;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/你刚踏进巷子，便听得琴韵丁冬，小巷的宁静和外面喧嚣宛如两个世界/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/小院四周满是盛开的桃花，穿过一条长廊，一座别致的绣楼就在眼前了。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;s;dig go');
					bl_found = true;
					break;
				}
				if (/绣楼内挂着湖绿色帐幔，一名女子斜靠在窗前的美人榻上。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里就是背阴巷了，站在巷口可以万剑阴暗潮湿的窄巷，这里聚集着洛阳的地痞流氓，寻常人不敢近前。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;dig go');
					bl_found = true;
					break;
				}
				if (/黑暗的街道，几个地痞无赖正慵懒的躺在一旁。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;n;dig go;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一家酒肆，洛阳地痞头目甄大海正坐在里面小酌。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/院落里杂草丛生，东面的葡萄架早已枯萎。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/一座跨街大青砖砌的拱洞高台谯楼，矗立在城中心。鼓楼为二层木瓦建筑，设有大鼓大钟，晨钟暮鼓，用以报时。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/相传春秋时代，楚王在此仰望周王城，问鼎重几何。周室暗弱，居然隐忍不发。这便是街名的由来。银钩赌坊也在这条街上。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里便是洛阳有名的悦来客栈，只见客栈大门处人来人往，看来生意很红火。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/客栈大院，院内紫藤花架下放着几张桌椅，东面是一座马厩。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/客栈马倌正在往马槽里添草料，旁边草料堆看起来有些奇怪。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/房间布置的极为雅致，没有太多的装饰，唯有屋角放着一个牡丹屏风。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/赌坊二楼走廊，两旁房间里不时床来莺声燕语，看来这里不止可以赌。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通往赌坊二楼的楼梯，上面铺着大红色地毯。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/大厅满是呼庐喝雉声、骰子落碗声、银钱敲击声，男人和女人的笑声，/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/走出赌坊后门，桂花清香扑面而来，桂花树下的水缸似乎被人移动过。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/赌坊门口人马喧哗，门上一支银钩在风中摇晃，不知道多少人咬上了这没有鱼饵的钩/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;dig go');
					bl_found = true;
					break;
				}
				if (/自古以来，洛阳墨客骚人云集，因此有“诗都”之称，牡丹香气四溢，又有“花都”的美誉/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;s;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是牡丹园内的一座小亭子，布置得十分雅致。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;s;luoyang111_op1;dig go');
					bl_found = true;
					break;
				}
				if (/也许由于连年的战乱，使得本来很热闹的街市冷冷清清，道路两旁的店铺早已破旧不堪，一眼望去便知道有很久没有人居住了。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这间当铺处于闹市，位置极好。当铺老板正半眯着双眼在高高的柜台上打盹。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/你无意中走进一条青石街，这里不同于北大街的繁华热闹，两边是一些小店铺，北面有一家酒肆，里面出入的人看起来衣衫褴褛。/.test(a)) {


					jh('ly');
					go('n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间小酒肆，里面黑暗潮湿，满是油垢的桌旁，几名无赖正百无聊赖的就着一盘花生米喝酒。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是洛阳北边街道，人群熙熙攘攘甚是热闹。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/洛阳城的钱庄，来往的商客往往都会将银两存于此处。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/就是洛阳北门，门口站着的是守城官兵。站在城楼望出去，外面是一片茅草路。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/城北通往邙山的小路，路旁草丛中时有小兽出没。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/一片绿云般的竹林隔绝了喧嚣尘世，步入这里，心不由平静了下来。青石小路在竹林中蜿蜒穿行，竹林深处隐约可见一座小院。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/绿竹环绕的小院，院内几间房舍都用竹子打造，与周围竹林颇为和谐。这小院的主人显然有些独特之处。院内一名老翁正在劈柴。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/一间雅致的书斋，透过窗户可以见到青翠修竹，四周如此清幽，竹叶上露珠滴落的声音都能听见。靠墙的书架看起来很别致。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/ 就是洛阳城墙上的城楼，驻守的官兵通常会在这儿歇个脚，或是聊下天。如果心细之人，能看到角落里似乎有一个隐秘的把手。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/ 这个城楼上的密室显然是守城军士秘密建造的，却不知有何用途。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;w;luoyang14_op1;dig go');
					bl_found = true;
					break;
				}
				if (/这就是洛阳城的城墙。洛阳是重镇，因此城墙上驻守的官兵格外多。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/由于连年的战乱，整条金谷街的不少铺子已经荒废掉了。再往东走就是洛阳地痞流氓聚集的背阴巷。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是洛阳首富的庄院，据说家财万贯，富可敌国。庄院的的中间有一棵参天大树。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是富人家的储藏室，因此有不少奇珍异宝。仔细一看，竟然还有一个红光满面的老人家半躺在角落里。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;n;op1;dig go');
					bl_found = true;
					break;
				}
				if (/一座朴实的石拱桥，清澈河水从桥下流过。对面可见一座水榭。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/荷池旁的水榭，几名游客正在里面小憩。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/回廊两旁便是碧绿荷塘，阵阵荷香拂过。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/荷塘中的观景台，两名女子在这里游玩。远远站着几名护卫，闲杂人等一律被挡在外面。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/隐藏在一片苍翠树林中的小路，小路尽头有座草屋。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/简陋的茅草小屋，屋内陈设极其简单。/.test(a)) {
					jh('ly');

					go('n;n;n;n;n;e;e;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/石阶两侧山泉叮咚，林木森森。漫步而上，可见山腰有亭。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这就是听伊亭，据说白居易曾与好友在此品茗、论诗。一旁的松树上似乎有什么东西。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/丛林小径，因为走得人少，小径已被杂草覆盖。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/听着松涛之音，犹如直面大海/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是华山村村口，几个草垛随意的堆放在路边，三两个泼皮慵懒躺在那里。/.test(a)) {
					jh('hsc');
					go('dig go');
					bl_found = true;
					break;
				}
				if (/这是一条穿过村口松树林的小路。/.test(a)) {
					jh('hsc');
					go('n;dig go');
					bl_found = true;
					break;
				}
				if (/这就是有名的神女冢，墓碑前散落着游人墨客烧的纸钱，前面不远处有一间破败的土地庙。/.test(a)) {
					jh('hsc');
					go('n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一片溪边的杏树林，一群孩童在此玩耍。/.test(a)) {
					jh('hsc');
					go('w;dig go');
					bl_found = true;
					break;
				}
				if (/村口一个简易茶棚，放着几张木质桌椅，干净齐整，过往路人会在这里喝杯热茶歇歇脚，村里的王老二常常会混在这里小偷小摸。/.test(a)) {
					jh('hsc');
					go('w;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间破败的土地庙门口，门旁的对联已经模糊不清，隐约只见上联“德之不修/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;dig go');
					bl_found = true;
					break;
				}
				if (/土地庙庙堂，正中供奉着土地，香案上堆积这厚厚的灰尘。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;dig go');
					bl_found = true;
					break;
				}
				if (/隐藏在佛像后的地道入口，两只黑狗正虎视眈眈的立在那里。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通往西侧的通道，前面被铁栅栏挡住了。/.test(a)) {
					jh('hsc');
					bl_found = true;
					go('w;event_1_59520311;n;n;w;dig go');
					break;
				}
				if (/通往地下通道的木楼梯/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通道两侧点着油灯，昏暗的灯光让人看不清楚周围的环境。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通往东侧的通道，前面传来有水声和痛苦的呻吟。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一件宽敞的大厅，正中间摆着一张太师椅，两侧放着一排椅子。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一件布置极为简单的卧房，显然只是偶尔有人在此小憩。床上躺着一名半裸女子，满脸惊恐。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条古老的青石街，几个泼皮在街上游荡。/.test(a)) {
					jh('hsc');
					go('s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条碎石小路，前面有一个打铁铺。/.test(a)) {
					jh('hsc');
					go('s;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间打铁铺，炉火烧的正旺，一名汉子赤膊挥舞着巨锤，锤落之处但见火花四溅。/.test(a)) {

					jh('hsc');
					go('s;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/一棵千年银杏树屹立在广场中央，树下有一口古井，据说这口古井的水清澈甘甜，村里的人每天都会来这里挑水。/.test(a)) {
					jh('hsc');
					go('s;s;dig go');
					bl_found = true;
					break;
				}
				if (/村里的杂货铺，店老板正在清点货品。/.test(a)) {
					jh('hsc');
					go('s;s;e;dig go');
					bl_found = true;
					break;
				}
				if (/杂货铺后院，堆放着一些杂物，东边角落里放着一个马车车厢，一个跛脚汉子坐在一旁假寐。/.test(a)) {
					jh('hsc');
					go('s;s;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一个普通的马车车厢，粗布帘挡住了马车车窗和车门，地板上面躺着一个人。/.test(a)) {
					jh('hsc');
					go('s;s;e;s;huashancun24_op2;dig go');
					bl_found = true;
					break;
				}
				if (/这是村内宗祠大门，门口一棵古槐，树干低垂。/.test(a)) {
					jh('hsc');
					go('s;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/宗祠的大厅，这里供奉着宗室先祖。/.test(a)) {
					jh('hsc');
					go('s;s;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/青石板铺就的小桥，几棵野草从石缝中钻出，清澈的溪水自桥下湍湍流过。/.test(a)) {
					jh('hsc');
					go('s;s;s;dig go');
					bl_found = true;
					break;
				}
				if (/田间泥泞的小路，一个稻草人孤单的立在一旁，似乎在指着某个地方。一个男子神色慌张的从一旁田地里钻出。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间竹篱围城的小院，院内种着几株桃花，屋后竹林环绕，颇为雅致。旁边的西厢房上挂着一把铜制大锁，看起来有些奇怪。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/这是小院的厅堂，迎面墙壁上挂着一幅山水画，看来小院的主人不是普通农人。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间普通的厢房，四周窗户被布帘遮得严严实实。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;w;get_silver;dig go');
					bl_found = true;
					break;
				}
				if (/一条杂草丛生的乡间小路，时有毒蛇出没。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;dig go');
					bl_found = true;
					break;
				}
				if (/一间看起来有些破败的小茅屋，屋内角落里堆着一堆稻草，只见稻草堆悉悉索索响了一阵，竟然从里面钻出一个人来。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;e;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨山脚，站在此处可以摇摇望见四面悬崖的清风寨。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;dig go');
					bl_found = true;
					break;
				}
				if (/通往清风寨唯一的山路，一侧便是万丈深渊。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;dig go');
					bl_found = true;
					break;
				}
				if (/两扇包铁木门将清风寨与外界隔绝开来，门上写着“清风寨”三字。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里就是桃花泉，一片桃林环绕着清澈泉水，据说泉水一年四季不会枯竭。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨前院，地面由坚硬岩石铺就。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨练武场，四周放置着兵器架。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨议事厅，正中放置着一张虎皮椅。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是清风寨后院，远角有一颗大树，树旁有一扇小门。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里就是清风寨兵器库了，里面放着各色兵器。角落里一个上锁的黑铁箱不知道装着什么。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里的空气中充满清甜的味道，地上堆积着已经晒干的柿子。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是清风寨寨主的卧房，床头挂着一把大刀。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是通往二楼大厅的楼梯，楼梯扶手上的雕花精美绝伦，看来这酒楼老板并不是一般的生意人/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/二楼是雅座，文人学士经常在这里吟诗作画，富商土豪也在这里边吃喝边作交易。/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/进门绕过一道淡绿绸屏风，迎面墙上挂着一副『芙蓉出水』图。厅内陈列奢华，雕花楠/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/进门绕过一道淡黄绸屏风，迎面墙上挂着一副『芍药』图，鲜嫩欲滴/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/进门绕过一道淡红绸屏风，迎面墙上挂着一副『牡丹争艳』图，牡丹素以富贵著称。图侧对联：“幽径天姿呈独秀，古园国色冠群芳”。/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/你站在观景台上眺望，扬州城的美景尽收眼底。东面是就是小秦淮河岸，河岸杨柳轻拂水面，几簇粉色桃花点缀其间。/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;n;n;dig go');
					bl_found = true;
					break;
				}

			}
			if (bl_found) go("cangbaotu_op1");
	//      window.setTimeout('go("cangbaotu_op1")', 3000);
		}, "", "cbt");



		window.game = this;

		window.attach = function() {
			var oldWriteToScreen = window.writeToScreen;
			window.writeToScreen = function(a, e, f, g) {
				var hidemsg=a.replace(/<[^>]*>/g, "");
				oldWriteToScreen(a, e, f, g);
				a = a.replace(/<[^>]*>/g, "");
				triggers.trigger(a);
			};

			webSocketMsg.prototype.old = gSocketMsg.dispatchMessage;

			gSocketMsg.dispatchMessage = function(b) {
				this.old(b);
                var a = b.get("type"), c = b.get("subtype");
				//console.log("type:"+a+";subtype:"+c+";msg:"+b.get("msg"));
				//自动重连
				if (a=="disconnect" && c=="change")
				{
					if (autoreconnectTrigger == 2)
					{
						g_gmain.g_delay_connect=0;
						connectServer();
					}else if (autoreconnectTrigger == 1){
						setTimeout(function(){
							g_gmain.g_delay_connect=0;
							connectServer();
						},600000);
					}
				}
				if(answerTrigger==1){
					question.dispatchMessage(b);
				}
				if (fishingTrigger==1){
					fishfeedback.dispatchMessage(b);
				}
				if (QxTalking==1){
					whipser.dispatchMessage(b);
				}
                if (qxStarting==1){
					msgqixia.dispatchMessage(b);
				}
				if (escapeTrigger==1){
					escape.dispatchMessage(b);
				}
                if (escapeTrigger1==1){
					escape1.dispatchMessage(b);
				}
				if(fanjiTrigger==1||hitnpctarget==1||hitplayertarget==1||followplayertarget==1){
					combat.dispatchMessage(b);
				}
				if (kuafuTrigger==1){
					kuafu.dispatchMessage(b);
				}
				if (tianjianTrigger==1){
					tianjian.dispatchMessage(b);
				}
				if (Debug==1){
					debugm.dispatchMessage(b);
				}

				if (GodMode==1){
					godview.dispatchMessage(b);
				}
				if (qiangdipiTrigger==1){
					qiang.dispatchMessage(b);
				}
				if (jzstart==1){
					jz.dispatchMessage(b);
				}
				if (FightTrigger==1){
					FightFeed.dispatchMessage(b);
				}
				if (FriendTrigger == 1){
					FriendFeed.dispatchMessage(b);
				}
				if (bangfuTrigger==1){
					bangfu.dispatchMessage(b);
				}
                if (killYXTrigger==1){
					killYXFeed.dispatchMessage(b);
				}
                if (QLtrigger==1){
					qlMon.dispatchMessage(b);
				}

				if(bihuataopaoTrigger==1){
					bihuataopao.dispatchMessage(b);
				}
                if(PTtrigger==1){
					ptMon.dispatchMessage(b);
				}
                if(hideNpc==1){
					showhide.dispatchMessage(b);
				}
				if(window.singleBattleTrigger==1 && window.singleBattleInstance){
					window.singleBattleInstance.dispatchMessage(b);
				}
                if(autotupoTrigger==1){
					AutoTupo.dispatchMessage(b);
				}
				//getHongBao.dispatchMessage(b);
                autoEvent.dispatchMessage(b);
			}
		};
		attach();

	})(window);


var CONST_DEBUG_MODE = true;

/**
*   Job Manager
*/
var JobManager = {
    Const: {
        INTERVAL_ROUTINE_TASKS: 1000 * 60 * 30,
        INTERVAL_BATTLE: 1000,
        INTERVAL_KNIGHT_TALKING: 500,
        INTERVAL_KNIGHT_ESCAPING: 200,
        INTERVAL_KNIGHT_FIGHTING: 1000,
        INTERVAL_CHECKING_DRAGONS: 50,
        INTERVAL_IDLE_CHECKER: 1000 * 60 * 15
    },

    Timer: {
        routineTasks: 0,
        knightTalking: 0,
        battle: 0,
        knightFighting: 0,
        dragons: 0,
        kfdragons: 0,
        idleChecker: 0
    },

    RoutineTasksMonitor: {
        start: function () {
            log("Start automated kowtow, serving tea...");
            JobManager.Timer.routineTasks = setInterval(RoutineTasksManager.checkRegularTasks, JobManager.Const.INTERVAL_ROUTINE_TASKS);
        },
        stop: function () {
            log("Stop automated Kowtow, serving tea.");
            clearInterval(JobManager.Timer.routineTasks);
        }
    },

    KnightMonitor: {
        startTalking: function () {
            log("Start talking to the knights...");
            JobManager.Timer.knightTalking = setInterval(KnightManager.talkToTheKnights, JobManager.Const.INTERVAL_KNIGHT_TALKING);
        },
        stopTalking: function () {
            log("Stop talking to the knights.");
            clearInterval(JobManager.Timer.knightTalking);
        },
        startFighting: function () {
            JobManager.Timer.knightFighting = setInterval(KnightManager.fight, JobManager.Const.INTERVAL_KNIGHT_FIGHTING);
        },
        stopFighting: function () {
            clearInterval(JobManager.Timer.knightFighting);
        }
    },

    BattleMonitor: {
        start: function () {
            log("Start battle...");
            JobManager.Timer.battle = setInterval(BattleManager.fight, JobManager.Const.INTERVAL_BATTLE);
        },
        stop: function () {
            log("Stop battle.");
            clearInterval(JobManager.Timer.battle);
        }
    },

    EscapeMonitor: {
        start: function () {
            log("Start escaping...");
            JobManager.Timer.escaping = setInterval("clickButton('escape')", JobManager.Const.INTERVAL_KNIGHT_ESCAPING);
        },
        stop: function () {
            log("Stop escaping.");
            clearInterval(JobManager.Timer.escaping);
        }
    },

    KFDragonMonitor: {
        start: function () {
            log("Start monitoring KFdragons...");
            JobManager.Timer.kfdragons = setInterval(KFDragonManager.check, JobManager.Const.INTERVAL_CHECKING_DRAGONS);
        },
        stop: function () {
            log("Stop monitoring dragons.");
            clearInterval(JobManager.Timer.kfdragons);
        }
    },

    DragonMonitor: {
        start: function () {
            log("Start monitoring dragons...");
			if (DragonBonus.length === 0)
			{
				DragonBonus.push.apply(DragonBonus,DragonBonusA);
				DragonBonus.push.apply(DragonBonus,DragonBonusB);
				DragonBonus.push.apply(DragonBonus,DragonBonusC);
				DragonBonus.push.apply(DragonBonus,DragonBonusD);
			}

            JobManager.Timer.dragons = setInterval(DragonManager.check, JobManager.Const.INTERVAL_CHECKING_DRAGONS);
        },
        stop: function () {
            log("Stop monitoring dragons.");
            clearInterval(JobManager.Timer.dragons);
        }
    },


    IdleMonitor: {
        start: function () {
            log("Start idle monitoring...");
            JobManager.Timer.idleChecker = setInterval(IdleChecker.fire, JobManager.Const.INTERVAL_IDLE_CHECKER);
        },
        stop: function () {
            log("Stop idle monitoring.");
            clearInterval(JobManager.Timer.idleChecker);
        }
    }
}

/**
*   Regular Tasks Manager
*/
var RoutineTasksManager = {
    regularTasks: [
        "public_op3",
        "work click maikuli",
        "work click duancha",
        "work click dalie",
        "work click baobiao",
        "work click maiyi",
        "work click xuncheng",
        "work click datufei",
        "work click dalei",
        "work click kangjijinbin",
        "work click zhidaodiying",
        "work click dantiaoqunmen",
        "work click shenshanxiulian",
        "work click jianmenlipai",
        "work click dubawulin"
    ].join(";"),

    checkRegularTasks: function () {
        log("Checking regular tasks...");
        ButtonManager.click(RoutineTasksManager.regularTasks);
        log("Regular tasks done.");
    }
}

class Debate {

    async selectMembers() {
        await ButtonManager.click("swords select_member huashan_feng;swords select_member xiaoyao_tonglao;swords select_member wudang_zhang;swords fight_test go");
    }

    async start() {
        await ButtonManager.click("score");
        let currentEnforce = Panels.Score.getEnforceValue();
        await ButtonManager.click('prev;auto_fight 1;enforce 0');

        await this.checkStatus();

        await ButtonManager.click('auto_fight 0;enforce ' + currentEnforce);
    }

    async checkStatus() {
        if (Panels.Notices.containsMessage("试剑胜利\\(5/5\\)！")) {
            ButtonManager.click("prev_combat;prev");
            return true;
        } else if (BattleManager.readyForHit(3)) {
            await BattleManager.perform(["排云掌"]);
        } else if (BattleManager.battleFinished()) {
            ButtonManager.click("prev_combat;swords fight_test go");
        }

        await ExecutionManager.sleep(2000);
        return await this.checkStatus();
    }
}

class Npc {
    constructor(name) {
        this._name = name;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id ? this._id : Objects.Npc.getIdByName(this._name);
    }
}

class Task {

    setNpc(npc) {
        this._npc = npc;
    }

    getNpc() {
        return this._npc;
    }

    setRoom(room) {
        this._room = room;
    }

    getRoom() {
        return this._room;
    }

    setAction(action) {
        this._action = action;
    }

    getAction() {
        return this._action;
    }

    setItem(item) {
        this._item = item;
    }

    getItem() {
        return this._item;
    }
}

/**
 * Task Manager For Gang
*/
var GenericTaskManager = {

    handleTask: async function () {
        let task = await GenericTaskManager.identifyTask();
        await Navigation.goto(task.getRoom());

        if (task.getAction()) {
            let battle = new Battle(task.getNpc());
            return await battle.start(task.getAction(), ["排云掌法"]);
        } else {
            let item = Objects.Room.getTargetObject(task.getItem());
            if (item) {
                await ExecutionManager.asyncExecute(item.attr("onclick"));
            }
        }
    },

    identifyTask: async function () {
        let task = new Task();

        let message = Panels.Notices.filterMessageObjectsByKeyword("任务所在地方好像是").last().text();
        let fightEvent = message.match("你现在的任务是(杀|战胜)(.*?)。") || message.match("给我在.*?内(杀|战胜)(.*?)。");
        if (fightEvent) {
            task.setAction({ "战胜": "fight", "杀": "kill" }[fightEvent[1]]);
            task.setNpc(new Npc(fightEvent[2]));
        } else {
            let findEvent = message.match("给我在.*?内寻找(.*?)。");
            if (findEvent) {
                task.setItem(findEvent[1]);
            }
        }

        let place = message.match("任务所在地方好像是：(.*?)你")[1].split("-");
        task.setRoom(place[place.length - 1]);

        return task;
    }
}

class Battle {
    constructor(npc) {
        this._npc = npc;
    }

    async start(action, skills) {
        this._skills = skills;

        if (!this._npc.getId()) {
            debugging("npc " + this._npc + " is not here.");
            return false;
        } else {
            await ButtonManager.click(action + " " + this._npc.getId());
            BattleManager.perform(skills);
            return await this.checkBattleStatus();
        }
    }

    async checkBattleStatus() {
        if (!Panels.Battle.containsMessage("战斗结束")) {
            if (this.readyForHit(3)) BattleManager.perform(this._skills);

            await ExecutionManager.sleep(2000);
            return await this.checkBattleStatus();
        }

        return true;
    }

    readyForHit(bufferThreshold) {
        return bufferThreshold <= Panels.Battle.getCurrentBuffer();
    }
}

var IdleChecker = {
    lastRoom: "",

    async fire() {
        await ButtonManager.click("golook_room");
        if ($("span:contains(寒玉床)").text()) return;
        if ($("span:contains(千年玄冰)").text()) return;

        let currentRoom = Objects.Room.getName();
        if (!currentRoom) return;

        if (currentRoom != IdleChecker.lastRoom) {
            IdleChecker.lastRoom = currentRoom;
        } else {
            log("Idle longer than " + JobManager.Const.INTERVAL_IDLE_CHECKER / (1000 * 60) + " min detected. Get back to home.");
            ButtonManager.click("home");
        }
    }
}

/**
*   Knight Manager
*/
var KnightManager = {
    Const: {
        KEY_KNIGHT: "浪唤雨",
        REG_SECRET_TREASURE: ".*?对你悄声道：你现在去(.*?)，.*?"
    },

    findKnight: async function (name) {
        debugging("开启奇侠列表");
        await ExecutionManager.asyncExecute("clickButton('open jhqx', 0)", 800);

        debugging("定位奇侠 " + name + " 链接" + Panels.Knights.findKnightLink(name));
        await ExecutionManager.asyncExecute(Panels.Knights.findKnightLink(name), 500);
    },

    pleaseKnight: async function (name) {
        debugging("定位奇侠" + name);
        await KnightManager.findKnight(name);

        await ExecutionManager.asyncExecute(Objects.Room.getTargetObject(name).attr("onclick"), 200);

        debugging("点击比试奇侠" + Objects.Npc.getActionLink("比试"));
        await ExecutionManager.asyncExecute(Objects.Npc.getActionLink("比试"));

        debugging("开启战斗定时器");
        JobManager.KnightMonitor.startFighting();
    },

    fight: function () {
        debugging("fight!");
        if (Panels.Battle.containsMessage("战斗结束")) {
            debugging("fight over, stop fighting timer");
            JobManager.KnightMonitor.stopFighting();
            fightAgainstPuppet();
        } else if (Panels.Battle.containsMessage("金甲符兵")) {
            debugging("发现金甲符兵，逃跑");
            clickButton("escape");
        } else if (BattleManager.readyForHit(2)) {
            debugging("施展茅山道术");
            BattleManager.perform(["茅山道术"]);
        }

        async function fightAgainstPuppet() {
            debugging("返回");
            await ButtonManager.click("prev_combat");

            debugging("点击金甲符兵开启人物界面");
            await ExecutionManager.asyncExecute(Objects.Room.getTargetObject("金甲符兵").attr("onclick"), 500);

            debugging("比试金甲符兵");
            await ExecutionManager.asyncExecute(Objects.Npc.getActionLink("比试"));

            debugging("施展剑法");
            BattleManager.perform(["九天龙吟剑法"]);
        }
    },

    prioritize: async function () {
        await ExecutionManager.asyncExecute("clickButton('open jhqx', 0)", 800);

        let info = [];
        $("tr").each(function () {
            $(this).find("td").each(function () {
                if ($(this).text() && $(this).text() != "遇剑") {
                    debugging("info pushing: " + $(this).text());
                    info.push($(this).text());
                }
            })
        });

        let knights = [];
        for (let i = 0; i < 25; i++) {
            knights.push(parseKnightInfo(info));
        }

        return sort(knights);

        function sort(knights) {
            let over25000 = knights.filter((v) => v.getProgress() >= 25000);
            over25000.sort((a, b) => a.getProgress() - b.getProgress());

            let lessThan25000 = knights.filter((v) => v.getProgress() < 25000);
            lessThan25000.sort((a, b) => b.getProgress() - a.getProgress());

            return over25000.concat(lessThan25000);
        }

        function parseKnightInfo(info) {
            let nameWithProgress = info.shift();
            let matches = nameWithProgress.match("(.*?)\\(([0-9]{0,5})\\)") || nameWithProgress.match("(.*)");
            let name = matches[1];
            let knight = new Knight(name); info.shift();
            let status = info.shift();

            knight.setAvailability(status != "师门"); info.shift();
            knight.setProgress(matches.length > 2 ? parseInt(matches[2]) : 0);
            knight.setTalked(false);

            return knight;
        }
    },

    allCandidates: [],
    askForFruits: async function () {
        if (KnightManager.allCandidates.length === 0) {
            KnightManager.allCandidates = await KnightManager.prioritize();
        }

        let candidatesDidNotTalk = getCandidatesDidNotTalk(KnightManager.allCandidates);
        if (candidatesDidNotTalk.length > 0) {
            if (!confirm(buildPromptMessage("当前未对话奇侠依次如下，确认无误继续？\n\n ", candidatesDidNotTalk))) {
                return;
            }
        } else {
            log("All talked.");
            return;
        }

        await talkToKnights(KnightManager.allCandidates);

        ButtonManager.click("home");

        function getCandidatesDidNotTalk(allCandidates) {
            let candidates = [];
            for (let i = 0; i < allCandidates.length; i++) {
                if (!allCandidates[i].getTalked()) candidates.push(allCandidates[i]);
            }
            return candidates;
        }

        async function talkToKnights(candidates) {
            log("Start talking to the knights...");
            for (let i = 0; i < candidates.length; i++) {
                if (candidates[i].getTalked()) continue;

                await KnightManager.findKnight(candidates[i].getName());

                let links = await buildConversationLinks(candidates[i].getName());
                if (links.length > 0) {
                    await ExecutionManager.asyncExecute(links, 300);
                    candidates[i].setTalked(true);
                } else {
                    if (i < 4 && !confirm(candidates[i].getName() + "现在无法对话，如要跳过继续请按 OK，否则点 Cancel 结束本轮对话。")) {
                        log("Action cancelled.");
                        break;
                    }
                }
            }
        }

        function buildPromptMessage(question, knights) {
            let message = question;
            for (let i = 0; i < knights.length; i++) {
                if (i != 0) message = message + ", "

                message = message + knights[i].getName() + "(" + knights[i].getProgress() + ")";
            }

            return message;
        }

        async function buildConversationLinks(name) {
            debugging("点击奇侠链接");
            await ExecutionManager.asyncExecute(Objects.Room.getTargetObject(name).attr("onclick"), 500);

            let links = [];
            let link = Objects.Npc.getActionLink("对话");
            if (link) {
                for (let i = 0; i < 5; i++) {
                    links.push(link);
                }
            }

            return links;
        }
    },

    findSecretTreasure: async function () {
        let room = await identifyPlace();
        let path = PathManager.getPathByRoom(room);
        if (!path) {
            log("No availalbe map for " + room);
            return;
        }

        Navigation.move(path);

        async function identifyPlace() {
            await ExecutionManager.asyncExecute("clickButton('open jhqx', 0)", 500);

            let result = Panels.Master.filterMessageObjectsByKeyword(KnightManager.Const.REG_SECRET_TREASURE).last().text().match(KnightManager.Const.REG_SECRET_TREASURE);
            return result[1];
        }
    }
}

/**
*   Battle Manager
*/
var BattleManager = {
    Const: {
        //SKILLS_COMBO: ['排云掌法', '九天龙吟剑法'],
		//SKILLS_COVER: ['紫血大法'],
		COVER_REQUIRED: 3,
        BUFFER_REQUIRED: 6,
        BUFFER_RESERVED: 1
    },

    fight: function () {
			var SKILLS_COMBO = sessionStorage.getItem("FightSkill");
			var SKILLS_COVER = sessionStorage.getItem("CoverSkill");
			let kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
			let max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
			let force=parseInt(g_obj_map.get("msg_attrs").get("force"));
			let max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));

        if (BattleManager.battleFinished()) {
            finishBattle();
        } else if (((kee<max_kee*0.5) || (force<max_force*0.3)) && BattleManager.readyForHit(BattleManager.Const.COVER_REQUIRED))
        {
			BattleManager.perform(SKILLS_COVER);
        }  else if (BattleManager.readyForHit(BattleManager.Const.BUFFER_REQUIRED + BattleManager.Const.BUFFER_RESERVED)) {
            BattleManager.perform(SKILLS_COMBO);
        }

        function finishBattle() {
            clickButton("prev_combat");
        }
    },

    battleFinished: function () {
        return Panels.Battle.containsMessage("战斗结束");
    },

    readyForHit: function (bufferThreshold) {
        return bufferThreshold <= Panels.Battle.getCurrentBuffer();
    },

    perform: function (skills) {
        ExecutionManager.execute(Panels.Battle.getSkillLinks(skills));
    },

    escape: function () {
        BattleManager.perform(["茅山道术"]);
        $("#btnEscape").click();
    }
}

/**
 * Panels
*/
var Panels = {

    Chatting: {
        filterMessageObjectsByKeyword: function (regKeyword) {
            return $("span .out3_auto").filter(function () { return $(this).text().match(regKeyword); });
        }
    },

    Notices: {
        filterMessageObjectsByKeyword: function (regKeyword) {
            return $(".out2").filter(function () { return $(this).text().match(regKeyword); });
        },

        containsMessage: function (regKeyword) {
            return Panels.Notices.filterMessageObjectsByKeyword(regKeyword).length > 0
        },

        getLastMessage: function () {
            return $(".out2").last().text();
        },
        getLastChatting: function () {
            return $(".out3_auto").last().text();
        },

        getLatestDragonLink: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织："); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestKFDragonLink: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：(.*?)21-25区(.*?)"); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestQFDragonLink1: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：段老大正在武林广场(.*?)"); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestQFDragonLink2: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：二娘正在武林广场(.*?)"); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestQFDragonLink3: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：岳老三正在武林广场(.*?)"); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestQFDragonLink4: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：云老四正在武林广场(.*?)"); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestTFLink: function () {
            return $(".out3_auto").filter(function () { return $(this).text().match("【系统】(.*?)21-25区(.*?)段老大慌不择路，逃往了(.*?)"); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestBCLink: function () {
            return $(".out2").filter(function () { return $(this).text().match("荣威镖局:(.*?)21-25区(.*?)押运镖车行至(.*?)"); }).last().html().match("(find_qinglong_road.*?)'")[1];
        },
        getLatestDragonMessage: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织："); }).last().text();
        },
        getLatestKFDragonMessage: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：(.*?)21-25区(.*?)"); }).last().text();
        },
        getLatestQFDragonMessage1: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：段老大正在武林广场(.*?)"); }).last().text();
        },
        getLatestQFDragonMessage2: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：二娘正在武林广场(.*?)"); }).last().text();
        },
        getLatestQFDragonMessage3: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：岳老三正在武林广场(.*?)"); }).last().text();
        },
        getLatestQFDragonMessage4: function () {
            return $(".out2").filter(function () { return $(this).text().match("青龙会组织：云老四正在武林广场(.*?)"); }).last().text();
        },
        getLatestTFMessage: function () {
            return $(".out3_auto").filter(function () { return $(this).text().match("【系统】(.*?)21-25区(.*?)段老大慌不择路，逃往了(.*?)"); }).last().text();
        }
    },

    Score: {
        getEnforceValue() {
            return parseInt($("span .out3").text().match("【内力】.*?/.*?\\\(\\\+(.*?)\\\)")[1]);
        }
    },

    Battle: {
        containsMessage: function (regKeyword) {
            return $(".out").filter(function () { return $(this).text().match(regKeyword); }).length > 0;
        },

        getSkillLinks: function (skills) {
            let links = [];
            $(".cmd_skill_button").filter(function () {
                return skills.includes($(this).text());
            }).each(function () {
                links.push($(this).attr("onclick"));
            })
            return links;
        },

        getCurrentBuffer: function () {
            return parseInt($("#combat_xdz_text").text());
        }
    },

    Master: {
        containsMessage: function (regKeyword) {
            return Panels.Master.filterMessageObjectsByKeyword(regKeyword).length > 0;
        },

        filterMessageObjectsByKeyword: function (regKeyword) {
            return $(".out").filter(function () { return $(this).text().match(regKeyword); });
        }
    },

    Skills: {
        group: ["my_skills attack", "my_skills recovery", "my_skills force", "my_skills known"],
        defaultSkills: ["enableskill enable parry iron-sword"],

        findCurrentSkillIds: async function () {
            await ButtonManager.click("enable");

            SkillManager.oldSkillIds = ["parry iron-sword"];
        },

        findSkillIdByStatus: async function (status) {
			SkillManager.newSkillId = 0;
            for (let i = 0; i < Panels.Skills.group.length; i++) {
                await ButtonManager.click(Panels.Skills.group[i]);

                let findStatus = $("span .out2:contains(" + status + ")");
                if (findStatus.length) {
                    SkillManager.newSkillId = findStatus.parent().parent().attr("onclick").match(".*?skills info .*? (.*)'\\\)")[1];
                    break;
                }
            }
        },

        findSkillIdByName: async function (name) {
            for (let i = 0; i < Panels.Skills.group.length; i++) {
                await ButtonManager.click(Panels.Skills.group[i]);

                let findStatus = $("span .out3:contains(" + name + ")");
                if (findStatus.length) {
                    SkillManager.newSkillId = findStatus.parent().parent().attr("onclick").match(".*?skills info .*? (.*)'\\\)")[1];
                    break;
                }
            }
        },
        findStatusByName: async function (name) {
            for (let i = 0; i < Panels.Skills.group.length; i++) {
                await ButtonManager.click(Panels.Skills.group[i]);

                let findStatus = $("span .out3:contains(" + name + ")");

                if (findStatus.length) {
                    SkillManager.status = findStatus.next().text();
                    break;
                }
            }
        }
    },

    Knights: {
        findKnightLink: function (knight) {
            return $("a").filter(function () { return $(this).text() === knight; }).attr("href");
        }
    }
}

/**
 * Objects
*/
var Objects = {
    Room: {
        filterTargetObjectsByKeyword: function (regKeyword) {
            return $(".cmd_click3").filter(function () { return $(this).text().match(regKeyword); });
        },

        getTargetObject: function (name) {
            return $(".cmd_click3").filter(function () { return $(this).text() === name; });
        },

        searchTargetObject: function (name) {
            return $(".cmd_click3").filter(function () { return $(this).text().indexof(name); });
        },

        hasNpc: function (name) {
            return Objects.Room.getTargetObject(name).length > 0;
        },

        LikeNpc: function (name) {
            return Objects.Room.searchTargetObject(name).length > 0;
        },

        getName: function () {
            return $(".out").find(".outtitle").text();
        },

        getAvailableNpcs() {
            let npcs = [];
            $(".cmd_click3").each(function () {
                npcs.push(new Npc($(this).text()));
            })

            return npcs;
        }
    },

    Npc: {
        getActionLink: function (action) {
            return $(".cmd_click2").filter(function () { return $(this).text() === action; }).attr("onclick");
        },

        triggerAction: async function (npc, action) {
            await ExecutionManager.asyncExecute(Objects.Room.getTargetObject(npc.getName()).attr("onclick"), 200);
            await ExecutionManager.asyncExecute(Objects.Npc.getActionLink("观战"));
        },

        getIdByName: function (name) {
            let find = Objects.Room.getTargetObject(name).last();
            if (find.length > 0) {
                return find.attr("onclick").match(".*?look_npc (.*?)'")[1];
            }
        }
    }
}

class Skill {
    constructor(name) {
        this._name = name;
    }

    getCode() {
        return this._code;
    }

    setCode(code) {
        this._code = code;
    }

    isEnabled() {
        return this._isEnabled;
    }

    setEnable(isEnabled) {
        this._isEnabled = isEnabled;
    }

    selectedForAttack() {
        return this._selectedForAttack;
    }

    setSelectedForAttack(selectedForAttack) {
        this._selectedForAttack = selectedForAttack;
    }
}

var SkillManagerV2 = {

    async getSkillsEnabled() {
        await ButtonManager.click("skills");

        let skills = [];
        $("button.cmd_click3").each(function () {
            let name = $(this).text();
            if (!name.match("一键")) {
                let skill = new Skill(name.replace("*", ""));
                skill.setSelectedForAttack(name.substr(0, 1) === "*");
                skills.push(skill);
            }
        });

        return skills;
    },

    getSkillsSelectedForAttack() {

    },

    getSkillCodeByName(name) {

    },

    getSkillInPractice() {

    },

    enableSkill(skill) {

    },

    selectForAttack(skill) {

    },

    practice(skill) {

    }

}

/**
 * Skill Manager
 */
var SkillManager = {
    oldSkillIds: [],
    newSkillId: 0,
	status: "",

    defaultSkillsEnabled: [
        "enableskill enable paiyun-zhang attack_select",
        "enableskill enable unarmed rulai-zhang",
        "enableskill enable jiutian-sword attack_select",
        "enableskill enable iron-sword",
        "enableskill enable dzxinmojing attack_select",
        "enableskill enable force yijinjing",
		"enableskill enable wanliuguiyi attack_select",
        "enableskill enable dodge yyhuanxubu",
        "enableskill enable parry liumai-shenjian",
        "enableskill enable parry xianglong-zhang"
    ].join(";"),

    restartPractice: async function () {
        await Panels.Skills.findCurrentSkillIds();

        await Panels.Skills.findSkillIdByStatus("练习中");
        if (!SkillManager.newSkillId) {
            let answer = prompt("没有检查到任何技能在练习中。请指定需要练习的技能名字？");
            if (!answer) return;

            log("answer=" + answer);
            await Panels.Skills.findSkillIdByName(answer);
            if (!SkillManager.newSkillId) {
                log("Skill " + answer + " doesn't exist. Action cancelled.");
                return;
            }
        }

        ButtonManager.click("practice stop;enable " + SkillManager.newSkillId + ";practice " + SkillManager.newSkillId);
    },

    restartTupo: async function () {

		let Tuposkills = sessionStorage.getItem("Tuposkills");
		answer = Tuposkills.split(",");

		for (let i = 0; i < answer.length; i++) {
			await Panels.Skills.findSkillIdByName(answer[i]);
			if (!SkillManager.newSkillId) {
				log("Skill " + answer[i] + " doesn't exist. Action cancelled.");
				return;
			}
			ButtonManager.click("tupo_speedup " + SkillManager.newSkillId + " go" + ";tupo_speedup2 " + SkillManager.newSkillId + " go");
			await ExecutionManager.sleep(500);
		}
        await Panels.Skills.findSkillIdByStatus("突破中");
        if (!SkillManager.newSkillId) {
			for (let i = 0; i < answer.length; i++) {
				await Panels.Skills.findSkillIdByName(answer[i]);
				if (!SkillManager.newSkillId) {
					log("Skill " + answer[i] + " doesn't exist. Action cancelled.");
					return;
				}
				ButtonManager.click("enable " + SkillManager.newSkillId + ";tupo go," + SkillManager.newSkillId);
				await ExecutionManager.sleep(500);
			}
		}
    },

    reEnableSkills: function () {
        ButtonManager.click(SkillManager.defaultSkillsEnabled, 500);
    }
}

/**
 * Button Manager
 */
var ButtonManager = {

    click: async function (actionString, delay = 200) {
        let array = actionString.split(";").extract();

        for (let i = 0; i < array.length; i++) {
            await ExecutionManager.asyncExecute("clickButton('" + array[i] + "')", delay);
        }
    },

    toggleButtonEvent: function (button) {
        let statusOn = false;

        if (button.innerText != button.name) {
            button.innerText = button.name;
            button.style.color = "";
        } else {
            button.innerText = 'x ' + button.name;
            button.style.color = "red";

            statusOn = true;
        }

        return statusOn;
    },

    resetButtonById: function (buttonId) {
        let button = $("#" + buttonId);
        if (button.css('color') != 'rgb(0, 0, 0)') button.click();
    },

    clickButtonById: function (buttonId) {
        let button = $("#" + buttonId);
        //if (button.css('color') == 'rgb(0, 0, 0)') button.click();
		button.click();
    }
}

/**
 * Execution Manager
*/
var ExecutionManager = {

    execute: function (commands) {
        for (let i = 0; i < commands.length; i++) eval(commands[i]);
    },

    asyncExecute: async function (commands, delay = 200) {
        if (!Array.isArray(commands)) commands = [commands];

        for (let i = 0; i < commands.length; i++) {
            await eval(commands[i]);
            await ExecutionManager.sleep(Math.floor(Math.random() * 50 + delay));
        }
    },

    sleep: async function (timeout) {
        return new Promise((resolve, reject) => { setTimeout(function () { resolve(); }, timeout); });
    }
}


/**
 * Path Manager
*/
var PathManager = {
    getTraversalPathByCity: function (city) {
        return PathManager.Const.CITIES[city];
    },

    getPathByRoom: function (room) {
        return PathManager.Const.ROOMS[room];
    },

    getPathByNpc: function (npc) {
        return PathManager.Const.NPC[npc];
    },

    getPathForSpecificEvent: function (event) {
        return PathManager.Const.OTHER[event];
    },

    getPathByTarget: function (target) {
        return PathManager.Const.NPC[target] || PathManager.Const.ROOMS[target];
    },

    Const: {
        CITIES: {
            "雪亭镇": "jh 1;inn_op1;n;s;w;e;e;w;s;e;s;w;w;e;s;n;e;e;ne;ne;sw;sw;n;w;n;w;e;e;e;n;s;e;e;n;s;s;n;e;w;w;w;w;w;n;w;e;n;w;e;e;e;w;w;n;w;e;e;w;n",
            "洛阳": "jh 2;n;n;e;s;luoyang317_op1;n;n;w;n;w;putuan;n;e;e;s;n;w;n;e;s;n;w;w;s;w;e;n;event_1_98995501;n;w;e;n;e;w;s;s;s;e;n;w;s;luoyang111_op1;e;n;n;n;w;e;s;s;w;n;w;get_silver;s;e;n;n;e;get_silver;n;w;s;s;s;e;e;e;n;op1;s;s;e;n;n;w;e;e;n;s;w;n;w;e;n;e;w;n;w;e;s;s;s;s;s;w;w;n;w;e;e;n;s;w;n;e;w;n;w;luoyang14_op1;n;e;e;w;n;e;n;n;s;s;w;n;n;n;n;",
            "华山村": "jh 3;n;e;w;s;w;n;s;e;s;e;n;s;w;s;e;s;huashancun24_op2;w;n;w;w;n;s;e;s;s;w;n;s;e;s;e;w;nw;jh 3;w;event_1_59520311;n;n;w;get_silver;s;e;n;n;e;get_silver;n;w;n;e;w;s;s;s;s;s;e;e",
            "华山": "jh 4;n;n;w;e;n;e;w;n;n;n;e;n;n;event_1_91604710;s;s;s;w;e;s;e;w;n;n;n;n;nw;s;s;w;n;n;s;n;w;w;n;get_xiangnang2;w;s;e;e;n;n;w;e;n;n;w;e;e;n;n;s;s;s;s;n;n;w;n;get_silver;s;s;s;s;s;e;n;n;w;e;n;e;w;n;e;w;n;s;s;s;s;s;w;n;w;event_1_30014247;s;w;e;s;e;w;s;s;s;e",
            "扬州": "jh 5;n;e;#3 w;n;s;e;e;n;e;w;w;e;n;w;e;n;w;yangzhou16_op1;e;e;n;w;w;s;s;#5 n;s;e;w;w;#3 n;#3 s;e;s;s;#3 e;#3 n;s;s;w;#3 n;e;n;n;s;s;e;s;s;w;n;ns;s;e;s;w;s;w;n;w;e;e;n;n;w;get_silver;s;e;e;w;n;n;#4 s;w;n;w;e;e;get_silver;s;w;n;w;w;n;get_silver;s;s;w;#3 e;n;e;s;e;#3 s;#3 n;w;n;w;n;ne;sw;s;w;s;n;w;n;e;w;w;e;n;n;w;n;s;e;e;s;n;w;n",
            "丐帮": "jh 6;event_1_98623439;s;w;e;n;ne;ne;ne;sw;sw;n;ne;ne;ne;event_1_97428251",
            "乔阴县": "jh 7;#3 s;w;s;#3 w;#4 e;event_1_65599392;w;e;n;s;ne;s;s;e;n;n;e;w;s;s;w;s;#3 w;n;s;s;e;n;s;e;ne;s;e;n;e;s;e",
			"峨眉山": 'jh 8;w;nw;#4 n;w;e;se;nw;e;n;s;e;n;n;e;#4 n;e;e;w;w;w;#3 n;#4 w;sw;ne;n;s;e;e;s;s;e;w;w;e;n;e;w;w;e;n;n;e;w;w;e;n;e;w;w;e;n;#3 w;#3 n;#3 s;#9 e;w;w;s;e;w;w;e;s;e;w;w;e;s;w;#3 e;w;w;s;e;w;w;e;s;e;w;w;e;n;n;w;w;#4 n;w;w;e;n;s;e;#4 n;s;s;nw;sw;w;nw;w;e;se;e;ne;nw;n;n;s;s;se;se;ne;se;s;se;nw;n;nw;ne;n;s;se;e',
            "恒山": "jh 9;n;w;e;n;e;get_silver;w;w;n;w;e;n;e;w;henshan15_op1;e;n;event_1_85624865;n;w;e;e;w;n;n;henshan_zizhiyu11_op1;e;n;#4 s;w;n;n;w;n;s;s;n;#3 e;w;n;s;w;n;n;w;n;e;henshan_qinqitai23_op1;s;w;n;n;n;s;w;get_silver",
            "武当山": "jh 10;w;n;n;#3 w;#5 n;w;n;s;#5 e;w;w;s;n;w;w;#4 n;#5 s;#4 e;s;e;s;e;n;s;s;n;e;e;n;s;e;w;#3 s",
            "晚月庄": "jh 11;s;e;s",
            "水烟阁": "jh 12;n;e;w;#3 n;s;w;n;n;e;w;s;nw;e;n;s;e;sw;n;s;s;e",
            "少林寺": "jh 13;e;s;s;w;w;w;e;e;n;n;w;n;w;w;n;shaolin012_op1;s;s;e;e;n;w;e;e;w;n;n;w;e;e;w;n;n;w;e;e;w;n;shaolin27_op1;event_1_34680156;s;w;n;w;e;e;w;n;shaolin25_op1;w;n;w;#8 s;#8 n;e;e;#8 s;#8 n;w;n;w;e;e;w;n;w;n;get_silver",
            "唐门": "jh 14;w;#4 n;s;#4 w;e;n;s;s;n;e;n;s;s;n;e;n;s;s;n;e;e;s;n;e;n;e;w;n;n;s;#3 ask tangmen_tangmei;e;event_1_8413183;event_1_39383240;e;s;e;n;w;n;n;" + "s;s" + "jh 14;e;event_1_10831808;n;s;s;w;sw;s;e;s;s;sw;sw;w;w;s;s;e",
            "逍遥林": "jh 16;#4 s;e;e;s;w;n;#3 s;n;n;w;n;n;#4 s;n;n;w;w;n;s;s;n;w;#6 e;n;n;e;event_1_5221690;s;w;event_1_57688376;n;n;w;n;s;w;#3 e;n;s;e;n;n;w;n;e",
            "开封": "jh 17;n;w;e;e;s;n;w;n;w;n;n;#3 s;n;#3 e;s;#3 n;s;get_silver;e;s;w;#3 s;w;e;s;w;e;n;e;n;s;s;n;e;e;#3 w;#3 n;w;n;e;w;n;e;#3 w;n;s;s;n;w;s;s;w;e;#4 n;w;e;s;s;w;#4 e;n;e;#3 n;event_1_27702191;w;#3 s;w;#5 s;e;#3 s;e;kaifeng_yuwangtai23_op1;s;w;s;s;w;e;#5 n;w;event_1_97081006;#5 s;w;w;e;kaifeng_yezhulin05_op1;s;e;n;n;e;kaifeng_yezhulin23_op1;jh 17;sw;nw;se;s;sw;nw;ne;event_1_38940168",
            "光明顶": "jh 18;e;w;w;n;s;e;n;nw;sw;ne;n;n;w;e;#3 n;ne;n;n;w;e;e;w;n;w;e;e;w;#4 n;e;w;n;e;w;w;e;n;w;nw;nw;se;se;w;#4 s;n;e;e;n;w;#3 e;s;w;e;se;se;e;w;nw;nw;n;n;ne;sw;n;w;w;#3 n;w;e;n;event_1_90080676;event_1_56007071;nw;ne;n;nw",
            "全真教": "jh 19;#3 s;sw;s;e;n;nw;#4 n;e;w;w;e;n;#3 w;s;n;w;s;n;#5 e;n;s;e;e;w;n;n;s;s;w;w;n;n;w;w;s;s;n;n;w;s;s;n;n;w;#4 n;e;n;#3 s;e;n;n;w;e;e;s;s;n;n;e;n",
            "古墓": "jh 20;w;w;s;e;#5 s;sw;sw;s;s;e;w;#4 s",
            "白驼山": "jh 21;#4 n;#4 s;nw;s;n;w;n;s;w;nw;e;w;nw;nw;n;w;sw;jh 21;nw;w;w;nw;n;e;w;n;n;w;e;n;n;e;e;w;ne;sw;e;se;nw;w;n;s;s;n;w;w;#4 n;#3 s;#4 e;n;n;e;e;w;w;w;e;n;nw;se;ne;e;w;n;jh 21;nw;ne;ne;sw;n;n;ne;w;e;n;n;w;w"
        },

        NPC: {
            "野狗": "jh 1;e;e;s;ne",
            "青竹蛇": "jh 2;#9 n;e",
            "朱先生": "jh 5;#5 n;e;#3 n",
            "贵公子": "jh 7;#6 s;e;n",
            "游方郎中": "jh 15;n",
            "村妇": "jh 18;w",
            "樵夫": "jh 21;nw;w;w;#3 nw",
            "店老板": "jh 26;#6 w;s;e",
            "牧羊人": "jh 28;n",
            "星宿派钹手": "jh 28;n;n",
            "慕容老夫人": "jh 32;n;n;se;n",
            "黑袍老人": "jh 34;ne;#5 e;n;e;n",
            "神仙姐姐": "jh 32;n;n;se;#4 n;#3 w;n;w;n;e;n;e;n;e",
            "玉娘": "jh 2;#5 n;w;w;#3 n;e",
            "村姑": "jh 21;nw;w;w",
            "黑狗": "jh 3;#3 s",
            "芳绫": "jh 11;s;e;s;sw;se;w;w;n;w",
            "农夫": "jh 1;e;s;w",
            "老农夫": "jh 1;e;s;w",
            "李火狮": "jh 1;e;n;e;e",
            "收破烂的": "jh 1;e;n;n",
            "泼皮头子": "jh 3;s",
            "卖饼大叔": "jh 7;s",
            "守城武将": "jh 2;#8 n",
            "安惜迩": "jh 1;e;n;w",
            "山蛇": "jh 9;#5 n",

            "柳绘心": "jh 1;e;n;e;e;e;e;n",
            "王铁匠": "jh 1;e;n;n;w",
            "杨掌柜": "jh 1;e;n;n;n;w",
            "柳小花": "jh 2;n;n;n;n;w;s;w",
            "卖花姑娘": "jh 2;n;n;n;n;n;n;n",
            "客商": "jh 2;n;n;e",
            "刘守财": "jh 2;n;n;n;n;n;n;n;e",
            "方老板": "jh 3;s;s;e",
            "方寡妇": "jh 3;s;s;w;n",
            "朱老伯": "jh 3;s;s;w"
        },

        ROOMS: {
            "书房": "jh 1;e;n;e;e;e;e;n",
            "打铁铺子": "jh 1;e;n;n;w",
            "桑邻药铺": "jh 1;e;n;n;n;w",
            "南市": "jh 2;n;n;e",
            "钱庄": "jh 2;n;n;n;n;n;n;n;e",
            "绣楼": "jh 2;n;n;n;n;w;s;w",
            "北大街": "jh 2;n;n;n;n;n;n;n",
            "石板桥": "jh 3;s;s;s",
            "杂货铺": "jh 3;s;s;e",
            "祠堂大门": "jh 3;s;s;w",
            "厅堂": "jh 3;s;s;w;n",
            "桃花泉": "jh 3;#5 s;nw;n;n;e",
            "潭畔草地": "jh 4;#7 n;event_1_91604710;s;s;s",
            "千尺幢": "jh 4;#4 n",
            "玉女峰": "jh 4;#8 n;w",
            "山坳": "jh 1;e;#5 n",
            "九老洞": 'jh 8;w;nw;n;n;n;n;e;e;n;n;e;n;n;n;n;w;n;n;n;n;n;n;n;n;n;nw;sw;w;nw;w',
            "猢狲愁": "jh 4;#6 n;e;n;n",
            "长空栈道": "jh 4;#9 n;e",
            "临渊石台": "jh 4;#9 n;e;n",
            "沙丘小洞": "jh 6;event_1_98623439;ne;n;ne;ne;ne;event_1_97428251",
            "悬根松": "jh 9;n;w",
            "夕阳岭": "jh 9;n;n;e",
            "青云坪": "jh 13;e;s;s;w;w",
            "玉壁瀑布": "jh 16;#4 s;e;n;e",
            "湖边": "jh 16;#4 s;e;n;e;event_1_5221690;s;w",
            "碧水寒潭": "jh 18;n;nw;#5 n;ne;#5 n;e;e;se;se;e",
            "寒水潭": "jh 20;w;w;s;e;#5 s;sw;sw;s;e;se",
            "悬崖": "jh 20;w;w;s;e;#5 s;sw;sw;s;s;e",
            "戈壁": "jh 21",
            "山溪畔": "jh 22;n;n;w;#4 n;look_npc songshan_songshan7;event_1_88705407;s;s",
            "启母石": "jh 22;n;n;w;w",
            "卢崖瀑布": "jh 22;#3 n;#5 escape;n;e;n",
            "无极老姆洞": "jh 22;n;n;w;#4 n",
            "奇槐坡": "jh 23;#8 n",
            "小洞天": "jh 24;#4 n;e;e",
            "云步桥": "jh 24;#9 n",
            "观景台": "jh 24;#12 n;e;e;n",
            "天梯": "jh 24;#3 n",
            "危崖前": "jh 25;w",
            "草原": "jh 26;w",
            "无名山峡谷": "jh 29;#4 n",
            "无名峡谷": "jh 29;#4 n;event_1_60035830;event_1_65661209",
            "饮风客栈": "jh 1",
            "龙门石窟": "jh 2",
            "华山村村口": "jh 3",
            "华山山脚": "jh 4",
            "安定门": "jh 5",
            "树洞内部": "jh 6",
            "乔阴县城北门": "jh 7",
            "十二盘": "jh 8",
            "大字岭": "jh 9",
            "林中小路": "jh 10",
            "竹林": "jh 11",
            "青石官道": "jh 12",
            "丛林山径": "jh 13",
            "少林寺山门": "jh 13;n",
            "蜀道": "jh 14",
            "北郊": "jh 15",
            "青石大道": "jh 16",
            "朱雀门": "jh 17",
            "小村": "jh 18",
            "终南山路": "jh 19",
            "山路": "jh 20",
            "戈壁": "jh 21",
            "淳风武馆大门": "jh 1;e;n;e",
            "桑邻药铺": "jh 1;e;#3 n;w",
            "中心鼓楼": "jh 2;#5 n",
            "山脚": "jh 3;#5 s;nw",
            "神女冢": "jh 3;n;e",
            "华山村村口": "jh 3",
            "银杏广场": "jh 3;s;s",
            "后院": "jh 4;#12 n",
            "厨房": "jh 4;#12 n;w",
            "崎岖山路": "jh 4;#6 n;e;n;n;event_1_91604710",
            "十里长街3": "jh 5;n;n",
            "十里长街6": "jh 5;#8 n",
            "树王坟内部": "jh 7;#3 s;w;s;#3 w;#4 e;event_1_65599392;n",
            "福林酒楼": "jh 7;#6 s;e;n",
            "火龙将军庙": "jh 7;#7 s;sw;w",
            "长廊": "jh 9;#8 n",
            "鸡叫石": "jh 9;#3 n;w",
            "见性峰山道": "jh 9;#5 n",
            "秘道": "jh 9;#4 n;henshan15_op1",
            "茶室": "jh 10;w;n;n;#3 w;#5 n;e;e;e",
            "蜿蜒小径": "jh 11;s;e;s",
            "武当牌坊": "jh 10;w;n;n;w;w",
            "黄土路": "jh 10;w;n;n;w",
            "桃园小路": "jh 10;w;n;n;#3 w;#4 n;#4 e;s;e;s;e;n",
            "羊肠小道": "jh 17;event_1_97081006",
            "丛林山径": "jh 13",
            "唐门厨房": "jh 14;w;#3 n;e;s",
            "北郊": "jh 15",
            "镖局车站": "jh 15;#3 s;w;w;n",
            "练武场": "jh 15;#3 s;w;w;s;s",
            "福州大街": "jh 15;s;s",
            "酒家二楼": "jh 15;s;s;w;n",
            "小木屋": "jh 16;#4 s;e;e;s;w;n;s;w;n;n",
            "湖边": "jh 16;#4 s;e;n;e;event_1_5221690;s;w",
            "朱雀门": "jh 17",
            "柳树林": "jh 17;#5 n;e;#3 n",
            "杂草小路": "jh 17;event_1_97081006;s",
            "卧房": "jh 18;w;n",
            "民居": "jh 18;w",
            "小饭厅": "jh 18;e;w;w;n;s;e;n;nw;sw;ne;n;n;w;e;#3 n;ne;#9 n;w;nw",
            "终南石阶": "jh 19;#3 s;sw;s;e;n;nw",
            "终南山游客": "jh 19;#3 s;sw;s;e;n;nw",
            "大堂一进": "jh 19;#3 s;sw;s;e;n;nw;#4 n",
            "蜂屋": "jh 20;w;w;s;e;#5 s;sw;sw;#6 s",
            "草地": "jh 20;w;w;s;e;#5 s;sw;sw;s",
            "悬崖": "jh 20;w;w;s;e;#5 s;sw;sw;s;s;e",
            "打铁铺": "jh 21;nw;s",
            "花园": "jh 21;nw;w;w;nw;#7 n",
            "嵩岳山道": "jh 22;n;n;w;n",
            "魔云洞口": "jh 22;n;n;w;w;s",
            "山楂林": "jh 22;n;n;w;#5 n",
            "石板路": "jh 24;#4 n",
            "桃花路": "jh 24;#12 n;w;n",
            "海边路": "jh 25;#3 e",
            "八角街": "jh 26;#6 w;s;s;#4 w",
            "驿站": "jh 26;#6 w;s;w",
            "子午楼": "jh 27;ne;w",
            "天山山路": "jh 28;n;n",
            "伊犁": "jh 28;nw",
            "巴依家院": "jh 28;nw;e",
            "星宿海": "jh 28;#4 n;ne;nw",
            "百龙山": "jh 28;n;#4 w;n",
            "三清宫厨房": "jh 29;#4 n;#3 event_1_60035830;event_1_65661209;#7 n;event_1_98579273;e",
            "三清宫储藏室。": "jh 29;#4 n;#3 event_1_60035830;event_1_65661209;#7 n;event_1_98579273;n;e",
            "兵器室": "jh 30;#10 n;w;w",
            "练功室": "jh 31;#3 n;#4 w;#4 n;w",
            "羊肠小道": "jh 31;#3 n",
            "云锦二楼": "jh 32;n;n;se;#4 n;#3 w;n;w;n;e;n;e;n;n",
            "山庄门口": "jh 32;n;n",
            "雅致大厅": "jh 32;n;n;se;n",
            "白曲湖": "jh 32;n;n;se;#4 n;#3 w;n;w",
            "碧鸡山顶": "jh 33;sw;sw;#4 s;#4 e;se;s;e",
            "剑川镇": "jh 33;sw;sw;#3 s;nw;n;nw;n",
            "下棋亭": "jh 34;ne;#5 e;n;e;n",
            "花路": "jh 34;ne;#5 e;#3 n;#3 w;n;n;yell;#3 n",
            "冰湖": "jh 5;#10 n;ne;chuhaigo;#3 nw;n;ne;nw;w;nw;#5 e;se;e",
            "海边": "jh 25;#5 e;s",
            "巨石": "jh 18;n;nw;#5 n",

            "星宿海-杂货铺-买卖提|寻找火折": "jh 28;nw;w;buy /map/xingxiu/npc/obj/fire from xingxiu_maimaiti;clan submit_task",
            "星宿海-天山山路|战胜狮吼师兄": "jh 28;n;n;",
        },

        OTHER: {
            "扬州出发钓鱼加玄铁": "jh 5;#10 n;ne;chuhaigo;#3 nw;n;ne;nw;w;nw;#5 e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;cancel_prompt;s;e;s;e;s;s;e",
            "钓鱼加玄铁": "jh 35;#3 nw;n;ne;nw;w;nw;#5 e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;cancel_prompt;s;e;s;e;s;s;e"
        }
    }
}

/**
 * Maps Manager
 */
var Navigation = {

    traversal: async function (city, target) {
        let path = PathManager.getTraversalPathByCity(city);
        if (!path) {
            log("No available map for " + city + " for now.");
            return;
        }

        let steps = path.split(";").extract();
        for (let i = 0; i < steps.length; i++) {
            await Navigation.move(steps[i]);

            if (Panels.Notices.getLastMessage().match("这儿没有这个方向")) {
                log("Wrong path: " + steps[i] + ", at " + Objects.Room.getName());
                break;
            }

            if (Objects.Room.getName() === target || Objects.Room.LikeNpc(target)) break;
        }
    },

    goto: async function (target) {
        let path = PathManager.getPathByTarget(target);
        if (path) {
            await Navigation.move(path);
        } else if (1) {
            await Navigation.move("find_family_quest_road");
            await Navigation.move("find_clan_quest_road");
        } else {
            log("No available path for " + target);
        }
    },

    move: async function (path) {
        let steps = path.split(";").extract();

        for (let i = 0; i < steps.length; i++) {
            await ExecutionManager.asyncExecute("clickButton('" + steps[i] + "')");

            if (Navigation.checkRisk()) {
                Navigation.escape();
                break;
            }
        }
    },

    checkRisk: function () {
        return Panels.Notices.getLastMessage().match("^看起来火麒麟王想杀死你！");
    },

    escape: function () {
        BattleManager.perform(["茅山道术"]);
        $("#btnEscape").click();
    }
}

function log(message) {
    console.log(message);
}

function debugging(message) {
    if (CONST_DEBUG_MODE) console.log("debugging: " + message);
}

Array.prototype.extract = function () {
    let result = [];

    for (let i = 0; i < this.length; i++) {
        if (this[i].charAt(0) === "#") {
            let r = this[i].match("#(.*?) (.*)");
            let repeatTimes = parseInt(r[1]);
            for (let j = 0; j < repeatTimes; j++) {
                result.push(r[2]);
            }
        } else {
            result.push(this[i]);
        }
    }

    return result;
}

/**
 * DailyTasks Bar Setup
*/

var DailyTasksConfigurations = [{
    subject: "Daily Tasks|日常签到",

    buttons: [{
        label: 'CheckIn1|逢义礼包',
        title: "分享、挂机潜能、逢义礼包",
		id : "CheckIn1",

        eventOnClick() {
            CheckIn1();
        }
    }, {
        label: 'vip Tasks|一键VIP',
        title: '领通勤、师门25次、帮派60次、挖宝钓鱼、副本扫荡、帮派线香、帮派购买秘籍狗卷谜题令金锭。',
		id : "vip",

        eventOnClick() {
            shimenvipFunc();
        }
    }, {
        label: 'CheckIn2|洛阳扬州',
        title: "黄记杂货签到、双儿礼包、领取投资、观海庄莲蓬",
		id : "CheckIn2",

        eventOnClick() {
            CheckIn2();
        }
    }, {
        label: 'CheckIn3|武馆签到',
        title: '武馆签到、柳绘心礼包',
		id : "CheckIn3",

        eventOnClick() {
            CheckIn3();
        }
    }, {
        label: 'CheckIn5|特殊签到',
        title: '各种奇葩礼包',
		id : "CheckIn5",

        eventOnClick() {
            CheckIn5();
        }
    }, {
        label: "DailyTask|日常潜能",
        title: "闯楼、喂鳄鱼、侠客岛、大招破阵、冰火岛",
		id : "DailyTask",

        eventOnClick() {
            CheckIn4();
        }
    }, {
        label: 'qingcheng|青城白驼',
        title: "自动青城白陀",
		id : "qingcheng",

        eventOnClick() {
            qingcheng();
        }
    }, {
        label: 'emhs|峨眉恒山',
        title: "自动峨眉恒山",
		id : "emhs",

        eventOnClick() {
            emhs();
        }
    }, {
        label: 'em|峨眉军令',
        title: "自动峨眉军令",
		id : "em",

        eventOnClick() {
            em();
        }
    }, {
        label: 'btqx|白驼奇袭',
        title: "自动白驼奇袭",
		id : "btqx",

        eventOnClick() {
			btqx();
        }
    }, {
        label: 'slfm|少林伏魔',
        title: '少林伏魔...',
		id : "slfm",

        eventOnClick() {
            slfm();
        }
    },{
        label: 'dumo|明教毒魔',
        title: '明教毒魔...',

        eventOnClick() {
            go('jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;n;n;n;n;w;nw;nw;event_1_15705584;event_1_70957287');
        }
    }, {
        label: 'TianShanfuqishi|天山傅奇士',
        title: '天山傅奇士...',

        eventOnClick() {
            TianShanfuqishi();
        }
    }, {
        label: 'Muren|十八木人',
        title: "十八木人",
		id : "Muren",

        eventOnClick() {
            Muren();
        }
    },{
        label: 'Juesha|四大绝杀',
        title: "四大绝杀",
		id : "Juesha",

        eventOnClick() {
            Juesha();
        }
    },{
        label: 'SheNiao|星宿射鸟',
        title: '星宿射鸟...',

        eventOnClick() {
            go('daily go 17');
        }
    }, {
        label: 'Miaojianglianyao|苗疆炼药',
        title: "自动苗疆炼药",
		id : "Miaojianglianyao",

        eventOnClick() {
            Miaojianglianyao();
        }
    }, /*{
        label: 'Yunmenggaobao|云梦高暴',
        title: "自动云梦高暴",

        eventOnClick() {
            go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;w;w;n;w;event_1_712982 go;home;daily finish 12;');
		}
    }, {
        label: 'Yangzhoutingqin|扬州听琴',
        title: "自动扬州听琴",

        eventOnClick() {
            go('daily finish 14;');
		}
    }, */
     {
        label: 'TianShanDaZuo|天山打坐',
        title: "自动天山打坐,自动购买御寒衣，自动打掌门手谕",
		id : "TianShanDaZuo",

        eventOnClick() {
            TianShanDaZuo();
        }
    }, {
        label: 'DaChengWangWu|大乘忘武',
        title: "大乘忘武",
		id : "DaChengWangWu",

        eventOnClick() {
            DaChengWangWu();
        }
    }, {
        label: 'PoZhangChuMo|破障除魔',
        title: "大乘忘武",
		id : "PoZhangChuMo",

        eventOnClick() {
            PoZhangChuMo();
        }
    }, {
        label: 'Xunhua|闻香寻芳',
        title: "闻香寻芳",
		id : "Xunhua",

        eventOnClick() {
            Xunhua();
        }
    },{
        label: 'Poshi|破石寻花',
        title: "破石寻花",
        id : "Poshi",

        eventOnClick() {
            Poshi();
        }
    },{
        label: 'Jiaren|佳人觅香',
        title: "佳人觅香",
        id : "Jiaren",

        eventOnClick() {
            Jiaren();
        }
    },{
        label: 'answerQuestion|自动答题',
        title: "自动答题",
		id : "answerQuestion",

        eventOnClick() {
            answerQuestionFunc();
        }
    }, {
        label: 'PaiHang|打排行榜',
        title: "打排行榜",
		id : "paihang",

        eventOnClick() {
            PaiHangFunc();
        }
    }, {
        label: "BingYue|自动冰月",
        title: "自动冰月",
		id : "BingYue",

        eventOnClick() {
			BingYueGu();
        }
    },{
        label: 'Benliugaotu|本六门神',
        title: '本六四门物品...',
		id : "Benliugaotu",

        eventOnClick() {
            Benliugaotu();
        }
    }, {
        label: 'DaZhaoBiHua|大招壁画',
        title: '大招壁画...',
		id : "DaZhaoBiHua",

        eventOnClick() {
            DaZhaoBiHua();
        }
    },{
        label: 'ShiJian|每日试剑',
        title: "每日试剑",
		id : "shijian",

        eventOnClick() {
            ShiJianFunc();
        }
    }, {
        label: 'DaTongRen|自动铜人',
        title: '自动铜人，请事先将卡好必刷，下完全部技能的状态设定为技能三',
		id : "DaTongRen",

        eventOnClick() {
            DaTongRen();
        }
    },{
        label: 'kuaben1|跨1自动',
        title: "自动跨1小怪",
        id : "kuaben1",

        eventOnClick() {
            kuaben1();
        }
    }, {
        label: 'kuaben3|跨3自动',
        title: "自动跨3小怪",
        id : "kuaben3",

        eventOnClick() {
            kuaben3();
        }
    }, {
        label: 'youming10|本10自动',
        title: "自动本10小怪",
        id : "youming10",

        eventOnClick() {
            youming10();
        }
    }, {
        label: 'youming11|本11自动',
        title: "自动本11小怪",
        id : "youming11",

        eventOnClick() {
            youming11();
        }
    }]
}]

var CONST_LANGUAGE_IN_CHINESE = "zh" === (navigator.systemLanguage ? navigator.systemLanguage : navigator.language).substr(0, 2);

var initializeDailyTasksButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 18;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < DailyTasksConfigurations.length; i++) {
        let group = DailyTasksConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "日常签到";
        button.title = "可以来回切换";
		button.id = "DailyTasksConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "50px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBeHiddenDailyTasks").attr("hidden", "true");
				if (ButtonId == "DailyTasksConfig")
				{
					ButtonId = "";
				}
            } else {
                $(".canBeHiddenDailyTasks").removeAttr("hidden");
				if (ButtonId != "DailyTasksConfig")
				{
					ButtonManager.clickButtonById(ButtonId);
				}
				ButtonId = "DailyTasksConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBeHiddenDailyTasks";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBeHiddenDailyTasks";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

initializeDailyTasksButtons();

/**
 * AutoFight Bar Setup
*/
var AutoFightConfigurations = [{
    subject: "AutoFight|自动监听",

    buttons: [{
        label: 'listenDing|定时日常',
        title: "每天5点55点完正邪(默认邪气)，6点自动开始拼图，18点领取排行奖励并领武馆奖励，挂机模式下会自动做日常",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DsQLtrigger=1;
				listenDingFunc();
            } else {
                DsQLtrigger=0;
				clearInterval(timeTask);
            }
        }
    }, {
        label: 'YX Monitor|游侠监听',
        title: '本服自动杀游侠...',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                killYXTrigger = 1;
            } else {
                killYXTrigger = 0;
				clearInterval(getYXIntervalFunc);
            }
        }
    }, {
        label: 'listenQL|本服监听',
        title: "自动飞本服青龙",
		id : "listenBFQL",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                listenBFQLFunc();
            } else {
				listenBFQLFunc();
            }
        }
    }, {
        label: 'listenKFQL|跨服监听',
        title: "自动飞跨服青龙、跨服镖车、跨服逃犯、自动设置杀坏人",
		id : "listenQL",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                listenQLFunc();
				ButtonManager.resetButtonById("killgood");
				ButtonManager.resetButtonById("killbad");
				ButtonManager.clickButtonById("killbad");

            } else {
				listenQLFunc();
				ButtonManager.resetButtonById("killgood");
				ButtonManager.resetButtonById("killbad");
            }
        }
    }, {
        label: 'listenQFQL|全服监听',
        title: "自动飞全服青龙，自动设置杀坏人",
		id : "listenQFQL",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				ButtonManager.resetButtonById("killqfgood");
				ButtonManager.resetButtonById("killqfbad");
				ButtonManager.clickButtonById("killqfbad");
				DragonBonus = [];
				DragonBonus.push.apply(DragonBonus,DragonBonusA);
				DragonBonus.push.apply(DragonBonus,DragonBonusB);
				DragonBonus.push.apply(DragonBonus,DragonBonusC);
				DragonBonus.push.apply(DragonBonus,DragonBonusD);
                listenQFQLFunc();
            } else {
				DragonBonus = [];
				listenQFQLFunc();
				ButtonManager.resetButtonById("killqfgood");
				ButtonManager.resetButtonById("killqfbad");
            }
        }
    }, {
        label: 'setQFQL|全服设定',
        title: '设定想要自动飞的全服等级(跨服青龙不影响),不设定或者输入0则默认全打，烈日以上请输1,斩龙以上请输2,只打碎片和花请输3',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				let no = prompt("请输入你想要自动飞的全服等级(跨服青龙不影响),不输入或者输入0则全打，烈日以上请输1,斩龙以上请输2,只打碎片和花请输3");
				if (eval(no) === 1)
				{
					DragonBonus = [];
					DragonBonus.push.apply(DragonBonus,DragonBonusB);
					DragonBonus.push.apply(DragonBonus,DragonBonusC);
					DragonBonus.push.apply(DragonBonus,DragonBonusD);
				} else if (eval(no) === 2)
				{
					DragonBonus = [];
					DragonBonus.push.apply(DragonBonus,DragonBonusC);
					DragonBonus.push.apply(DragonBonus,DragonBonusD);

				} else if (eval(no) === 3)
				{
					DragonBonus = [];
					DragonBonus.push.apply(DragonBonus,DragonBonusD);

				} else {
					DragonBonus = [];
					DragonBonus.push.apply(DragonBonus,DragonBonusA);
					DragonBonus.push.apply(DragonBonus,DragonBonusB);
					DragonBonus.push.apply(DragonBonus,DragonBonusC);
					DragonBonus.push.apply(DragonBonus,DragonBonusD);
				}
            } else {
				DragonBonus = [];
				DragonBonus.push.apply(DragonBonus,DragonBonusA);
				DragonBonus.push.apply(DragonBonus,DragonBonusB);
				DragonBonus.push.apply(DragonBonus,DragonBonusC);
				DragonBonus.push.apply(DragonBonus,DragonBonusD);
            }

        }
    }, {
        label: 'pinTu|拼图监听',
        title: '自动杀特殊正邪。',
		id: "btnpinTu",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				pinTuFunc();
            } else {
				pinTuFunc();
            }
        }
    }, {
        label: 'autotupo|自动突破',
        title: '自动突破刚刚突破完成的技能,同时突破三技能的请慎用，会浪费秘术',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				autotupoFunc();
            } else {
				autotupoFunc();
            }
        }
    }, {
        label: 'autoreconnect|自动重连',
        title: "设定后，断开15分钟自动重新连接",
		id : "autoreconnect",

        async eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				autoreconnectTrigger = 1;
            } else {
				autoreconnectTrigger = 0;
            }
        }
    }, {
        label: 'holdconnect|保持连接',
        title: "设定后，断开连接时立刻重连",
        id : 'holdconnect',

        async eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				autoreconnectTrigger = 2;
            } else {
				autoreconnectTrigger = 0;
            }
        }
    }]
}]

var initializeAutoFightButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 17;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < AutoFightConfigurations.length; i++) {
        let group = AutoFightConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "自动监听";
        button.title = "可以来回切换";
		button.id = "AutoFightConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "75px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBeHiddenAutoFight").attr("hidden", "true");
				if (ButtonId == "AutoFightConfig")
				{
					ButtonId = "";
				}
            } else {
                $(".canBeHiddenAutoFight").removeAttr("hidden");
				if (ButtonId != "AutoFightConfig")
				{
					ButtonManager.clickButtonById(ButtonId);
				}
				ButtonId = "AutoFightConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBeHiddenAutoFight";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBeHiddenAutoFight";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

initializeAutoFightButtons();


/**
 * SpecialEvent Bar Setup
*/
var SpecialEventConfigurations = [{
    subject: "SpecialEvent|特殊事件",

    buttons: [{
        label: 'xuanhong|开启悬红',
        title: '开启悬红',
   eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                xuanhong_flag =1;
                go('jh 1;w;event_1_40923067');
                triggers.enableByCls("xuanhong")
            } else {
                xuanhong_flag =0;
               triggers.disableByCls("xuanhong")

            }
        }

    },{
        label: 'clubfight|帮战领奖',
        title: '帮战领奖，一键交阁令、风云令、青凤热血、用宝箱...',

        eventOnClick() {
			overrideclick("clan scene");
            overrideclick("give_geling");
			overrideclick("give_geling");
			overrideclick("give_fengyunling");
			overrideclick("items use obj_fengyunbaoxiang");

			for (i=0; i<10; i++)
			{
				overrideclick('items use obj_rexueyin');//热血令10次
			}
			for (i=0; i<40; i++)
			{
				overrideclick("items use obj_qingfengwenshou");//青凤令40次
			}

        }
    }, {
        label: 'clearPuzzle|清谜题',
        title: '清除谜题...',

        eventOnClick() {
            go('auto_tasks cancel');
        }
    }, {
        label: 'qixia|拿果子',
        title: '对话奇侠拿果子，请先确保已对话完20次',

        async eventOnClick() {

            if (ButtonManager.toggleButtonEvent(this)) {
				qixia();
            } else {
                qixia();
            }
        }
    }, {
        label: 'mijing|秘境优化',
        title: '秘境优化',

        async eventOnClick() {
            mijingFunc();
        }
    }, {
        label: 'youming9|前院自动',
        title: "自动前院小怪",
        id : "youming9",

        eventOnClick() {
            youming9();
        }
    }, {
        label: 'ben8|本8自动',
        title: "自动本8三路",

        eventOnClick() {
            ben8();
        }
    }, {
        label: 'shimenrenwu|师门任务',
        title: "师门任务",

        eventOnClick() {
            go("go_family;give emei_wenxu;family_quest;family_quest;find_family_quest_road;");
        }
    },{
        label: 'Define|自定命令',
        title: '按提示输入命令和运行次数，用英文逗号隔开',

        async eventOnClick() {
			let string = prompt("按提示输入命令和运行次数，用英文逗号隔开","");
			let cmd = string.split(",");
			let DefinedCmd = cmd[0];
			let DefinedTimes = cmd[1];
            for(var i=0;i<parseInt(DefinedTimes);i++){
			overrideclick(DefinedCmd);
			}
        }
    },{
        label: 'anywhere|导航仪',
        title: '输入NPC姓名，自动前往',

        async eventOnClick() {
			MyNavigatorFunc();
		}
    }]
}]

var initializeSpecialEventButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 17;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < SpecialEventConfigurations.length; i++) {
        let group = SpecialEventConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "特殊事件";
        button.title = "可以来回切换";
		button.id = "SpecialEventConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "100px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBeHiddenSpecialEvent").attr("hidden", "true");
				if (ButtonId == "SpecialEventConfig")
				{
					ButtonId = "";
				}
            } else {
                $(".canBeHiddenSpecialEvent").removeAttr("hidden");
				if (ButtonId != "SpecialEventConfig")
				{
					ButtonManager.clickButtonById(ButtonId);
				}
				ButtonId = "SpecialEventConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBeHiddenSpecialEvent";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBeHiddenSpecialEvent";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

initializeSpecialEventButtons();

/**
 * Battle Bar Setup
*/
var cC,Cc;
var BattleConfigurations = [{
    subject: "Battle|战斗相关",

    buttons: [{
            label: 'For Battle|战斗装备',
            title: "切换战斗装备/打坐装备",
			id : "ForBattle",

           eventOnClick() {
                if (ButtonManager.toggleButtonEvent(this)) {
                    overrideclick('auto_equip on');       // 一键装备
                    overrideclick('unwield weapon_sb_sword11');   // 脱11级剑
                    overrideclick('unwield weapon_sb_unarmed11');   // 脱11级拳
                    overrideclick('unwield weapon_sb_unarmed12');   // 脱12级拳
                    overrideclick('unwield weapon_sb_hammer11');   // 脱11级锤
                    overrideclick('unwield longwulianmoge_xiefoyaochui');   // 脱12级锤
                    overrideclick('unwield weapon_sb_throwing11');   // 脱11级暗
                    overrideclick('unwield weapon_sb_throwing12');   // 脱12级暗
                    overrideclick('unwield weapon_sb_sword12');   // 脱12级剑
                    overrideclick('unwield weapon_sb_whip12');   // 脱12级鞭
                    overrideclick('unwield weapon_sb_stick11');   // 脱11级棍
                    overrideclick('unwield weapon_sb_spear11');   // 脱11级枪
                    overrideclick('unwield weapon_sb_stick12');   // 脱12级棍
                    overrideclick('unwield weapon_sb_staff12');   // 脱12级杖
                    overrideclick('unwield weapon_sb_spear12');   // 脱12级枪
                    overrideclick('wield weapon_sb_spear11');   // 装11级枪
                    overrideclick('wield weapon_sb_spear12');   // 装12级枪
                    overrideclick('wield weapon_sb_hammer11');   // 装11级锤
                    overrideclick('wield weapon_sb_hammer12');   // 装12级锤
                    overrideclick('wield weapon_sb_spear11');   // 装11级暗
                    overrideclick('wield weapon_sb_spear12');   // 装12级暗
                    overrideclick('wield weapon_sb_unarmed11');   // 装11级拳
                    overrideclick('wield weapon_sb_unarmed12');   // 装12级拳
                    overrideclick('wield weapon_sb_stick11');   // 装11级棍
                    overrideclick('wield weapon_sb_stick12');   // 装12级棍
                    overrideclick('wield weapon_sb_staff12');   // 装12级杖

                    overrideclick('wield weapon_sb_sword11 rumai');       // 入脉11级剑
                    overrideclick('wield weapon_sb_unarmed11 rumai');       // 入脉11级拳
                    overrideclick('wield weapon_sb_whip12 rumai');       // 入脉12级鞭
                    overrideclick('wield weapon_sb_unarmed12 rumai');       // 入脉12级拳
                    overrideclick('wield weapon_sb_sword12 rumai');       // 入脉12级剑*/
                } else {
                       overrideclick('unwield weapon_sb_sword11');   // 脱11级剑
                    overrideclick('unwield weapon_sb_sword12');   // 脱12级剑
                    overrideclick('unwield weapon_sb_hammer11');   // 脱11级锤
                    overrideclick('unwield weapon_sb_hammer12');   // 脱12级锤
                    overrideclick('unwield longwulianmoge_xiefoyaochui');   // 脱12级锤
                    overrideclick('unwield weapon_sb_axe11');   // 脱11级斧
                    overrideclick('unwield weapon_sb_axe12');   // 脱12级斧
                    overrideclick('unwield weapon_sb_unarmed11');   // 脱11级拳
                    overrideclick('unwield weapon_sb_unarmed12');   // 脱12级拳
                    overrideclick('unwield weapon_sb_spear11');   // 脱11级枪
                    overrideclick('unwield weapon_sb_spear12');   // 脱12级枪
                    overrideclick('unwield weapon_sb_throwing11');   // 脱11级暗
                    overrideclick('unwield weapon_sb_throwing12');   // 脱12级暗
                    overrideclick('unwield weapon_sb_stick11');   // 脱11级棍
                    overrideclick('unwield weapon_sb_stick12');   // 脱12级棍
                    overrideclick('unwield weapon_sb_staff12');   // 脱12级杖
                    overrideclick('unwield weapon_sb_whip12');   // 脱12级鞭
                    overrideclick('wear dream hat');       // 迷幻纶巾
                    overrideclick('wear longyuan banzhi moke');       // 龙渊戒指
                    overrideclick('wield weapon_sb_spear11');   // 装11级枪
                    overrideclick('wield weapon_sb_spear12');   // 装12级枪
                    overrideclick('wield weapon_sb_hammer11');   // 装11级锤
                    overrideclick('wield weapon_sb_hammer12');   // 装12级锤
                    overrideclick('wield weapon_sb_axe11');   // 装11级斧
                    overrideclick('wield weapon_sb_axe12');   // 装12级斧
                    overrideclick('wield weapon_sb_spear11');   // 装11级暗
                    overrideclick('wield weapon_sb_spear12');   // 装12级暗
                    overrideclick('wield weapon_sb_sword11');   // 装11级剑
                    overrideclick('wield weapon_sb_sword12');   // 装12级剑
                    overrideclick('wield weapon_sb_stick11');   // 装11级棍
                    overrideclick('wield weapon_sb_stick12');   // 装12级棍
                    overrideclick('wield weapon_sb_unarmed11');   // 装11级拳
                    overrideclick('wield weapon_sb_unarmed12');   // 装12级拳
                    overrideclick('wear equip_head_tianji_jiuxuan');       // 天机帽
                    overrideclick('wield sword of windspring rumai');       // 入脉风泉
                    overrideclick('wield weapon_stick_miaoyun_lhx');       // 装备笛子
                    overrideclick('wield longwulianmoge_yuyemoqiang');   // 装12级枪
                    overrideclick('wear equip_finger_kongdong_bulao');       // 崆峒戒
                }
            }
        }, {
            label: 'fanji|自动破招',
            title: '自动破招...',

            eventOnClick() {
                if (ButtonManager.toggleButtonEvent(this)) {
					if (combo[0].length == 0)
					{
						combo = [['九溪断月枪', '燎原百破'],['冰月破魔枪', '燎原百击'],['正道十七', '幻阴指锤'],['青冥血斧', '独孤斧诀'],['玉石俱焚', '四海断潮斩'],['神龙东来', '神剑慧芒'],['神龙东来', '九星定形针'],['神龙东来', '折花百式'],['神龙东来', '月夜鬼萧'],['九星定形针', '月夜鬼萧'],['燎原百击', '降龙廿八掌'],['燎原百击', '不凡三剑'],['燎原百击', '天刀八诀'],['冰月破魔枪', '天魔策'],['燎原百破', '千影百伤棍'], ['九溪断月枪', '如来神掌'],['九溪断月枪', '孔雀翎'],['九天龙吟剑法', '燎原百破'],['九溪断月枪', '玄天杖法'],['飞刀绝技', '织冰剑法'], ['覆雨剑法', '翻云刀法'], ['九天龙吟剑法', '排云掌法'], ['雪饮狂刀', '九天龙吟剑法'], ['孔雀翎', '如来神掌'],['覆雨剑法', '如来神掌']];
					} else {
						combo = [skillcombo];
					}
					fanjiTrigger=1;
                } else {
					combo = [skillcombo];
					fanjiTrigger=0;
                }
            }
        },  {
            label: 'LianZhao|六气连招',
            title: '六气连招...',
			id : 'LianZhao',

            eventOnClick() {
                if (ButtonManager.toggleButtonEvent(this)) {
					if (combo[0].length == 0)
					{
						combo = [['千影百伤棍', '燎原百破'],['千影百伤棍', '四海断潮斩'],['神龙东来', '神剑慧芒'],['神龙东来', '九星定形针'],['神龙东来', '折花百式'],['神龙东来', '月夜鬼萧'],['九星定形针', '月夜鬼萧'],['燎原百击', '降龙廿八掌'],['燎原百击', '不凡三剑'],['燎原百击', '天刀八诀'],['冰月破魔枪', '天魔策'], ['九溪断月枪', '如来神掌'],['九溪断月枪', '孔雀翎'],['九天龙吟剑法', '燎原百破'],['九溪断月枪', '玄天杖法'], ['九溪断月枪', '燎原百破'],['飞刀绝技', '织冰剑法'], ['覆雨剑法', '翻云刀法'], ['九天龙吟剑法', '排云掌法'], ['雪饮狂刀', '九天龙吟剑法'], ['孔雀翎', '如来神掌'],['覆雨剑法', '如来神掌']];
					} else {
						combo = [skillcombo];
					}
					LianZhao();
                } else {
					combo = [skillcombo];
					LianZhao();
                }
            }
        }, {
            label: 'AutoKill|自动战斗',
            title: '自动3气战斗...',
            id : 'AutoKill',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					AutoKillFuncIntervalFunc = setInterval(NewAutoKill,500);
				} else {
					clearInterval(AutoKillFuncIntervalFunc);
				}
            }
        }, {
            label: 'Recover|一键恢复',
            title: '一键恢复...',
			id : 'Recover',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					userMedecineFunc();
				} else {
					userMedecineFunc();
				}
            }
        }, {
            label: 'AutoRecover|自动恢复',
            title: '自动回复...',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					AutoRecoverFlg = 1;
					healIntervalFunc = setInterval(doheal, 250);
				} else {
					AutoRecoverFlg = 0;
					clearInterval(healIntervalFunc);
				}
            }
        }, {
            label: 'RecoverSetting|不用万年',
            title: '点击后不会用万年灵芝',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					healflg = 1;
				} else {
					healflg = 0;
				}
            }
        }, {
        label: 'Escape|自动逃跑',
		id: "btnescape",
        title: '快速点击逃跑...',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                AutoEscapeFunc();
            } else {
                clearEscape();
            }

			function AutoEscapeFunc(){
				// 间隔500毫秒逃跑一次
				 AutoEscapeFuncIntervalFunc = setInterval(AutoEscape,500);
			}

			function clearEscape(){
				clearInterval(AutoEscapeFuncIntervalFunc);
			}

			function AutoEscape(){
				go('escape');     //逃跑
				if($('span.outbig_text:contains(战斗结束)').length>0){
					clearEscape();
					ButtonManager.resetButtonById("btnescape");
					go('prev_combat');
				}
				else if($('button.cmd_combat_byebye').length===0){
					clearEscape();
					ButtonManager.resetButtonById("btnescape");
					go('prev_combat');
				}
			}
        }
    }, {
            label: 'qfkillqfHuangMingTarget|杀全服好',
            title: '杀全服好人...',
			id : "killqfgood",

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					qfkillqfHuangMingTargetFunc();
				} else {
					qfkillqfHuangMingTargetFunc();
				}
            }
        }, {
            label: 'qfkillHongMingTarget|杀全服坏',
            title: '杀全服坏人...',
			id : "killqfbad",

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					qfkillHongMingTargetFunc();
				} else {
					qfkillHongMingTargetFunc();
				}
            }
        }, {
            label: 'killHuangMingTarget|击杀好人',
            title: '杀跨服好人，天剑谷、帮本一二怪兽、年兽、帮战攻方...',
			id : "killgood",

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					killHuangMingTargetFunc();
				} else {
					killHuangMingTargetFunc();
				}
            }
        }, {
            label: 'killHongMingTarget|击杀坏人',
            title: '杀跨服坏人、帮战守方...',
			id : "killbad",

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					killHongMingTargetFunc();
				} else {
					killHongMingTargetFunc();
				}
            }
        }, {
				label: 'killEnemy|杀敌人',
				title: '杀敌人...',

				eventOnClick() {
					zdskill =  null;
					if (ButtonManager.toggleButtonEvent(this)) {
						currentNPCIndex = 0;
						skillLists = mySkillLists;
						Enemy = sessionStorage.getItem("Enemy");
						Enemy = prompt("请输入想要杀的人姓名中包含的字样",Enemy);
						sessionStorage.setItem("Enemy",Enemy);
						killEnemyIntervalFunc = setInterval(killEnemy, 500);
					} else {
						clearInterval(killEnemyIntervalFunc);
					}
				}
		}, {
            label: 'Learder|领队自动',
            title: '领队自动...',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					LearderFunc();
				} else {
					LearderFunc();
				}
            }
        }, {
            label: 'Learder|帮派跟招',
            title: '帮派跟招...',
            id: "Learder",

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					bangfuFunc();
				} else {
					bangfuFunc();
				}
            }
        }, {
           label: 'CB3FL|帮三跟杀',
            title: '帮本三自动跟着大腿叫杀...',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					BB3flg = 1;
					FollowLeader();
					Leader = sessionStorage.getItem("Leader");
					Leader = prompt("请输入想要跟随队长的名字",Leader);
					sessionStorage.setItem("Leader",Leader);
					killEnemyIntervalFunc = setInterval(killEnemy, 500);
				} else {
					BB3flg = 0;
					clearInterval(killEnemyIntervalFunc);
					sessionStorage.setItem("Enemy",null);
				}
            }

        }, {
        label: 'clearlog|清理战斗',
        title: '清理战斗',

        async eventOnClick() {

            if (ButtonManager.toggleButtonEvent(this)) {

			    clearInterval(cC);
                clearInterval(Cc)
        clearlog_ft();
				  cC = setInterval(clearlog_ft, 2000);
              Cc=setInterval(clearchat,7200000);

            } else {

                  clearInterval(cC);
                clearInterval(Cc);

            }
        }
    }, {
            label: 'tianjian|跨服剑谷',
            title: '领队跨服天剑谷，自动移动。选择杀boss时不会杀小怪，选择躲boss时不会进boss房间...',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					boss = sessionStorage.getItem("boss");
					boss = prompt("杀boss输入1，躲boss输入2",boss);
					sessionStorage.setItem("boss",boss);
					tianjianTrigger=1;
					killTJIntervalFunc = setInterval(killtianjian, 300);
					tianjianmove();
				} else {
					tianjianTrigger=0;
					tjroomclear=0;
					path=[];
					tjfight=0;
					preroomrandom="";
					clearInterval(killTJIntervalFunc);
				}
            }
        }, {
            label: 'kuafufanji|跨服破招',
            title: '跨服破招...',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					kuafufanjiFunc();
				} else {
					kuafufanjiFunc();
				}
            }
        }, {
        label: 'FriendTarget|自动避开',
        title: '自动避开不想误伤的NPC或玩家进行反击。',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				let Friend = sessionStorage.getItem("Friend");
				Friend = prompt("请输入想要避开的对象名称",Friend);
				sessionStorage.setItem("Friend",Friend);
				FriendTrigger = 1;
            } else {
                FriendTrigger = 0;
            }
        }
	}, {
        label: 'FightTarget|自动瞄准',
        title: '自动选择想要追击的NPC或玩家进行追击。',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				let Target = sessionStorage.getItem("Target");
				Target = prompt("请输入想要怼的对象名称",Target);
				sessionStorage.setItem("Target",Target);
				FightTrigger = 1;
            } else {
                FightTrigger = 0;
            }
        }
    }, {
            label: 'hitPLY|精确打击',
            title: '精确打击...',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					hitPLYFunc();
				} else {
					hitPLYFunc();
				}
            }
        }, {
            label: 'killhide|显示隐藏',
            title: '显示隐藏...',

            eventOnClick() {
				if (ButtonManager.toggleButtonEvent(this)) {
					killhideFunc();
				} else {
					killhideFunc();
			}
		}
	}, {
        label: 'Time Travel|一键跨服',
        title: '进入跨服...',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                qiehuankuafuFunc();
            } else {
                qiehuankuafuFunc();
            }
        }
    }, {
        label: "Body Search|摸尸体",
        title: "自动摸尸体。",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				AutoGetIntervalFunc = setInterval(AutoGet,300);
            } else {
                clearInterval(AutoGetIntervalFunc);
            }
			function AutoGet(){
				$("button.cmd_click3").each(
				function(){
					if(isContains($(this).html() , "尸体"))
						eval($(this).attr("onclick").replace("look_item corpse","get corpse"));
				});
			}
        }
    }, {
        label: 'Item Search|抢物品',
        title: '抢物品...',

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                qiangdipiFunc();
            } else {
                qiangdipiFunc();
            }
        }
    }, {
            label: 'skills|换技能',
            title: '快速切换第一套第二套技能，第三套无法切换。',

            eventOnClick() {
                if (ButtonManager.toggleButtonEvent(this)) {
					overrideclick('enable mapped_skills restore go 1');
					overrideclick('prev');
                } else {
					overrideclick('enable mapped_skills restore go 2');
					overrideclick('prev');
                }
            }
        }, {
            label: 'equip|脱衣技',
            title: '快速脱穿衣服技能。',

            eventOnClick() {
                if (ButtonManager.toggleButtonEvent(this)) {
                    go('auto_equip off');
					go('enable unmap_all');
                } else {
                    go('auto_equip on');
					go('enable map_all');
                }
            }
        }, {
        label: 'ClearBag|清理背包',
        title: '清理背包',

        async eventOnClick() {

            if (ButtonManager.toggleButtonEvent(this)) {
				clickButton('items', 0);
				clearInterval(clb_time);
				clb_time = setInterval(clearitem, 200);
            } else {
                clearInterval(clb_time);
            }
        }
    }]
}]

 function clearlog_ft() {
        if (is_fighting) {
            $("span.out").remove()
        }
    }
function clearchat(){
    if (!is_fighting) {
    godirect('client_prompt empty_chat;empty_chat;quit_chat;cancel_prompt');
    }
}
var initializeBattleButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 17;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < BattleConfigurations.length; i++) {
        let group = BattleConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "战斗相关";
        button.title = "可以来回切换";
		button.id = "BattleConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "125px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBeHiddenBattle").attr("hidden", "true");
				if (ButtonId == "BattleConfig")
				{
					ButtonId = "";
				}
            } else {
                $(".canBeHiddenBattle").removeAttr("hidden");
				if (ButtonId != "BattleConfig")
				{
					ButtonManager.clickButtonById(ButtonId);
				}
				ButtonId = "BattleConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBeHiddenBattle";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBeHiddenBattle";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

initializeBattleButtons();

/**
 * Dragon Bar Setup
*/
var DragonConfigurations = [{
    subject: "Dragon|青龙装备",

    buttons: [{
        label: 'ALL Dragon|一键斩龙',
        title: "一键选择或取消所有斩龙",
		id: "Dragon",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2 = ["斩龙宝靴","龙皮至尊甲衣","斩龙宝戒","斩龙帽","斩龙宝链","斩龙宝镯","飞宇天怒刀","九天龙吟剑","小李飞刀","天罡掌套","乌金玄火鞭","开天宝棍","达摩杖","天雷断龙斧","烛幽鬼煞锤","斩龙鎏金枪"];
				ButtonManager.clickButtonById("ZLBX");
				ButtonManager.clickButtonById("LPZZY");
				ButtonManager.clickButtonById("ZLBJ");
				ButtonManager.clickButtonById("ZLM");
				ButtonManager.clickButtonById("ZLBL");
				ButtonManager.clickButtonById("ZLBZ");
				ButtonManager.clickButtonById("FYTND");
				ButtonManager.clickButtonById("JTLYJ");
				ButtonManager.clickButtonById("XLFD");
				ButtonManager.clickButtonById("TGQT");
				ButtonManager.clickButtonById("WJXHB");
				ButtonManager.clickButtonById("KTBG");
				ButtonManager.clickButtonById("DMZ");
				ButtonManager.clickButtonById("TLDLF");
				ButtonManager.clickButtonById("ZYGSC");
				ButtonManager.clickButtonById("ZLLJQ");
            } else {
                DragonBonus2 = [];
				ButtonManager.resetButtonById("ZLBX");
				ButtonManager.resetButtonById("LPZZY");
				ButtonManager.resetButtonById("ZLBJ");
				ButtonManager.resetButtonById("ZLM");
				ButtonManager.resetButtonById("ZLBL");
				ButtonManager.resetButtonById("ZLBZ");
				ButtonManager.resetButtonById("FYTND");
				ButtonManager.resetButtonById("JTLYJ");
				ButtonManager.resetButtonById("XLFD");
				ButtonManager.resetButtonById("TGQT");
				ButtonManager.resetButtonById("WJXHB");
				ButtonManager.resetButtonById("KTBG");
				ButtonManager.resetButtonById("DMZ");
				ButtonManager.resetButtonById("TLDLF");
				ButtonManager.resetButtonById("ZYGSC");
				ButtonManager.resetButtonById("ZLLJQ");
            }
        }
    }, {
        label: 'ZLBX|斩龙宝靴',
        title: "斩龙宝靴",
		id: "ZLBX",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[0] = "斩龙宝靴";
            } else {
                DragonBonus2[0] = "";
            }
        }
    }, {
        label: 'LPZZY|龙皮尊衣',
        title: "龙皮尊衣",
		id: "LPZZY",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[1] = "龙皮至尊甲衣";
            } else {
                DragonBonus2[1] = "";
            }
        }
    }, {
        label: 'ZLBJ|斩龙宝戒',
        title: "斩龙宝戒",
		id: "ZLBJ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[2] = "斩龙宝戒";
            } else {
                DragonBonus2[2] = "";
            }
        }
    }, {
        label: 'ZLM|斩龙帽',
        title: "斩龙帽",
		id: "ZLM",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[3] = "斩龙帽";
            } else {
                DragonBonus2[3] = "";
            }
        }
    }, {
        label: 'ZLBL|斩龙宝链',
        title: "斩龙宝链",
		id: "ZLBL",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[4] = "斩龙宝链";
            } else {
                DragonBonus2[4] = "";
            }
        }
    }, {
        label: 'ZLBZ|斩龙宝镯',
        title: "斩龙宝镯",
		id: "ZLBZ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[5] = "斩龙宝镯";
            } else {
                DragonBonus2[5] = "";
            }
        }
    }, {
        label: 'FYTND|飞宇怒刀',
        title: "飞宇怒刀",
		id: "FYTND",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[6] = "飞宇天怒刀";
            } else {
                DragonBonus2[6] = "";
            }
        }
    }, {
        label: 'JTLYJ|九天龙剑',
        title: "九天龙剑",
		id: "JTLYJ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[7] = "九天龙吟剑";
            } else {
                DragonBonus2[7] = "";
            }
        }
    }, {
        label: 'XLFD|小李飞刀',
        title: "小李飞刀",
		id: "XLFD",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[8] = "小李飞刀";
            } else {
                DragonBonus2[8] = "";
            }
        }
    }, {
        label: 'TGQT|天罡掌套',
        title: "天罡掌套",
		id: "TGQT",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[9] = "天罡掌套";
            } else {
                DragonBonus2[9] = "";
            }
        }
    }, {
        label: 'WJXHB|乌金火鞭',
        title: "乌金火鞭",
		id: "WJXHB",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[10] = "乌金玄火鞭";
            } else {
                DragonBonus2[10] = "";
            }
        }
    }, {
        label: 'KTBG|开天宝棍',
        title: "开天宝棍",
		id: "KTBG",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[11] = "开天宝棍";
            } else {
                DragonBonus2[11] = "";
            }
        }
    }, {
        label: 'DMZ|达摩杖',
        title: "达摩杖",
		id: "DMZ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[12] = "达摩杖";
            } else {
                DragonBonus2[12] = "";
            }
        }
    }, {
        label: 'TLDLF|天雷龙斧',
        title: "天雷龙斧",
		id: "TLDLF",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[13] = "天雷断龙斧";
            } else {
                DragonBonus2[13] = "";
            }
        }
    }, {
        label: 'ZYGSC|烛幽鬼锤',
        title: "烛幽鬼锤",
		id: "ZYGSC",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[14] = "烛幽鬼煞锤";
            } else {
                DragonBonus2[14] = "";
            }
        }
    }, {
        label: 'ZLLJQ|斩龙鎏枪',
        title: "斩龙鎏枪",
		id: "ZLLJQ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus2[15] = "斩龙鎏金枪";
            } else {
                DragonBonus2[15] = "";
            }
        }
    }]
},{
    subject: "Yintian|胤天碎片",

    buttons: [{
        label: 'ALL Yintian|一键胤天',
        title: "一键选择或取消所有胤天",
		id: "Yintian",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3 = ["胤天宝帽碎片","胤天项链碎片","胤天宝戒碎片","鱼肠碎片","轩辕剑碎片","破岳拳套碎片","胤天宝镯碎片","胤天宝靴碎片","胤天紫金衣碎片","昊天龙旋铠碎片","水羽云裳碎片","奉天金带碎片","凤羽乾坤盾碎片","玄冰凝魄枪碎片","雷霆诛神刀碎片","天雨玄镖碎片","天神杖碎片","轰天巨棍碎片","神龙怒火鞭碎片","胤武伏魔斧碎片","九天灭世锤碎片"];
				ButtonManager.clickButtonById("YTBM");
				ButtonManager.clickButtonById("YTXL");
				ButtonManager.clickButtonById("YTBJ");
				ButtonManager.clickButtonById("YC");
				ButtonManager.clickButtonById("XYJ");
				ButtonManager.clickButtonById("PYQT");
				ButtonManager.clickButtonById("YTBZ");
				ButtonManager.clickButtonById("YTBX");
				ButtonManager.clickButtonById("YTZJY");
				ButtonManager.clickButtonById("HTLXK");
				ButtonManager.clickButtonById("SYYS");
				ButtonManager.clickButtonById("FTJD");
				ButtonManager.clickButtonById("FYQKD");
				ButtonManager.clickButtonById("XBNPQ");
				ButtonManager.clickButtonById("LTZSD");
				ButtonManager.clickButtonById("TYXB");
				ButtonManager.clickButtonById("TSZ");
				ButtonManager.clickButtonById("HTJG");
				ButtonManager.clickButtonById("SLNHB");
				ButtonManager.clickButtonById("YWFMF");
				ButtonManager.clickButtonById("JTMSC");
            } else {
                DragonBonus3 = [];
				ButtonManager.resetButtonById("YTBM");
				ButtonManager.resetButtonById("YTXL");
				ButtonManager.resetButtonById("YTBJ");
				ButtonManager.resetButtonById("YC");
				ButtonManager.resetButtonById("XYJ");
				ButtonManager.resetButtonById("PYQT");
				ButtonManager.resetButtonById("YTBZ");
				ButtonManager.resetButtonById("YTBX");
				ButtonManager.resetButtonById("YTZJY");
				ButtonManager.resetButtonById("HTLXK");
				ButtonManager.resetButtonById("SYYS");
				ButtonManager.resetButtonById("FTJD");
				ButtonManager.resetButtonById("FYQKD");
				ButtonManager.resetButtonById("XBNPQ");
				ButtonManager.resetButtonById("LTZSD");
				ButtonManager.resetButtonById("TYXB");
				ButtonManager.resetButtonById("TSZ");
				ButtonManager.resetButtonById("HTJG");
				ButtonManager.resetButtonById("SLNHB");
				ButtonManager.resetButtonById("YWFMF");
				ButtonManager.resetButtonById("JTMSC");
            }
        }
    }, {
        label: 'YTBM|胤天宝帽',
        title: "胤天宝帽",
		id: "YTBM",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[0] = "胤天宝帽碎片";
            } else {
                DragonBonus3[0] = "";
            }
        }
    }, {
        label: 'YTXL|胤天项链',
        title: "胤天项链",
		id: "YTXL",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[1] = "胤天项链碎片";
            } else {
                DragonBonus3[1] = "";
            }
        }
    }, {
        label: 'YTBJ|胤天宝戒',
        title: "胤天宝戒",
		id: "YTBJ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[2] = "胤天宝戒碎片";
            } else {
                DragonBonus3[2] = "";
            }
        }
    }, {
        label: 'YC|鱼肠',
        title: "鱼肠",
		id: "YC",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[3] = "鱼肠碎片";
            } else {
                DragonBonus3[3] = "";
            }
        }
    }, {
        label: 'XYJ|轩辕剑',
        title: "轩辕剑",
		id: "XYJ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[4] = "轩辕剑碎片";
            } else {
                DragonBonus3[4] = "";
            }
        }
    }, {
        label: 'PYQT|破岳拳套',
        title: "破岳拳套",
		id: "PYQT",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[5] = "破岳拳套碎片";
            } else {
                DragonBonus3[5] = "";
            }
        }
    }, {
        label: 'YTBZ|胤天宝镯',
        title: "胤天宝镯",
		id: "YTBZ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[6] = "胤天宝镯碎片";
            } else {
                DragonBonus3[6] = "";
            }
        }
    }, {
        label: 'YTBX|胤天宝靴',
        title: "胤天宝靴",
		id: "YTBX",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[7] = "胤天宝靴碎片";
            } else {
                DragonBonus3[7] = "";
            }
        }
    }, {
        label: 'YTZJY|胤天金衣',
        title: "胤天金衣",
		id: "YTZJY",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[8] = "胤天紫金衣碎片";
            } else {
                DragonBonus3[8] = "";
            }
        }
    }, {
        label: 'HTLXK|昊天龙铠',
        title: "昊天龙铠",
		id: "HTLXK",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[9] = "昊天龙旋铠碎片";
            } else {
                DragonBonus3[9] = "";
            }
        }
    }, {
        label: 'SYYS|水羽云裳',
        title: "水羽云裳",
		id: "SYYS",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[10] = "水羽云裳碎片";
            } else {
                DragonBonus3[10] = "";
            }
        }
    }, {
        label: 'FTJD|奉天金带',
        title: "奉天金带",
		id: "FTJD",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[11] = "奉天金带碎片";
            } else {
                DragonBonus3[11] = "";
            }
        }
    }, {
        label: 'FYQKD|凤羽坤盾',
        title: "凤羽坤盾",
		id: "FYQKD",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[12] = "凤羽乾坤盾碎片";
            } else {
                DragonBonus3[12] = "";
            }
        }
    }, {
        label: 'XBNPQ|玄冰魄枪',
        title: "玄冰魄枪",
		id: "XBNPQ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[13] = "玄冰凝魄枪碎片";
            } else {
                DragonBonus3[13] = "";
            }
        }
    }, {
        label: 'LTZSD|雷霆神刀',
        title: "雷霆神刀",
		id: "LTZSD",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[14] = "雷霆诛神刀碎片";
            } else {
                DragonBonus3[14] = "";
            }
        }
    }, {
        label: 'TYXB|天雨玄镖',
        title: "天雨玄镖",
		id: "TYXB",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[15] = "天雨玄镖碎片";
            } else {
                DragonBonus3[15] = "";
            }
        }
    }, {
        label: 'TSZ|天神杖',
        title: "天神杖",
		id: "TSZ",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[16] = "天神杖碎片";
            } else {
                DragonBonus3[16] = "";
            }
        }
    }, {
        label: 'HTJG|轰天巨棍',
        title: "轰天巨棍",
		id: "HTJG",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[17] = "轰天巨棍碎片";
            } else {
                DragonBonus3[17] = "";
            }
        }
    }, {
        label: 'SLNHB|神龙怒鞭',
        title: "神龙怒鞭",
		id: "SLNHB",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[18] = "神龙怒火鞭碎片";
            } else {
                DragonBonus3[18] = "";
            }
        }
    }, {
        label: 'YWFMF|胤武魔斧',
        title: "胤武魔斧",
		id: "YWFMF",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[19] = "胤武伏魔斧碎片";
            } else {
                DragonBonus3[19] = "";
            }
        }
    }, {
        label: 'JTMSC|九天灭锤',
        title: "九天灭锤",
		id: "JTMSC",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus3[20] = "九天灭世锤碎片";
            } else {
                DragonBonus3[20] = "";
            }
        }
    }]
}, {
    subject: "other|其他",

    buttons: [{
        label: 'ALL Flower|一键花草',
        title: "一键选择或取消所有花草",
		id: "Flower",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus5 = ["君影草","矢车菊","忘忧草","仙客来","雪英","朝开暮落花","夕雾草","凤凰木","熙颜花","晚香玉","凌霄花","彼岸花","洛神花","百宜雪梅"];
            } else {
                DragonBonus5 = [];
            }
        }
    }, {
        label: 'ALL Moon|一键明月',
        title: "一键选择或取消所有明月、冰魄银针-墨玄掌套、日光宝甲衣除外",
		id: "Moon",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus0 = ["明月鞋","月光宝甲衣","明月戒","明月帽","明月项链","明月手镯","屠龙刀","倚天剑","冰魄银针","碧磷鞭","烈日棍","西毒蛇杖","星月大斧","碧玉锤","霸王枪"];
            } else {
                DragonBonus0 = [];
            }
        }
    }, {
        label: 'ALL Sun|一键烈日',
        title: "一键选择或取消所有烈日",
		id: "Sun",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus1 = ["烈日宝靴","烈日宝戒","烈日帽","烈日宝链","烈日宝镯","斩神刀","诛仙剑","暴雨梨花针","龙象拳套","七星鞭","残阳棍","伏虎杖","破冥斧","撼魂锤","赤焰枪"];
            } else {
                DragonBonus1 = [];
            }
        }
    }, {
        label: 'ALL drug|一键丹药',
        title: "一键选择或取消所有丹药",
		id: "drug",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus4 = ["紫芝","狂暴丹","灵草","乾坤再造丹","小还丹"];
            } else {
                DragonBonus4 = [];
            }
        }
    }, {
        label: 'MXZT|墨玄掌套',
        title: "特殊任务物品",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				DragonBonus0.push.apply(DragonBonus0,['墨玄掌套']);
            } else {
                DragonBonus0.splice(DragonBonus0.indexOf('墨玄掌套'), 1 );
            }
        }
    }, {
        label: 'BPYZ|冰魄银针',
        title: "特殊任务物品",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                DragonBonus0.push.apply(DragonBonus0,['冰魄银针']);
            } else {
                DragonBonus0.splice(DragonBonus0.indexOf('冰魄银针'), 1 );
            }
        }
    }, {
        label: 'RGBJ|日光宝甲',
        title: "特殊任务物品",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				DragonBonus1.push.apply(DragonBonus1,['日光宝甲衣']);
            } else {
                DragonBonus1.splice(DragonBonus1.indexOf('日光宝甲衣'), 1 );
            }
        }
    }]
}]

var initializeDragonButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 18;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < DragonConfigurations.length; i++) {
        let group = DragonConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "青龙目标";
        button.title = "青龙目标设定";
		button.id = "DragonConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "150px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBehiddenDragon").attr("hidden", "true");
				if (ButtonId == "DragonConfig")
				{
					ButtonId = "";
				}
            } else {
                $(".canBehiddenDragon").removeAttr("hidden");
				if (ButtonId != "DragonConfig")
				{
					ButtonManager.clickButtonById(ButtonId);
				}
				ButtonId = "DragonConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBehiddenDragon";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBehiddenDragon";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}
initializeDragonButtons();

/**
 * Skill Bar Setup
*/
var SkillConfigurations = [{
     subject: "smashing|锤法设置",
    buttons: [{
        label: 'yushi|玉石俱焚',
        title: "玉石俱焚",
		id : "yushi",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['玉石俱焚']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('玉石俱焚'), 1 );
            }
        }
    }, {
        label: 'zhengdao|正道十七',
        title: "正道十七",
		id : "zhengdao",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['正道十七']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('正道十七'), 1 );
            }
        }
    }, {label: 'huanyin|幻阴指锤',
        title: "幻阴指锤",
		id : "huanyin",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['幻阴指锤']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('幻阴指锤'), 1 );
            }
        }
    }, {label: 'xuanyin|玄胤天雷',
        title: "玄胤天雷",
		id : "xuanyin",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['玄胤天雷']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('玄胤天雷'), 1 );
            }
        }
    }, {
        label: 'tianhuo|天火飞锤',
        title: "天火飞锤",
		id : "tianhuo",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['天火飞锤']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('天火飞锤'), 1 );
            }
        }
    },]
}, {
    subject: "spear|枪法设置",

    buttons: [{
        label: 'jiuxi|九溪断月枪',
        title: "九溪断月枪",
		id : "jiuxi",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['九溪断月枪']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('九溪断月枪'), 1 );
            }
        }
    }, {
        label: 'liaoyuan|燎原百破',
        title: "燎原百破",
		id : "liaoyuan",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['燎原百破']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('燎原百破'), 1 );
            }
        }
    },{
        label: 'shenlong|神龙东来',
        title: "九溪断月枪",
		id : "shenlong",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['神龙东来']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('神龙东来'), 1 );
            }
        }
    }, {
        label: 'pomoqiang|冰月破魔枪',
        title: "冰月破魔枪",
		id : "pomoqiang",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['冰月破魔枪']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('冰月破魔枪'), 1 );
            }
        }
    }, {
        label: 'liaoyuanbaiji|燎原百击',
        title: "燎原百击",
		id : "liaoyuanbaiji",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['燎原百击']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('燎原百击'), 1 );
            }
        }
    }]
}, {
    subject: "split|斧法设置",

   buttons: [{
       label: 'liudao|六道轮回',
        title: "六道轮回",
		id : "liudao",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['六道轮回']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('六道轮回'), 1 );
            }
        }
    }, {label: 'dugu|独孤斧诀',
        title: "独孤斧诀",
		id : "dugu",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['独孤斧诀']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('独孤斧诀'), 1 );
            }
        }
    }, {label: 'qingming|青冥血斧',
        title: "青冥血斧",
		id : "qingming",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['青冥血斧']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('青冥血斧'), 1 );
            }
        }
    }, {
        label: 'hanyun|昊云破周斧',
        title: "昊云破周斧",
		id : "hanyun",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['昊云破周斧']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('昊云破周斧'), 1 );
            }
        }
    }, {
     label: '四海|四海断潮斩',
        title: "四海断潮斩",
		id : "sihai",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['四海断潮斩']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('四海断潮斩'), 1 );
            }
        }
    },]
}, {
    subject: "stick|棍法设置",

    buttons: [{
        label: 'pojun|破军棍诀',
        title: "破军棍诀",
		id : "pojun",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['破军棍诀']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('破军棍诀'), 1 );
            }
        }
    }, {
        label: 'qianying|千影百伤棍',
        title: "千影百伤棍",
		id : "qianying",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['千影百伤棍']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('千影百伤棍'), 1 );
            }
        }
    },{
        label: 'yueyeguixiao|月夜鬼萧',
        title: "月夜鬼萧",
		id : "yueyeguixiao",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['月夜鬼萧']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('月夜鬼萧'), 1 );
            }
        }
    }]
}, {
    subject: "unarmedset|拳掌设置",

    buttons: [{
        label: 'paiyun|排云掌法',
        title: "排云掌法",
		id : "paiyun",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['排云掌法']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('排云掌法'), 1 );
            }
        }
    }, {
        label: 'rulai|如来神掌',
        title: "如来神掌",
		id : "rulai",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['如来神掌']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('如来神掌'), 1 );
            }
        }
    }]
}, {
    subject: "Swordset|剑法设置",

    buttons: [{
        label: 'jiutian|九天龙吟剑法',
        title: "九天龙吟剑法",
		id : "jiutian",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['九天龙吟剑法']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('九天龙吟剑法'), 1 );
            }
        }
    }, {
        label: 'fuyu|覆雨剑法',
        title: "覆雨剑法",
		id : "fuyu",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['覆雨剑法']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('覆雨剑法'), 1 );
            }
        }
    }, {
        label: 'zhibing|织冰剑法',
        title: "织冰剑法",
		id : "zhibing",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['织冰剑法']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('织冰剑法'), 1 );
            }
        }
    },{
        label: 'bufansanjian|不凡三剑',
        title: "不凡三剑",
		id : "bufansanjian",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['不凡三剑']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('不凡三剑'), 1 );
            }
        }
    }]
}, {
    subject: "Throwing|暗器设置",

    buttons: [{
        label: 'kongque|孔雀翎',
        title: "孔雀翎",
		id : "kongque",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['孔雀翎']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('孔雀翎'), 1 );
            }
        }
    }, {
        label: 'feidao|飞刀绝技',
        title: "飞刀绝技",
		id : "feidao",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['飞刀绝技']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('飞刀绝技'), 1 );
            }
        }
    }]
}, {
    subject: "Blade|刀法设置",

    buttons: [{
        label: 'xueyin|雪饮狂刀',
        title: "雪饮狂刀",
		id : "xueyin",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['雪饮狂刀']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('雪饮狂刀'), 1 );
            }
        }
    }, {
        label: 'fanyun|翻云刀法',
        title: "翻云刀法",
		id : "fanyun",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['翻云刀法']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('翻云刀法'), 1 );
            }
        }
    }]
}, {
    subject: "staff|杖法设置",

    buttons: [{
        label: 'xuantian|玄天杖法',
        title: "玄天杖法",
		id : "xuantian",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['玄天杖法']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('玄天杖法'), 1 );
            }
        }
    }, {
        label: 'huiyue|辉月杖法',
        title: "辉月杖法",
		id : "huiyue",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['辉月杖法']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('辉月杖法'), 1 );
            }
        }
    }]
}, {
    subject: "whip|鞭法设置",

    buttons: [{
        label: 'nianhua|拈花解语鞭',
        title: "拈花解语鞭",
		id : "nianhua",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['拈花解语鞭']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('拈花解语鞭'), 1 );
            }
        }
    }, {
        label: 'shinu|十怒绞龙索',
        title: "十怒绞龙索",
		id : "shinu",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				skillcombo.push.apply(skillcombo,['十怒绞龙索']);
				combo = [skillcombo];
            } else {
                skillcombo.splice(skillcombo.indexOf('十怒绞龙索'), 1 );
            }
        }
    }]
}]



var initializeSkillButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 19;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < SkillConfigurations.length; i++) {
        let group = SkillConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "技能设定";
        button.title = "六气阵组合设定";
		button.id = "SkillConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "175px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBehiddenSkill").attr("hidden", "true");
				if (ButtonId == "SkillConfig")
				{
					ButtonId = "";
				}
            } else {
                $(".canBehiddenSkill").removeAttr("hidden");
				if (ButtonId != "SkillConfig")
				{
					ButtonManager.clickButtonById(ButtonId);
				}
				ButtonId = "SkillConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBehiddenSkill";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBehiddenSkill";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

/**
 * Tu Po Setup
*/
var TupoConfigurations = [{
    subject: "spear|枪法设置",

    buttons: [{
        label: 'jiuxi|九溪断月枪',
        title: "九溪断月枪",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable jxdyq');
                        overrideclick('tupo go,jxdyq');
                        overrideclick('tupo_speedup3 jxdyq go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'liaoyuan|燎原百破',
        title: "燎原百破",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable lybp');
                        overrideclick('tupo go,lybp');
                        overrideclick('tupo_speedup3 lybp go');
                    }
                },60000);
            } else {

            }
        }
    },{
        label: 'pomoqiang|冰月破魔枪',
        title: "冰月破魔枪",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable bingyuepomoqiang');
                        overrideclick('tupo go,bingyuepomoqiang');
                        overrideclick('tupo_speedup3 bingyuepomoqiang go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'liaoyuanbaiji|燎原百击',
        title: "燎原百击",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable liaoyuanbaiji');
                        overrideclick('tupo go,liaoyuanbaiji');
                        overrideclick('tupo_speedup3 liaoyuanbaiji go');
                    }
                },60000);
            } else {

            }
        }
    }]
}, {
    subject: "stick|棍法设置",

    buttons: [{
        label: 'pojun|破军棍诀',
        title: "破军棍诀",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable pjgj');
                        overrideclick('tupo go,pjgj');
                        overrideclick('tupo_speedup3 pjgj go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'qianying|千影百伤棍',
        title: "千影百伤棍",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable qybsg');
                        overrideclick('tupo go,qybsg');
                        overrideclick('tupo_speedup3 qybsg go');
                    }
                },60000);
            } else {

            }
        }
    },{
        label: 'yueyeguixiao|月夜鬼萧',
        title: "月夜鬼萧",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable yueyeguixiao');
                        overrideclick('tupo go,yueyeguixiao');
                        overrideclick('tupo_speedup3 yueyeguixiao go');
                    }
                },60000);
            } else {

            }
        }
    }]
}, {
    subject: "unarmedset|拳掌设置",

    buttons: [{
        label: 'paiyun|排云掌法',
        title: "排云掌法",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable paiyun-zhang');
                        overrideclick('tupo go,paiyun-zhang');
                        overrideclick('tupo_speedup3 paiyun-zhang go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'rulai|如来神掌',
        title: "如来神掌",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable rulai-zhang');
                        overrideclick('tupo go,rulai-zhang');
                        overrideclick('tupo_speedup3 rulai-zhang go');
                    }
                },60000);
            } else {

            }
         }
    }, {
        label: 'nianbazhang|降龙廿八掌',
        title: "降龙廿八掌",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable xianglongnianbazhang');
                        overrideclick('tupo go,xianglongnianbazhang');
                        overrideclick('tupo_speedup3 xianglongnianbazhang go');
                    }
                },60000);
            } else {

            }
         }
    }]
}, {
    subject: "Swordset|剑法设置",

    buttons: [{
        label: 'jiutian|九天龙吟剑法',
        title: "九天龙吟剑法",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable jiutian-sword');
                        overrideclick('tupo go,jiutian-sword');
                        overrideclick('tupo_speedup3 jiutian-sword go');
                    }
                },60000);
            } else {

            }
        }
    }, /*{
        label: 'bihai|碧海潮生剑',
        title: "碧海潮生剑",
        id: "bihaichaosheng",

        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s+13) && m==52){
                        overrideclick('enable bihai-sword');
                        overrideclick('tupo go,bihai-sword');
                        overrideclick('tupo_speedup3 bihai-sword go');
                    }
                },60000);
            } else {

            }
        }
    },*/{
        label: 'fuyu|覆雨剑法',
        title: "覆雨剑法",
        eventOnClick() {
             if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable fuyu-sword');
                        overrideclick('tupo go,fuyu-sword');
                        overrideclick('tupo_speedup3 fuyu-sword go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'zhibing|织冰剑法',
        title: "织冰剑法",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable binggong-jianfa');
                        overrideclick('tupo go,binggong-jianfa');
                        overrideclick('tupo_speedup3 binggong-jianfa go');
                    }
                },60000);
            } else {

            }
        }
    }]
}, {
    subject: "Throwing|暗器设置",

    buttons: [{
        label: 'kongque|孔雀翎',
        title: "孔雀翎",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable kongqueling');
                        overrideclick('tupo go,kongqueling');
                        overrideclick('tupo_speedup3 kongqueling go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'feidao|飞刀绝技',
        title: "飞刀绝技",
        eventOnClick() {
             if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable feidao');
                        overrideclick('tupo go,feidao');
                        overrideclick('tupo_speedup3 feidao go');
                    }
                },60000);
            } else {

            }
        }
    }]
}, {
    subject: "Blade|刀法设置",

    buttons: [{
        label: 'xueyin|雪饮狂刀',
        title: "雪饮狂刀",
        eventOnClick() {
             if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable xueyin-blade');
                        overrideclick('tupo go,xueyin-blade');
                        overrideclick('tupo_speedup3 xueyin-blade go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'fanyun|翻云刀法',
        title: "翻云刀法",
        eventOnClick() {
             if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable fanyun-blade');
                        overrideclick('tupo go,fanyun-blade');
                        overrideclick('tupo_speedup3 fanyun-blade go');
                    }
                },60000);
            } else {

            }
        }
    }]
}, {
    subject: "staff|杖法设置",

    buttons: [{
        label: 'xuantian|玄天杖法',
        title: "玄天杖法",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable xtzf');
                        overrideclick('tupo go,xtzf');
                        overrideclick('tupo_speedup3 xtzf go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'huiyue|辉月杖法',
        title: "辉月杖法",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable hyzf');
                        overrideclick('tupo go,hyzf');
                        overrideclick('tupo_speedup3 hyzf go');
                    }
                },60000);
            } else {

            }
        }
    }]
}, {
    subject: "whip|鞭法设置",

    buttons: [{
        label: 'nianhua|拈花解语鞭',
        title: "拈花解语鞭",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable zhjyb');
                        overrideclick('tupo go,zhjyb');
                        overrideclick('tupo_speedup3 zhjyb go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'shinu|十怒绞龙索',
        title: "十怒绞龙索",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable snjls');
                        overrideclick('tupo go,snjls');
                        overrideclick('tupo_speedup3 snjls go');
                    }
                },60000);
            } else {

            }
        }
    }]
},{
    subject: "qinggong|轻功设置",

    buttons: [{
        label: 'wanliu|万流归一',
        title: "万流归一",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable wanliuguiyi');
                        overrideclick('tupo go,wanliuguiyi');
                        overrideclick('tupo_speedup3 wanliuguiyi go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'youhuan|幽影幻虚步',
        title: "幽影幻虚步",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable yyhuanxubu');
                        overrideclick('tupo go,yyhuanxubu');
                        overrideclick('tupo_speedup3 yyhuanxubu go');
                    }
                },60000);
            } else {

            }
        }
    },{
        label: 'yunmeng|云梦归月',
        title: "云梦归月",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable yunmengguiyue');
                        overrideclick('tupo go,yunmengguiyue');
                        overrideclick('tupo_speedup3 yunmengguiyue go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'tianmo|天魔妙舞',
        title: "天魔妙舞",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable tianmomiaowu');
                        overrideclick('tupo go,tianmomiaowu');
                        overrideclick('tupo_speedup3 tianmomiaowu go');
                    }
                },60000);
            } else {

            }
        }
    }]
}, {
    subject: "neigong|内功设置",

    buttons: [{
        label: 'daozhong|道种心魔经',
        title: "道种心魔经",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable dzxinmojing');
                        overrideclick('tupo go,dzxinmojing');
                        overrideclick('tupo_speedup3 dzxinmojing go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'shengsheng|生生造化功',
        title: "生生造化功",
        eventOnClick() {
           if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable sszaohuagong');
                        overrideclick('tupo go,sszaohuagong');
                        overrideclick('tupo_speedup3 sszaohuagong go');
                    }
                },60000);
            } else {

            }
        }
    },{
        label: 'zixue|紫血大法',
        title: "紫血大法",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable zixuedafa');
                        overrideclick('tupo go,zixuedafa');
                        overrideclick('tupo_speedup3 zixuedafa go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'baishou|白首太玄经',
        title: "白首太玄经",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable baishoutaixuanjing');
                        overrideclick('tupo go,baishoutaixuanjing');
                        overrideclick('tupo_speedup3 baishoutaixuanjing go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'longxiang|龙象般若功',
        title: "龙象般若功",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable longxiangbanruogong');
                        overrideclick('tupo go,longxiangbanruogong');
                        overrideclick('tupo_speedup3 longxiangbanruogong go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'changchunbulao|长春不老功',
        title: "长春不老功",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable changchunbulaogong');
                        overrideclick('tupo go,changchunbulaogong');
                        overrideclick('tupo_speedup3 changchunbulaogong go');
                    }
                },60000);
            } else {

            }
        }
    }, {
        label: 'jiuyinni|九阴逆',
        title: "九阴逆",
        eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
				var timeTask=setInterval(function(){
                    var date=new Date();
                    var w=date.getDay();
                    var h=date.getHours();
                    var m=date.getMinutes();
                    var s=date.getMonth();
                    var AutoTime = sessionStorage.getItem("AutoTime");
                    //alert("时间:"+h+m+s);
                    if(h==(s-1)&&m==(2*w-2)){
                        overrideclick('enable jiuyinni');
                        overrideclick('tupo go,jiuyinni');
                        overrideclick('tupo_speedup3 jiuyinni go');
                    }
                },60000);
            } else {

            }
        }
    }]
}]



var initializeTupoButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 19;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < TupoConfigurations.length; i++) {
        let group = TupoConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "定时突破";
        button.title = "固定时间突破固定技能";
		button.id = "TupoConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "200px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBehiddenTupo").attr("hidden", "true");
				if (ButtonId == "TupoConfig")
				{
					ButtonId = "";
				}
            } else {
                $(".canBehiddenTupo").removeAttr("hidden");
				if (ButtonId != "TupoConfig")
				{
					ButtonManager.clickButtonById(ButtonId);
				}
				ButtonId = "TupoConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBehiddenTupo";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBehiddenTupo";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

/**
 * ItemUse Bar Setup
*/
var ItemUseConfigurations = [{
    subject: "ItemUse|物品使用",

    buttons: [{
        label: 'xuanhongling|吃悬红令',
        title: '吃悬红令',
        eventOnClick() {
            clickButton('items use obj_xuankongling');
        }

    },{
        label: 'shimenling|吃师门令',
        title: '吃师门令',
        eventOnClick() {
            clickButton('items get_store /obj/shop/shimenling');
            clickButton('items use obj_shimenling');
            clickButton('items use obj_shimenling');
            clickButton('items use obj_shimenling');
            clickButton('items put_store obj_shimenling');
        }

    },{
        label: 'bangpailing|吃帮派令',
        title: '吃帮派令',
        eventOnClick() {
            clickButton('items get_store /obj/shop/bangpailing');
            clickButton('items use obj_bangpailing');
            clickButton('items use obj_bangpailing');
            clickButton('items put_store obj_bangpailing');
        }
    },{
        label: 'zhuangyuanling|吃状元帖',
        title: '吃状元帖',
        eventOnClick() {
            clickButton('items get_store /obj/med/zhuangyuantie');
            clickButton('items use obj_zhuangyuantie');
            clickButton('items use obj_zhuangyuantie');
            clickButton('items put_store obj_zhuangyuantie');
        }
    },{
        label: 'jianghuling|吃江湖令',
        title: '吃江湖令',
        eventOnClick() {
            clickButton('items get_store /obj/shop/jianghuling');
            clickButton('items use obj_jianghuling');
            clickButton('items use obj_jianghuling');
            clickButton('items use obj_jianghuling');
            clickButton('items put_store obj_jianghuling');
        }
    },{
        label: 'zhengxieling|吃正邪令',
        title: '吃正邪令',
        eventOnClick() {
            clickButton('items get_store /obj/shop/zhengxieling');
            clickButton('items use obj_zhengxieling');
            clickButton('items use obj_zhengxieling');
            clickButton('items use obj_zhengxieling');
            clickButton('items put_store obj_zhengxieling');
        }
    },{
        label: 'mitiling|吃谜题令',
        title: '吃谜题令',
        eventOnClick() {
            clickButton('items get_store /obj/shop/mitiling');
            clickButton('items use obj_mitiling');
            clickButton('items put_store obj_mitiling');
        }
    },{
        label: 'baojigoumai|购买暴击',
        title: '暴击购买',
        eventOnClick() {
            clickButton('vip buy_task');
        }
    },{
        label: 'canyequchu|取出残页',
        title: '取出残页',
        eventOnClick() {
            overrideclick('items get_store /obj/book/baifashenjiancanye');
            overrideclick('items get_store /obj/book/jiuyinxuanbingjiancanye');
            overrideclick('items get_store /obj/book/tianmoxuejiancanye');
            overrideclick('items get_store /obj/book/xiaoyunlongtengjiancanye');
            overrideclick('items get_store /obj/book/yuenvleihenjiancanye');
            overrideclick('items get_store /obj/book/changshengjianfacanye');
            overrideclick('items get_store /obj/book/zhoutianjianpucanye');
        }
    },{
        label: 'lajiquchu|取出垃圾',
        title: '取出垃圾',
        eventOnClick() {

            overrideclick('items get_store /obj/book/huajianzuiyingjiancanye');//回血残页
            overrideclick('items get_store /obj/book/tianshanfeijiancanye');//敏捷残页
            overrideclick('items get_store /obj/yushi/jiutianluo1');//九天落1级玉
            overrideclick('items get_store /obj/yushi/jiutianluo2');//九天落2级玉
            overrideclick('items get_store /obj/yushi/dixisui1');//帝玺碎1级玉
            overrideclick('items get_store /obj/yushi/dixisui2');//帝玺碎2级玉
            overrideclick('items get_store /obj/yushi/juzimo1');//钜子墨1级玉
            overrideclick('items get_store /obj/yushi/juzimo2');//钜子墨2级玉
            overrideclick('items get_store /obj/yushi/donghaibi1');//东海碧1级玉
            overrideclick('items get_store /obj/yushi/donghaibi2');//东海碧2级玉
            overrideclick('items get_store /obj/yushi/kunlunyin1');//昆仑印1级玉
            overrideclick('items get_store /obj/yushi/kunlunyin2');//昆仑印2级玉
            overrideclick('items get_store /obj/baoshi/lvbaoshi1');//绿宝石碎裂
            overrideclick('items get_store /obj/baoshi/lvbaoshi2');//绿宝石裂开
            overrideclick('items get_store /obj/baoshi/hongbaoshi1');//红宝石碎裂
            overrideclick('items get_store /obj/baoshi/hongbaoshi2');//红宝石裂开
            overrideclick('items get_store /obj/baoshi/lanbaoshi1');//蓝宝石碎裂
            overrideclick('items get_store /obj/baoshi/lanbaoshi2');//蓝宝石裂开
            overrideclick('items get_store /obj/baoshi/huangbaoshi1');//黄宝石碎裂
            overrideclick('items get_store /obj/baoshi/huangbaoshi2');//黄宝石裂开
            overrideclick('items get_store /obj/baoshi/lvbaoshi1');//绿宝石碎裂
            overrideclick('items get_store /obj/baoshi/lvbaoshi2');//绿宝石裂开
            overrideclick('iitems get_store /obj/shop/kongshi_juanxiu');//空识卷轴
            overrideclick('items get_store /obj/book/wumu-yishu');//武穆
            overrideclick('items get_store /obj/shop/yinwuzhujian');//隐武
//            go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;w;w;n;w');//找游四海
//            overrideclick('reclaim recl 63 go obj_huajianzuiyingjiancanye');//卖回血残页
//            overrideclick('reclaim recl 32 go obj_tianshanfeijiancanye');//卖敏捷残页
//            overrideclick('reclaim recl 5381 go obj_kunlunyin1');//卖回血残页
        }
    },{
        label: 'putongtupo|普通突破',
        title: '普通突破',
        eventOnClick() {
            clickButton('tupo_speedup');
        }
    },{
        label: 'gaojitupo|高级突破',
        title: '高级突破',
        eventOnClick() {
            clickButton('tupo_speedup2');
        }
    },{
        label: 'chaojitupo|超级突破',
        title: '超级突破',
        eventOnClick() {
            clickButton('tupo_speedup3');
        }
    }]
}]

var initializeItemUseButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 17;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < ItemUseConfigurations.length; i++) {
        let group = ItemUseConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "物品使用";
        button.title = "可以来回切换";
        button.id = "ItemUseConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "250px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBeHiddenItemUse").attr("hidden", "true");
                if (ButtonId == "ItemUseConfig")
                {
                    ButtonId = "";
                }
            } else {
                $(".canBeHiddenItemUse").removeAttr("hidden");
                if (ButtonId != "ItemUseConfig")
                {
                    ButtonManager.clickButtonById(ButtonId);
                }
                ButtonId = "ItemUseConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBeHiddenItemUse";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBeHiddenItemUse";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

/**
 * Yuanbao Bar Setup
*/
var YuanbaoConfigurations = [{
    subject: "Yuanbao|元宝日常",

    buttons: [{
        label: 'huajiegongji|花街攻击',
        title: '花街攻击',
        eventOnClick() {
            go('jh 46;e;e;e;e;e;e;e;e;n;n;n;e;e;n;event_1_5392021 go');
        }

    },{
        label: 'huajieneili|花街内力',
        title: '花街内力',
        eventOnClick() {
            go('jh 46;e;e;e;e;e;e;e;e;n;n;n;e;e;s;event_1_29896809 go');
        }

    },{
        label: 'yangzhouwumiao|扬州武庙',
        title: '扬州武庙',
        eventOnClick() {
            overrideclick("shop buy shop37");
            go('jh 5;n;n;n;n;n;n;w;event_1_69751810;');
            overrideclick("event_1_43899943 go 4");
            overrideclick("home");
        }
    },{
        label: 'kuangshanwakuang|矿山挖矿',
        title: '矿山挖矿',
        eventOnClick() {
            go('jh 2;n;n;n;n;n;n;n;n;n;n;w;w;');
            overrideclick("event_1_85329567");
            overrideclick("event_1_42250469");
            overrideclick("event_1_48689119");
            overrideclick("w");
            overrideclick("w");
            overrideclick("event_1_22034949");
            for (i=0; i<5; i++){
                overrideclick('event_1_40548659');
            }
            overrideclick("event_1_83697921");
            for (i=0; i<5; i++){
                overrideclick('event_1_64388826');
            }
            overrideclick("event_1_21731755");
            for (i=0; i<5; i++){
                overrideclick('vent_1_22920188');
            }
        }
    },{
        label: 'tianzikuang|天矿N次',
        title: '天矿N次',
        eventOnClick() {
            for(j=0; j<80; j++){
                overrideclick("event_1_21731755");
                for (i=0; i<5; i++){
                    go('event_1_22920188');
                }
            }
        }
    },{
        label: 'licai|自动理财',
        title: '自动理财',
        eventOnClick() {
            go('jh 2;n;n;n;n;n;n;n;e');
            overrideclick('client_prompt touzi_jihua2 buy 6');
            overrideclick('touzi_jihua2 buy 6', 1);
            overrideclick('touzi_jihua2 buygo go6');
            overrideclick('tzjh_lq');
            go('home');
        }
    },]
}]

var initializeYuanbaoButtons = function () {

    var CONST_BUTTON_WIDTH = 90;
    var CONST_BUTTON_HEIGHT = 20;
    var CONST_BUTTON_OFFSET_LANDSCAPE = 5;
    var CONST_BUTTON_NUMBER_EACH_COLUMN = 17;
    var CONST_DEFAULT_TOP = 30;

    var topPx = CONST_DEFAULT_TOP;
    var rightPx = 0;
    var counter = 0;

    createGeneralControlButton();

    for (let i = 0; i < YuanbaoConfigurations.length; i++) {
        let group = YuanbaoConfigurations[i];

        createSubject(group.subject);
        createButtons(group.buttons);
        if (group.additionalPosition) {
            createReservedPosition(group.additionalPosition);
        }
    }

    function createGeneralControlButton() {
        let button = document.createElement('button');
        button.innerText = button.name = "元宝日常";
        button.title = "可以来回切换";
        button.id = "YuanbaoConfig";
        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = 20 + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx;
        button.style.top = "225px";

        button.addEventListener('click', function eventOnClick() {
            if (ButtonManager.toggleButtonEvent(this)) {
                $(".canBeHiddenYuanbao").attr("hidden", "true");
                if (ButtonId == "YuanbaoConfig")
                {
                    ButtonId = "";
                }
            } else {
                $(".canBeHiddenYuanbao").removeAttr("hidden");
                if (ButtonId != "YuanbaoConfig")
                {
                    ButtonManager.clickButtonById(ButtonId);
                }
                ButtonId = "YuanbaoConfig";
            }
        });

        document.body.appendChild(button);
    }

    function createReservedPosition(number) {
        for (let i = 0; i < number; i++) {
            let button = document.createElement('button');

            adjustPosition(button);
            button.innerText = "";
            button.hidden = true;

            document.body.appendChild(button);
        }
    }

    function buildLabel(labelConf) {
        let labels = labelConf.split("|");

        if (CONST_LANGUAGE_IN_CHINESE && labels.length > 1) {
            return labels[1];
        } else {
            return labels[0];
        }
    }

    function createSubject(subject) {
        let button = document.createElement('button');

        button.innerText = buildLabel(subject);
        adjustPosition(button);
        button.style.border = "none";
        button.style.background = "white";
        button.disabled = true;
        button.className = "canBeHiddenYuanbao";

        document.body.appendChild(button);
    }

    function adjustPosition(button) {
        let column = (Math.ceil((counter + 1) / CONST_BUTTON_NUMBER_EACH_COLUMN) - 1);

        rightPx = (column+1) * (CONST_BUTTON_WIDTH + CONST_BUTTON_OFFSET_LANDSCAPE);
        topPx = (counter - column * CONST_BUTTON_NUMBER_EACH_COLUMN) % CONST_BUTTON_NUMBER_EACH_COLUMN === 0 ? CONST_DEFAULT_TOP : topPx + 25;

        button.style.width = CONST_BUTTON_WIDTH + 'px';
        button.style.height = CONST_BUTTON_HEIGHT + 'px';
        button.style.position = 'absolute';
        button.style.right = rightPx + 'px';
        button.style.top = topPx + "px";

        counter++;
    }

    function createButtons(buttons) {
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].hidden) continue;

            let button = createButton(buttons[j]);
            button.addEventListener('click', buttons[j].eventOnClick);
        }
    }

    function createButton(conf) {
        let button = document.createElement('button');

        adjustPosition(button);
        button.innerText = buildLabel(conf.label);
        button.name = button.innerText;
        button.className = "canBeHiddenYuanbao";

        if (conf.id) button.id = conf.id;
        if (conf.title) button.title = conf.title;

        document.body.appendChild(button);
        return button;
    }
}

function initializeAllSettings() {
    ButtonManager.clickButtonById("DailyTasksConfig");
    ButtonManager.clickButtonById("AutoFightConfig");
    ButtonManager.clickButtonById("SpecialEventConfig");
    ButtonManager.clickButtonById("BattleConfig");
    ButtonManager.clickButtonById("DragonConfig");
    ButtonManager.clickButtonById("SkillConfig");
    ButtonManager.clickButtonById("TupoConfig");
    ButtonManager.clickButtonById("ItemUseConfig");
    ButtonManager.clickButtonById("YuanbaoConfig");
    ButtonManager.clickButtonById("LianZhao");
    ButtonManager.clickButtonById("clearlog");
//    ButtonManager.clickButtonById("holdconnect");
    ButtonManager.clickButtonById("autoreconnect");
    ButtonManager.clickButtonById("killhide");
    if(uid=="3778114"){
        ButtonManager.clickButtonById("Moon");
        ButtonManager.clickButtonById("Sun");
        ButtonManager.clickButtonById("drug");
        ButtonManager.clickButtonById("Yintian");
        ButtonManager.clickButtonById("Dragon");
        ButtonManager.clickButtonById("qianying");
        ButtonManager.clickButtonById("liaoyuan");
        ButtonManager.clickButtonById("autoreconnect");
    }
    if(uid=="6645812"){
        ButtonManager.clickButtonById("Yintian");
        ButtonManager.clickButtonById("Dragon");
        ButtonManager.clickButtonById("Flower");
//        ButtonManager.clickButtonById("AutoKill");
        ButtonManager.clickButtonById("liaoyuan");
    }
    if(uid=="6644281"){
        ButtonManager.clickButtonById("Learder");
        ButtonManager.clickButtonById("Moon");
        ButtonManager.clickButtonById("Sun");
        ButtonManager.clickButtonById("drug");
        ButtonManager.clickButtonById("Dragon");
        ButtonManager.clickButtonById("moxuan");
        ButtonManager.clickButtonById("bingpo");
        ButtonManager.clickButtonById("riguang");
    }
    if(uid=="6732731"){
        ButtonManager.clickButtonById("Learder");
        ButtonManager.clickButtonById("Moon");
        ButtonManager.clickButtonById("Sun");
        ButtonManager.clickButtonById("drug");
        ButtonManager.clickButtonById("Dragon");
        ButtonManager.clickButtonById("moxuan");
        ButtonManager.clickButtonById("bingpo");
        ButtonManager.clickButtonById("riguang");
        ButtonManager.clickButtonById("liaoyuan");
    }
    if(uid=="3764304"){
        ButtonManager.clickButtonById("Learder");
        ButtonManager.clickButtonById("Moon");
        ButtonManager.clickButtonById("Sun");
        ButtonManager.clickButtonById("drug");
        ButtonManager.clickButtonById("Dragon");
        ButtonManager.clickButtonById("moxuan");
        ButtonManager.clickButtonById("bingpo");
        ButtonManager.clickButtonById("riguang");
        ButtonManager.clickButtonById("liaoyuan");
        ButtonManager.clickButtonById("qianying");
    }
    if(uid=="3722239"){
        ButtonManager.clickButtonById("pomoqiang");

    }
}

    var SettingButton = document.createElement('button');
    var hiddenflg = 0;
    SettingButton.innerText = '';
    SettingButton.style.position = 'absolute';
    SettingButton.style.left = '50px';
    SettingButton.style.top = '0px';
    SettingButton.style.width = "120px";
    SettingButton.style.height = "30px";
    SettingButton.style.backgroundColor="transparent";
    SettingButton.style.border="none";
    document.body.appendChild(SettingButton);

        SettingButton.addEventListener('click', function eventOnClick() {
            if (hiddenflg == 0) {
                hiddenflg = 1;
                DisplayAndHiddenBtn("DailyTasksConfig", "h");
                DisplayAndHiddenBtn("AutoFightConfig", "h");
                DisplayAndHiddenBtn("SpecialEventConfig", "h");
                DisplayAndHiddenBtn("BattleConfig", "h");
                DisplayAndHiddenBtn("DragonConfig", "h");
                DisplayAndHiddenBtn("SkillConfig", "h");
                DisplayAndHiddenBtn("TupoConfig", "h");
                DisplayAndHiddenBtn("ItemUseConfig", "h");
                DisplayAndHiddenBtn("YuanbaoConfig", "h");
                ButtonManager.clickButtonById(ButtonId);
            } else {
                hiddenflg = 0;
                DisplayAndHiddenBtn("DailyTasksConfig", "d");
                DisplayAndHiddenBtn("AutoFightConfig", "d");
                DisplayAndHiddenBtn("SpecialEventConfig", "d");
                DisplayAndHiddenBtn("BattleConfig", "d");
                DisplayAndHiddenBtn("DragonConfig", "d");
                DisplayAndHiddenBtn("SkillConfig", "d");
                DisplayAndHiddenBtn("TupoConfig", "d");
                DisplayAndHiddenBtn("ItemUseConfig", "d");
                DisplayAndHiddenBtn("YuanbaoConfig", "d");
                ButtonManager.clickButtonById("BattleConfig");
            }
        });

function DisplayAndHiddenBtn(btnId, type) {
    var currentBtn = document.getElementById(btnId);
    if (type == "d") {
        currentBtn.style.display = "block"; //style中的display属性
    }
    else if (type == "h") {
        currentBtn.style.display = "none";
    }
}
initializeItemUseButtons();
initializeYuanbaoButtons();
initializeSkillButtons();
initializeTupoButtons();
initializeAllSettings();

