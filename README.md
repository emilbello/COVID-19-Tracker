# COVID-19-Tracker
US COVID-19 Tracker - COVID-19 is an ongoing pandemic that is affecting the entire world. The data behind this virus, which is vast and plenty, is an important tool we can use to fight against it. This site is a project created by a team of students to visualize the data and make it easier to understand.

DATA SETUP & SITE LAUNCH:

1. Open config.py file, input your own Postgres password, and save.
2. Open static/js/config.js file, input your own Leaflet password, and save.
3. Launch Postgres server and create a database named "covid19-db"
4. In the covid19-db, open a Query Tool and run the 'covid_sql.sql' file
5. In a terminal window, type 'source activate NewPythonData' and then 'jupyter notebook'
6. In the 'TimeSeries' jupyter notebook click Kernel > Restart & Run All
7. In a new Terminal Window, type 'source activate NewPythonData' and then 'python app.py' to run Flask Server
8. In a Chrome Browser window, go to http://127.0.0.1:5000/index.html

