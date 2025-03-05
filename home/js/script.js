function showContent(id) {
    const contents = document.querySelectorAll('.folder-content');
    contents.forEach(content => content.classList.remove('active'));

    const content = document.getElementById(id);
    if (content) {
        content.classList.add('active');
    }
}
