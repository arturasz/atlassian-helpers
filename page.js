function makeRequest(url) {
    var i=document.createElement('IMG');
    i.src= url;
    i.width=1;
    i.height=1;
    document.querySelector('body').appendChild(i);
}
function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

if (window.location.origin == 'https://hotjar.atlassian.net') {
    var branchCountEl = document.querySelector('#branch-status-panel > dl > dt > div > div > div > a > span')
    var url;
    if (branchCountEl) {
        var issueId = document.querySelector('a[data-issueid]').getAttribute('data-issueid');
        callAjax(
            'https://hotjar.atlassian.net/rest/dev-status/1.0/issue/detail?issueId='+issueId+'&applicationType=bitbucket&dataType=pullrequest&_='+Date.now(),
            function (response) {
                var branchName = response.detail[0].branches[0].name;
                url = 'http://localhost:39000/?branch='+ encodeURIComponent(branchName);
                makeRequest(url);
                console.log('%c shelve && update ' + branchName, 'background: #222; color: #bada55');
            });
    } else {
        var $id = document.querySelector('#key-val');
        if (!$id) {
            $id = document.querySelector('#issuekey-val > a')
        }
        var id = $id.innerText;
        var title = document.querySelector('#summary-val').innerText;
        url = 'http://localhost:39000/?title='+ encodeURIComponent(title) +'&id=' + id;
        makeRequest(url);

        console.log('%c branch ' + id + ' ' + title, 'background: #222; color: #bada55');
    }
}


if (window.location.origin == 'https://bitbucket.org') {
    var selector = document.querySelector('#branch-detail > div > div.clearfix > form > div > div.branch.source > div > span.branch-name');
    var branchName;
    if (selector) {
        branchName = selector.innerText;
    } else {
        branchName = document.querySelector('#id_source_group > dl > dd > a').innerText;
    }
    var url = 'http://localhost:39000/?branch='+ encodeURIComponent(branchName);
    makeRequest(url)

    // todo actually check for response
    console.log('%c shelve && update ' + branchName, 'background: #222; color: #bada55');
}
