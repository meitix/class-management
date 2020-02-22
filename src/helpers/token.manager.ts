import { resolve } from 'path';
import { sign } from 'jsonwebtoken';
import * as jwt_decode from 'jwt-decode';
import { readFileSync } from 'fs';
import expressJWT = require('express-jwt');

class TokenManager {
  private secretKey: string;

  constructor() {
    // read secret key from config.
    this.secretKey = readFileSync(
      resolve( __dirname, '../config/settings/jwt-secret.key')
    ).toString();
  }

  // generate the token.
  generate(data: any) {
    return sign(data, this.secretKey, {
      expiresIn: Math.floor(Date.now() / 1000) * 60 * 60
    });
  }

  // make verify middleware.
  getVerifyMiddleware() {
    return expressJWT({
      secret: this.secretKey,
      credentialsRequired: false
    });
  }

  decodeToken(token) {
    const decoded = jwt_decode(token);
    return decoded;
  }
}

export default new TokenManager();
