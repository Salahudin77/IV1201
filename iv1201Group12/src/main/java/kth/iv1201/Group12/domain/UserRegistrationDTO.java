package kth.iv1201.Group12.domain;
import jakarta.validation.constraints.*;

public class UserRegistrationDTO {


    @NotBlank(message = "First name cannot be blank")
    private String firstName;
    @NotBlank(message = "Last name cannot be blank")
    private String lastName;
    @Email(message = "Not a email, please use correct format")
    @NotBlank(message = "Email field cannot be blank")
    private String email;
    @NotNull(message = "Person number cannot be blank")
    private String personNumber;
    @NotBlank(message = "User Name cannot be blank")
    @Size(message = "Must be at least 4 characters")
    private String userName;

    @NotBlank(message = "Password cannot be blank")
    @Size(message = "Must be at least 6 characters")
    private String password;;

    @NotNull(message = "role id cannot be blank")
    private int roleId;

    public UserRegistrationDTO(String firstName, String lastName, String email, String personNumber, String userName, String password, int roleId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.personNumber = personNumber;
        this.userName = userName;
        this.password = password;
        this.roleId = roleId;
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

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
}
