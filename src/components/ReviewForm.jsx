import axios from "axios"
import { useState } from "react"

function ReviewForm({ movie_id, refreshReviews }) {

    // creiamo url dell'endpoint da chiamare
    const apiUrl = `http://localhost:3000/api/movies/${movie_id}/reviews`

    // valore default oggetto info form
    const initialValueForm = {
        "text": "",
        "name": "",
        "vote": 1
    };

    // settiamo var di stato (oggetto info form)
    const [formData, setFormData] = useState(initialValueForm);
    // altra var di stato per validazione
    const [isFormValid, setIsFormValid] = useState(true);

    // funzione di check validazione e settaggio stato relativo
    const validateForm = () => {
        if (!formData.text || !formData.name) return false
        if (isNaN(formData.vote) || formData.vote < 1 || formData.vote > 5) return false

        return true
    }

    // funzione di gestione dati form all'onChange
    const setFieldValue = e => {
        // destrutturiamo il target dell'evento
        const { name, value } = e.target;
        // settiamo valore in oggetto della var di stato
        setFormData({ ...formData, [name]: value })
    }

    // funzione di gestione dell'invio dei dati del form
    const handleSubmit = e => {
        // blocchiamo comportamento di default del form
        e.preventDefault();

        // check di validazione in caso per fermare qiu la funzione di Submit
        if (!validateForm()) {
            setIsFormValid(false)
            return
        }

        // chiamata axios per la rotta di store con info per il body
        axios.post(apiUrl, formData, { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                // svuota il form
                setFormData(initialValueForm);
                // riesegui la chiamata del dettaglio movie con reviews aggiornate
                refreshReviews();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => { setIsFormValid(true) })
    }

    return (
        <div className="card">
            <header className="card-header">
                <h5>Add your review</h5>
            </header>
            <div className="card-body">
                {!isFormValid && <div className="alert alert-danger mb-3">The data in the form is not valid</div>}

                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control" value={formData.name} onChange={setFieldValue} />
                    </div>
                    <div className="form-group">
                        <label>Review</label>
                        <textarea name="text" className="form-control" value={formData.text} onChange={setFieldValue}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Vote</label>
                        <input type="number" min="1" max="5" name="vote" className="form-control" value={formData.vote} onChange={setFieldValue} />
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm