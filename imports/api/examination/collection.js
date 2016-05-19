import {Mongo} from 'meteor/mongo';
export const Exam =new Mongo.Collection("examination");
Exam.allow({
  insert: function(){
    return true;
  },
  update: function(userId){
    return userId;
  },
  remove: function(){
    return true;
  }
});
