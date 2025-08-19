// spreadsheetTest.js
import { chromium } from 'playwright';

export default async function runAutomation() {
  const userDataDir = '/home/hxrshxz/my-profile';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
  });

  const page = await browserContext.newPage();
  await page.goto('https://ethercalc.net/xc44ne9s2nmy');

  // --- 🎨 UPDATED 'ELECTRIC BLUE & GOLD' THEME ---
  await page.addStyleTag({
    content: `
      /* --- Cursor and Click Effects --- */
      .custom-cursor {
        position: fixed; left: 0; top: 0; width: 30px; height: 30px;
        border-radius: 50%; border: 2px solid white; pointer-events: none;
        z-index: 9999; transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255, 215, 0, 1) 100%);
        animation: cursor-pulse 1.5s infinite;
      }
      @keyframes cursor-pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 15px 5px #00c6ff; }
        50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 25px 10px #ffd700; }
      }
      .click-effect {
        position: fixed; border-radius: 50%; background-color: #ff8c00; /* Bright Orange */
        pointer-events: none;
        z-index: 9998; animation: click-animation 0.5s ease-out;
      }
      @keyframes click-animation {
        0% { transform: scale(0); opacity: 1; } 100% { transform: scale(3); opacity: 0; }
      }
      
      /* --- Element Highlighting --- */
      .highlight-element {
        box-shadow: 0 0 15px 5px #ffd700 !important; /* Gold */
        animation: highlight-pulse 1s infinite;
      }
      @keyframes highlight-pulse {
        0%, 100% { box-shadow: 0 0 15px 5px #ffd700 !important; }
        50% { box-shadow: 0 0 20px 10px #00c6ff !important; }
      }
      
      /* --- Fullscreen Effects --- */
      .screen-flash {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background-color: rgba(0, 198, 255, 0.3); /* Electric Blue */
        z-index: 10000;
        pointer-events: none; opacity: 0; transition: opacity 0.2s ease-out;
      }
      .power-up-flash {
          position: fixed; top:0; left:0; width: 100%; height: 100%;
          pointer-events: none; z-index: 10001; opacity: 0;
          border: 10px solid;
          border-image-slice: 1;
          border-image-source: linear-gradient(to right, #ffd700, #007bff, #ffd700); /* Gold and Blue */
          animation: power-up-animation 0.7s ease-out;
      }
      @keyframes power-up-animation {
        0% { opacity: 1; transform: scale(0.95); }
        100% { opacity: 0; transform: scale(1.1); }
      }

      /* --- Text Pop-Up Effect --- */
      .text-pop-effect {
        position: fixed; z-index: 10002; background: rgba(0,0,0,0.7); color: white;
        padding: 5px 10px; border-radius: 5px; font-weight: bold; font-family: sans-serif;
        pointer-events: none; animation: text-pop-animation 1s ease-out;
      }
      @keyframes text-pop-animation {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
      }

      /* --- Completion Overlay --- */
      .completion-overlay {
        position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 10003; color: white; font-family: sans-serif; text-align: center;
        opacity: 0; transition: opacity 0.5s ease-in-out;
      }
      .completion-title {
        font-size: 3.5em; font-weight: bold; text-shadow: 0 0 15px #ffd700; /* Gold Shadow */
      }
      .completion-timer {
        font-size: 1.5em; margin-top: 20px; color: #aaa;
      }
      .edit-button {
        background: linear-gradient(45deg, #007bff, #00c6ff); /* Blue Gradient */
        border: none;
        color: white;
        padding: 15px 30px;
        margin-top: 30px;
        font-size: 1.2em;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 0 20px rgba(0, 198, 255, 0.7);
      }
      .edit-button:hover {
        transform: scale(1.1);
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.7); /* Gold hover glow */
      }
    `
  });

  // Inject HTML elements for persistent effects
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', '<div class="custom-cursor"></div><div class="screen-flash"></div>');
    window.cursor = document.querySelector('.custom-cursor');
    document.body.style.cursor = 'none'; // Hide the real cursor
  });

  // --- ✨ HELPER FUNCTIONS ---
  let lastHighlightedElement = null;

  async function moveAndClick(locator) {
    const box = await locator.boundingBox();
    if (!box) return;
    const { x, y, width, height } = box;
    const targetX = x + width / 2, targetY = y + height / 2;

    await page.evaluate(([x, y]) => { window.cursor.style.left = x + 'px'; window.cursor.style.top = y + 'px'; }, [targetX, targetY]);
    
    if (lastHighlightedElement) {
        await lastHighlightedElement.evaluate(node => node.classList.remove('highlight-element'));
    }
    await locator.evaluate(node => node.classList.add('highlight-element'));
    lastHighlightedElement = locator;
    
    await page.evaluate(([x, y]) => {
      const effect = document.createElement('div');
      effect.className = 'click-effect';
      effect.style.left = `${x-15}px`; effect.style.top = `${y-15}px`; effect.style.width = '30px'; effect.style.height = '30px';
      document.body.appendChild(effect);
      setTimeout(() => effect.remove(), 500);
    }, [targetX, targetY]);
    
    await locator.click();
    await page.waitForTimeout(100);
  }

  async function typeLikeHuman(locator, text) {
      await moveAndClick(locator);
      await page.keyboard.type(text, { delay: 50 });
      const box = await locator.boundingBox();
      if (box) {
        await page.evaluate(([x, y, txt]) => {
          const pop = document.createElement('div');
          pop.className = 'text-pop-effect';
          pop.textContent = txt;
          pop.style.left = `${x}px`; pop.style.top = `${y - 10}px`;
          document.body.appendChild(pop);
          setTimeout(() => pop.remove(), 1000);
        }, [box.x, box.y, text]);
      }
  }

  async function visualPress(key) {
      await page.evaluate(() => {
        const flash = document.querySelector('.screen-flash');
        flash.style.opacity = '1';
        setTimeout(() => flash.style.opacity = '0', 200);
      });
      await page.keyboard.press(key);
      await page.waitForTimeout(200);
  }

  async function triggerPowerUp() {
      await page.evaluate(() => {
          const powerUp = document.createElement('div');
          powerUp.className = 'power-up-flash';
          document.body.appendChild(powerUp);
          setTimeout(() => powerUp.remove(), 700);
      });
      await page.waitForTimeout(200);
  }

  // On-screen completion message with countdown
  async function showCompletionMessage(durationInSeconds) {
    await page.evaluate(duration => {
      // Create and inject the overlay HTML, NOW WITH A BUTTON!
      const overlay = document.createElement('div');
      overlay.className = 'completion-overlay';
      overlay.innerHTML = `
        <h1 class="completion-title">✅ Automation Complete!</h1>
        <p class="completion-timer">Closing in ${duration} seconds...</p>
        <button class="edit-button" title="This button is for display only.">✏️ Make Edits</button>
      `;
      document.body.appendChild(overlay);

      // Make the real cursor visible again on the overlay
      document.body.style.cursor = 'default';

      // Fade it in
      setTimeout(() => overlay.style.opacity = '1', 10);

      // This function now returns a Promise that resolves when the countdown is over
      return new Promise(resolve => {
        let count = duration;
        const timerEl = overlay.querySelector('.completion-timer');
        const interval = setInterval(() => {
          count--;
          if (count > 0) {
            timerEl.textContent = `Closing in ${count} seconds...`;
          } else {
            timerEl.textContent = 'Closing now!';
            clearInterval(interval);
            resolve(); // Resolve the promise to signal completion
          }
        }, 1000);
      });
    }, durationInSeconds);
  }


  // --- 🚀 AUTOMATION LOGIC ---

  await triggerPowerUp();
  await typeLikeHuman(page.locator('#cell_A9').first(), 'Sale');
  await visualPress('Enter');
  
  await triggerPowerUp();
  await visualPress('ArrowUp');
  await visualPress('ArrowRight');
  await typeLikeHuman(page.getByRole('textbox').first(), '10-Apr-2025');
  await visualPress('ArrowRight');
  await typeLikeHuman(page.getByRole('textbox').first(), 'Home Electronics');
  await visualPress('Enter');

  await triggerPowerUp();
  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), 'Smart TVs x2');
  await visualPress('Enter');

  await triggerPowerUp();
  await typeLikeHuman(page.locator('#cell_E9').first(), '30000');
  await visualPress('Enter');

  await typeLikeHuman(page.locator('#cell_F9').first(), '18');
  await visualPress('Enter');

  await triggerPowerUp();
  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), 'False');
  await visualPress('Enter');

  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), '5400');
  await visualPress('Enter');

  await triggerPowerUp();
  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), 'Send a payment reminder for this unpaid invoice');
  await visualPress('Enter');

  // --- 🏁 FINAL STEP: Show on-screen message instead of console.log ---
  
  // Show the message and wait for the 5-second countdown to finish
  await showCompletionMessage(5);

  // Close the browser only after the countdown is complete
  await browserContext.close();
}