package com.experis.lagalt.repositories;

import com.experis.lagalt.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p.id," +
            "p.title," +
            "p.industry," +
            "p.description," +
            "p.progress," +
            "p.tags," +
            "p.skills," +
            "p.user" +
            " FROM Project p where p.id = :id")
    Optional<Project> findProjectByIdPreLogin(@Param("id") Long id);

    @Query("SELECT p.id," +
            "p.title," +
            "p.industry," +
            "p.description," +
            "p.progress," +
            "p.tags," +
            "p.skills," +
            "p.user" +
            " FROM Project p")
    List<Project> getAllProjectsPreLogin();
}