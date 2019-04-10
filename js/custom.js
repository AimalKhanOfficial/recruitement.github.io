function readMoreInAPopUp(header, htmlToShow) {
    $('#myModal').modal('show');
    document.getElementById('pop-up-modal-title').innerText = header;
    document.getElementById('pop-up-modal-body').innerHTML = htmlToShow;
}
