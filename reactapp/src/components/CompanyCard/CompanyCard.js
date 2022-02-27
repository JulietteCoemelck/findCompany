import './CompanyCard.css';
import Button from '../Button/Button';
import CompanyDetails from '../CompanyDetails/CompanyDetails';
import { useState } from 'react';

export default function CompanyCard(props){
    const [toggleDetails, setToggleDetails] = useState(false);
    const [companyActivity, setCompanyActivity] = useState('');

    // Afficher les détails de l'entreprise //
    const isOpened = (bool) => {
        setToggleDetails(bool);
    };
    
    // Reverse data flow réinialisation de la recherche //
    const newSearch = (bool) => {
        props.newSearchParent(bool);
    }

    // Recherche back de l'intitulé NAF //
    async function searchNAFBack(naf, nafType){
        const responseNAFBack = await fetch('/naf', {
        method:'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`naf=${naf}&nafType=${nafType}`
        })
        const jsonResponseNAFBack = await responseNAFBack.json();
        setCompanyActivity(jsonResponseNAFBack.naf);
    };

    // Déclenche la recherche de l'intitulé NAF de l'entreprise //
    const searchNAF = (naf, nafType) => {
        setToggleDetails(true);
        if (props.nafType === 'NAFRev2' || props.nafType === 'NAFRev1' || props.nafType === 'NAF1993' || props.nafType === 'NAP'){
            searchNAFBack(naf, nafType);
        } else {
            setCompanyActivity(null);
        };
    };
    

    return (
        <>

            

        {toggleDetails === true ? (
            <CompanyDetails 
            name={props.name}
            siret={props.siret}
            address={props.address}
            creation={props.creation}
            activity={companyActivity}
            naf={props.naf}
            nafType={props.nafType}
            closed={props.closed}
            isOpenedParent={isOpened}
            newSearchParent={newSearch} 
            />
        ) : (
            <div className='companyCard'>
                <h2>{props.name}</h2>
                <p>Siret: {props.siret}</p>
                <div onClick={() => searchNAF(props.naf, props.nafType)}>
                    <Button 
                    name='Voir la fiche'
                    />
                    
                </div>   
            </div>
        )}

        

        </>
        
    );
};