import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import './questionList.html'
import {Question} from '../../../api/questionList/questionList.js'
import {name as tamList} from '../tamList/tamList';
import {name as homeLayout} from '../homeLayout/homeLayout';
class QuestionList {
  constructor($scope,$reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.helpers({

    });
  }
}
const name = 'questionList';
export default angular.module(name,[
  angularMeteor,
  ngMaterial,
  uiRouter,
  tamList
])
.component(name,{
  templateUrl:'imports/ui/components/questionList/questionList.html',
  controllerAs : name,
  controller : QuestionList
})
.config(config);
function config($stateProvider){
  'ngInject';
  $stateProvider
    .state('questionlist', {
      url: '/questionlist',
      template: '<question-list></question-list>'
    })
}
