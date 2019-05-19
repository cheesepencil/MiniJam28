import { PlayerSprite } from './player';
import { UIScene } from './uiScene';
import { GameDialogue } from './dialogue';

export class GameScene extends Phaser.Scene {
    private player: PlayerSprite;
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: 'GameScene' })
    }

    create(): void {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.add.rectangle(0, 0, 256, 256, 0x009900).setOrigin(0, 0);
        this.player = new PlayerSprite(
            this.cursorKeys,
            this.scene.scene,
            128, 128,
            'crappySprite')
            .setOrigin(0.5, 0.5);

        this.player.lock(true);
        this.scene.launch('UIScene', new GameDialogue().Intro);
    }

    update(): void {
        this.player.playerUpdate();
    }

    unlockPlayer():void{
        this.player.lock(false);
    }
}