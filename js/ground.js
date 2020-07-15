var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);//{x: 200, y: 100, width: 600, height: 600, viewContent: div}

ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#fff';
    document.body.appendChild(this.viewContent);

    this.squareTable = []; //存储场景道中所有的小方块信息

    for (var y = 0; y < tr; y++) {//外层的循环走的是 行数
        this.squareTable[y] = new Array(td)
        for (var x = 0; x < td; x++) {//走的是 列数
            if (x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                //这个条件满足就是 墙壁
                var newSquare = SquareFactory.create('Wall', x, y, 'black')
            } else {
                //这里 就是 创建地板
                var newSquare = SquareFactory.create('Floor', x, y, 'grey')
            }
            this.viewContent.appendChild(newSquare.viewContent);
            this.squareTable[y][x] = newSquare;
        }
    }
}

// ground.init();

ground.remove = function (x, y) {// 在场景中删除小方块
    var curSquare = this.squareTable[y][x];

    //在 DOM 中删除
    this.viewContent.removeChild(curSquare.viewContent);

    //在数据中 删除
    this.squareTable[y][x] = null;
}

ground.append = function (square) {//在场景中 添加 小方块
    //DOM 添加
    this.viewContent.appendChild(square.viewContent)

    //在数据中 添加
    this.squareTable[square.y][square.x] = square
}