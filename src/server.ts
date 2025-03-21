import path from 'path'

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = path.resolve(__dirname, "proto/hello.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const helloProto = (grpcObject as any).hello;

const sayHello = (call: any, callback: any) => {
  callback(null, { message: `Hello ${call.request.name} 👋🏻` })
}

const server = new grpc.Server();

server.addService(helloProto.Greeter.service, { SayHello: sayHello })

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error(error)
    return;
  }
  console.log(`server starting ${port}`)
})