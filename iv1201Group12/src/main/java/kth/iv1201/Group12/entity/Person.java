package kth.iv1201.Group12.entity;

import jakarta.persistence.*;


@Entity
@Table(name="person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_id")
    private int personId;
    @Column(name = "pnr")
    private String personNumber;
    @Column(name = "name")
    private String firstName;

    @Column(name = "surname")
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "role_id")
    private int roleId;

    @Column(name = "username")
    private String userName;

    @Column(name = "email")
    private String email;

    // Constructors
    public Person(int personId, String firstName, String lastName, String password, int roleId, String userName, String email) {
        this.personId = personId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roleId = roleId;
        this.userName = userName;
        this.email = email;
    }

    public Person(String firstName, String lastName,String personNumber, String password, int roleId, String userName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roleId = roleId;
        this.userName = userName;
        this.email = email;
        this.personNumber = personNumber;
    }

    public Person() {}



    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getRoleId() { return roleId; }
    public void setRoleId(int roleId) { this.roleId = roleId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPersonNumber() {
        return personNumber;
    }

    public void setPersonNumber(String personNumber) {
        this.personNumber = personNumber;
    }
}
