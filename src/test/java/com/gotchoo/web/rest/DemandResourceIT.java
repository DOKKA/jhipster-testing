package com.gotchoo.web.rest;

import com.gotchoo.GotchooApp;
import com.gotchoo.domain.Demand;
import com.gotchoo.repository.DemandRepository;

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

import com.gotchoo.domain.enumeration.Type;
/**
 * Integration tests for the {@link DemandResource} REST controller.
 */
@SpringBootTest(classes = GotchooApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DemandResourceIT {

    private static final Type DEFAULT_TYPE = Type.GOOD;
    private static final Type UPDATED_TYPE = Type.SERVICE;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private DemandRepository demandRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDemandMockMvc;

    private Demand demand;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Demand createEntity(EntityManager em) {
        Demand demand = new Demand()
            .type(DEFAULT_TYPE)
            .quantity(DEFAULT_QUANTITY);
        return demand;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Demand createUpdatedEntity(EntityManager em) {
        Demand demand = new Demand()
            .type(UPDATED_TYPE)
            .quantity(UPDATED_QUANTITY);
        return demand;
    }

    @BeforeEach
    public void initTest() {
        demand = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemand() throws Exception {
        int databaseSizeBeforeCreate = demandRepository.findAll().size();

        // Create the Demand
        restDemandMockMvc.perform(post("/api/demands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demand)))
            .andExpect(status().isCreated());

        // Validate the Demand in the database
        List<Demand> demandList = demandRepository.findAll();
        assertThat(demandList).hasSize(databaseSizeBeforeCreate + 1);
        Demand testDemand = demandList.get(demandList.size() - 1);
        assertThat(testDemand.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testDemand.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createDemandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demandRepository.findAll().size();

        // Create the Demand with an existing ID
        demand.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemandMockMvc.perform(post("/api/demands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demand)))
            .andExpect(status().isBadRequest());

        // Validate the Demand in the database
        List<Demand> demandList = demandRepository.findAll();
        assertThat(demandList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDemands() throws Exception {
        // Initialize the database
        demandRepository.saveAndFlush(demand);

        // Get all the demandList
        restDemandMockMvc.perform(get("/api/demands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demand.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    
    @Test
    @Transactional
    public void getDemand() throws Exception {
        // Initialize the database
        demandRepository.saveAndFlush(demand);

        // Get the demand
        restDemandMockMvc.perform(get("/api/demands/{id}", demand.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(demand.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingDemand() throws Exception {
        // Get the demand
        restDemandMockMvc.perform(get("/api/demands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemand() throws Exception {
        // Initialize the database
        demandRepository.saveAndFlush(demand);

        int databaseSizeBeforeUpdate = demandRepository.findAll().size();

        // Update the demand
        Demand updatedDemand = demandRepository.findById(demand.getId()).get();
        // Disconnect from session so that the updates on updatedDemand are not directly saved in db
        em.detach(updatedDemand);
        updatedDemand
            .type(UPDATED_TYPE)
            .quantity(UPDATED_QUANTITY);

        restDemandMockMvc.perform(put("/api/demands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDemand)))
            .andExpect(status().isOk());

        // Validate the Demand in the database
        List<Demand> demandList = demandRepository.findAll();
        assertThat(demandList).hasSize(databaseSizeBeforeUpdate);
        Demand testDemand = demandList.get(demandList.size() - 1);
        assertThat(testDemand.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDemand.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingDemand() throws Exception {
        int databaseSizeBeforeUpdate = demandRepository.findAll().size();

        // Create the Demand

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDemandMockMvc.perform(put("/api/demands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demand)))
            .andExpect(status().isBadRequest());

        // Validate the Demand in the database
        List<Demand> demandList = demandRepository.findAll();
        assertThat(demandList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDemand() throws Exception {
        // Initialize the database
        demandRepository.saveAndFlush(demand);

        int databaseSizeBeforeDelete = demandRepository.findAll().size();

        // Delete the demand
        restDemandMockMvc.perform(delete("/api/demands/{id}", demand.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Demand> demandList = demandRepository.findAll();
        assertThat(demandList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
