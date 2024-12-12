export class UserModel{
    public firstName?: string;
    public lastName?: string;


    constructor(firstName: string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}