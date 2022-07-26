import { Photo } from '../types/Photo'
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

//Criei uma referencia para todos os CRUD

export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images")//refere se a pasta images criada no firebase

    const photoList = await listAll(imagesFolder); // Ler os arquivos que estão na pasta

    for (let i in photoList.items) { // percorre todo os arquivoes na pasta
        let photoUrl = await getDownloadURL(photoList.items[i]) //pega o link direto para acessar

        list.push({ //monta o array
            name: photoList.items[i].name,
            url: photoUrl
        })
    }

    return list; //retorna o array
}

export const insert = async (file: File) => {

    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = uuid();

        let refFile = ref(storage, `images/${randomName}`)

        let upload = await uploadBytes(refFile, file);

        let photoUrl = await getDownloadURL(upload.ref)

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;

    } else {
        return new Error('tipo de arquivo não permitido.')
    };


}


export const deletePhoto = () => {
    let randomName = uuid();
    let refFile = ref(storage, `images/${randomName}`)

    try {
        // Faz alguma coisa que pode quebrar
        deleteObject(refFile)
    } catch (error) {
        return new Error();
    }
}