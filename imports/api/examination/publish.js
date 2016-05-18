import { Meteor } from 'meteor/meteor';
import {Exam} from './collection.js';
if(Meteor.isServer){
  Meteor.publish('examination', function(){
    return Exam.find({});//note
  });
}
