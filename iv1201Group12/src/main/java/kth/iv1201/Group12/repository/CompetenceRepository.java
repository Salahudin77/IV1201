package kth.iv1201.Group12.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import kth.iv1201.Group12.entity.Competence;

@Repository
public interface CompetenceRepository extends JpaRepository<Competence,Integer> {
}
