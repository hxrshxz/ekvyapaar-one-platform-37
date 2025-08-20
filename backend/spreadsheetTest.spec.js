// spreadsheetTest.js
import { chromium } from "playwright";
import { promises as fs } from "fs"; // Import the file system module

// --- 🧠 DYNAMIC DATA SOURCE ---
const TRANSACTION_DATA = [
  {
    type: "Sale",
    party: "Stark Industries",
    item: "Custom API Integration Service",
    amount: 420000,
    gstRate: 18,
    isPaid: "False",
    notes: "Phase 1 complete. Invoice #SI-2025-002 sent.",
  },
  {
    type: "Purchase",
    party: "Adobe Inc.",
    item: "Creative Cloud for Teams (5 licenses)",
    amount: 78000,
    gstRate: 18,
    isPaid: "True",
    notes: "Annual renewal. Paid via autopay.",
  },
  {
    type: "Sale",
    party: "Pied Piper Inc.",
    item: "Data Compression Software License",
    amount: 95000,
    gstRate: 18,
    isPaid: "True",
    notes: "Upfront payment for a 2-year license.",
  },
  {
    type: "Purchase",
    party: "Dell Technologies",
    item: "Latitude 7420 Laptops x3",
    amount: 315000,
    gstRate: 28,
    isPaid: "False",
    notes: "PO #DT-2025-106. Payment terms NET 30.",
  },
  {
    type: "Sale",
    party: "Hooli Group",
    item: "Cybersecurity Audit and Report",
    amount: 280000,
    gstRate: 18,
    isPaid: "False",
    notes: "Audit complete. Awaiting payment for report release.",
  },
  {
    type: "Purchase",
    party: "Amazon Web Services",
    item: "Monthly Cloud Infrastructure Bill",
    amount: 65000,
    gstRate: 18,
    isPaid: "True",
    notes: "Auto-debited from linked account.",
  },
  {
    type: "Sale",
    party: "Wayne Enterprises",
    item: "On-site IT Support (40 hours)",
    amount: 120000,
    gstRate: 18,
    isPaid: "True",
    notes: "Monthly retainer fee. Paid in full.",
  },
  {
    type: "Purchase",
    party: "Steelcase Furnishings",
    item: "Conference Room Table and Chairs",
    amount: 250000,
    gstRate: 28,
    isPaid: "False",
    notes: "PO #SF-2025-107. Payment on delivery.",
  },
  {
    type: "Sale",
    party: "Cyberdyne Systems",
    item: "Neural Network Training Dataset",
    amount: 750000,
    gstRate: 12,
    isPaid: "False",
    notes: "Payment due upon data transfer verification.",
  },
  {
    type: "Purchase",
    party: "Local Pantry Co.",
    item: "Office Snacks and Coffee Supplies",
    amount: 8500,
    gstRate: 5,
    isPaid: "True",
    notes: "Monthly office supplies replenishment.",
  },
];

// --- 💾 STATE MANAGEMENT ---
const STATE_FILE_PATH = "./automation_state.json";

// Helper to get the current date in the required format
function getCurrentDateFormatted() {
  const d = new Date();
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day}-${month}-${year}`; // e.g., '21-Aug-2025'
}

export default async function runAutomation() {
  const userDataDir = "/home/hxrshxz/my-profile";
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--kiosk",
    ],
  });

  const page = await browserContext.newPage();
  await page.goto("https://ethercalc.net/xc44ne9s2nmy");

  // --- 🎨 CYBERPUNK THEME (WITH NEW ANALYSIS STYLE) ---
  await page.addStyleTag({
    content: `
      /* --- Fake Application Header --- */
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
      
      /* --- Screen Flash --- */
      .screen-flash {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background-color: rgba(0, 255, 255, 0.2);
        z-index: 10000; pointer-events: none; opacity: 0;
        transition: opacity 0.1s ease-out;
      }

       /* --- Power Up Flash --- */
      .power-up-flash {
          position: fixed; top:0; left:0; width: 100%; height: 100%;
          pointer-events: none; z-index: 10001; opacity: 0;
          border: 10px solid; border-image-slice: 1;
          border-image-source: linear-gradient(to right, #ff00ff, #00ffff, #00ff00);
          animation: power-up-animation 0.7s ease-out;
      }
      @keyframes power-up-animation { 0% { opacity: 1; transform: scale(0.95); } 100% { opacity: 0; transform: scale(1.1); } }

      /* --- Text Pop-Up --- */
      .text-pop-effect {
        position: fixed; z-index: 10002; background: rgba(0,255,0,0.2); color: #00ff00;
        padding: 5px 10px; border-radius: 2px; font-weight: bold; font-family: monospace;
        border: 1px solid #00ff00; text-shadow: 0 0 5px #00ff00;
        pointer-events: none; animation: text-pop-animation 1s ease-out;
      }
      @keyframes text-pop-animation { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-50px); opacity: 0; } }

      /* --- Completion Overlay --- */
      .completion-overlay {
        position: fixed; inset: 0; background: rgba(10, 0, 20, 0.9);
        backdrop-filter: blur(5px); display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 10003; color: white; font-family: monospace; text-align: center;
        opacity: 0; transition: opacity 0.5s ease-in-out;
      }
      .completion-title { font-size: 3.5em; font-weight: bold; text-shadow: 0 0 15px #00ffff; }
      .completion-timer { font-size: 1.5em; margin-top: 1rem; color: #aaa; }
      .edit-button { background: #111; border: 2px solid #ff00ff; color: #ff00ff; padding: 15px 30px; margin-top: 30px; font-size: 1.2em; font-weight: bold; border-radius: 0; cursor: pointer; transition: all 0.2s ease; text-shadow: 0 0 10px #ff00ff; box-shadow: 0 0 20px #ff00ff; }
      .edit-button:hover { background: #ff00ff; color: white; }
      
      /* --- Grid Analysis Effect --- */
      .grid-analysis-overlay {
        position: absolute;
        pointer-events: none;
        z-index: 10004;
        background: rgba(0, 255, 255, 0.1);
        border: 1px solid #00ffff;
        color: #00ffff;
        font-family: monospace;
        font-size: 0.9em;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        text-shadow: 0 0 5px #00ffff;
        animation: analysis-fade 1.5s ease-out;
      }
      @keyframes analysis-fade {
        0%, 100% { opacity: 0; }
        20%, 80% { opacity: 1; }
      }
    `,
  });

  await page.evaluate(() => {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class="fake-header"><div class="fake-header-dots"><span style="background-color: #ff5f56;"></span><span style="background-color: #ffbd2e;"></span><span style="background-color: #27c93f;"></span></div><div class="fake-header-title">EkVyapaar Automation Suite</div></div>`
    );
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="custom-cursor"></div><div class="screen-flash"></div>'
    );
    window.cursor = document.querySelector(".custom-cursor");
    document.body.style.cursor = "none";
  });

  // --- ✨ HELPER FUNCTIONS ---
  let lastHighlightedElement = null;

  async function moveAndClick(locator) {
    const box = await locator.boundingBox();
    if (!box) return;
    const { x, y, width, height } = box;
    const targetX = x + width / 2,
      targetY = y + height / 2;
    await page.evaluate(
      ([x, y]) => {
        window.cursor.style.left = x + "px";
        window.cursor.style.top = y + "px";
      },
      [targetX, targetY]
    );
    if (lastHighlightedElement)
      await lastHighlightedElement.evaluate((node) =>
        node.classList.remove("highlight-element")
      );
    await locator.evaluate((node) => node.classList.add("highlight-element"));
    lastHighlightedElement = locator;
    await page.evaluate(
      ([x, y]) => {
        const effect = document.createElement("div");
        effect.className = "click-effect";
        effect.style.left = `${x - 15}px`;
        effect.style.top = `${y - 15}px`;
        effect.style.width = "30px";
        effect.style.height = "30px";
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 500);
      },
      [targetX, targetY]
    );
    await locator.click({ force: true, delay: 50 });
    await page.waitForTimeout(300);
  }

  async function typeLikeHuman(locator, text) {
    await moveAndClick(locator);
    await page.keyboard.type(text, { delay: 80 });
    const box = await locator.boundingBox();
    if (box)
      await page.evaluate(
        ([x, y, txt]) => {
          const pop = document.createElement("div");
          pop.className = "text-pop-effect";
          pop.textContent = txt;
          pop.style.left = `${x}px`;
          pop.style.top = `${y - 10}px`;
          document.body.appendChild(pop);
          setTimeout(() => pop.remove(), 1000);
        },
        [box.x, box.y, text]
      );
  }

  async function visualPress(key) {
    await page.evaluate(() => {
      const flash = document.querySelector(".screen-flash");
      flash.style.opacity = "1";
      setTimeout(() => (flash.style.opacity = "0"), 100);
    });
    await page.keyboard.press(key);
    await page.waitForTimeout(400);
  }

  async function triggerPowerUp() {
    await page.evaluate(() => {
      const powerUp = document.createElement("div");
      powerUp.className = "power-up-flash";
      document.body.appendChild(powerUp);
      setTimeout(() => powerUp.remove(), 700);
    });
    await page.waitForTimeout(200);
  }

  async function findFirstEmptyRow(page, startRow = 2, maxCheck = 1000) {
    console.log(
      `[LOG] AI is searching for the first empty row from row ${startRow}...`
    );
    const targetRow = await page.evaluate(
      ({ startRow, maxCheck }) => {
        for (let i = startRow; i < maxCheck; i++) {
          const cell = document.querySelector(`#cell_A${i}`);
          if (!cell || cell.textContent.trim() === "") {
            return i;
          }
        }
        return startRow;
      },
      { startRow, maxCheck }
    );

    for (let i = startRow; i <= targetRow; i++) {
      const cellLocator = page.locator(`#cell_A${i}`);
      try {
        const box = await cellLocator.boundingBox({ timeout: 500 });
        if (box) {
          await page.evaluate(
            ([x, y]) => {
              window.cursor.style.left = x + box.width / 2 + "px";
              window.cursor.style.top = y + box.height / 2 + "px";
            },
            [box.x, box.y]
          );
          await page.waitForTimeout(200);
        }
      } catch (e) {
        break;
      }
    }
    console.log(`[LOG] AI has located empty row at index: ${targetRow}`);
    return targetRow;
  }

  async function showCompletionMessage(durationInSeconds) {
    await page.evaluate((duration) => {
      const overlay = document.createElement("div");
      overlay.className = "completion-overlay";
      overlay.innerHTML = `<h1 class="completion-title">[ AUTOMATION COMPLETE ]</h1><p class="completion-timer">SYSTEM SHUTDOWN IN ${duration}...</p><button class="edit-button" title="This button is for display only.">// MAKE EDITS</button>`;
      document.body.appendChild(overlay);
      document.body.style.cursor = "default";
      setTimeout(() => (overlay.style.opacity = "1"), 10);
      return new Promise((resolve) => {
        let count = duration;
        const timerEl = overlay.querySelector(".completion-timer");
        const interval = setInterval(() => {
          count--;
          if (count > 0) timerEl.textContent = `SYSTEM SHUTDOWN IN ${count}...`;
          else {
            timerEl.textContent = "TERMINATING...";
            clearInterval(interval);
            resolve();
          }
        }, 1000);
      });
    }, durationInSeconds);
  }

  async function readLastCompletedRow(filePath) {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const state = JSON.parse(data);
      console.log(
        `[LOG] Found previous state. Last completed row: ${state.lastCompletedRow}`
      );
      return state.lastCompletedRow;
    } catch (error) {
      console.log("[LOG] No state file found. This is the first run.");
      return 4;
    }
  }

  async function writeLastCompletedRow(filePath, rowNumber) {
    const state = { lastCompletedRow: rowNumber };
    try {
      await fs.writeFile(filePath, JSON.stringify(state, null, 2));
      console.log(
        `[LOG] Saved current state. Next run will start from row ${
          rowNumber + 1
        }.`
      );
    } catch (error) {
      console.error("[ERROR] Could not save state file:", error);
    }
  }

  async function triggerGridAnalysis(page, numOverlays = 25, duration = 1500) {
    await page.evaluate(
      ({ numOverlays, duration }) => {
        const cells = Array.from(
          document.querySelectorAll(
            '#sc_sri tr td:not([class*="highlight-element"])'
          )
        ).filter((td) => td.offsetParent !== null);
        const randomCells = cells
          .sort(() => 0.5 - Math.random())
          .slice(0, numOverlays);

        randomCells.forEach((cell, index) => {
          setTimeout(() => {
            const rect = cell.getBoundingClientRect();
            const overlay = document.createElement("div");
            overlay.className = "grid-analysis-overlay";
            overlay.textContent = Math.floor(1000 + Math.random() * 9000);
            overlay.style.left = `${window.scrollX + rect.left}px`;
            overlay.style.top = `${window.scrollY + rect.top}px`;
            overlay.style.width = `${rect.width}px`;
            overlay.style.height = `${rect.height}px`;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.remove(), duration);
          }, index * 30);
        });
      },
      { numOverlays, duration }
    );
    await page.waitForTimeout(duration + 500);
  }

  // --- 🚀 FINAL AUTOMATION LOGIC ---
  const lastCompletedRow = await readLastCompletedRow(STATE_FILE_PATH);
  const startSearchFromRow = lastCompletedRow + 1;

  const transaction =
    TRANSACTION_DATA[Math.floor(Math.random() * TRANSACTION_DATA.length)];
  const taxAmount = Math.round(
    transaction.amount * (transaction.gstRate / 100)
  );
  const currentDate = getCurrentDateFormatted();

  const targetRow = await findFirstEmptyRow(page, startSearchFromRow);

  await triggerPowerUp();
  await triggerGridAnalysis(page);

  await typeLikeHuman(
    page.locator(`#cell_A${targetRow}`).first(),
    transaction.type
  );
  await visualPress("Enter");
  await page.waitForTimeout(800);

  await typeLikeHuman(page.locator(`#cell_B${targetRow}`).first(), currentDate);
  await visualPress("Enter");
  await page.waitForTimeout(800);

  await typeLikeHuman(
    page.locator(`#cell_C${targetRow}`).first(),
    transaction.party
  );
  await visualPress("Enter");
  await page.waitForTimeout(800);

  await typeLikeHuman(
    page.locator(`#cell_D${targetRow}`).first(),
    transaction.item
  );
  await visualPress("Enter");

  await triggerPowerUp();
  await triggerGridAnalysis(page);

  await typeLikeHuman(
    page.locator(`#cell_E${targetRow}`).first(),
    `${transaction.amount}`
  );
  await visualPress("Enter");
  await page.waitForTimeout(800);

  await typeLikeHuman(
    page.locator(`#cell_F${targetRow}`).first(),
    `${transaction.gstRate}`
  );
  await visualPress("Enter");
  await page.waitForTimeout(800);

  await typeLikeHuman(
    page.locator(`#cell_G${targetRow}`).first(),
    transaction.isPaid
  );
  await visualPress("Enter");

  await triggerPowerUp();
  await triggerGridAnalysis(page);

  await typeLikeHuman(
    page.locator(`#cell_H${targetRow}`).first(),
    `${taxAmount}`
  );
  await visualPress("Enter");
  await page.waitForTimeout(800);

  await writeLastCompletedRow(STATE_FILE_PATH, targetRow);

  await showCompletionMessage(5);
  await browserContext.close();
}
