export const projects = fetch('http://patronicity.local/api/cards/card?type=all')
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
