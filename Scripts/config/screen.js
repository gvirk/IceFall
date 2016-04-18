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
<<<<<<< HEAD
        Scene.INSTRUCTION1 = 1;
        Scene.INSTRUCTION2 = 2;
        Scene.INSTRUCTION3 = 3;
        Scene.PLAY = 4;
        Scene.GAMESCENE2 = 5;
        Scene.GAMESCENE3 = 6;
        Scene.OVER = 7;
        Scene.EXIT = 8;
=======
        Scene.INSTRUCTION = 1;
        Scene.PLAY = 2;
        Scene.PLAY2 = 3;
        Scene.PLAY3 = 4;
        Scene.EXIT = 5;
        Scene.OVER = 6;
>>>>>>> origin/master
        return Scene;
    })();
    config.Scene = Scene;
})(config || (config = {}));
//# sourceMappingURL=screen.js.map