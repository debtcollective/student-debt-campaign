# Student Debt Campaign

Website for our student debt campaign. The application has been bootstraped with [gatsby-starter-netlify-cms](https://github.com/netlify-templates/gatsby-starter-netlify-cms) head over that project for further overview of the project base.

## DEVELOPMENT

Make sure to `cp .env.example .env.development` so you have all the environment variables available for the project to run properly.

To install dependencies

```bash
yarn
```

Now you need to run the [campaign-api](https://github.com/debtcollective/campaign-api), once the the campaign api is running, run the following command to start to contribute

```bash
yarn develop
```

> **NOTE:** Make sure to use domains to allow proper work with the SSO. Therefore, while developing go to <http://campaign.lvh.me:8000/>

## CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing, probably you want to check the [contributing page](CONTRIBUTING.md).
