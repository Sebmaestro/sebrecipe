package com.seb.backend.recipe;

import java.math.BigDecimal;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Ingredient {
    private String name;
    private BigDecimal amount;
    private String unit;
    private int calorie;
    private BigDecimal price;
}