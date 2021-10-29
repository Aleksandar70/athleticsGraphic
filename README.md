# Elegra - Athletics Graphics

## Requirements

1. Nodejs `v15.14.0` or later
2. MongoDB `v5.0.1` or later

## Get started

Use [MongDBCompass](https://www.mongodb.com/products/compass) to create and manage database.
Create new connection with the following link: - `mongodb://0.0.0.0:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`

If you just cloned/downloaded the project, run `npm i && cd backend && npm i && cd ..` to install all the needed dependencies.

Additionally, run `npm i --global ts-node nodemon` to install some dependencies globally

### IP Address

As of now, you have to manually change IP address before starting the app.

To find your IP address, open terminal and type `ipconfig` if on Windows (`ifcongif`, on Unix systems) and look for your IPv4 address.

It should look like this `192.168.0.15`. It will always start with `192.168.`, other numbers may differ.

After finding your IP address, there are two places in the code where the currently set IP address has to be changed:

1. `package.json` - Change it for the line `"start": "sirv public --host 192.168.100.2 --no-clear --single"`,
2. `global\constants\api.ts` - Change it for the line `static readonly IPV4 = "192.168.100.2";`

### Running the project

To run the project, run `npm run all` in the terminal. This will start both client and the server.

Navigate to http://192.168.x.xx:5000/ (set your public IP address for the host)

### Streaming graphics

There are three paths to navigate to:

1. http://192.168.x.xx:5000/ - Root path, where all the competition data is presented with actions to send graphics to be displayed.
2. http://192.168.x.xx:5000/preview - Preview page used to display a frame of how the final graphics will look like when shown.
3. http://192.168.x.xx:5000/stream - Page where full graphics with the animations will be displayed.

### Localization

Currently, when you add a new locale for the competition, through the interface in the upper right corner of the header, in order for it to work properly you need to manually add one line of code.

For example, if you added locale with the name `RS`, you need to:

1. Open `src\i18n.ts` file
2. Under `register("default", () => import("../i18n/default.json"));` line, write `register("RS", () => import("../i18n/RS.json"));`

Add the same line every time you add a new locale, just replace `RS` with the new locale name.

## Development

### App

This project is separated into two parts

1. Root of the project represents frontend part, which was built using [Svelte](https://svelte.dev)
2. `backend` folder contains backend part of the project, built using NodeJS

### Linting

Both frontend and backend have their own linting commands to assure code quality.

To run lint, go to either FE or BE directory and run `npm run lint`

To better check `.svelte` files run command `npm run check` in frontend directory.

### Bootstrap v5

https://sveltestrap.js.org/?path=/story/components--get-started

### Time ticker

Sending time as XML data through sockets.
Unzip time-ticker.zip -> npm install -> change `localhost` value to your public IP address -> node index.js

### Test cases

year - competitionID
country = SRB

- 2021 - srbopenindoor
- 2020 - ps-u20
- 2021 - ec21_0640
- 2021 - ps_10km
- 2021 - ps_hod_put
- 2021 - balkan_u18
- 2021 - 2021seniorski-miting

country = NOR

- 2021 - 2021vintersprinten-2021
