import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import {name as homeLayout} from '../components/homeLayout/homeLayout';
import {name as questionList} from '../components/questionList/questionList';
import {name as test} from '../components/test/test';
import './mainLayout.html'
class MainLayout {
  constructor() {

  }
}
const name = 'mainLayout';
export default angular.module(name,[
  angularMeteor,
  ngMaterial,
  uiRouter,
  homeLayout,
  questionList,
  test
])
.component(name,{
  templateUrl:'imports/ui/layouts/mainLayout.html',
  controllerAs:name,
  controller:MainLayout
})
.config(config)
function config($locationProvider,$urlRouterProvider){
  'ngInject';
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
}
