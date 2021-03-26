# Back end Lagalt-project

V1 is running at [heroku](https://lagalt-server.herokuapp.com/api/v1/health).

- [Back end Lagalt-project](#back-end-lagalt-project)
  - [V1 usage](#v1-usage)
      - [userObject](#userobject)
      - [projectObject](#projectobject)
    - [User endpoint](#user-endpoint)
      - [GET users](#get-users)
      - [GET user](#get-user)
      - [GET user projects](#get-user-projects)
      - [POST user](#post-user)
      - [PUT user](#put-user)
      - [DELETE user](#delete-user)
    - [Project endpoint](#project-endpoint)
      - [GET projects](#get-projects)
      - [GET project](#get-project)

## V1 usage
Base url for V1 API is [https://lagalt-server.herokuapp.com/api/v1/](https://lagalt-server.herokuapp.com/api/v1/)

#### userObject
```JSON
{
    "id": "long",
    "userName": "String",
    "firstName": "String",
    "lastName": "String",
    "imageSource": "String",
    "skills": ["String"],
    "description": "String",
    "email": "String",
    "projects": ["projectId"]
}
```

#### projectObject
```JSON
{
    "id": "long",
    "title": "String",
    "industry": "String",
    "description": "String",
    "gitlink": "String",
    "skills": ["String"],
    "user": "userId"
}
```

### User endpoint
Contains
- CRUD functionality
- Get user projects


#### GET users
[https://lagalt-server.herokuapp.com/api/v1/users](https://lagalt-server.herokuapp.com/api/v1/users)

Returns a list of [userObjects](#userobject)
```JSON
[
  "userObject",
]
```
#### GET user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

returns single [userObject](#userobject)
```JSON
{
  "userObjectAttributes"
}
```

#### GET user projects
[https://lagalt-server.herokuapp.com/api/v1/users/:id/projects](https://lagalt-server.herokuapp.com/api/v1/users/:id/projects)

returns list of [projectObjects](#projectObject)
```JSON
[
  "projectObject",
]
```

#### POST user
[https://lagalt-server.herokuapp.com/api/v1/users](https://lagalt-server.herokuapp.com/api/v1/users)

Request body. Attributes starting with ? are optionals.
```JSON
{
    "?userName": "String",
    "?firstName": "String",
    "?lastName": "String",
    "?imageSource": "String",
    "?skills": ["String"],
    "?description": "String",
    "?email": "String",
}
```

#### PUT user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)
Request body. Attributes starting with ? are optionals.
```JSON
{
    "id": "long",
    "?userName": "String",
    "?firstName": "String",
    "?lastName": "String",
    "?imageSource": "String",
    "?skills": ["String"],
    "?description": "String",
    "?email": "String",
}
```
- Returns 400 BAD REQUEST if path id and request body id different
- 204 if User updated
- 201 if new User created
#### DELETE user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

Returns 
- 204 if User deleted from database
- 404 if User can not be deleted AKA. already deleted
<hr>

### Project endpoint
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

#### GET project
[https://lagalt-server.herokuapp.com/api/v1/projects/:id](https://lagalt-server.herokuapp.com/api/v1/projects/:id)

returns [projectObject](#projectobject)
```JSON
{
  
}
```