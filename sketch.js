var drawing = [] ;
var db_drawing = [];
var database;
var button;

function setup() {
  createCanvas(1600,1600);
  database = firebase.database();
  button = createButton("Clear Your Drawings");
  button.position(600,10);

}

function draw() {
  background("white");  
  beginShape();
  noFill();
  strokeWeight(3);
    for(var i in db_drawing){
      vertex(db_drawing[i].x,db_drawing[i].y);
      
    }
    button.mousePressed(()=>{
      db_drawing = [];
      drawing = [];
      database.ref("drawing").remove();
    });
    endShape();
  readData();
}

function mouseDragged(){
  var point = {
    x : mouseX,
    y : mouseY
  }
  drawing.push(point);
  database.ref("drawing").set({
    'd' : drawing
  })
}


function  readData(){
  database.ref('drawing/d').on("value",function (data){
    db_drawing = data.val();
    
  });
        
}
