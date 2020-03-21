package com.gotchoo.repository;

import com.gotchoo.domain.Demand;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Demand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemandRepository extends JpaRepository<Demand, Long> {

    @Query("select demand from Demand demand where demand.user.login = ?#{principal.username}")
    List<Demand> findByUserIsCurrentUser();
}
