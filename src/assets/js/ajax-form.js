$(document).ready(function() {
    // The main submit handler for the contact form
    $('#contact-form').on('submit', function(e) {
        // 1. STOP the browser from actually submitting (reloading the page)
        e.preventDefault();
        
        console.log("Submit event intercepted. Starting AJAX...");

        var form = $(this);
        var formMessages = $('.ajax-response');
        var formData = form.serialize();

        // Visual feedback
        var submitBtn = form.find('button[type="submit"]');
        var originalBtnText = submitBtn.find('.td-btn-2').text();
        submitBtn.prop('disabled', true).find('.td-btn-2').text('Sending...');

        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            dataType: 'json',
            headers: {
                'Accept': 'application/json'
            }
        })
        .done(function(response) {
            console.log("SUCCESS:", response);
            $(formMessages).removeClass('error').addClass('success');
            $(formMessages).text('Thank you! Your message has been sent successfully.');
            form[0].reset(); // Clear the form properly
        })
        .fail(function(data) {
            console.error("FAILURE (Details follow):", data);
            $(formMessages).removeClass('success').addClass('error');
            
            if (data.status === 0) {
                $(formMessages).text('Connection failed. Please check if your page reloaded or your internet connection.');
            } else if (data.responseJSON && data.responseJSON.errors) {
                $(formMessages).text(data.responseJSON.errors.map(function(error) { return error.message; }).join(', '));
            } else {
                $(formMessages).text('Oops! An error occurred. Please try again later.');
            }
        })
        .always(function() {
            submitBtn.prop('disabled', false).find('.td-btn-2').text(originalBtnText);
        });

        // Extra guard: return false to be absolutely sure no postback occurs
        return false; 
    });
});
