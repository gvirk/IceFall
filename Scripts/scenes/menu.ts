module scenes {
    /**
     * Menu Scene extends scenes.Scene superclass is used to
     * create a custom menu for the THREEJS Game
     * 
     * @class Menu
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _startButton {createjs.Bitmap}
     */
    export class Menu extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _gameLabel: createjs.Text;
        private _companyLogo: createjs.Bitmap;
        private _startButton: createjs.Bitmap;
        private _instructionButton: createjs.Bitmap;

        private spotLight: SpotLight;

        private coinGeometry: Geometry;
        private coinMaterial: Physijs.Material;
        private coins: Physijs.ConcaveMesh[];
        private coinCount: number;

        /**
         * Empty Constructor - calls _initialize and start methods
         * 
         * @constructor
         */
        constructor() {
            super();

            this._initialize();
            this.start();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++

        private _setupCanvas(): void {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#000000";
            canvas.style.opacity = "0.5";
            canvas.style.position = "absolute";
        }

        /**
         * This method sets up default values for class member variables
         * and objects
         * 
         * @method _initialize
         * @return void
         */
        private _initialize(): void {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";

            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);

            this.coinCount = 1;
        }

        /**
         * Add a spotLight to the scene
         * 
         * @method addSpotLight
         * @return void
         */
        private addSpotLight(): void {
            // Spot Light
            this.spotLight = new SpotLight(0xffffff);
            this.spotLight.position.set(20, 40, -15);
            this.spotLight.castShadow = true;
            this.spotLight.intensity = 2;
            this.spotLight.lookAt(new Vector3(0, 0, 0));
            this.spotLight.shadowCameraNear = 2;
            this.spotLight.shadowCameraFar = 200;
            this.spotLight.shadowCameraLeft = -5;
            this.spotLight.shadowCameraRight = 5;
            this.spotLight.shadowCameraTop = 5;
            this.spotLight.shadowCameraBottom = -5;
            this.spotLight.shadowMapWidth = 2048;
            this.spotLight.shadowMapHeight = 2048;
            this.spotLight.shadowDarkness = 0.5;
            this.spotLight.name = "Spot Light";
            this.add(this.spotLight);
            console.log("Added spotLight to scene");

        }

        public sound(): void {
            createjs.Sound.stop();
            createjs.Sound.play("menu");

        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {
            // Scene changes for Physijs
            this.name = "Menu Scene";
            this.setGravity(new THREE.Vector3(0, 0, 0));

            this.sound();
            // Add Game Label
            this._gameLabel = new createjs.Text(
                "Ice Fall",
                "120px Raymond Larabie",
                "#ffffff");
            this._gameLabel.regX = this._gameLabel.getMeasuredWidth() * 0.5;
            this._gameLabel.regY = this._gameLabel.getMeasuredLineHeight() * 0.5;
            this._gameLabel.x = config.Screen.WIDTH * 0.5;
            this._gameLabel.y = config.Screen.HEIGHT * 0.2;
            this._stage.addChild(this._gameLabel);
            console.log("Added Game Label to the scene");

            // Add Company Logo
            this._companyLogo = new createjs.Bitmap(assets.getResult("CompanyLogo"));
            this._companyLogo.regX = this._companyLogo.getBounds().width * 0.5;
            this._companyLogo.regY = this._companyLogo.getBounds().height * 0.5;
            this._companyLogo.x = config.Screen.WIDTH * 0.5;
            this._companyLogo.y = (config.Screen.HEIGHT * 0.45);
            this._stage.addChild(this._companyLogo);
            console.log("Added CompanyLogo to the Scene");

            // Add Start Button
            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = this._startButton.getBounds().height * 0.5;
            this._startButton.x = config.Screen.WIDTH * 0.25;
            this._startButton.y = (config.Screen.HEIGHT * 0.6) + 100;
            this._stage.addChild(this._startButton);
            console.log("Added Start Button to the Scene");

            // Add Instruction Button
            this._instructionButton = new createjs.Bitmap(assets.getResult("InstructionButton"));
            this._instructionButton.regX = this._instructionButton.getBounds().width * 0.5;
            this._instructionButton.regY = this._instructionButton.getBounds().height * 0.5;
            this._instructionButton.x = config.Screen.WIDTH * 0.75;
            this._instructionButton.y = (config.Screen.HEIGHT * 0.6) + 100;
            this._stage.addChild(this._instructionButton);
            console.log("Added Instruction Button to the Scene");

            this._startButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._startButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1;
            });

            this._startButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.PLAY1;
                changeScene();
            });

            this._instructionButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._instructionButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1;
            });

            this._instructionButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.INSTRUCTION;
                changeScene();
            });

            // Add Spot Light to the scene
            this.addSpotLight();


            camera.position.set(0, 0, -20);
            camera.lookAt(new Vector3(0, 0, 0));
        }

        /**
         * The update method updates the animation loop and other objects
         * 
         * @method update
         * @return void
         */
        public update(): void {

            this._stage.update();

            this.simulate();
        }

        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            this._setupCanvas();
        }
    }
}