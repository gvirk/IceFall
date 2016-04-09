    private  spotLight: SpotLight;
    private  groundGeometry: CubeGeometry;
    private  groundPhysicsMaterial: Physijs.Material;
    private  groundMaterial: PhongMaterial;
    private  ground: Physijs.Mesh;
    private  groundTexture: Texture;
    private  groundTextureNormal: Texture;
    private  clock: Clock;

    // THREEJS and PHYSIJS Objects
    private  playerGeometry: CubeGeometry;
    private  playerMaterial: Physijs.Material;
    private  player: Physijs.Mesh;
    private  sphereGeometry: SphereGeometry;
    private  sphereMaterial: Physijs.Material;
    private  sphere: Physijs.Mesh;
    private  keyboardControls: objects.KeyboardControls;
    private  mouseControls: objects.MouseControls;
    private  isGrounded: boolean;
    private  velocity: Vector3 = new Vector3(0, 0, 0);
    private  prevTime: number = 0;
    private  directionLineMaterial: LineBasicMaterial;
    private  directionLineGeometry: Geometry;
    private  directionLine: Line;

    private  coinGeometry: Geometry;
    private  coinMaterial: Physijs.Material;

    private  coins: Physijs.ConcaveMesh[];
    private  cointCount: number = 10;
    
    private  fireGeometry: Geometry;
    private  fireMaterial: Physijs.Material;

    private  fires: Physijs.ConcaveMesh[];
    private  fireCount: number = 5;
    
    private  deathPlaneGeometry: CubeGeometry;
    private  deathPlaneMaterial: Physijs.Material;
    private  deathPlane: Physijs.Mesh;

    // CreateJS Related private iables
    private  assets: createjs.LoadQueue;
    private  canvas: HTMLElement;
    private  stage: createjs.Stage;
    private  scoreLabel: createjs.Text;
    private  livesLabel: createjs.Text;
    private  scoreValue: number;
    private  livesValue: number;