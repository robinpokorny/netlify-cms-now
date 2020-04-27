<p align="right"><a href="https://github.com/robinpokorny/netlify-cms-now">robinpokorny/netlify-cms-now</a></p>

# Netlify CMS on ▲ ~~Now~~ Vercel
> Use [Netlify CMS](https://www.netlifycms.org/) with GitHub backend for sites hosted on [▲ ~~Now~~ Vercel](https://vercel.com/)

[![github][gh-image]][gh-url]
[![license][license-image]][license-url]
[![git3moji][git3moji-image]][git3moji-url]
![typescript][ts-image]
[![buy-me-a-coffee][coffee-image]][coffee-url]

A simple OAuth2 serverless gateway for Netlify CMS with GitHub written in TypeScript.

## Why do I need this?

If you would like to use Netlify CMS to manage your site deployed to Vercel with GitHub as the site's repository.

GitHub requires a server for authentication and Netlify provides this server only for sites deployed to it. Fortunately, such server is rather small and can work with Vercel's serverless functions.

## Usage

### 1. Fork this project or copy files to an existing one
The most important files and folders are: `admin/`, `api/`, `.env`, `now.json`, `package.json`. The rest depends on your static generator. We use `blog/` and `img/` for demo only.

Register this project to Vercel.

**Important**: The actual deployment will fail, we will fix it in the following steps.

### 2. Decide on the production domain
Authentication will work correctly only on the production domain, it will not work on development preview URLs. For this repo, the URL is `netlify-cms-now.now.sh`, but it could be any domain that Now supports, even custom domain. In the following `<domain>` represents your selected domain.

### 3. Configure Netlify CMS
Open `admin/config.yml` file. Here we need to update two fields:

* Set `repo` to your GitHub repo that contains the source code of your site.
* Set `base_url` to the production domain with HTTPS protocol, for example, `https://netlify-cms-now.now.sh`.

You will need to change the rest of the configuration to match your repo structure. See [Netlify CMS docs]() for more details. This can be done later.

### 4. Create a GitHub App
On GitHub go to *Settings > Developer settings > GitHub Apps > New GitHub App* ([direct link](https://github.com/settings/apps/new)).

Fill in any name and any homepage URL. The important field is *User authorization callback URL*, input `https://<domain>/api/callback`, where `<domain>` is domain from step 2, also note that HTTPS is required.

Under *Repository permissions* set *Contents* to ‘Read & Write’.

At the very bottom is a section called *Where can this GitHub App be installed?*. If you will be the only user, leave the default options. If there will be more contributors select ‘Any account’.

Click on *Create GitHub App* button.

On the next page, you should see *Client ID* and *Client secret*. We will use in the next step.

**Note:** You might need to install the app to your account. Click on *Install App* in the right menu and install it to your account. This step will probably land on the specified callback URL which either is not yet deployed or is it blank. That's OK, you can navigate back to GitHub and ensure the app was installed.

### 5. Set environment secrets
Using Now CLI set the two secrets:

```bash
now secrets add oauth-client-id <client-id-of-GitHub-App>
now secrets add oauth-client-secret <client-secret-of-GitHub-App>
```

### 6. Deploy your website
Either run `now --prod` or use the GitHub integration to deploy your project to the production domain.

Navigate to `https://<domain>/admin` and click on *Login with GitHub*. The first time you log in, you need to authorise your GitHub App. Make sure you give permissions to the right repo.

After successful authentication, you should be redirected back to Netlify CMS interface.

### 7. Enjoy! 🎉


_In case of questions please file an [issue][new-issue]._


## Links

* [Netlify CMS](https://www.netlifycms.org/)
* [Configuring GitHub Backend](https://www.netlifycms.org/docs/authentication-backends/#github-backend) in Netlify CMS docs
* [Secrets in Vercel](https://vercel.com/docs/v2/build-step#environment-variables), 

## Release History

* v1.0.0 – 2020-03-02
    * Initial release

## Attribution

This project is inspired by:

* [vencax/netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider) (Express.js)
* [marksteele/netlify-serverless-oauth2-backend](https://github.com/marksteele/netlify-serverless-oauth2-backend) (AWS Lambda)


## Meta

Robin Pokorny – [@robinpokorny](https://twitter.com/robinpokorny) – me@robinpokorny.com

Distributed under the MIT license. See [LICENSE][license-url] for more information.

[https://github.com/robinpokorny/netlify-cms-now](https://github.com/robinpokorny/netlify-cms-now)


<!-- Markdown link & img dfn's -->
[gh-image]: https://img.shields.io/badge/robinpokorny-netlify--cms--now-lightgrey?style=flat-square&logo=github
[gh-url]: https://github.com/robinpokorny/netlify-cms-now/
[license-image]: https://img.shields.io/github/license/robinpokorny/netlify-cms-now?style=flat-square
[license-url]: https://github.com/robinpokorny/netlify-cms-now/blob/master/LICENSE
[git3moji-image]: https://img.shields.io/badge/git3moji-%E2%9A%A1%EF%B8%8F%F0%9F%90%9B%F0%9F%93%BA%F0%9F%91%AE%F0%9F%94%A4-fffad8.svg?style=flat-square
[git3moji-url]: https://robinpokorny.github.io/git3moji/
[ts-image]: https://img.shields.io/badge/types-TypeScript-blue?style=flat-square
[coffee-url]: https://www.buymeacoffee.com/robinpokorny
[coffee-image]: https://img.shields.io/badge/%20-Buy%20me%20a%20coffee-FF813F?style=flat-square&logo=buy-me-a-coffee&labelColor=FF813F&logoColor=white
[new-issue]: https://github.com/robinpokorny/netlify-cms-now/issues/new

<!--
Generate HTML version from this file with https://github.com/joeyespo/grip:
grip README.md --export index.html --title "Netlify CMS on ▲ Vercel (Now)"
-->
