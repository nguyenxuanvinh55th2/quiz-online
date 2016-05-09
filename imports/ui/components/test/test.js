import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import {Question} from '../../../api/questionList/questionList.js';
import './test.html';
class Test {
  constructor($scope,$reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe("question");
    this.helpers({
      showquestion(){
        //console.log(Question.find({}));
        return Question.find({});
      }
    });
  }
  checkanswer(id,lisques,rd)
  {
  //tim gia tri chon cho cau hoi
  var gender = document.querySelector('input[name = "tesvalue"]:checked').value;
  var ans=Question.find({$and:[{"_id":id}
  ,{"questionlist": { $elemMatch: { "ques":lisques,"correctanswer":gender}}}]},{"questionlist.$":1}).count();
  // console.log(ans);
  if(ans > 0){
        console.log("dung");
  }
  else {
    console.log("sai");
  }

  }
}
const name = 'test';
export default angular.module(name,[
  angularMeteor,
  uiRouter,
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
      url: '/test',
      template: '<test></test>'
    })
}
