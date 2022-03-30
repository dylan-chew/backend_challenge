# Backend Challenge

Foobar is a Python library for dealing with word pluralization.

## How To Run

First install the dependencies:

```bash
npm install
```

To run the backend endpoint in docker which is reachable at localhost:3000/vehicles:

```bash
docker-compose up -d backend-service
```

Next to start the cron fetch job:

```bash
docker-compose up -d fetch-job
```

*Note: the cron is set to run at midnight by default. See comments in cron-fetch-vehicles.js to run on startup.*
