package com.seb.backend.recipe;
import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OrderColumn;
import lombok.Data;

@Data
@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<Ingredient> ingredients; 

    @ElementCollection
    @OrderColumn(name = "step_no")
    private List<String> instructions;

    private String name;

    @Column(nullable = true)
    private Integer calories;

    private BigDecimal price;   
}
