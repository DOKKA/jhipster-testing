package com.gotchoo.web.rest;

import com.gotchoo.domain.Good;
import com.gotchoo.repository.GoodRepository;
import com.gotchoo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.gotchoo.domain.Good}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GoodResource {

    private final Logger log = LoggerFactory.getLogger(GoodResource.class);

    private static final String ENTITY_NAME = "good";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GoodRepository goodRepository;

    public GoodResource(GoodRepository goodRepository) {
        this.goodRepository = goodRepository;
    }

    /**
     * {@code POST  /goods} : Create a new good.
     *
     * @param good the good to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new good, or with status {@code 400 (Bad Request)} if the good has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/goods")
    public ResponseEntity<Good> createGood(@RequestBody Good good) throws URISyntaxException {
        log.debug("REST request to save Good : {}", good);
        if (good.getId() != null) {
            throw new BadRequestAlertException("A new good cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Good result = goodRepository.save(good);
        return ResponseEntity.created(new URI("/api/goods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /goods} : Updates an existing good.
     *
     * @param good the good to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated good,
     * or with status {@code 400 (Bad Request)} if the good is not valid,
     * or with status {@code 500 (Internal Server Error)} if the good couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/goods")
    public ResponseEntity<Good> updateGood(@RequestBody Good good) throws URISyntaxException {
        log.debug("REST request to update Good : {}", good);
        if (good.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Good result = goodRepository.save(good);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, good.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /goods} : get all the goods.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of goods in body.
     */
    @GetMapping("/goods")
    public List<Good> getAllGoods() {
        log.debug("REST request to get all Goods");
        return goodRepository.findAll();
    }

    /**
     * {@code GET  /goods/:id} : get the "id" good.
     *
     * @param id the id of the good to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the good, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/goods/{id}")
    public ResponseEntity<Good> getGood(@PathVariable Long id) {
        log.debug("REST request to get Good : {}", id);
        Optional<Good> good = goodRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(good);
    }

    /**
     * {@code DELETE  /goods/:id} : delete the "id" good.
     *
     * @param id the id of the good to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/goods/{id}")
    public ResponseEntity<Void> deleteGood(@PathVariable Long id) {
        log.debug("REST request to delete Good : {}", id);
        goodRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
