import jwt
from django.conf import settings
import time

def generate_token(user):
    token = jwt.encode({"uid": user.id, "firstName": user.first_name, "lastName": user.last_name, "email": user.email, "exp": time.time() + 360*60}, settings.SECRET_KEY, algorithm="HS256")
    print("token", token)
    return token

def verify_token(token):
    return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])