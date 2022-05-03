Cards with Friends - Open Source Cards Against Humanity Clone

Provisioning server (EC2 Instance):

- Download NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
- Install Node: `nvm install --lts`
- Install PM2: `npm install pm2 -g`
- Install TS for PM2: `pm2 install typescript`
- Install Git: `sudo yum install git -y`
- Clone Repo: `git clone https://github.com/mrandypratt/ts-cards.git`
- `npm install` dependencies in both `client` and `server`
- In `server` directory, run `pm2 start index.ts --watch` then `pm2 logs` to get terminal logs