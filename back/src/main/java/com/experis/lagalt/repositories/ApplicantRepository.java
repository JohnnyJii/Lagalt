package com.experis.lagalt.repositories;

import com.experis.lagalt.models.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    List<Applicant> findAllByProjectId(long projectId);

    List<Applicant> findAllByUserId(long userId);

    Applicant findApplicantByProjectIdAndUserId(long projectId, long userId);

    boolean existsByProjectIdAndUserId(long projectId, long userId);

}
