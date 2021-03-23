# Back end Lagalt-project

V1 is running at [heroku](https://lagalt-server.herokuapp.com/api/v1/health).

- [Back end Lagalt-project](#back-end-lagalt-project)
  - [V1 usage](#v1-usage)
    - [User endpoint](#user-endpoint)
      - [userObject](#userobject)
      - [GET users](#get-users)
      - [POST user](#post-user)
      - [PUT user](#put-user)
      - [Delete user](#delete-user)

## V1 usage
Base url for V1 API is [https://lagalt-server.herokuapp.com/api/v1/](https://lagalt-server.herokuapp.com/api/v1/)

### User endpoint
Basic CRUD functionality

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

#### GET users
[https://lagalt-server.herokuapp.com/api/v1/users](https://lagalt-server.herokuapp.com/api/v1/users)

Returns a list of [userObjects](#userobject)
```JSON
[
  "userObject",
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
#### Delete user
[https://lagalt-server.herokuapp.com/api/v1/users/:id](https://lagalt-server.herokuapp.com/api/v1/users/:id)

Delete user

Returns 
- 204 if User deleted from database
- 404 if User can not be deleted AKA. already deleted