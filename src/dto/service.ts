export class ServiceError {
    msg: string;
  
    constructor(msg: string) {
      this.msg = msg;
    }
}
  
export const toServiceError = (msg: any) => new ServiceError(JSON.stringify(msg));