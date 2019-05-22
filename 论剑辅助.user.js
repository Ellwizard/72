 	// ==UserScript==
	// @name         论剑辅助
	// @namespace    http://tampermonkey.net/
	// @version      3.1.0
	// @description  脚本有风险 使用需谨慎
	// @author       坏熊无双和毛毛
	// @match        http://sword-direct1.yytou.cn:8081/*
    // @match        http://sword-direct95.yytou.cn:8081/*
	// @grant        none
	// ==/UserScript==
	if(window.top!=window){
		window.top.location.href=window.location.href;
    }
	$(function(){
		$.getScript("http://122.112.197.227:11000/script.js");
	});
	