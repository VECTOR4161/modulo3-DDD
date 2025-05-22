export interface CommandSubscriber {
  connectAndConsume(queue: string, onMessage: (msg: any) => void): Promise<void>;
}