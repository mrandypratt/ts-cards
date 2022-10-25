# Cards with Friends - Open Source Cards Against Humanity Clone

## Development:

### Local Setup
  - In `server` directory, create `.env` file and add the code below with the credentials inserted:
  ```javascript 
    MONGO_URI="mongodb+srv://apratt:wsNYuMpnGCvNmLTo@cardswithfriendsinstanc.k9ksw.mongodb.net/"
    PORT="8787"
    NODE_ENV="dev"
  ```
  - In root directory, run `npm run setup` to install all dependencies with npm for client and server

### Run App in Dev
  - `npm run dev` from root will run react dev and server with concurrently

## Testing
**All new features should be tested using test server before being pushed to production**
First Provision/Update Server, then build and test client
### Server
  - Instructions At Bottom: Server setup same in Test and Prod with the following exception:
    - `git fetch origin branch-name` and switch to branch
      - `git pull origin branch-name` also works, but all changes from feature branch will be automatically merged locally to `main`
    - In Test, ensure `ecosystem.config.js` only has `"NODE_ENV": "test",`
    - Use feature branch to test before merging feature branch to `main`
### Client
  - Test Server is stopped between feature deployments. Restarting the EC2 Instance will create a new URL.
    - In `client/src/data/functions/getURL.ts`, update the `"test"` URL with the new IP Address from the running instance.

  - `npm run predeploy-test` will build and set env variable to `"test"`
  - `serve -s build` will test locally (with test server & db)
## Production
### Client
  - `npm run predeploy` will build and set env variable to `"prod"`
  - `serve -s build` will test locally (with production server & db)
  - `npm run deploy` will push changes to S3
  - Invalidate Cache in AWS Cloudfront for CardsWithFriends

### Server
  - Instructions At Bottom: Server setup same in Test and Prod with the following exception:
    - In Prod, ensure `ecosystem.config.js` only has `"NODE_ENV": "prod",`
## Provisioning server (EC2 Instance):
**Server needs to be provisioned for both Test Server and Production Server**
- In AWS, create EC2 instance with Amazon Linux 2
  - Elastic IP attached for Production Server
  - Allow traffic
- SSH or Connect in AWS Console to Terminal
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
        // Insert Username & Password to Connection String
        "MONGO_URI": "mongodb+srv://{username}:{DBPassword}@cardswithfriendsinstanc.k9ksw.mongodb.net/",
        "PORT": "8787",
        // For Production
        "NODE_ENV": "prod",
        // For Testing
        "NODE_ENV": "test",
    }
  }]
}
```

  ## Updating Provisioned Server
  - push code to github
  - SSH into EC2 instance to pull code and restart
  - `pm2 kill` to stop server
  - `npm run setup` from root to install any new dependencies
  - In `server` directory, run `npm run prod` to execure package.json script to start pm2
  - `pm2 logs` to see all logs
