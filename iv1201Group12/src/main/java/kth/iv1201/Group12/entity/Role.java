package kth.iv1201.Group12.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Role {

    @Id
    private int role_id;
    private String name;

    public Role(int role_id, String name) {
        this.role_id = role_id;
        this.name = name;
    }
    public Role(){

    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}


