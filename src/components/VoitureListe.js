import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap'
import { MyToast } from './MyToast'
import { Link } from 'react-router-dom'

export const VoitureListe = () => {
    const [voitures, setVoitures] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8081/voitures')
            .then(response => {
                setVoitures(response.data)
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

    }, [])
    const deleteVoiture = (voitureId) => {
        console.log(voitureId)
        axios.delete("http://localhost:8081/api/voitures/" + voitureId)
            .then(response => {
                if (response.data != null) {
                    setShow(true)
                    setVoitures(voitures.filter(voiture => voiture.id !== voitureId))
                }
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }
    const handleClose = () => setShow(false);
    return (
        <Card className="border border-dark bg-dark text-white">
            <Card.Header> <FontAwesomeIcon icon={faList} /> Liste Voitures </Card.Header>
            <Card.Body>
                <Table variant="dark" bordered hover striped>
                    <thead>
                        <tr>
                            <th>Marque</th>
                            <th>Modele</th>
                            <th>Couleur</th>
                            <th>Immatricule</th>
                            <th>Annee</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            voitures.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">Aucune Voiture n'est disponible</td>
                                </tr>
                                :
                                voitures.map((voiture) => (
                                    <tr key={voiture.id}>
                                        <td> {voiture.marque} </td>
                                        <td> {voiture.modele} </td>
                                        <td> {voiture.couleur} </td>
                                        <td> {voiture.immatricule} </td>
                                        <td> {voiture.annee} </td>
                                        <td> {voiture.prix} </td>
                                        <td className='d-flex justify-content-center'>
                                            <ButtonGroup>
                                                <Link to={"/edit/"+voiture.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>
                                                <Button size='sm' variant='outline-danger' onClick={() => deleteVoiture(voiture.id)} ><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
            </Card.Body>
            <div style={{ "display": show ? "block" : "none" }}>
                <MyToast children={{ show: show, message: "Voiture supprimée avec succès.", type: "danger" }} handleClose={handleClose} />
            </div>
        </Card>
    )
}
