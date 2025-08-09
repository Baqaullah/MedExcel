document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('show');
});

document.querySelectorAll('.dropdown').forEach(drop => {
    drop.addEventListener('click', function(e) {
        e.stopPropagation();
        this.querySelector('.dropdown-content').classList.toggle('show');
    });
});
