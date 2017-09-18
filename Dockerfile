# -*- coding: UTF-8 -*-
FROM ubuntu:14.04

RUN apt-get update -y 
RUN apt-get install -y python-pip python-dev
RUN pip install pika
RUN pip install flask
RUN pip install flask_cors

WORKDIR /app

COPY . /app

ENTRYPOINT [ "python" ]

CMD [ “Hello.py” ]