document.addEventListener("DOMContentLoaded", function() {
    var dropdowns = document.querySelectorAll('.dropdown');
    for (var x in dropdowns) {
        dropdowns[x].onclick = function() {
            this.querySelector('ul').classList.toggle('show-dropdown');
        };
    }
    var title = document.querySelector('.responsive-menu-title');
    title.onclick = function() {
        document.querySelector('.GenLayout #Menu-responsive .menu-ul-responsive').classList.toggle('show-dropdown');
    };
});