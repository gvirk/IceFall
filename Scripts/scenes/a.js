spotLight: SpotLight;
groundGeometry: CubeGeometry;
groundPhysicsMaterial: Physijs.Material;
groundMaterial: PhongMaterial;
ground: Physijs.Mesh;
groundTexture: Texture;
groundTextureNormal: Texture;
clock: Clock;
playerGeometry: CubeGeometry;
playerMaterial: Physijs.Material;
player: Physijs.Mesh;
sphereGeometry: SphereGeometry;
sphereMaterial: Physijs.Material;
sphere: Physijs.Mesh;
keyboardControls: objects.KeyboardControls;
mouseControls: objects.MouseControls;
isGrounded: boolean;
velocity: Vector3 = new Vector3(0, 0, 0);
prevTime: number = 0;
directionLineMaterial: LineBasicMaterial;
directionLineGeometry: Geometry;
directionLine: Line;
coinGeometry: Geometry;
coinMaterial: Physijs.Material;
coins: Physijs.ConcaveMesh[];
cointCount: number = 10;
fireGeometry: Geometry;
fireMaterial: Physijs.Material;
fires: Physijs.ConcaveMesh[];
fireCount: number = 5;
deathPlaneGeometry: CubeGeometry;
deathPlaneMaterial: Physijs.Material;
deathPlane: Physijs.Mesh;
assets: createjs.LoadQueue;
canvas: HTMLElement;
stage: createjs.Stage;
scoreLabel: createjs.Text;
livesLabel: createjs.Text;
scoreValue: number;
livesValue: number;
//# sourceMappingURL=a.js.map