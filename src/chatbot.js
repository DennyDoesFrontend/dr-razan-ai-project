// Navigation functionality
const navToggle = document.querySelector(".nav-toggle");
const navClose = document.querySelector(".nav-close");
const navbar = document.querySelector(".navbar");
const navOverlay = document.querySelector(".nav-overlay");

function openNav() {
  navbar.classList.add("open");
  navOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeNav() {
  navbar.classList.remove("open");
  navOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

navToggle.addEventListener("click", openNav);
navClose.addEventListener("click", closeNav);
navOverlay.addEventListener("click", closeNav);

// Close nav on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navbar.classList.contains("open")) {
    closeNav();
  }
});

// Chat functionality
const inputEl = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const downloadCard = document.getElementById("downloadCard");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");

let chatHistory = [];

// Add message to chat box
function addMessage(sender, text, rawData = null) {
  const msg = document.createElement("div");
  msg.className =
    sender === "user"
      ? "self-end bg-[#13343b] text-white px-4 py-2 rounded-2xl max-w-xs md:max-w-md ml-auto"
      : "self-start bg-[#e8e8e3] text-[#13343b] px-4 py-2 rounded-2xl max-w-xs md:max-w-md mr-auto";

  msg.innerText = text;
  chatBox.appendChild(msg);

  // Show chat box if hidden
  if (chatBox.classList.contains("hidden")) {
    chatBox.classList.remove("hidden");
  }

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // FIX: Save to history with proper structure
  if (sender === "user") {
    chatHistory.push({ role: "user", content: text });
  } else if (sender === "bot" && rawData) {
    // Store the full response data, but use analysis text for display
    chatHistory.push({ role: "assistant", content: rawData });
  }

  console.log("💬 Updated chat history:", chatHistory.length, "messages");
}

// Send user message
async function sendMessage() {
  const userMessage = inputEl.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  inputEl.value = "";
  sendBtn.disabled = true;

  // Typing indicator
  const typingMsg = document.createElement("div");
  typingMsg.className =
    "self-start bg-[#e8e8e3] text-[#13343b] px-4 py-2 rounded-2xl max-w-xs md:max-w-md mr-auto typing-indicator";
  typingMsg.innerHTML = "Analyzing...";
  chatBox.appendChild(typingMsg);

  if (chatBox.classList.contains("hidden")) {
    chatBox.classList.remove("hidden");
  }

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    console.log("🚀 Sending message with history length:", chatHistory.length);

    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        history: chatHistory.slice(0, -1), // Don't include the current user message since it's added in the backend
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log("📥 Received response:", data);

    // Remove typing indicator
    typingMsg.remove();

    // Add bot response
    addMessage("bot", data.analysis, data);

    // Show PDF card if bot mentions PDF or assessment is complete
    const responseText = data.analysis.toLowerCase();
    if (
      responseText.includes("pdf") ||
      responseText.includes("report") ||
      responseText.includes("generate") ||
      responseText.includes("summary") ||
      data.pdf_requested
    ) {
      console.log("📄 Showing PDF download option");
      downloadCard.classList.remove("hidden");
    }
  } catch (err) {
    console.error("❌ Chat error:", err);
    // Remove typing indicator on error
    if (typingMsg.parentNode) {
      typingMsg.remove();
    }
    addMessage("bot", `❌ Error: ${err.message}`);
  } finally {
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

// FIX: Updated PDF generation function
async function generatePdf() {
  console.log("📄 Starting PDF generation...");
  console.log("📄 Chat history length:", chatHistory.length);

  if (chatHistory.length === 0) {
    alert(
      "No conversation history available. Please have a conversation first."
    );
    return;
  }

  // Show loading state
  const originalText = downloadPdfBtn.textContent;
  downloadPdfBtn.textContent = "Generating PDF...";
  downloadPdfBtn.disabled = true;

  try {
    console.log("📄 Sending conversation history:", chatHistory);

    const res = await fetch("http://127.0.0.1:8000/generate_pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversation_history: chatHistory, // FIX: Send the actual conversation history
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ PDF generation failed:", errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    console.log("📄 PDF response received, creating download...");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `razanai_health_assessment_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    console.log("✅ PDF downloaded successfully");
  } catch (err) {
    console.error("❌ PDF generation error:", err);
    alert("Error generating PDF: " + err.message);
  } finally {
    // Restore button state
    downloadPdfBtn.textContent = originalText;
    downloadPdfBtn.disabled = false;
  }
}

// FIX: Alternative function to use session-based PDF generation
async function generatePdfFromSession() {
  console.log("📄 Generating PDF from session...");

  // Show loading state
  const originalText = downloadPdfBtn.textContent;
  downloadPdfBtn.textContent = "Generating PDF...";
  downloadPdfBtn.disabled = true;

  try {
    const res = await fetch("http://127.0.0.1:8000/generate_pdf_from_session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `razanai_health_assessment_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    console.log("✅ PDF downloaded successfully from session");
  } catch (err) {
    console.error("❌ Session PDF generation error:", err);
    alert("Error generating PDF: " + err.message);
  } finally {
    // Restore button state
    downloadPdfBtn.textContent = originalText;
    downloadPdfBtn.disabled = false;
  }
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// FIX: Use the corrected PDF generation function
downloadPdfBtn.addEventListener("click", generatePdf);

// FIX: Add debug button (optional - you can add this to your HTML for testing)
// <button id="debugBtn" class="bg-gray-500 text-white px-4 py-2 rounded">Debug History</button>
const debugBtn = document.getElementById("debugBtn");
if (debugBtn) {
  debugBtn.addEventListener("click", () => {
    console.log("🐛 Current chat history:", chatHistory);
    fetch("http://127.0.0.1:8000/session_data")
      .then((res) => res.json())
      .then((data) => console.log("🐛 Session data:", data))
      .catch((err) => console.error("🐛 Debug error:", err));
  });
}

// Suggestion pill functionality
document.querySelectorAll(".suggestion-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    inputEl.value = pill.dataset.text;
    inputEl.focus();
  });
});

// Auto-focus input on load
window.addEventListener("load", () => {
  inputEl.focus();
});

// FIX: Add session cleanup on page unload (optional)
window.addEventListener("beforeunload", () => {
  // Optionally reset session when user leaves
  // fetch("http://127.0.0.1:8000/reset_session", { method: "POST" });
});
