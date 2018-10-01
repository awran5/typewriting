/*
 * Plugin: TypeWriting v1.0.0
 */
class TypeWriter {

  constructor(element, words, speed, delay, loop) {
    this.element = element; // HTML class selector
    this.words = words; // typewriting words
    this.txt = ''; // word letters
    this.count = 0; // loop counter
    this.speed = speed; // type speed
    this.delay = delay; // delay before new word
    this.loop = loop;
    this.type(); // Type method
    this.isDeleting = false; // check when deleting letters
  }

  type() {

    // Get the index from the words length.
    const index = this.loop === "yes" ? this.count % this.words.length : this.count;
    // fullTxt words
    const fullTxt = this.words[index];

    if (fullTxt) {
      // Set typing speed
      let typeSpeed = this.speed;

      // Check if deleting
      if (this.isDeleting) {
        // Decrease the typing speed when deleting
        typeSpeed /= 2;
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      }
      else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      // Add to the DOM
      this.element.innerHTML = `<span class="write">${this.txt}</span><span class="blinking-cursor">|</span>`;

      // If word is completed
      if (!this.isDeleting && this.txt === fullTxt) {
        // break the loop before deletion.
        if (this.loop === "no" && this.count >= this.words.length - 1) {
          return;
        }
        // Set char delete to true
        this.isDeleting = true;
        // Set time delay before new word
        typeSpeed = this.delay;
      }
      else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.count++;
      }
      // Set time out
      setTimeout(() => this.type(), typeSpeed);
    }
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
  document.querySelectorAll('.typewrite').forEach((element) => {
    const words = JSON.parse(element.getAttribute('data-words'));
    const speed = parseInt(element.getAttribute('data-speed'), 10) || 100; // fallback 100 ms
    const delay = parseInt(element.getAttribute('data-delay'), 10) || 1000; // fallback 1000 ms
    const loop = element.getAttribute('data-loop');
    // Init TypeWriter
    new TypeWriter(element, words, speed, delay, loop);
  });
}