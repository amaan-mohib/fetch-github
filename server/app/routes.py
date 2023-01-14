from flask_cors import CORS
from app import app
from flask import abort, request
import requests

CORS(app)

github_api_base_url = "https://api.github.com"


@app.route("/")
def index():
    return "Hello!"


@app.get("/user/<username>")
def user(username):
    url = f"{github_api_base_url}/users/{username}"
    r = requests.get(url)
    if r.status_code != 200:
        abort(r.status_code)
    data = r.json()
    result = {
        "username": username,
        "name": data["name"],
        "bio": data["bio"],
        "image": data["avatar_url"],
        "url": data["html_url"],
        "location": data["location"],
        "blog": data["blog"],
        "twitter_url": "https://twitter.com/"+data["twitter_username"] if data["twitter_username"] else None,
        "public_repos": data["public_repos"]
    }
    return result


@app.get("/repos/<username>")
def repos(username):
    url = f"{github_api_base_url}/users/{username}/repos"
    args = request.args
    page = args.get("page", default=1, type=int)
    page_size = args.get("page_size", default=10, type=int)
    params = {
        "page": page,
        "per_page": page_size
    }
    r = requests.get(url, params=params)
    if r.status_code != 200:
        abort(r.status_code)
    repos = r.json()
    result = []
    for repo in repos:
        language = repo["language"]
        topics = list(repo["topics"]) if repo["topics"] else []
        result.append({
            "name": repo["name"],
            "description": repo["description"],
            "url": repo["html_url"],
            "topics": topics,
            "language": language,
        })
    return result
