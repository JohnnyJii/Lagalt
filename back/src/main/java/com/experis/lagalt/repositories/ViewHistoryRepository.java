package com.experis.lagalt.repositories;

import com.experis.lagalt.models.User;
import com.experis.lagalt.models.ViewHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewHistoryRepository extends JpaRepository<ViewHistory, Long> {
    ViewHistory findByUser(User user);
}
