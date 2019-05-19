export class TitleScene extends Phaser.Scene {
    private ready: boolean = false;
    private space: Phaser.Input.Keyboard.Key;

    constructor() {
        super({ key: 'TitleScene' })
    }

    create(): void {
        this.add.bitmapText(128, 128, 'PressStart2P-White', 'GAME TITLE!')
            .setOrigin(0.5, 0.5);

        const spaceBarText = this.add.bitmapText(128, 248, 'PressStart2P-White', '(press space)')
            .setOrigin(0.5, 1);

        this.tweens.add({
            targets: spaceBarText,
            alpha: 0,
            yoyo: true,
            duration: 1000,
            repeat: -1
        });

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);

        this.cameras.main.fadeIn(500, 0, 0, 0, this.fadeCheck, this);
    }

    update(): void {
        if (this.ready === true && this.space.isDown) {
            this.scene.start('GameScene');
        }
    }

    private fadeCheck(camera: any, progress: number): void {
        if (progress === 1) {
            this.ready = true;
        }
    }
}