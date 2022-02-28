import './CompanyDetails.css';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function CompanyDetails(props){
    const [height, setHeight] = useState('');
    
    // Reverse data flow pour fermer les détails de l'entreprise //
    const closeDetails = () => {
        props.isOpenedParent(false);
    }

    // Style du cercle selon ouverture ou fermeture de l'entreprise //
    const companyDetailsBackgroundStyle = {
        Open: {
            backgroundColor: "#26B6B5"
        },
        Close: {
            backgroundColor: '#b62626'
        }
      };
    
    // Style dynamique de la hauteur de la div parent par rapport à la hauteur de la div enfant à l'initialisation du composant //
    useEffect(() => {
        
            let heightComponent = document.getElementById('companyDetailsInfos');
            setHeight(heightComponent.offsetHeight)
            
    }, []);
    

    return (
        <div className='companyDetailsContainer'>
            <div className='companyDetailsBackButton' onClick={() => closeDetails()}>
                <p>
                    <FontAwesomeIcon 
                        icon={faAngleLeft}
                        className='icon' /> 
                    Retour
                </p>
            </div>
            <div className='companyDetailsCircleContainer' style={{height: `${height}px`}}>
                <div className='companyDetailsCircle' style={props.closed ? (companyDetailsBackgroundStyle.Close) : (companyDetailsBackgroundStyle.Open)}>
                    <div id='companyDetailsInfos'>
                        <h3 title={props.name.toUpperCase()}>{props.name}</h3>
                        <p>
                            <strong>Siret :</strong>
                            <span title={props.siret}>{props.siret}</span>
                        </p>
                        <p>
                            <strong>Siège social :</strong>
                            <span title={props.address.toUpperCase()}>{props.address}</span>
                        </p>
                        <p>
                            <strong>Date de création :</strong> 
                            <span>{props.creation ? (props.creation) : ('Date inconnue')}</span>
                        </p>
                        <p>
                            <strong>Activité :</strong>
                            <span>{props.activity ? (props.activity) : ('Activité inconnue')}</span>
                        </p>
                        <p>
                            <strong>NAF :</strong> 
                            <span>{props.naf} ({props.nafType})</span>
                        </p>
                        {props.closed ? (
                        <p>
                            <strong>Date de clôture :</strong> 
                            <span style={{color: '#b62626'}}>{props.closed}</span>
                        </p>
                        ) : (null)}
                    </div>
                </div>
                </div>

            <div onClick={() => {closeDetails(); props.newSearchParent(true)}} style={{marginTop: '94px'}}>
                <Button name='Nouvelle Recherche'/>
            </div>
        </div>
    )
};