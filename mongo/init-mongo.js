// init-mongo.js

db = connect("mongodb://localhost:27017/todo");

db.createCollection("User");

db.createCollection("Task");
