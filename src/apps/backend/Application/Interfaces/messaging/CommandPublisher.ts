export abstract class CommandPublisher {
  abstract connect(): Promise<void>;
  abstract publish(queue: string, message: any): Promise<void>;
}