mainModule.controller('centerController', ['$scope', '$window', 'mainService', '$http', '$location',
    function($scope, $window, mainService, $http, $location){

        var init = function(){
            console.log(ROOT_PATH + "pay/" + /[^/]*$/.exec(window.location.href)[0])
            $http({
                 method: 'GET',
                 url:  ROOT_PATH + "pay/" + /[^/]*$/.exec(window.location.href)[0]

                 }).then(function successCallback(response) {
                      console.log("ok: " + JSON.stringify(response))
                      $location.path(response.data.Location);
                 }, function errorCallback(response) {
                     $location.path(response.data.Location);
                     console.log("grerska" + JSON.stringify(response))
             });
             console.log("uradio init")

        }
        init();

        $scope.cardNumber = "";
        $scope.format = function(){
            document.getElementById('cardNumber').addEventListener('input', function (e) {
            var target = e.target, position = target.selectionEnd, length = target.value.length;

            target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
            target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
            });
        }

        var sendData = function(payload){

            $http({
                method: 'POST',
                url:  ROOT_PATH + "pay/" + /[^/]*$/.exec(window.location.href)[0],
                data: payload
                }).then(function successCallback(response) {
                    console.log(response)
                    $location.path(response.data.Location);
                }, function errorCallback(response) {
                    $location.path(response.data.Location);
            });

        }

        var prepareData = function(){
            var month = document.getElementById("mesec");
            var year = document.getElementById("godina");

            var data = {
                "pan" : document.getElementById("cardNumber").value.replace(/ /g,''),
                "cvv" : document.getElementById("cvv").value,
                "ime": document.getElementById("owner").value,
                "prezime": document.getElementById("ownerL").value,
                "mesec" : month.options[month.selectedIndex].text,
                "godina" : year.options[year.selectedIndex].text
            }

            return data;
        }

        $scope.submit = function(){
            var poruka = mainService.validate();
            if(poruka!="yeet")
                document.getElementById("poruka").innerHTML  = poruka;
            else{
                document.getElementById("poruka").innerHTML  = "";
                var payload = prepareData();
                sendData(payload);

            }

        }





    }
]);