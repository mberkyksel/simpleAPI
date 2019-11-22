const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'myproject'
const client = new MongoClient(url, { useNewUrlParser: true })

// Create a collection of repositoryList where repositories have IDs, html_url
// Create a collection of bookmarked repos /or and isBookmarked attribute to each repo
