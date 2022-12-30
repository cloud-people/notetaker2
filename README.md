# API
## Before you begin
Have a MongoDB instance running and create a test database.
## Setup
- Open `api` folder.
- Install dependencies using `yarn` or `npm install`.
- Copy `.env.dev` to `.env` an update MongoDB envars and port.
- Run the code using `yarn dev` or `npm run dev`.
- API should be available on port `3040` or the one you set in `.env`.
## Postman
You'll find Postman collection and environment files in the `postman` folder. Import these files in your local Postman and feel free to experiment the Api with these.
## Notes about Api
- I didn't use any framework here (such as NestJS) because almost no coding would be necessary using such approach. So I preferred to do everything by myself from scratch.
- Used DDD architecture.
- Used TSyringe for DI.
- Used Hapi for web server (a more update-to-date alternative for Express).
- Used Joi for incoming payload validation.
- Used TypeORM for ORM (first time using it with MongoDB)
- Used Boom for Http errors normalization
## What is missing (or I'm not fully satisfied with)
- In `NoteService` I needed to cast Mongo's ObjectId to `any` a few times. This is first time using TypeORM (my preferred ORM framework) with MongoDB and I need to study more to come up with more elegant solution for this. Nevertheless, I imagine you guys probably use Mongoose anyways.
- Missing TDD. Just implemented one test case. It is missing all other tests as well as regressive and e2e tests. Unlike the bullet above, I don't see any problem in casting types to any in tests. I'd rather invest my time making sure tests are really testing desired behaviour than making Typescript happy in my test suite.
- Missing Logging.
- Missing proper error handling with logging.
# Angular App
## Setup
- Open `api` folder.
- Install dependencies using `yarn` or `npm install`.
- Config api address in file `app/src/environments/environment.ts`.
- Run the code using `yarn start` or `npm start`.
- APP should be available on `http://localhost:4200`
- Remember to have the Api running for App to work
## Notes about App
It's been a long time since I last worked with Angular and I noticed by taking this test that it has changed a lot. I had no problem implementing the App using Angular, but maybe due to the lack of experience with it, I might have taken a "naive"/"by the book" approach by not doing customizations and having things exactly how they are specified in Angular documentation.
## What is missing (or I'm not fully satisfied with)
- Missing TDD again here.
- Missing the search feature, albeit I had implemented the endpoint for it.
# Docker
I was working on putting everthing to run inside a Docker container, but I didn't have the time to finish. But I'm leaving related files anyway: `docker-compose.yml`, `Dockerfile` and `package.json`.
