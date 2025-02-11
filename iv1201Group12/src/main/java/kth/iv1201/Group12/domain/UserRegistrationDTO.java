package kth.iv1201.Group12.domain;
import jakarta.validation.constraints.*;


/**
 * Data Transfer Object (DTO) for user registration.
 * Contains validation constraints to ensure valid input data.
 */

public class UserRegistrationDTO {

    /**
     * First name of the user. Cannot be blank.
     */
    @NotBlank(message = "First name cannot be blank")
    private String firstName;
    /**
     * Last name of the user. Cannot be blank.
     */
    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

    /**
     * Email address of the user. Must be a valid email format.
     */
    @Email(message = "Not a email, please use correct format")
    @NotBlank(message = "Email field cannot be blank")
    private String email;
    /**
     * Unique personal identification number. Cannot be blank.
     */

    @NotNull(message = "Person number cannot be blank")
    private String personNumber;

    /**
     * Username chosen by the user. Must be at least 4 characters long.
     */
    @NotBlank(message = "User Name cannot be blank")
    @Size(message = "Must be at least 4 characters")
    private String userName;
    /**
     * Password chosen by the user. Must be at least 6 characters long.
     */
    @NotBlank(message = "Password cannot be blank")
    @Size(message = "Must be at least 6 characters")
    private String password;


    /**
     * Constructor for UserRegistrationDTO with all required fields.
     *
     * @param firstName   User's first name.
     * @param lastName    User's last name.
     * @param email       User's email address.
     * @param personNumber Unique personal identification number.
     * @param userName    User's chosen username.
     * @param password    User's chosen password.
     */


    public UserRegistrationDTO(String firstName, String lastName, String email, String personNumber, String userName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.personNumber = personNumber;
        this.userName = userName;
        this.password = password;

    }


    public UserRegistrationDTO() {

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPersonNumber() {
        return personNumber;
    }

    public void setPersonNumber(String personNumber) {
        this.personNumber = personNumber;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
