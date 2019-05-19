export class GameDialogue {
    "Intro": DialogueChunk[] = [
        {
            Lines: [
                `012345678901234567890123456789`,
                `Oh no! I thirty characters per`,
                `line seems stifling... What am`,
                `I going to do? And what's this`,
                `only six lines will fit on a`,
                `page? I don't feel so good...`
            ],
            Decisions: undefined
        },
        {
            Lines: [
                `Here's the sixth line!`,
                `Here's the seventh line!`,
                `Here's the eighth line!`,
                `Here's the ninth line!`,
                `Here's the tenth line!`
            ],
            Decisions: undefined
        },
        {
            Lines: [
                `Now you have a decision`,
                `to make:`,
                `First decision`,
                `Second decision`
            ],
            Decisions: [
                [2, 'IntroYes'],
                [3, 'IntroNo']
            ]
        }
    ]
}

export class GameDecisions {
    "IntroYes": "IntroYes";
    "IntroNo": "IntroNo";
}

// Holds the text for a box of dialogue
export class DialogueChunk {
    // individual lines in dialogue box
    // 30 char per line
    Lines: string[];

    // Undefined decisions should advance to the next chunk
    // or finish dialogue if there are no chunks left.
    // Defined decisions return a string the the game can
    // decide what to do with next.
    Decisions: [number, string][];
}