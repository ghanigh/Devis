document.addEventListener('DOMContentLoaded', function() {
  const devisButton = document.getElementById('devisButton');
  const factureButton = document.getElementById('factureButton');
  const devisForm = document.getElementById('devisForm');
  const signaturePad = new SignaturePad(document.getElementById('signatureCanvas'));
  const clearSignatureButton = document.getElementById('clearSignatureButton');
  const sendDevisButton = document.getElementById('sendDevisButton');
  const addDevisItemButton = document.getElementById('addDevisItemButton');
  const devisTableBody = document.getElementById('devisTable').querySelector('tbody');
  const tvaSelect = document.getElementById('tvaSelect');

  devisButton.addEventListener('click', function() {
    devisForm.classList.remove('hidden');
    signaturePad.clear(); // Clear previous signature when the form is displayed
  });

  factureButton.addEventListener('click', function() {
    alert('La fonctionnalité de création de factures n\'est pas encore implémentée.');
  });

  clearSignatureButton.addEventListener('click', function() {
    signaturePad.clear(); // Clear the current signature
  });

  sendDevisButton.addEventListener('click', function() {
    const clientEmail = document.getElementById('emailInput').value;
    if (!clientEmail) {
      alert('Veuillez remplir l\'adresse e-mail du client.');
      return;
    }
    // Other data retrieval and processing here...
    const signatureDataURL = signaturePad.toDataURL();
    // Send the data (e.g., using an AJAX request)
    alert('Le devis a été envoyé avec succès.');
  });

  addDevisItemButton.addEventListener('click', function() {
    const newRow = document.createElement('tr');

    const designationCell = document.createElement('td');
    const designationInput = document.createElement('input');
    designationInput.type = 'text';
    designationCell.appendChild(designationInput);
    newRow.appendChild(designationCell);

    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '0';
    quantityInput.value = '1';
    quantityCell.appendChild(quantityInput);
    newRow.appendChild(quantityCell);

    const priceCell = document.createElement('td');
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.min = '0';
    priceInput.step = '0.01';
    priceInput.value = '0.00';
    priceCell.appendChild(priceInput);
    newRow.appendChild(priceCell);

    const tvaCell = document.createElement('td');
    tvaCell.textContent = tvaSelect.value;
    newRow.appendChild(tvaCell);

    const tvaAmountCell = document.createElement('td');
    tvaAmountCell.textContent = '0.00';
    newRow.appendChild(tvaAmountCell);

    const totalCell = document.createElement('td');
    totalCell.textContent = '0.00';
    newRow.appendChild(totalCell);

    devisTableBody.appendChild(newRow);

    quantityInput.addEventListener('input', updateRow);
    priceInput.addEventListener('input', updateRow);
    tvaSelect.addEventListener('change', updateAllRows);

    function updateRow() {
      const quantity = parseFloat(quantityInput.value) || 0;
      const price = parseFloat(priceInput.value) || 0;
      const tvaRate = parseFloat(tvaSelect.value) / 100;
      const tvaAmount = (quantity * price) * tvaRate;
      const total = (quantity * price) + tvaAmount;

      tvaCell.textContent = (tvaRate * 100).toFixed(2) + '%';
      tvaAmountCell.textContent = tvaAmount.toFixed(2);
      totalCell.textContent = total.toFixed(2);
    }

    function updateAllRows() {
      Array.from(devisTableBody.querySelectorAll('tr')).forEach(row => {
        const quantityInput = row.querySelector('input[type="number"]:nth-child(2)');
        const priceInput = row.querySelector('input[type="number"]:nth-child(3)');
        const tvaCell = row.querySelector('td:nth-child(4)');
        const tvaAmountCell = row.querySelector('td:nth-child(5)');
        const totalCell = row.querySelector('td:nth-child(6)');

        const quantity = parseFloat(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        const tvaRate = parseFloat(tvaSelect.value) / 100;
        const tvaAmount = (quantity * price) * tvaRate;
        const total = (quantity * price) + tvaAmount;

        tvaCell.textContent = (tvaRate * 100).toFixed(2) + '%';
        tvaAmountCell.textContent = tvaAmount.toFixed(2);
        totalCell.textContent = total.toFixed(2);
      });
    }
  });
});
