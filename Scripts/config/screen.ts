module config {
    export class Screen {
        static WIDTH:number = window.innerWidth;
        static HEIGHT:number = window.innerHeight;
        static RATIO:number = window.innerWidth / window.innerHeight;
    }
    
    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
<<<<<<< HEAD
        public static INSTRUCTION1: number = 1;
        public static INSTRUCTION2: number = 2;
        public static INSTRUCTION3: number = 3;
        public static PLAY: number = 4;
        public static GAMESCENE2: number = 5;
        public static GAMESCENE3: number = 6;        
        public static OVER: number = 7;
        public static EXIT: number = 8;
=======
        public static INSTRUCTION: number = 1;
        public static PLAY: number = 2;
        public static PLAY2: number = 3;
        public static PLAY3: number = 4;
        public static EXIT: number = 5;
        public static OVER: number = 6;
>>>>>>> origin/master
        
    }
    
}