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
kphongph@gmail.com,
theerawutt53@gmail.com
Computer Engineering
Naresuan University
