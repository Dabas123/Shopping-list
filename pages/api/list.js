import { Database } from '../../utils/database';

let db = new Database();
let _res = null;
let _req = null;

export default async function handler(req, res) {
  _res = res;
  _req = req;
   
  if (!((req.body.hasOwnProperty('apikey')) && (req.body.apikey === process.env.API_KEY))) {
    _res.status(401).json({ error: 'Invalid API key!' })
    return
  }

  if (!req.body.hasOwnProperty('userid')) {
    _res.status(400).json({ error: 'Bad request!' })
    return
  }

  let result = null;

  try{
    await db.connect();
    result = await db.getShoppinglists(req.body.userid)
    await db.disconnect();    
  }
  catch (error) {
    _res.status(500).json({ error: error });
    return;
  }

  _res.status(200).json(result)
  
}
