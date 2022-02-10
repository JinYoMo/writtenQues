/**
 * 请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。
 * 若队列为空，pop_front 和 max_value 需要返回 -1
 */
/**
 * 输入: 
 * ["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
 * [[],[1],[2],[],[],[]]
 * 输出: [null,null,null,2,1,2]
 */
/**
 * 输入: 
 * ["MaxQueue","pop_front","max_value"]
 * [[],[],[]]
 * 输出: [null,-1,-1]
 */
var MaxQueue = function() {
   this.queue = []
   this.dequeue = []
   this.countQ = this.countD = this.headQ = this.headD = 0
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  if (this.isEmptyDequeue()) {
    return -1
  }
  return this.dequeue[this.headD]
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
   this.queue[this.countQ++] = value
   while(!this.isEmptyDequeue() && value > this.dequeue[this.countD-1]) {
     delete this.dequeue[--this.countD]
   }
   this.dequeue[this.countD++] = value
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if (this.isEmptyQueue()) {
    return -1
  }
  let val = this.queue[this.headQ]
  delete this.queue[this.headQ++]
  if (this.dequeue[this.headD] === val) {
    delete this.dequeue[this.headD++]
  }
  return val
};

MaxQueue.prototype.isEmptyQueue = function() {
   return !(this.countQ - this.headQ)
}

MaxQueue.prototype.isEmptyDequeue = function() {
   return !(this.countD - this.headD)
}

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */