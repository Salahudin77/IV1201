package kth.iv1201.Group12.presenter;

import kth.iv1201.Group12.application.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import kth.iv1201.Group12.entity.Role;

import java.util.List;

@RestController


public class RoleConstructor {
    private RoleService roleService;

    @Autowired
    public RoleConstructor(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping(path = "/Roles")
    public List<Role> roles(){
        return roleService.getRoles();

    }

}
