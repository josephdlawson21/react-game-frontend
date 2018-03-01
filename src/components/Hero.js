

// class Hero extends React.Component {
//   constructor(map,x,y,ctx){
//     super()
//
//
//     ctx.drawImage(this.character, x,y)
//   }
//
// }

const Hero = (map,x,y,ctx) => {
  let bob = document.getElementById('character');
  ctx.drawImage(bob, x,y)
}

export default Hero
