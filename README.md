# leveldb-rest

### get data from key
```sh
GET : https://localhost:8000/api/dbs/db_name/key
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
### insert or update data
```sh
POST : https://localhost:8000/api/dbs/db_name/key
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
Body
```sh
//insert or update all
{
    "_id": "key",
    "column_name2": "value1",
    "column_name3": "value2",
    "column_name4": "value3"
}
```
### query
```sh
POST : https://localhost:8000/api/query/db_name/index_name
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
Body
```sh
//query data 
{
  "match": [
    "value1",
    "value2",
    "value3",
    "value4"
  ],
  "limit": 1,
  "include_doc": true
}
```
# mongo-rest-version1

### get data from key
```sh
GET : https://localhost:8000/v1/db_name/collection_name/data/key
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
### insert or update data
```sh
POST : https://localhost:8000/v1/db_name/collection_name/data/key
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
Body
```sh
//insert or update all
{
    "_id": "key",
    "column_name2": "value1",
    "column_name3": "value2",
    "column_name4": "value3"
}
```
### query
```sh
POST : https://localhost:8000/v1/db_name/collection_name/query/index_name
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
Body
```sh
//query data 
{
  "match": [
    "value1",
    "value2",
    "value3",
    "value4"
  ],
  "limit": 1,
  "include_doc": true
}
```

# mongo-rest-version2

### get data from key
```sh
GET : https://localhost:8000/v2/db_name/collection_name/data/key
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```

### insert or update data
```sh
POST : https://localhost:8000/v2/db_name/collection_name/data/key
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
Body
```sh
//update some column
{"$set":{"column_name1":"value1"}}

//insert or update all
{
    "_id": "key",
    "column_name2": "value1",
    "column_name3": "value2",
    "column_name4": "value3"
}
```

### query
```sh
POST : https://localhost:8000/v2/db_name/collection_name/query
```
Headers
```sh
{"Content-Type":"application/json"},
{"Authorization":"JWT token"}
```
Body
```sh
//query data 
{
	"query":{
		"column_name1":{"$eq":"value1"},
		"column_name2":{"$eq":"value2"},
		"column_name3":"value3",
		"column_name4": "value4"
	},
	"projection":{
		"column_name1":1,
		"column_name2":1
	},
	"limit":1
}
```

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
