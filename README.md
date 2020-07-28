# minhub

Exercise based on the knowledge acquired in Module 2 of WPTMAD0420

## 1 - Scaffolding

![Scaffolding](https://res.cloudinary.com/dobsg5z2w/image/upload/v1595924760/minihub/project/Captura_de_pantalla_2020-07-28_a_las_10.23.23_n9rmzt.png "Folders structure")


### 1.1 - Create files:
* app.js
* bin/seeds.js
* .env
* .env.template
* .gitignore 
    * node_modules
    * package-lock.json
    * .env
    * .DS_Store

### 1.2 - npm init -y

Force install npm and configure package.json after.

### 1.3 - Add basic packages 
npm install:

* dependencies
  * express - Framework for node 
  * connect-mongo - Conect to DB
  * mongoose - Manage DB
  * dotenv - Use Environment Variables
  * bcrypt - Encrypt data (pass)
  * express-session - Create LOCAL sessions for loged users
  * passport -  Manage proccess login/register users
  * passport-google-oauth20 - Manage proccess login/register users (RRSS)
  * passport-slack - Manage proccess login/register users (RRSS)
  * faker - Get random data
  * ejs - Template engine
  * express-ejs-layouts - Template layout engine
  * morgan - Manage logs on app
  * multer - Uploads files to cloud (Dependence)
  * multer-storage-cloudinary - Uploads files to cloud (Specific dependence)
  * cloudinary - Uploads files to cloud (provider) 
  * nodemailer - Send transactional emails

* devDependencies
  * nodemon - Wathcher changes and reload dev server


`npm i express connect-mongo mongoose dotenv bcrypt express-session passport passport-google-oauth20 passport-slack faker ejs morgan multer multer-storage-cloudinary cloudinary nodemailer express-ejs-layouts & npm i nodemon --save-dev`

### 1.5 - Config scripts commands cli on package.json 

  * start: "node app.js",
  * dev: "nodemon -e ejs,js,css app.js",
  * seeds: "node ./bin/seeds"

### 1.5 - Add essentials Global Variables 
.env
.env.template

* PORT=
* CLOUDINARY_NAME=
* CLOUDINARY_KEY=
* CLOUDINARY_SECRET=
* MONGODB_URI=
* NM_PASS=
* NM_USER=
* SLACK_CLIENT_ID=
* SLACK_CLIENT_SECRET=
* GOOGLE_CLIENT_ID=
* GOOGLE_CLIENT_SECRET=
* SESSION_SECRET=
* SESSION_SECURE=
* SESSION_MAX_AGE=


