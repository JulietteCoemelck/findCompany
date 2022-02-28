const express = require('express');
const request = require('sync-request');
const nafrev1Model = require('../models/nafrev1');
const nafrev2Model = require('../models/nafrev2');
const naf1993Model = require ('../models/naf1993');
const napModel = require('../models/nap');
const router = express.Router();
//require('dotenv').config();

// POST COMPANIES //
router.post('/companies', function(req, res, next) {
  const input = req.body.input;

  // Call API Insee de tous les établissements ayant le CP 33000 et contenant l'input du front dans leur nom //
  const requete = request('GET', `https://api.insee.fr/entreprises/sirene/V3/siret?q=codePostalEtablissement:33000 AND denominationUniteLegale:${input}&champs=etatAdministratifEtablissement, dateFin, dateCreationUniteLegale, dateDebut, siret, activitePrincipaleEtablissement, nomenclatureActivitePrincipaleEtablissement, denominationUniteLegale, complementAdresseEtablissement, numeroVoieEtablissement, indiceRepetitionEtablissement, typeVoieEtablissement, libelleVoieEtablissement&nombre=50`, {
    headers: {
      'Authorization': `${process.env.API_BEARER}`,
      'Cookie': 'INSEE=138986250.20480.0000; pdapimgateway=1830169354.22560.0000'
    }
  });
  const dataAPI = JSON.parse(requete.body);

  // Suppression des entreprises représentants des personnes physiques (qui n'ont pas de nom) //
  const realCompanies = dataAPI.etablissements.filter((company) => company.uniteLegale.denominationUniteLegale !== undefined);
  
  res.json({companies: realCompanies}); 
});

// POST NAF //
router.post('/naf', async function(req, res, next) {
	const naf = req.body.naf;
  const nafType = req.body.nafType;
  let nafFromBack = '';


  if(nafType === 'NAFRev2'){
    const result = await nafrev2Model.find({ // Collection dans la BDD avec les NAF révision 2 de 2008
      ref: naf
    });
    
    if(result.length !== 0){
      nafFromBack = result[0].intitule;
    } else if (result.length === 0){

      // Call API Insee de l'intitulé de l'activité selon le code NAF envoyé depuis le front //
      const requete = request('GET', `https://api.insee.fr/metadonnees/V1/codes/nafr2/sousClasse/${naf}`, {
        headers: {
          'Authorization': process.env.API_BEARER,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          '': ''
        }
      });
      const dataAPI = JSON.parse(requete.body);

      if(dataAPI !== null){
        const newNafRev2 = new nafrev2Model({
          version: 'nafrev2',
          ref: dataAPI.code,
          intitule: dataAPI.intitule
        });
        const newNafRev2Saved = await newNafRev2.save();
        nafFromBack = newNafRev2Saved.intitule;
      };
    };


  } else if (nafType === 'NAFRev1'){
    const result = await nafrev1Model.findOne({ // Collection dans la BDD avec les 712 numéros NAF révision 1 de 2003
      ref: naf
    });
   
    if(result.length !== 0){
      nafFromBack = result.intitule;
    }


  } else if (nafType === 'NAF1993'){
    const result = await naf1993Model.findOne({ // Collection dans la BDD avec les 696 numéros NAF de 1993
      ref: naf
    });

    if(result.length !==0){
      nafFromBack = result.intitule;
    }


  } else if (nafType === 'NAP'){
    const result = await napModel.findOne({ // Collection dans la BDD avec les 650 numéros NAP de 1973
      ref: naf
    });
    
    if(result.length !==0){
      nafFromBack = result.intitule;
    }
  }
 
	res.json({naf: nafFromBack});
});



module.exports = router;
