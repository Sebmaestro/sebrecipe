package com.seb.backend.recipe;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    // endpoint methods go here
    @GetMapping("/{id}")
    public Recipe getOne(@PathVariable Long id) {
        return service.getRecipeById(id);
    }

    @GetMapping
    public List<Recipe> getAll() {
        return service.getAllRecipes();
    }
    
    @PostMapping
    public Recipe create(@RequestBody Recipe recipe) {
        return service.saveRecipe(recipe);
    }

    @PutMapping("/{id}")
    public Recipe update(@PathVariable Long id, @RequestBody Recipe recipe) {
        recipe.setId(id);
        return service.saveRecipe(recipe);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteRecipe(id);
    }
}