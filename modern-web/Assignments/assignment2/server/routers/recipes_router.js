const express = require("express");
const Recipe = require("../models/recipes");
const fetch_recipes = express.Router();

fetch_recipes.get("/", (req, res) => {
  Recipe.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

fetch_recipes.post("/", async (req, res) => {
  const { name, description, difficulty, ingredients, steps } = req.body;

  const newRecipe = new Recipe({
    name,
    description,
    difficulty,
    ingredients,
    steps,
  });

  newRecipe
    .save()
    .then((savedRecipe) => {
      res.status(201).json(savedRecipe);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//Get with params
fetch_recipes.get("/:id", async (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.json(recipe); // Return the fetched books as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

//Put
fetch_recipes.put("/:id", async (req, res) => {
  const { name, description, difficulty, ingredients, steps } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ msg: "Recipe not found" });

    //Update fields
    recipe.name = name || recipe.name;
    recipe.description = description || recipe.description;
    recipe.difficulty = difficulty || recipe.difficulty;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.steps = steps || recipe.steps;

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Delete
fetch_recipes.delete("/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.deleteOne({ _id: recipeId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Recipe not found" });
      }
      res.status(200).send({ message: "Recipe deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err); // Handle any errors
    });
});

module.exports = fetch_recipes;
