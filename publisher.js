const amqp=require('amqplib');

const msg={Number:process.argv[2]}
connect();

async function connect(){
    try {
        const connection= await amqp.connect("amqp://127.0.0.1:5672");
        const channel= await connection.createChannel();
        const result =await channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully`);
    } catch (error) {
        if(error)
        {
            console.log(error);
        }
    }
}