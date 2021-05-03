import { Gender } from './enum/Gender'

/**
 * UserModel
 * Class that represents the user.
 */
export class User {
    private id: Number
    private name: String
    private cpf: String
    private email: String
    private telephone: String
    private gender: Gender
    private birthday: String

    public getId(): Number {
        return this.id
    }

    public setId(id: Number): void {
        this.id = id
    }

    public getName(): String {
        return this.name
    }

    public setName(name: String): void {
        this.name = name
    }

    public getCpf(): String {
        return this.cpf
    }

    public setCpf(cpf: String): void {
        this.cpf = cpf
    }

    public getEmail(): String {
        return this.email
    }

    public setEmail(email: String): void {
        this.email = email
    }

    public getTelephone(): String {
        return this.telephone
    }

    public setTelephone(telephone: String): void {
        this.telephone = telephone
    }

    public getGender(): Gender {
        return this.gender
    }

    public setGender(gender: Gender): void {
        this.gender = gender
    }

    public getBirthday(): String {
        return this.birthday
    }

    public setBirthday(birthday: String): void {
        this.birthday = birthday
    }
}
