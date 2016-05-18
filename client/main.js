import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as mainLayout} from '../imports/ui/layouts/mainLayout';
import ngMaterial from 'angular-material';
export default angular.module('quiz-online',[
  angularMeteor,
  mainLayout,
  ngMaterial
]);
