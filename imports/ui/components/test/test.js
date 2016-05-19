import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import  mdDataTable from 'angular-material-data-table';
import {Question} from '../../../api/question';
import {Exam} from '../../../api/examination';
// goi duoi server
import {Meteor} from 'meteor/meteor';
import './test.html';
class Test {
  constructor($scope,$reactive,$stateParams,$state) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('question');
    this.score=0;
    this.selectedIndex = 0 ;//hien ra cau hoi thu i
    this.isend = true;//kiem tra het cau hoi chua
    //note
    this.question_id=$stateParams.question_id;
    this.exam_id=$stateParams.exam_id;
    this.val;
    this.time=60;
    this.state=$state;
    this.selectedRow = null;
    this.helpers({

      getuser(){
        if(Meteor.userId() === null)
        {
            this.state.go("home");
        }
      },
      showquestion(){

        if(Question.find({"_id":$stateParams.question_id}).count() > 0)
        {
          val=Question.findOne({"_id":$stateParams.question_id});
          return Question.findOne({"_id":$stateParams.question_id});
        }
          else {
           $state.go('home');
          }
    }
    //ngan chan user logout luc dang vao ki thi, neu dang thi ma log ra thi se dieu den trang khac

    // timerun(){
    //   //this.runtime();
    //   console.log(this.time);
    //   console.log("message");
    //   setTimeout(function(){
    //       this.time = this.time -1;
    //       this.timerun();
    //   }, 3000);
    // }
  });
  }
  runtime()
  {
    this.time = this.time -1;
    console.log(this.time);
    if(this.time > 0)
    {
      setInterval(this.runtime(), 1000);
      //setTimeout(this.runtime(), 1000000000000);
    }
  }

  //hien ra cau hoi thu index
  setClickedRow(index)
  {
      this.selectedRow = index;
  }


  checkanswer(que,data,vitri)
  {
    console.log(vitri);
    var ans=Question.findOne({$and:[{"_id":this.question_id}
      ,{"questionSet": { $elemMatch: { "question":{$not:{$ne:que}},"correctAnswerSet":data}}}]});
    //  console.log(ans.questionSet[vitri].scored);
      if(ans !== null){
              this.score =this.score + ans.questionSet[vitri].scored;
              Meteor.call("updateExam",this.exam_id,Meteor.userId(),this.score);
               console.log("dung");
         }
         else {
           console.log("sai");
         }
        if (this.selectedIndex < (val.questionSet.length - 1)) {
          this.selectedIndex = this.selectedIndex + 1;
        }
        else {
          this.isend = false;
          console.log("het roi nhan cung");
          //this.state.go('home');
          this.state.go('testScored');

        }
        this.selectedRow = null;
        ans = null;
  }
}
const name = 'test';
export default angular.module(name,[
  angularMeteor,
  uiRouter,
  utilsPagination,
  mdDataTable
])
.component(name,{
  templateUrl:'imports/ui/components/test/test.html',
  controllerAs: name,
  controller: Test
})
.config(config);
function config($stateProvider){
  'ngInject';
  $stateProvider
    .state('test', {
      url: '/test/:exam_id/:question_id',
      template: '<test></test>',
      resolve: {
        currentUser($q){
          if(Meteor.userId() === null){
            return $q.reject();
          }else {
            return $q.resolve();
          }
        }
      }
    })
}
