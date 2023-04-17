#!/bin/bash
#This script initializes the environment for the application backend and frontend, as well as the PSQL database.

psql_command="psql -U postgres -d postgres -c \CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, title VARCHAR(255) UNIQUE, body VARCHAR(400), status BOOLEAN DEFAULT true);"
react_command="cd frontend && npm start"
node_command="cd src && npm dev"
# Run the PSQL command

echo "Running PSQL command: $psql_command"
if ! $psql_command; then
echo "Error running PSQL command"
exit 1
fi

#Run the React command

echo "Running React command: $react_command"
if ! $react_command; then
echo "Error running React command"
exit 1
fi

#Run the Node command
echo "Running Node command: $node_command"
if ! $node_command; then
echo "Error running Node command"
exit 1
fi

echo "Environment initialized successfully!"