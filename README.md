# MERN-Stack-Template
 MERN Stack template for quick && easy setup.

# Tech Used:
- React
- Express
- NodeJS
- MongoDB

# Local Initialization
### Installation
- Clone the repo
- Run ```npm install``` in the client and server folder to install the server dependencies.

### Set up environment variables
- In the ```server/config``` folder, create a file titled ".env"
- This file, which will contain sensitive info, will automatically be ignored by .gitignore


```
# Please copy and paste this template into a new .env file
PORT = 3000 (can be any port example: 2121)
DB_STRING = `your database URI`
SECRET = `your custom JSON web token secret`
```
  
### Running the application
- Run ```npm start```in the client folder.
- Run ```npm dev```in the server folder.
