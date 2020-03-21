package com.gotchoo.repository;

import com.gotchoo.domain.Supply;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Supply entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyRepository extends JpaRepository<Supply, Long> {

    @Query("select supply from Supply supply where supply.user.login = ?#{principal.username}")
    List<Supply> findByUserIsCurrentUser();
}
