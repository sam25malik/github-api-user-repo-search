var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT  || 6379;

const client = redis.createClient(REDIS_PORT);


/*get the searched data*/
async function getData(req, res, next) {
  try {
  	let search = req.query.search;
  	let type = req.query.type;
    const response = await fetch('https://api.github.com/search/'+type+'?q='+search);
    const data = await response.json();
    // Set data to Redis
    const key = type+'/'+search;
    client.setex(key, 3600, JSON.stringify(data));
    console.log('data',data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

/*Gets the cached data*/
function cache(req, res, next) {
  let search = req.query.search;
  let type = req.query.type;
  const key = type+'/'+search;
    
  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      console.log('cache, data',data);
      res.send(data);
    } else {
      next();
    }
  });
}

// Routes
/**
 * @swagger
 * /api/search:
 *    get:
 *      description: Receives a POST request with search type(users or repositories or issues) & search text(mandatory)
 *      The results will be fetched from the GitHub API & cache it for atleast 2 hours.
 *    parameters:
 *      - search: Typed string
 *        type: User or Repo
 *        schema:
 *          search: string
 *          type: string
 *    responses:
 *      '200':
 *        description: Returns the Data
 */
router.get('/search', cache, getData);

/**
 * @swagger
 * /api/clear-cache:
 *  get:
 *    description: Use to Clear the cache data
 *    responses:
 *      '200':
 *        description: Cache Cleared
 */
router.get('/clear-cache', function(req, res, next) {
  console.log('clear-cache');
  client.flushall();
  res.send('cache cleared');
});



module.exports = router;


