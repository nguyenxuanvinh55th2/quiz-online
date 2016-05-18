import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import './infomation';
class Infomation {
  constructor() {

  }
}
const name = "infomation";
export default angular.module(name,[
  angularMeteor,
  uiRouter,
  ngMaterial
])
.component(name,{
  templateUrl:'imports/ui/components/infomation/infomation.html',
  controllerAs: name,
  controller: Infomation
})
.config(config);
function config($stateProvider){
  'ngInject';
  $stateProvider;
  .state('userinfo', {
    url: '/userinfo/:test_id',
    template: '<test></test>'
  })
}
