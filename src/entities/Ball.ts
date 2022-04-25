import {Entity} from './Entity'
import {IGameOptions} from '../Game'
import {Paddle} from './Paddle'
import {Sound} from '../Sound'

export class Ball extends Entity {
    public dx: number = 2
    public dy: number = -2
		// here dx and dy means ball will go 2 units in x axis and -2 unit in y axis initially
    // here minus is taken in front of dy because we want the ball to go up initially
    public speed: number = 3
    private _isOverTheEdge: boolean = false
    private collideSound = new Sound('../src/assets/collide.wav', {volume: 0.5})
    // volume	Sets or returns the audio volume of an audio

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string
    ) {
        super(x,y,width,height)
        // super keyword is used to call the constructor of its parent class to access the parent's properties and methods.
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        // beginPath() method begins a path or resets the current path
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, false)
        // arc() method creates an arc/curve
				// Math.PI returns the ratio of the circumference of a circle to its diameter, which is approximately 3.14159
        ctx.fillStyle = this.color
				// fillStyle property sets or returns the color, gradient, or pattern 
        ctx.fill()
				// fill() Fills the current drawing (path)
        ctx.closePath()
				// Creates a path from the current point back to the starting point
    }
    public updatePosition(): void {
        this.x += this.dx
        this.y += this.dy
    }
    get isOverTheEdge(): boolean {
        return this._isOverTheEdge
    }
    set isOverTheEdge(cond: boolean) {
        this._isOverTheEdge = cond
    }
    public checkCollision(gameArea: IGameOptions, paddle: Paddle): void {
			// checking the collision with walls
        if ((this.x + this.width > gameArea.canvasWidth) ||
          (this.x < 0)){
              this.dx = -this.dx
							// here negative is taken so that we are changing the x direction
        }
        else if (this.y < 0) {
            this.dy = -this.dy
						// here negative is taken so that we are changing the y direction
        }
        // checking the collision with paddle
        else if (this.y + this.width > gameArea.canvasHeight) {
            if((this.y > paddle.y && this.y < paddle.y + paddle.height) &&
               (this.x > paddle.x && this.x < paddle.x + paddle.width)) {
                // this.y > paddle.y means everything above thre paddle
                   //collision position is done such that it always gives us
                   // a point between 1 and -1. By that we can easy add the angle
                   // the ball should move if it hits certain positions of the paddle.
                   let collisionPosition: number = this.x - (paddle.x + paddle.width /2)
                   collisionPosition = (collisionPosition / paddle.width/2) 
                   const angle: number = 1 * collisionPosition * Math.PI / 3 // 60deg
                   //calculate new position of the ball based on angle
                   this.dx = Math.sin(angle) * this.speed
                   this.dy = -1 * Math.cos(angle) *  this.speed
                  //  Angular speed is the rate at which an object changes its angle (measured) in radians, in a given time period. 
                   this.collideSound.play()
            }
            else {
                this._isOverTheEdge = true
            }
        }
    }
}