import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { MyToast } from './MyToast';
import { useParams } from 'react-router-dom';

export const Voiture = () => {
    const { id } = useParams();
    const [isSave, setIsSave] = useState(true);
    const [message, setMessage] = useState("Voiture Enregistrée avec succés.");
    const [voiture, setVoiture] = useState({
        marque: '',
        modele: '',
        couleur: '',
        annee: '',
        prix: '',
        proprietaire: '',
        immatricule: ''
    });
    const [proprietaires, setProprietaires] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8081/api/proprietaires')
            .then(response => {
                setProprietaires(response.data._embedded.proprietaires)
                console.log('Success:', response.data._embedded.proprietaires);
            })
            .catch(error => {
                if (error.response) {
                    // La requête a été faite, et le serveur a répondu avec un code de statut hors 2xx
                    console.error('Server responded with error:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    // La requête a été faite, mais aucune réponse n'a été reçue
                    console.error('No response received:', error.request);
                } else {
                    // Une erreur est survenue lors de la configuration de la requête
                    console.error('Error setting up request:', error.message);
                }
                console.error('Error details:', error.config);
            });

    }, [])
    useEffect(()=>{
        if(id){
            setIsSave(false)
            setMessage("Voiture Modifiée avec succés.")
            axios.get("http://localhost:8081/api/voitures/"+id)
            .then(response => {
                const voitureData = {
                    marque: response.data.marque,
                    modele: response.data.modele,
                    couleur: response.data.couleur,
                    annee: response.data.annee,
                    prix: response.data.prix,
                    proprietaire: {
                        id: response.data._embedded.proprietaire.id
                    },
                    immatricule: response.data.immatricule
                };
                setVoiture(voitureData)
                console.log('Success:', voitureData);
                console.log('Success:', response.data);
            })
            .catch(error => {
                if (error.response) {
                    // La requête a été faite, et le serveur a répondu avec un code de statut hors 2xx
                    console.error('Server responded with error:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    // La requête a été faite, mais aucune réponse n'a été reçue
                    console.error('No response received:', error.request);
                } else {
                    // Une erreur est survenue lors de la configuration de la requête
                    console.error('Error setting up request:', error.message);
                }
                console.error('Error details:', error.config);
            });
        }
        console.log("id :"+id)
    },[id])
    const resetVoitures = () => {
        setVoiture({
            marque: '',
            modele: '',
            couleur: '',
            annee: '',
            prix: '',
            proprietaire: '',
            immatricule: ''
        })
    }
    // Fonction de soumission du formulaire
    const submitVoiture = (event) => {
        event.preventDefault();
        console.log(voiture)
        if(isSave){
            axios.post("http://localhost:8081/api/voitures", voiture)
            .then(response => {
                if (response.data != null) {
                    setVoiture({
                        marque: '',
                        modele: '',
                        couleur: '',
                        annee: '',
                        prix: '',
                        proprietaire: '',
                        immatricule: ''
                    })
                    setShow(true)
                }
            })
        }else{
            axios.put("http://localhost:8081/api/voitures/"+id, voiture)
            .then(response => {
                if (response.data != null) {
                    setVoiture({
                        marque: '',
                        modele: '',
                        couleur: '',
                        annee: '',
                        prix: '',
                        proprietaire: '',
                        immatricule: ''
                    })
                    setShow(true)
                }
            })
        }
        // Vous pouvez ici envoyer les données à une API, ou les traiter
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVoiture({
            ...voiture,
            [name]: value // Mise à jour de l'état en fonction du champ modifié
        });
    };
    const handleSelectChange = (event) => {
        setVoiture({
            ...voiture,
            proprietaire: {
                id: event.target.value
            }
        });
        console.log("Propriétaire sélectionné:", event.target.value); // Afficher dans la console
    };
    const handleClose = () => setShow(false);
    return (
        <Card className="border border-dark bg-dark text-white">
            <Card.Header> <FontAwesomeIcon icon={faPlusSquare} /> Ajouter Voiture</Card.Header>
            <Form onReset={resetVoitures} onSubmit={submitVoiture} id='VoitureFormId'>
                <Card.Body>
                    <Row>
                        <Form.Group as={Col} controlId='fromGridMarque'>
                            <Form.Label>Marque</Form.Label>
                            <Form.Control required autoComplete='off' name="marque" type="text" className="bg-dark text-white" placeholder="Entrez Marque Voiture" value={voiture.marque} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId='fromGridModele'>
                            <Form.Label>Modele</Form.Label>
                            <Form.Control required autoComplete='off' name="modele" type="text" className="bg-dark text-white" placeholder="Entrez Modele Voiture" value={voiture.modele} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId='fromGridImmatricule'>
                            <Form.Label>Immatricule</Form.Label>
                            <Form.Control required autoComplete='off' name="immatricule" type="text" className="bg-dark text-white" placeholder="Entrez immatricule Voiture" value={voiture.immatricule} onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId='fromGridCouleur'>
                            <Form.Label>Couleur</Form.Label>
                            <Form.Control required autoComplete='off' name="couleur" type="text" className="bg-dark text-white" placeholder="Entrez Couleur Voiture" value={voiture.couleur} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId='fromGridAnnee'>
                            <Form.Label>Année</Form.Label>
                            <Form.Control required autoComplete='off' name="annee" type="number" className="bg-dark text-white" placeholder="Entrez Année Voiture" value={voiture.annee} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId='fromGridPrix'>
                            <Form.Label>Prix</Form.Label>
                            <Form.Control required autoComplete='off' name="prix" type="number" className="bg-dark text-white" placeholder="Entrez Prix Voiture" value={voiture.prix} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId='fromGridProp'>
                            <Form.Label>Proprietaire</Form.Label>
                            <Form.Select className='bg-dark text-white' aria-label="Default select example" value={voiture.proprietaire.id} name='proprietaire' onChange={handleSelectChange}>
                                <option>Open this select menu</option>
                                {
                                    proprietaires.length === 0 ?
                                        <option>One</option>
                                        :
                                        proprietaires.map((proprietaire) => (
                                            <option key={proprietaire.id} value={proprietaire.id}> {proprietaire.nom} {proprietaire.prenom} </option>
                                        ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Card.Body>
                <Card.Footer style={{ "textAlign": "right" }}>
                    <Button size="sm" variant="success" type="submit" className='me-2' > <FontAwesomeIcon icon={faSave} /> { isSave ? "Submit" : "Update"    } </Button>
                    <Button size="sm" variant="info" type="reset"> <FontAwesomeIcon icon={faUndo} /> Reset</Button>
                </Card.Footer>
            </Form>
            <div style={{ "display": show ? "block" : "none" }}>
                <MyToast children={{ show: show, message: message, type: "success" }} handleClose={handleClose} />
            </div>
        </Card>
    )
}
