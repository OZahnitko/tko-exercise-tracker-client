export enum PayloadMessage {
  empty,
  err,
  ok,
  removed,
  set,
}

export interface LocalStoragePayload {
  message: PayloadMessage;
  data?: { key: string; value: any };
}
