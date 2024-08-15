import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }
  create() {
    this.bricks = 0;
    this.velocityX = 350;
    this.nivel = 1;
    // Background
    this.cameras.main.setBackgroundColor("#FFF8DC")
     //Pala
     this.rectangle = this.add.rectangle(400, 700, 140, 30, 0x0000FF);
     //Pelota
     this.ball = this.add.circle(350,50,20,0x00FF00);
    //Fisicas pala
     this.physics.add.existing(this.rectangle);
     this.rectangle.body.setImmovable(true);
     this.rectangle.body.setCollideWorldBounds(true);
     //fisicas bola
     this.physics.add.existing(this.ball);
     this.ball.body.setCollideWorldBounds(true);
     this.ball.body.setBounce(1);
     this.ball.body.setVelocity(this.velocityX, 300);
     

     // Obstaculo
     /*this.obstacle = this.add.rectangle(300,200,140,100,0x00FFFF),
     this.physics.add.existing(this.obstacle);
     this.obstacle.body.setImmovable(true);
     this.obstacle.body.setBounce(1); */
     this.obstacle = this.add.group({
      classType: Phaser.GameObjects.Rectangle,
      runChildUpdate: true
     });
        const filas = 2; // Número de filas
        const colum = 3; // Número de columnas
        const obstacleWidth = 200; // Ancho de cada obstáculo
        const obstacleHeight = 50; // Altura de cada obstáculo
        const space = 60; // Espacio entre los obstáculos
        for (let i = 0; i < filas; i++) {
          for (let j = 0; j < colum; j++) {
              const posX = 300 + j * (obstacleWidth + space);
              const posY = 150 + i * (obstacleHeight + space);
        let obstacle = this.obstacle.create(posX, posY, null);
      obstacle.setSize(obstacleWidth, obstacleHeight)
        obstacle.setFillStyle(0x00FFFF);
        this.physics.add.existing(obstacle);
        obstacle.body.setImmovable(true);
       
      }}
     //Perder
     this.final = this.add.rectangle(600,900, 1200, 15, 0xFF0000)
     this.physics.add.existing(this.final);
     this.final.body.setCollideWorldBounds(true);
     //Creacion de teclas de movimiento
     this.cursor = this.input.keyboard.createCursorKeys();
    //Colliders 
     this.physics.add.collider(
      this.rectangle,
      this.ball,
      null,
      null,
      this
    )
   this.physics.add.collider(
    this.ball,
    this.obstacle,
    this.handleCollision = (ball, obstacle) => {
      obstacle.destroy();
      this.bricks += 1
      console.log("colision" + this.bricks);

    },
    null,
    this
   )
   this.physics.add.collider(
    this.ball,
    this.final,
    this.resLevel = (ball, final) => {
      console.log("Perdiste");
      this.scene.restart();
    },
    null,
    this
   );
   //Texto de Seguimiento
    this.add.text(50, 50, "Nivel Inicial", {
      font: '16px Arial',
      fill: '#000000' // Color del texto en blanco
  });

  }

  update() {
//Movimiento pala
    /*const speed = 500;
    this.rectangle.body.setVelocity(0);
        if (this.cursor.left.isDown) {
            this.rectangle.body.setVelocityX(-speed);
        } else if (this.cursor.right.isDown) {
            this.rectangle.body.setVelocityX(speed);
        }
        */
        this.input.on('pointermove', (pointer) => {
          this.rectangle.x = pointer.x;
      });
    
} 
}

