export default class BaseService {
  private readonly baseUrl: string = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;
  public readonly apiSuffix: string;
  public readonly apiEndpoint: string;

  constructor(apiSuffix: string) {
    this.apiSuffix = apiSuffix;
    this.apiEndpoint = `${this.baseUrl}/api/${this.apiSuffix}`;
  }
}
