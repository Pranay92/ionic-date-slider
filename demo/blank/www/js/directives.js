  angular.module('directives',[])
  .directive('dateSliderPicker',['$compile',function($compile){
    
    return {
      restrict : 'E',
      link : function($scope,$elem,$attrs) {

        var monthDays = ['S','M','T','W','Th','F','Sa'];

        var onSelectDate = $attrs.onSelectDate;

        var dateVar = $attrs.dateSelectVar;

        // the variable that will hold the value of the selected date
        var valueToWatch;

        if(dateVar) {
          initSelectedDate();
        }

        var configObj = {
          totalDays : 90
        };

        function initSelectedDate() {
          // if it is a nested prop
          var splitted = dateVar.split('.');

          if(splitted.length > 0) {
            
            valueToWatch = formatKeys(splitted);

          } else {
            valueToWatch = $scope.$eval(dateVar);
          }
        }

        if(!(onSelectDate)) {
          onSelectDate = function() {};
        }

        function formatKeys(key) {
          var props = key;
          var len = props.length;
          var index;
          var obj = {};
          var currKey;

          for(index = 0; index < len; index++) {
            
            currKey = props[index];

            obj = obj[currKey] ? obj[currKey] : $scope[currKey];
          }

          return obj;
        }

        // this will be removed once we have keys() protoype on all the browsers
        function getKeys() {
          
          var arr = [],
              obj = this;

          for(var i in obj) {
            if(obj.hasOwnProperty(i)) {
              arr.push(i);
            }
          }

          return arr;
        }

        // to get the number of days in a month
        function daysInMonth(month,year) {
          return new Date(year, month, 0).getDate();
        }

        //generate date object for the days
        function generateDays() {

          var date = new Date();
          //get current month
          var month = date.getMonth();
          var year = date.getFullYear();

          // get number of days in a month
          var days = daysInMonth((month + 1),year);

          //to be used in the loop/slides
          var index,dateObj;

          var totalDays = configObj.totalDays;
          
          var currYear = date.getFullYear();
          var currMonth = date.getMonth();
          var dates = [];
          var today = date.getDate();
          var counter = today;
          var currDay = date.getDay();
          var calendar = [];

          for(index = 1; index <= totalDays; index++) {

            if(counter > days) {
              counter = 1;
              currMonth = (currMonth === 11) ? 0 : (currMonth + 1);
              currYear = (currMonth === 0) ? (currYear + 1 ) : currYear;
              days = daysInMonth((currMonth + 1),currYear);
            }

            dateObj = {
              date : counter,
              month : monthDays[currDay],
              fullDay : (new Date(currYear, currMonth, counter)).toDateString()
            };

            counter++;
            currDay++;

            if(currDay === 7) {
              currDay = 0;
            }

            dates.push(dateObj);

          }

          counter = 0;

          for(var i=0;i<totalDays;i++) {
            
            if ((i+1)%6 === 0) {
              counter += 1;
            }

            calendar[counter] = calendar[counter] || [];
            calendar[counter].push(dates[i]);
            
            // to keep that slide active by default 
            if(valueToWatch === dates[i].fullDay) {
              $scope.activeSlide = counter;
            }
            
          }

          return calendar;
        }

        function isActive(day) {
          initSelectedDate();
          return valueToWatch === day;
        }

        $scope.isActive = isActive;

        $scope.calendar = generateDays();

        // the html that needs to be generated on for the datepicker
        var template = "<ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"false\" active-slide=\"activeSlide\"><ion-slide ng-repeat=\"week in calendar\"><div class=\"row\"><div ng-repeat=\"day in week\" ng-click=" + onSelectDate + '(day.fullDay)' + " class=\"col col-17\"><div class=\"row responsive-sm responsive-md responsive-lg text-center\"><div class=\"col\">{{day.month}}</div><div class=\"col\"><span ng-class=\"{'badge badge-positive' : isActive(day.fullDay)}\">{{day.date}}</span></div></div></div></div></ion-slide></ion-slide-box>";

        template = $compile(template)($scope);
        
        $elem.html(template);

      }
    };

  }]);