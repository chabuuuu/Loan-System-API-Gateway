const amqplib = require('amqplib');
const amqp_url_cloud = process.env.RABBITMQ_CLOUD
const amqp_url_docker = process.env.RABBITMQ_DOCKER
let contractChanel : any;
async function getCreateContractChanel(): Promise<any> {
    const connection = await amqplib.connect(amqp_url_docker);
    contractChanel = await connection.createChannel();
    await contractChanel.assertQueue('CONTRACT');
    return contractChanel;
  }

  async function getContractChanel(): Promise<any> {
    //1. create connect
    const conn = await amqplib.connect(amqp_url_docker);
    //2. create chanel
    const contractChanel = await conn.createChannel()
    //3. create exchange
    const nameExchange = 'contract-exchange'
    await contractChanel.assertExchange(nameExchange, 'direct', {
        durable: false
    })
    //4. create queue
    const {queue} = await contractChanel.assertQueue('', {
        exclusive: true
    })
    console.log('name of queue:::', queue);
    //5. Binding
    await contractChanel.bindQueue(queue, nameExchange, queue.toString())
    return {contractChanel, queue};
  }
export class LoanContractRabbitMQ{
    async createLoanContract(req: any, res: any, next: any){
        try {
            const createContractChanel = await getCreateContractChanel();     
            const {contractChanel, queue} = await getContractChanel();

            req.body.routingKey = queue;
            console.log("Body::",req.body);
                              
            await createContractChanel.sendToQueue('CREATE_CONTRACT', Buffer.from(JSON.stringify(req.body)));
            console.log("Send to queue");
            let contract

            // await contractChanel.consume('CONTRACT', (data: any) => {
            //     contract = JSON.parse(data.content)
            //     contractChanel.ack(data)
            // });        
            await contractChanel.consume(queue, (data: any) => {
                contract = JSON.parse(data.content)
                res.json(contract);
            }, {
                noAck: true
            })                    
        } catch (error: any) {
            next(error);
            return;
        }
    }
}