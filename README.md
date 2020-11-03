
# MusiCore

![Team Logo](./logo.png)

MusiCore is a company founded in the music copyright industry. MusiCore aims to discover the most accurate license leads so creators can get their fair share.  View our website [here](https://musicore.herokuapp.com/)

Table of Contents
---

- [People](./team/)
- [Diversity](./team/diversity.md)
- [Product & Research](./product_research/)
    - [Roadmap](./product_research/roadmap.md)
    - [UX Research](./product_research/ux_research.md)
- [Architecture Diagram](#architecture-diagram)
- [Getting Started](#getting-started)
    - [Develop Locally](#develop-locally)
- [Live](#live)
- [Tools](#tools)
    
Architecture Diagram
---
![MusiCore Architecture Diagram](./app/techarchitecture.png)
See our stack on stackshare [here](https://stackshare.io/dcsil/musicore)

## Getting Started

### Develop Locally

First clone this repo:
```
git clone https://github.com/jamal-k/musicore-app
cd musicore
```

Run
```
chmod +x script/bootstrap
script/bootstrap
```
to install requirements, dependencies, set certain environment variables, and setup a local database for this app. If you have issues with the script or are not a MacOSX user we also have a docker-compose script you can use (and all subsequent steps can be run in the container). To run it, ensure you have docker and docker-compose installed from instructions [here](https://docs.docker.com/install/) and then:
```
docker-compose -f app/docker-compose.yml up  -d
```


#### Run Back End
```
cd app/flask_backend
source myenv/bin/activate #not on docker
export predicthq_token=TOKEN
export twitter_token=TOKEN
export REACT_APP_GOOGLE_MAPS_KEY=TOKEN
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/test_musicore #not on docker
python3 app.py #if using docker do flask run --host=0.0.0.0
```
Replace TOKEN with actual tokens requested from our team, otherwise here are the pages for each of the external APIs as a starting point for getting your own token:

[PredictHQ API](https://www.predicthq.com/)

[Twitter API](https://developer.twitter.com/en.html)

[Google Maps API](https://developers.google.com/maps/documentation)

Tests can be run with 
```
cd app/flask_backend
python3 test.py
```

#### Run Front End
```
cd app/front_end
export NODE_PATH=./src
export REACT_APP_BACKEND_URL=http://127.0.0.1:5000/
npm start
```

Tests can be run with
```
cd app/front_end
npm test
```

Both the backend and frontend are set for hot reload.

## Live
In order to view our web application in production, go [here.](https://musicore.herokuapp.com/)
Authentication is not fully setup yet but for the experience you may login with just user:test@gmail.com and password:test

![MusiCore Screenvideo](./app/display.gif)

## Tools

We are using Sentry for tracking errors and LogDNA for tracking logs.

Sentry:
![Sentry Screenshot](./app/sentry.png)
LogDNA:
![LogDNA Screenshot](./app/logdna.png)

## How the team works
* Make Pull Requests for major features 
* Make Issues to keep track of bugs or features  
