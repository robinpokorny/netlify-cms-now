import { NowRequest, NowResponse } from "@now/node";
import { create, randomString } from "./_lib/oauth2";

export default (req: NowRequest, res: NowResponse) => {
  const oauth2 = create();

  const { host } = req.headers;

  console.log(host);

  const url = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${host}/api/callback`,
    scope: `repo,user`,
    state: randomString()
  });

  res.writeHead(301, { Location: url });
  res.end();
};
