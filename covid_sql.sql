CREATE TABLE covid_data (
date date,
state TEXT,
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
    date date,
    positive INT,
    negative INT,
    death FLOAT,
    death_increase INT,
    hospitalized_currently FLOAT,
    on_ventilator_currently FLOAT
);