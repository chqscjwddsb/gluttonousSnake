// 地图
function Game(width, height) {
  this.width = width;
  this.height = height;
  // 蛇每部分长度
  this.partLength = 10;
}
var tds,trs
Game.prototype.init = function () {
  const body = document.querySelector("body");
  const table = document.createElement("table");
  table.style.border ='2px dotted black'
  tds = this.width / this.partLength;
  trs = this.height / this.partLength;
  for (let i = 0; i < trs; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < tds; j++) {
      const td = document.createElement("td");
      td.style.width = this.partLength + "px";
      td.style.height = this.partLength + "px";
      tr.append(td);
    }
    table.append(tr);
  }
  body.append(table);
};
