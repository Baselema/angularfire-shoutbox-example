/**
 * @Model
 */
function Shout(text) {
    this.text = text;
    this.timestamp = Firebase.ServerValue.TIMESTAMP;
}

/**
 * @WebComponent
 */
APP.directive("shoutbox", function () {

    /**
     * @WebComponentController
     */
    ShoutboxWebComponentCtrl.$inject = ["$scope", "shoutsDao"];
    function ShoutboxWebComponentCtrl($scope, shoutsDao) {
        $scope.shouts = shoutsDao.$asArray();
        $scope.input  = "";

        $scope.forceScrolling = false;

        $scope.addShout = function () {
            if ($scope.input) {
                var shout = new Shout($scope.input);
                $scope.shouts.$add(shout);
                $scope.forceScrolling = true;
                $scope.input = "";
            }
        };

        $scope.$on("followedAppendedContent", function (event, attrs) {
            if (attrs == "shouts-list") {
                $scope.forceScrolling = false;
            }
        });
    }

    return {
        "restrict"    : "E",
        "replace"     : true,
        "templateUrl" : "webcomponents/shoutbox/shoutbox.tpl.html",
        "controller"  : ShoutboxWebComponentCtrl
    };
});