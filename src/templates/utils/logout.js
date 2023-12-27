window.onload = () => {
    main();
}

function main() {
    const logout = document.querySelector('#logout');

    logout.onclick = () => {
        if (confirm("Are you sure you want to logout?")) {
            window.location.href = '../logout'
        }
    }
}
