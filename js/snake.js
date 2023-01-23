// 蛇
function Snake() {
  // 得分
  this.score = 0;
  // 初始蛇的长度
  this.snake = [
    {
      row: 1,
      col: 4,
      logo: "head",
    },
    {
      row: 1,
      col: 3,
      logo: "body",
    },
    {
      row: 1,
      col: 2,
      logo: "body",
    },
    {
      row: 1,
      col: 1,
      logo: "body",
    },
  ];
  this.direction = "right";
  // 定时器 timer 没多少秒蛇动一次 dir触发方向键后多少秒后生效
  this.timer = "";
  this.dir = "";
}

// 画蛇头和蛇身
Snake.prototype.draw = function () {
  for (let i of this.snake) {
    if (
      i.row >= trs ||
      i.row < 0 ||
      i.col >= tds ||
      i.col < 0 ||
      this.isEatSelf()
    )
      break;
    const cell = document.querySelector("table").rows[i.row].cells[i.col];
    if (i.logo === "head") {
      cell.style.background = "url('./assets/images/snakeHead.png')  no-repeat";
      cell.style.backgroundSize = "contain";
      cell.style.borderRadius = "50%";
    } else {
      cell.style.background = "";
      cell.style.backgroundColor = "green";
      cell.style.borderRadius = "50%";
    }
  }
};

// 蛇方向
Snake.prototype.control = function (food) {
  document.addEventListener("keydown", (e) => {
    // 150毫秒后更改方向
    // 防抖
    clearTimeout(this.dir)
    const dir =(direction) => {
      this.dir =setTimeout(() => {
        this.direction = direction;
        console.log(this.direction);
      }, 150);
    };
    switch (e.code) {
      case "ArrowUp":
        if (this.direction === "down") {
          return;
        } else {
          dir("up");
          break;
        }
      case "ArrowDown":
        if (this.direction === "up") {
          return;
        } else {
          dir("down");
        }
        break;
      case "ArrowLeft":
        if (this.direction === "right") {
          return;
        } else {
          dir("left");
        }
        break;
      case "ArrowRight":
        if (this.direction === "left") {
          return;
        } else {
          dir("right");
        }
        break;
    }
  });

  // 蛇移动
  this.timer = setInterval(() => {
    // 清除最后一个元素,头部添加一个元素
    const clear = () => {
      document.querySelector("table").rows[
        this.snake[this.snake.length - 1].row
      ].cells[this.snake[this.snake.length - 1].col].style.backgroundColor =
        "#fff";
      this.snake.pop();
    };
    // 是否吃到食物
    let isEat =
      this.snake[0].row === food.row && this.snake[0].col === food.col;
    switch (this.direction) {
      case "up":
        this.snake[0].logo = "body";
        this.snake.unshift({
          row: this.snake[0].row - 1,
          col: this.snake[0].col,
          logo: "head",
        });
        isEat || this.isDie() ? "" : clear();
        break;
      case "down":
        this.snake[0].logo = "body";
        this.snake.unshift({
          row: this.snake[0].row + 1,
          col: this.snake[0].col,
          logo: "head",
        });
        isEat || this.isDie() ? "" : clear();
        break;
      case "left":
        this.snake[0].logo = "body";
        this.snake.unshift({
          row: this.snake[0].row,
          col: this.snake[0].col - 1,
          logo: "head",
        });
        isEat || this.isDie() ? "" : clear();
        break;
      case "right":
        this.snake[0].logo = "body";
        this.snake.unshift({
          row: this.snake[0].row,
          col: this.snake[0].col + 1,
          logo: "head",
        });
        isEat || this.isDie() ? "" : clear();
        break;
    }
    // 吃到食物，计算得分
    if (isEat) {
      newFood = new Food(this.snake);
      food.row = newFood.food.row;
      food.col = newFood.food.col;
      this.score += 10;
    }
    this.draw();
    this.win()
  }, 200);
};

// 吃到自己
Snake.prototype.isEatSelf = function () {
  return this.snake
    .slice(1)
    .some(
      (item) => item.row === this.snake[0].row && item.col === this.snake[0].col
    );
};

// 撞墙||吃到自己 死亡
Snake.prototype.isDie = function () {
  // 碰到墙壁判断死亡,碰到自己也算死亡
  if (
    this.snake[0].row < 0 ||
    this.snake[0].row > trs - 1 ||
    this.snake[0].col < 0 ||
    this.snake[0].col > tds - 1 ||
    this.isEatSelf()
  ) {
    clearInterval(this.timer);
    clearTimeout(this.dir);
    alert("抱歉,你已经死亡!你的得分是：" + this.score);
    return true;
  }
};

//铺满整个屏幕
Snake.prototype.win = function(){
    if(this.snake.length === trs*tds+1){
      alert("恭喜你,你赢了")
      clearInterval(this.timer)
    }
    
}
