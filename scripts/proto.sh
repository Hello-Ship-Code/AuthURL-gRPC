#!/bin/bash

rm -rf src/generated/proto

./node_modules/.bin/proto-loader-gen-types \
--longs=String --enums=String --defaults \
--oneofs --grpcLib=@grpc/grpc-js \
--outDir=src/generated/proto/ proto/*.proto