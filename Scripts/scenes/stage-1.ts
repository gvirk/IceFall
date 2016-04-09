module scenes {
    /**
     * The Play class is where the main action occurs for the game
     * 
     * @class Play
     * @param havePointerLock {boolean}
     */
    export class Stage extends scenes.Scene {
        private havePointerLock: boolean;
        private element: any;

        private blocker: HTMLElement;
        private instructions: HTMLElement;

        private spotLight: SpotLight;

        private frontMaterial: PhongMaterial;

        private glassTexture: Texture;


        private bodyTexture: Texture;
        private frontTexture: Texture;
        private lLightTexture: Texture;
        private rLightTexture: Texture;
        private breakLightTexture: Texture;
        private frontTextureNormal: Texture;

        private playerGeometry1: CubeGeometry;

        private playersGeometry: SphereGeometry;

        private playerGeometrya: CubeGeometry;
        private playerGeometryb: CubeGeometry;

        private playerGeometryc: CubeGeometry;
        private playerGeometryd: CubeGeometry;
        private playerGeometrye: CubeGeometry;

        private playerMaterial: Physijs.Material;
        private playerMaterial1: Physijs.Material;
        private playerMateriala: Physijs.Material;
        private playerMaterialb: Physijs.Material;
        private playerMaterialc: Physijs.Material;
        private playerMateriald: Physijs.Material;
        private playerMateriale: Physijs.Material;

        private player: Physijs.Mesh;
        private player1: Physijs.Mesh;
        private playera: Physijs.Mesh;
        private playerb: Physijs.Mesh;
        private playerbb: Physijs.Mesh;
        private playerc: Physijs.Mesh;
        private playerd: Physijs.Mesh;
        private playere: Physijs.Mesh;
        private playerf: Physijs.Mesh;

        private sphereGeometry: SphereGeometry;
        private sphereMaterial: Physijs.Material;
        private sphere: Physijs.Mesh;

        private cubeTexture: Texture;
        private cubeTextureNormal: Texture;

        private groundGeometry: CubeGeometry;
        private groundPhysicsMaterial: Physijs.Material;
        private groundMaterial: PhongMaterial;
        private ground: Physijs.Mesh;
        private groundTexture: Texture;
        private groundTextureNormal: Texture;

        private wallPhysicsMaterial: Physijs.Material;
        private wallMaterial: PhongMaterial;
        private wallTexture: Texture;
        private wallTextureNormal: Texture;

        private boundary1Geometry: CubeGeometry;
        private boundary1: Physijs.Mesh;

        private boundary2Geometry: CubeGeometry;
        private boundary2: Physijs.Mesh;

        private boundary3Geometry: CubeGeometry;
        private boundary3: Physijs.Mesh;

        private boundary4Geometry: CubeGeometry;
        private boundary4: Physijs.Mesh;

        private boundary5Geometry: CubeGeometry;
        private boundary5: Physijs.Mesh;

        private iw1Geometry: CubeGeometry;
        private iw1: Physijs.Mesh;

        private iw2Geometry: CubeGeometry;
        private iw2: Physijs.Mesh;

        private iw3Geometry: CubeGeometry;
        private iw3: Physijs.Mesh;

        private iw4Geometry: CubeGeometry;
        private iw4: Physijs.Mesh;

        private iw5Geometry: CubeGeometry;
        private iw5: Physijs.Mesh;

        private iw6Geometry: CubeGeometry;
        private iw6: Physijs.Mesh;

        private iw7Geometry: CubeGeometry;
        private iw7: Physijs.Mesh;

        private iw8Geometry: CubeGeometry;
        private iw8: Physijs.Mesh;

        private iw8aGeometry: CubeGeometry;
        private iw8a: Physijs.Mesh;

        private iw9Geometry: CubeGeometry;
        private iw9: Physijs.Mesh;

        private iw10Geometry: CubeGeometry;
        private iw10: Physijs.Mesh;

        private iw11Geometry: CubeGeometry;
        private iw11: Physijs.Mesh;

        private iw12Geometry: CubeGeometry;
        private iw12: Physijs.Mesh;

        private iw13Geometry: CubeGeometry;
        private iw13: Physijs.Mesh;

        private iw14Geometry: CubeGeometry;
        private iw14: Physijs.Mesh;

        private iw15Geometry: CubeGeometry;
        private iw15: Physijs.Mesh;

        private iw16Geometry: CubeGeometry;
        private iw16: Physijs.Mesh;

        private iw17Geometry: CubeGeometry;
        private iw17: Physijs.Mesh;

        private iw18Geometry: CubeGeometry;
        private iw18: Physijs.Mesh;

        private enemyGeometry: SphereGeometry;
        private enemyMaterial: Physijs.Material;
        private enemy: Physijs.Mesh;

        // private playerGeometry: CubeGeometry;
        // private playerMaterial: Physijs.Material;
        // private player: Physijs.Mesh;

        private keyboardControls: objects.KeyboardControls;
        private mouseControls: objects.MouseControls;
        private isGrounded: boolean;

        private coinGeometry: Geometry;
        private coinMaterial: Physijs.Material;
        private coins: Physijs.ConcaveMesh[];
        private coinCount: number;

        private deathPlaneGeometry: CubeGeometry;
        private deathPlaneMaterial: Physijs.Material;
        private deathPlane: Physijs.Mesh;

        private velocity: Vector3;
        private prevTime: number;
        private clock: Clock;

        private stage: createjs.Stage;
        private scoreLabel: createjs.Text;
        private livesLabel: createjs.Text;

   
   // Instantiate Scene Object
   private renderer: Renderer;
   private  camera: PerspectiveCamera;
   private  stats: Stats;

    // THREEJS and PHYSIJS Objects
    private  playerGeometry: CubeGeometry;
    private  directionLineMaterial: LineBasicMaterial;
    private  directionLineGeometry: Geometry;
    private  directionLine: Line;
    private  cointCount: number = 10;
    
    private  fireGeometry: Geometry;
    private  fireMaterial: Physijs.Material;

    private  fires: Physijs.ConcaveMesh[];
    private  fireCount: number = 5;
    

    // CreateJS Related private iables
    private  assets: createjs.LoadQueue;
    private  canvas: HTMLElement;
    private  scoreValue: number;
    private  livesValue: number;


    private function preload(): void {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", init, this);
        assets.loadManifest(manifest);
    }

    function setupCanvas(): void {
        canvas = document.getElementById("canvas");
        canvas.setAttribute("width", config.Screen.WIDTH.toString());
        canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
        canvas.style.backgroundColor = "#000000";
        stage = new createjs.Stage(canvas);
    }

    function setupScoreboard(): void {
        // initialize  score and lives values
        scoreValue = 0;
        livesValue = 5;

        // Add Lives Label
        livesLabel = new createjs.Text(
            "LIVES: " + livesValue,
            "40px Consolas",
            "#ffffff"
        );
        livesLabel.x = config.Screen.WIDTH * 0.1;
        livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.addChild(livesLabel);
        console.log("Added Lives Label to stage");

        // Add Score Label
        scoreLabel = new createjs.Text(
            "SCORE: " + scoreValue,
            "40px Consolas",
            "#ffffff"
        );
        scoreLabel.x = config.Screen.WIDTH * 0.8;
        scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.addChild(scoreLabel);
        console.log("Added Score Label to stage");
    }

    function init(): void {
        // Create to HTMLElements
        blocker = document.getElementById("blocker");
        instructions = document.getElementById("instructions");

        // Set Up CreateJS Canvas and Stage
        setupCanvas();

        // Set Up Scoreboard
        setupScoreboard();

        //check to see if pointerlock is supported
        havePointerLock = 'pointerLockElement' in document ||
            'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;

        // Instantiate Game Controls
        keyboardControls = new objects.KeyboardControls();
        mouseControls = new objects.MouseControls();

        // Check to see if we have pointerLock
        if (havePointerLock) {
            element = document.body;

            instructions.addEventListener('click', () => {

                // Ask the user for pointer lock
                console.log("Requesting PointerLock");

                element.requestPointerLock = element.requestPointerLock ||
                    element.mozRequestPointerLock ||
                    element.webkitRequestPointerLock;

                element.requestPointerLock();
            });

            document.addEventListener('pointerlockchange', pointerLockChange);
            document.addEventListener('mozpointerlockchange', pointerLockChange);
            document.addEventListener('webkitpointerlockchange', pointerLockChange);
            document.addEventListener('pointerlockerror', pointerLockError);
            document.addEventListener('mozpointerlockerror', pointerLockError);
            document.addEventListener('webkitpointerlockerror', pointerLockError);
        }

        // Scene changes for Physijs
        scene.name = "Main";
        scene.fog = new THREE.Fog(0xffffff, 0, 750);
        scene.setGravity(new THREE.Vector3(0, -10, 0));

        scene.addEventListener('update', () => {
            scene.simulate(undefined, 2);
        });

        // setup a THREE.JS Clock object
        clock = new Clock();

        setupRenderer(); // setup the default renderer

        setupCamera(); // setup the camera

        // Spot Light
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(20, 40, -15);
        spotLight.castShadow = true;
        spotLight.intensity = 2;
        spotLight.lookAt(new Vector3(0, 0, 0));
        spotLight.shadowCameraNear = 2;
        spotLight.shadowCameraFar = 200;
        spotLight.shadowCameraLeft = -5;
        spotLight.shadowCameraRight = 5;
        spotLight.shadowCameraTop = 5;
        spotLight.shadowCameraBottom = -5;
        spotLight.shadowMapWidth = 2048;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowDarkness = 0.5;
        spotLight.name = "Spot Light";
        this.add(this.spotLight);
        console.log("Added spotLight to scene");

        // Ground Object
        groundTexture = new THREE.TextureLoader().load('../../Assets/images/brickFloor.jpg');
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(8, 8);

        groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/GravelCobbleNormal.png');
        groundTextureNormal.wrapS = THREE.RepeatWrapping;
        groundTextureNormal.wrapT = THREE.RepeatWrapping;
        groundTextureNormal.repeat.set(8, 8);

        groundMaterial = new PhongMaterial();
        groundMaterial.map = groundTexture;
        groundMaterial.bumpMap = groundTextureNormal;
        groundMaterial.bumpScale = 0.2;

        groundGeometry = new BoxGeometry(32, 1, 32);
        groundPhysicsMaterial = Physijs.createMaterial(groundMaterial, 0, 0);
        ground = new Physijs.ConvexMesh(groundGeometry, groundPhysicsMaterial, 0);
        ground.receiveShadow = true;
        ground.name = "Ground";
        this.add(this.ground);
        console.log("Added Burnt Ground to scene");

        // Player Object
        playerGeometry = new BoxGeometry(2, 4, 2);
        playerMaterial = Physijs.createMaterial(new LambertMaterial({map: THREE.ImageUtils.loadTexture("../../Assets/images/water.jpg")}), 0.4, 0);

        player = new Physijs.BoxMesh(playerGeometry, playerMaterial, 1);
        player.position.set(0, 30, 10);
        player.receiveShadow = true;
        player.castShadow = true;
        player.name = "Player";
        this.add(this.player);
        console.log("Added Player to Scene");

        // Add custom coin imported from Blender
        addCoinMesh();
        
        // Add custom fire imported from Blender
        addFireMesh();

        addDeathPlane();

        // Collision Check
        player.addEventListener('collision', (eventObject) => {
            if (eventObject.name === "Ground") {
                isGrounded = true;
                createjs.Sound.play("land");
            }
            if (eventObject.name === "Coin") {
                createjs.Sound.play("coin");
                scene.remove(eventObject);
                setCoinPosition(eventObject);
                scoreValue += 100;
                scoreLabel.text = "SCORE: " + scoreValue;
            }
            if (eventObject.name === "Fire") {
                createjs.Sound.play("fire");
                scene.remove(eventObject);
                setFirePosition(eventObject);
                livesValue--;
                scoreLabel.text = "SCORE: " + scoreValue;
            }
            
            if(eventObject.name === "DeathPlane") {
                createjs.Sound.play("hit");
                livesValue--;
                livesLabel.text = "LIVES: " + livesValue;
                scene.remove(player);
                player.position.set(0, 30, 10);
                this.add(this.player);
            }
        });

        // Add DirectionLine
        directionLineMaterial = new LineBasicMaterial({ color: 0xffff00 });
        directionLineGeometry = new Geometry();
        directionLineGeometry.vertices.push(new Vector3(0, 0, 0)); // line origin
        directionLineGeometry.vertices.push(new Vector3(0, 0, -50)); // end of the line
        directionLine = new Line(directionLineGeometry, directionLineMaterial);
        player.add(directionLine);
        console.log("Added DirectionLine to the Player");

        // create parent-child relationship with camera and player
        player.add(camera);
        camera.position.set(0, 1, 0);

        // Sphere Object
        sphereGeometry = new SphereGeometry(2, 32, 32);
        sphereMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
        sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial, 1);
        sphere.position.set(0, 60, 5);
        sphere.receiveShadow = true;
        sphere.castShadow = true;
        sphere.name = "Sphere";
        //this.add(this.sphere);
        //console.log("Added Sphere to Scene");

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        scene.simulate();

        window.addEventListener('resize', onWindowResize, false);
    }

    function setCenter ( geometry:Geometry ): Vector3 {

		geometry.computeBoundingBox();

		var bb = geometry.boundingBox;

		var offset = new THREE.Vector3();

		offset.addVectors( bb.min, bb.max );
		offset.multiplyScalar( -0.5 );

		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( offset.x, offset.y, offset.z ) );
		geometry.computeBoundingBox();

		return offset;
	}

    function addDeathPlane():void {
        deathPlaneGeometry = new BoxGeometry(100, 1, 100);
        deathPlaneMaterial = Physijs.createMaterial(new MeshBasicMaterial({color: 0xff0000}), 0.4, 0.6);
       
        deathPlane =  new Physijs.BoxMesh(deathPlaneGeometry, deathPlaneMaterial, 0);
        deathPlane.position.set(0, -10, 0);
        deathPlane.name = "DeathPlane";
        this.add(this.deathPlane);
}
    
    // Add the Coin to the scene
    function addCoinMesh(): void {
        
        coins = new Array<Physijs.ConvexMesh>(); // Instantiate a convex mesh array

        var coinLoader = new THREE.JSONLoader().load("../../Assets/imported/coin.json", function(geometry: THREE.Geometry) {
            var phongMaterial = new PhongMaterial({ color: 0xE7AB32 });
            phongMaterial.emissive = new THREE.Color(0xE7AB32);
            
            var coinMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
            
            for(var count:number = 0; count < cointCount; count++) {
                coins[count] = new Physijs.ConvexMesh(geometry, coinMaterial);     
                coins[count].receiveShadow = true;
                coins[count].castShadow = true;
                coins[count].name = "Coin";
                setCoinPosition(coins[count]);
            }
        });

        console.log("Added Coin Mesh to Scene");
    }
    
    // Add the Fire to the scene
    function addFireMesh(): void {
        
        fires = new Array<Physijs.ConvexMesh>(); // Instantiate a convex mesh array

        var fireLoader = new THREE.JSONLoader().load("../../Assets/imported/sphere.json", function(geometry: THREE.Geometry) {
            var phongMaterial = new PhongMaterial({ color: 0xFF0000 });
            phongMaterial.emissive = new THREE.Color(0xFF0000);
            
            var fireMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
            
            for(var count:number = 0; count < fireCount; count++) {
                fires[count] = new Physijs.ConvexMesh(geometry, fireMaterial);     
                fires[count].receiveShadow = true;
                fires[count].castShadow = true;
                fires[count].name = "Fire";
                setFirePosition(fires[count]);
            }
        });

        console.log("Added Fire Mesh to Scene");
    }

    // Set Coin Position
    function setCoinPosition(coin:Physijs.ConvexMesh): void {
        var randomPointX: number = Math.floor(Math.random() * 20) - 10;
        var randomPointZ: number = Math.floor(Math.random() * 20) - 10;
        coin.position.set(randomPointX, 10, randomPointZ);
        this.add(this.coin);
    }
    
    // Set Fire Position
    function setFirePosition(fire:Physijs.ConvexMesh): void {
        var randomPointX: number = Math.floor(Math.random() * 20) - 10;
        var randomPointZ: number = Math.floor(Math.random() * 20) - 10;
        fire.position.set(randomPointX, 10, randomPointZ);
        this.add(this.fire);
    }

    //PointerLockChange Event Handler
    function pointerLockChange(event): void {
        if (document.pointerLockElement === element) {
            // enable our mouse and keyboard controls
            keyboardControls.enabled = true;
            mouseControls.enabled = true;
            blocker.style.display = 'none';
        } else {
            // disable our mouse and keyboard controls
            keyboardControls.enabled = false;
            mouseControls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
            console.log("PointerLock disabled");
        }
    }

    //PointerLockError Event Handler
    function pointerLockError(event): void {
        instructions.style.display = '';
        console.log("PointerLock Error Detected!!");
    }

    // Window Resize Event Handler
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        canvas.style.width = "100%";
        livesLabel.x = config.Screen.WIDTH * 0.1;
        livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        scoreLabel.x = config.Screen.WIDTH * 0.8;
        scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.update();
    }

    // Add Frame Rate Stats to the Scene
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();

        coins.forEach(coin => {
            coin.setAngularFactor(new Vector3(0, 0, 0));
            coin.setAngularVelocity(new Vector3(0, 1, 0));
        });
        
        fires.forEach(fire => {
            fire.setAngularFactor(new Vector3(0, 0, 0));
            fire.setAngularVelocity(new Vector3(0, 1, 0));
        });

        checkControls();
        stage.update();

        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);

        // render the scene
        renderer.render(scene, camera);
    }


    // Check Controls Function
    function checkControls(): void {
        if (keyboardControls.enabled) {
            velocity = new Vector3();

            var time: number = performance.now();
            var delta: number = (time - prevTime) / 1000;

            if (isGrounded) {
                var direction = new Vector3(0, 0, 0);
                if (keyboardControls.moveForward) {
                    velocity.z -= 400.0 * delta;
                }
                if (keyboardControls.moveLeft) {
                    velocity.x -= 400.0 * delta;
                }
                if (keyboardControls.moveBackward) {
                    velocity.z += 400.0 * delta;
                }
                if (keyboardControls.moveRight) {
                    velocity.x += 400.0 * delta;
                }
                if (keyboardControls.jump) {
                    velocity.y += 4000.0 * delta;
                    if (player.position.y > 4) {
                        isGrounded = false;
                        createjs.Sound.play("jump"); 
                    }
                    
                }

                player.setDamping(0.7, 0.1);
                // Changing player's rotation
                player.setAngularVelocity(new Vector3(0, mouseControls.yaw, 0));
                direction.addVectors(direction, velocity);
                direction.applyQuaternion(player.quaternion);
                if (Math.abs(player.getLinearVelocity().x) < 20 && Math.abs(player.getLinearVelocity().y) < 10) {
                    player.applyCentralForce(direction);
                }

                cameraLook();

            } // isGrounded ends

            //reset Pitch and Yaw
            mouseControls.pitch = 0;
            mouseControls.yaw = 0;

            prevTime = time;
        } // Controls Enabled ends
        else {
            player.setAngularVelocity(new Vector3(0, 0, 0));
        }
    }

    // Camera Look function
    function cameraLook(): void {
        var zenith: number = THREE.Math.degToRad(90);
        var nadir: number = THREE.Math.degToRad(-90);

        var cameraPitch: number = camera.rotation.x + mouseControls.pitch;

        // Constrain the Camera Pitch
        camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);

    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        //camera.position.set(0, 10, 30);
        //camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }

    window.onload = preload;

        public update(): void {

            // this.coins.forEach(coin => {
            //     coin.setAngularFactor(new Vector3(0, 0, 0));
            //     coin.setAngularVelocity(new Vector3(0, 1, 0));
            // });

            this.checkControls();

            //this.enemyMoveAndLook();

            this.stage.update();

            if (!this.keyboardControls.paused) {
                this.simulate();
            }
        }

        /**
         * Responds to screen resizes
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        }
    }
}