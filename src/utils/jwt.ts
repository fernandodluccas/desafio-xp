import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

function encrypt(payload: JwtPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '15m',
  });
}

export { encrypt };
