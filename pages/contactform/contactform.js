jQuery(document).ready(function ($) {
  "use strict";
  $('#img-load').hide();
  //Contact
  $('#btnContactUs').click(function (event) {
    var f = $('form.contactForm').find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    //Checking for extensions - Aimal
    var allowedExtensions = ["pdf", "doc", "docx", "jpg", "jpeg", "png", "gif", "txt"];
    var fileSizes = 0;
    var files = $('#fileToUpload').prop('files');
    for (var i = 0; i < files.length; i++) {
      if (files[i] != null) {
        fileSizes += files[i].size;
        var extn = files[i].name.split('.').pop();
        if (!allowedExtensions.includes(extn.toLowerCase())) {
          ferror = true;
          $('#formValidation').html("File name: " + files[i].name + " is not supported, select a valid file!").show();
          break;
        } else if (fileSizes > 20 * 1024 * 1024) {
          //checking for size, must be less than or equal to 20 MB
          ferror = true;
          $('#formValidation').html("File size too huge. Must be less than or equal to 20 MB").show();
          break;
        }
      }
    }
    debugger;
    if (ferror) {
      event.preventDefault();
      return false;
    }
    else {
      
      var action = $(this).attr('action');

      if (!action) {
        action = 'contactform/contactform.php';
      }

      $('#myLoadingModal').modal('show');
      var contactFormData = new FormData();
      contactFormData.append('name', $('#name').val());
      contactFormData.append('email', $('#email').val());
      contactFormData.append('subject', $('#subject').val());
      contactFormData.append('message', $('#textAreaMsg').val());
      for (var x = 0; x < document.getElementById('fileToUpload').files.length; x++) {
        contactFormData.append('my_file[]', document.getElementById('fileToUpload').files[x]);
      }
      $.ajax({
        type: "POST",
        url: action,
        data: contactFormData,
        processData: false,
        contentType: false,
        success: function (msg) {
          if (msg.includes("Mailer Error")) {
            $("#sendmessage").removeClass("show");
            $('#formValidation').hide();
            $("#errormessage").addClass("show");
            $('#errormessage').html("Something went wrong while processing your request, please contact us by phone!");
            $('#myLoadingModal').modal('hide');
          }
          else if (msg.includes("Message has been sent")) {
            $("#sendmessage").addClass("show");
            $("#errormessage").removeClass("show");
            $('#formValidation').hide();
            $('.contactForm').find("input, textarea").val("");
            $('#myLoadingModal').modal('hide');
          }
        }
      });
    }
  });

});
