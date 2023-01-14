from urllib.parse import urlparse
import pytest
from flask.testing import FlaskClient
from app import app


@pytest.fixture
def client():
    return app.test_client()


def test_repos(client: FlaskClient):
    """should be a successful GET request"""
    resp = client.get('/repos/amaan-mohib')
    assert resp.status_code == 200
    assert isinstance(resp.json, list)
    if len(resp.json) > 0:
        res = urlparse(resp.json[0]["url"])
        assert res.geturl() == resp.json[0]["url"]


def test_repos_no_username(client: FlaskClient):
    """should return NotFound"""
    resp = client.get('/repos/')
    assert resp.status_code == 404


def test_repos_wrong_username(client: FlaskClient):
    """should return NotFound"""
    resp = client.get('/repos/:x:')
    assert resp.status_code == 404


def test_repos_bad_http_method(client: FlaskClient):
    """should return a Method Not Allowed response"""
    resp = client.post('/repos/amaan-mohib')
    assert resp.status_code == 405
