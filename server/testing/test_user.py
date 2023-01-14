import pytest
from flask.testing import FlaskClient
from app import app


@pytest.fixture
def client():
    return app.test_client()


def test_user(client: FlaskClient):
    """should be a successful GET request"""
    resp = client.get('/user/amaan-mohib')
    assert resp.status_code == 200
    assert isinstance(resp.json, dict)
    assert resp.json.get('username', 'amaan-mohib')


def test_user_no_username(client: FlaskClient):
    """should return NotFound"""
    resp = client.get('/user/')
    assert resp.status_code == 404


def test_user_wrong_username(client: FlaskClient):
    """should return NotFound"""
    resp = client.get('/user/:x:')
    assert resp.status_code == 404


def test_user_bad_http_method(client: FlaskClient):
    """should return a Method Not Allowed response"""
    resp = client.post('/user/amaan-mohib')
    assert resp.status_code == 405
