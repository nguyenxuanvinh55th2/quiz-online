import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import mdDataTable from 'angular-material-data-table';
import './scored.html';
class Scored {
  constructor() {

  }
}
const name = 'scored';
export default angular.module(name,[
  angularMeteor,
  ngMaterial,
  mdDataTable,
  uiRouter
])
.component(name,{
  templateUrl:'imports/ui/components/scored/scored.html',
  controllerAs: name,
  controller: Scored
})
.config(config);
function config($stateProvider){
  'ngInject';
  $stateProvider
    .state('testScored', {
      url: '/test/scored',
      template: '<scored></scored>'
    });
}
