$(document).ready(function() {
    // Robust Fetch-based submission
    $(document).on('click', '#submit-btn-trigger', function(e) {
        console.log("ROBUST SUBMIT CLICKED");
        
        var btn = $(this);
        var form = $('#contact-form');
        var formMessages = $('.ajax-response');
        
        // 1. Validation check
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        
        if (!name || !email || !message) {
            $(formMessages).removeClass('success').addClass('error').text('Please fill in all required fields (Name, Email, Message).');
            return;
        }

        // 2. Visual feedback
        var originalBtnText = btn.find('.td-btn-2').text();
        btn.prop('disabled', true).find('.td-btn-2').text('Sending...');
        console.log("Sending data to: " + form.attr('action'));

        // 3. Prepare Data
        var data = {
            name: name,
            email: email,
            phone: $('#phone').val(),
            website: $('#website').val(),
            message: message
        };

        // 4. Fetch Submission
        fetch(form.attr('action'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log("FETCH SUCCESS");
                $(formMessages).removeClass('error').addClass('success').text('Thank you! Your message has been sent successfully.');
                form[0].reset();
            } else {
                response.json().then(data => {
                    console.error("FETCH ERROR DATA:", data);
                    $(formMessages).removeClass('success').addClass('error');
                    if (data && data.errors) {
                        $(formMessages).text(data.errors.map(error => error.message).join(", "));
                    } else {
                        $(formMessages).text("Oops! There was a problem submitting your form.");
                    }
                });
            }
        }).catch(error => {
            console.error("FETCH FATAL ERROR:", error);
            $(formMessages).removeClass('success').addClass('error').text('Oops! There was a problem submitting your form.');
        }).finally(() => {
            btn.prop('disabled', false).find('.td-btn-2').text(originalBtnText);
        });
    });
});
