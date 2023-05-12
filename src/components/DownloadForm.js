import { useRef } from 'react'
import './DownloadForm.css'

const DownloadForm = () => {

    const pwd = useRef();
    const file = useRef();

    const submit = () => {
        if (file.current.files[0]){
            const form = new FormData();
            form.append('file',file.current.files[0]);
            
            // fetch('http://localhost:4000/downloadMessage?'+ new URLSearchParams({
            fetch('https://api-codification.onrender.com/downloadMessage?'+ new URLSearchParams({
                key: pwd.current.value
            }), {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: form
            }).then( (response) => {
                if (response.status !== 500){
                    const reader = response.body.getReader();
                    return new ReadableStream({
                        start( controller ){
                            return pump();
                            function pump(){
                                return reader.read().then( ({ done, value}) => {
                                    if (done) {
                                        controller.close();
                                        return;
                                    }
                                    controller.enqueue(value);
                                    return pump();
                                });
                            }
                        }
                    })
                }
            })
            .then((stream) => new Response(stream))
            .then( (response) => response.blob() )
            .then( (blob) =>  {
                if( blob.size !== 0){
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "desencripted_message.txt";
                    link.click();
                }
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
                        <label for="file" class="form-label">Archivo con el mensaje para desencriptar</label>
                        <input class="form-control" type="file" id="file" accept='.des' ref={ file } />
                    </div>
                </div>
                <input className='btn btn-custom' type="submit" value='Enviar' onClick={submit} />
            </div>
            
        </div>
    )
}

export default DownloadForm;