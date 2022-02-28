import './HomePage.css';
import Button from '../Button/Button';
import CompanyCard from '../CompanyCard/CompanyCard';
import { useState } from 'react';

export default function HomePage(){
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [inputResult, setInputResult] = useState('');

    // Requête au backend qui fait le call API //
    async function fetchData(input){
        const normalizedInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // suppression des accents
        console.log(input, normalizedInput)
        const response = await fetch('/companies', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `input=${normalizedInput}`
        });
        const jsonResponse = await response.json();
        setSearchResult(jsonResponse.companies);
    };

    // Validation du formulaire avec la touche Entrée //
    const handleKeyPress = (e) => {
        
        if(e.keyCode === 13){
            e.preventDefault();
            searchData(searchInput);
        };
    };

    // Appui sur le bouton recherche //
    const searchData = (input) => {
        setSearchResult([]); // on vide les résultats actuels
        fetchData(input); // call API
        setSearchInput(''); // réinialisation de l'input de la barre de recherche
        setInputResult(input); // pour garder l'input associé à la recherche
    };

    // Nouvelle recherche //
    const newSearch = (bool) => {
        if(bool === true){
            setSearchResult([]);
        };
    };
    
    // Mise en page des résultats //
    const companiesResult = (searchResult.map((company, i) => {
        let closedDate = null;
        if(company.periodesEtablissement[0].etatAdministratifEtablissement === 'F'){ // F = "Fermée" (voir doc de l'API: http://sirene.fr/sirene/public/variable/etatAdministratifUniteLegale)
            closedDate = company.periodesEtablissement[0].dateDebut;
        };
        if(company.adresseEtablissement.numeroVoieEtablissement === null){
            company.adresseEtablissement.numeroVoieEtablissement = '';
        };
        if(company.adresseEtablissement.typeVoieEtablissement === null){
            company.adresseEtablissement.typeVoieEtablissement = '';
        };
        if(company.adresseEtablissement.libelleVoieEtablissement === null){
            company.adresseEtablissement.libelleVoieEtablissement = '';
        };
        return (
            <CompanyCard 
            key={i} 
            name={company.uniteLegale.denominationUniteLegale.toLowerCase()}
            siret={company.siret}
            address={`${company.adresseEtablissement.numeroVoieEtablissement} ${company.adresseEtablissement.typeVoieEtablissement.toLowerCase()} ${company.adresseEtablissement.libelleVoieEtablissement.toLowerCase()} 33000 Bordeaux`}
            creation={company.uniteLegale.dateCreationUniteLegale}
            naf={company.periodesEtablissement[0].activitePrincipaleEtablissement}
            nafType={company.periodesEtablissement[0].nomenclatureActivitePrincipaleEtablissement}
            closed={closedDate}
            newSearchParent={newSearch}
            /> 
        );
          
    }));

    return (
        <div className='homepage'>

            <div className='searchBar'>
                <div className='searchBarInput'>
                    <form>
                        <label htmlFor='searchInput'>
                            <input 
                            placeholder='Rechercher une entreprise' 
                            type='text'
                            id='searchInput'
                            name='searchInput'
                            aria-label= 'searchInput'
                            aria-required= 'true'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput} 
                            onKeyDown={(event) => handleKeyPress(event)} />
                        </label>
                    </form>
                </div>

                <div className='searchBarButton' onClick={() => searchData(searchInput)}>
                    <Button name='Rechercher' />
                </div>

            </div>

            <div  className='resultsNumber'>
                {searchResult.length === 0 ? (
                    <p>Aucun résultat de recherche</p>
                ) : (
                    <p>
                        <strong>{searchResult.length}</strong> entreprises pour votre recherche "{inputResult}"
                    </p>
                )}
            </div>
            
            <div className='searchResult'>
                 {companiesResult} 
            </div>
            
        </div>
    )
};