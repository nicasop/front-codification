import { useRef } from 'react'
import './UploadForm.css'


const UploadForm = () => {

    const pwd = useRef();
    const file = useRef();

    const submit = () => {
        if (pwd.current.value && file.current.files[0]){
            console.log(pwd.current.value);
            console.log(file.current.files[0]);
            const form = new FormData();
            form.append('file',file.current.files[0]);
            console.log(form);

            fetch('http://localhost:4000/uploadData?'+ new URLSearchParams({
                key: pwd.current.value
            }), {
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
                link.download = "encripted.des";
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
                        <label for="pwd" class="form-label">Clave de encriptación</label>
                        <input type="text" class="form-control" id="pwd" name='pwd' ref={ pwd } />
                    </div>
                    <div class="mb-3">
                        <label for="file" class="form-label">Archivo con el mensaje para encriptar</label>
                        <input class="form-control" type="file" id="file" accept='*.txt' ref={ file } />
                    </div>
                </div>
                <input className='btn btn-custom' type="submit" value='Enviar' onClick={submit} />
            </div>
            
        </div>
    )
}

export default UploadForm;