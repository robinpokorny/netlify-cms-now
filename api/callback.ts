import { NowRequest, NowResponse } from "@now/node";
import { create } from "./_lib/oauth2";

const render = (message: "success" | "error", content: Object) => `
<script>
  const receiveMessage = (e) => {
    console.log("receiveMessage %o", e);
  
    window.opener.postMessage(
      "authorization:github:${message}:${JSON.stringify(content)}",
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  
  console.log("Sending message: %o", "github");
  window.opener.postMessage("authorizing:github", "*");
</script>
`;

export default async (req: NowRequest, res: NowResponse) => {
  const oauth2 = create();

  const code = req.query.code as string;

  try {
    const result = await oauth2.authorizationCode.getToken({ code });
    const { token } = oauth2.accessToken.create(result);

    res.status(200).send(
      render("success", {
        token: token.access_token,
        provider: "github"
      })
    );
  } catch (e) {
    res.status(200).send(render("error", e));
  }
};
