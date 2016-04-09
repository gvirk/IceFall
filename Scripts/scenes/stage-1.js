var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    /**
     * The Play class is where the main action occurs for the game
     *
     * @class Play
     * @param havePointerLock {boolean}
     */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            _super.apply(this, arguments);
            this.cointCount = 10;
            this.fireCount = 5;
            this.function = preload();
        }
        return Stage;
    })(scenes.Scene);
    scenes.Stage = Stage;
    void {
        assets: assets,
        assets: .installPlugin(createjs.Sound),
        assets: .on("complete", init, this),
        assets: .loadManifest(manifest)
    };
    function setupCanvas() {
        canvas = document.getElementById("canvas");
        canvas.setAttribute("width", config.Screen.WIDTH.toString());
        canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
        canvas.style.backgroundColor = "#000000";
        stage = new createjs.Stage(canvas);
    }
    function setupScoreboard() {
        // initialize  score and lives values
        scoreValue = 0;
        livesValue = 5;
        // Add Lives Label
        livesLabel = new createjs.Text("LIVES: " + livesValue, "40px Consolas", "#ffffff");
        livesLabel.x = config.Screen.WIDTH * 0.1;
        livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.addChild(livesLabel);
        console.log("Added Lives Label to stage");
        // Add Score Label
        scoreLabel = new createjs.Text("SCORE: " + scoreValue, "40px Consolas", "#ffffff");
        scoreLabel.x = config.Screen.WIDTH * 0.8;
        scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.addChild(scoreLabel);
        console.log("Added Score Label to stage");
    }
    function init() {
        var _this = this;
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
            instructions.addEventListener('click', function () {
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
        scene.addEventListener('update', function () {
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
        playerMaterial = Physijs.createMaterial(new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Assets/images/water.jpg") }), 0.4, 0);
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
        player.addEventListener('collision', function (eventObject) {
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
            if (eventObject.name === "DeathPlane") {
                createjs.Sound.play("hit");
                livesValue--;
                livesLabel.text = "LIVES: " + livesValue;
                scene.remove(player);
                player.position.set(0, 30, 10);
                _this.add(_this.player);
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
    function setCenter(geometry) {
        geometry.computeBoundingBox();
        var bb = geometry.boundingBox;
        var offset = new THREE.Vector3();
        offset.addVectors(bb.min, bb.max);
        offset.multiplyScalar(-0.5);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(offset.x, offset.y, offset.z));
        geometry.computeBoundingBox();
        return offset;
    }
    function addDeathPlane() {
        deathPlaneGeometry = new BoxGeometry(100, 1, 100);
        deathPlaneMaterial = Physijs.createMaterial(new MeshBasicMaterial({ color: 0xff0000 }), 0.4, 0.6);
        deathPlane = new Physijs.BoxMesh(deathPlaneGeometry, deathPlaneMaterial, 0);
        deathPlane.position.set(0, -10, 0);
        deathPlane.name = "DeathPlane";
        this.add(this.deathPlane);
    }
    // Add the Coin to the scene
    function addCoinMesh() {
        coins = new Array(); // Instantiate a convex mesh array
        var coinLoader = new THREE.JSONLoader().load("../../Assets/imported/coin.json", function (geometry) {
            var phongMaterial = new PhongMaterial({ color: 0xE7AB32 });
            phongMaterial.emissive = new THREE.Color(0xE7AB32);
            var coinMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
            for (var count = 0; count < cointCount; count++) {
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
    function addFireMesh() {
        fires = new Array(); // Instantiate a convex mesh array
        var fireLoader = new THREE.JSONLoader().load("../../Assets/imported/sphere.json", function (geometry) {
            var phongMaterial = new PhongMaterial({ color: 0xFF0000 });
            phongMaterial.emissive = new THREE.Color(0xFF0000);
            var fireMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
            for (var count = 0; count < fireCount; count++) {
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
    function setCoinPosition(coin) {
        var randomPointX = Math.floor(Math.random() * 20) - 10;
        var randomPointZ = Math.floor(Math.random() * 20) - 10;
        coin.position.set(randomPointX, 10, randomPointZ);
        this.add(this.coin);
    }
    // Set Fire Position
    function setFirePosition(fire) {
        var randomPointX = Math.floor(Math.random() * 20) - 10;
        var randomPointZ = Math.floor(Math.random() * 20) - 10;
        fire.position.set(randomPointX, 10, randomPointZ);
        this.add(this.fire);
    }
    //PointerLockChange Event Handler
    function pointerLockChange(event) {
        if (document.pointerLockElement === element) {
            // enable our mouse and keyboard controls
            keyboardControls.enabled = true;
            mouseControls.enabled = true;
            blocker.style.display = 'none';
        }
        else {
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
    function pointerLockError(event) {
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
    function gameLoop() {
        stats.update();
        coins.forEach(function (coin) {
            coin.setAngularFactor(new Vector3(0, 0, 0));
            coin.setAngularVelocity(new Vector3(0, 1, 0));
        });
        fires.forEach(function (fire) {
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
    function checkControls() {
        if (keyboardControls.enabled) {
            velocity = new Vector3();
            var time = performance.now();
            var delta = (time - prevTime) / 1000;
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
    function cameraLook() {
        var zenith = THREE.Math.degToRad(90);
        var nadir = THREE.Math.degToRad(-90);
        var cameraPitch = camera.rotation.x + mouseControls.pitch;
        // Constrain the Camera Pitch
        camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        //camera.position.set(0, 10, 30);
        //camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = preload;
    update();
    void {
        // this.coins.forEach(coin => {
        //     coin.setAngularFactor(new Vector3(0, 0, 0));
        //     coin.setAngularVelocity(new Vector3(0, 1, 0));
        // });
        this: .checkControls(),
        //this.enemyMoveAndLook();
        this: .stage.update(),
        if: function () { } };
    !this.keyboardControls.paused;
    {
        this.simulate();
    }
})(scenes || (scenes = {}));
resize();
void {
    canvas: .style.width = "100%",
    this: .livesLabel.x = config.Screen.WIDTH * 0.1,
    this: .livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20,
    this: .scoreLabel.x = config.Screen.WIDTH * 0.8,
    this: .scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20,
    this: .stage.update()
};
//# sourceMappingURL=stage-1.js.map