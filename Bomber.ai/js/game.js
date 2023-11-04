var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    render: {
        pixelArt: true // This will keep the crisp pixel look when scaling
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#ffffff'
};

var game = new Phaser.Game(config);

function preload () {
    this.load.spritesheet('game_assets', 'img/default.png', { 
        frameWidth: 17, 
        frameHeight: 22,
        margin:1,
        spacing:3
    });
}

function create () {
    // Assuming the original sprite size is 18x23 pixels
    var scale = 2; // The scale factor
    this.scale.on('resize', resize, this);

    // Create player 1
    this.player1 = this.physics.add.sprite(100, 450, 'game_assets', 0).setScale(scale);
    // Create player 2
    this.player2 = this.physics.add.sprite(200, 450, 'game_assets', 16).setScale(scale);

    createAnimations.call(this);

    // Set up controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set up controls for player 2 with WASD keys
    this.WASD = {
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
}

function resize(gameSize, baseSize, displaySize, resolution) {
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);
    
    // If you have any other UI elements or game objects that need to be manually repositioned,
    // you can do it here using the new width and height for reference.
}
window.addEventListener('resize', () => game.scale.refresh());

function update () {
    // Handle player 1 movement
    if (this.cursors.left.isDown) {
        this.player1.setVelocityX(-160);
        this.player1.anims.play('player1_left', true);
    } else if (this.cursors.right.isDown) {
        this.player1.setVelocityX(160);
        this.player1.anims.play('player1_right', true);
    } else if (this.cursors.up.isDown) {
        this.player1.setVelocityY(-160);
        this.player1.anims.play('player1_up', true);
    } else if (this.cursors.down.isDown) {
        this.player1.setVelocityY(160);
        this.player1.anims.play('player1_down', true);
    } else {
        this.player1.setVelocityX(0);
        this.player1.setVelocityY(0);
        this.player1.anims.stop();
    }

    // Handle player 2 movement
    if (this.WASD.left.isDown) {
        this.player2.setVelocityX(-160);
        this.player2.anims.play('player2_left', true);
    } else if (this.WASD.right.isDown) {
        this.player2.setVelocityX(160);
        this.player2.anims.play('player2_right', true);
    } else if (this.WASD.up.isDown) {
        this.player2.setVelocityY(-160);
        this.player2.anims.play('player2_up', true);
    } else if (this.WASD.down.isDown) {
        this.player2.setVelocityY(160);
        this.player2.anims.play('player2_down', true);
    } else {
        this.player2.setVelocityX(0);
        this.player2.setVelocityY(0);
        this.player2.anims.stop();
    }
}

function createAnimations() {
    // Player 1 animations
    this.anims.create({
        key: 'player1_down',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });    

    this.anims.create({
        key: 'player1_up',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 3, end: 5 }),
        frameRate: 5,
        repeat: -1
    });    

    this.anims.create({
        key: 'player1_right',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 6, end: 8 }),
        frameRate: 5,
        repeat: -1
    });    

    this.anims.create({
        key: 'player1_left',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 9, end: 11 }),
        frameRate: 5,
        repeat: -1
    });    

    // Player 2 animations
    this.anims.create({
        key: 'player2_down',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 16, end: 18 }),
        frameRate: 5,
        repeat: -1
    });    

    this.anims.create({
        key: 'player2_up',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 19, end: 21 }),
        frameRate: 5,
        repeat: -1
    });    

    this.anims.create({
        key: 'player2_right',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 22, end: 24 }),
        frameRate: 5,
        repeat: -1
    });    

    this.anims.create({
        key: 'player2_left',
        frames: this.anims.generateFrameNumbers('game_assets', { start: 25, end: 27 }),
        frameRate: 5,
        repeat: -1
    });  
}