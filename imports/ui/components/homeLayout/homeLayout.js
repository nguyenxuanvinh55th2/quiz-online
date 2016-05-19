import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import './homeLayout.html';
import {Question} from '../../../api/question';
import {Exam} from '../../../api/examination';
import {Meteor} from 'meteor/meteor';
class HomeLayout {
  constructor($scope,$reactive,$state,$stateParams) {
    'ngInject';
    $reactive(this).attach($scope);
    this.state = $state;
    this.subscribe("question");
    this.subscribe("examination");
    this.tam ;
    // this.helpers({
    //   load: function(){
    //     console.log("hello vinh dep trai");
    //   }
    // });
  }
  loginExam(data){
    if(Meteor.userId() === null)
      this.state.go("login");
      else {
        //findOne thi moi truy van den con cua no va ko co fetch
        var val  = Exam.findOne({"_id":"69366"},{fields:{'questionSetId':1,"_id":0}});
        //muon truyen nhieu dieu kien thi phai thuc hien o server dung methods o server va client thi goi lai
        Meteor.call("updateExam","69366","vinh",67);
        this.tam=val.questionSetId;
        this.state.go("test",{'exam_id':"69366",'test_id':val.questionSetId});
      }
  }
}
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
