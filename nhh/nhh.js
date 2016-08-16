/**
 * 牛哄哄小工具
 * 
 * @author 455703030
 */

var d1 = require("deviceone");
var nf = d1.sm("do_Notification");

/**
 * nhh.isObject(value)：指示变量是否为对象
 * 		var val = {};
 * 		nhh.isObject(val);  // 结果为 true
 * 		var val = [];
 * 		nhh.isObject(val);  // 结果为 false
 * 
 * nhh.isArray(value)：指示变量是否为数组
 * 		var val = [];
 * 		nhh.isArray(val);  // 结果为 true
 * 		var val = {};
 * 		nhh.isArray(val);  // 结果为 false
 * 
 * nhh.isNull(value)：指示变量是否为 null
 * 		var val = null;
 * 		nhh.isNull(val);  // 结果为 true
 * 		var val = "";
 * 		nhh.isNull(val);  // 结果为 false
 * 
 * nhh.isDefined(value)：指示变量是否已定义
 * 		var val = undefined;
 * 		nhh.isDefined(val);  // 结果为 false
 * 		var val = 1;
 * 		nhh.isDefined(val);  // 结果为 true
 * 
 * nhh.each(value, callback)：遍历数组或对象
 * 		var arr = [1, 2, 3, 4];
 * 		nhh.each(arr, function(i, item){
 *			// i 为下标
 *			// item 为下标对应的值
 * 			require("deviceone").print("" + i + "=" + item);
 * 		});
 * 		var obj = {x: 1, y: 2};
 * 		nhh.each(obj, function(k, v) {
 * 			require("deviceone").print(k + "=" + v);
 * 		});
 * 
 * nhh.toString(value)：将值转换为字符串
 * 		var val = 1;
 * 		nhh.toString(val);  // 结果为字符串 1
 * 		var val = [1, 2, 3, 4];
 * 		nhh.toString(val);  // 结果为JSON字符串: [1, 2, 3, 4]
 * 		var val = {x: 1, y: 2};
 * 		nhh.toString(val);  // 结果为JSON字符串：{"x":1,"y":2}
 * 
 * nhh.uuid()：生成唯一序列号
 * 		nhh.uuid();  // 结果为唯一序列号，说是唯一，但仍存在重复可能，只是可能极小，可认为是唯一的
 * 
 * nhh.debug.alert(value)：打印数据
 * 		var val = {x: 1, y: 2};
 * 		nhh.debug.alert(val);  // 使用弹窗打印变量，结果为JSON字符串：{"x":1,"y":2}
 * 		nhh.debug.alert([1, 2, 3], 1, {});  // 可同时传入多个值并同时打印，alert弹窗顺序为从前到后
 * 
 * nhh.debug.print(value)：打印数据
 * 		var val = {x: 1, y: 2};
 * 		nhh.debug.print(val);  // 在控制台 Logger 中打印变量，结果为JSON字符串：{"x":1,"y":2}
 * 		nhh.debug.print([1, 2, 3], 1, {});  // 可同时传入多个值并同时打印
 * 
 * nhh.log(tag, message)：显示日志
 * 		nhh.log("test", "hello world!!");  // 在控制台 Logger 中打印日志，标签为 test，内容为 hello world!!
 * 		nhh.log("test", "hello $0!!", "xiaoming");  // message 参数中可包含变量，并在其后的参数中分别指定变量值，序号分别为 $0, $1, $2 ...
 * 
 * nhh.path.view(view)：获取视图文件路径
 * 		nhh.path.view("index");  // 返回 source://view/index.ui
 * 
 * nhh.ui.panel(ui)：创建 Panel 组件
 * 		var panel = nhh.ui.panel(ui("do_Alayout_root"));  // 将一个布局组件创建为 Panel
 * 		panel.load("cycle_cell", {id: 1, title: "hello world"});  // 加载 source://view/cycle_cell.ui，并绑定数据
 * 		panel.bindData({id: 2, title: "hello world2"});  // 重新绑定数据
 * 		panel.load("cycle_cell2", {id: 3, title: "hello world"});  // 重新加载其他的UI文件，每个 Panel 只允许加载一个，新加载的将替换原有的
 * 
 * nhh.ui.mPanel(ui)：创建 MPanel 组件
 * 		var panel = nhh.ui.mPanel(ui("do_LinearLayout_1"));  // 将一个线性布局组件创建 MPanel
 * 		panel.load([{view:"cycle_cell",data:{id:1,title:"hello world1"}},{view:"cycle_cell",data:{id:2,title:"hello world2"}}]);  // 加载多个视图文件，并分别绑定数据
 * 		panel.add("cycle_cell", {id: 3, title: "hello world3"});  // 新增一个视图文件并绑定数据
 * 		panel.insert(0, "cycle_cell", {id: 4, title: "hello world4"});  // 在 0 下标的后面插入一个新的视图文件并绑定数据，既新插入的下标为 1
 * 		panel.replace(1, "cycle_cell", {id: 5, title: "hello world5"});  // 替换下标为 1 的视图文件
 * 		panel.remove(2);  // 移除下标为 2 的视图
 * 
 * nhh.cache.set(key, value, expires)：写入缓存
 * 		nhh.cache.set("name", "牛哄哄", 3600);  // 写入缓存，过期时间为 1 个小时，既3600秒，过期之后，数据将不可访问
 * 		nhh.cache.set("name", "牛哄哄", 0);  // 写入缓存，expires为0或省略，表示永不过期
 * 
 * nhh.cache.get(key)：通过 key 读取数据
 * 		nhh.cache.get("name");
 * 
 * nhh.cache.remove(key)：移除数据
 * 		nhh.cache.remove("name");
 * 
 * nhh.cache.removeAll()：移除所有缓存数据
 * 		nhh.cache.removeAll();
 */

//nhh.isObject
module.exports.isObject = function(value) {
	return typeof value == "object" && value != null && typeof value.length == "undefined";
}

// nhh.isArray
module.exports.isArray = function(value) {
	return typeof value == "object" && value != null && typeof value.length != "undefined";
}

// nhh.isNull
module.exports.isNull = function(value) {
	return typeof value == "object" && value == null;
}

// nhh.isDefined
module.exports.isDefined = function (value) {
	return typeof value != "undefined";
}

// nhh.each
module.exports.each = function(value, callback) {
	if (module.exports.isArray(value)) {
		for (var i = 0; i < value.length; i ++) {
			callback(i, value[i]);
		}
	} else if (module.exports.isObject(value)) {
		for (var k in value) {
			callback(k, value[k]);
		}
	}
}

// nhh.toString
module.exports.toString = function(value) {
	var str = "";
	if (module.exports.isObject(value) || module.exports.isArray(value)) {
		str = JSON.stringify(value);
	} else {
		str = "" + value;
	}
	return str;
}

//nhh.uuid
module.exports.uuid = function() {
	var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

// nhh.debug.alert
// nhh.debug.print
module.exports.debug = (function() {
	return {
		alert: function (value) {
			for (var i = arguments.length - 1; i >= 0; i --) {
				nf.alert(module.exports.toString(arguments[i]));
			}
		},
		print: function(value) {
			for (var i = 0; i < arguments.length; i ++) {
				d1.print(module.exports.toString(arguments[i]), "$" + i);
			}
		}
	};
})();

// nhh.log
module.exports.log = function(tag, message) {
	for (var i = 2; i < arguments.length; i ++) {
		message = message.replace("$" + (i - 2), module.exports.toString(arguments[i]));
	}
	d1.print(message, tag);
};

// nhh.path.view
// nhh.path.image
module.exports.path = (function() {
	return {
		view: function(view) {
			return "source://view/" + view + ".ui";
		},
		image: function (image) {
			return "source://image/" + image;
		}
	};
})();

function _NHH_UI_Panel(ui) {
	this.ui   = ui;
	this.body = null;
	this.load = function(view, data) {
		if (this.body) {
			this.body.remove();
		}
		this.body = d1.ui(this.ui.add(module.exports.uuid(), module.exports.path.view(view), 0, 0));
		this.bindData(data);
	}
	this.bindData = function(data) {
		if (this.body != null) {
			var d = null;
			if (module.exports.isArray(data)) {
				d = d1.mm("do_ListData");
			} else if (module.exports.isObject(data)) {
				d = d1.mm("do_HashData");
			}
			if (d != null) {
				d.addData(data);
				this.body.bindData(d);
				this.body.refreshData();
			} else {
				module.exports.log("nhh.ui.Panel.bindData", "Argument data must be array or object: $0", data);
			}
		}
	}
}

function _NHH_UI_MPanel(ui) {
	var items = [];
	
	this.ui = ui;
	
	this.items = function() {
		return this.items;
	};
	
	this.length = function() {
		return items.length;
	};
	
	this.load = function(views) {
		for (var i = 0; i < views.length; i ++) {
			this.add(views[i].view, views[i].data);
		}
	}
	
	this.add = function(view, data) {
		var last = null;
		if (items.length > 0) {
			last = items[items.length - 1];
		}
		
		items.push(d1.ui(this.ui.add(module.exports.uuid(), module.exports.path.view(view), last, last)));
		this.bindData(items.length - 1, data);
	};
	
	this.insert = function(index, view, data) {
		if (typeof items[index] != "undefined") {
			var _items = [];
			for (var i = 0; i < items.length; i ++) {
				_items.push(items[i]);
				if (i == index) {
					_items.push(d1.ui(this.ui.add(module.exports.uuid(), module.exports.path.view(view), items[i], items[i])));
				}
			}
			items = _items;
			this.bindData(index + 1, data);
		}
	};
	
	this.bindData = function(index, data) {
		if (typeof items[index] != "undefined") {
			var d = null;
			if (module.exports.isArray(data)) {
				d = d1.mm("do_ListData");
			} else if (module.exports.isObject(data)) {
				d = d1.mm("do_HashData");
			}
			if (d != null) {
				d.addData(data);
				items[index].bindData(d);
				items[index].refreshData();
			} else {
				module.exports.log("nhh.ui.MPanel.bindData", "Argument data must be array or object: $0", data);
			}
		}
	};
	
	this.replace = function(index, view, data) {
		if (typeof items[index] != "undefined") {
			var prev = null;
			if (typeof items[index - 1] != "undefined") {
				prev = items[index - 1];
			}
			
			items[index].remove();
			items[index] = d1.ui(this.ui.add(module.exports.uuid(), module.exports.path.view(view), prev, prev));
			this.bindData(index, data);
		}
	};
	
	this.remove = function(index) {
		if (typeof items[index] != "undefined") {
			items[index].remove();
			var _items = [];
			for (var i = 0; i < items.length; i ++) {
				if (i != index) {
					_items.push(items[i]);
				}
			}
			items = _items;
		}
	};
	
	this.removeAll = function() {
		for (var i = 0; i < items.length; i ++) {
			items[i].remove();
		}
		items = [];
	};
}

module.exports.ui = {};
// nhh.ui.panel
module.exports.ui.panel = function(ui) {
	return new _NHH_UI_Panel(ui);
};
// nhh.ui.mPanel
module.exports.ui.mPanel = function(ui) {
	return new _NHH_UI_MPanel(ui);
};

function _NHH_Cache() {
	var cache = d1.sm("do_DataCache");
	
	this.get = function(key) {
		var data = cache.loadData(key);
		if (module.exports.isArray(data)) {
			if (data[0] == 0 || data[0] <= Date.parse(new Date())) {
				return data[1];
			}
		}
		return undefined;
	};
	
	this.set = function(key, value, expires) {
		if (typeof expires == "undefined") {
			expires = 0;
		}
		if (expires > 0) {
			expires = expires * 1000 + Date.parse(new Date());
		}
		return cache.saveData(key, [expires, value]);
	};
	
	this.remove = function(key) {
		return cache.removeData(key);
	}
	
	this.removeAll = function() {
		return cache.removeAll();
	}
}

// nhh.cache
module.exports.cache = new _NHH_Cache();