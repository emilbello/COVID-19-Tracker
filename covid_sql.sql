CREATE TABLE covid_data (
    date date,
    state TEXT PRIMARY KEY,
    state_abbr TEXT,
    population INT,
    positive FLOAT,
    positive_increase INT,
    death FLOAT,
    death_increase INT,
    hospitalized_currently FLOAT,
    hospitalized_increase INT,
    hospitalized_cumulative FLOAT,
    in_icu_currently FLOAT,
    in_icu_cumulative FLOAT,
    on_ventilator_currently FLOAT,
    on_ventilator_cumulative FLOAT,
    data_quality_grade TEXT,
    positive_per_100k FLOAT,
    death_per_100k FLOAT
);

CREATE TABLE covid_hist (
    date date PRIMARY KEY,
    positive INT,
    negative INT,
    death FLOAT,
    death_increase INT,
    hospitalized_currently FLOAT,
    on_ventilator_currently FLOAT
);

CREATE TABLE covid_rolling (
    index INT PRIMARY KEY,
    state TEXT,
    date date,
    positive FLOAT,
    positive_increase INT,
    death FLOAT,
    death_increase INT,
    positive_rolling_avg FLOAT,
    death_rolling_avg FLOAT,
    new_datelapse INT,
    death_datelapse INT
)