package com.gotchoo.repository;

import com.gotchoo.domain.Good;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Good entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GoodRepository extends JpaRepository<Good, Long> {
}
