import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import './homeLayout.html'
class HomeLayout {}
const name = 'homeLayout';
export default angular.module(name,[
  angularMeteor,
  ngMaterial,
  uiRouter,
  mdDataTable
])
.component(name,{
  templateUrl:'imports/ui/components/homeLayout/homeLayout.html',
  controllerAs: name,
  controller: HomeLayout
})
.config(config);
function config($stateProvider){
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/home',
      template: '<home-layout></home-layout>'
    });
}
