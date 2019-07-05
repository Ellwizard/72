// ==UserScript==
// @name         清正邪计划
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  try to take over the world!
// @author       You
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @grant        none
// ==/UserScript==
//-----------------
var inf_box = document.createElement("div");
inf_box.setAttribute("id","inf_box");
inf_box.style.position = "absolute";
inf_box.style.border = "1px solid #000000";
inf_box.style.display = "block";
inf_box.style.width = "400px";
inf_box.style.height = "140px";
inf_box.style.fontSize = "8px";
//inf_box.style.left = "40px";
inf_box.style.top = "450px";
inf_box.style.overflow = "hidden";
inf_box.style.pointerEvents = "none";
inf_box.style.backgroundColor = "rgba(255,255,255,0.5)";
if(!ispc()){
    inf_box.style.left = "40px";
}else{
    inf_box.style.left = "10px";
}
document.getElementById("page").appendChild(inf_box);
(function (window) {
    window.game = this;
    window.attachf = function() {
        webSocketMsg.prototype.old = gSocketMsg.dispatchMessage;
        gSocketMsg.dispatchMessage = function(b) {
            this.old(b);
            if (kanxitrigger == 1){
                kanxifeed.dispatchMessage(b);
            }
            if(qzx_off1==1){
                let type = b.get("type"), subType = b.get("subtype");
                if(type=="channel"&&subType=="sys"){
                    let msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
                    let y = msg.match(/【系统】(.*)对着(.*?)(笑道|叫道)/);
                    if(y){
                        let x = y[1].match(/(.*?)不怀好意地/);
                        if(x){
                            if(x[1]=="岳老三"&&qzx_kill_num==0){
                                go(zxroomlist[y[2]],x[1]);
                            }
                            if(qzx_kill_num==1){
                                if(x[1]!="岳老三"&&x[1]!="流寇"&&x[1]!="恶棍"&&x[1]!="云老四"){
                                    go(zxroomlist[y[2]],y[2]);
                                }
                            }
                        }else{
                            if(y[1]=="岳老三"&&qzx_kill_num==0){
                                go(zxroomlist[y[2]],y[1]);
                            }
                            if(qzx_kill_num==1){
                                if(y[1]!="岳老三"&&y[1]!="流寇"&&y[1]!="恶棍"&&y[1]!="云老四"){
                                    go(zxroomlist[y[2]],y[2]);
                                }
                            }
                        }
                    }
                }
            }
        };
    };
    attachf();
})(window);
var kanxifeed = new kanxifeedback();
var kanxitrigger = 1;//当这个的值为1时开始监听
var qzx_off = 0;
var qzx_fyx = null;
var inf_box_line = 0;
var qzx_kill = 0;
var qzx_off1 = 0;
var qzx_kill_num = 0;
var inf_obj = {
    undate:function(){
        let arr = Object.getOwnPropertyNames(inf_obj);
        let time_stamp = new Date().getTime();
        let text = "";
        for(let i=0;i<arr.length-1;i++){
            if(time_stamp>=inf_obj[arr[i]].clear){
                console.log("清除数据编号为："+inf_obj[arr[i]].index);
                delete inf_obj[arr[i]];
            }
        }
        arr = Object.getOwnPropertyNames(inf_obj);
        if(arr.length<27){
            for(let i=0;i<arr.length-1;i++){
                let obj=inf_obj[arr[i]];
                text+="时间："+obj.h+":"+obj.m+":"+obj.s+" 名称："+obj.name+" 位置："+obj.dp+"\n";
            }
        }else{
            for(let i=arr.length-26;i<arr.length-1;i++){
                let obj=inf_obj[arr[i]];
                text+="时间："+obj.h+":"+obj.m+":"+obj.s+" 名称："+obj.name+" 位置："+obj.dp+"\n";
            }
        }
        return text;
    }
};
function kanxifeedback(){
	this.dispatchMessage=function(b){
		let type = b.get("type"), subType = b.get("subtype");
        if(type=="main_msg"){
            let msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
            let y = msg.match(/(.*?)说道：(.*?)#/);
            if(y){
                if(y[1]!="你"){
                    return;
                }
                console.log("命令成立，命令为："+y[2]);
                if(y[2]=="开始清正邪"){
                    console.log("开始清正邪");
                    qzx_kill = 1;
                    let sureclock = new Date();
                    let seconds = sureclock.getSeconds();
                    let minutes = sureclock.getMinutes();
                    let hours = sureclock.getHours();
                    inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:"命令",dp:"开始清正邪",clear:sureclock.getTime()+60*1000,index:inf_box_line};
                    inf_box_line += 1;
                    inf_box.innerText = inf_obj.undate();
                    qzx_fyx = setInterval(zd,500);
                    qzx_off = 1;
                }else if(y[2]=="停止清正邪"){
                    console.log("停止清正邪");
                    qzx_kill = 0;
                    let sureclock = new Date();
                    let seconds = sureclock.getSeconds();
                    let minutes = sureclock.getMinutes();
                    let hours = sureclock.getHours();
                    inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:"命令",dp:"停止清正邪",clear:sureclock.getTime()+60*1000,index:inf_box_line};
                    inf_box_line += 1;
                    inf_box.innerText = inf_obj.undate();
                    if(qzx_fyx != null){
                        clearInterval(qzx_fyx);
                        qzx_fyx = null;
                    }
                    qzx_off = 0;
                }else if(y[2]=="打开消息盒子"){
                    inf_box.style.display = "block";
                }else if(y[2]=="关闭消息盒子"){
                    inf_box.style.display = "none";
                }else if(y[2]=="小号正气"){
                    console.log("小号正气");
                    qzx_off1 = 1;
                    qzx_kill_num = 0;
                    qzx_kill = 1;
                }else if(y[2]=="小号邪气"){
                    console.log("小号邪气");
                    qzx_off1 = 1;
                    qzx_kill_num = 1;
                    qzx_kill = 1;
                }else if(y[2]=="停止小号正邪"){
                    console.log("停止小号正邪");
                    qzx_off1 = 0;
                    qzx_kill_num = 0;
                    qzx_kill = 0;
                }else if(y[2]=="查看所有消息"){
                    let text = '';
                    let arr = Object.getOwnPropertyNames(inf_obj);
                    for(let i=0;i<arr.length-1;i++){
                        let obj=inf_obj[arr[i]];
                        text+="时间："+obj.h+":"+obj.m+":"+obj.s+" 名称："+obj.name+" 位置："+obj.dp+"\n";
                    }
                    alert(text);
                }else{
                    try{eval(y[2]);}catch(e){}
                }
            }
        }
		if(type=="channel"&&subType=="sys"){
			try{
			    let msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
			    let y = msg.match(/【系统】(.*)对着(.*?)(笑道|叫道)/);
                let jt = msg.match(/【系统】(.*?)慌不择路，逃往了(.*?)\-/);
                let shizi = msg.match(/【系统】【醒狮舞龙】(.*?)圣上特赐下(.*?)三对，请各位大侠前往(.*?)捕获，共享开年大喜。/);
                let cai = msg.match(/【系统】『大快朵颐』：天子赐福，传出御厨珍馐美味，六盘热气腾腾，香味扑鼻的(.*?)，请各位大侠速速赶往(.*?)赴宴。/);
                let yx = msg.match(/【系统】游侠会：听说(.*?)出来闯荡江湖了，目前正在前往(.*?)的路上。/);
                if(yx){
                    let sureclock = new Date();
                    let seconds = sureclock.getSeconds();
                    let minutes = sureclock.getMinutes();
                    let hours = sureclock.getHours();
                    console.log("时间："+hours+":"+minutes+":"+seconds+"\nname:"+yx[1]+"\n位置:"+yx[2]);
                    inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:yx[1],dp:yx[2],clear:sureclock.getTime()+60*60*1000,index:inf_box_line};
                    inf_box_line += 1;
                    inf_box.innerText = inf_obj.undate();
                }
               /* if(jt){
                    let sureclock = new Date();
                    let seconds = sureclock.getSeconds();
                    let minutes = sureclock.getMinutes();
                    let hours = sureclock.getHours();
                    console.log("时间："+hours+":"+minutes+":"+seconds+"\nname:"+jt[1]+"\n位置:"+jt[2]);
                    inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:jt[1],dp:jt[2],clear:sureclock.getTime()+60*60*1000,index:inf_box_line};
                    inf_box_line += 1;
                    inf_box.innerText = inf_obj.undate();
                }*/
                if(shizi){
                    let sureclock = new Date();
                    let seconds = sureclock.getSeconds();
                    let minutes = sureclock.getMinutes();
                    let hours = sureclock.getHours();
                    console.log("时间："+hours+":"+minutes+":"+seconds+"\nname:"+shizi[2]+"\n位置:"+shizi[3]);
                    inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:shizi[2],dp:shizi[3],clear:sureclock.getTime()+60*60*1000,index:inf_box_line};
                    inf_box_line += 1;
                    inf_box.innerText = inf_obj.undate();
                }
                if(cai){
                    let sureclock = new Date();
                    let seconds = sureclock.getSeconds();
                    let minutes = sureclock.getMinutes();
                    let hours = sureclock.getHours();
                    console.log("时间："+hours+":"+minutes+":"+seconds+"\n菜名:"+cai[1]+"\n位置:"+cai[2]);
                    inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:cai[1],dp:cai[2],clear:sureclock.getTime()+24*60*60*1000,index:inf_box_line};
                    inf_box_line += 1;
                    inf_box.innerText = inf_obj.undate();
                }
                if(y&&qzx_off==1){
                    let x = y[1].match(/(.*?)不怀好意地/);
                    if(x){
                        if(x[1]=="云老四"){
                            let shu = runnum(4);
                            let shu1 = shu%10;
                            if(shu1==8&&shu1==9){
                                console.log(x[1]+"不动");
                                return;
                            }
                        }
                        if(x[1]=="段老大"){
                            console.log(x[1]+"不动");
                            let sureclock = new Date();
                            let seconds = sureclock.getSeconds();
                            let minutes = sureclock.getMinutes();
                            let hours = sureclock.getHours();
                            inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:x[1],dp:y[2],clear:sureclock.getTime()+60*60*1000,index:inf_box_line};
                            inf_box_line += 1;
                            inf_box.innerText = inf_obj.undate();
                            return;
                        }
                        if(x[1]=="二娘"||x[1]=="剧盗"){
                            go(zxroomlist[y[2]],y[2]);
                        }else{
                            go(zxroomlist[y[2]],x[1]);
                        }
                    }else{
                        if(y[1]=="云老四"){
                            let shu = runnum(4);
                            let shu1 = shu%10;
                            if(shu1==8&&shu1==9){
                                console.log(x[1]+"不动");
                                return;
                            }
                        }
                        if(y[1]=="段老大"){
                            console.log(y[1]+"不动");
                            let sureclock = new Date();
                            let seconds = sureclock.getSeconds();
                            let minutes = sureclock.getMinutes();
                            let hours = sureclock.getHours();
                            inf_obj[inf_box_line] = {h:hours,m:minutes,s:seconds,name:y[1],dp:y[2],clear:sureclock.getTime()+60*60*1000,index:inf_box_line};
                            inf_box_line += 1;
                            inf_box.innerText = inf_obj.undate();
                            return;
                        }
                        if(y[1]=="二娘"||y[1]=="剧盗"){
                            go(zxroomlist[y[2]],y[2]);
                        }else{
                            go(zxroomlist[y[2]],y[1]);
                        }
                    }
                }
			}catch(e){
                //console.log(e);
            }
		}
        if (type=="vs"&&subType=="combat_result"){
            if(qzx_kill==1){
                clickButton("home");
            }
        }
	}
}
function jineng(jinengname){
        for (let i = 1; i < 7; i++) {
            let skillName = ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"));
            if (skillName == jinengname) {
                return i;
            }
        }
    return 0;
}
var zxroomlist = {
    "柳绘心":"jh 1;e;n;e;e;e;e;n",
    "王铁匠":"jh 1;e;n;n;w",
    "杨掌柜":"jh 1;e;n;n;n;w",
    "客商":"jh 2;n;n;e",
    "柳小花":"jh 2;n;n;n;n;w;s;w",
    "卖花姑娘":"jh 2;n;n;n;n;n;n;n",
    "刘守财":"jh 2;n;n;n;n;n;n;n;e",
    "方老板":"jh 3;s;s;e",
    "方寡妇":"jh 3;s;s;w;n",
    "朱老伯":"jh 3;s;s;w",
}
function go(str,name){
    let arr = str.split(";");
    going(arr,name);
}
var num = 0;
function going(arr,name){
    if(num>arr.length){
        if(name!=null&&name!=undefined){
            kill_int=setInterval(killfunc,500,name);
        }
        num = 0;
        return;
    }
    clickButton(arr[num]);
    num++;
    setTimeout(going,200,arr,name);
}
function killfunc(name){
    let name_list = $(".cmd_click3"),this_onclick = null;
    for (let i=1;i<name_list.length;i++) {
        if(name_list[i].innerText == name){
            this_onclick = name_list[i].getAttribute('onclick');
            clickButton('kill ' + this_onclick.split("'")[1].split(" ")[1]);
        }
    }
}
var kill_int = null;
function zd(){
    if(document.getElementById("combat_xdz_text")){
        if(kill_int!=null){
            clearInterval(kill_int);
            kill_int = null;
        }
        clickButton("fudi callout_youxia");
        clickButton("escape");
    }
}
function ispc(){
    let userAgentInfo = navigator.userAgent;
    let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    for(let i = 0;i<Agents.length;i++){
        if (userAgentInfo.indexOf(Agents[i]) >= 0){
            return false;
        }
    }
    return true;
}
function runnum(n){
    let num = "";
    for(let i = 0;i < n;i++){
        num += Math.floor(Math.random()*10);
    }
    return num;
}
function con_log(text){
    console.log(text);
}
