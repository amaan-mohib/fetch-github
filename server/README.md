# Backend

## Setup

Install all packages `pip install -r requirements.txt`

## To run the server

Run `python run.py` to start the server.

To run the server in production mode set an environment variable `ENV` as `PROD`

## Paths

- GET `/`
  - the home page for the API
- GET `/user/<username>`
  - to get user details for `username` from GitHub
- GET `/repos/<username>`
  - to get GitHub repositories for `username`

## Running Unit Tests

Run `pytest testing/` to run all the tests

The tests contains:
- PATH `/`
  - should be a successful GET request
  - request with bad HTTP method
- PATH `/user/<username>`
  - should be a successful GET request
  - user with no username
  - user with wrong username
  - request with bad HTTP method
- PATH `/repos/<username>`
  - should be a successful GET request
  - user with no username
  - user with wrong username
  - request with bad HTTP method
