import { Database } from '../../utils/database';
import { getSession } from '@auth0/nextjs-auth0';

let db = new Database();

export default async function handler(req, res) {
  
  const session = getSession(req, res);
  
  if (!session.hasOwnProperty('user')) {
    res.status(401).json({ error: 'Unauthorized!' })
    return
  }

  let result = null;

  try{
    await db.connect();
    result = await db.deleteItem(req.body.id)
    await db.disconnect();    
  }
  catch (error) {
    res.status(500).json({ error: error });
    return;
  }

  res.status(200).json(result)
  
}
