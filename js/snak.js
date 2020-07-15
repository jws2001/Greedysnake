var snake = new Snake();
snake.head = null; //蛇头
snake.tail = null; //蛇尾，这两个是用来记录各自己对应的信息

//存储蛇将要走的位置
var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    }
}



snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    //初始化 以后 把蛇头和蛇尾的信息 存储以下
    this.head = snakeHead;
    this.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y); //把蛇头位置的地板的方块删除
    ground.append(snakeHead)

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1)

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2)


    //实现链表的关系
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    //方向
    snake.direction = directionNum.right;
}

//获取蛇头要走的下一个格子  ，要根据下一个格子做不同的逻辑处理
snake.getColldeSquare = function () {
    var nextSquare = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    this.collideMethod[nextSquare.collide](nextSquare);
}

//碰撞后的处理方式（走， 吃， 挂）
snake.collideMethod = {
    move: function (square, boolean) {
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');

        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody)

        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(square.x, square.y);
        ground.append(newHead)

        snake.head = newHead;

        if (!boolean) {
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'grey');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last;
        }

    },
    eat: function (square) {
        // console.log('吃');
        this.move(square, true);
        game.score++;
        createFood();   
    },
    die: function (square) {
        // console.log('挂')
        game.over();
    }
}

// snake.init();
// snake.getColldeSquare();