# creating venv
python -m venv chatbotverizon1

# to get into virtual env
.\chatbotverizon1\Scripts\activate

pip install -r requirements.txt

cd Djangoapi

python manage.py runserver

pip freeze > requirements.txt