import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function setCookie(req: NextApiRequest, res: NextApiResponse) {
  switch (req.body.key) {
    case 'theme':
      if (isUserTheme(req.body.value)) {
        setResponseCookie(res, req.body.key, req.body.value);
      } else {
        return res.status(500).json('Wrong cookie value');
      }
    case 'games':
      setResponseCookie(res, req.body.key, JSON.stringify(req.body.value));
    default:
      return res
        .status(404)
        .json('No cookie is find for this key : ' + req.body.key);
  }
}

function isUserTheme(input: string) {
  if (input === 'dark' || input === 'light') {
    return true;
  } else {
    return false;
  }
}

function setResponseCookie(res: NextApiResponse, key: string, value: any) {
  return res
    .status(200)
    .setHeader(
      'Set-Cookie',
      cookie.serialize(key, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
      })
    )
    .json({
      msg: 'Cookie has been set',
      key: key,
    });
}
