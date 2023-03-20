'use strict';

(function () {
  window.addEventListener('load', init);

  function init() {

    // DOM REFERENCES
    const addLinksBtn = document.getElementById('add-links-btn');
    const addEmotionsBtn = document.getElementById('add-emotions-btn');
    const addConsequencesBtn = document.getElementById('add-consequences-btn');
    let modalCloseButton = document.querySelector(".close-button");
    const addExtraBtn = document.getElementById('add-extra-btn');
    const removeBoxBtn = document.querySelectorAll('.remove-box-btn');
    const form = document.getElementById('behavior-chain-form');
    const resetBtn = document.getElementById('reset-btn');
    let renderedContainer = null;                                                                                                                           

    let chainBubbles = [];

    // CHAIN BUBBLE CONSTRUCTOR
    function ChainBubble(title, userInput, id) {
      this.title = title;
      this.userInput = userInput;
      this.id = id;

      chainBubbles.push(this);
    }

    ChainBubble.prototype.render = function(container) {
      console.log(`render container status: ${container}`); // delete later
      let bubble = document.createElement('div');
      bubble.classList.add('rendered-bubble');
      bubble.id = this.id;
      let h3 = document.createElement('h3');
      h3.textContent = this.title;
      let p = document.createElement('p');
      p.textContent = this.userInput;
      bubble.appendChild(h3);
      bubble.appendChild(p);
      container.appendChild(bubble);
    };

    // EVENT LISTENERS
    addLinksBtn.addEventListener('click', handleAddLinks);
    addEmotionsBtn.addEventListener('click', handleAddEmotions);
    addConsequencesBtn.addEventListener('click', toggleModal);
    modalCloseButton.addEventListener("click", toggleModal);
    addExtraBtn.addEventListener('click', handleAddExtra);
    resetBtn.addEventListener('click', function() {
      handleReset(form, chainBubbles, renderedContainer);
    });

    form.addEventListener('submit', function (event) {
      renderedContainer = handleSubmit(event, ChainBubble, chainBubbles);
      console.log(`rendered container value: ${renderedContainer}`); // delete later
    });
    for (let i = 0; i < removeBoxBtn.length; i++) {
      removeBoxBtn[i].addEventListener('click', handleRemoveBox);
    }
  }

  // displays the links box when user clicks the 'add links' button
  function handleAddLinks() {
    const linksBox = document.getElementById('links-box');
    linksBox.style.display = 'block';
  }

  // displays the emotions box when user clicks the 'add emotions' button
  function handleAddEmotions() {
    const emotionsBox = document.getElementById('emotions-box');
    emotionsBox.style.display = 'block';
  }

  // code from https://www.w3docs.com/snippets/javascript/how-to-create-a-modal-dialog-box-with-css-and-javascript.html
  function toggleModal() {
    let modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");

    let shortTermBtn = document.getElementById('short-term-btn');
    let longTermBtn = document.getElementById('long-term-btn');
    shortTermBtn.addEventListener('click', function() {
      handleShortTerm(modal);
    });
    longTermBtn.addEventListener('click', function() {
      handleLongTerm(modal);
    });
  }

  function handleShortTerm(modal) {
    modal.classList.remove("show-modal");
    const shortConseqBox = document.getElementById('s-consequences-box');
    shortConseqBox.style.display = 'block';
    
  }

  function handleLongTerm(modal) {
    modal.classList.remove("show-modal");
    const longConseqBox = document.getElementById('l-consequences-box');
    longConseqBox.style.display = 'block';
  }

  // displays the extras box when user clicks the 'add extra' button
  function handleAddExtra() {
    const extraBox = document.getElementById('extra-box');
    extraBox.style.display = 'block';
  }

  // Removes box from behavior chain
  function handleRemoveBox(event) {
    let targetBox = event.target.parentElement;
    console.log(`target box: ${targetBox.id}`); // delete later
    targetBox.style.display = 'none';
  }

  /**
   * Collects all data from form once you submit it
   * @param {object} event - The event object
   * @param {class} ChainBubble - the class that makes each instance of the behavior chain
   * @param {array} chainBubbles - the array storing all of the chain objects.
   * @returns - returns a div element with the id 'container'
   */
  function handleSubmit(event, ChainBubble, chainBubbles) {
    event.preventDefault(); // prevents instant refresh
    let container = document.getElementById('container');

    if (container != null) {
      container.remove();
    }

    let vulFactors = event.target.vulFactors.value;
    let vulFactorsBubble = new ChainBubble('Vulnerability Factors', vulFactors, 'vul-factors-rend');

    let promptEvent = event.target.promptingEvent.value;
    let promptEventBubble = new ChainBubble('Prompting Event', promptEvent, 'prompt-event-rend');

    let links = event.target.links;
    if (links.parentElement.style.display !== '' && links.parentElement.style.display !== 'none') {
      let linksBubble = new ChainBubble('Links', links.value, 'links-rend');
    }

    let emotions = event.target.emotions;
    if (emotions.parentElement.style.display !== '' && emotions.parentElement.style.display !== 'none') {
      let emotionsBubble = new ChainBubble('Emotions', emotions.value, 'emotions-rend');
    }

    let targetBehavior = event.target.targetBehavior.value;
    let targetBehaviorBubble = new ChainBubble('Target Behavior', targetBehavior, 'target-rend');

    let shortConseq = event.target.sConsequences;
    if (shortConseq.parentElement.style.display !== '' && shortConseq.parentElement.style.display !== 'none') {
      let shortConseqBubble = new ChainBubble('Short-term Consequences', shortConseq.value, 'short-conseq-rend');
    }

    let longConseq = event.target.lConsequences;
    if (longConseq.parentElement.style.display !== '' && longConseq.parentElement.style.display !== 'none') {
      let longConseqBubble = new ChainBubble('Long-term Consequences', longConseq.value, 'long-conseq-rend');
    }

    let extra = event.target.extra;
    let extraTitle = event.target.extraTitle.value;
    if (extra.parentElement.style.display !== '' && extra.parentElement.style.display !== 'none') {
      let extraBubble = new ChainBubble(extraTitle, extra.value, 'extra-rend');
    }

    let solutions = event.target.solutions.value;
    let solutionsBubble = new ChainBubble('Solutions', solutions, 'solutions-rend');

    // For testing purposes only
    for (let i = 0; i < chainBubbles.length; i++) {
      console.log(`index ${i}: ${chainBubbles[i].title}, ${chainBubbles[i].userInput}`); // delete later
    }

    let article = document.getElementById('rendered-behavior-chain');

    console.log(`container status: ${container}`); // delete later

    // Creates a new container for the rendered content if there isn't already one
    if (container === null) {
      container = document.createElement('div');
      container.id = 'container';
      article.appendChild(container);
    }
    
    renderChain(chainBubbles, container);

    return container;
  }

  // Clears the form and the rendered content below
  function handleReset(form, chainBubbles, renderedContainer) {
    form.reset(); // clears form

    chainBubbles.length = 0;

    // removes the rendered content as long as there is nothing in it
    if (renderedContainer !== null) {
      renderedContainer.remove();
    }
  }

  // displays the complete behavior chain on the page 
  function renderChain(chainBubbles, container) {
    for(let i = 0; i < chainBubbles.length; i++) {
      console.log(chainBubbles[i]); // delete later
      chainBubbles[i].render(container);
    }

    chainBubbles.length = 0;
  }

})();

