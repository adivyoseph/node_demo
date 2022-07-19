FROM mysql

   ENV MYSQL_ROOT_PASSWORD=martin
#  ENV MYSQL_ALLOW_EMPTY_PASSWORD=true
   ENV MYSQL_DATABASE=tenantdb

COPY ./dump.sql /docker-entrypoint-initdb.d/
