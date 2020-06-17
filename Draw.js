async function bubbleSort(nums, delay) {
  for (var i = 0; i < nums.length; i++) {
    for(var j = 0; j < nums.length-i-1; j++) {
      if(stop){return;}
      if(nums[j]>nums[j+1]){
        var temp = nums[j];
        nums[j] = nums[j+1];
        nums[j+1] = temp;
        await sleep(delay);
      }
    }
  }
}

async function mergeSort(nums, delay){
  var current_size = 1;
  while(current_size<=nums.length-1){
    var left = 0;
    while(left<nums.length-1){
      var mid = left + current_size;
      var right = Math.min(left + 2*current_size, nums.length);

      if(stop){return;}
      await merge(nums, left, mid, right, delay);
      left = left+current_size*2;
    }
    current_size = 2*current_size;
  }
}

async function merge(a, l, m, r, delay){
  var n1 = m-l+1;
  var n2 = r-m;
  var left = a.slice(l, m);
  var right = a.slice(m, r);

  var i=0, j=0, k = l;

  while(i<left.length && j<right.length){
    if(left[i]<right[j]){
      nums[k] = left[i];
      i+=1;
    } else {
      nums[k] = right[j];
      j+=1
    }
    await sleep(delay);
    k+=1;
  }

  while(i<left.length){
    nums[k] = left[i];
    i+=1;
    k+=1;
    await sleep(delay);
  }

  while(j<right.length){
    nums[k] = right[j];
    j+=1;
    k+=1;
    await sleep(delay);
  }
}

async function bogoSort(nums, delay){
  var sorted = sortCheck(nums);
  while(!sorted){
    if(stop){return;}
    shuffle(nums);
    sorted = sortCheck(nums);
    await sleep(delay);
  }
}

function sortCheck(nums) {
  for (var i = 0; i < nums.length-1; i++) {
    if(nums[i] > nums[i+1])
      return false;
  }
  return true;
}

function sleep(ms) {
  if(delay >= 1){
    return new Promise(resolve => setTimeout(resolve, ms));
  } else {
    var rand = Math.random();
    if(rand<=ms){
      return new Promise(resolve => setTimeout(resolve, 1));
    }
  }
}

function getArray(length){
  var nums = [];
  for(var i=0; i<length; i++){
    nums.push(i);
  }
  return nums;
}

function shuffle(nums){
  var shuffled_nums = [];
  while(nums.length>0){
    var pos = Math.floor(Math.random()*nums.length);
    shuffled_nums.push(nums[pos]);
    var trash_nums = nums.splice(pos, 1);
  }

  for (var i = 0; i < shuffled_nums.length; i++) {
    nums[i] = shuffled_nums[i];
  }
  return nums;
}

var frameRate = 60;

function startGame() {
  myGameArea.start();
}

var myCanvas = {
  canvas : document.getElementById("canvas"),
  start : function() {
    this.canvas.width = 1000;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateCanvas, 1000/frameRate);
  },
  clear : function(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  }
}

class Rectangle {
  constructor(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.update = function(){
      myCanvas.context.fillStyle = this.color;
      myCanvas.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

myCanvas.start();

var bg = new Rectangle(0,0,myCanvas.canvas.width, myCanvas.canvas.height, "rgb(230,230,230)");
function updateCanvas() {
  myCanvas.clear();
  bg.update();
  var rects = createRectangles(nums);
  for (var i = 0; i < rects.length; i++) {
    rects[i].update();
  }
}

function createRectangles(nums){
  var rects = [];
  var width = myCanvas.canvas.width/nums.length;
  for (var i = 0; i < nums.length; i++) {
    var height = myCanvas.canvas.height/myCanvas.canvas.width *(nums[i]*width+width);
    var color_num = Math.floor(300/nums.length * nums[i]);
    var color = "hsl("+color_num+","+80+"%,"+50+"%)";
    rects.push(new Rectangle(Math.ceil(i*myCanvas.canvas.width/nums.length), myCanvas.canvas.height-height, Math.ceil(width), height, color));
  }
  return rects;
}
