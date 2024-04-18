
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: "sk-proj-4IJGtnrkOvjBbgzUUWlOT3BlbkFJUj143bOZfVSXtdB3LZz2", // This is the default and can be omitted
  });
  
async function getOpenAIResponse(message) {
    try {
        console.log("hello open ai");

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo",
            max_tokens:100
        });

        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return 'Error processing message';
    }
}

module.exports = { getOpenAIResponse };
