# COVID-19-Tracker

**Team**

[_Matt Mead_](https://www.linkedin.com/in/mattmeadmpls/)

[_Emilio Bello_](https://www.linkedin.com/in/emilio-bello-09938760/)

[_Allan Hunt_](https://www.linkedin.com/in/allanrhunt/)

**Project Description** 

US COVID-19 Tracker - COVID-19 is an ongoing pandemic that is affecting the entire world. The data behind this virus, which is vast, is an important tool we can use to fight against it. This site is a project created by a team of University of Minnesota Data Analytics & Visualization Boot Camp students to visualize the data and make it easier to understand.

For a live version of the tracker Click [HERE](https://mmeadx.github.io/covid19_tracker/)

See below instructions for DATA SETUP & SITE LAUNCH

**Tools Used**

_Postgres SQL_

_Python_

_Flask Server_

_javaScript_

_HTML & CSS_

_Leaflet_

_jupyter notebook_

# DATA SETUP & SITE LAUNCH: 

1. Open config.py file, input your own Postgres password, and save.
2. Open static/js/config.js file, input your own Leaflet password, and save.
3. Launch Postgres server and create a database named "covid19-db"
4. In the covid19-db, open a Query Tool and run the 'covid_sql.sql' file
5. In a terminal window, type 'source activate NewPythonData' and then 'jupyter notebook'
6. In the 'TimeSeries' jupyter notebook click Kernel > Restart & Run All
7. Back in Postgres - go to covid19_db > Schemas > Tables

    a) Right click on covid_data > Properties > Columns > In the 'state' row turn Primary key? to Yes

    b) Right click on covid_hist > Properties > Columns > In the 'date' row turn Primary key? to Yes

    c) Right click on covid_rolling > Properties > Columns > In the 'index' row turn Primary key? to Yes
    
8. In a new Terminal Window, type 'source activate NewPythonData' and then 'python app.py' to run Flask Server
9. In a Chrome Browser window, go to http://127.0.0.1:5000/index.html

