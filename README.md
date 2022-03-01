# findCompany
Application de recherche d'entreprises par **nom** et ayant pour **code postal 33000**.
> :arrow_right: Version déployée : https://juco-findcompany.herokuapp.com/

## :hammer_and_wrench: Technologies utilisées :
- Front : React.js
- Back : Express.js
- BDD : MongoDB
- API SIRENE (https://api.gouv.fr/les-api/sirene_v3) et API Métadonnées (https://api.gouv.fr/les-api/api-metadonnees-insee) de l'INSEE

## :memo: Accès aux détails de l'entreprise
- Siret 
- Adresse du siège social
- Date de création
- Activité (liée au NAF)
- NAF (numéro d'activité française)
- Date de clôture de l'entreprise s'il y en a une

## :bulb: Good to know
- limite de 30 recherches de nom par minute, imposée par l'API SIRENE
- pas de limite d'ouverture des fiches détaillées
- utilisation de l'API Multidonnées de l'INSEE pour trouver l'intitulé du NAF. Malheureusement, cette API ne reprend que les NAF les plus récents. Pour pallier à ça et éviter d'avoir des entreprises sans intitulé d'activité, les anciens NAF ont été ajoutés en BDD directement.
