import grpc from  '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader'



const packageDefinition = protoLoader.loadSync("./user.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});


const userProto = grpc.loadPackageDefinition(packageDefinition).user;


const userRPC = new userProto.get_user('127.0.0.1:50050', grpc.credentials.createInsecure());

export default userRPC

