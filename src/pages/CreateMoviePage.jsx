import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function CreateMoviePage() {

    // inizializa il navigate
    const navigate = useNavigate();

    // creiamo url dell'endpoint da chiamare
    const apiUrlMovie = `http://localhost:3000/api/movies/`

    // valore default oggetto info form
    const initialValueForm = {
        "title": "",
        "director": "",
        "genre": "",
        "release_year": 1895,
        "abstract": "",
        "image": null
    };

    // settiamo var di stato (oggetto con info form)
    const [formData, setFormData] = useState(initialValueForm);
    
    // funzione di gestione dati form all'onChange
    const setFieldValue = e => {
        // destruturiamo il terget dell'evento
        const { name, value } = e.target;
        // settiamo valore in oggetto della var di stato
        if (name === "image") setFormData({ ...formData, image: e.target.files[0] });
        else setFormData({ ...formData, [name]: value })
    }

    // funzione di gestione dell'invio dei dati del form 
    const handleSubmit = e => {
        // blocchiamo comportamento di default del form
        e.preventDefault();
        // chiamata axios per la rotta di store con info per il body
        axios.post(apiUrlMovie, formData, { headers: { 'Content-Type': "multipart/form-data" } })
            .then(() => {
                // svuota il form
                setFormData(initialValueForm);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <header className="border-bottom border-1 mb3">
                <h1>Add a new movie</h1>
            </header>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label>Title:</label>
                        <input
                            className="form-control"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={setFieldValue}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Director:</label>
                        <input
                            className="form-control"
                            name="director"
                            type="text"
                            value={formData.director}
                            onChange={setFieldValue}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Genre:</label>
                        <input
                            className="form-control"
                            name="genre"
                            type="text"
                            value={formData.genre}
                            onChange={setFieldValue}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Release year:</label>
                        <input
                            className="form-control"
                            name="release_year"
                            type="number"
                            min="1895"
                            max="2100"
                            value={formData.release_year}
                            onChange={setFieldValue}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Abstract:</label>
                        <textarea
                            className="form-control"
                            name="abstract"
                            type="text"
                            value={formData.abstract}
                            onChange={setFieldValue}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Image:</label>
                        <input
                            className="form-control"
                            name="image"
                            type="file"
                            onChange={setFieldValue}
                            required
                        />
                    </div>
                    <div className="border-top mb-3 pt-3 d-flex justify-content-between">
                        <Link className="btn btn-secondary" to="/">Back</Link>
                        <button className="btn btn-seccess" type="submit">Add movie</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CreateMoviePage