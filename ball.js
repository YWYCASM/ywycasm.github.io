var canvas1=document.getElementById('balls1');
var hdc1=canvas1.getContext('2d');
var canvas2=document.getElementById('balls2');
var hdc2=canvas2.getContext('2d');
var canvas3=document.getElementById('balls3');
var hdc3=canvas3.getContext('2d');
function rand(){
	return(Math.random());
}
function max(a,b){
	if(a>b)return(a);return(b);
}
function min(a,b){
	if(a<b)return(a);return(b);
}
function randsign(){
	if(Math.random()<0.5)return(1);return(-1);
}
class circle{
	constructor(x,y,r,vx,vy,color,g,k){
		this.x=x;
		this.y=y;
		this.r=r;
		this.vx=vx;
		this.vy=vy;
		this.color=color;
		this.g=g;
		this.k=k;
	}
	run(){
		this.x+=this.vx;
		this.y+=this.vy;
		this.vy+=this.g;
		if(this.x+this.r>700.00001||this.x-this.r<0.00001){this.vx=-this.k*this.vx;this.vy=this.k*this.vy;}
		if(this.y+this.r>700.00001||this.y-this.r<0.00001){this.vy=-this.k*this.vy;this.vx=this.k*this.vx;}
		this.x=min(this.x,699.99999-this.r);
		this.x=max(this.x,0.00001+this.r);
		this.y=min(this.y,699.99999-this.r);
		this.y=max(this.y,0.00001+this.r);
	}
}

function dis(x1,y1,x2,y2){
	return(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
}
function cross(a,b){
	if(dis(a.x,a.y,b.x,b.y)<=a.r+b.r)return(true);
	return(false);
}
var colors=['#00FFFF','#0000FF','#ADFF2F','#B030AD','#F0E68C','#20B2AA','#FF00FF','#000080','#FF0000','#FFFF00'];
var array1=[];
var array2=[];
var array3=[];
function init(array,dvx,g,k){
	for(let i=0;i<40;i++){
		var x=0,y=0,r=0;
		while(1){
			x=rand()*700;y=rand()*700;r=rand()*30+10;
			if(x-r<=0||x+r>=700||y-r<=0||y+r>=700)continue;
			var flag=0;
			for(let j=0;j<i;j++){
				if(dis(x,y,array[j].x,array[j].y)<=r+array[j].r){
					flag=1;break;
				}				
			}
			if(flag===1)continue;
			array.push(new circle(x,y,r,randsign()*(rand()*5+1)*dvx,randsign()*(rand()*5+1),Math.floor(10*rand()),g,k));
			break;
		}
	}
}
init(array1,0,0.3,0.8);
init(array2,1,0,0.8);
init(array3,1,0,1);
var tot=0;
function draw(hdc,array,delta){
	hdc.clearRect(0,0,700,700);
	hdc.strokeStyle='black'
	hdc.strokeRect(0,0,700,700);
	hdc.fillStyle='#00FFFF';
	var path=new Path2D();
	for(let i=0;i<40;i++){
		let path=new Path2D();
		path.arc(array[i].x,array[i].y,array[i].r,0,2*Math.PI);
		hdc.fillStyle=colors[array[i].color];
		hdc.fill(path);
		for(let j=0;j<i;j++){
			if(cross(array[i],array[j])){
				let mi=array[i].r*array[i].r*array[i].r,mj=array[j].r*array[j].r*array[j].r;
				mi=array[i].r;mj=array[j].r;
				let dx=array[j].x-array[i].x,dy=array[j].y-array[i].y;
				let len=dis(0,0,dx,dy);
				dx/=len;dy/=len;
				let vti=array[i].vx*dx+array[i].vy*dy,vni=array[i].vx*dy-array[i].vy*dx;
				let vtj=array[j].vx*dx+array[j].vy*dy,vnj=array[j].vx*dy-array[j].vy*dx;
				let miu=delta;
				let vti_1=vti-((1+miu)*mj*(vti-vtj))/(mi+mj);
				let vtj_1=vtj+((1+miu)*mi*(vti-vtj))/(mi+mj);
				array[i].vx=vti_1*dx+vni*dy;
				array[i].vy=vti_1*dy-vni*dx;
				array[j].vx=vtj_1*dx+vnj*dy;
				array[j].vy=vtj_1*dy-vnj*dx;
				dx=-dx;dy=-dy;
				array[i].x=array[j].x+(array[i].r+array[j].r+0.00001)*dx;
				array[i].y=array[j].y+(array[i].r+array[j].r+0.00001)*dy;
			}
		}
	}
	for(let i=0;i<40;i++){
		array[i].run();
	}
}
function process(){
	draw(hdc1,array1,0.85);
	draw(hdc2,array2,0.85);
	draw(hdc3,array3,1);
	window.requestAnimationFrame(process);
}
window.requestAnimationFrame(process);