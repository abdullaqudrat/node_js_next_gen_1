require('dotenv').config();
const OpenAI = require('openai');
const readlineSync = require('readline-sync');

// Open AI configuration
let messages = [{ role: "system", content: "You are a helpful assistant." }];
const openai = new OpenAI();

// Get user input
function getInput(promptMessage) {
  return readlineSync.question(promptMessage, {
    hideEchoBack: false, // The typed characters won't be displayed if set to true
  });
}

async function main() {
  console.log('\n\n----------------------------------');
  console.log('          CHAT WITH AI 🤖   ');
  console.log('----------------------------------\n');
  console.log("type 'x' to exit the conversation");
  runConversation();
}

async function runConversation() {
  while (true) {
    try {
      const input = getInput('You: ');
      if (input === 'x') {
        console.log("Goodbye!");
        process.exit();
      }
    
      if (!input.trim()) {
        console.log("⚠️ Empty input. Please type something.");
        continue;
      }
    
      messages.push({ role: "user", content: input });
    
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo"
      });
    
      const reply = completion.choices[0].message.content;
      console.log(`AI: ${reply}`);
      messages.push({ role: "assistant", content: reply });
    
    } catch (err) {
      console.error("❌ Error during chat:", err);
    }    
  }
}

main();
