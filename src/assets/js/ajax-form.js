$(document).ready(function() {
    // Handling form submission via event delegation
    $(document).on('submit', '#contact-form', function(e) {
        e.preventDefault();
        console.log("Form submission started...");

        var form = $(this);
        var formMessages = $('.ajax-response');
        var formData = form.serialize();

        // Visual feedback: disable button
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
            console.log("Form extraction success:", response);
            $(formMessages).removeClass('error').addClass('success');
            $(formMessages).text('Thank you! Your message has been sent successfully.');
            form.find('input, textarea').val('');
        })
        .fail(function(data) {
            console.error("Form extraction failure:", data);
            $(formMessages).removeClass('success').addClass('error');
            if (data.responseJSON && data.responseJSON.errors) {
                $(formMessages).text(data.responseJSON.errors.map(function(error) { return error.message; }).join(', '));
            } else {
                $(formMessages).text('Oops! An error occurred and your message could not be sent.');
            }
        })
        .always(function() {
            submitBtn.prop('disabled', false).find('.td-btn-2').text(originalBtnText);
        });
    });

    // Fallback: Ensure button click triggers form submit
    $(document).on('click', '#contact-form button[type="submit"]', function(e) {
        console.log("Submit button clicked");
        $(this).closest('form').submit();
    });
});
