import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDef = protoLoader.loadSync("./proto/todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = (grpcObject as any).grpcPackage;

const server = new grpc.Server();

const createTodo = () => {
  console.log("createTodo")
}

const readTodos = () => {
  console.log("readTodo")
}

server.addService(todoPackage.Todo.service,
  {
    "createTodo": createTodo,
    "readTodos": readTodos
  }
)

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error(error)
    return;
  }
  console.log(`server starting ${port}`)
})