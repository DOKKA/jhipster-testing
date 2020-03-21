package com.gotchoo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gotchoo.web.rest.TestUtil;

public class SupplyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Supply.class);
        Supply supply1 = new Supply();
        supply1.setId(1L);
        Supply supply2 = new Supply();
        supply2.setId(supply1.getId());
        assertThat(supply1).isEqualTo(supply2);
        supply2.setId(2L);
        assertThat(supply1).isNotEqualTo(supply2);
        supply1.setId(null);
        assertThat(supply1).isNotEqualTo(supply2);
    }
}
