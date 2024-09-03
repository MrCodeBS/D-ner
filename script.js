document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('credit-card-data.csv', {
        download: true,
        header: true,
        complete: function(results) {
            displayCreditCards(results.data);
        }
    });
});

function displayCreditCards(data) {
    const container = document.getElementById('card-container');
    
    data.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.animationDelay = `${index * 0.1}s`;
        
        const networkIcon = getNetworkIcon(card.network);
        
        cardElement.innerHTML = `
            <h2>${networkIcon} ${card.network}</h2>
            <div class="card-details">
                <div class="card-detail">
                    <strong>Card Number</strong>
                    <span>${maskCardNumber(card.credit_card_number)}</span>
                </div>
                <div class="card-detail">
                    <strong>CVV</strong>
                    <span>***</span>
                </div>
                <div class="card-detail">
                    <strong>Expiry Date</strong>
                    <span>${card.expiry_date}</span>
                </div>
                <div class="card-detail">
                    <strong>Card Holder</strong>
                    <span>${card.card_holder_name}</span>
                </div>
            </div>
        `;
        
        container.appendChild(cardElement);
    });
}

function maskCardNumber(number) {
    return 'XXXX-XXXX-XXXX-' + number.slice(-4);
}

function getNetworkIcon(network) {
    const iconMap = {
        'American Express': '<i class="fab fa-cc-amex"></i>',
        'Visa': '<i class="fab fa-cc-visa"></i>',
        'Mastercard': '<i class="fab fa-cc-mastercard"></i>',
        'Discover': '<i class="fab fa-cc-discover"></i>'
    };
    return iconMap[network] || '<i class="fas fa-credit-card"></i>';
}
