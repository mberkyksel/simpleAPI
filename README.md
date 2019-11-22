**API SearchRepository**
----

  exposes an HTTP API to search for Github repositories. 

* **URL**
   
/search/:keyword        <<<takes a search term and returns a list of repositories>>>
/bookmark/repo/:id      <<<allows bookmarking a repository by its id>>>
/bookmark/all           <<<get all bookmarked repositories>>>
/bookmark/remove/:id    <<<allows removing a bookmarked repository by its id>>>

* **Method:**
  
  `GET` `POST` 
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`
   `keyword=[string]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Repository is removed from the BookmarkedRepoList` /bookmark/remove/:id 
    **Content:** `{List of bookmarked Repositories]}`   /bookmark/all
    **Content:** `{Repository_ID is successfully bookmarked}`   /bookmark/repo/:id
    **Content:** `{List of searched Repositories.${repositoryList}}*`/search/:keyword
 
* **Error Response:**
 
    **Content:** `{ error : "Search key is invalid!" }`
    **Content:** `{ error : "Repository List is empty! Search Again!" }`
    **Content:** `{ error : "This is an invalid URL!" }`

* **Notes:**

    Does not require a user.  e.g. No authentication -> /user/:id 
    
    run -> node app.js

    Dependencies:
        ('express')
        ('https')

    GitHub API connection is established via a `user-agent` (Limited connection - 10 queries per min.)
    

    <<<Future TodoList:>>> 

   *    connection to MongoDB database 
   *    basic User-authentication
   *    add more /POST, /DELETE, /UPDATE requests
   *    UI for the API that allows a user to search for repositories // React, Redux 

 
