const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}
const packageDefinition = protoLoader.loadSync("foobar.proto", options);
const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);

function main() {
    var client = new packageObject.foobar_grpc.FoobarHandler("localhost:4040", grpcLibrary.credentials.createInsecure());

    client.Store({
        FoobarContent: "JaveScrip Here!!!",
    }, function (err, response) {
        console.log("Created Foobars\n")
        console.log(response)
    })

    client.getListFoobar({ num: 1 }, function (err, fbars) {
        console.log("Foobars\n")
        console.log(fbars.Foobars)
        client.getFoobar({ ID: fbars.Foobars[1].ID }, function (err, detailFbar) {
            console.log("\nDetail Foobar\n")
            console.log(detailFbar)
        })
    })
}

main();