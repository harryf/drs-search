#!/bin/sh
VERSION=0.14.2
DOWNLOAD="http://github.com/downloads/elasticsearch/elasticsearch/elasticsearch-$VERSION.tar.gz"

# download
wget --no-check-certificate "$DOWNLOAD" -O elasticsearch.tar.gz

# extract
tar -zxvf elasticsearch.tar.gz

# make it easy to find
ln -s "elasticsearch-$VERSION" elasticsearch

# start
cd elasticsearch; ./bin/elasticsearch -f
