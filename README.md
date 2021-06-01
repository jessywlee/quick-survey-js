## Quick-Survey-JS is a JavaScript Survey Module.

Quick-Survey-JS offers a quick way to add a simple survey to your website.<br>
It is a set of components of creating, completing, and viewing survey questions and results.<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)

## Quick Start
Intsall the client side package using npm.
```
npm install quick-survey-js
```

## Features

<img alt="Vue.js" src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vue-dot-js&logoColor=%234FC08D"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/> <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
<br>

## Documentation

[API Document](https://documenter.getpostman.com/view/12457751/TzXukyiL#7e4f1f5e-1643-40df-b94c-374aed364f03)

## Clone Git repository
Please refer to the following sections for establising an api server and setting up a client server as needed.

```bash
git clone https://github.com/medistream-team/quick-survey-js.git
```

<br>

## API Server

### 1. Install packages

After you clone git repository, go to the root directory and run `npm run install:api` to download required packages for an api server. Once the installation is done, `.env` file will be automatically created in `./src/api` directory.

```bash
npm run install:api
```

### 2. Set your DB endpoints

You should fill out `MONGO_URI` value inside `.env` at `./src/api` file first. MONGO_URI indicates MongoDB server endpoints and this is necessary to run api on either local or aws lambda.

Here is an example.
```
MONGO_URI=mongodb+srv://test:test123@example.mongodb.net/surveyDB?retryWrites=true&w=majority
```

### 3. Check yml file

Before you run api server, you need to configure `service` and `provider` values inside serverless.yml in `./src/api`.
Default values are set as below.

```yml
service: my-survey

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region: ap-northeast-2
```

### 4. Run server on local

To run this project on local, use `npm run dev` command.

```bash
npm run dev
```

This command will run serverless offline on your local, and default port 8000 will open. 
Here is an example. The `provider[stage]` value you set inside `serverless.yml` will follow the endpoints.

```
localhost:8000/dev
```

### 5. Deploy server on AWS

Or, to deploy your api on aws lambda via serverless framework, use `npm deploy:api` command.

```bash
npm run deploy:api
```

According to serverless documents, the console will show your endpoints. For more information, please visit [this page](https://www.serverless.com/blog/serverless-express-rest-api).

<br>

## Client Server

If you want to check client-side, use `npm run install:client` command. When installation is done, `.env` file will be automatically created in a `./src/client` directory.

```bash
npm run install:client
```

### 1. Set your API endpoints

You should fill out `API_ENDPOINTS` value inside `.env` file at `./src/client`. This indicates API server endpoints.

As an example, 👇

```
API_ENDPOINTS=https://92pz8mf1w2.execute-api.ap-northeast-2.amazonaws.com/dev
```

or 👇, if you're running an API server on local. 

```
API_ENDPOINTS=http://localhost:8000/dev
```

### 2. Run server on local

To run client server on local, run `npm run serve:client` and it will open port 8080 on local.

```
npm run serve:client
```
### 3. Import components

There are 3 components that you may import as needed - to create a poll, submit answers to a poll, and view poll results.
You may import the components on your existing or new application as guided below. 

#### Example

```js
<template>
  <PollAdmin @poll-created="onCreated" @failed-to-create-poll="onFailed" />
</template>

<script>
  import PollAdmin from "../components/PollAdmin";
  ...
</script>
```
### 4. Use components

To get the components working, there are required props to pass each, and methods that you can specify the actions to take in each component.
Please refer to below for **required** props and methods.

#### Create Poll
```js
<PollAdmin 
    @poll-created="yourMethodOnCreated" 
    @failed-to-create-poll="yourMethodOnFailed" 
  />

```

#### Submit Poll
```js
<Poll
    :surveyId="yourSurveyID"
    :userKey="yourUserKey"
    @vote-success="yourMethodOnVoted"
    @already-voted="yourMethodOnAlreadyVoted"
    @poll-closed="yourMethodOnPollClosed"
  />
```

#### View Poll Results
```js
<PollResults 
    :surveyId="yourSurveyID"
    :userKey="yourUserKey"
  />
```


