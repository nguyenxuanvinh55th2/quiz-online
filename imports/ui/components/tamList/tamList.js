import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import './tamList.html'
class TamList {}
const name = 'tamList';
export default angular.module(name,[
  angularMeteor,
  ngMaterial,
  uiRouter
])
.component(name,{
  templateUrl:'imports/ui/components/tamList/tamList.html',
  controllerAs: name,
  controller: TamList
})
.config(config);
function config($stateProvider){
  'ngInject';
  $stateProvider
    .state('tamhello', {
      url: '/questionlist/tam',
      template:'<tam-list></tam-list>',
    });
}
