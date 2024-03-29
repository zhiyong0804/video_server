 $(function() {
    DEFATULT_COOKIE_EXPIRE_TIME = 30;
    uname = '';
    session = '';
    uid = 0;
    currentVideo = null;
    listedVideo = null;

    session = getCookie('session');
    uname = getCookie('username');

    //home page event registry
    $("#regbtn").bind('click', function(e) {
        alert("regbtn");
    });

    $("#siginbtn").bind('click', function(e) {
        var userName = $('#userNameTxt').val()
        var password = $('#pwdTxt').val()

        if (userName.length == 0 || password.length == 0) {
            alert("User Name or password is null");
            return ;
        }
        var hash = md5(password)
        
        /*
        {
	"url": "http://192.168.189.134:8000/user/wangbojing",
	"method": "POST",
    "req_body": "{\"user_name\":\"wangbojing\",\"pwd\":\"e12ba37ed81660d5c918a919622f78c3\"}"
}
        */
        var data = {
            "url": "http://192.168.189.134:8000/user/wangbojing",
            "method": "POST",
            "req_body": "{\"user_name\":\"" + userName + "\",\"pwd\": \"" + hash + "\"}"
        }

        $.ajax({
            type: 'POST',
            url: "http://192.168.189.134:8080/api",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(d) {
                //alert('success');
                setCookie("username", userName, 30 * 60 * 60);
                setCookie("session", hash, 30 * 60 * 60);

                location.href="http://192.168.189.134:8080/userHome";
            },
            error: function(e) {
                alert('error');
            }
        });
    });

    $("#signinhref").bind('click', function() {
        alert("signinhref");
    });
    
    $("#registerhref").bind('click', function() {
        $("#siginsubmit").hide();
        $("#regsubmit").show();
        alert("registerhref");
    });

    // userhome page event registry
    $("#uploadform").bind('submit', function(e) {
        alert("uploadform");
    });

    $(".close").bind('click', function() {
        alert("close");
    });

    $("#logout").bind('click', function() {
        alert("logout");
    });

    $('#cmtBtn').bind('click', function() {
        //alert("Send Comments");
        var comment = $(cmtTxt).val();
        alert(comment);

    });

    $('#vdoFile').bind('click', function() {
        //alert("file onload");
        $('#fileName').click();
        
    });
    $('#fileName').bind('change', function() {
       
        var filename = $(this).val();
        var array = filename.split('\\');
        filename = array[array.length - 1];
        
        $.ajaxFileUpload ({
            type: 'POST',
            url: 'http://192.168.189.134:8080/upload/' + filename,
            secureuri: false,
            fileElementId: 'fileName',
            dataType: 'json',

            success: function (data, status) {
                alert(" upload success ");
            },
            error: function (data, status, e) {
                alert("function error");
            }
        });
    });

    $('#logoutBtn').bind('click', function() {
        alert("logout button");
    });

});

var uname_videos;

function initPage(callback) {

}

function setCookie(cname, cvalue, exmin) {

    var exp = new Date();
    exp.setTime(exp.getTime() + exmin)

    document.cookie = cname + '=' + escape(cvalue) + ";expires=" + exp.toGMTString(); 

}

function getCookie(cname) {
    var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else 
        return null;
}

//DOM Operation
function selectVideo(vid) {

}

function refreshComments(vid) {
     
}

function popupNotificationMsg(msg) {

}

function popupErrorMsg(msg) {

}

function htmlCommentListElement(cid, author, content) {

}

function htmlVideoListElement(vid, name, ctime) {

}

//Ajax
function registerUser(callback) {

}

function signinUser(callback) {

}

function getUserId(callback) {

}
// Video Operations
function createVideo(vname, callback) {

}

function listAllVideos(callback) {

}

function deleteVideo(vid, callback) {

}

// Comments Operations
function postComment(vid, content) {

}

function listAllComments(vid, callback) {

}

function uploadComplete(evt) {
    var data = JSON.parse(evt.target.responseText);
    if (data.success) {
        alert("上传成功");
    } else {
        alert("上传失败");
    }
}

var video_url_base = "http://192.168.189.134:8080/statics/video/";
var image_url_base = "http://192.168.189.134:8080/statics/images/";

var AllVideos = [
    {srcurl: video_url_base + "2.mp4", title: 'videotag 2.mp4', detail: '详细内容'},
    {srcurl: video_url_base + "1.mp4", title: 'videotag 1.mp4', detail: '详细内容'},
    {srcurl: video_url_base + "0.mp4", title: 'videotag 0.mp4', detail: '详细内容'},
    {srcurl: video_url_base + "123456.mp4", title: 'videotag 11.mp4', detail: '详细内容'},
];
//var AllVideos;

function showVideoThumbnail(VideoItem, idx) {
    
    var div = '<div class="thumbnail" onclick="clickVideoThumbnail('+ idx +')">' 
            + '<div class="caption">'
            + '<p>'
            + '<video width="100%" src="'+ VideoItem.srcurl +'" controls="controls">'
            + VideoItem.title
            + '</video>'
            + '</p>'
            /*
            + '<p>'
            + VideoItem.detail
            + '</p>' */
            + '</div>'
            + '</div>';
    
    return div;
}

function listVideos(Videos) {
    var html = '';
    for (var i = 0;i < Videos.length;i ++) {
        html += showVideoThumbnail(Videos[i], i);
    }
    return html;
} 

var AllComments = [
    {usericon: image_url_base + "user1-128x128.jpg", username: 'Sarah Ross', posttime: '2018-09-27 15:56:34', postcontent: 'This is the default theme that comes with SideComments.js. You can easily theme and just styling it all yourself.'},
    {usericon: image_url_base + "clay_davis.png", username: 'Clay Davis', posttime: '2018-09-25 15:54:13', postcontent: 'This is the default theme that comes with SideComments.js.'},
    {usericon: image_url_base + "donald_draper.png", username: 'Donald Draper', posttime: '2018-09-24 15:56:45', postcontent: 'You can easily theme and just styling it all yourself.'},
    {usericon: image_url_base + "jon_snow.png", username: 'Jon Snow', posttime: '2018-09-21 15:56:45', postcontent: 'You can easily theme and just styling it all yourself.'},
];

function showCommentItem(CommentItem, idx) {

    var div = '<div>'
            + '<div class=\'user-block\'>'
            + '<img class=\'img-circle img-bordered-sm\' src="' + CommentItem.usericon + '" alt=\'user image\'></img>'
            + '<span class=\'username\'>'
            + '<a href="#">' + CommentItem.username + '</a>'
            + '<a href=\'#\' class=\'pull-right btn-box-tool\'><i class=\'fa fa-times\'></i></a>'
            + '</span>'
            + '<span class=\'description\'>' + CommentItem.posttime + '</span>'
            + '</div>'
            + '<p data-section-id="' + idx + '" class="commentable-section">'
            + CommentItem.postcontent
            + '</p>'
            + '</div>'
            + '<hr style="height:1px;border:none;border-top:1px solid #555555;" />';

    return div;
}

function listComments(Comments) {
    alert("listComments");
    var html = '';
    for (var i = 0;i < Comments.length;i ++) {
        html += showCommentItem(Comments[i], i+1);
    }
    return html;
}

function clickVideoThumbnail(idx) {
    alert('clickVideoThumbnail  ' + idx);
}


function initUserHomePage() {
    //alert('initUserHomePage');

    uname = getCookie('username');
    session = getCookie('session');

    var data = {
        "url": "http://192.168.189.134:8000/videos/" + uname,
        "method": "GET",
        "req_body": ""
    }

    $.ajax({
        type: 'POST', 
        url: "http://192.168.189.134:8080/api",
        secureuri: false,
        dataType: 'json',
        data: JSON.stringify(data),
        
        beforeSend: function(xhrq) {
            xhrq.setRequestHeader("X-Session-Id", session);
            xhrq.setRequestHeader("X-User-Name", uname);
        },
        complete: function () {
            //$("#submit").removeAttr("disabled");
            alert("complete");
            //$('.col-sm-5').prepend(listVideos(AllVideos));
        },
        success: function(d) {
            /*
            var json = JSON.parse(JSON.stringify( d ))
            var videos = json.videos;
            
            
            AllVideos = new Array(videos.length);
            for (var i = 0;i < videos.length;i ++) {
                AllVideos[i] = {srcurl: video_url_base + videos[i].name, title: "videotag " + videos[i].name, detail: '详细内容'};
            }*/
        },
        error: function(e) {
            alert("failed" + e);
        }
    })

}
