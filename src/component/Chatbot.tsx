import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import Fuse from 'fuse.js';

interface Message {
  text: string;
  isUser: boolean;
}

const chatbotResponses = [
  {
   question: "What are your store hours/time/timing/opening hour/opening time?",
    answer: "Our store is open from 8:00 AM to 10:00 PM, Monday to Sunday. Would you like to check the hours for a specific location?"
  },
  {
    question: "Do you have a loyalty program?",
    answer: "Yes! Our Loyalty Rewards Program gives you points on every purchase, which you can redeem for discounts. Would you like me to help you sign up?"
  },
  {
    question: "Where can I find dairy/vegetables/eggs/fruits/bakery/meat/chicken products in the store?",
    answer: "Dairy products are located in Aisle 5, near the refrigerated section. You can also check our store map in the app for exact locations."
  },
  {
     question: "Do you have organic apples  in stock?",
    answer: "Yes! We currently have organic Fuji and Gala apple in stock. Would you like to add them to your cart?"
  },
  {
    question: "Do you have organic banana  in stock?",
    answer: "Yes! We currently have organic lady finger and plantain banana  in stock. Would you like to add them to your cart?"
  },
  {
    question: "Do you have organic potato  in stock?",
    answer: "Yes! We currently have organic king edward and salad potatoes  in stock. Would you like to add them to your cart?"
  },
  {
    question: "Do you have organic meats  in stock?",
    answer: "Yes! We currently have organic lamb,beef'turkey meat  in stock. Would you like to add them to your cart?"
  },
  {
    question: "Do you have organic chicken  in stock?",
    answer: "Yes! We currently have organic british whole ,drumbstick,fillet chicken  in stock. Would you like to add them to your cart?"
  },
  {
    question: "Do you have organic eggs  in stock?",
    answer: "Yes! We currently have organic 6,12 and 15 pieces of carten  in stock. Would you like to add them to your cart?"
  },
  {
    question: "What is the price of a gallon of milk?",
    answer: "A gallon of whole milk costs $3.99. Prices may vary by location. Would you like to check the price for a specific brand?"
  },
  {
    question: "When will fresh chicken/ fresh vegetables/ fresh fruits/ fresh juice/ fresh milk be restocked?",
    answer: "Fresh products will be restocked on Wednesday morning. Would you like me to notify you when it's available?"
  },
  {
    question: "Can I track my order?",
    answer: "Sure! Please enter your order number, and I'll check the status for you."
  },
  {
    question: "How long does delivery take?",
    answer: "Our standard delivery takes 1-2 hours for local orders. Would you like me to check your estimated delivery time?"
  },
  {
    question: "Can I change my delivery time?",
    answer: "You can update your delivery time up to 1 hour before dispatch. Please provide your order number, and I'll check if it can be changed."
  },
  {
    question: "What are some healthy snack options?",
    answer: "Here are some healthy snack options:\n• Almonds & mixed nuts\n• Greek yogurt\n• Fresh fruit slices\n• Whole grain crackers with hummus\nWould you like to add any to your cart?"
  },
  {
    question: "Can you suggest a recipe using chicken and broccoli?",
    answer: "Of course! Here's a simple recipe: Garlic Chicken & Broccoli Stir-Fry\n\nIngredients:\n• 1 lb chicken breast (sliced)\n• 2 cups broccoli florets\n• 2 cloves garlic (minced)\n• 2 tbsp soy sauce\n• 1 tbsp olive oil\n\nInstructions:\n1. Heat oil in a pan and sauté garlic.\n2. Add chicken and cook until golden brown.\n3. Toss in broccoli and stir-fry for 3-4 minutes.\n4. Add soy sauce and mix well. Serve hot!\n\nWould you like to add these ingredients to your cart?"
  },
  {
    question: "What's on sale this week?",
    answer: "Here are some current promotions:\n• Buy 1 Get 1 Free on selected snacks\n• 20% off fresh produce\n• Discounted prices on dairy and bakery items"
  }
];

const fuse = new Fuse(chatbotResponses, {
  keys: ['question'],
  threshold: 0.4,
});

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm FreshMart's AI assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);

    const results = fuse.search(input);
    const response = results.length > 0
      ? chatbotResponses[results[0].refIndex].answer
      : "I'm not sure about that. Could you please rephrase your question or ask something else?";

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 max-w-[calc(100vw-2rem)] flex flex-col">
          <div className="p-4 bg-green-600 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <h3 className="font-semibold">FreshMart Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
