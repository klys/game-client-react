//import { collision } from "../skills/scripts/prueba/disparo";
//import { math } from "../skills/skill_api";
//import { player } from "./game";


var gmath = () => {};

/*
    collision_point
*/

gmath.collision_point = (players,x,y) => {
    // search betwen players
    var collisions = [];
    players.forEach(PlayerL => {
        if (floor(PlayerL.position.x) == floor(x) && floor(PlayerL.position.y) == floor(y)) {
            collisions.push(PlayerL.u);
        }
    });
    return collisions;
};

/*
    collision_rectangle
*/

gmath.collision_rectangle = (players,x1,y1,w,h) => {
    var collisions = [];
    players.forEach(PlayerL => {
        if ((PlayerL.x > x1) && (PlayerL.x < x1+w) && (PlayerL.y > y1) && (PlayerL.y < y1+h)) {
            collisions.push(PlayerL.u);
        }
    });
    return collisions;
};

/*
    collision_circle
*/

gmath.collision_circle = (players,x,y,r) => {
    var collisions = [];
    players.forEach(PlayerL => {
        //PlayerL.send(9001,'"cx":'+x+',"cy":'+y+',"r":'+r)

        var distance = gmath.distance(PlayerL.position.x, PlayerL.position.y, x,y);
        //console.log("player("+PlayerL.position.x+","+PlayerL.position.y+") other("+x+","+y+") distance:"+distance+" , min: "+r)
        if (distance <= r) {
            //console.log("Player collisioned: "+PlayerL.n)
            collisions.push(PlayerL.u)
        }
    });
    return collisions;
};

gmath.npc_collision_circle = (npcs,x,y,r) => {
    var collisions = [];
    Object.keys(npcs).forEach(npc => {
        //PlayerL.send(9001,'"cx":'+x+',"cy":'+y+',"r":'+r)

        var distance = gmath.distance(npcs[npc].position.x, npcs[npc].position.y, x,y);
        //console.log("player("+PlayerL.position.x+","+PlayerL.position.y+") other("+x+","+y+") distance:"+distance+" , min: "+r)
        if (distance <= r) {
            //console.log("Player collisioned: "+PlayerL.n)
            collisions.push(npcs[npc].Oid)
        }
    });
    return collisions;
};


/*
    Distance between 2 points
*/
gmath.distance = (x1, y1, x2, y2) => {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}

/*
    gmath.nearest (objects, max_distance, x, y)

    filter objects that are nearby of the point (x,y)
*/
gmath.nearest = (objects, max_distance, x, y) => {
    var objs_bias = [];
    objects.forEach(object => {
        if (gmath.distance(x,y,object.position.x, object.position.y) < max_distance) {
            objs_bias.push(object);
        }
    });
    return objs_bias;
};
/*
    move
*/

gmath.move = (x, y,angle,distance) => {
    return {
        x:Math.ceil(x + distance * Math.cos(angle * Math.PI / 180) ),
        y:Math.ceil(y + distance * Math.sin(angle * Math.PI / 180) ) 
    }
};

/*
    point direction
*/
gmath.point_direction = (p1,p2) => {
    return (gmath.calcAngle(p1,p2)*180)/Math.PI;
}

/*
    calcAngle
*/
gmath.calcAngle = (p1, p2) => {
    // Returns the angle points p1 and p2 form with the horizontal.
    if (p2.x > p1.x) {
        // quad 1 or 2
        if (p2.y > p1.y) {
            // quad 2
            return gmath.arctan(p1, p2)}
            // should be 1-90
        else {
            if (p2.y==p1.y) {
                return 0}
            else {
                // quad 1
                return 2*Math.PI+gmath.arctan(p1, p2)
                // 270-360
            }
        }
    }
    else {    
        if (p2.x==p1.x) {
            // atan undefined
            if (p2.y == p1.y) {
                return 0}
            else {
                if (p2.y > p1.y) {
                    return Math.PI/2}
                else {
                    return 1.5*Math.PI
                }
            }
        }
        else {
            // else { p2.x < p1.x
            // quad 3 or 4
            if (p2.y == p1.y) {
                return Math.PI}
            else {
                if (p2.y > p1.y) {
                    // quad 3
                    return Math.PI + gmath.arctan(p1, p2)}
                    // 90-180
                else {
                    // quad 4
                    return Math.PI+ gmath.arctan(p1, p2)
                    // 180-270
                }
            }
        }
    }
}
/*
    arctan
*/


gmath.arctan = (p1, p2) => {
    // Returns the arcTan of points p1 and p2.
    let rat=  (p2.y-p1.y)/(p2.x-p1.x)
    let inradians=Math.atan(rat)
    //indegrees=180*inradians/Math.PI
    return inradians
}

/*
    collision_oval
*/

gmath.collision_oval = (x1,y1,r1,x2,y2,r2) => {
    var circle1 = {radius: r1, x: x1, y: y1};
    var circle2 = {radius: r2, x: x2, y: y2};

    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
        // collision detected!
        return true;
    }
    return false;
};

/*
    collisions
*/

gmath.collisions = (objects, x, y, r) => {
    var objs_bias = [];
    objects.forEach(object => {
        if (gmath.collision_circle(object.position.x,
            object.position.y,
            object.position.r, 
            x,y,r)) {
                objs_bias.push(object);
            }
    });
    return objs_bias;
};

/*
    Movimiento Rectilineo Uniforme
    Made for calculating the position based on
    the speed for lineal projectils.
*/
gmath.r = (v , t) => {
    return v * (t*30);
}

module.exports = gmath;