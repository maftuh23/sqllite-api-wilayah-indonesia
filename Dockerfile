FROM alpine:latest

WORKDIR /data

COPY records.sqlite .

CMD ["ls", "-l", "/data"]