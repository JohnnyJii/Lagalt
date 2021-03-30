package com.experis.lagalt.repositories;

import com.experis.lagalt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByGoogleid(String googleid);

    void deleteByGoogleid(String googleid);

    boolean existsByGoogleid(String googleid);
}