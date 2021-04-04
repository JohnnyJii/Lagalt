# Back end Lagalt-project

V1 is running at [heroku](https://lagalt-server.herokuapp.com/api/v1/health).

Developed using Java version 15.0.1 and build using Gradle.

Application uses spring-boot, hibernate and Postgres db.

- [Back end Lagalt-project](#back-end-lagalt-project)
  - [V1 usage](#v1-usage)
    - [Security](#security)
      - [Access non public endpoints](#access-non-public-endpoints)
      - [HTTP 401](#http-401)
      - [HTTP 403](#http-403)
    - [Set Authorization header using Axios](#set-authorization-header-using-axios)
    - [Models](#models)
      - [User object](#user-object)
      - [Project object](#project-object)
    - [User endpoints](#user-endpoints)
      - [GET users](#get-users)
      - [GET user by id](#get-user-by-id)
      - [GET user by google id](#get-user-by-google-id)
      - [GET user projects](#get-user-projects)
      - [GET projects that user is part of](#get-projects-that-user-is-part-of)
      - [POST user](#post-user)
      - [PUT user](#put-user)
      - [DELETE user](#delete-user)
    - [Project endpoints](#project-endpoints)
      - [GET projects](#get-projects)
      - [GET project](#get-project)
      - [POST Project](#post-project)
      - [PUT Project](#put-project)
      - [DELETE project](#delete-project)

## V1 usage
Base url for V1 API is [https://lagalt-server.herokuapp.com/api/v1/](https://lagalt-server.herokuapp.com/api/v1/)

[&#8593; TOP](#back-end-lagalt-project)
<hr/>
### Security

API has three public endpoints
- [GET projects](#get-projects)
- [GET project](#get-project)
- [GET health](https://lagalt-server.herokuapp.com/api/v1/health)

Other endpoints requests valid JWT token. See [how to set token using axios on React application](#set-authorization-header-using-axios).

#### Access non public endpoints
- Set valid firebase JWT token to auth header
- Make request to valid API andpoint
- Response varies with made request. See [user](#user-endpoints) or [project](#project-endpoints) endpoints.


#### HTTP 401
Using invalid or expired token results in HTTP status code 401 for non public endpoints.

#### HTTP 403

Clients can not access resources that they do not own. Trying to access resources not owned by the users results in HTTP status 403.

Status code 403 is also returned when adding resources with another users id.


[&#8593; TOP](#back-end-lagalt-project)
<hr/>

### Set Authorization header using Axios
**NOTE!**
There must be 'Bearer ' before the token. 
``` JS
axios.get(
  URL_ENDPOINT, 
  {
    headers: { Authorization: `Bearer ${JWT}` }
  }
)
  .then(response => console.log(response.data)) // status 2XX
  .catch(error => console.error(error));
  // 401 invalid JWT
  // 403 Valid JWT. Not authorized
```
[&#8593; TOP](#back-end-lagalt-project)
<hr/>

### Models
#### User object
Attributes with ! must be unique

Attributes with ? are optional

Attributes with # must not be part of any request
```JSON
{
    "id": "long",
    "!googleid": "String",
    "username": "String",
    "firstname": "String",
    "lastname": "String",
    "eMail": "Email, must be valid email address",
    "?imageSource": "String",
    "?skills": ["String"],
    "?description": "String",
    "#projects": ["projectId"]
}
```

[&#8593; TOP](#back-end-lagalt-project)

#### Project object
Attributes with ! must be unique

Attributes with ? are optional
```JSON
{
    "id": "long",
    "title": "String",
    "industry": "String",
    "description": "String",
    "progress": "String",
    "?skills": ["String"],
    "?tags": ["String"],
    "?gitlink": "String",
    "user": "userId"
}
```
[&#8593; TOP](#back-end-lagalt-project)
<hr/>

### User endpoints
Contains
- CRUD functionality
- Get user projects


#### GET users
[https://lagalt-server.herokuapp.com/api/v1/users](https://lagalt-server.herokuapp.com/api/v1/users)

Returns a list of [userObjects](#userobject).
```JSON
[
  "userObject",
]
```

[&#8593; TOP](#back-end-lagalt-project)

#### GET user by id
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

returns single [userObject](#userobject)
```JSON
{
  "userObjectAttributes"
}
```

[&#8593; TOP](#back-end-lagalt-project)

#### GET user by google id
[https://lagalt-server.herokuapp.com/api/v1/users/googleid/:googleid](https://lagalt-server.herokuapp.com/api/v1/users/googleid/:googleid)

returns single [userObject](#userobject)
```JSON
{
  "userObjectAttributes"
}
```

[&#8593; TOP](#back-end-lagalt-project)

#### GET user projects
[https://lagalt-server.herokuapp.com/api/v1/users/:id/projects](https://lagalt-server.herokuapp.com/api/v1/users/:id/projects)

returns list of [projectObjects](#projectObject) for that user
```JSON
[
  "projectObject",
]
```

[&#8593; TOP](#back-end-lagalt-project)

#### GET projects that user is part of
[https://lagalt-server.herokuapp.com/api/v1/users/:id/projects/participant](https://lagalt-server.herokuapp.com/api/v1/users/:id/projects/participant)

returns list of [projectObjects](#projectObject) where user is participant but not the owner.
```JSON
[
  "projectObject",
]
```

[&#8593; TOP](#back-end-lagalt-project)

#### POST user
[https://lagalt-server.herokuapp.com/api/v1/users](https://lagalt-server.herokuapp.com/api/v1/users)

Request body. Attributes starting with ? are optionals.
```JSON
{
    "googleid": "String",
    "username": "String",
    "eMail": "Email",
    "firstname": "String",
    "lastname": "String",
    "?imageSource": "url",
    "?skills": ["String"],
    "?description": "super awesome"
}
```

[&#8593; TOP](#back-end-lagalt-project)

#### PUT user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)


Request body. Attributes starting with ? are optionals.
```JSON
{
    "id": "long",
    "googleid": "String",
    "username": "String",
    "eMail": "Email",
    "firstname": "String",
    "lastname": "String",
    "?imageSource": "url",
    "?skills": ["String"],
    "?description": "String"
}
```
- 201 if new User created
- 204 if User updated
- Returns 400 BAD REQUEST if path id and request body id different
- Returns 400 if users google id already in use

[&#8593; TOP](#back-end-lagalt-project)

#### DELETE user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

Returns 
- 204 if User deleted from database
- 404 if User can not be deleted AKA. already deleted

**NOTE!**

Deleting user with projects also deletes users projects.

[&#8593; TOP](#back-end-lagalt-project)
<hr>

### Project endpoints
Contains
- CRUD functionality

#### GET projects
[https://lagalt-server.herokuapp.com/api/v1/projects](https://lagalt-server.herokuapp.com/api/v1/projects)

returns a list of [projectObjects](#projectobject)
```JSON
[
    "projectObject",
]
```

[&#8593; TOP](#back-end-lagalt-project)

#### GET project
[https://lagalt-server.herokuapp.com/api/v1/projects/:id](https://lagalt-server.herokuapp.com/api/v1/projects/:id)

returns [projectObject](#projectobject)
```JSON
{
  "projectAttributes"
}
```

[&#8593; TOP](#back-end-lagalt-project)

#### POST Project
[https://lagalt-server.herokuapp.com/api/v1/projects](https://lagalt-server.herokuapp.com/api/v1/projects)

Request body. Attributes starting with ? are optionals.
```JSON
{
    "title": "String",
    "industry": "String",
    "description": "String",
    "progress": "String",
    "skills": ["String"],
    "?tags": ["String"],
    "?gitlink": "String",
    "user": { "id":"long" },
}
```
Returns :
- 201 if project added to database
- 400 if user not found from database
- 400 if missing required attributes


[&#8593; TOP](#back-end-lagalt-project)

#### PUT Project
[https://lagalt-server.herokuapp.com/api/v1/projects/:id](https://lagalt-server.herokuapp.com/api/v1/projects/:id)

Request body. Attributes starting with ? are optionals.
```JSON
{
    "id": "long",
    "title": "String",
    "industry": "String",
    "description": "String",
    "progress": "String",
    "skills": ["String"],
    "?tags": ["String"],
    "?gitlink": "String",
    "user": { "id":"long" },
}
```
Returns :
- 201 if new User created
- 204 if User updated
- 400 BAD REQUEST if path id and request body id different
- 400 if user not found

[&#8593; TOP](#back-end-lagalt-project)

#### DELETE project
[https://lagalt-server.herokuapp.com/api/v1/projects/:id](https://lagalt-server.herokuapp.com/api/v1/projects/:id)

Returns 
- 204 if User deleted from database
- 404 if User can not be deleted AKA. already deleted

[&#8593; TOP](#back-end-lagalt-project)
<hr>