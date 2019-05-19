export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    private movementVelocity: number = 96;

    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private locked: boolean;
    private myTween: Phaser.Tweens.Tween;

    constructor(
        cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys,
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | integer) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.cursorKeys = cursorKeys;
        this.locked = false;
    }

    playerUpdate(): void {
        if (this.locked === false) {
            let movingX: boolean = false;
            let movingY: boolean = false;
            if (this.cursorKeys.up.isDown) {
                movingY = true;
                this.setVelocityY(-this.movementVelocity);
            }
            if (this.cursorKeys.down.isDown) {
                movingY = true;
                this.setVelocityY(this.movementVelocity);
            }
            if (this.cursorKeys.left.isDown) {
                movingX = true;
                this.setVelocityX(-this.movementVelocity);
            }
            if (this.cursorKeys.right.isDown) {
                movingX = true;
                this.setVelocityX(this.movementVelocity);
            }
            if (movingX === false) {
                this.setVelocityX(0);
            }
            if (movingY === false){
                this.setVelocityY(0);
            }
            if (this.cursorKeys.space.isDown) {

                this.scene.events.emit('interact');
            }
        }
    }

    lock(lock: boolean = true): void {
        this.locked = lock;
    }
}