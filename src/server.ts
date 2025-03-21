import path from 'path'

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType as ProtoGrpcTypeAge } from './generated/proto/age'
import { AgeServiceHandlers } from './generated/proto/age/AgeService';
import { ProtoGrpcType } from './generated/proto/hello'

const PROTO_PATH_Hello = path.resolve(__dirname, "../proto/hello.proto");
const PROTO_PATH_Age = path.resolve(__dirname, "../proto/age.proto");

const packageDefHello = protoLoader.loadSync(PROTO_PATH_Hello, {});
const packageDefAge = protoLoader.loadSync(PROTO_PATH_Age, {});

const grpcObjectHello = grpc.loadPackageDefinition(packageDefHello) as unknown as ProtoGrpcType;
const grpcObjectAge = grpc.loadPackageDefinition(packageDefAge) as unknown as ProtoGrpcTypeAge;

const helloProto = (grpcObjectHello as any).hello;
const ageProto = (grpcObjectAge as any).age;

const server = new grpc.Server();

server.addService(helloProto.Greeter.service, {
  SayHello: (call: any, callback: any) => {
    callback(null, { message: `Hello ${call.request.name} 👋🏻` })
  }
})

server.addService(ageProto.AgeService.service, {
  SayAge: async (call, callback) => {
    callback(null, { age: `You are ${call.request.age} years old! 🎉` });
  }
} as AgeServiceHandlers);

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error(error)
    return;
  }
  console.log(`server starting ${port}`)
})