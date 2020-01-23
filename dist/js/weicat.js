//修改appid、redirect_uri

var code = GetQueryString('code');
var openid = null;
var headimgurl = null;
var shareID = null;
var shareText = null;
var nickname = null;
var fatherID = null;

var accessToken = null;

if (code != null && code != undefined) {//网页授权获取code
    if (localStorage['headimgurl']) {
        headimgurl = localStorage['headimgurl'];
        openid = localStorage['openid'];
        nickname = localStorage['nickname'];
        // alert('headimgurl:' + headimgurl);
    } else {
        axiosRequest(code);
        //ajaxRequest(code);
    }
} else {
    //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc2912f4e5c9ea73b&redirect_uri=https%3a%2f%2fuss.sonicers.com%2fmouse%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect ';
    window.location.replace ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc2912f4e5c9ea73b&redirect_uri=https%3a%2f%2fuss.sonicers.com%2fmouse%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect ';
    // alert('headimgurl=====');
}

/**
 * 获取当前URL参数
 * @param [type] name [参数键名称]
 * @return [type] [参数值]
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function axiosRequest(c) {
    axios.get("https://api.sonicers.com/release/get_user_info", {
        params: {
            code: c
        }
    }).then((res) => {
        let msg = res.data
        headimgurl = msg.headimgurl;
        openid = msg.openid;
        nickname = msg.nickname;
        localStorage['headimgurl'] = headimgurl;
        localStorage['openid'] = openid;
        localStorage['nickname'] = nickname;
        // alert('headimgurl:' + headimgurl + ' ; nickname:' + nickname);
    }).catch((error) => {
        alert('授权出错');
    })
}

function ajaxRequest(code) {
    $.ajax({//获取token值
        type: "GET",
        url: "https://api.sonicers.com/release/get_user_info",
        data: { code: code },
        dataType: "json",
        success: function (msg) {
            //alert('success:openid=' + msg.openid + " ; headimgurl=" + msg.headimgurl);
            headimgurl = msg.headimgurl;
            openid = msg.openid;
            nickname = msg.nickname;
            localStorage['headimgurl'] = headimgurl;
            localStorage['openid'] = openid;
            localStorage['nickname'] = nickname;
        },
        error: function (msg) {
            alert('授权出错');
            //window.location.href = '';
        }
    })
}
