function bubbleSort(nums, delay) {
  for (var i = 0; i < nums.length-1; i++) {
    for(var j = i+1; j<nums.length; j++) {
      if(nums[i]>nums[j]){
        var temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
      }
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
  return shuffled_nums;
}
