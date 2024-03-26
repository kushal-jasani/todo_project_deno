import {Database, MongoClient} from "https://deno.land/x/mongo@v0.33.0/mod.ts";
let db:Database;

export async function connect(){
    const client=new MongoClient();
    await client.connect("mongodb+srv://kush:5XCZW5ADqHZDu6Ay@cluster0.1qgxj1a.mongodb.net/todos?authMechanism=SCRAM-SHA-1");
console.log('DB CONNECTED');
    // await client.connect({
    //     db: "<db_name>",
    //     tls: true,
    //     servers: [
    //       {
    //         host: "<db_cluster_url>",
    //         port: 27017,
    //       },
    //     ],
    //     credential: {
    //       username: "kush",
    //       password: "<password>",
    //       db: "<db_name>",
    //       mechanism: "SCRAM-SHA-1",
    //     },
    //   })
    db=client.database('todos');

}
export function getDb(){
    return db;
}