const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM "item";`
    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all items', err);
            res.sendStatus(500)
        })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // this is what i want my obj to look like {description: "blah blah", image_id: 2, user_id: 2 }
 const newItem = req.body;
  console.log('this is our newItem!!:', newItem);
  const queryText = `INSERT INTO "item" (description, image_url, user_id) VALUES ($1, $2, $3)`;
  pool.query(queryText, [newItem.description, newItem.image_url, newItem.user_id])
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing SELECT item query', err);
      res.sendStatus(500);
    });
});



/**
 * Delete an item if it's something the logged in user added
 */
// router.delete('/:id', (req, res) => {
//   // endpoint functionality
// });

router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM item WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT item query', err);
      res.sendStatus(500);
    });
});




// STRETCH GOALS
/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
