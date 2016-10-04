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
        $mdMedia
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
            name: '热榜TOP10',
            icon: 'fa fa-trophy',
            ctrlr: 'pie_topapps',
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
        },{
            name: '榜单管理',
            icon: 'fa fa-trophy',
            ctrlr: 'pie_admladder',
        }, {
            name: 'RDS数据库',
            icon: 'fa fa-database',
            ctrlr: 'pie_admrds',
        }];

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



        //end
    }
})();
