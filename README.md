<h1>AngularJs Pagination -- like easyUI's Pagination</h1><br/>
  &nbsp;&nbsp;&nbsp;&nbsp;My project need style like easyUI's Pagination. So I make this project. But this project is not fined. Very thank with miaoyaoyao's AngularJs Pagination. He give me a nice idea.
  
 // in the view
<my-pagination conf="paginationConf"></my-pagination>

<pre><code>
// in the controller
$scope.paginationConf = {
    currentPage: 1,
    totalItems: 8000,
    itemsPerPage: 15,
    pagesLength: 15,
    perPageOptions: [10, 20, 30, 40, 50],
    onChange: function(){

    }
};
</code></pre>
