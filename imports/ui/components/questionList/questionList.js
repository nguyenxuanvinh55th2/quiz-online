import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import './questionList.html'
import {Question} from '../../../api/question'
import {name as homeLayout} from '../homeLayout/homeLayout';
class QuestionList {}
const name = 'questionList';
export default angular.module(name,[
  angularMeteor,
  ngMaterial,
  uiRouter
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
