export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public permissions: string[],
    public email: string,
    public gender: string,
    public birthDate: string,
    public phone: string,
    public userGroup: string,
    public firstName: string,
    public langKey: string,
    public lastName: string,
    public login: string,
    public imageUrl: string
  ) {}
}
