import { connect, NatsConnection } from "nats";

class NatsWrapper {
  private static instance: NatsWrapper;
  private _client?: NatsConnection;

  private constructor() {}

  public static getInstance(): NatsWrapper {
    if (!NatsWrapper.instance) {
      NatsWrapper.instance = new NatsWrapper();
    }
    return NatsWrapper.instance;
  }

  async connect() {
    if (!this._client) {
      this._client = await connect({ servers: process.env.NATS_URL });
      console.log("Connected to NATS");
    }
  }

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }
    return this._client;
  }
}

export const natsWrapper = NatsWrapper.getInstance();
