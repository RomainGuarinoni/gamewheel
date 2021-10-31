import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function setCookie(req: NextApiRequest, res: NextApiResponse) {
  switch (req.body.key) {
    case 'theme':
      if (isUserTheme(req.body.value)) {
        return res
          .status(201)
          .setHeader(
            'Set-Cookie',
            cookie.serialize(req.body.key, req.body.value, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              sameSite: 'strict',
              path: '/',
            })
          )
          .json({
            msg: 'Cookie has been set',
            value: req.body.theme,
          });
      } else {
        return res.status(500).json('Wrong cookie value');
      }
    case 'games':
    //do smthing here
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
