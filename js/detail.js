$.getJSON('json/reward.json', function (data) {
    const reward = data.rewards[0];

    $('#namaVoc').text(reward.nama);
    $('#poinVoc').text(`${reward.poin.toLocaleString()} Poin`);
    $('#perVoc').text(reward.period);
    $('#deskVoc').text(reward.deskripsi);

}).fail(function (jqxhr, textStatus, error) {
    const err = textStatus + ", " + error;
    console.error('Error fetching the JSON file:', err);
});

$(document).ready(function () {
    $('.nav-item').on('click', function () {
        const page = $(this).data('page');
        
        window.location.href = page;
    });
});
