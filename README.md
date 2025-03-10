IV1201 - Recruitment Application

This is a recruitment application developed using Spring Boot for the course IV1201. The platform allows users to register, log in, and submit job applications, while recruiters can review and manage applications.

Features

User Registration & Login - Secure authentication for job seekers and recruiters.

Create & Manage Job Applications - Applicants can submit and track applications.

Recruiter Interface - Recruiters can review, accept, or reject applications.

Internationalization - Multi-language support with I18Nexus.

Secure Authorization - Implemented using Spring Security.

Automated Testing - Comprehensive testing with JUnit, Selenium, and ViteTest.

Technologies & Tools

Backend: Spring Boot

Frontend: React

Database: PostgreSQL

Build Tool: Maven

Version Control: Git

Testing: JUnit, Selenium, ViteTest

Internationalization: I18Nexus

Installation & Running Locally

Prerequisites:

Java (JDK 17+)

Maven

PostgreSQL

Steps to Run:

Clone the repository:

git clone https://github.com/Salahudin77/IV1201.git

Navigate to the project directory:

cd IV1201/Recruitment

Create a PostgreSQL database and updatesrc/main/resources/application.properties with your database credentials.

Build the project:

mvn clean install

Start the application:

mvn spring-boot:run

Open in browser:

http://localhost:8080

Code Structure

Controller - Handles HTTP requests and serves appropriate views.

DTO (Data Transfer Objects) - Manages structured data transfer between client and server.

Model - Defines database entities and their relationships.

Service - Contains core business logic.

Repository - Handles database operations.

Security - Configures authentication and authorization with Spring Security.

Testing

Unit Tests - Implemented using JUnit for testing individual components.

Integration Tests - Selenium is used for end-to-end application testing.

Frontend Tests - ViteTest ensures correct behavior of React components.

Internationalization

The application supports multiple languages via I18Nexus. To modify translations, update the language files in:📁 src/main/resources/i18n/

Deployment

This application can be deployed on Heroku or other cloud platforms.

Deploying to Heroku:

Build the project:

mvn clean install

Create a Heroku app:

heroku create

Push the code to Heroku:

git push heroku main

Migrate the database:

heroku run 'mvn flyway:migrate'

Contributors

Marvin Haidar

Salahudin Abdi Salah

Abdurahman Ahmed


