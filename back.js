var canvas=document.getElementById('canvas');
var hdc=canvas.getContext('2d');
function max(a,b){
	if(a>b)return(a);return(b);
}
var height=document.body.scrollHeight;
var width=document.body.scrollWidth;
canvas.height=height;
canvas.width=width;
hdc.clearRect(0,0,height,width);
hdc.fillStyle='transparent';
hdc.fillRect(0,0,height,width);
alert('hehe');

var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};
var colors=['#00FFFF','#0000FF','#ADFF2F','#B030AD','#F0E68C','#20B2AA','#FF00FF','#000080','#FF0000','#FFFF00'];
/*for(let i=0;i<10;i++){
	sleep(300);
	alert(i);
	hdc.clearRect(0,0,height,width);
	hdc.fillStyle=colors[i];
	hdc.fillRect(0,0,height,width);
}*/
sleep(3000);
alert('done!');