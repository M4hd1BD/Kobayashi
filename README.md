[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
![twitter-follow]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/m4hd1bd/Kobayashi">
    <img src="https://static.wikia.nocookie.net/maid-dragon/images/5/52/Kobayashi_5.png/revision/latest?cb=20170315190544" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Kobayashi</h3>

  <p align="center">
    A tournament management Discord bot for Esports team managers
    <br />
    <a href="https://github.com/m4hd1bd/Kobayashi/issues">Report Bug</a>
    ·
    <a href="https://github.com/m4hd1bd/Kobayashi/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#local-installation">Local Installation</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
     <li>
      <a href="#heroku-deployment">Heroku Deployment</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
A Discord bot made specifically for Esports team managers to use on their team server to schedule tournaments. This bot takes all the information regarding a match, formats it and publish it on a channel specified by the managers, it also has the option to tag a role.



### Built With

* [node.js](https://nodejs.org/)
* [discord.js](https://discord.js.org/#/)



<!-- Local Installation -->
## Local Installation

To get a local copy up and running follow these simple steps.

### Prerequisites

1. Make sure you've latest version of `npm` installed
  ```sh
  npm install npm@latest -g
  ```
2. Follow the instruction here to a create a bot application and get your token(It'll be required on step 4): https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/m4hd1bd/Kobayashi.git
   ```
2. Go to project folder
   ```sh
   cd Kobayashi
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Open `.env` file in a text ediotor and fill up the require info (Bot token, Channel ID and Role ID)

6. Start the bot
   ```sh
   node index.js
   ```

<!-- Heroku Deployment -->
## Heroku Deployment
To deploy the bot on Heroku and make sure it is always online follow below instructions

### Prerequisites

1. Create an account on [Heroku](https://signup.heroku.com/login)

3. Follow the instruction here to a create a bot application and get your token(It'll be required on step 3): https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/m4hd1bd/Kobayashi.git
   ```
2. Go to project folder
   ```sh
   cd Kobayashi
   ```
3. Install `heroku cli`
   ```sh
   npm install -g heroku
   ```
4. Login to `heroku`
```sh
heorku login
```
5. Create a `heroku` application and add `heroku` remote
```sh
heroku create
```
6. Deploy the bot on `heroku`
```sh
git push heroku main
```
7. Login to your [Heroku Dashboard](https://dashboard.heroku.com/) and select the applicaton.
8. Go to Resources tab, click one edit button beside `web npm start` and disable it. Then Click on edit button beside `worker npm start` and Enable it.
9. Go to the Settings tab and then Click on `Reveal Config Vars`, add your Bot token as `botToken`, your channel ID as `channelID` and the role you want to mention as `roleID`.
10. Your Bot is now ready, DM me on Discord if you face any problems.

<!-- USAGE EXAMPLES -->
## Usage

List of commands:
1. `!ping` - To check if the Bot is onlilne.
2. `!newtour` - To publish a tournament schedule in a specific channel and mentioning a specific role. Bot will ask you to enter specific informations related to the tournament, use `N/A`  if you doesn't have information on something. Send `cancel` to cancel the ongoing publishing procedure.



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the GNU 3.0. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Mahdi - [@M4hd1BD](https://twitter.com/M4hd1BD) - virtualmahdi@gmail.com





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/M4hd1BD/Kobayashi.svg?style=for-the-badge
[contributors-url]: https://github.com/M4hd1bd/Kobayashi/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/M4hd1bd/Kobayashi.svg?style=for-the-badge
[forks-url]: https://github.com/M4hd1bd/Kobayashi/network/members
[stars-shield]: https://img.shields.io/github/stars/M4hd1bd/Kobayashi.svg?style=for-the-badge
[stars-url]: https://github.com/M4hd1bd/Kobayashi/stargazers
[issues-shield]: https://img.shields.io/github/issues/M4hd1bd/Kobayashi.svg?style=for-the-badge
[issues-url]: https://github.com/M4hd1bd/Kobayashi/issues
[license-shield]: https://img.shields.io/github/license/M4hd1bd/Kobayashi.svg?style=for-the-badge
[license-url]: https://github.com/M4hd1bd/Kobayashi/blob/master/LICENSE.txt
[twitter-follow]: https://img.shields.io/twitter/follow/M4hd1bd?color=Blue&style=for-the-badge