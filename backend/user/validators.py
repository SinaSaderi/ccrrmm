import email
import graphql
from email_validator import validate_email, EmailNotValidError
from user.models import User
from django.contrib.auth.hashers import check_password
import re


def validate_login(input):
    errors = {}

    if input.email.strip() == '':
        errors["email"] = "Email must not be empty"

    if input.password.strip() == '':
        errors["password"] = "Password must not be empty"

    return [errors, len(errors) < 1]


    # try:
    #     user = User.nodes.get(email=input.email)
    # except:
    #     raise graphql.GraphQLError('Wrong credentials')
    # # user = User.nodes.get(email=input.email)
    # if user and check_password(input.password, user.password):
    #     return user
    # else:
    #     raise graphql.GraphQLError('Wrong credentials')


def validate_create_user(input):
    errors = {}

    regex = '^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$'

    try:
        user = User.objects.get(email=input.email)
    except User.DoesNotExist:
        user = None

    if input.email.strip() == '':
        errors["email"] = "Email must not be empty"
    elif (re.search(regex, input.email)) is None:
        errors["email"] = "The email address is not valid"
    elif user:
        errors["email"] = "This email is taken"

    if input.password.strip() == '':
        errors["password"] = "Password must not be empty"
    elif input.password != input.confirm_password:
        errors["confirmPassword"] = "Passwords must match"

    return [errors, len(errors) < 1]