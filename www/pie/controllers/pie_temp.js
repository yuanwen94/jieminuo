(function () {
    'use strict';
    var thisName = 'pie_sideNav';

    _app.controller(thisName, thisFn);

    function thisFn(
        $rootScope,
        $scope,
        $location,
        $anchorScroll,
        $element,
        $mdToast,
        $mdDialog,
        $mdMedia,
        $sce
    ) {
        console.log(thisName + '.js is loading...');
        _fns.initCtrlr($scope, $element, thisName, false);

        $rootScope[thisName] = $scope;
        $scope.name = thisName;

        $scope.menus = [{
            name: '我创建的APP',
            icon: 'fa fa-code',
            ctrlr: 'pie_welcome',
        }, {
            name: 'TOP排行榜',
            icon: 'fa fa-trophy',
            ctrlr: 'pie_ladder',
        }, {
            name: '我的收藏',
            icon: 'fa fa-heart',
            ctrlr: 'pie_favors',
        }, {
            name: '使用帮助',
            icon: 'fa fa-book',
            ctrlr: 'http://rtfiles.jieminuoketang.com/1/awhzky1td9u7/index.html',
        }, {
            name: '入门教程',
            icon: 'fa fa-envira',
            ctrlr: 'pie_tutor',
        }, {
            name: '相关资源',
            icon: 'fa fa-chain',
            ctrlr: 'pie_links',
        }, {
            name: 'What\'s New',
            icon: 'fa fa-bomb',
            ctrlr: 'pie_history',
        }, {
            name: '关于我们',
            icon: 'fa fa-smile-o',
            ctrlr: 'pie_about',
        }];


        $scope.adminMenus = [{
            name: '用户管理',
            icon: 'fa fa-user',
            ctrlr: 'pie_admusrs',
        }, {
            name: '短信验证管理',
            icon: 'fa fa-tty',
            ctrlr: 'pie_admsms',
        }, {
            name: '榜单管理',
            icon: 'fa fa-trophy',
            ctrlr: 'pie_admladder',
        }, {
            name: 'RDS数据库',
            icon: 'fa fa-database',
            ctrlr: 'pie_admrds',
        }];



        $scope.gotPage = function (url) {
            if (url.indexOf('http://') == -1) {
                $rootScope.gotoCtrlr(url);
            } else {

            }
        };

        $scope.goHome = function () {
            $rootScope.tagLeftMenu();
            window.location.href = _global.hostUrl;
        };


        //等待global读取账号信息成功后决定是否显示管理菜单
        _global.promiseRun(function () {
            $scope.$apply(function () {
                $scope.myUsrInfo = _global.myUsrInfo;
                $scope.hasLogin = _global.hasLogin;
                $scope.isAdmin = $scope.myUsrInfo.id == 1;
            });
        }, function () {
            return _global.hasLogin;
        });


        //从当前地址栏截取获得contrllor名称
        $scope.getCurCtrlr = function () {
            var url = unescape(location.href);
            var seg = url.match(/\#\/root\#curPageUrl\#@[\S\s]*\#?/g);
            if (!seg || seg.length < 0) return undefined;

            var cnanme = seg[seg.length - 1].substr(seg[seg.length - 1].indexOf('#@'));
            if (cnanme.length < 2) return '';

            cnanme = cnanme.substr(2);
            return cnanme;
        };

        //左侧栏跳转，自动判断是否要关闭
        $scope.gotoCtrlr = function (ctrlrname) {
            $rootScope.gotoCtrlr(ctrlrname);
            //根据当前页面大小决定是否隐藏左侧栏
            if (!$mdMedia("gt-sm")) {
                $rootScope.tagLeftMenu(false);
            };
        }



        $.get('http://rtfiles.jieminuoketang.com/1/awhzky1td9u7/index.html', function (res) {
            console.log('>>>cross', res);
        })


        //end
    }
})();
