import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import {Question} from '../../../api/question';
import {Exam} from '../../../api/examination';
import  mdDataTable from 'angular-material-data-table';
import './information.html';
class Information {
  constructor($scope,$reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    //chu y phai subscribe no 
    this.subscribe("examination");
    this.helpers({
      infor()
      {
        return Exam.findOne({_id:"69366"});
      }
    });
  }
}
const name = "information";
export default angular.module(name,[
  angularMeteor,
  uiRouter,
  ngMaterial,
  mdDataTable
])
.component(name,{
  templateUrl:'imports/ui/components/information/information.html',
  controllerAs: name,
  controller: Information
})
.config(config);
function config($stateProvider){
  'ngInject';
  $stateProvider
  .state('userinfo', {
    url: '/userinfor',
    template: '<information></information>'
  })
}
