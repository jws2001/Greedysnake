var tool = {
    //继承
    inherit(target, origin) {// target:目标对象, origin:源对象
        let F = function () { };
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },
    //扩展
    extends(origin) {
        var target = function () {
            origin.apply(this, arguments)
        }
        this.inherit(target, origin)
        return target;
    },
    //单例
    single(origin) {
        var target = (function () {
            var instance;
            return function () {
                if(typeof instance == 'object'){
                    return instance
                }
                origin && origin.apply(this, arguments)
                instance = this;
            }
        })()
        origin && this.inherit(target, origin);
        return target;
    }
}

// var Square = function (x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }
// Square.prototype.collide = function () {
//     console.log('collide')
// }
// var Food = tool.extends(Square)
// var F = new Food(10, 10, 100, 100)
// F.collide();