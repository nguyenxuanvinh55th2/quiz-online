import { Meteor } from 'meteor/meteor';
import {Question} from '../imports/api/question';
import {Exam} from '../imports/api/examination';
Meteor.startup(() => {
  // code to run on server at startup
});


//muon co nhiu dieu kien khi sua hoac xoa thi viet o duoi server
Meteor.methods({
  updateExam:function(id,user,scored){
    Exam.update({_id:id,"usersList.userId":user}, {$set:{
        "usersList.$.scored":scored
    }});
  }
});
