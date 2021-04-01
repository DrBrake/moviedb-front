## MovieDB (frontend)

## Setup
Clone this and the backend into the same folder (https://github.com/DrBrake/moviedb-back)

Follow the backend setup

Install dependencies
``` bash
npm install
```

## Run
If MongoDB instance is running, close it.

Dev
``` bash
npm run all-dev
```
Prod
``` bash
npm run all
```

## Images
To get images to appear place them in the backend public/images subfolders. Getting images is based on the movie or actor name.

Cover images should be in the style of a spread out DVD cover (800x536px). Otherwise some views will look funky.