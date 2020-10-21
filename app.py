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
table_bystate = base.classes.covid_data
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
        dict["death_incr"] = death_increase
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

@app.route("/covid_data")
def QueryCovidData():

    session = Session(engine)
    results = session.query(table_bystate.date, table_bystate.state, table_bystate.state_abbr, table_bystate.population, table_bystate.positive, table_bystate.positive_increase, table_bystate.death, table_bystate.death_increase, table_bystate.hospitalized_currently, table_bystate.hospitalized_increase, table_bystate.hospitalized_cumulative, table_bystate.in_icu_currently, table_bystate.in_icu_cumulative, table_bystate.on_ventilator_currently, table_bystate.on_ventilator_cumulative, table_bystate.data_quality_grade, table_bystate.positive_per_100k, table_bystate.death_per_100k)
    session.close()

    coviddata = []
    for date, state, state_abbr, population, positive, positive_increase, death, death_increase, hospitalized_currently, hospitalized_increase, hospitalized_cumulative, in_icu_currently, in_icu_cumulative, on_ventilator_currently, on_ventilator_cumulative, data_quality_grade, positive_per_100k, death_per_100k in results:
        dict = {}
        dict["date"] = date
        dict["state"] = state
        dict["state_abbr"] = state_abbr
        dict["population"] = population
        dict["positive"] = positive
        dict["positive_increase"] = positive_increase
        dict["death"] = death
        dict["death_increase"] = death_increase
        dict["hospitalized_currently"] = hospitalized_currently
        dict["hospitalized_increase"] = hospitalized_increase
        dict["hospitalized_cumulative"] = hospitalized_cumulative
        dict["in_icu_currently"] = in_icu_currently
        dict["in_icu_cumulative"] = in_icu_cumulative
        dict["on_ventilator_currently"] = on_ventilator_currently
        dict["on_ventilator_cumulative"] = on_ventilator_cumulative
        dict["data_quality_grade"] = data_quality_grade
        dict["positive_per_100k"] = positive_per_100k
        dict["death_per_100k"] = death_per_100k
        coviddata.append(dict)

    return jsonify(coviddata)

# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)