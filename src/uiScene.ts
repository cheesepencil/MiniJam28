import './dialogue';
import { DialogueChunk } from './dialogue';
import { GameScene } from './gameScene';

export class UIScene extends Phaser.Scene {
    private dialogueContainer: Phaser.GameObjects.Container;
    private hasDialogue: boolean;
    private decision: number;
    private dialogue: DialogueChunk[];
    private dialogueChunk: DialogueChunk;
    private text: Phaser.GameObjects.BitmapText;
    private activeTween: Phaser.Tweens.Tween;

    constructor() {
        super({ key: 'UIScene' })
    }

    init(dialogue: DialogueChunk[]): void {
        this.decision = undefined;
        this.dialogue = dialogue;
    }

    create(): void {
        this.dialogueContainer = this.add.container(0, 256);
        let whiteRect = this.add.rectangle(0, 0, 256, 64, 0xcccccc).setOrigin(0, 0);
        let blackRect = this.add.rectangle(2, 2, 252, 60, 0x444444).setOrigin(0, 0);
        this.text = this.add.bitmapText(4, 4, 'PressStart2P-White', '');
        this.dialogueContainer.add([whiteRect, blackRect, this.text]);

        this.input.keyboard
            .addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true)
            .on('up', this.choose, this);

        this.input.keyboard
            .addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, true)
            .on('up', this.nextChoice, this);

        this.input.keyboard
            .addKey(Phaser.Input.Keyboard.KeyCodes.UP, true)
            .on('up', this.prevChoice, this);

        this.setDialogue(this.dialogue);
    }

    choose(): void {
        if (this.hasDialogue) {
            if (this.activeTween === undefined || this.activeTween.progress === 1) {
                if (this.decision === undefined) {
                    if (this.dialogue.length - 1 === this.dialogue.indexOf(this.dialogueChunk)) {
                        this.exitDialogue();
                    }
                    else {
                        this.hideDialogue(() => {
                            this.dialogueChunk = this.dialogue[this.dialogue.indexOf(this.dialogueChunk) + 1];
                            this.showChunk(this.dialogueChunk);
                        });
                    }
                } else {
                    this.exitDialogue();
                }
            }
        }
    }

    nextChoice(): void {

    }

    prevChoice(): void {

    }

    setDialogue(dialogue: DialogueChunk[]): void {
        this.hasDialogue = true;
        this.dialogue = dialogue;
        this.dialogueChunk = dialogue[0];
        this.showChunk(this.dialogueChunk);
    }

    showChunk(chunk: DialogueChunk) {
        if (chunk.Decisions === undefined) {
            this.decision = undefined;
        } else {
            // default decision
            this.decision = chunk.Decisions[0][0];
        }

        let displayText: string = '';
        for (let i = 0; i < chunk.Lines.length; i++) {
            displayText += chunk.Lines[i] + '\n';
        }

        this.text.setText(displayText);

        this.showDialogue();
    }

    showDialogue(): void {
        this.activeTween = this.tweens.add({
            targets: this.dialogueContainer,
            duration: 500,
            y: 192
        });
    }

    hideDialogue(callback: Function): void {
        this.activeTween = this.tweens.add({
            targets: this.dialogueContainer,
            duration: 500,
            y: 256,
            onComplete: callback
        })
    }

    exitDialogue(): void {
        this.hideDialogue(() => {
            this.hasDialogue = false;
            this.dialogue = undefined;
            this.dialogueChunk = undefined;
            this.decision = undefined;
            (this.scene.get('GameScene') as GameScene).unlockPlayer();
        });
    }
}

