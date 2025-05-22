export interface CommandPublisher {
  connect(): Promise<void>;
  publish(queue: string, message: any): Promise<void>;
}