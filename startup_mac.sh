#!/bin/bash

# Get the directory this script lives in
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

osascript -e "tell application \"Terminal\" to do script \"cd $SCRIPT_DIR/backend && ./mvnw spring-boot:run\""
osascript -e "tell application \"Terminal\" to do script \"cd $SCRIPT_DIR/frontend && npm run dev\""