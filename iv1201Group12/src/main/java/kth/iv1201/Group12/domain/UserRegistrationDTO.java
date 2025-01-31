package kth.iv1201.Group12.domain;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRegistrationDTO {


    @NotBlank(message = "First name cannot be blank")
    private String firstName;
    @NotBlank(message = "Last name cannot be blank")
    private String lastName;
    @Email(message = "Not a email, please use correct format")
    @NotBlank(message = "Email field cannot be blank")
    private String email;
    @NotBlank(message = "Person number cannot be blank")
    private int personNumber;
    @NotBlank(message = "User Name cannot be blank")
    @Size(message = "Must be at least 4 characters")
    private String userName;

    @NotBlank(message = "Password cannot be blank")
    @Size(message = "Must be at least 6 characters")
    private String password;;


    public UserRegistrationDTO(String firstName, String lastName, String email, int personNumber, String userName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.personNumber = personNumber;
        this.userName = userName;
        this.password = password;
    }
    public  UserRegistrationDTO(){

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

    public int getPersonNumber() {
        return personNumber;
    }

    public void setPersonNumber(int personNumber) {
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
