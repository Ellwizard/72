// ==UserScript==
// @name         自动记录潜龙
// @namespace    http://mingy.org/
// @version      1.0.0
// @description  论剑-自动记录潜龙插件
// @author       Mingy
// @match        http://sword-direct1.yytou.cn/*
// @match        http://sword-server1.yytou.cn/*
// @match        http://sword-server1-360.yytou.cn/*
// @run-at       document-idle
// @grant        unsafeWindow
// @grant        GM_info
// ==/UserScript==

(function(window) {
    'use strict';
    
    if (self != top) {
        top.location.href = location.href;
        return;
    }
    
    var load_interval = setInterval(function() {
	if (!window.gSocketMsg || !window.gSocketMsg2) {
		return;
	}
	if (!g_obj_map.get('msg_attrs')) {
        clickButton('attrs');
		return;
	}
    clearInterval(load_interval);
    
    var assistant = 'u7788045';
    var qianlong_all_targets1 = ['任侠', '暗刺客', '金刀客', '追命', '无花', '传鹰', '令东来', '西门吹雪', '石之轩', '朱大天王', '楚昭南', '阿青', '楚留香', '天山童姥', '乾罗', '令狐冲', '乔峰', '浪翻云'];
    var qianlong_all_targets2 = ['任侠', '暗刺客', '金刀客', '石幽明', '胡铁花', '蒙赤行', '厉工', '叶孤城', '祝玉妍', '萧秋水', '凌未风', '白猿', '石观音', '李秋水', '方夜羽', '东方不败', '慕容博', '庞斑'];
    
    function get_game_date(now) {
        return new Date((now || new Date().getTime()) - 6 * 60 * 60 * 1000).format("yyyy-MM-dd");
    }
    
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
    function fire_listener(msg, pre) {
		for ( var i = 0; i < message_listeners.length; i++) {
			var listener = message_listeners[i];
            for (var j = 0; j < listener.filters.length; j++) {
                var filter = listener.filters[j];
                if (!filter.is_pre == !pre && filter.type == msg.get('type')
                        && (!filter.subtype || filter.subtype == msg.get('subtype')
                        || (filter.subtype instanceof Array && $.inArray(msg.get('subtype'), filter.subtype) >= 0))) {
                    if (listener.fn(msg)) {
                        return true;
                    }
                }
            }
		}
        return false;
    }
	var _dispatch_message = window.gSocketMsg.dispatchMessage;
	window.gSocketMsg.dispatchMessage = function(msg) {
        if (msg.get('type') == 'main_msg' && msg.get('ctype') == 'text' && /：ASSIST\//.test(msg.get('msg'))) {
            return;
        } else if (msg.get('type') == 'channel' && msg.get('subtype') == 'tell' && /你告诉.+：ASSIST\//.test(msg.get('msg'))) {
            return;
        }
		if (!fire_listener(msg, true)) {
            _dispatch_message.apply(this, arguments);
            fire_listener(msg);
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
    
	function removeSGR(text) {
		return text ? text.replace(/\u001b\[[;0-9]+m/g, '') : '';
	}

    function qianlong_add(name) {
        clickButton('tell ' + assistant + ' ASSIST/潜龙/add/' + name);
    }

    function qianlong_del(name) {
        clickButton('tell ' + assistant + ' ASSIST/潜龙/del/' + name);
    }

    function qianlong_clear() {
        clickButton('tell ' + assistant + ' ASSIST/潜龙/clear');
    }

    function qianlong_list() {
        clickButton('tell ' + assistant + ' ASSIST/潜龙/list');
    }
   
	add_listener('channel', 'tell', function(msg) {
        var r = msg.get('msg').match(/^(.+)告诉你：ASSIST\/潜龙\/(.+)\/(.*)/);
        if (r) {
            if (r[2] == 'list') {
                var finished = r[3] ? r[3].split(/[,，]/).map(function(i) {
                    return parseInt(i);
                }) : [], remains = [];
                for (var i = 0; i < qianlong_all_targets1.length; i++) {
                    if (finished.indexOf(i + 1) < 0) {
                        remains.push(i + 1);
                    }
                }
                log('finished: ' + finished.join(' '));
                log('remains: ' + remains.join(' '));
                var list= [];
                for (var i = 0; i < remains.length; i++) {
                    list.push('[' + remains[i] + ']' + qianlong_all_targets1[remains[i] - 1] + 'vs' + qianlong_all_targets2[remains[i] - 1]);
                }
                log(list.join('\n'));
            } else if (r[2] == 'add') {
                if (r[3]) {
                    r[3].split(/[,，]/).map(function(i) {
                        return parseInt(i);
                    }).forEach(function(i) {
                        log('[' + i + ']' + qianlong_all_targets1[i - 1] + 'vs' + qianlong_all_targets2[i - 1] + ' added');
                    });
                }
                log('ok!');
            } else if (r[2] == 'del') {
                if (r[3]) {
                    r[3].split(/[,，]/).map(function(i) {
                        return parseInt(i);
                    }).forEach(function(i) {
                        log('[' + i + ']' + qianlong_all_targets1[i - 1] + 'vs' + qianlong_all_targets2[i - 1] + ' removed');
                    });
                }
                log('ok!');
            } else if (r[2] == 'clear') {
                log('ok!');
            }
        }
    });
    
	add_listener('vs', 'combat_result', function(msg) {
        var my_id = g_obj_map.get('msg_attrs').get('id');
        if (msg.get('win_uid') && msg.get('win_uid').indexOf(my_id) >= 0) {
            msg.get('win_uid').split(/\s*,\s*/).forEach(function(id, i) {
                if (id.substr(0, 4) == 'xswl') {
                    var vs_info = g_obj_map.get('msg_vs_info');
                    if (vs_info) {
                        if (vs_info.get('vs1_pos1') == id) {
                            qianlong_add(removeSGR(vs_info.get('vs1_name1')));
                        } else if (vs_info.get('vs2_pos1') == id) {
                            qianlong_add(removeSGR(vs_info.get('vs2_name1')));
                        }
                    }
                }
            });
        }
    });

    function append_button(btn) {
        var $tr = $('#out > span.out button.cmd_click2:last').parent('td').parent();
        if ($('> td', $tr).length >= 4) {
            var $tbl = $tr.parent();
            $tr = $('<tr></tr>');
            $tbl.append($tr);
        }
        $tr.append(btn);
    }
    
    function create_button(label, color, fn) {
        var $td = $('<td><button type="button" onclick="return false;" class="cmd_click2"><span style="color:' + color + ';">' + label + '</span></button></td>');
        append_button($td);
        $('button', $td).click(fn);
    }
    
	var _show_score = window.gSocketMsg2.show_score;
	window.gSocketMsg2.show_score = function() {
		_show_score.apply(this, arguments);
        create_button('潜龙<br>查询', 'cyan', function() {
            qianlong_list();
        });
        create_button('潜龙<br>添加', 'cyan', function() {
            var input = prompt('输入序号或名称，批量输入用逗号分隔');
            if (input) {
                qianlong_add(input);
            }
        });
        create_button('潜龙<br>删除', 'cyan', function() {
            var input = prompt('输入序号或名称，批量输入用逗号分隔');
            if (input) {
                qianlong_del(input);
            }
        });
        create_button('潜龙<br>清除', 'red', function() {
            qianlong_clear();
        });
 	};
    
    log('加载自动记录潜龙脚本' + GM_info.script.version);
    }, 500);
})(unsafeWindow);
