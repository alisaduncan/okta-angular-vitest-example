# Angular Vitest Example

**Prerequisites**

* Node 18 or greater
* Okta CLI
* Angular CLI
* Your favorite IDE
* A web browser with good debugging capabilities
* Terminal window

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example, run the following commands:

```bash
git clone https://github.com/oktadev/okta-angular-standalone-runtime-config-example.git
cd okta-angular-standalone-runtime-config-example
npm ci
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI.

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **2: SPA**
- Redirect URI: `http://localhost:4200/login/callback`
- Logout Redirect URI: `http://localhost:4200`

The application configuration will be printed to your screen:

```shell
Okta application configuration:
Issuer:    https://<OKTA_DOMAIN>.okta.com/oauth2/default
Client ID: <CLIENT_ID>
```

Update `src/api/config.json` with your Okta settings.

```json
{
    "issuer": "https://{yourOktaDomain}/oauth2/default",
    "clientId": "{yourClientId}"
}
```

Start the app by running

```shell
npm start
```

## Run Tests

Projects are incomplete without unit tests. Run the unit tests in this project by using the following command line operation

```shell
npm run test
```

Open up `*.spec.ts` files to see examples of how to mock Okta libraries for isolated unit testing.

## Links

This example uses the following open source libraries from Okta:

* [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js)
* [Okta Angular SDK](https://github.com/okta/okta-angular)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

