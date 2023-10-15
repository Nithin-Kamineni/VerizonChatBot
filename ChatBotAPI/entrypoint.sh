#!/bin/sh

python DjangoAPI/manage.py migrate --no-input
python DjangoAPI/manage.py collectstatic --no-input
# python DjangoAPI/manage.py runserver 0.0.0.0:8000
# gunicorn DjangoAPI.wsgi:application --bind 0.0.0.0:8000
gunicorn -w 2 -b 0.0.0.0:8000 --chdir /code/DjangoAPI DjangoAPI.wsgi