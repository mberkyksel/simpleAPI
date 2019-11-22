
const https = require('https')

var options = {
  hostname: 'api.github.com',
  path: ' ',
  method: 'GET',
  headers : {'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'}

}

var jsonObject = null
var repositoryList = []

find_Repos = function (jsonObject){
  for (const i in jsonObject["items"]) {
    const item = jsonObject["items"][i]
    const element = {
      name: item["full_name"],
      id: i,
      html_url: item["owner"]["html_url"],
      isBookmarked: false
    
    }

    repositoryList.push(element)  
    
  }
  return repositoryList
    
}


exports.setPath = function(pth) {
  options["path"] = '/search/repositories?q='+pth+'+in%3Aname&type=Repositories'

}

exports.querySearch = function () {

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
  
    var bodyChunks = []
    res.on('data', function(chunk) {
      bodyChunks.push(chunk)
    }).on('end', function() {
  
      var body = Buffer.concat(bodyChunks)
      jsonObject = JSON.parse(body)
  
      find_Repos(jsonObject)
      
    })
   
  })
  
  req.on('error', (e) => {
    console.error(e)
  })
  
  req.end()

}

exports.getRepoList = function () {
  return repositoryList

}

