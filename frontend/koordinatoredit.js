document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    fetch('headeradmin.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Handle form submissions for adding and updating staff/coordinator
    document.getElementById('edit-coordinator-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle the update of coordinator details
        alert('Koordinator updated!');
    });

    document.getElementById('add-staff-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle the addition of new staff
        alert('Staff added!');
    });

    

    // You can add more JavaScript to handle dynamic content and interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Highlight effect for inputs and buttons
        const elements = document.querySelectorAll('input, button');
        elements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('ring-indigo-500', 'ring-offset-2', 'ring-2');
            });
    
            element.addEventListener('blur', () => {
                element.classList.remove('ring-indigo-500', 'ring-offset-2', 'ring-2');
            });
        });
    
    });

        // Referensi elemen modal
        const editStaffModal = document.getElementById('editStaffModal');
        const cancelEditStaffBtn = document.getElementById('cancelEditStaff');
    
        // Fungsi untuk membuka modal dengan data staff
        function openEditStaffModal(staffData) {
            document.getElementById('editStaffName').value = staffData.name;
            // Set image or other data as needed
    
            // Tampilkan modal
            editStaffModal.classList.remove('hidden');
            editStaffModal.classList.add('show');
        }
    
        // Fungsi untuk menutup modal
        function closeEditStaffModal() {
            editStaffModal.classList.remove('show');
            editStaffModal.classList.add('hidden');
        }
    
        // Event listener untuk tombol "Edit" pada staff
        document.querySelectorAll('.edit-staff-btn').forEach(button => {
            button.addEventListener('click', function () {
                const staffData = {
                    name: 'Nama Staff', // Replace with actual staff data
                    // Add other data as needed
                };
                openEditStaffModal(staffData);
            });
        });
    
        // Event listener untuk tombol "Batal"
        cancelEditStaffBtn.addEventListener('click', closeEditStaffModal);
    
        // Event listener untuk form submit di modal
        document.getElementById('edit-staff-form').addEventListener('submit', function (e) {
            e.preventDefault();
            // Proses data yang diperbarui
    
            // Tutup modal setelah submit
            closeEditStaffModal();
        });

});
    
