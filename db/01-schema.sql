CREATE TYPE signal_config AS ENUM (
    'StereoSingleEnded',
    'StereoBalanced',
    'StereoMic',
    'Mic',
    'MonoRight',
    'MonoLeft'
);

CREATE TYPE connector_category AS ENUM ('Audio', 'Data', 'Power');

CREATE TYPE connector_gender AS ENUM ('Male', 'Female');

CREATE TABLE
    Pinouts (
        id serial PRIMARY KEY,
        signal_config varchar(30) NOT NULL,
        pin1 varchar(15) DEFAULT 'NC',
        pin2 varchar(15) DEFAULT 'NC',
        pin3 varchar(15) DEFAULT 'NC',
        pin4 varchar(15) DEFAULT 'NC',
        pin5 varchar(15) DEFAULT 'NC'
    );

CREATE TABLE
    DiagramIcons (
        name varchar(30) PRIMARY KEY,
        image_url text NOT NULL
    );

CREATE TABLE
    ConnectorIcons (
        name varchar(30) PRIMARY KEY,
        image_url text NOT NULL
    );

CREATE TABLE
    PhysicalConnectors (
        id serial PRIMARY KEY,
        connector_icon varchar(30) REFERENCES ConnectorIcons (name) ON UPDATE CASCADE,
        diagram_icon varchar(30) REFERENCES DiagramIcons (name) ON UPDATE CASCADE,
        name varchar(30) NOT NULL,
        category connector_category NOT NULL,
        size varchar(10) DEFAULT 'Standard',
        gender connector_gender NOT NULL,
        pin_count smallint NOT NULL
    );

CREATE TABLE
    UniversalPinouts (
        id serial PRIMARY KEY,
        connector_id int REFERENCES PhysicalConnectors (id) ON UPDATE CASCADE,
        pinout_id int REFERENCES Pinouts (id) ON UPDATE CASCADE
    );

CREATE TABLE
    Devices (
        device_model varchar(50) PRIMARY KEY,
        brand varchar(20)
    );

CREATE TABLE
    DeviceConfigs (
        id serial PRIMARY KEY,
        connector_id int REFERENCES PhysicalConnectors (id) ON UPDATE CASCADE,
        pinout_id int REFERENCES Pinouts (id) ON UPDATE CASCADE,
        device_model varchar(50) REFERENCES Devices (device_model)
    );