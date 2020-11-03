FROM nginx:1.17

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get -y install python3-pip python3-dev python3-venv \ 
    nodejs gettext-base libpq-dev git-core \ 
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_PATH ./src
ENV REACT_APP_BACKEND_URL /
COPY ./app/front_end/package.json front_end/package.json
COPY ./app/front_end/package-lock.json front_end/package-lock.json
RUN cd front_end && npm install

RUN pip3 install --upgrade pip wheel setuptools
RUN pip3 install grpcio
COPY ./app/flask_backend/requirements.txt flask_backend/requirements.txt
RUN pip3 install -r flask_backend/requirements.txt gunicorn
RUN snips-nlu download en

COPY ./app/front_end front_end/
RUN cd front_end && npm run build
RUN /bin/bash -c "cp -r front_end/build/. /usr/share/nginx/html"

COPY ./app/flask_backend flask_backend/
RUN cd flask_backend/nlp && python3 train.py
RUN cd flask_backend/script && python3 install_nltk.py

COPY ./app/flask_backend/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./.git /
CMD gunicorn -b 0.0.0.0:5000 app:app --chdir "./flask_backend" --daemon && \
    /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && \
    nginx -g 'daemon off;'
