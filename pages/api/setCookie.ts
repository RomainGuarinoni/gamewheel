import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function setCookie(req: NextApiRequest, res: NextApiResponse) {
  if (true) {
    return res
      .status(201)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('theme', req.body.theme, {
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
}

function isUserTheme(input: string) {
  if (input === 'dark' || input === 'light') {
    return true;
  } else {
    return false;
  }
}
