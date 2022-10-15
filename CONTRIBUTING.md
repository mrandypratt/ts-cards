# Cards with Friends - Open Source Cards Against Humanity Clone

## Development:

### Local Setup
  - Create `.env` file and add the code below with the credentials inserted:
    - ```MONGO_URI="mongodb+srv://{user}:{password}@cardswithfriendsinstanc.k9ksw.mongodb.net/CardsWithFriendsTest?retryWrites=true&w=majority"```
  - `npm run setup` install all dependencies with npm for client and server

### Run app in Development
  - `npm run dev` from root will run react dev and server with concurrently

## Production

### Client
  - `npm run predeploy` will build and set env variable to "prod"
  - `server -s build` will test locally (with production server)
  - `npm run deploy` will push changes to S3
  - Invalidate Cache in AWS Cloudfront for CardsWithFriends

### Server
#### Provisioning server (EC2 Instance):
- Download NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
- Install Node: `nvm i --lts`
- Install Git: `sudo yum install git -y`
- Clone Repo: `git clone https://github.com/mrandypratt/ts-cards.git`
- `npm run setup` from root installs dependencies in both `client` and `server`
- Install PM2: `npm i pm2 -g`
- Install TS for PM2: `pm2 install typescript`
- MongoDB Setup:
  - In `server` directory, run `pm2 init simple`
  - `vim ecosystem.config.js` and edit file as follows:

  ```javascript
    module.exports = {
      apps : [{
        name   : "CardsWithFriendsGame",
        script : "./index.ts",
        watch: true,
        env: {
            "MONGO_URI": "mongodb+srv://{username}:{DBPassword}@cardswithfriendsinstanc.k9ksw.mongodb.net/{DB_Name}?retryWrites=true&w=majority",
            "NODE_ENV": "prod",
        }
      }]
    }
  ```

  #### Push Changes to Server (already setup)
  - push code to github
  - SSH into EC2 instance to pull code and restart
  - `pm2 kill` to stop server
  - `npm run setup` from root to install any new dependencies
  - `cd server`
  - `npm run prod` to execure package.json script to start pm2
  - `pm2 logs` to see all logs