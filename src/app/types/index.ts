export interface ICreator {
    _id: any,
    username: string,
    email: string,
    image: string
}
export interface EPromt {
    _id: any,
    creator: ICreator,
    prompt: string,
    tag: string,
}