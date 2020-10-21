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
table_hist = base.classes.covid_hist
table = base.classes.covid_rolling

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching


# DEFINE APP ROUTES TO SPECIFIC PAGES

@app.route("/index.html")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''
     # Open a session, run the query, and then close the session again

    webpage = render_template("index.html")

    return webpage 

@app.route("/maps.html")
def MapsRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''
     # Open a session, run the query, and then close the session again

    webpage = render_template("maps.html")

    return webpage

@app.route("/numbers.html")
def NumbersRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''
     # Open a session, run the query, and then close the session again

    webpage = render_template("numbers.html")

    return webpage

@app.route("/charts.html")
def ChartsRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''
     # Open a session, run the query, and then close the session again

    webpage = render_template("charts.html")

    return webpage

@app.route("/team.html")
def TeamRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''
     # Open a session, run the query, and then close the session again

    webpage = render_template("team.html")

    return webpage 

@app.route("/overview.html")
def OverviewRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''
     # Open a session, run the query, and then close the session again

    webpage = render_template("overview.html")

    return webpage 


# DEFINE APP ROUTES TO QUERY SPECIFIC DATA

@app.route("/covidhistory")
def QueryCovidHist():
    ''' Querty the database for Covid History of US and return the results as JSON '''

    session = Session(engine)
    results = session.query(table_hist.date, table_hist.death_increase, table_hist.death, table_hist.positive, table_hist.negative, table_hist.hospitalized_currently, table_hist.on_ventilator_currently)
    session.close()

    hist = []
    for date, death_increase, death, positive, negative, hospitalized_currently, on_ventilator_currently in results:
        dict = {}
        dict["date"] = date
        dict["value"] = death_increase
        dict["all_death"] = death
        dict["total_pos"] = positive 
        dict["total_neg"] = negative 
        dict["hospitalized_current"] = hospitalized_currently
        dict["on_ventilator_currently"] = on_ventilator_currently
        hist.append(dict)

    return jsonify(hist)


@app.route("/rollingavg")
def QueryRollingAvg():
    ''' Querty the database for Covid Rolling Avg of US and return the results as JSON '''

    session = Session(engine)
    results = session.query(table.state, table.date, table.positive_rolling_avg)
    session.close()

    rolling = []
    for state, date, positive_rolling_avg in results:
        dict = {}
        dict["state"] = state
        dict["date"] = date
        dict["positive_rolling_avg"] = positive_rolling_avg
        rolling.append(dict)

    return jsonify(rolling)

# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)