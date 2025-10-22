export default class ApiResponse<T = unknown> {
  code: string;
  data: T | null;

  constructor(code: string, data: T | null = null) {
    this.code = code;
    this.data = data;
  }

  toJSON() {
    return { code: this.code, data: this.data };
  }
}
