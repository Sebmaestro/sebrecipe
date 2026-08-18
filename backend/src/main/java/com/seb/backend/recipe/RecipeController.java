package com.seb.backend.recipe;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.seb.backend.user.User;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    // endpoint methods go here
    @GetMapping("/{id}")
    public Recipe getOne(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Recipe recipe = service.getRecipeById(id);
        if (!recipe.getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return recipe;
    }

    @GetMapping
    public List<Recipe> getAll(@AuthenticationPrincipal User user) {
        return service.getRecipesByOwner(user);
    }

    @PostMapping
    public Recipe create(@RequestBody Recipe recipe, @AuthenticationPrincipal User user) {
        recipe.setOwner(user);
        return service.saveRecipe(recipe);
    }

    @PutMapping("/{id}")
    public Recipe update(@PathVariable Long id, @RequestBody Recipe recipe, @AuthenticationPrincipal User user) {
        Recipe existing = service.getRecipeById(id);
        if (!existing.getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        recipe.setId(id);
        recipe.setOwner(existing.getOwner());
        return service.saveRecipe(recipe);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Recipe recipe = service.getRecipeById(id);
        if (!recipe.getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        service.deleteRecipe(id);
    }

}