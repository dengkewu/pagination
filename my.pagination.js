/**
 * name: my.pagination
 * Version: 0.0.1
 */
angular.module('my.pagination', []).directive('myPagination',[function(){
    return {
        restrict: 'EA',
        template:'<div class="panel panel-body panel-body-noheader">'+
			'<div class="pag">' +
			'<table><tbody><tr><td><select class="pag-page-list" ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()">'+
			'</select></td><td><div class="pag-btn-separator"></div></td>'+
			'<td><a href="javascript:void(0)"'+
			'ng-class="{true:\'l-btn l-btn-small l-btn-plain l-btn-disabled l-btn-plain-disabled\', false:\'l-btn l-btn-small l-btn-plain\'}[conf.currentPage == 1]">'+
			'<span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span>'+
			'<span class="l-btn-icon pag-first">&nbsp;</span></span></a></td>'+
			'<td><a href="javascript:void(0)" ng-click="prevPage()" ng-class="{true:\'l-btn l-btn-small l-btn-plain l-btn-disabled l-btn-plain-disabled\',false:\'l-btn l-btn-small l-btn-plain\'}[conf.currentPage == 1]">'+
			'<span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon pag-prev">&nbsp;</span></span></a></td>'+
			'<td><div class="pag-btn-separator"></div></td><td><span style="padding-left: 6px;">Page</span></td>'+
			'<td><input class="pag-num" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)" type="text" value="{jumpPageNum}" size="3">'+
			'</td><td><span style="padding-right: 6px;">of {{conf.numberOfPages}}</span></td>'+
			'<td><div class="pag-btn-separator"></div></td><td>'+
			'<a href="javascript:void(0)" ng-click="nextPage()" ng-class="{true:\'l-btn l-btn-small l-btn-plain l-btn-disabled l-btn-plain-disabled\',false:\'l-btn l-btn-small l-btn-plain\'}[conf.currentPage == conf.numberOfPages]">'+
			'<span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon pag-next">&nbsp;</span></span></a></td>'+
			'<td><a href="javascript:void(0)" ng-class="{true:\'l-btn l-btn-small l-btn-plain l-btn-disabled l-btn-plain-disabled\',false:\'l-btn l-btn-small l-btn-plain\'}[conf.currentPage == conf.numberOfPages]">'+
			'<span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon pag-last">&nbsp;</span></span></a></td>'+
			'<td><div class="pag-btn-separator"></div></td><td><a href="javascript:void(0)" class="l-btn l-btn-small l-btn-plain">'+
			'<span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon pag-load">&nbsp;</span></span></a></td>'+
            '</tr></tbody></table><div class="pag-info">Displaying {{(conf.currentPage-1) * conf.itemsPerPage + 1}} to {{(((conf.currentPage-1) * conf.itemsPerPage + conf.itemsPerPage) <= conf.totalItems)?'+
            '((conf.currentPage-1) * conf.itemsPerPage + conf.itemsPerPage) : conf.totalItems}} of {{conf.numberOfPages}} items</div><div style="clear: both;"></div></div></div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {
            
            var conf = scope.conf;
            
            scope.jumpPageNum = 1;

            // 默认分页长度
            var defaultPagesLength = 15;

            // 默认分页选项可调整每页显示的条数
            var defaultPerPageOptions = [10, 15, 20, 30, 50];

            // 默认每页的个数
            var defaultPerPage = 15;

            // 获取分页长度
            if(conf.pagesLength) {
                // 判断一下分页长度
                conf.pagesLength = parseInt(conf.pagesLength, 10);

                if(!conf.pagesLength) {
                    conf.pagesLength = defaultPagesLength;
                }

                // 分页长度必须为奇数，如果传偶数时，自动处理
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }

            } else {
                conf.pagesLength = defaultPagesLength;
            }

            // 分页选项可调整每页显示的条数
            if(!conf.perPageOptions){
                conf.perPageOptions = defaultPagesLength;
            }

            // pageList数组
            function getPagination(newValue, oldValue) {
                
                // conf.currentPage
                if(conf.currentPage) {
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }

                if(!conf.currentPage) {
                    conf.currentPage = 1;
                }

                // conf.totalItems
                if(conf.totalItems) {
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }

                // conf.totalItems
                if(!conf.totalItems) {
                    conf.totalItems = 0;
                    return;
                }
                
                // conf.itemsPerPage 
                if(conf.itemsPerPage) {
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {
                    conf.itemsPerPage = defaultPerPage;
                }

                // numberOfPages
                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);

                // 如果分页总数>0，并且当前页大于分页总数
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                var perPageOptionsLength = scope.conf.perPageOptions.length;

                // 定义状态
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(conf.perPageOptions[i] == conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                if(!perPageOptionsStatus){
                    conf.perPageOptions.push(conf.itemsPerPage);
                }

                // 对选项进行sort
                conf.perPageOptions.sort(function(a, b) {return a - b});
                

                // 页码相关
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for(i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }
                }

                scope.$parent.conf = conf;
            }
            
            // firstPage
            scope.firstPage = function(){
            	conf.currentPage = scope.jumpPageNum = 1;
            	 getPagination();
            }
            
            // endPage
            scope.endPage = function(){
            	conf.currentPage = scope.jumpPageNum = numberOfPages;
            	 getPagination();
            }

            // prevPage
            scope.prevPage = function() {
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                    scope.jumpPageNum = conf.currentPage;
                }
            };

            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                    scope.jumpPageNum = conf.currentPage;
                }
            };

            // 变更当前页
            scope.changeCurrentPage = function(item) {
                
                if(item == '...'){
                    return;
                }else{
                    conf.currentPage = item;
                    getPagination();
                    // conf.onChange()函数
                    if(conf.onChange) {    
                        conf.onChange();
                    }
                }
            };

            // 修改每页展示的条数
            scope.changeItemsPerPage = function() {

                // 一发展示条数变更，当前页将重置为1
                conf.currentPage = scope.jumpPageNum = 1;

                getPagination();
                // conf.onChange()函数
                if(conf.onChange) {    
                    conf.onChange();
                }
            };

            // 跳转页
            scope.jumpToPage = function(num) {
                num = parseInt(num, 10);
                
                if(num && num != conf.currentPage) {
                	if(num > conf.numberOfPages) {
                		num = conf.numberOfPages;
                    }

                    // 跳转
                    conf.currentPage = num;
                    getPagination();
                    // conf.onChange()函数
                    if(conf.onChange) {    
                    	conf.onChange();
                    }
                    scope.conf.currentPage = scope.jumpPageNum;
               }
            };

            scope.jumpPageKeyUp = function(e) {
            	var num = scope.jumpPageNum;
            	if(num.match(/^[0-9]*$/)) {
            		if (num <= 0) {
            			scope.jumpPageNum = 1;
                	}
                	if (num > scope.conf.numberOfPages) {
                		scope.jumpPageNum = scope.conf.numberOfPages;
                	}
            	}
                var keycode = window.event ? e.keyCode :e.which;
                
                if(keycode == 13) {
                    scope.jumpToPage(num);
                }
            }

            scope.$watch('conf.totalItems', function(value, oldValue) {
                
                // 在无值或值相等的时候，去执行onChange事件
                if(!value || value == oldValue) {
                    
                    if(conf.onChange) {    
                        conf.onChange();
                    }
                }
                getPagination();
            })
            
        }
    };
}]);
