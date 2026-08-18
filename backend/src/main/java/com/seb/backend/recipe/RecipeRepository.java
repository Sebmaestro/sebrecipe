package com.seb.backend.recipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb.backend.user.User;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByOwner(User owner);
}
