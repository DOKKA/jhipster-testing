package com.gotchoo.web.rest;

import com.gotchoo.GotchooApp;
import com.gotchoo.domain.Good;
import com.gotchoo.repository.GoodRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GoodResource} REST controller.
 */
@SpringBootTest(classes = GotchooApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class GoodResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GoodRepository goodRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGoodMockMvc;

    private Good good;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Good createEntity(EntityManager em) {
        Good good = new Good()
            .name(DEFAULT_NAME);
        return good;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Good createUpdatedEntity(EntityManager em) {
        Good good = new Good()
            .name(UPDATED_NAME);
        return good;
    }

    @BeforeEach
    public void initTest() {
        good = createEntity(em);
    }

    @Test
    @Transactional
    public void createGood() throws Exception {
        int databaseSizeBeforeCreate = goodRepository.findAll().size();

        // Create the Good
        restGoodMockMvc.perform(post("/api/goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(good)))
            .andExpect(status().isCreated());

        // Validate the Good in the database
        List<Good> goodList = goodRepository.findAll();
        assertThat(goodList).hasSize(databaseSizeBeforeCreate + 1);
        Good testGood = goodList.get(goodList.size() - 1);
        assertThat(testGood.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGoodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = goodRepository.findAll().size();

        // Create the Good with an existing ID
        good.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGoodMockMvc.perform(post("/api/goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(good)))
            .andExpect(status().isBadRequest());

        // Validate the Good in the database
        List<Good> goodList = goodRepository.findAll();
        assertThat(goodList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGoods() throws Exception {
        // Initialize the database
        goodRepository.saveAndFlush(good);

        // Get all the goodList
        restGoodMockMvc.perform(get("/api/goods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(good.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getGood() throws Exception {
        // Initialize the database
        goodRepository.saveAndFlush(good);

        // Get the good
        restGoodMockMvc.perform(get("/api/goods/{id}", good.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(good.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingGood() throws Exception {
        // Get the good
        restGoodMockMvc.perform(get("/api/goods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGood() throws Exception {
        // Initialize the database
        goodRepository.saveAndFlush(good);

        int databaseSizeBeforeUpdate = goodRepository.findAll().size();

        // Update the good
        Good updatedGood = goodRepository.findById(good.getId()).get();
        // Disconnect from session so that the updates on updatedGood are not directly saved in db
        em.detach(updatedGood);
        updatedGood
            .name(UPDATED_NAME);

        restGoodMockMvc.perform(put("/api/goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGood)))
            .andExpect(status().isOk());

        // Validate the Good in the database
        List<Good> goodList = goodRepository.findAll();
        assertThat(goodList).hasSize(databaseSizeBeforeUpdate);
        Good testGood = goodList.get(goodList.size() - 1);
        assertThat(testGood.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGood() throws Exception {
        int databaseSizeBeforeUpdate = goodRepository.findAll().size();

        // Create the Good

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGoodMockMvc.perform(put("/api/goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(good)))
            .andExpect(status().isBadRequest());

        // Validate the Good in the database
        List<Good> goodList = goodRepository.findAll();
        assertThat(goodList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGood() throws Exception {
        // Initialize the database
        goodRepository.saveAndFlush(good);

        int databaseSizeBeforeDelete = goodRepository.findAll().size();

        // Delete the good
        restGoodMockMvc.perform(delete("/api/goods/{id}", good.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Good> goodList = goodRepository.findAll();
        assertThat(goodList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
