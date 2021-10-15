<p align="center">
  <a href="https://github.com/adisreyaj/sonarqube-sdk">
    <img src="sonarqube.png" alt="Logo" width="333" height="100">
  </a>

  <h3 align="center">SonarQube SDK</h3>
  <p>A simple SDK to work with SonarQube Web APIs</p>
</p>

An easy way to work with [SonarQube Web APIs](https://sonarcloud.io/web_api/). With inbuilt types, it is easier to work with the response and request parameters without having to look into the documentation.

**Disclaimer**: The library is not associated with SonarQube. Its an unofficial SDK.

## Requirements

- Node 12 or above

## Usage

1. Install the package

```sh
npm install sonarqube-sdk
```

2. Initialize the client

```ts
import { Client } from 'sonarqube-sdk';
import { SonarQubeSDKAuthConfig } from 'sonarqube-sdk/interfaces';

// Auth is optional
const options: SonarQubeSDKAuthConfig = {
  url: '',
  auth: { username: '', password: '' },
};
const client = new Client(options);

// Get metrics
const response = await client.measures.component({ component: '', metricKeys: ['bugs', 'code_smells'] });
```

## Roadmap

See the [open issues](https://github.com/adisreyaj/sonarqube-sdk/issues) for a list of proposed features (and known issues).

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Show your support

Please ⭐️ this repository if this project helped you!
