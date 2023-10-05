
export interface ICreator {
    username: string,
    email: string,
    image: string
}
export interface EPoromt {
    _id: any,
    creator: ICreator,
    prompt: string,
    tag: string,
}