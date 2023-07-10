

export const dataURLtoFile=(dataUrl:string, fileName:string)=>{
 
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}

export const fixPath=(path:string,type:string)=>{
  let fixedpath=path.replace('src\\', '');
  fixedpath.replace(/\\/g, '/'); //expresion regular para cambiar todas las barras invertidas por barras normales
  console.log(fixedpath);
  fixedpath.split(' ').join('%20');;//expresion regular que reemplaza los espacios vacios para que no haya errores
  console.log(fixedpath);
  return (`http://localhost:4000/api/${fixedpath}`);
}

export const downloadFile = async (fileURL: string, fileName: string) => {
  const response = await fetch(fileURL);
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  const archivo = new File([blob], fileName);
  // Hacer algo con el archivo
  return archivo;
};