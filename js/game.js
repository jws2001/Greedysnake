var game = new Game();
game.time = null;
game.score = 0;
game.init = function () {
    ground.init();
    snake.init();

    createFood();

    document.onkeydown = function (ev) {
        if (ev.which === 37 && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        }else if(ev.which === 38 && snake.direction != directionNum.bottom){
            snake.direction = directionNum.top;
        }else if (ev.which === 39 && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        }else if (ev.which === 40 && snake.direction != directionNum.top) {
            snake.direction = directionNum.bottom;
        }
    }

    var btn = document.getElementById('btn');
    btn.onclick = function () {
        clearInterval(game.time)
        game.start();
    }
}

game.init();

game.start = function () {
    this.time = setInterval(function () {
        snake.getColldeSquare();
    }, interValTime)
};

game.over = function () {
    clearInterval(this.time)
    alert(this.score + '分')
}

function createFood() {
    var x = null;
    var y = null;

    var flag = true; //外面循环跳出的条件

    while (flag) {
        x = Math.round(Math.random() * 27 + 1);
        y = Math.round(Math.random() * 27 + 1);

        var ok = true; //里面跳出循环条件

        for (var node = snake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }

        if (ok) {
            flag = false;
        }
    }

    var food = SquareFactory.create('Food', x, y, 'red');

    ground.remove(food.x, food.y);
    ground.append(food)



}