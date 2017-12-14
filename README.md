# 2hoursSailsDemo

Notes:

Please set database in config/datastore.js

Default is set for ubuntu:ubuntu@localhost/apidemo (user ubuntu, pwd ubuntu, db apidemo), please set it to whatever db you use (do not forget to ensure that the database in the URL is empty)

To start,

npm i
npm install sails@beta --save
npm install sails@beta -g --save
cd apidemo
(do not forget to set up postgresql)
npm sails lift --drop