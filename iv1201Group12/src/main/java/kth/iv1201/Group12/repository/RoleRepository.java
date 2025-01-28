package kth.iv1201.Group12.repository;
import kth.iv1201.Group12.entity.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface RoleRepository extends JpaRepository<Role,Integer> {
}
