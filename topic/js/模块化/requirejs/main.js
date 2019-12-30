(function(){
  require.config({
    baseUrl: 'js/',
    paths: {
      data: './modules/data',
      show: './modules/showData'
    }
  })
  require(['show'],function(show){
    show.show()
  })
})()