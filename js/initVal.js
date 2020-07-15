/**
 *  这个文件 存放常用的东西
 *      1 常用的变量
 *      2 创建一个最基础的方块的构造函数
 *      3 根据方块的构造函数，创建各个的元素对象
 *      4 储存蛇头于其他格子碰撞个处理的方式信息
 */


//游戏区域的大小
var td = 30; //宽度 列数（单位为一个格子）
var tr = 30; //高数

//每个方块的宽
var squareWidth = 20;

//游戏一开始的坐标
var positionX = 200;
var positionY = 100;

//蛇的移动间隔时间
var interValTime = 300;

//定义最基础的方块的构造函数，每个元素都是从这里继承而来
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div')
}

Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';

}

//创建元素，每个元素都是通过继承方块的构造函数后产生的实例对象（构造函数）
var Ground = tool.single(Square);//整个游戏场景，它在页面只有一个所以使用单例模式去继承
var Floor = tool.extends(Square);//地板（蛇走的区域）
var Wall = tool.extends(Square);//围墙



var SnakeHead = tool.single(Square); //蛇头
var SnakeBody = tool.extends(Square); //蛇身
var Snake = tool.single(); //蛇 它不需要继承对象，他没有落地的Dom， 用来辅助 我们处理蛇身上的逻辑
var Food = tool.single(Square); //食物
var Game = tool.single();

//小方块的类型
var collideType = {
    move: 'move',
    eat: 'eat',
    die: 'die'
}