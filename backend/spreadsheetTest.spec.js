// spreadsheetTest.js
import { chromium } from 'playwright';

export default async function runAutomation() {
  const userDataDir = '/home/hxrshxz/my-profile';
  // --- FIX: Launch in Kiosk mode to hide browser UI ---
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
        '--no-sandbox', 
        '--disable-blink-features=AutomationControlled',
        '--kiosk' // This hides the address bar and tabs for a custom tool look
    ]
  });

  const page = await browserContext.newPage();
  await page.goto('https://ethercalc.net/xc44ne9s2nmy');

  // --- 🎨 NEW 'CYBERPUNK' THEME ---
  await page.addStyleTag({
    content: `
      /* --- NEW: Fake Application Header --- */
      .fake-header {
        position: fixed; top: 0; left: 0; width: 100%; height: 30px;
        background: #111; border-bottom: 1px solid #ff00ff;
        z-index: 10005; display: flex; align-items: center; padding: 0 10px;
        font-family: sans-serif; color: #ccc;
      }
      .fake-header-title { font-weight: bold; color: white; }
      .fake-header-dots { display: flex; gap: 6px; margin-right: 10px; }
      .fake-header-dots span { width: 12px; height: 12px; border-radius: 50%; }

      /* --- Cursor: Pulsing with a trail --- */
      .custom-cursor {
        position: fixed; left: 0; top: 0; width: 28px; height: 28px;
        border-radius: 50%; border: 2px solid white; pointer-events: none;
        z-index: 9999; transform: translate(-50%, -50%);
        background: radial-gradient(circle, #ff00ff, #00ffff);
        animation: cursor-pulse 1s infinite;
      }
      @keyframes cursor-pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 25px 8px #ff00ff; }
        50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 35px 15px #00ffff; }
      }
      
      /* --- Click Effect: Energetic Ripple --- */
      .click-effect {
        position: fixed; border-radius: 50%; border: 2px solid #00ff00;
        pointer-events: none; z-index: 9998;
        animation: click-ripple 0.5s ease-out;
      }
      @keyframes click-ripple {
        0% { transform: scale(0); opacity: 1; } 100% { transform: scale(3); opacity: 0; }
      }
      
      /* --- Highlight: Animated Glitch Border --- */
      .highlight-element {
        outline: none !important;
        box-shadow: 0 0 15px 4px #00ff00 !important;
        animation: glitch-scan 0.5s infinite;
      }
      @keyframes glitch-scan {
        0%, 100% { clip-path: inset(0 0 0 0); }
        20% { clip-path: inset(2px 2px 80% 2px); }
        40% { clip-path: inset(50% 2px 2px 2px); }
        60% { clip-path: inset(10% 2px 60% 2px); }
        80% { clip-path: inset(85% 2px 5% 2px); }
      }
      
      /* --- Screen Flash: More noticeable --- */
      .screen-flash {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background-color: rgba(0, 255, 255, 0.2);
        z-index: 10000; pointer-events: none; opacity: 0;
        transition: opacity 0.1s ease-out;
      }

       /* --- Power Up Flash: Re-introduced --- */
      .power-up-flash {
          position: fixed; top:0; left:0; width: 100%; height: 100%;
          pointer-events: none; z-index: 10001; opacity: 0;
          border: 10px solid; border-image-slice: 1;
          border-image-source: linear-gradient(to right, #ff00ff, #00ffff, #00ff00);
          animation: power-up-animation 0.7s ease-out;
      }
      @keyframes power-up-animation { 0% { opacity: 1; transform: scale(0.95); } 100% { opacity: 0; transform: scale(1.1); } }

      /* --- Text Pop-Up: Styled as a HUD element --- */
      .text-pop-effect {
        position: fixed; z-index: 10002; background: rgba(0,255,0,0.2); color: #00ff00;
        padding: 5px 10px; border-radius: 2px; font-weight: bold; font-family: monospace;
        border: 1px solid #00ff00; text-shadow: 0 0 5px #00ff00;
        pointer-events: none; animation: text-pop-animation 1s ease-out;
      }
      @keyframes text-pop-animation { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-50px); opacity: 0; } }

      /* --- Completion Overlay: Cyberpunk style --- */
      .completion-overlay {
        position: fixed; inset: 0; background: rgba(10, 0, 20, 0.9);
        backdrop-filter: blur(5px); display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 10003; color: white; font-family: monospace; text-align: center;
        opacity: 0; transition: opacity 0.5s ease-in-out;
      }
      .completion-title { font-size: 3.5em; font-weight: bold; text-shadow: 0 0 15px #00ffff; }
      .completion-timer { font-size: 1.5em; margin-top: 1rem; color: #aaa; }
      .edit-button {
        background: #111; border: 2px solid #ff00ff; color: #ff00ff;
        padding: 15px 30px; margin-top: 30px; font-size: 1.2em; font-weight: bold;
        border-radius: 0; cursor: pointer; transition: all 0.2s ease;
        text-shadow: 0 0 10px #ff00ff; box-shadow: 0 0 20px #ff00ff;
      }
      .edit-button:hover { background: #ff00ff; color: white; }

      /* --- Data Flicker Text --- */
      .flicker-text { color: #00ff00 !important; font-size: 0.8rem !important; }
    `
  });

  await page.evaluate(() => {
    // --- NEW: Inject Fake Browser Header for a custom tool look ---
    document.body.insertAdjacentHTML('afterbegin', `
        <div class="fake-header">
            <div class="fake-header-dots">
                <span style="background-color: #ff5f56;"></span>
                <span style="background-color: #ffbd2e;"></span>
                <span style="background-color: #27c93f;"></span>
            </div>
            <div class="fake-header-title">EkVyapaar Automation Suite</div>
        </div>
    `);
    document.body.insertAdjacentHTML('beforeend', '<div class="custom-cursor"></div><div class="screen-flash"></div>');
    window.cursor = document.querySelector('.custom-cursor');
    document.body.style.cursor = 'none';
  });

  // --- ✨ HELPER FUNCTIONS ---
  let lastHighlightedElement = null;

  async function moveAndClick(locator) {
    const box = await locator.boundingBox(); if (!box) return;
    const { x, y, width, height } = box;
    const targetX = x + width / 2, targetY = y + height / 2;

    await page.evaluate(([x, y]) => { window.cursor.style.left = x + 'px'; window.cursor.style.top = y + 'px'; }, [targetX, targetY]);
    
    if (lastHighlightedElement) await lastHighlightedElement.evaluate(node => node.classList.remove('highlight-element'));
    await locator.evaluate(node => node.classList.add('highlight-element'));
    lastHighlightedElement = locator;
    
    await page.evaluate(([x, y]) => {
      const effect = document.createElement('div'); effect.className = 'click-effect';
      effect.style.left = `${x-15}px`; effect.style.top = `${y-15}px`; effect.style.width = '30px'; effect.style.height = '30px';
      document.body.appendChild(effect); setTimeout(() => effect.remove(), 500);
    }, [targetX, targetY]);
    
    await locator.click({ force: true, delay: 50 });
    await page.waitForTimeout(100);
  }

  async function typeLikeHuman(locator, text) {
      await moveAndClick(locator);
      await page.keyboard.type(text, { delay: 40 });
      const box = await locator.boundingBox();
      if (box) await page.evaluate(([x, y, txt]) => {
          const pop = document.createElement('div'); pop.className = 'text-pop-effect'; pop.textContent = txt;
          pop.style.left = `${x}px`; pop.style.top = `${y - 10}px`;
          document.body.appendChild(pop); setTimeout(() => pop.remove(), 1000);
      }, [box.x, box.y, text]);
  }

  async function visualPress(key) {
      await page.evaluate(() => {
        const flash = document.querySelector('.screen-flash'); flash.style.opacity = '1';
        setTimeout(() => flash.style.opacity = '0', 100);
      });
      await page.keyboard.press(key);
      await page.waitForTimeout(150);
  }
  
  // Re-introduced for flashiness
  async function triggerPowerUp() {
      await page.evaluate(() => {
          const powerUp = document.createElement('div'); powerUp.className = 'power-up-flash';
          document.body.appendChild(powerUp); setTimeout(() => powerUp.remove(), 700);
      });
      await page.waitForTimeout(200);
  }

  async function triggerDataFlicker() {
    await page.evaluate(() => new Promise(resolve => {
        const cells = Array.from(document.querySelectorAll('#sc_sri tr td:not([class*="highlight-element"])')).filter(td => td.offsetParent !== null);
        const randomCells = cells.sort(() => 0.5 - Math.random()).slice(0, 25);
        if (randomCells.length === 0) return resolve();
        const originalData = randomCells.map(cell => ({ el: cell, text: cell.textContent }));

        let flickerCount = 0;
        const interval = setInterval(() => {
            originalData.forEach(item => { item.el.textContent = Math.random().toString(36).substring(2, 8).toUpperCase(); item.el.classList.add('flicker-text'); });
            flickerCount++;
            if (flickerCount >= 5) {
                clearInterval(interval);
                setTimeout(() => {
                    originalData.forEach(item => { item.el.textContent = item.text; item.el.classList.remove('flicker-text'); });
                    resolve();
                }, 100);
            }
        }, 80);
    }));
    await page.waitForTimeout(200);
  }

  async function showCompletionMessage(durationInSeconds) {
    await page.evaluate(duration => {
      const overlay = document.createElement('div');
      overlay.className = 'completion-overlay';
      overlay.innerHTML = `<h1 class="completion-title">[ AUTOMATION COMPLETE ]</h1><p class="completion-timer">SYSTEM SHUTDOWN IN ${duration}...</p><button class="edit-button" title="This button is for display only.">// MAKE EDITS</button>`;
      document.body.appendChild(overlay);
      document.body.style.cursor = 'default';
      setTimeout(() => overlay.style.opacity = '1', 10);
      return new Promise(resolve => {
        let count = duration;
        const timerEl = overlay.querySelector('.completion-timer');
        const interval = setInterval(() => {
          count--;
          if (count > 0) timerEl.textContent = `SYSTEM SHUTDOWN IN ${count}...`;
          else {
            timerEl.textContent = 'TERMINATING...';
            clearInterval(interval); resolve();
          }
        }, 1000);
      });
    }, durationInSeconds);
  }


  // --- 🚀 AUTOMATION LOGIC ---
  await triggerPowerUp();
  await triggerDataFlicker();
  await typeLikeHuman(page.locator('#cell_A9').first(), 'Sale');
  await visualPress('Enter');
  
  await triggerPowerUp();
  await triggerDataFlicker();
  await visualPress('ArrowUp');
  await visualPress('ArrowRight');
  await typeLikeHuman(page.getByRole('textbox').first(), '20-Aug-2025');
  await visualPress('ArrowRight');
  await typeLikeHuman(page.getByRole('textbox').first(), 'Cybernetic Implants');
  await visualPress('Enter');

  await triggerPowerUp();
  await triggerDataFlicker();
  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), 'Kiroshi Optics x5');
  await visualPress('Enter');

  await triggerPowerUp();
  await typeLikeHuman(page.locator('#cell_E9').first(), '75000');
  await visualPress('Enter');

  await typeLikeHuman(page.locator('#cell_F9').first(), '18');
  await visualPress('Enter');

  await triggerPowerUp();
  await triggerDataFlicker();
  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), 'False');
  await visualPress('Enter');

  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), '13500');
  await visualPress('Enter');

  await triggerPowerUp();
  await triggerDataFlicker();
  await visualPress('ArrowRight');
  await visualPress('ArrowUp');
  await typeLikeHuman(page.getByRole('textbox').first(), 'CRITICAL: Send payment request to Arasaka Corp.');
  await visualPress('Enter');
  
  await showCompletionMessage(5);
  await browserContext.close();
}