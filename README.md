## Assignment name: Project Phase 2 Server

=======

## Name : Prabhjot Sidhu(N01390392), Loc Dinh (N01390804), Vlad Kostur (N01391574) Subham Tandel(N01391002)

## Tasks: Create all the required rest API with authentication

-  [x] Prabhjot Sidhu: 
    - Skills 
pages : Skill.js, skillRoutesDB.js
endpoints : https://mern-project-quad-squad-server.herokuapp.com/api/skills/ 
    <!-- CRUD examples can be found under postman_collection folder -->
    
    - About Me
pages : Aboutme.js, aboutMeRoutesDB.js 
endpoints : https://mern-project-quad-squad-server.herokuapp.com/api/aboutme/

-  [x] Loc Dinh: Project, Language, Resume, Heroku deploy for backend (sample: https://mern-project-quad-squad-server.herokuapp.com/api/languages/)
## User EndPoints
**Register User** 
POST: https://mern-project-quad-squad-server.herokuapp.com/api/users/

Request:
```javascript
{
    "name": "Loc Dinh",
    "email": "loc.dinh@mail.com",
    "password":"12345678"
}
```
Response
```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEwYjc4NDQwNzY4ZjkwMDE1Mzg0MWQ4IiwibmFtZSI6IkxvYyBEaW5oIn0sImlhdCI6MTYyODE0MTYzNiwiZXhwIjoxNjI4MTc3NjM2fQ.28PezpDubuqrTb68M3GhN1dBr1jOXEFOycrQkhwaZbk"
}
```
**Login User** 
POST: https://mern-project-quad-squad-server.herokuapp.com/api/auth/

Request:
```javascript
{
    "email": "loc.dinh@mail.com",
    "password":"12345678"
}
```
```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEwYjc4NDQwNzY4ZjkwMDE1Mzg0MWQ4In0sImlhdCI6MTYyODE0MTkxMywiZXhwIjoxNjI4MTc3OTEzfQ.CQf5nBb09qqPgkXQQOLL92qE41a53GovdbfKGtYLBPM"
}
```
## Project EndPoints
**Add Project**
POST: https://mern-project-quad-squad-server.herokuapp.com/api/projects/

Request:
```javascript
{
    "name": "Enterprise Application Modeling",
    "description": "Group Project for Enterprise Application Modeling course"
}
```
```javascript
{
    "_id": "610b7a120768f900153841db",
    "user": "610b78440768f900153841d8",
    "name": "Enterprise Application Modeling",
    "description": "Group Project for Enterprise Application Modeling course",
    "__v": 0
}
```   
**Update Project**
PUT: https://mern-project-quad-squad-server.herokuapp.com/api/projects/

Request:

```javascript
{
    "id":"610b7a120768f900153841db",
    "name": "Enterprise Application Modeling - Update",
    "description": "Group Project for Enterprise Application Modeling course - Update"
}
```

Response:

```javascript
{
    "_id": "610b7a120768f900153841db",
    "user": "610b78440768f900153841d8",
    "name": "Enterprise Application Modeling - Update",
    "description": "Group Project for Enterprise Application Modeling course - Update",
    "__v": 0
}
```
**Get Projects**
GET: https://mern-project-quad-squad-server.herokuapp.com/api/projects/

Reponse:    

```javascript
[
    {
        "_id": "610b7a120768f900153841db",
        "user": "610b78440768f900153841d8",
        "name": "Enterprise Application Modeling - Update",
        "description": "Group Project for Enterprise Application Modeling course - Update",
        "__v": 0
    },
    {
        "_id": "610b7ac20768f900153841dd",
        "user": "610b78440768f900153841d8",
        "name": "Enterprise Application Modeling - Update",
        "description": "Group Project for Enterprise Application Modeling course - Update",
        "__v": 0
    }
]
```
GET: https://mern-project-quad-squad-server.herokuapp.com/api/projects/610b7a120768f900153841db

Reponse:    

```javascript
{
    "_id": "610b7a120768f900153841db",
    "user": "610b78440768f900153841d8",
    "name": "Enterprise Application Modeling - Update",
    "description": "Group Project for Enterprise Application Modeling course - Update",
    "__v": 0
}
```
**Delete Projects**
DELETE: https://mern-project-quad-squad-server.herokuapp.com/api/projects/

Request:

```javascript
{
    "id": "610b7a120768f900153841db"
}
```

Reponse:    

```javascript
"project deleted"
```
## Language EndPoints
**Add Language**
POST: https://mern-project-quad-squad-server.herokuapp.com/api/languages/

Request:
```javascript
{
    "language": "English",
    "level":"CLB9"
}
```
Reponse:
```javascript
{
    "_id": "610b7f920768f900153841e6",
    "user": "610b78440768f900153841d8",
    "language": "English",
    "level": "CLB9",
    "__v": 0
}
```   
**Update Language**
PUT: https://mern-project-quad-squad-server.herokuapp.com/api/languages/

Request:

```javascript
{
    "id":"610b7f920768f900153841e6",
    "language": "English",
    "level":"CLB8"
}
```

Response:

```javascript
{
    "_id": "610b7f920768f900153841e6",
    "user": "610b78440768f900153841d8",
    "language": "English",
    "level": "CLB8",
    "__v": 0
}
```
**Get Language**
GET: https://mern-project-quad-squad-server.herokuapp.com/api/languages/

Reponse:    

```javascript
[
    {
        "_id": "610b7f920768f900153841e6",
        "user": "610b78440768f900153841d8",
        "language": "English",
        "level": "CLB8",
        "__v": 0
    }
]
```
GET: https://mern-project-quad-squad-server.herokuapp.com/api/languages/610b7f920768f900153841e6

Reponse:    

```javascript
{
    "_id": "610b7f920768f900153841e6",
    "user": "610b78440768f900153841d8",
    "language": "English",
    "level": "CLB8",
    "__v": 0
}
```
**Delete Language**
DELETE: https://mern-project-quad-squad-server.herokuapp.com/api/projects/

Request:

```javascript
{
    "id": "610b7f920768f900153841e6"
}
```

Reponse:    

```javascript
"language deleted"
```
## Resume EndPoints
**Add Resume**
POST: https://mern-project-quad-squad-server.herokuapp.com/api/resumes/

Request:
```javascript
{
    "user": "610b78440768f900153841d8",
    "title":"Resume 2",
    "description":"Resume 2 description",
    "languages":[
        {
            "_id":"610625f3aa414107e42f4bb0"
        }
    ],
    "projects":[
        {
            "_id":"610b7ac20768f900153841dd"
        }
    ],
    "skills":[
        {
            "_id":"61008827f727912610ed8e20"
        }
    ]
}
```
Reponse:
```javascript
{
    "educations": [],
    "experiences": [],
    "skills": [
        "61008827f727912610ed8e20"
    ],
    "languages": [
        "610625f3aa414107e42f4bb0"
    ],
    "projects": [
        "610b7ac20768f900153841dd"
    ],
    "awards": [],
    "hobbies": [],
    "aboutmes": [],
    "_id": "610b81d40768f900153841ee",
    "user": "610b78440768f900153841d8",
    "title": "Resume 2",
    "description": "Resume 2 description",
    "__v": 0
}
```   

**Get Resume**
GET: https://mern-project-quad-squad-server.herokuapp.com/api/resumes/

Reponse:    

```javascript
[
    {
        "educations": [],
        "experiences": [],
        "skills": [],
        "languages": [
            "610625f3aa414107e42f4bb0"
        ],
        "projects": [],
        "awards": [],
        "hobbies": [],
        "aboutmes": [],
        "_id": "61063cb490efd348191d366c",
        "user": "61062571e37960026a7b5454",
        "title": "Resume 1",
        "description": "Resume 1 description",
        "__v": 0
    },
    {
        "educations": [],
        "experiences": [],
        "skills": [
            "61008827f727912610ed8e20"
        ],
        "languages": [
            "610625f3aa414107e42f4bb0"
        ],
        "projects": [
            "610b7ac20768f900153841dd"
        ],
        "awards": [],
        "hobbies": [],
        "aboutmes": [],
        "_id": "610b81d40768f900153841ee",
        "user": "610b78440768f900153841d8",
        "title": "Resume 2",
        "description": "Resume 2 description",
        "__v": 0
    }
]
```
GET: https://mern-project-quad-squad-server.herokuapp.com/api/resumes/610b81d40768f900153841ee

Reponse:    

```javascript
{
    "educations": [],
    "experiences": [],
    "skills": [
        "61008827f727912610ed8e20"
    ],
    "languages": [
        "610625f3aa414107e42f4bb0"
    ],
    "projects": [
        "610b7ac20768f900153841dd"
    ],
    "awards": [],
    "hobbies": [],
    "aboutmes": [],
    "_id": "610b81d40768f900153841ee",
    "user": "610b78440768f900153841d8",
    "title": "Resume 2",
    "description": "Resume 2 description",
    "__v": 0
}
```
**Delete Language**
DELETE: https://mern-project-quad-squad-server.herokuapp.com/api/resumes/

Request:

```javascript
{
    "id": "610b81d40768f900153841ee"
}
```
Reponse:    

```javascript
"resume deleted"
```    
-  [x] Vlad Kostur: Award, Contact, Hobby
-  [x] Subham Tandel: Education, Experience

## Learning Curve and challengers

-  Learnt about express, mongodb, mongoose.

## Resources

-  https://cloud.mongodb.com
-  https://mongoosejs.com
