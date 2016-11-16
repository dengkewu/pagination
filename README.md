<h1>AngularJs Pagination -- like easyUI's Pagination</h1><br/>
  &nbsp;&nbsp;&nbsp;&nbsp;My project need style like easyUI's Pagination. So I make this project. But this project is not fined. Very thank with miaoyaoyao's AngularJs Pagination. He give me a nice idea.

<pre><code>
 // in the view
&lt;my-pagination conf="paginationConf"&gt;&lt;/my-pagination&gt;


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
