import { deletePhoto } from '../../services/photos';
import * as style from './style'

type Props = {
    url: string;
    name: string;
}

export const PhotoItem = ({ url, name }: Props) => {
    return (
        <style.Container >
            <img src={url} alt={name} />
            {name}
            {
                <style.BtnDiv onClick={deletePhoto}>
                    Deletar
                </style.BtnDiv>
            }
        </style.Container >

    )
}