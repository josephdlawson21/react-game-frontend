
const Enemy = (map,xy,ctx) => {
  let enemy = document.getElementById('rock');
  ctx.drawImage(
    enemy, // image
    (xy[0] * map.tsize) + 10, // target x
    (xy[1] * map.tsize) + 10, // target y
  );
}

export default Enemy
