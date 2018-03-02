

// class Hero extends React.Component {
//   constructor(map,x,y,ctx){
//     super()
//
//
//     ctx.drawImage(this.character, x,y)
//   }
//
// }

const Hero = (map,col,row,ctx) => {
  let bob = document.getElementById('character');
  ctx.drawImage(
    bob, // image
    (col * map.tsize) + 7, // target x
    (row * map.tsize) + 7 // target y
  );
}

export default Hero
