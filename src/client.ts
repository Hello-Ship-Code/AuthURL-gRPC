import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDef = protoLoader.loadSync("./proto/todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = (grpcObject as any).grpcPackage;

const client = new todoPackage.Todo("localhost:40000",
  grpc.credentials.createInsecure())

client.createTodo({
  "id": -1,
  "text": 'Do Dishes'
}, (err: unknown, response: unknown) => {
  if (err) {
    console.error("Error from server:", err);
  } else {
    console.log("Received from server:", response);
  }
})