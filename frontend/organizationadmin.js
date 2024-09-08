document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    fetch('headeradmin.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
            console.log('Header loaded');
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            console.log('Footer loaded');
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Toggle form visibility
document.getElementById('toggleAddForms').addEventListener('click', function() {
    const addCoordinatorForm = document.getElementById('addCoordinatorForm');
    const addStaffForm = document.getElementById('addStaffForm');
    
    if (addCoordinatorForm.classList.contains('hidden')) {
        addCoordinatorForm.classList.remove('hidden');
        addCoordinatorForm.classList.add('block');
    } else {
        addCoordinatorForm.classList.add('hidden');
        addCoordinatorForm.classList.remove('block');
    }

    if (addStaffForm.classList.contains('hidden')) {
        addStaffForm.classList.remove('hidden');
        addStaffForm.classList.add('block');
    } else {
        addStaffForm.classList.add('hidden');
        addStaffForm.classList.remove('block');
    }
});
