package com.seb.backend.recipe;

import java.util.List;

import org.springframework.stereotype.Service;

import com.seb.backend.user.User;

@Service
public class RecipeService {

    private final RecipeRepository repository;

    public RecipeService(RecipeRepository repository) {
        this.repository = repository;
    }

    // CRUD methods go here

    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found: " + id));
    }

    public Recipe saveRecipe(Recipe recipe) {
        return repository.save(recipe);
    }

    public void deleteRecipe(Long id) {
        repository.deleteById(id);
    }

    public List<Recipe> getRecipesByOwner(User owner) {
        return repository.findByOwner(owner);
    }

}