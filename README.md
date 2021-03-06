# Generic Server

I notice that i always repeat the same things when i start a new project : setup a server, setup a Db, add authentication flow, etc...

The first goal here is to build a generic server for my further projects.

The second goal is to improve my backend skill by searching and applying best practices. I want the end result closest to a professional server.

## Technologies

- Node
- Express
- MongoDB
- TypeScript
- Swagger/OpenApi

## Todo

- [x] Build documentation automatically
  - [x] Search solution : swagger / openapi
  - [x] Apply
    - [x] User
      - [x] Register
      - [x] Login
      - [x] Get recovery key
      - [x] Change password with recovery key
      - [x] Read
      - [x] Update
      - [x] Delete
- [x] Respect REST principes
- [ ] Add unit tests
  - [ ] Search and learn a solution (Jest ?)
  - [ ] Apply
- [ ] Improve typescript types/interfaces/...
  - [ ] Search best practices
  - [ ] Apply

## Useful documentation

- Server architecture
  - [Bulletproof node server](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf)
  - [RealWorld project](https://github.com/gothinkster/node-express-realworld-example-app)
  - [Dev Mastery](https://www.youtube.com/watch?v=CnailTcJV_U&t=844s)
- Rest API standards and good practices
  - [Wikipedia crud restful](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
- Error handling
  - [Handle error with middleware and custom error class](https://dev.to/nedsoft/central-error-handling-in-express-3aej)
  - [Express documentation](https://expressjs.com/en/guide/error-handling.html)
  - [Error codes and best practices](https://developer.orange.com/tech_guide/orange-apis-error-handling/)
- Unit tests
- Documentation flow
  - [documentation.js](https://documentation.js.org) : plus de MAJ depuis 2018. Génère MD.
  - [jsdoc](https://jsdoc.app/about-getting-started.html) : a tester. Génère html.
  - [apiDoc](https://apidocjs.com) : fonctionnement aléatoire. Génère html.
  - [openAPI/Swagger](https://medium.com/wolox/documenting-a-nodejs-rest-api-with-openapi-3-swagger-5deee9f50420)
  - [OpenAPI/Swagger documentation](https://swagger.io/specification/)
- Typescripts good practices
