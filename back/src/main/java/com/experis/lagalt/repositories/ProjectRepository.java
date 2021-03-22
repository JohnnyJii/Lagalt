package com.experis.lagalt.repositories;

import com.experis.lagalt.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface projectRepository extends JpaRepository<User, Long> {
}