package com.seb.backend.recipe;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.seb.backend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OrderColumn;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

    @JsonIgnore // Prevents the user to be exposed in the API response because of potential security concerns. Might want to change later if something from user is needed
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
