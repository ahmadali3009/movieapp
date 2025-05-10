import axios from "axios";
import { createContext, useState } from "react";

// Define the structure of a movie suggestion
interface MovieSuggestion {
  title: string;
  reason: string;
}

interface LLMsContextType {
  responsesuggestion: MovieSuggestion[] | null;
  isLoading: boolean;
  error: string | null;
  LLMssugetion: (inputque: string) => Promise<void>;
}

export const LLMsContext = createContext<LLMsContextType | null>(null);

export const LLMsProvider = ({ children }: any) => {
  const [responsesuggestion, setresponsesuggestion] = useState<MovieSuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const LLMssugetion = async (inputque: string) => {
    if (!inputque.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log("inputque", inputque);

      const response = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAUzTpPt76bXGtVx9MaPiq39hyZq6bW2EI',
        data: {
          "contents": [{
            "parts": [{
              "text": `Give me the top 5 movies or TV shows similar to "${inputque}". Return the response as a JSON array with objects containing "title" and "reason" fields. The "reason" should be 100 words long and explain why this movie is similar to "${inputque}".`
            }]
          }]
        }
      });

      console.log('Response from server:', response.data);

      // Extract the text content from Gemini's response
      const textContent = response.data.candidates[0].content.parts[0].text;

      // Parse the JSON from the text response
      // First, try to find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = textContent.match(/```json\n([\s\S]*?)\n```/) ||
                        textContent.match(/```\n([\s\S]*?)\n```/) ||
                        [null, textContent];

      const jsonString = jsonMatch[1];

      try {
        // Parse the JSON string into an array of movie suggestions
        const suggestions = JSON.parse(jsonString);

        if (Array.isArray(suggestions)) {
          setresponsesuggestion(suggestions);
        } else {
          throw new Error("Response is not an array");
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        setError("Failed to parse LLM response");
        setresponsesuggestion(null);
      }
    } catch (error: any) {
      console.error('Error fetching response:', error);
      setError(error.message || "Failed to get suggestions");
      setresponsesuggestion(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LLMsContext.Provider value={{ responsesuggestion, isLoading, error, LLMssugetion }}>
      {children}
    </LLMsContext.Provider>
  );
};