export default class BaseService {
  private readonly baseUrl: string = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;
  public readonly apiSuffix: string;
  public readonly apiEndpoint: string;

  public readonly config: any;

  constructor(apiSuffix: string) {
    if (typeof window !== "undefined") {
      this.config = {
        headers: {
          authorization:
            localStorage.getItem("accessToken") &&
            localStorage.getItem("accessToken") !== "undefined"
              ? `Bearer ${localStorage.getItem("accessToken")}`
              : null,
        },
      };
    }

    this.apiSuffix = apiSuffix;
    this.apiEndpoint = `${this.baseUrl}/api/${this.apiSuffix}`;
  }
}
