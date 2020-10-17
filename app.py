# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Import username and password 
from config import password

# Define the database connection parameters
username = 'postgres'  # Ideally this would come from config.py (or similar)
password = password  # Ideally this would come from config.py (or similar)
database_name = 'covid19_db' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
table_all = base.classes.covid_data
table_hist = base.classes.covid_hist

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''
     # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table_hist.date, table_hist.death_increase).all()
    session.close()

    calendar = []
    for date, death_increase in results:
        dict = {}
        dict["day"] = date
        dict["value"] = death_increase
        calendar.append(dict)

    return jsonify(calendar)


# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)