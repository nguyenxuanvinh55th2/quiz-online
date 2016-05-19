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
  }
  loginExam(zipcode){
    if(Meteor.userId() === null)
      this.state.go("login");
      else {

        if (zipcode == null) {
          this.state.go("home");
        }
        else {
          //findOne thi moi truy van den con cua no va ko co fetch
          var val  = Exam.findOne({"_id":zipcode},{fields:{'questionSetId':1,"_id":0}});
          if(val !== null)
          {
            //push mot doi usersList vao trong collection examination
            var checkexit = Exam.find({$and:[{_id:zipcode},{"usersList":{$elemMatch:{"userId":Meteor.userId()}}}]}).count();
            //neu userId da ton tai tron examination thi cap nhat lai diem so con neu chua thi tao mot truong moi
            if(checkexit > 0){
              //neu da ton tai thi cap nhap lai diem = 0
              console.log("ton tai");
              Meteor.call("updateExam",zipcode,Meteor.userId(),0);

            }
            else {
              console.log(" chua ton tai");
              Exam.update({_id:zipcode}, {$push:{
                "usersList":{"userId":Meteor.userId(),"scored":0}
              }});
            }
            //muon truyen nhieu dieu kien thi phai thuc hien o server dung methods o server va client thi goi lai
          //  Meteor.call("updateExam",zipcode,Meteor.userId(),0);
            this.tam=val.questionSetId;
            this.state.go("test",{'exam_id':zipcode,'question_id':val.questionSetId});
          }
            else {
                this.state.go("home");
            }
        }
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
