var WxBlue = WxBlue || {};
WxBlue.getDeviceId = "";
WxBlue.deviceList = [];
//获取设备
WxBlue.get = function() {
    wx.invoke('getWXDeviceInfos', { 'connType': 'blue' }, function(getRes) {
        alert(JSON.stringify(getRes.deviceInfos));
        $('.getMsg').html(JSON.stringify(getRes.deviceInfos));
        getRes.deviceInfos.forEach(function(o, i) {
            WxBlue.deviceList.push(o.deviceId);
        });

    });
};
//扫描
var n = 1;
WxBlue.start = function() {
    wx.invoke("startScanWXDevice", { "connType": "blue", "btVersion": "ble" }, function(res) {
        clearInterval(timer);
        var timer = setInterval(function() {
            $('.scantime').html(n++);
        }, 1000);

    });
};

//关闭扫描
WxBlue.close = function() {
    wx.invoke('closeWXDeviceLib', { 'connType': 'blue' }, function(closeRes) {
        alert("close");
        $('.test01').html(closeRes.err_msg + ',' + closeRes.bluetoothState + ',' + closeRes.isSupportBLE);
    });
};

//获取二维码
WxBlue.tickt = function() {
    var deviceId = $('.device-id').val();
    var accessToken = $('.access-token').val();
    $.post("/HardWare/GetTickt", { "deviceId": deviceId, "accessToken": accessToken }, function(data) {
        if (data.status == 0) {
            alert(data.data);
            $('.tickt').html(data.data);
        }
    });
};

//绑定设备
WxBlue.bind = function() {
    wx.invoke('getWXDeviceTicket', { "deviceId": 'LSD2091481A0F68', "type": 1, "connType": "blue" }, function(res) {
        var ticket = res.ticket;
        $('.ticket').html(ticket);
        $.post("/HardWare/DeviceBind", { "ticket": ticket, "deviceId": 'LSD2091481A0F68' }, function(data) {
            alert(JSON.stringify(data));
            if (data.status == 0) {
                alert("设备绑定成功");
            }
        });
    });
};

//解除绑定
WxBlue.unbind = function() {
    alert(WxBlue.deviceList[0]);
    wx.invoke('getWXDeviceTicket', { "deviceId": WxBlue.deviceList[0], "type": 2, "connType": "blue" }, function(res) {
        var ticket = res.ticket;
        $.post("/HardWare/DeviceUnBind", { "ticket": ticket, "deviceId": WxBlue.deviceList[0] }, function(data) {
            alert(JSON.stringify(data));
            if (data.status == 0) {
                alert("设备解绑成功");
            }
        });
    });
};



//获取deviceId 二维码信息
WxBlue.getDevice = function() {
    $.get("/HardWare/SetDeviceInfo", function(data) {
        alert(JSON.parse(data).deviceid);
        WxBlue.getDeviceId = JSON.parse(data).deviceid;
        $('.getDevice').html(WxBlue.getDeviceId);
    })
};

//授权
WxBlue.authorizeDevice = function() {
    $.post("/HardWare/AuthorizeDevice", { macId: "2091481A0F68", deviceId: 'gh_b151e59746a9_1c4d' }, function(data) {
        alert(data.msg);
    })
};

//关闭库
WxBlue.closeWx = function() {
    wx.invoke('closeWXDeviceLib', { 'connType': 'blue' }, function(res) {
        alert(0);
        alret(res);
    });
}

WxBlue.openWx = function() {
    wx.invoke('openWXDeviceLib', { 'brandUserName': 'gh_b151e59746a9' }, function(res) {
        alert(1);
        alert(res);
    });
}

WxBlue.connect = function() {
    alert(0);
    wx.invoke('connectWXDevice', { 'deviceId': 'gh_2c1289338afe_932e80a23f14c095', 'connType': 'blue' }, function(res) {
        alert('connectWXDevice:' + JSON.stringify(res));
        $('.connect').html(JSON.stringify(res));

    });
}

WxBlue.sendData = function(data) {
    console.log(data);
    return function() {
        wx.invoke('sendDataToWXDevice', { 'deviceId': 'gh_2c1289338afe_932e80a23f14c095', 'connType': 'blue', 'base64Data': data }, function(res) {
            alert('sendDataToWXDevice:' + JSON.stringify(res));
            $('.sendData').html(JSON.stringify(res));
        });
    }
}