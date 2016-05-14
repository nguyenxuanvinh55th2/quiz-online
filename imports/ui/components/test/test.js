import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import  mdDataTable from 'angular-material-data-table';
import {Question} from '../../../api/questionList/questionList.js';
import {name as scored} from '../scored/scored';
import './test.html';
class Test {
  constructor($scope,$reactive,$stateParams,$state,$timeout) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe("question");
    this.score=0;
    this.selectedIndex = 0 ;//hien ra cau hoi thu i
    this.isend = true;//kiem tra het cau hoi chua
    //note
    this.test_id=$stateParams.test_id;
    this.val;
    this.time=60;
    this.state=$state;
    this.timeout=$timeout;
    this.selectedRow = null;
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
    },

    timerun(){
      this.runtime();
    }

  });
  }
  runtime()
  {
    this.time=this.time-1;
    if(this.time != 0)
    {
      console.log(this.time);
      setTimeout(this.runtime(), 2000);
    }
  }

  setClickedRow(index)
  {
      this.selectedRow = index;
      console.log(index);
      console.log(this.selectedRow);
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
          this.isend = false;
          console.log("het roi nhan cung");
          this.state.go('home');
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
  ngMaterial,
  mdDataTable,
  scored
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
