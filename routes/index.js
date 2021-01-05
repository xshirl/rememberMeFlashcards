const { Router } = require('express');
const router = Router();
const controller = require('../controllers');

router.get('/', (req, res) => res.send("This is root"))

//users
router.post("/signup", (req, res) => controller.signUp(req,res));
router.post("/signin", (req, res) => controller.signIn(req, res));
router.post("/verifyuser", (req, res) => controller.verifyUser(req, res));

//categories
router.get('/categories', (req, res) => controller.getCategories(req, res));

//flashcards
router.get("/categories/:category_id/flashcards", (req, res) => controller.getFlashcards(req, res));
router.get("/categories/:category_id/flashcards/:flashcard_id", (req, res) => controller.getFlashcard(req, res));
router.post("/categories/:category_id/flashcards/", (req, res) => controller.createFlashcard(req, res));
router.put("/categories/:category_id/flashcards/flashcard_id", (req, res) => controller.updateFlashcard(req, res));
router.put("/categories/:category_id/flashcards/flashcard_id", (req, res) => controller.deleteFlashcard(req, res));

module.exports = router
