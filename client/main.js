import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as mainLayout} from '../imports/ui/layouts/mainLayout';
export default angular.module('quiz-online',[
  angularMeteor,
  mainLayout
]);
