    // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the form and quote list
    const form = document.getElementById('new-quote-form');
    const quoteList = document.getElementById('quote-list');
  
    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the input values
      const quoteInput = document.getElementById('new-quote');
      const authorInput = document.getElementById('author');
      const quoteText = quoteInput.value;
      const authorText = authorInput.value;
  
      // Create a new quote element
      const newQuote = document.createElement('li');
      newQuote.classList.add('quote-card');
      newQuote.innerHTML = `
        <blockquote class="blockquote">
          <p class="mb-0">${quoteText}</p>
          <footer class="blockquote-footer">${authorText}</footer>
          <br>
          <button class='btn-success'>Likes: <span>0</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      `;
  
      // Add the new quote to the list
      quoteList.appendChild(newQuote);
  
      // Clear the input fields
      quoteInput.value = '';
      authorInput.value = '';
    });
  });
  