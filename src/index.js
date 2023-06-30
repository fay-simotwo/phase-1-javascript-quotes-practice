document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-quote-form');
    const quoteList = document.getElementById('quote-list');
  
    // Function to handle the delete button click
    function handleDelete(event) {
      const quoteCard = event.target.closest('.quote-card'); // Find the closest parent quote card element
      if (!quoteCard) return; // If the delete button is not within a quote card, do nothing
  
      const quoteId = quoteCard.dataset.id; // Retrieve the quote ID from a data attribute (you'll need to set this attribute when adding the quote)
  
      // Send a DELETE request to the API to delete the quote
      fetch(`your-api-endpoint/${quoteId}`, {
        method: 'DELETE',
        // Add any necessary headers or authentication information
      })
        .then(response => {
          if (response.ok) {
            // Remove the quote card from the DOM
            quoteCard.remove();
          } else {
            throw new Error('Failed to delete quote');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    // Function to handle the like button click
    function handleLike(event) {
      const quoteCard = event.target.closest('.quote-card'); // Find the closest parent quote card element
      if (!quoteCard) return; // If the like button is not within a quote card, do nothing
  
      const quoteId = quoteCard.dataset.id; // Retrieve the quote ID from a data attribute (you'll need to set this attribute when adding the quote)
      const likesCountSpan = quoteCard.querySelector('.btn-success span');
  
      // Send a POST request to the API to create a like for the quote
      fetch(`your-api-endpoint/${quoteId}/like`, {
        method: 'POST',
        // Add any necessary headers or authentication information
      })
        .then(response => {
          if (response.ok) {
            // Update the number of likes displayed on the page
            const currentLikesCount = parseInt(likesCountSpan.textContent);
            likesCountSpan.textContent = currentLikesCount + 1;
          } else {
            throw new Error('Failed to like quote');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const quoteInput = document.getElementById('new-quote');
      const authorInput = document.getElementById('author');
      const quoteText = quoteInput.value;
      const authorText = authorInput.value;
  
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
  
      // Set the quote ID as a data attribute (replace 'quoteId' with the actual ID of the quote from the API)
      newQuote.dataset.id = 'quoteId';
  
      // Add event listeners to the delete and like buttons
      const deleteButton = newQuote.querySelector('.btn-danger');
      deleteButton.addEventListener('click', handleDelete);
  
      const likeButton = newQuote.querySelector('.btn-success');
      likeButton.addEventListener('click', handleLike);
  
      quoteList.appendChild(newQuote);
      quoteInput.value = '';
      authorInput.value = '';
    });
  });
  