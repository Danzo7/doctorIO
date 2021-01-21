
export default function (){
this.targets=[];
this.mouseDown_OnTarget = false;
this.startX=undefined;
this.scrollLeft=undefined;
this.selected=-1;
this.speed=1;
this.currentEvent=undefined;
this.push=(element)=>{
    this.targets.push(element);
element.addEventListener('mousedown', (e) => {    
        this.selected=this.targets.indexOf(element); 
        this.mouseDown_OnTarget = true;
        this.startX = e.pageX - element.offsetLeft;
        this.scrollLeft = element.scrollLeft;
        revive();
    });}

document.addEventListener('mouseup', () => {
    this.mouseDown_OnTarget = false;
    kill();
});

let setspeed=(speed)=>this.speed=speed;
let revive=()=>this.currentEvent=document.addEventListener('mousemove',trigger );
let kill=()=>document.removeEventListener('mousemove',trigger);
let trigger=(e) =>{
    if(!this.mouseDown_OnTarget) return; 
    e.preventDefault();    
    this.targets[this.selected].scrollLeft = this.scrollLeft - (e.pageX - this.targets[this.selected].offsetLeft - this.startX)*this.speed ;
    // this.startX=this.startX||e.pageX;
    //this.targets[this.selected].scrollBy((this.startX-e.pageX)*this.speed*0.01,0);
    
}
}

