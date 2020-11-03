#!/bin/bash

if [ $ENVIRONMENT = "PRODUCTION" ]; then
    gunicorn -b 0.0.0.0:5000 app:app --chdir "./backend" --daemon
    sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf
    nginx -g 'daemon off;'
fi
