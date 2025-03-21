import path from 'path'

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = path.resolve(__dirname, "proto/hello.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const helloProto = (grpcObject as any).hello;

const client = new helloProto.Greeter(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

// client.SayHello({ name: "peter" }, (error: any, response: any) => {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log("Response from server:", response.message);
//   }
// });