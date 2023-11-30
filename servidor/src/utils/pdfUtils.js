export const generatePdfHtml= (product)=>{
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalle del Producto</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #fff;
                text-align: center;
                color: #333;
            }
    
            .product-container {
                width: 80%;
                max-width: 800px;
                box-sizing: border-box;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
    
            .product-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border-bottom: 2px solid #eee;
            }
    
            .product-image {
                width: 50%;
                height: auto;
                border-radius: 5px;
            }
    
            .product-info {
                width: 45%;
                text-align: left;
            }
    
            .product-info h2 {
                color: #333;
                margin-bottom: 10px;
            }
    
            .specification {
                text-align: left;
            }
    
            .specification p {
                margin: 5px 0;
            }
    
            .download-links {
                padding: 20px;
                background-color: #ffff;
            }
    
            .download-links a {
                display: block;
                margin-bottom: 10px;
                text-decoration: none;
                padding: 10px;
                background-color: #4caf50;
                color: #fff;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="product-container">
            <div class="product-content">
                <img class="product-image" src="${product.path.downloadImg}" alt="Producto 3D">
                <div class="product-info">
                    <h2>Información del Producto</h2>
                    <div class="specification">
                        <p>Relleno: ${product.fill+" %"}</p>
                        <p>Tamaño (X): ${product.size.x+" cm"}</p>
                        <p>Tamaño (Y): ${product.size.y+" cm"}</p>
                        <p>Tamaño (Z): ${product.size.z+" cm"}</p>
                        <p>Color Nombre: ${product.color.name}</p>
                        <p>Color Codigo: ${product.color.code}</p>
                        <p>Peso: ${product.weigth+" kg"}</p>
                        <p>Cantidad: ${product.quantity}</p>
                    </div>
                </div>
            </div>
            <div class="download-links">
                <a href="${product.path.downloadImg}">Descargar Imagen</a>
                <a href="${product.path.downloadStl}">Descargar Archivo</a>
            </div>
        </div>
    </body>
    </html>
    
    
    `;
}