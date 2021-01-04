const { Router } = require('express');
const router = Router();
const controller = require('../controllers');

router.get('/', (req, res) => res.send("This is root"))

//users
router.post("/signup", (req, res) => controller.signUp(req,res));
router.post("/signin", (req, res) => controller.signIn(req, res));
router.post("/verifyuser", (req, res) => controller.verifyUser(req, res));
router.get("/categories/:id", (req, res) => controller.getFlashcards(req, res));
router.get('/categories', (req, res) => controller.getCategories(req, res));


module.exports = router
