const { CMS_URL } = process.env;
import { fetchJson } from '../../lib/api';

async function handlerUser(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const user = await fetchJson(`${CMS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json({ id: user.id, name: user.username });
  } catch (error) {
    res.status(401).end();
  }
}

export default handlerUser;
