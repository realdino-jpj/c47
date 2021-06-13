class Particle {

constructor(){
this.x = berserk_emy.x;
this.y = 430;
this.vx = random(-1,-1);
this.vy = random(-5,-1);
this.alpha = 255;
}
update(){
this.x += this.vx;
this.y += this.vy;
this.alpha -= 3;
}
finished(){
return this.alpha < 0


}

show(){
noStroke();
    fill(255,this.alpha);
ellipse(this.x,this.y,16,16);

}




}