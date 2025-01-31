package kth.iv1201.Group12.entity;

import jakarta.persistence.*;

@Entity
@Table(name="person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_id ")
    private int person_id;
    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "password")

    private String password;
    @Column(name = "role_id")
    private int role_id;

    @Column(name = "username")
    private String username;


    public Person(int person_id, String name, String surname, String password, int role_id, String username) {
        this.person_id = person_id;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.role_id = role_id;
        this.username = username;
    }
    public Person(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
