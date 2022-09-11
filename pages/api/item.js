import { Database } from '../../utils/database';
import { getSession } from '@auth0/nextjs-auth0';



export default async function handler(req, res) {
  let db = new Database();
  const session = getSession(req, res);

  if (!session.hasOwnProperty('user')) {
    res.status(401).json({ error: 'Unauthorized!' })
    return
  }

  let result = null;

  try {
    await db.connect();
    switch (req.method) {
      case 'GET':
        const url = require('url')
        result = await db.getAllItems(url.parse(req.url, true).query.list_id)
        break;
      case 'POST':
        result = await db.addNewItem(req.body.list_id, req.body.itemtext)
        break;
      case 'PUT':
        result = await db.changeItemStatus(req.body.id, req.body.status)
        break;
      case 'DELETE':
        result = await db.deleteItem(req.body.id)
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
