'use server'
export async function sendQuestion(question: string){
    const apiText = process.env.GEMINI_API_TEXT as string
    const escapedValue = apiText?.replace(/\\n/g, '\\n').replace(/\\'/g, '\\\'');
    let answer = "I had a problem and can not answer right now. Ask me back in a minute."
    if(escapedValue){
      const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              contents: [
                  {
                  parts: [
                      {
                      text: `${escapedValue}\nQuestion: ${question}\nAnswer:`
                      }
                  ]
                  }
              ],
              generationConfig: {
                  temperature: 1,
                  topK: 0,
                  topP: 0.95,
                  maxOutputTokens: 8192,
                  stopSequences: []
              },
              safetySettings: [
                  {
                  category: "HARM_CATEGORY_HARASSMENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                  },
                  {
                  category: "HARM_CATEGORY_HATE_SPEECH",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                  },
                  {
                  category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                  },
                  {
                  category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                  }
              ]
          })
      })
      if (response.ok){
        const data = await response.json() as Promise<{candidates:{content:{parts:{text:string}[]}}[]}>
        console.log(JSON.stringify(data)) //Console log received data.
        answer = (await data).candidates[0].content.parts[0].text;
      } else {
        answer = "Error fetching data from server."
      }
    }
    return answer
  }