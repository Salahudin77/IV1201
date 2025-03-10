IV1201 - Recruitment Application
This is a recruitment application built using Spring Boot for the course IV1201. The web application allows users to register, log in, and create job applications, while administrators can manage those applications.

Features
User Registration & Login: Users can create accounts and log in to manage job applications.
Create & Manage Job Applications: Applicants can submit job applications.
Admin Interface: Admins can review, accept, or reject job applications.
Technologies & Tools
Backend: Spring Boot
Frontend: React
Database: PostgreSQL
Build Tool: Maven
Version Control: Git
Testing: JUnit, Selenium, ViteTest
Internationalization: I18Nexus
Installation & Running Locally
Prerequisites
Java
Maven
PostgreSQL
Steps to Run
Clone the repository:
git clone https://github.com/Salahudin77/IV1201.git

Navigate to the project directory:
cd IV1201/Recruitment

Create a PostgreSQL database and update src/main/resources/application.properties with your database credentials.
Build the project:

mvn clean install
Start the application:
mvn spring-boot:run

Open in browser:
http://localhost:8080
Code Structure

Controller: Handles HTTP requests and serves the appropriate views.
DTO (Data Transfer Objects): Manages data transfer between client and server.
Model: Defines database entities and their relationships.

Service: Contains business logic.

Repository: Handles database operations.

Security: Configures authentication and authorization with Spring Security.
Testing

Unit Tests: JUnit is used to test individual components.

Integration Tests: Selenium is used for end-to-end application flow testing.
Frontend Tests: ViteTest is used for testing React components

Internationalization
The application supports multiple languages using I18Nexus. To add or update translations, modify the files in src/main/resources/i18n.

Deployment
This application can be deployed on Heroku or other platforms.

Deploying to Heroku
Build the project:
mvn clean install
Create a Heroku app:
heroku create
Push the code to Heroku:
git push heroku main
Migrate the database:

heroku run 'mvn flyway:migrate'
