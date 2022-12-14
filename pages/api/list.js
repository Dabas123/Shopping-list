import { Database } from '../../utils/database';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  let db = new Database();
  const session = getSession(req, res);
  const url = require('url')

  /**
   * When the request method is GET must be check API_KEY
   * GET request come from the server side, there is not contain session object in the request
   */
  if (req.method === 'GET') {
    if (url.parse(req.url, true).query.apikey !== process.env.API_KEY) {
      res.status(401).json({ error: 'Unauthorized!' })
    }
  }
  else if (!session.hasOwnProperty('user')) {
    res.status(401).json({ error: 'Unauthorized!' })
    return
  }

  let result = null;

  try {
    await db.connect();
    switch (req.method) {
      case 'GET':
        result = await db.getShoppinglists(url.parse(req.url, true).query.userid)
        break;
      case 'POST':
        result = await db.addNewList(req.body.userid, req.body.title)
        break;
      case 'DELETE':
        result = await db.deleteListItems(req.body.id)
        result = await db.deleteList(req.body.id)
        break;
      default:
        await db.disconnect()
        res.status(400).json({ error: 'Bad request!' })
        return
        break;
    }
    await db.disconnect()
  }
  catch (error) {
    res.status(500).json({ error: error });
    return;
  }

  res.status(200).json(result)

}
