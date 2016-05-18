import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import  mdDataTable from 'angular-material-data-table';
import {Question} from '../../../api/question';
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
    this.test_id=$stateParams.test_id;
    this.val;
    this.time=60;
    this.state=$state;
    this.selectedRow = null;
    this.helpers({
      showquestion(){

        if(Question.find({"_id":$stateParams.test_id}).count() > 0)
        {
          val=Question.findOne({"_id":$stateParams.test_id});
            //console.log(val.questionlist.length-1);
          // console.log("Dung");
          return Question.findOne({"_id":$stateParams.test_id});
        }
          else {
            //console.log("sai");
          //  $state.go('test',{'test_id':'572d4573bcd8a80f3bd12345'});
           $state.go('home');
          console.log("message");

          }
    },
    //ngan chan user logout luc dang vao ki thi, neu dang thi ma log ra thi se dieu den trang khac
    getuser(){
      if(Meteor.userId() === null)
      {
          this.state.go("home");
      }
    }
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
    var ans=Question.findOne({$and:[{"_id":this.test_id}
      ,{"questionSet": { $elemMatch: { "question":{$not:{$ne:que}},"correctAnswerSet":data}}}]});
    //  console.log(ans.questionSet[vitri].scored);
      if(ans != null){
              this.score =this.score + ans.questionSet[vitri].scored;
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
      url: '/test/:exam_id/:test_id',
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
