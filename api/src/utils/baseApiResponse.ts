export default class ApiResponse<T = unknown> {
  code: string;
  data: T | null;
  message?: string[];

  constructor(code: string, data: T | null = null, message?: string[]) {
    this.code = code;
    this.data = data;
    if (message && message.length > 0) {
      this.message = message;
    }
  }

  toJSON() {
    const response: Record<string, any> = {
      code: this.code,
      data: this.data,
    };

    if (this.message) {
      response.message = this.message;
    }

    return response;
  }
}
