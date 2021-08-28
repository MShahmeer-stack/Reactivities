import { User } from "./user";

export interface Profile{
    userName:string;
    displayName:string;
    image?:string;
    bio?:string;
    photos?:Photo[];
}

export interface Photo{

    id:string;
    url:string;
    isMain:boolean;
}

export class Profile implements Profile{
    constructor(user :User){
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image =user.image;
        this.bio = user.bio;
       
    }
}