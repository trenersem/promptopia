export interface IUser {
      id: any
      email: string
      username: string,
      image: string,
<<<<<<< HEAD
};
=======
}
>>>>>>> 2a90bc2 (fix mistakes with types)
export interface ICreator {
    id: any,
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