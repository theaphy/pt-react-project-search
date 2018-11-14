export var projects = fetch('http://patronicity.local/api/cards/card?type=all').then(function (response) {
    return response.json();
}).catch(function (error) {
    return console.error('Error:', error);
});