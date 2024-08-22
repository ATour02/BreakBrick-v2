import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create(data) {
    this.bricks = 0;
    this.velocityX = data.velocityX || 350;
    this.nivel = data.nivel || 1; // Recibir el nivel pasado o iniciar en 1 si no hay dato
    
    // Background
    this.cameras.main.setBackgroundColor("#FFF8DC");

    // Pala
    this.rectangle = this.add.rectangle(400, 700, 140, 30, 0x0000FF);

    // Pelota
    this.ball = this.add.circle(350, 50, 20, 0x00FF00);

    // Físicas para la pala
    this.physics.add.existing(this.rectangle);
    this.rectangle.body.setImmovable(true);
    this.rectangle.body.setCollideWorldBounds(true);

    // Físicas para la bola
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1);
    this.ball.body.setVelocity(this.velocityX, 300);

    // Obstáculos
    this.obstacle = this.add.group({
      classType: Phaser.GameObjects.Rectangle,
      runChildUpdate: true
    });

    const filas = 2;
    const colum = 3;
    const obstacleWidth = 200;
    const obstacleHeight = 50;
    const space = 60;

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < colum; j++) {
        const posX = 300 + j * (obstacleWidth + space);
        const posY = 150 + i * (obstacleHeight + space);
        let obstacle = this.obstacle.create(posX, posY, null);
        obstacle.setSize(obstacleWidth, obstacleHeight);
        obstacle.setFillStyle(0x00FFFF);
        this.physics.add.existing(obstacle);
        obstacle.body.setImmovable(true);
      }
    }

    // Pérdida
    this.final = this.add.rectangle(600, 900, 1200, 15, 0xFF0000);
    this.physics.add.existing(this.final);
    this.final.body.setCollideWorldBounds(true);

    // Creación de teclas de movimiento
    this.cursor = this.input.keyboard.createCursorKeys();

    // Colliders
    this.physics.add.collider(this.rectangle, this.ball, null, null, this);

    this.physics.add.collider(this.ball, this.obstacle, this.handleCollision = (ball, obstacle) => {
      obstacle.destroy();
      this.bricks += 1;
      console.log("Colisión " + this.bricks);

      // Verificar si se destruyeron 6 bloques
      if (this.bricks >= 6) {
        this.nivel += 1; // Aumentar el nivel
        this.velocityX *= 1.1;
        this.scene.restart({ nivel: this.nivel, velocityX: this.velocityX }); // Reiniciar la escena y pasar el nivel actualizado
      }
    }, null, this);

    this.physics.add.collider(this.ball, this.final, this.resLevel = (ball, final) => {
      console.log("Perdiste");
      this.nivel = 1;
      this.scene.restart();
    }, null, this);

    // Texto de Seguimiento
    this.nivelText = this.add.text(50, 50, "Nivel ", {
      font: '16px Arial',
      fill: '#000000' // Color del texto en negro
    });

    this.bricksText = this.add.text(50, 100, "Bloques Destruidos", {
      font: '16px Arial',
      fill: '#000000' // Color del texto en negro
    });
  }

  update() {
    // Movimiento de la pala
    this.input.on('pointermove', (pointer) => {
      this.rectangle.x = pointer.x;
    });

    // Actualizar texto de nivel y bloques destruidos
    this.nivelText.setText("Nivel " + this.nivel);
    this.bricksText.setText("Bloques Destruidos " + this.bricks);
  }
}

