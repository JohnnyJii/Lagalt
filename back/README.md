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
      - [POST Project](#post-project)
      - [PUT Project](#put-project)
      - [DELETE project](#delete-project)

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
[&#8593; TOP](#back-end-lagalt-project)

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

[&#8593; TOP](#back-end-lagalt-project)

#### GET user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

returns single [userObject](#userobject)
```JSON
{
  "userObjectAttributes"
}
```

[&#8593; TOP](#back-end-lagalt-project)

#### GET user projects
[https://lagalt-server.herokuapp.com/api/v1/users/:id/projects](https://lagalt-server.herokuapp.com/api/v1/users/:id/projects)

returns list of [projectObjects](#projectObject)
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
    "?userName": "String",
    "?firstName": "String",
    "?lastName": "String",
    "?imageSource": "String",
    "?skills": ["String"],
    "?description": "String",
    "?email": "String",
}
```

[&#8593; TOP](#back-end-lagalt-project)

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
- 201 if new User created
- 204 if User updated
- Returns 400 BAD REQUEST if path id and request body id different

[&#8593; TOP](#back-end-lagalt-project)

#### DELETE user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

Returns 
- 204 if User deleted from database
- 404 if User can not be deleted AKA. already deleted

[&#8593; TOP](#back-end-lagalt-project)

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
    "?title": "String",
    "?industry": "String",
    "?description": "String",
    "?gitlink": "String",
    "?skills": ["String"],
    "?user": { "id": "userId" }
}
```

[&#8593; TOP](#back-end-lagalt-project)

#### PUT Project
[https://lagalt-server.herokuapp.com/api/v1/projects/:id](https://lagalt-server.herokuapp.com/api/v1/projects/:id)

Request body. Attributes starting with ? are optionals.
```JSON
{
    "id": "long",
    "?title": "String",
    "?industry": "String",
    "?description": "String",
    "?gitlink": "String",
    "?skills": ["String"],
    "?user": { "id": "userId" }
}
```
- 201 if new User created
- 204 if User updated
- Returns 400 BAD REQUEST if path id and request body id different

[&#8593; TOP](#back-end-lagalt-project)

#### DELETE project
[https://lagalt-server.herokuapp.com/api/v1/projects/:id](https://lagalt-server.herokuapp.com/api/v1/projects/:id)

Returns 
- 204 if User deleted from database
- 404 if User can not be deleted AKA. already deleted

[&#8593; TOP](#back-end-lagalt-project)

<hr>