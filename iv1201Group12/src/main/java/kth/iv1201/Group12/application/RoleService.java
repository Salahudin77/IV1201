package kth.iv1201.Group12.application;

import kth.iv1201.Group12.entity.Role;
import kth.iv1201.Group12.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class RoleService {

    private RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role>getRoles(){
        return roleRepository.findAll();
    }



}
