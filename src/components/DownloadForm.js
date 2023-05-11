import { useRef } from 'react'
import './DownloadForm.css'

const DownloadForm = () => {
    const file = useRef();

    const submit = () => {
        if (file.current.files[0]){
            console.log(file.current.files[0]);
            const form = new FormData();
            form.append('file',file.current.files[0]);
            console.log(form);

            fetch('http://localhost:4000/downloadMessage', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: form
            }).then((response) => {
                console.log(response)
                let blob = new Blob([response], {type: 'application/octet-stream'});
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "desencripted_message.txt";
                link.click();
            })
            .catch((err) => console.log(err));
        }
        else{
            console.log('campos vacios');
            alert('Existen campos vacios verifique la información')
        }

    }

    return(
        <div className="container-md container-customize rounded-3 border bg-white mt-4 py-3">
            <h2 className='text-center font-text'>Subir Archivo</h2>
            <hr />
            <div>
                <div>
                    <div class="mb-3">
                        <label for="file" class="form-label">Archivo con el mensaje para desencriptar</label>
                        <input class="form-control" type="file" id="file" accept='*.txt' ref={ file } />
                    </div>
                </div>
                <input className='btn btn-custom' type="submit" value='Enviar' onClick={submit} />
            </div>
            
        </div>
    )
}

export default DownloadForm;