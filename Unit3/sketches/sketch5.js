const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true

};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black'; 
    
    const cx = width * 0.5; 
    const cy = height * 0.5;
    const w = width * 0.01; 
    const h = height * 0.1; 

    let x, y; 

    const num = 40; 
    const radius = width * 0.3; 
    const slice = math.degToRad(360/num); 

    for(let i = 0; i < num; i++){
      const angle = slice * i + random.range(-1,1) * Math.PI / 180; 
      x = cx + radius * Math.sin(angle); 
      y = cy + radius * Math.cos(angle); 

      context.save()
      context.translate(x,y); 
      context.rotate(-angle);
      context.scale(random.range(0.1,2), random.range(0.2, 0.5))

      context.beginPath(); 
      context.rect(-w * 0.5, random.range(0, -h *0.5), w, h); 
      context.fill(); 
      context.restore(); 

      context.save();
      context.translate(cx,cy);
      context.rotate(-angle); 
      context.lineWidth = random.range(5,20); 
      context.beginPath(); 
      context.arc(0,0,radius * random.range(0.7,1.3), slice*random.range(1,-8), slice*random.range(1,5));
      context.stroke(); 
      context.restore(); 
      
    }

  };
};

canvasSketch(sketch, settings);
class Agent{
  constructor(x,y){
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-1,1), random.range(-1,1)); 
    this.radius = random.range(4,12); 
  }

  bounce(width, height){
    if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1; 
    if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1; 

  }

  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  wrap(width, height){
    if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.x < 0) this.pos.x = width;
    if(this.pos.y > height) this.pos.y = 0; 
    if(this.pos.y < 0) this.pos.y = height;
  }

  draw(context, angle){
    context.save()
    context.translate(x,y); 
    context.rotate(-angle);
    context.scale(random.range(0.1,2), random.range(0.2, 0.5))

    context.beginPath(); 
    context.rect(-w * 0.5, random.range(0, -h *0.5), w, h); 
    context.fill(); 
    context.restore(); 

    context.save();
    context.translate(cx,cy);
    context.rotate(-angle); 
    context.lineWidth = random.range(5,20); 
    context.beginPath(); 
    context.arc(0,0,radius * random.range(0.7,1.3), slice*random.range(1,-8), slice*random.range(1,5));
    context.stroke(); 
    context.restore(); 
  }
}