import * as mongoose from 'mongoose';
import {IActor} from './actor';


export interface IReview{
  username:string;
  text:string;
  title:string;
}

export interface ICinema extends mongoose.Document{
  name: string;
  releasedate: Date;
  story:string;
  rating: number[];
  photourl:string;
  director:string;
  reviews:IReview[];
  actors: IActor[];
}

let ReviewSchema = new mongoose.Schema({
  username:String,
  text:String,
  title:String
});


let CinemaSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  releasedate:{
    type:Date,
    required:true
  },
  director:{
    type:String,
    required:true
  },
  story:{
    type:String
  },
  rating:[Number],
  photourl:{
    type:String
  },
  reviews: [ReviewSchema],
  actors:[{type:mongoose.Schema.Types.ObjectId, ref: 'Actor'}]
});

export default mongoose.model<ICinema>('Cinema', CinemaSchema);
