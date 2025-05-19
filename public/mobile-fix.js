// Mobile keyboard fix script
document.addEventListener('DOMContentLoaded', function() {
  // Helper function to fix password inputs
  function fixPasswordInputs() {
    // Find all password inputs from Clerk
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    // Apply fixes to each password input
    passwordInputs.forEach(input => {
      // Ensure proper attributes are set
      input.setAttribute('autocomplete', 'current-password');
      input.setAttribute('inputmode', 'text');
      input.style.fontSize = '16px'; // Prevent iOS zoom
      
      // Ensure it's not readonly
      input.removeAttribute('readonly');
      
      // Force focus behavior
      input.addEventListener('touchstart', function(e) {
        // Small delay to ensure browser recognizes it as a user action
        setTimeout(() => {
          this.focus();
        }, 100);
      });
    });
  }
  
  // Initial fix
  fixPasswordInputs();
  
  // Use MutationObserver to handle dynamically added inputs
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // Check if any password inputs were added
        fixPasswordInputs();
      }
    });
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
}); 