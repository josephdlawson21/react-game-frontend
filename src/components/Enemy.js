
const Enemy = (map,xy,ctx) => {
  let enemy = document.getElementById('ghost');
  ctx.drawImage(
    enemy, // image
    (xy[0] * map.tsize) + 6, // target x
    (xy[1] * map.tsize) + 6, // target y
  );
}

export default Enemy
