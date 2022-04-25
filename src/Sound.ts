
interface ISoundOptions {
    volume?: number,
    loop?: boolean,
}

export class Sound {
    private audio : HTMLAudioElement = new Audio()
    // Audio() creates and returns a new HTMLAudioElement
    constructor(public src: string, public options: ISoundOptions) {
        this.audio.src = src
        this.audio.volume = this.options.volume || 0.5
        this.audio.currentTime += 5
        // currentTime property sets or returns the current position (in seconds) of the audio/video playback.
    }

    public play(): void {
    // play() Starts playing the audio
        if(this.options.loop) {
            this.audio.loop = true
        }
        if (this.audio) {
            this.audio.currentTime = 0
        }
        this.audio.play()
    }

    public pause(): void {
    // pause() Pauses the currently playing audio
        this.audio.pause()
    }
}