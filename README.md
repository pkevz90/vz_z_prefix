# Capt VanZandt's React Based Blog Webapp

The project utilized the following libraries
- ReactJS
- Express
- Bcrypt
- pg
- sequelize
- dotenv
- cookie-session
- uuid
- morgan (logging)
- helmet

This repo contains both the front-end and back-end components of the application.

## Hosting

The web application is hosted utilizing the cloud platform Heroku, which provides a generous free-tier hosting level with a subdomain under herokuapp.com.

## Security

The project utilizes signed cookies provided by the cookie-session npm dependency. The signed cookie is set to HttpOnly for security and contains the authorized user's ID, username, and a unique cookie identifier provided by the uuid library. The maximum age for a cookie is 24 hrs, after which the user will have to re-authenticate. 

The unique cookie identifier is inserted into a valid cookies table. This allows the cookie to be invalidated for all users when a user logs out of the website utilizing a specific cookie. This further lowers the chance of mistaken authentication through stolen data. 

Authentication via the signed cookie is utilized for every user action that alters the database, including adding posts, editing posts, and deleting posts. 

The npm library helmet is used to set http headers to various more secure options.

The cloud service handles SSL certs providing for a secure requests to the API endpoint.

## Database

This project utilizes a Postgre SQL database hosted by Amazon Web Services, provided through the Heroku web hosting entity. The database contains two tables, a user table and a blogs table. The blogs table references the user table to facilitate and one to many relationship. The database is on the free tier so is limited to 10,000 rows of data, but can easily be scaleable in the future. The access information for the server is located in a private environment variable inside the cloud service.

## Front-End

The front-end is based on the react framework, within one master App React component with multiple sub-components depending on the data presented and authentication status. The app is presented as a single-page application, dynamically changing views depending on the main App state. 

