

const Coin = (x,y,ctx) => {
  let coin = document.getElementById('coin');
  ctx.drawImage(coin, x,y)
}

export default Coin
