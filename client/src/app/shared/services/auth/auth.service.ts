import BaseService from "../base.service";

interface IAuthService {}

export default class AuthService extends BaseService implements IAuthService {
  constructor() {
    super("auth");
  }
}
