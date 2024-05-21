document.addEventListener('DOMContentLoaded', function() {
  const signaturePad = new SignaturePad(document.getElementById('signatureCanvas'));
  const clearSignatureButton = document.getElementById('clearSignatureButton');
  const devisButton = document.getElementById('devisButton');
  const factureButton = document.getElementById('factureButton');
  const devisForm = document.getElementById('devisForm');
  const factureForm = document.getElementById('factureForm');
  const sendDevisButton = document.getElementById('sendDevisButton');
  const sendFactureButton = document.getElementById('sendFactureButton');
  const emailInput = document.getElementById('emailInput');
  const designationInput = document.getElementById('designationInput');
  const quantityInput = document.getElementById('quantityInput');
  const priceHTInput = document.getElementById('priceHTInput');
  const tvaSelect = document.getElementById('tvaSelect');
  const factureTable = document.getElementById('factureTable');
  
  devisButton.addEventListener('click', function() {
    devisForm.classList.remove('hidden');
    factureForm.classList.add('hidden'); // Masquer le formulaire de facture
    signaturePad.clear(); // Effacer la signature précédente lorsque le formulaire de devis est affiché
  });

  factureButton.addEventListener('click', function() {
    factureForm.classList.remove('hidden');
    devisForm.classList.add('hidden'); // Masquer le formulaire de devis
    signaturePad.clear(); // Effacer la signature précédente lorsque le formulaire de facture est affiché
  });

  clearSignatureButton.addEventListener('click', function() {
    signaturePad.clear(); // Effacer la signature actuelle
  });

  sendDevisButton.addEventListener('click', function() {
    const clientEmail = emailInput.value;
    const tvaRate = parseFloat(tvaSelect.value) / 100;
    // Récupérer les autres données du devis
    // Calculer le montant total du devis
    const factureAmount = parseFloat(priceHTInput.value) * parseInt(quantityInput.value);
    let tvaAmount = 0;
    if (tvaRate > 0) {
      tvaAmount = factureAmount * tvaRate;
    }
    const totalAmount = factureAmount + tvaAmount;
    const signatureDataURL = signaturePad.toDataURL();
    // Envoyer le devis par e-mail avec l'adresse e-mail du client, les données de la facture et la signature
    emailInput.value = '';
    alert('Le devis a été envoyé avec succès.');
  });

  sendFactureButton.addEventListener('click', function() {
    // Logique pour envoyer la facture
  });
});
