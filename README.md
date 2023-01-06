<div align="center">
<h1>Organization Chart 📊</h1>
  <h1>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  </h1>
</div>

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=BTIG_org-chart-ui&metric=coverage&token=5b5cf8c49fe84f76bd7598815206769769829ca9)](https://sonarcloud.io/summary/new_code?id=BTIG_org-chart-ui)


From your command line, first clone Org-Chart:

```bash
# Clone the repository
$ git clone [link of the repo]
# Move into the repository
$ cd [repo-name]
```

After that, you can install the dependencies either using NPM or Yarn.

Project Uses Node version `16.16.0`

Using NPM: First Delete `yarn.lock` file and simply run the below commands

```bash
Delete yarrn.lock file from the project
# Install dependencies
$ npm install
# Start the development server
$ npm start
```

Using Yarn: Be aware of that you'll need to delete the `package-lock.json` file before executing the below commands.

```bash
# Install dependencies
$ yarn install
# Start the development server
$ yarn start
```

## Dockerization of the App

```bash
#First you have to install docker desktop in order to create an image of the app

After Successfully cloning the project just run these commands

#To create docker image
$ docker build -t org-chart

#To run the image
$ docker run -it -p "3002:3000" org-chart

Then the server is started and you can view the project on localhost:3002
```

## Note

```bash
 If you want to create an image for an other environment

#To create docker image
$ docker build -f dockerfile.<environment> org-chart .

for example
$ docker build -f dockerfile.dev org-chart .


#To run the image
$ docker run -it -p "3002:3000" org-chart

Then the server is started and you can view the project on localhost:3002
```
