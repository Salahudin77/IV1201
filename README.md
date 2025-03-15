# IV1201 - Recruitment Application

This recruitment application is developed using **Spring Boot** and **React** as part of the course IV1201. It allows job seekers to register, log in, and submit job applications, while recruiters can review and manage these applications.

**Deployed version is found here:** https://iv1201-frontend-7cb3b1d26c0b.herokuapp.com/home

## Features

- **User Registration & Login:** Secure authentication for both applicants and recruiters.
- **Job Application Management:** Applicants can submit, edit, and track applications.
- **Recruiter Interface:** Recruiters can review, accept, or reject applications.
- **Internationalization:** Multi-language support integrated through I18Nexus.
- **Security:** Robust authentication and authorization using Spring Security.
- **Automated Testing:** Comprehensive automated tests using JUnit, Selenium, and ViteTest.

## Technologies & Tools

| Component           | Technology             |
|---------------------|------------------------|
| **Backend**         | Spring Boot            |
| **Frontend**        | React                  |
| **Database**        | PostgreSQL             |
| **Build Tool**      | Maven                  |
| **Version Control** | Git                    |
| **Testing**         | JUnit, Selenium, ViteTest |
| **i18n**            | I18Nexus               |

## Installation & Running Locally

### Prerequisites:
- Java (JDK 17+)
- Maven
- PostgreSQL

### Steps to Run:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Salahudin77/IV1201.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd IV1201/
   ```

3. **Setup Database:**

   Create a PostgreSQL database and update the configuration in:
   ```
   src/main/resources/application.properties
   ```

4. **Build the project:**

   ```bash
   mvn clean install
   ```

5. **Run the application:**

   ```bash
   mvn spring-boot:run
   ```

4. **Open in browser:**

   [http://localhost:8080](http://localhost:8080)

## Code Structure

- **Controller:** Handles HTTP requests and responses.
- **DTO (Data Transfer Objects):** Facilitates data transfer between client and server.
- **Model:** Defines database entities and relationships.
- **Service:** Implements business logic.
- **Repository:** Database interaction layer.
- **Security:** Configures authentication and authorization using Spring Security.

## Testing

- **Unit Tests:** Implemented with JUnit.
- **Integration Tests:** Conducted using Selenium.
- **Frontend Tests:** Managed through ViteTest for React components.

## Internationalization

The application supports multiple languages via I18Nexus. To update translations, modify language files in:

```
src/main/resources/i18n/
```

## Deployment

This application can be deployed to cloud platforms such as Heroku.

### Deploying to Heroku:

1. **Build the project:**

   ```bash
   mvn clean install
   ```

2. **Create a Heroku app:**

   ```bash
   heroku create
   ```

3. **Push the code to Heroku:**

   ```bash
   git push heroku main
   ```

4. **Migrate the database:**

   ```bash
   heroku run 'mvn flyway:migrate'
   ```

## Contributors
- **Marvin Haidari**
- **Salahudin Abdi Salah**
- **Abdurahman Ahmed**

