package com.gotchoo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gotchoo.web.rest.TestUtil;

public class GoodTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Good.class);
        Good good1 = new Good();
        good1.setId(1L);
        Good good2 = new Good();
        good2.setId(good1.getId());
        assertThat(good1).isEqualTo(good2);
        good2.setId(2L);
        assertThat(good1).isNotEqualTo(good2);
        good1.setId(null);
        assertThat(good1).isNotEqualTo(good2);
    }
}
