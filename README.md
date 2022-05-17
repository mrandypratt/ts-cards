Cards with Friends - Open Source Cards Against Humanity Clone

Development:

- setting up project
  - `npm run setup` install all dependencies with npm for client and server
- development
  - `npm run dev` from root will run react dev and server with concurrently
- deploying (from client directory)
  - `npm run predeploy` will build and set env variable to "prod"
  - `npm run deploy`
- deploying (from server directory)
  - push code to github
  - SSH into EC2 instance to pull code and restart

Provisioning server (EC2 Instance):

- Download NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
- Install Node: `nvm install --lts`
- Install PM2: `npm install pm2 -g`
- Install TS for PM2: `pm2 install typescript`
- Install Git: `sudo yum install git -y`
- Clone Repo: `git clone https://github.com/mrandypratt/ts-cards.git`
- `npm run setup` from root installs dependencies in both `client` and `server`
- In `server` directory, run `pm2 start index.ts --watch` then `pm2 logs` to get terminal logs