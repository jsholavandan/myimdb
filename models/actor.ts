import * as mongoose from 'mongoose';

export interface IActor extends mongoose.Document{
  cinema: mongoose.Types.ObjectId;
  name:string;
  age: number;
}

let actorSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  age:{
    type:Number
  }
});

export default mongoose.model<IActor>("Actor", actorSchema);
