const lawn = require('./images/lawn.png');
const crappySprite = require('./images/crappySprite.png');

export class PreloadScene extends Phaser.Scene {
    private bmtLoading: Phaser.GameObjects.BitmapText;

    constructor() {
        super({ key: 'PreloadScene' })
    }

    preload(): void {
        // bitmap text resource already loaded, safe to use
        this.bmtLoading = this.add.bitmapText(128, 128, 'PressStart2P-White', 'Loading...')
            .setOrigin(0.5, 0.5);

        // load all resources here
        this.load.image('lawn', lawn);
        this.load.image('crappySprite', crappySprite);
    }

    create(): void {
        this.scene.start('TitleScene');
    }
}