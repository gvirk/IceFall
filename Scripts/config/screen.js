var config;
(function (config) {
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = window.innerWidth;
        Screen.HEIGHT = window.innerHeight;
        Screen.RATIO = window.innerWidth / window.innerHeight;
        return Screen;
    })();
    config.Screen = Screen;
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.INSTRUCTION = 1;
        Scene.PLAY1 = 2;
        Scene.PLAY2 = 3;
        Scene.PLAY3 = 4;
        Scene.OVER = 5;
        return Scene;
    })();
    config.Scene = Scene;
})(config || (config = {}));
//# sourceMappingURL=screen.js.map