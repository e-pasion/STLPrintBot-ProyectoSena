import nodeStl from 'node-stl'

export const calculateWeigth=( density, fill,  volumen)=>{
     console.log(volumen);
     let weigth=0;
     let l= Math.pow(volumen, 1 / 3);//calcular un lado
     let innerwall=l*l;//la pared exterior sera igual a el area de la figura
     let outerwall=(volumen-innerwall)*fill;//la pared interna es igual al volumen interno por el relleno
     weigth=((innerwall+outerwall)*(density));
     console.log(weigth);
     return weigth;
}

export const calculatePrice=(weigthPerGr,pricePerKg)=>{
     console.log((pricePerKg*weigthPerGr)/1000);
     return (pricePerKg*weigthPerGr)/1000;
}

