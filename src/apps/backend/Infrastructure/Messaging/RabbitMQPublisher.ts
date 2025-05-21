import amqp from 'amqplib';

export class RabbitMQPublisher {
  private channel: amqp.Channel | null = null;

  async connect() {
    const connection = await amqp.connect('amqp://localhost');
    this.channel = await connection.createChannel();
  }

  async publish(queue: string, message: any) {
    if (!this.channel) throw new Error('RabbitMQ no conectado');
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }
}