# Cards with Friends - Open Source Cards Against Humanity Clone

## Development:

### Local Setup
  - `npm run setup` install all dependencies with npm for client and server

### Run app in Development
  - `npm run dev` from root will run react dev and server with concurrently

## Deployment

### Client
  - `npm run predeploy` will build and set env variable to "prod"
  - `npm run deploy`

### Server
  - push code to github
  - SSH into EC2 instance to pull code and restart
  - `pm2 kill` to stop server
  - `npm run setup` from root to install any new dependencies
  - `pm2 start ./index.ts --watch`
  - `pm2 logs`

## Provisioning server (EC2 Instance):
- Download NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
- Install Node: `nvm install --lts`
- Install PM2: `npm install pm2 -g`
- Install TS for PM2: `pm2 install typescript`
- Install Git: `sudo yum install git -y`
- Clone Repo: `git clone https://github.com/mrandypratt/ts-cards.git`
- `npm run setup` from root installs dependencies in both `client` and `server`
- In `server` directory, run `pm2 start index.ts --watch` then `pm2 logs` to get terminal logs