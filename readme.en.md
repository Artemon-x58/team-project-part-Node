#HealhyHub

Healhy Hub is a web-based application that helps users keep track of their diet, water intake and weight changes. The main goal of the project is to provide users with tools to control their recommended weight.
The project provides for user registration, authentication and authorisation.
The app allows users to keep track of their daily calorie, water and nutrient goals, as well as keep a food diary.
In addition, the application has a friendly and intuitive user interface that allows users to perform all necessary actions conveniently and quickly. The project also ensures user security by encrypting passwords and identifying with tokens.

## Features:

### User registration, with information uniqueness checks and record creation.

POST /api/auth/signup.

### Creating a user login with credentials verification and authentication token generation.

POST /api/auth/signin

### Updating the user's password information, sending a new token to the user's email address specified during registration.

POST /api/auth/forgot-password

### Registering a new password received from the user's email.

POST /api/auth/create-new-password

### The authorisation layer that will check for a token and access rights.

middlewares/authenticate
GET /api/auth/currentUser

### Logout of the user (logout).

POST /api/auth/signout

### Retrieving user information, including information about the calculated current BMR, daily water intake, and the ratio of macronutrients to BMR.

GET /api/user/current

### Replaces the avatar received by the user during registration with your own.

PATCH /api/user/avatars

### Update user information or one of the contact information fields with BMR/day water intake/ratio of macronutrients to BMR recalculation in case of changes in the data used in the formulas.

PUT /api/user/update

### Updates the user's goal and recalculates the ratio of macronutrients to BMR. The new goal and the ratio of macronutrients to BMR are passed in the body of the request.

PUT /api/user/goal

### Adds information about the user's current weight for the current date. The body of the request contains the new weight, daily water intake, and macronutrient to BMR ratio.

POST /api/user/weight

### Saves information about the user's food consumption for the current date.

POST /api/user/food-intake

### Getting information about the user's food intake for the current date.

GET /api/user/food-intake

### Deleting information about the food intake of the corresponding meal for the current date.

DELETE /api/user/food-intake/

### Updating the information about the food intake for a specific record by its identifier (id). The body of the request contains new data, such as the name of the meal, and the name of the product, calories, carbohydrates, proteins, and fats.

PUT /api/user/food-intake/:id

### Deletes information about food intake for a specific record by its identifier (id). In the body of the request, new updated data is passed, such as the name of the meal time, the total amount of carbohydrates, proteins, fats for this meal time, and the list of foods consumed.

DELETE /api/user/food-intake/:id

### Saves information about the user's water intake for the current date.

POST /api/user/water-intake

### Deleting information about the user's water intake for the current date.

DELETE /api/user/water-intake

### Get the user's calorie, water, and weight intake statistics for the selected period.

GET /api/user/statistics

### Get the list of recommended products.

GET /api/recommended-food

### The stack of libraries used in the project:

### Node.js - JavaScript runtime on the server

### Bcrypt - a library for working with hash passwords

### Cloudinary - allows you to integrate the application with Cloudinary

### Cors - used to enable CORS with various options

### Cross-env - Run scripts that set and use environment variables on different platforms

### Dotenv - a zero-dependency module that loads environment variables from the .env file into process.env

### Express.js - a framework for developing web applications on Node.js

### Gravatar - library for generating gravatar URLs in Node.js

### Jimp - image processing library for Node

### Joi - schema description language and data validator for JavaScript

### Jsonwebtoken - implementation of JSON web tokens

### Jsonwebtoken - implementation of JSON web tokens

### Mongoose - library for working with MongoDB in Node.js

### Morgan - for creating a middleware function

### Multer - node.js middleware for processing multi-part/shaped data

### Nanoid - a string ID generator for JavaScript

### Node-cron - pure JavaScript task scheduler for Node.js

### Nodemailer - sending emails with Node.js

### Swagger-ui-express - allows you to serve automatically generated swagger-ui API documentation from an expression based on the swagger.json file
