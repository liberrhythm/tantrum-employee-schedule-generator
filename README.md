# Tantrum Employee Schedule Generator

TESG is a React + Django web application that automatically generates employee schedules for Tantrum Sunless Tanning, replacing the current manual method used by the company's general manager. The application implements a calendar user interface that is color coded and divided by both location and department, storage and viewing of past schedules, and different account accesses and privileges based on user type (management or employee).

## To Run Locally
  * Clone the repository by running `git clone https://github.com/liberrhythm/tantrum-employee-schedule-generator.git`

### To Start Backend Server
  * Move into the repository by calling `cd tantrum-employee-schedule-generator` from where you cloned the repository.
  * If you do not have Python installed, install Python 3.7.0.
  * Run `pip install pipenv`, `pipenv shell`, and `pipenv install django` to activate the existing virtual environment and install django.
  * Move into the backend folder using `cd backend`.
  * Start the backend server using `python manage.py runserver`.
  * To ensure that the backend server is running, visit [`localhost:8000`](http://localhost:8000).

### To Start Frontend
  * Move into the frontend folder using `cd frontend`.
  * Install project dependencies using `yarn install`.
  * Start the frontend using `yarn start`.
  * The command line should automatically open a browser tab at [`localhost:3000`](http://localhost:3000). If it does not, you can manually type the address in.
  * Currently, the application allows you to create, read, update, and delete employees. Feel free to play around and find any potential bugs!
