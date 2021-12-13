# Capt VanZandt's React Based Blog Webapp

The project utilized the following libraries
- ReactJS
- Express
- Bcrypt
- jsonwebtoken
- pg
- sequelize
- dotenv
- cookie-session

This repo contains both the front-end and back-end components of the application.

## Hosting

The web application is hosted utilizing the cloud platform Heroku, which provides a generous free-tier hosting level with a subdomain under herokuapp.com.

## Security

The project utilizes web tokens for user authentication and authorization. The web tokens issued are signed with a private key generate utilizing nodejs's native crypto library. 

With the private key, the web tokens are signed utilizing the SH256 algorithm and simply include the authenticated username as data. This prevents unauthorized tampering of the authorization given. The JWT is stored in an HTTPonly cookie, preventing tampering. 

The JWT expires 30 minutes after issuance for security purposes. On the client side, a JWT is checked for, then sent to the server on startup for verification. If expired or unable to be authenticated, the UI requests the user provide login credentials. The JWT is required to be attached to all requests to edit, delete, or create posts. Additionally, the JWT is utilized to ensure only posts created by the user can be edited or deleted by the user. 

The cloud service handles SSL certs providing for a secure requests to the API endpoint.

## Database

This project utilizes a Postgre SQL database hosted by Amazon Web Services, provided through the Heroku web hosting entity. The database contains two tables, a user table and a blogs table. The blogs table references the user table to facilitate and one to many relationship. The database is on the free tier so is limited to 10,000 rows of data, but can easily be scaleable in the future. The access information for the server is located in a private environment variable inside the cloud service.

## Front-End

The front-end is based on the react framework, within one master App React component with multiple sub-components depending on the data presented and authentication status. The app is presented as a single-page application, dynamically changing views depending on the main App state. 

