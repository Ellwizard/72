// ==UserScript==
// @name         跟招脚本
// @namespace    http://mingy.org/
// @version      1.0.1
// @author       Mingy
// @match        http://sword-direct1.yytou.cn/*
// @match        http://sword-server1.yytou.cn/*
// @match        http://sword-server1-360.yytou.cn/*
// @run-at       document-idle
// @grant        unsafeWindow
// @grant        GM_info
// ==/UserScript==
// v1.0.0.02 2018.05.24 增加逃犯的触发器#t+ taofan
// v1.0.0.04 2018.05.24 增加手机长按打开命令行的功能
// v1.0.0.05 2018.05.24 修复在部分房间首次登入方向指令错误的BUG
// v1.0.0.06 2018.05.25 F1对于没有阵法的江湖绝学也能一起释放
// v1.0.1    2019.05.14 增加游侠技能

(function(window) {
    'use strict';

    if (self != top) {
        top.location.href = location.href;
        return;
    }

    var load_timeout = 6;
    var load_interval = setInterval(function() {
	if (!window.gSocketMsg || !window.gSocketMsg2) {
        if (--load_timeout == 0) {
            clearInterval(load_interval);
        }
		return;
	}
	if (!g_obj_map.get('msg_attrs')) {
        if (--load_timeout == 0) {
            clearInterval(load_interval);
        } else {
            clickButton('attrs');
        }
		return;
	}
    clearInterval(load_interval);

	var user_id_pattern1 = /^u[0-9]+$/;
	var user_id_pattern2 = /^u[0-9]+\-/;
	var kuafu_name_pattern = /^\[[0-9]+\]/;
    var sorted_power_skills = ['天魔策','六道轮回','天外飞仙','玉石俱焚','小李飞刀','神龙东来','天刀八决',
			'紫虚辟邪剑','释迦拈花指','子母龙凤环','左手刀法','神剑慧芒','燎原百击','冰玄鞭法','游龙剑','九星定形针','幻阴指锤','折花百式','青冥血斧',
			'降魔杖法','飞鸿鞭法','降龙廿八掌','正道十七','无相六阳掌','九字真言印','移花接玉刀','冰月破魔枪','弹指神通','不凡三剑','独孤斧决',
			'九溪断月枪', '燎原百破', '昊云破周斧', '四海断潮斩', '天火飞锤', '玄胤天雷', '玄天杖法', '辉月杖法',
            '破军棍诀', '千影百伤棍', '十怒绞龙索', '拈花解语鞭', '飞刀绝技', '孔雀翎', '排云掌法', '如来神掌', '九天龙吟剑法',
            '覆雨剑法', '织冰剑法', '雪饮狂刀', '翻云刀法','月夜鬼萧','打狗棒法',];
	var skill_chains = [ '九天龙吟剑法', '覆雨剑法', '织冰剑法', '排云掌法', '如来神掌', '雪饮狂刀',
			'翻云刀法', '飞刀绝技', '孔雀翎', '道种心魔经', '生生造化功', '幽影幻虚步', '万流归一',
			'燎原百破', '九溪断月枪', '玄胤天雷', '天火飞锤', '四海断潮斩', '昊云破周斧',
			'千影百伤棍', '破军棍诀', '拈花解语鞭', '十怒绞龙索', '辉月杖法', '玄天杖法',
			'紫虚辟邪剑','释迦拈花指','子母龙凤环','左手刀法','神剑慧芒','燎原百击','冰玄鞭法','游龙剑','九星定形针','幻阴指锤','折花百式','青冥血斧',
			'降魔杖法','飞鸿鞭法','降龙廿八掌','正道十七','无相六阳掌','九字真言印','移花接玉刀','冰月破魔枪','不凡三剑','独孤斧决',
			'天魔策','六道轮回','天外飞仙','玉石俱焚','小李飞刀','神龙东来','天刀八决'];
	var force_skills = [ '九阴逆','长春不老功','紫血大法','龙象般若功','白首太玄经','道种心魔经', '生生造化功', '不动明王诀', '八荒功', '易筋经神功', '天邪神功',
			'紫霞神功', '葵花宝典', '九阴真经', '茅山道术', '蛤蟆神功', '碧血心法' ];
    var perform_skills = [ '降龙十八掌', '九阴噬骨刀', '九阴白骨爪', '独孤九剑', '玄铁剑法', '黯然销魂掌', '暴雨梨花针', '六脉神剑',
            '镇国龙枪', '烈血十式', '春风快意刀法', '无相金刚掌', '倚天剑法', '七星夺魄剑', '辟邪剑法', '屠龙刀法', '连珠腐尸功',
            '碧海潮生剑', '真武七截剑', '蛤蟆神拳', '龙渊玉英杖', '十二都天神杖', '天师灭神剑', '斗战棍典', '霜寒十四棍', '天羽奇剑',
            '帝王剑法', '捆仙鞭法', '无归鞭法', '七星剑法', '万象流云刀法', '十阳灭冥箭' ];
	var defence_patterns = [ /(.*)顿时被冲开老远，失去了攻击之势！/, /(.*)被(.*)的真气所迫，只好放弃攻击！/,
			/(.*)衣裳鼓起，真气直接将(.*)逼开了！/, /(.*)找到了闪躲的空间！/, /(.*)朝边上一步闪开！/,
			/面对(.*)的攻击，(.*)毫不为惧！/, /(.*)使出“(.*)”，希望扰乱(.*)的视线！/,
			/(.*)深深吸了几口气，脸色看起来好多了。/ ];
    var power_skills = new Map();
    power_skills.put('九天龙吟剑法', [ '排云掌法', '雪饮狂刀', '千影百伤棍', '燎原百破' ]);
    power_skills.put('覆雨剑法', [ '翻云刀法', '如来神掌', '昊云破周斧', '拈花解语鞭' ]);
    power_skills.put('织冰剑法', [ '孔雀翎', '飞刀绝技', '玄天杖法', '天火飞锤' ]);
    power_skills.put('排云掌法', [ '九天龙吟剑法', '雪饮狂刀', '辉月杖法', '千影百伤棍', '玄胤天雷', '十怒绞龙索' ]);
    power_skills.put('如来神掌', [ '覆雨剑法', '孔雀翎', '昊云破周斧', '九溪断月枪' ]);
    power_skills.put('雪饮狂刀', [ '九天龙吟剑法', '排云掌法', '辉月杖法', '十怒绞龙索' ]);
    power_skills.put('翻云刀法', [ '覆雨剑法', '飞刀绝技', '破军棍诀', '天火飞锤', '燎原百破' ]);
    power_skills.put('飞刀绝技', [ '翻云刀法', '织冰剑法', '玄天杖法', '玄胤天雷', '九溪断月枪' ]);
    power_skills.put('孔雀翎', [ '如来神掌', '织冰剑法', '四海断潮斩', '破军棍诀' ]);
    power_skills.put('燎原百破', [ '千影百伤棍', '十怒绞龙索', '九天龙吟剑法', '翻云刀法' ]);
    power_skills.put('九溪断月枪', [ '拈花解语鞭', '玄天杖法', '孔雀翎', '如来神掌' ]);
    power_skills.put('玄胤天雷', [ '辉月杖法', '十怒绞龙索', '排云掌法', '孔雀翎' ]);
    power_skills.put('天火飞锤', [ '玄天杖法', '破军棍诀', '翻云刀法', '织冰剑法' ]);
    power_skills.put('四海断潮斩', [ '辉月杖法', '千影百伤棍', '雪饮狂刀', '飞刀绝技' ]);
    power_skills.put('昊云破周斧', [ '破军棍诀', '拈花解语鞭', '覆雨剑法', '如来神掌' ]);
    power_skills.put('千影百伤棍', [ '燎原百破', '四海断潮斩', '九天龙吟剑法', '排云掌法' ]);
    power_skills.put('破军棍诀', [ '昊云破周斧', '天火飞锤', '翻云刀法', '飞刀绝技' ]);
    power_skills.put('拈花解语鞭', [ '昊云破周斧', '九溪断月枪', '覆雨剑法' ]);
    power_skills.put('十怒绞龙索', [ '燎原百破', '玄胤天雷', '排云掌法', '雪饮狂刀' ]);
    power_skills.put('辉月杖法', [ '四海断潮斩', '玄胤天雷', '排云掌法', '雪饮狂刀' ]);
    power_skills.put('玄天杖法', [ '织冰剑法', '孔雀翎', '九溪断月枪', '天火飞锤' ]);
	power_skills.put('紫虚辟邪剑', [ '神龙东来','天刀八决','降魔杖法','冰月破魔枪' ]);
	power_skills.put('释迦拈花指', [ '小李飞刀','神龙东来','九字真言印','打狗棒法','不凡三剑' ]);
	power_skills.put('子母龙凤环', [ '神龙东来','天刀八决','飞鸿鞭法','独孤斧决' ]);
	power_skills.put('左手刀法', [ '小李飞刀','神龙东来','飞鸿鞭法','冰月破魔枪' ]);
	power_skills.put('神剑慧芒', [ '小李飞刀','神龙东来','九字真言印','独孤斧决' ]);
	power_skills.put('燎原百击', [ '小李飞刀','天刀八决','降龙廿八掌','不凡三剑' ]);
	power_skills.put('冰玄鞭法', [ '小李飞刀','天刀八决','移花接玉刀','不凡三剑' ]);
	power_skills.put('游龙剑', [ '小李飞刀','天刀八决','正道十七','无相六阳掌' ]);
	power_skills.put('九星定形针', [ '神龙东来','天刀八决','降龙廿八掌','月夜鬼萧' ]);
	power_skills.put('幻阴指锤', [ '小李飞刀','天刀八决','九字真言印','移花接玉刀' ]);
	power_skills.put('折花百式', [ '神龙东来','天刀八决','降魔杖法','飞鸿鞭法' ]);
	power_skills.put('青冥血斧', [ '小李飞刀','天刀八决','无相六阳掌','月夜鬼萧' ]);
	power_skills.put('降魔杖法', [ '六道轮回','玉石俱焚','神龙东来','紫虚辟邪剑','折花百式' ]);
	power_skills.put('飞鸿鞭法', [ '天魔策','天外飞仙','子母龙凤环','左手刀法','折花百式' ]);
	power_skills.put('降龙廿八掌', [ '六道轮回','天外飞仙','玉石俱焚','燎原百击','折花百式' ]);
	power_skills.put('正道十七', [ '天魔策','天外飞仙','游龙剑','月夜鬼萧' ]);
	power_skills.put('无相六阳掌', [ '六道轮回','天外飞仙','玉石俱焚','游龙剑','青冥血斧' ]);
	power_skills.put('九字真言印', [ '天魔策','六道轮回','玉石俱焚','释迦拈花指','神剑慧芒','幻阴指锤' ]);
	power_skills.put('月夜鬼萧', [ '天魔策','天外飞仙','神龙东来','九星定形针','青冥血斧' ]);
	power_skills.put('移花接玉刀', [ '六道轮回','天外飞仙','玉石俱焚','冰玄鞭法','幻阴指锤' ]);
	power_skills.put('冰月破魔枪', [ '天魔策','天外飞仙','紫虚辟邪剑','左手刀法' ]);
	power_skills.put('打狗棒法', [ '六道轮回','玉石俱焚','小李飞刀','天刀八决','释迦拈花指' ]);
	power_skills.put('不凡三剑', [ '天魔策','六道轮回','玉石俱焚','释迦拈花指','燎原百击','冰玄鞭法' ]);
	power_skills.put('独孤斧决', [ '天魔策','天外飞仙','子母龙凤环','神剑慧芒' ]);
	power_skills.put('天魔策', [ '飞鸿鞭法','正道十七','九字真言印','月夜鬼萧','冰月破魔枪','不凡三剑','独孤斧决' ]);
	power_skills.put('六道轮回', [ '降魔杖法','降龙廿八掌','无相六阳掌','九字真言印','移花接玉刀','打狗棒法','不凡三剑' ]);
	power_skills.put('天外飞仙', [ '飞鸿鞭法','降龙廿八掌','正道十七','无相六阳掌','月夜鬼萧','移花接玉刀','冰月破魔枪','独孤斧决' ]);
	power_skills.put('玉石俱焚', [ '降魔杖法','降龙廿八掌','无相六阳掌','九字真言印','移花接玉刀','打狗棒法','不凡三剑' ]);
	power_skills.put('小李飞刀', [ '释迦拈花指','左手刀法','神剑慧芒','燎原百击','冰玄鞭法','游龙剑','幻阴指锤','青冥血斧','打狗棒法' ]);
	power_skills.put('神龙东来', [ '紫虚辟邪剑','释迦拈花指','子母龙凤环','左手刀法','神剑慧芒','九星定形针','折花百式','降魔杖法','月夜鬼萧' ]);
	power_skills.put('天刀八决', [ '紫虚辟邪剑','子母龙凤环','子母龙凤环','燎原百击','冰玄鞭法','游龙剑','九星定形针','幻阴指锤','折花百式','青冥血斧','打狗棒法' ]);

	var message_listeners = [];
	var listener_seq = 0;
	function add_listener(type, subtype, fn, is_pre) {
		var listener = {
			'id' : ++listener_seq,
			'fn' : fn,
            'filters' : []
		};
        var types = type instanceof Array ? type : [ type ];
        for (var i = 0; i < types.length; i++) {
            var t = types[i];
            var c = t.length > 0 ? t.substr(t.length - 1) : '';
            var b = !!is_pre;
            if (c == '-') {
                t = t.substr(0, t.length - 1);
                b = true;
            } else if (c == '+') {
                t = t.substr(0, t.length - 1);
                b = false;
            }
            listener.filters.push({'type': t, 'subtype': subtype, 'is_pre': b});
        }
		message_listeners.push(listener);
		return listener.id;
	}
	function remove_listener(id) {
		for ( var i = 0; i < message_listeners.length; i++) {
			if (message_listeners[i].id == id) {
				message_listeners.splice(i, 1);
                break;
			}
		}
	}
	function get_listener(id) {
		for ( var i = 0; i < message_listeners.length; i++) {
			if (message_listeners[i].id == id) {
				return message_listeners[i];
			}
		}
        return null;
	}
	var _dispatch_message = window.gSocketMsg.dispatchMessage;
	window.gSocketMsg.dispatchMessage = function(msg) {
		for ( var i = 0; i < message_listeners.length; i++) {
			var listener = message_listeners[i];
            for (var j = 0; j < listener.filters.length; j++) {
                var filter = listener.filters[j];
                if (filter.is_pre && filter.type == msg.get('type')
                        && (!filter.subtype || filter.subtype == msg.get('subtype')
                        || (filter.subtype instanceof Array && $.inArray(msg.get('subtype'), filter.subtype) >= 0))) {
                    if (listener.fn(msg)) {
                        return;
                    }
                }
            }
		}
        _dispatch_message.apply(this, arguments);
		for ( var i = 0; i < message_listeners.length; i++) {
			var listener = message_listeners[i];
            for (var j = 0; j < listener.filters.length; j++) {
                var filter = listener.filters[j];
                if (!filter.is_pre && filter.type == msg.get('type')
                        && (!filter.subtype || filter.subtype == msg.get('subtype')
                        || (filter.subtype instanceof Array && $.inArray(msg.get('subtype'), filter.subtype) >= 0))) {
                    if (listener.fn(msg)) {
                        return;
                    }
                }
            }
		}
	};
    function log(text) {
        var msg = new Map();
        msg.put('type', 'main_msg');
        msg.put('ctype', 'text');
        msg.put('msg', HIG + text);
        _dispatch_message(msg);
        console.log(text);
    }

	window.Date.prototype.format = function (fmt) { //author: meizz
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "H+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
	    for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
	    return fmt;
	};
    function is_mobile() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    }

    var CombatInfo = function() {
        this._my_id = g_obj_map.get('msg_attrs').get('id');
        this._vs1 = new Map();
        this._vs2 = new Map();
        this._uids = new Map();
        this._names = new Map();
        this._my_npc = [];
        this._target_npc = [];
        var vs_info = g_obj_map.get('msg_vs_info');
        if (vs_info) {
            this.parse_vs_info(vs_info);
        }
        this._vs_text = '';
        this._pfm_text = '';
        this._pfm_name = '';
        this._heal_count = 0;
        this._has_guard1 = false;
        this._has_guard2 = false;
    };
    CombatInfo.prototype = {
        parse_vs_info: function(vs_info) {
            if (this._my_id != g_obj_map.get('msg_attrs').get('id')) {
                this._my_id = g_obj_map.get('msg_attrs').get('id');
                this.clear();
            }
            this._vs_info = vs_info;
            this._vs1.clear();
            this._vs2.clear();
            this._uids.clear();
            for (var i = 1; i <= 8; i++) {
                var vid = this._vs_info.get('vs1_pos_v' + i);
                if (vid) {
                    var vs = {
                        vid: vid,
                        uid: this._vs_info.get('vs1_pos' + i),
                        pos: 'vs1' + i,
                        name: removeSGR(this._vs_info.get('vs1_name' + i)),
                        kee: parseInt(this._vs_info.get('vs1_kee' + i)),
                        max_kee: parseInt(this._vs_info.get('vs1_max_kee' + i)),
                        force: parseInt(this._vs_info.get('vs1_force' + i)),
                        max_force: parseInt(this._vs_info.get('vs1_max_force' + i)),
                        xdz: parseInt(this._vs_info.get('vs1_xdz' + i)),
                        max_xdz: parseInt(this._vs_info.get('vs1_max_xdz' + i))
                    };
                    if (this.is_kuafu && kuafu_name_pattern.test(vs.name)) {
                        var j = vs.name.indexOf(']');
                        vs.disp_name = vs.name.substr(0, j) + '区' + vs.name.substr(j, vs.name.length - j);
                    } else {
                        vs.disp_name = vs.name;
                    }
                    vs.is_player = is_player(vs.uid);
                    this._vs1.put(vid, vs);
                    this._uids.put(vs.uid, vid);
                    this._names.put(vs.uid, vs.name);
                    if (!vs.is_player) {
                        if (vs.name == '金甲符兵') {
                            this._has_guard1 = true;
                        } else if (vs.name == '玄阴符兵') {
                            this._has_guard2 = true;
                        }
                    }
                }
            }
            for (var i = 1; i <= 8; i++) {
                var vid = this._vs_info.get('vs2_pos_v' + i);
                if (vid) {
                    var vs = {
                        vid: vid,
                        uid: this._vs_info.get('vs2_pos' + i),
                        pos: 'vs2' + i,
                        name: removeSGR(this._vs_info.get('vs2_name' + i)),
                        kee: parseInt(this._vs_info.get('vs2_kee' + i)),
                        max_kee: parseInt(this._vs_info.get('vs2_max_kee' + i)),
                        force: parseInt(this._vs_info.get('vs2_force' + i)),
                        max_force: parseInt(this._vs_info.get('vs2_max_force' + i)),
                        xdz: parseInt(this._vs_info.get('vs2_xdz' + i)),
                        max_xdz: parseInt(this._vs_info.get('vs2_max_xdz' + i))
                    };
                    if (this.is_kuafu && kuafu_name_pattern.test(vs.name)) {
                        var j = vs.name.indexOf(']');
                        vs.disp_name = vs.name.substr(0, j) + '区' + vs.name.substr(j, vs.name.length - j);
                    } else {
                        vs.disp_name = vs.name;
                    }
                    vs.is_player = is_player(vs.uid);
                    this._vs2.put(vid, vs);
                    this._uids.put(vs.uid, vid);
                    this._names.put(vs.uid, vs.name);
                    if (!vs.is_player) {
                        if (vs.name == '金甲符兵') {
                            this._has_guard1 = true;
                        } else if (vs.name == '玄阴符兵') {
                            this._has_guard2 = true;
                        }
                    }
                }
            }
            this._my_side = undefined;
            this._target_side = undefined;
            var vid = this._uids.get(this._my_id);
            if (vid) {
                this._my_vs = this._vs1.get(vid);
                if (this._my_vs) {
                    this._my_side = this._vs1;
                    this._target_side = this._vs2;
                } else {
                    this._my_vs = this._vs2.get(vid);
                    if (this._my_vs) {
                        this._my_side = this._vs2;
                        this._target_side = this._vs1;
                    }
                }
                if (this._my_vs) {
                    this._my_vs.max_kee = parseInt(g_obj_map.get('msg_attrs').get('max_kee'));
                }
            }
            if (this._my_side) {
                var npc = [];
                var vids = this._my_side.keys();
                for (var i = 0; i < vids.length; i++) {
                    var vs = this._my_side.get(vids[i]);
                    if (!vs.is_player) {
                        npc.push(vs.vid);
                    }
                }
                for (var i = this._my_npc.length - 1; i >= 0; i--) {
                    var vs = this._my_npc[i].vs;
                    if (npc.indexOf(vs.vid) < 0 || vs.uid != this._my_side.get(vs.vid).uid) {
                        this._my_npc.splice(i, 1);
                    } else {
                        this._my_npc[i].vs = this._my_side.get(vs.vid);
                    }
                }
                for (var i = 0; i < npc.length; i++) {
                    var b = false;
                    for (var j = 0; j < this._my_npc.length; j++) {
                        if (this._my_npc[j].vs.vid == npc[i]) {
                            b = true;
                            break;
                        }
                    }
                    if (!b) {
                        this._my_npc.push({vs: this._my_side.get(npc[i]), is_attack: false});
                    }
                }
                npc = [];
                vids = this._target_side.keys();
                for (var i = 0; i < vids.length; i++) {
                    var vs = this._target_side.get(vids[i]);
                    if (!vs.is_player) {
                        npc.push(vs.vid);
                    }
                }
                for (var i = this._target_npc.length - 1; i >= 0; i--) {
                    var vs = this._target_npc[i].vs;
                    if (npc.indexOf(vs.vid) < 0 || vs.uid != this._target_side.get(vs.vid).uid) {
                        this._target_npc.splice(i, 1);
                    } else {
                        this._target_npc[i].vs = this._target_side.get(vs.vid);
                    }
                }
                for (var i = 0; i < npc.length; i++) {
                    var b = false;
                    for (var j = 0; j < this._target_npc.length; j++) {
                        if (this._target_npc[j].vs.vid == npc[i]) {
                            b = true;
                            break;
                        }
                    }
                    if (!b) {
                        this._target_npc.push({vs: this._target_side.get(npc[i]), is_attack: false, is_attack_npc: false});
                    }
                }
            } else {
                this._my_npc = [];
                this._target_npc = [];
            }
        },
        receive_msg: function(msg) {
            var subtype = msg.get('subtype');
            if (subtype == 'vs_info') {
                this.parse_vs_info(msg);
            } else if (subtype == 'playskill' && parseInt(msg.get('ret')) == 0) {
                this._pfm_text = this._vs_text;
                this._vs_text = '';
                var r = this._pfm_text.match(/^--\s*(.+)\s*--\s*(.+)\s*--$/m);
                if (r) {
                    this._pfm_name = r[2];
                } else {
                    this._pfm_name = '';
                }
                if (this.in_combat) {
                    this._pfm_target = undefined;
                    if (!is_defence(this._pfm_text)) {
                        var attacker = this.get_vs_by_vid(msg.get('vid'));
                        var vs_list = this.is_my_side(msg.get('vid')) ? this._target_side : this._my_side;
                        var vids = vs_list.keys();
                        for (var i = 0; i < vids.length; i++) {
                            var vs = vs_list.get(vids[i]);
                            if (this._pfm_text.indexOf(vs.disp_name) >= 0) {
                                this._pfm_target = vids[i];
                                break;
                            }
                        }
                        if (!this._pfm_target && !this.is_my_side(msg.get('vid'))) {
                            if (this._pfm_text.indexOf('你') >= 0) {
                                this._pfm_target = this._my_vs.vid;
                            }
                        }
                    }
                    if (msg.get('uid') == this._my_id) {
                        this._my_vs.xdz -= parseInt(msg.get('lose_xdz'));
                        if (this._pfm_text.indexOf('你深深吸了几口气，脸色看起来好多了。') >= 0) {
                            this._heal_count++;
                        }
                    } else {
                        var npc = this.get_npc_by_vid(msg.get('vid'));
                        if (npc) {
                            if (is_defence(this._pfm_text)) {
                                npc.is_attack = false;
                                npc.is_attack_npc = false;
                            } else {
                                npc.is_attack = true;
                                npc.is_attack_npc = false;
                                if (this._pfm_target) {
                                    var npc_list = this.is_my_side(msg.get('vid')) ? this._target_npc : this._my_npc;
                                    for (var i = 0; i < npc_list.length; i++) {
                                        if (npc_list[i].vs.vid == this._pfm_target) {
                                            npc.is_attack_npc = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (subtype == 'add_xdz' && msg.get('uid') == this._my_id) {
                this._my_vs.xdz = parseInt(msg.get('xdz'));
            } else if (subtype == 'attack') {
                var vs = this.get_vs_by_vid(msg.get('rvid'));
                if (vs) {
                    vs.kee = parseInt(msg.get('kee'));
                }
                if (msg.get('avid')) {
                    this._vs_text = '';
                    var npc = this.get_npc_by_vid(msg.get('avid'));
                    if (npc) {
                        npc.is_attack = false;
                        npc.is_attack_npc = false;
                    }
                    var npc = this.get_npc_by_vid(msg.get('rvid'));
                    if (npc) {
                        npc.is_attack = false;
                        npc.is_attack_npc = false;
                    }
                }
            } else if (subtype == 'lose_force') {
                var vs = this.get_vs_by_vid(msg.get('vid'));
                if (vs) {
                    vs.force = parseInt(msg.get('force'));
                }
            } else if (subtype == 'text') {
                if (msg.get('msg')) {
                    this._vs_text += removeSGR(msg.get('msg'));
                }
            } else if (subtype == 'die') {
                var b = false;
                for (var i = 0; i < this._my_npc.length; i++) {
                    if (this._my_npc[i].vs.vid == msg.get('vid')) {
                        this._my_npc.splice(i, 1);
                        b = true;
                        break;
                    }
                }
                if (!b) {
                    for (var i = 0; i < this._target_npc.length; i++) {
                        if (this._target_npc[i].vs.vid == msg.get('vid')) {
                            this._target_npc.splice(i, 1);
                            break;
                        }
                    }
                }
             } else if (subtype == 'combat_result') {
                this.clear();
            }
        },
        clear: function() {
            this._vs_info = undefined;
            this._vs1.clear();
            this._vs2.clear();
            this._uids.clear();
            this._names.clear();
            this._my_side = undefined;
            this._target_side = undefined;
            this._my_vs = undefined;
            this._vs_text = '';
            this._pfm_text = '';
            this._pfm_name = '';
            this._pfm_target = undefined;
            this._my_npc = [];
            this._target_npc = [];
            this._heal_count = 0;
            this._has_guard1 = false;
            this._has_guard2 = false;
        },
        get vs_info() {
            return this._vs_info;
        },
        get is_kuafu() {
            return this._my_id.indexOf('-') >= 0;
        },
        get my_id() {
            return this._my_id;
        },
        get my_vs() {
            return this._my_vs;
        },
        get in_combat() {
            return !!this._my_vs;
        },
        get heal_count() {
            return this._heal_count;
        },
        get has_guard1() {
            return this._has_guard1;
        },
        get has_guard2() {
            return this._has_guard2;
        },
        get pfm_text() {
            return this._pfm_text;
        },
        get pfm_name() {
            return this._pfm_name;
        },
        get pfm_target() {
            return this._pfm_target;
        },
        get my_side_num() {
            var num = 0;
            var vids = this._my_side.keys();
            for (var i = 0; i < vids.length; i++) {
                if (this._my_side.get(vids[i]).kee > 0) {
                    num++;
                }
            }
            return num;
        },
        get target_side_num() {
            var num = 0;
            var vids = this._target_side.keys();
            for (var i = 0; i < vids.length; i++) {
                if (this._target_side.get(vids[i]).kee > 0) {
                    num++;
                }
            }
            return num;
        },
        get is_1v1_player() {
            return this.in_combat && this.my_side_num == 1 && this.target_side_num == 1 && this.has_player_target;
        },
        get is_1v1_npc() {
            return this.in_combat && this.my_side_num == 1 && this.target_side_num == 1 && !this.has_player_target;
        },
        get my_npc_is_attack() {
            for (var i = 0; i < this._my_npc.length; i++) {
                if (this._my_npc[i].is_attack) {
                    return true;
                }
            }
            return false;
        },
        get my_npc_is_attack_npc() {
            for (var i = 0; i < this._my_npc.length; i++) {
                if (this._my_npc[i].is_attack && this._my_npc[i].is_attack_npc) {
                    return true;
                }
            }
            return false;
        },
        get target_npc_is_attack() {
            for (var i = 0; i < this._target_npc.length; i++) {
                if (this._target_npc[i].is_attack) {
                    return true;
                }
            }
            return false;
        },
        get target_npc_is_attack_npc() {
            for (var i = 0; i < this._target_npc.length; i++) {
                if (this._target_npc[i].is_attack && this._target_npc[i].is_attack_npc) {
                    return true;
                }
            }
            return false;
        },
        get has_player_target() {
            var vids = this._target_side.keys();
            for (var i = 0; i < vids.length; i++) {
                var vs = this._target_side.get(vids[i]);
                if (vs.is_player && vs.kee > 0) {
                    return true;
                }
            }
            return false;
        },
        get_vs_by_vid: function(vid) {
            var vs = this._vs1.get(vid);
            if (!vs) {
                vs = this._vs2.get(vid);
            }
            return vs;
        },
        get_vs_by_uid: function(uid) {
            var vid = this._uids.get(uid);
            if (vid) {
                return this.get_vs_by_vid(vid);
            }
            return null;
        },
        get_npc_by_vid: function(vid) {
            for (var i = 0; i < this._my_npc.length; i++) {
                var npc = this._my_npc[i];
                if (npc.vs.vid == vid) {
                    return npc;
                }
            }
            for (var i = 0; i < this._target_npc.length; i++) {
                var npc = this._target_npc[i];
                if (npc.vs.vid == vid) {
                    return npc;
                }
            }
            return null;
        },
        get_target_npc: function(index) {
            if (!index) {
                index = 0;
            }
            if (index < 0 || index >= this._target_npc.length) {
                return null;
            }
            return this._target_npc[index].vs;
        },
        get_name_by_uid: function(uid) {
            return this._names.get(uid);
        },
        is_player: function(vid) {
            var vs = this.get_vs_by_vid(vid);
            return vs && vs.is_player;
        },
        is_npc: function(vid) {
            var vs = this.get_vs_by_vid(vid);
            return vs && !vs.is_player;
        },
        is_my_side: function(vid) {
            return this._my_side && this._my_side.containsKey(vid);
        },
        get_skill_buttons: function() {
            return get_skill_buttons(this._my_vs.xdz);
        },
        do_perform: function(pfms, no_combo) {
            return do_perform(this.get_skill_buttons(), pfms, no_combo);
        },
        auto_perform: function(no_combo) {
            return select_perform(this._my_vs.xdz, no_combo);
        }
    };

    var combat_info = new CombatInfo(), assist_targets = [];
	add_listener('vs', '', function(msg) {
        combat_info.receive_msg(msg);
        if (!combat_info.in_combat || assist_targets.length == 0) {
            return;
        }
        var subtype = msg.get('subtype');
        if (subtype == 'vs_info') {
            $('td#vs11,td#vs12,td#vs13,td#vs14,td#vs15,td#vs16,td#vs17,td#vs18,td#vs21,td#vs22,td#vs23,td#vs24,td#vs25,td#vs26,td#vs27,td#vs28', '.out2').each(function() {
                var $e = $(this);
                if ($e.children().length == 0) {
                    $e.removeClass('attack_target');
                }
                if (!$e.hasClass('attack_target')) {
                    var i = assist_targets.indexOf($e.attr('id'));
                    if (i >= 0) {
                        assist_targets.splice(i, 1);
                    }
                }
            });
        } else if (subtype == 'die') {
            var vs = combat_info.get_vs_by_vid(msg.get('vid'));
            if (vs) {
                var i = assist_targets.indexOf(vs.pos);
                if (i >= 0) {
                    assist_targets.splice(i, 1);
                }
                $('.out2 td#' + vs.pos).removeClass('attack_target');
            }
        } else if (subtype == 'add_xdz' && msg.get('uid') == combat_info.my_id) {
            if (combat_info.my_vs.xdz >= 9) {
                if (combat_info.auto_perform(true)) {
                    console.log('======行动值满——随机攻击');
                }
            }
        } else if (subtype == 'playskill' && parseInt(msg.get('ret')) == 0 && msg.get('uid') != combat_info.my_id) {
            if (combat_info.is_my_side(msg.get('vid')) && combat_info.is_npc(msg.get('vid'))) {
                if (combat_info.my_vs.force < 4000 || combat_info.my_vs.force * 100 / combat_info.my_vs.max_force <= 40) {
                    if (combat_info.do_perform([ '不动明王诀' ], true)) {
                        console.log('======自动回蓝');
                        return;
                    }
                }
                if (combat_info.heal_count < 3 && combat_info.my_vs.kee * 100 / combat_info.my_vs.max_kee <= 65) {
                    if (combat_info.do_perform(force_skills, true)) {
                        console.log('======自动回血');
                        return;
                    }
                }
            }
            if (combat_info.is_my_side(msg.get('vid'))) {
                var vs = combat_info.get_vs_by_vid(msg.get('vid'));
                if (combat_info.pfm_target && assist_targets.indexOf(vs.pos) >= 0) {
                    if (combat_info.auto_perform()) {
                        console.log('======跟随 ' + vs.name + ' 攻击');
                        return;
                    }
                }
            }
        } else if (subtype == 'combat_result') {
            assist_targets = [];
        }
    });

	function is_defence(vs_text) {
		for ( var i = 0; i < defence_patterns.length; i++) {
			if (defence_patterns[i].test(vs_text)) {
				return true;
			}
		}
		return false;
	}
	function is_player(id) {
		return user_id_pattern1.test(id) || user_id_pattern2.test(id);
	}
	function removeSGR(text) {
		return text ? text.replace(/\u001b\[[;0-9]+m/g, '') : '';
	}
   function calc_xdz(pfms) {
        var xdz = 0;
        for (var i = 0; i < pfms.length; i++) {
            xdz += skill_chains.indexOf(pfms[i]) < 0 ? 2 : 3;
        }
        return xdz;
    }
	function get_skill_buttons(xdz) {
		var buttons = [];
		for ( var i = 0; i < 6; i++) {
			var button = g_obj_map.get('skill_button' + (i + 1));
			if (button && parseInt(button.get('xdz')) <= xdz) {
				buttons.push(removeSGR(button.get('name')));
			} else {
				buttons.push('');
			}
		}
		return buttons;
	}
    function check_perform(buttons, pfms) {
        for (var i = 0; i < pfms.length; i++) {
            if (buttons.indexOf(pfms[i]) < 0) {
                return false;
            }
        }
        return true;
    }
	function select_perform(xdz, no_combo, pfms) {
        var buttons = get_skill_buttons(xdz);
        if (pfms && pfms.length > 0) {
            var actions = [];
            for (var i = 0; i < pfms.length; i++) {
                var combo = pfms[i].split(/\s*\|\s*/);
                if (combo.length > 0 && (!no_combo || combo.length == 1)) {
                    actions.push([combo, calc_xdz(combo)]);
                }
            }
            actions = actions.sort(function(a, b) {
                return a[1] - b[1];
            });
            for (var i = actions.length - 1; i >= 0; i--) {
                if (xdz >= actions[i][1] && check_perform(buttons, actions[i][0])) {
                    return do_perform(buttons, actions[i][0]);
                }
            }
        }
        for (var i = 0; i < sorted_power_skills.length; i++) {
            var j = buttons.indexOf(sorted_power_skills[i]);
            if (j < 0) {
                continue;
            }
            if (no_combo) {
                clickButton('playskill ' + (j + 1));
                return true;
            }
            var pfms = power_skills.get(sorted_power_skills[i]);
            if (pfms) {
                for (var k = 1; k < buttons.length; k++) {
                    if (buttons[k] && k != j && pfms.indexOf(buttons[k]) >= 0) {
                        clickButton('playskill ' + (j + 1) + '\nplayskill '
                                    + (k + 1));
                        return true;
                    }
                }
                for (var k = i + 1; k < sorted_power_skills.length; k++) {
                    var l = buttons.indexOf(sorted_power_skills[k]);
                    if (l >= 0) {
                        clickButton('playskill ' + (j + 1) + '\nplayskill '
                                    + (l + 1));
                        return true;
                    }
                }
            }
        }
        return do_perform(buttons, perform_skills, true);
	}
	function do_perform(buttons, performs, no_combo) {
        var performed = false;
		for ( var i = 0; i < performs.length; i++) {
			for ( var j = 0; j < buttons.length; j++) {
				if (buttons[j] && performs[i] == buttons[j]) {
					clickButton('playskill ' + (j + 1));
					performed = true;
                    if (no_combo) {
                        return true;
                    }
				}
			}
		}
		return performed;
	}

    $('head').append('<style type="text/css">.attack_target {border: 1px solid red;} .power_up {border: 1px solid lime;}</style>');
    function enhance_combat() {
        assist_targets = [];
        $('td#vs11,td#vs12,td#vs13,td#vs14,td#vs15,td#vs16,td#vs17,td#vs18,td#vs21,td#vs22,td#vs23,td#vs24,td#vs25,td#vs26,td#vs27,td#vs28', '.out2').removeClass('attack_target');
        $('td#vs11,td#vs12,td#vs13,td#vs14,td#vs15,td#vs16,td#vs17,td#vs18,td#vs21,td#vs22,td#vs23,td#vs24,td#vs25,td#vs26,td#vs27,td#vs28', '.out2').click(function() {
            var vs = combat_info.my_vs;
            if (!vs) {
                return;
            }
            var $e = $(this);
            var id = $e.attr('id');
            if ($e.hasClass('attack_target')) {
                console.log('remove assist ' + id);
                $e.removeClass('attack_target');
                assist_targets.splice(assist_targets.indexOf(id), 1);
            } else if ($e.children().length > 0 && id != vs.pos) {
                console.log('add assist ' + id);
                $e.addClass('attack_target');
                assist_targets.push(id);
            }
        });
    }
    var _go_combat = window.gSocketMsg.go_combat;
	window.gSocketMsg.go_combat = function() {
		_go_combat.apply(this, arguments);
        enhance_combat();
	};
    enhance_combat();

    log('加载跟招脚本v' + GM_info.script.version);
    }, 500);
})(unsafeWindow);
