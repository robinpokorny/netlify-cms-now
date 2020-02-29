import simpleOauthModule from "simple-oauth2";
import crypto from "crypto";

export const create = () =>
  simpleOauthModule.create({
    client: {
      id: process.env.OAUTH_CLIENT_ID,
      secret: process.env.OAUTH_CLIENT_SECRET
    },
    auth: {
      tokenHost: `https://github.com`,
      tokenPath: `/login/oauth/access_token`,
      authorizePath: `/login/oauth/authorize`
    }
  });

export const randomString = () => crypto.randomBytes(8).toString(`hex`);
