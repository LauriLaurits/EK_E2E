# EK tests Puppeteer/Mocha/Chai/Jest
## Getting Started
First clone the repo, Open terminal and: 
```
git clone https://upitechlaurilaurits@bitbucket.org/upitech/ekaubamaja-e2e.git
```
cd into puppeteer_ek folder and install dependencies
```
npm install
npm install -g puppeteer@^4.0.1 --save-dev
```
Now for building/deleting tests from build folder:
```
npm run build
``` 
```
npm run clean
``` 
For running tests:
```
npm run test:all
npm run test:e2e
npm run test:e2e:guest
npm run test:e2e:customer
npm run test:subscribe
```
