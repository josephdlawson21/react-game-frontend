

const Coin = (c,r,ctx, map) => {
  let coin = document.getElementById('coin');
  ctx.drawImage(
    coin, // image
    (c * map.tsize) + 10, // target x
    (r * map.tsize) + 10, // target y
  );
}

export default Coin
