const express = require('express')
const fetch_data =require('./fetch_data')

const port = 3000
const app = express()
var repoList = []
var BookmarkedList = []

let apiRoutes = require("./api-routes")
// Use Api routes in the App
app.use('/api', apiRoutes)


app.use('/search/:keyword', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {

  console.log('Request Type:', req.method)
  fetch_data.setPath(req.params.keyword)
  fetch_data.querySearch()
  repoList = fetch_data.getRepoList()
  next()
})


app.get('/search/:keyword',  (req, res) => {
  if (req.params.keyword === undefined) {

    res.send('Search key is invalid!')

  } else if (repoList.length < 1) {
    res.send('Repository List is empty! Search Again!')

  } else{
    var stringList = "REPOLIST ----------------"
    repoList.forEach(element => {
      stringList = stringList + "ID: "+element.id + " \n"
      + "URL: " + element.html_url + " ------------"

    });

    res.send(stringList)
  }

})

app.get('/bookmark/repo/:id', function(req, res){
  if(req.params.id >repoList.length ){
    res.send('Invalid repository ID!')

  }else{
    repoList[req.params.id].isBookmarked = true
    res.send(`Repo with id:${req.params.id} is successfully bookmarked!`)

  }

})


app.get('/bookmark/all', function(req, res){
  var tempList = []
  repoList.forEach(element => {
    if(element.isBookmarked === true){
      tempList.push(element)
      console.log('Here is the Bookmarked Repo List')
      console.log(element.name)

    }
  })

  res.send(tempList)

})
app.post('/bookmark/remove/:id',function(req,res){
  repoList.forEach(element => {
    if(element.element.id === req.params.id){
      element.isBookmarked = false
      res.send('Repository is removed from the BookmarkedRepoList')

    }

  })

})

app.get('*', function(req, res){
  res.send('This is an invalid URL!')

})


app.listen(port, () => {
    console.log('Server is up!')
})
