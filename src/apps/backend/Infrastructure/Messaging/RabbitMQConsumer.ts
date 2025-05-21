import amqp from 'amqplib';

export class RabbitMQConsumer {
  private channel: amqp.Channel | null = null;

  async connectAndConsume(queue: string, onMessage: (msg: any) => void) {
    const connection = await amqp.connect('amqp://localhost');
    this.channel = await connection.createChannel();

    await this.channel.assertQueue(queue, { durable: true });

    console.log(`Escuchando cola: ${queue}`);

    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        onMessage(content);
        this.channel!.ack(msg); // Acknowledge message
      }
    });
  }
}