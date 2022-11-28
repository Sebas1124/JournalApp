

export const fileUpload = async( file ) => {

    if ( !file ) throw new Error('No hay ningún archivo por subir');

    const CloudUrl = 'https://api.cloudinary.com/v1_1/drtbelmqv/image/upload';

    const formData = new FormData();

    formData.append('upload_preset','React-Journal-Redux');
    formData.append('file', file );

    try {

        const resp = await fetch( CloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( !resp.ok ) throw new Error('No se pudo subir la imagen');

        const cloudResp = await resp.json();

        return cloudResp;

        
    } catch (error) {
        console.log(error)
        throw new Error( error.message )
    }

}