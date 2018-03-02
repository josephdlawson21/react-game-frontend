

// class Hero extends React.Component {
//   constructor(map,x,y,ctx){
//     super()
//
//
//     ctx.drawImage(this.character, x,y)
//   }
//
// }

const Hero = (map,arr,ctx) => {
  let bob = document.getElementById('character');
  ctx.drawImage(
    bob, // image
    (arr[0] * map.tsize) + 7, // target x
    (arr[1] * map.tsize) + 7 // target y
  );
}

export default Hero
