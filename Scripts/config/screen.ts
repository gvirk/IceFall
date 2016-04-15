module config {
    export class Screen {
        static WIDTH:number = window.innerWidth;
        static HEIGHT:number = window.innerHeight;
        static RATIO:number = window.innerWidth / window.innerHeight;
    }
    
    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static INSTRUCTION: number = 1;
        public static PLAY: number = 2;
        public static PLAY2: number = 3;
        public static PLAY3: number = 4;
        public static EXIT: number = 5;
        public static OVER: number = 6;
        
    }
    
}