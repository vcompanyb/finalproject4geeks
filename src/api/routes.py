"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    try:
        User.create_user(body["email"], body["password"])
    except:
        raise APIException("Hubo un problema al intentar registrar el usuario", 401)

    return jsonify({}), 200

@api.route("/profile", methods=['GET'])
def profile():
    user = User.get(id)
    return jsonify(user.serialize())