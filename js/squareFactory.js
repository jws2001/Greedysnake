//1 创建一个管理者
function SquareFactory() {

}
SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    // x : 列
    // y : 行
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';


    //给每一个方块的身上添加一个标签（方块的类型），用于与蛇头进行碰撞的处理
    square.collide = action
}
//2 包装创建方块的构造函数(子工厂，生产线)
//创建地板的构造函数
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, collideType.move);
    return floor;
}

//创建围墙的构造函数
SquareFactory.prototype.Wall = function (x, y, color) {
    var wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, collideType.die);
    return wall;
}

//创建蛇头的构造函数
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakeHead, color, collideType.die);
    snakeHead.upDate(x, y);
    return snakeHead;
}

//创建蛇身的构造函数Body
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, collideType.die);
    return snakeBody;
}

//创建食物的构造函数
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, collideType.eat);
    food.upDate(x, y);
    return food;
}

//3 提供一个对外的接口
SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == 'undefined') {//用户传递进来的type这个参数，在工厂里面没有对应的生产线
        throw 'no is type';
    }

    SquareFactory.prototype[type].prototype = new SquareFactory();

    //让子工厂的 构造函数 继承SquareFactory
    return new SquareFactory.prototype[type](x, y, color)
}

// var floor = SquareFactory.create('Floor', 1, 1, 'grey');
// console.log(floor)