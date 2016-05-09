import {Mongo} from 'meteor/mongo';
export const Question =new Mongo.Collection("question");
Question.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
