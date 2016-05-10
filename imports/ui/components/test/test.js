import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import {Question} from '../../../api/questionList/questionList.js';
import './test.html';
class Test {
  constructor($scope,$reactive,$stateParams,$state) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe("question");
    this.score=0;
    this.selectedIndex = 0 ;
    //note
    this.test_id=$stateParams.test_id;
    this.val;
    this.helpers({
      showquestion(){
        if(Question.find({"_id":$stateParams.test_id}).count() > 0)
        {
          val=Question.findOne({"_id":$stateParams.test_id});
            console.log(val.questionlist.length-1);
          // console.log("Dung");
          return Question.findOne({"_id":$stateParams.test_id});
        }
          else {
            //console.log("sai");
            $state.go('home');
          }
    }});

  }


  checkanswer(que,data)
  {
    //cach goi func khac
    // this.func2();
    var ans=Question.find({$and:[{"_id":this.test_id}
      ,{"questionlist": { $elemMatch: { "ques":{$not:{$ne:que}},"correctanswer":data}}}]},{"questionlist.$":1}).count();
      if(ans > 0){
              this.score ++;
               console.log("dung");
         }
         else {
           console.log("sai");
         }
        if (this.selectedIndex < (val.questionlist.length - 1)) {
          this.selectedIndex = this.selectedIndex + 1;
        }
        else {
          console.log("het roi nhan cung");
        }
  }
  //test call func
    // func2()
    // {
    //   console.log("2 nhan may");
    // }
}
const name = 'test';
export default angular.module(name,[
  angularMeteor,
  uiRouter,
  utilsPagination,
  ngMaterial
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
      url: '/test/:test_id',
      template: '<test></test>'
    })
}
