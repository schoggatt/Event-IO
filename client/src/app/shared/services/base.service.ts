import { api } from "./api";

export default class BaseService {
  public readonly apiSuffix: string;

  public readonly api = api;

  constructor(apiSuffix: string) {
    this.apiSuffix = apiSuffix;
  }
}
