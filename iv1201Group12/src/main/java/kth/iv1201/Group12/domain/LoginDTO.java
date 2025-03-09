package kth.iv1201.Group12.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginDTO {

    @NotBlank(message = "User Name cannot be blank")
    private String userName;

    @NotBlank(message = "Password cannot be blank")
    @Size(message = "Must be at least 6 characters")
    private String password;


    public LoginDTO(String username, String password) {
        this.userName = username;
        this.password = password;


    }

    public String getUsername() {

        return userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}








