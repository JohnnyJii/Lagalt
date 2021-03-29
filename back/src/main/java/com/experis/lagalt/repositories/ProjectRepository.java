package com.experis.lagalt.repositories;

import com.experis.lagalt.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    boolean existsByGoogleid(String googleid);

    Optional<Project> findByGoogleid(String googleid);

    void deleteByGoogleid(String googleid);
}