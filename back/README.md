# Back end Lagalt-project

V1 is running at [heroku](https://lagalt-server.herokuapp.com/api/v1/health).

Developed using Java version 15.0.1 and build using Gradle.

Server uses spring-boot, spring-security, hibernate and PostgreSQL.

## Table of contents

- [Back end Lagalt-project](#back-end-lagalt-project)
  - [Table of contents](#table-of-contents)
  - [Main features](#main-features)
    - [New content algorithm](#new-content-algorithm)
    - [Rate limiting policy](#rate-limiting-policy)
    - [User view history](#user-view-history)
  - [V1 usage](#v1-usage)
    - [Security](#security)
      - [Access non public endpoints](#access-non-public-endpoints)
      - [HTTP 401](#http-401)
      - [HTTP 403](#http-403)
      - [HTTP 429](#http-429)
    - [Set Authorization header using Axios](#set-authorization-header-using-axios)
    - [Models](#models)
      - [User object](#user-object)
      - [Project object](#project-object)
      - [Application object](#application-object)
    - [User endpoints](#user-endpoints)
      - [GET users](#get-users)
      - [GET user by id](#get-user-by-id)
      - [GET user by google id](#get-user-by-google-id)
      - [GET user projects](#get-user-projects)
      - [GET projects that user is part of](#get-projects-that-user-is-part-of)
      - [GET recommended projects](#get-recommended-projects)
      - [POST user](#post-user)
      - [PUT user](#put-user)
      - [DELETE user](#delete-user)
    - [Project endpoints](#project-endpoints)
      - [GET projects](#get-projects)
      - [GET project](#get-project)
      - [POST Project](#post-project)
      - [PUT Project](#put-project)
      - [DELETE project](#delete-project)
    - [Applying to project](#applying-to-project)
      - [GET applications](#get-applications)
      - [GET application](#get-application)
      - [POST application](#post-application)
      - [POST accept application](#post-accept-application)

## Main features

- [Project and user CRUD](#models)
- New content algorithm
- Rate limiting policy
- User view history
- [Security](#security)

### New content algorithm
New content algorithm can be accessed [here](#new-content-algorithm).

It sorts projects according the users matching skills. Project with most skill-matches is on top of the list. 

[&#8593; TOP](#back-end-lagalt-project)
### Rate limiting policy
Server has a rate limiting policy.

Server responses to too many requests (in a short time period) with a status code of HTTP 429. It uses clients IP address to decide if the users request should be allowed.

Rate limiting policy is implemented using [Bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket).

[&#8593; TOP](#back-end-lagalt-project)
### User view history
Server stores user view history to database.

For logged user (user with valid JWT token in request) the project information is stored in a data table.

Storing information happend with that specific HTTP request made to server.

Server maintains history related to
- All projects shown to user from the client main page ([GET all projects](#get-projects))
- Project user has clicked ([GET project](#get-project))
- Projects user has applied to
- Projects user has contributet to. This includes all projects user created and all projects user is part of.

[&#8593; TOP](#back-end-lagalt-project)
<hr/>

## V1 usage
Base url for V1 API is [https://lagalt-server.herokuapp.com/api/v1/](https://lagalt-server.herokuapp.com/api/v1/)

[&#8593; TOP](#back-end-lagalt-project)
<hr/>

### Security
All endpoints supports Authoriaztion header.

Server enforces communication over HTTPS

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

#### HTTP 429

This server has a rate limiting policy.

If you get this error code: 


**Stop spamming our server!**


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

#### Application object
Project id, user id and motivation letter are only attributes part of application object. Other attributes comes from [user object](#user-object).
```JSON
{
    "motivationLetter": "String",
    "description": "String",
    "lastname": "String",
    "eMail": "Email",
    "firstname": "String",
    "imageSource": "String",
    "skills": ["String"],
    "projectId":"long",
    "userId":"long"
}
```
[&#8593; TOP](#back-end-lagalt-project)
<hr/>

### User endpoints
Contains
- CRUD functionality
- [Get user projects](#get-user-projects)
- [Get projects user is part of](#get-projects-that-user-is-part-of)
- [Get recommended projects](#get-recommended-projects)


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

#### GET recommended projects
[https://lagalt-server.herokuapp.com/api/v1/users/:id/projects/newcontent](https://lagalt-server.herokuapp.com/api/v1/users/:id/projects/newcontent)

returns list of [projectObjects](#projectObject) sorted by user skills.
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
HTTP response
- 201 if new User created
- 204 if User updated
- 400 if path id and request body id different
- 400 if users google id is already in use

[&#8593; TOP](#back-end-lagalt-project)

#### DELETE user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

HTTP response
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
HTTP response
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
HTTP response
- 201 if new User created
- 204 if User updated
- 400 BAD REQUEST if path id and request body id different
- 400 if user not found

[&#8593; TOP](#back-end-lagalt-project)

#### DELETE project
[https://lagalt-server.herokuapp.com/api/v1/projects/:id](https://lagalt-server.herokuapp.com/api/v1/projects/:id)

HTTP response
- 204 if User deleted from database
- 404 if User can not be deleted AKA. already deleted

[&#8593; TOP](#back-end-lagalt-project)
<hr>

### Applying to project
Part of project endpoint.

#### GET applications
[https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications](https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications)

Returns a list of [applications](#application-object) for project.
```JSON
[
  "applicationObject",
]
```
HTTP response
- 200 if aplications found
- 404 if project with project id not found

[&#8593; TOP](#back-end-lagalt-project)

#### GET application
[https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications/:userId](https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications/:userId)

Returns [application](#application-object).
```JSON
{
  "userObjectAttributes"
}
```
HTTP response
- 200 when application found
- 404 if project or application not found

[&#8593; TOP](#back-end-lagalt-project)

#### POST application
[https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications/:userId](https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications/:userId)

HTTP Post method for applying project.
Motivation letter is optional attribute and can be added using request body.

Request body
```JSON
{
  "motivationLetter":"String",
}
```
Returns [application](#application-object).
```JSON
{
  "userObjectAttributes"
}
```
HTTP response
- 201 when application created
- 400 if user already part of the project or application is still pending
- 404 if user or project not found

[&#8593; TOP](#back-end-lagalt-project)

#### POST accept application
[https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications/:userId/:accepted](https://lagalt-server.herokuapp.com/api/v1/projects/:projectId/applications/:userId/:accepted)

Takes in three path variables
- project id, type long (number)
- user id, type long (number)
- accepted, type boolean (true | false)

True value will add user to be part of the project.


False value won't add user to be part of the project.

Application is deleted and user can apply again if not accepted.

Returns boolean value
```JSON
{
  "true | false"
}
```
HTTP response
- 200 when application is processed
- 400 if path variables are invalid
- 404 if project or application is not found

[&#8593; TOP](#back-end-lagalt-project)

<hr/>