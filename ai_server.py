#!/usr/bin/env python3
"""
AIB Quote Manager - AI Analysis Service
A lightweight Python Flask API for quote sentiment analysis, categorization, and insights.

Team:
- Adnan Qureshi (67) - Project Lead & Blockchain Developer
- Chirayu Giri (68) - AI Developer
- Abdul Adeen (69) - Frontend Developer
- Ralph Gonsalves (9) - Backend Developer

Project Mentor: Abhijeet Jhadhav
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import re
import nltk
from collections import Counter
import random

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Category keywords mapping
CATEGORY_KEYWORDS = {
    'motivation': ['achieve', 'success', 'goal', 'dream', 'inspire', 'motivate', 'determination', 'perseverance', 'ambition', 'drive'],
    'life': ['life', 'live', 'experience', 'journey', 'existence', 'living', 'moment', 'time', 'day', 'world'],
    'success': ['success', 'win', 'victory', 'accomplish', 'achieve', 'triumph', 'excel', 'master', 'champion', 'best'],
    'wisdom': ['wisdom', 'knowledge', 'learn', 'understand', 'truth', 'wise', 'insight', 'enlighten', 'aware', 'mindful'],
    'happiness': ['happy', 'joy', 'smile', 'cheerful', 'delight', 'pleasure', 'content', 'bliss', 'glad', 'enjoy'],
    'love': ['love', 'heart', 'care', 'affection', 'compassion', 'kindness', 'tender', 'beloved', 'dear', 'cherish'],
    'inspiration': ['inspire', 'creative', 'imagine', 'innovate', 'create', 'original', 'vision', 'dream', 'idea', 'possibility'],
    'leadership': ['lead', 'leader', 'manage', 'guide', 'direct', 'influence', 'command', 'authority', 'responsibility', 'team'],
    'mindfulness': ['mindful', 'present', 'aware', 'conscious', 'meditate', 'peace', 'calm', 'focus', 'attention', 'zen'],
    'creativity': ['creative', 'create', 'art', 'design', 'imagine', 'innovate', 'original', 'unique', 'express', 'craft']
}

# Sentiment emoji mapping
SENTIMENT_EMOJIS = {
    'positive': '😊',
    'negative': '😔',
    'neutral': '😐'
}

def analyze_sentiment(text):
    """Analyze sentiment using TextBlob"""
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    
    if polarity > 0.1:
        sentiment = 'positive'
    elif polarity < -0.1:
        sentiment = 'negative'
    else:
        sentiment = 'neutral'
    
    return {
        'sentiment': sentiment,
        'emoji': SENTIMENT_EMOJIS[sentiment],
        'score': round((polarity + 1) / 2, 2),  # Normalize to 0-1
        'polarity': round(polarity, 2)
    }

def extract_keywords(text, max_keywords=5):
    """Extract key words from text"""
    # Convert to lowercase and remove punctuation
    text_clean = re.sub(r'[^\w\s]', '', text.lower())
    
    # Tokenize
    words = word_tokenize(text_clean)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    keywords = [word for word in words if word not in stop_words and len(word) > 3]
    
    # Get most common keywords
    word_freq = Counter(keywords)
    return [word for word, _ in word_freq.most_common(max_keywords)]

def classify_category(text, keywords):
    """Classify quote into a category based on keywords"""
    text_lower = text.lower()
    category_scores = {}
    
    for category, category_keywords in CATEGORY_KEYWORDS.items():
        score = 0
        for keyword in category_keywords:
            if keyword in text_lower:
                score += 2
            for extracted_keyword in keywords:
                if keyword in extracted_keyword or extracted_keyword in keyword:
                    score += 1
        category_scores[category] = score
    
    # Get category with highest score
    best_category = max(category_scores, key=category_scores.get)
    max_score = category_scores[best_category]
    
    # Default to 'wisdom' if no good match
    if max_score == 0:
        return 'wisdom', 50
    
    # Calculate confidence (0-100)
    confidence = min(50 + (max_score * 10), 95)
    
    return best_category, confidence

def generate_insights(text, sentiment_data, category, keywords):
    """Generate AI insights about the quote"""
    insights = []
    recommendations = []
    
    # Sentiment-based insights
    if sentiment_data['sentiment'] == 'positive':
        insights.append("✨ This quote has strong emotional resonance")
        insights.append("🎯 Perfect for inspirational contexts")
        recommendations.append("Consider adding to daily motivation collection")
        recommendations.append("Great for social media posts")
    elif sentiment_data['sentiment'] == 'negative':
        insights.append("💭 This quote provokes deep reflection")
        insights.append("🎯 Effective for serious discussions")
        recommendations.append("Use in educational or philosophical contexts")
        recommendations.append("Good for introspective moments")
    else:
        insights.append("⚖️ This quote presents balanced perspective")
        insights.append("🎯 Suitable for analytical contexts")
        recommendations.append("Perfect for thoughtful discussions")
        recommendations.append("Use in professional settings")
    
    # Length-based insights
    word_count = len(text.split())
    if word_count < 10:
        insights.append("💡 Concise and memorable")
        recommendations.append("Excellent for quick inspiration")
    elif word_count > 30:
        insights.append("📚 Rich in depth and meaning")
        recommendations.append("Perfect for detailed reflection")
    else:
        insights.append("💫 Well-balanced length")
    
    # Category-based insights
    if category in ['motivation', 'success', 'inspiration']:
        insights.append("🔥 High motivational impact")
        recommendations.append("Perfect for team building sessions")
    elif category in ['wisdom', 'mindfulness']:
        insights.append("🧘 Promotes mindful thinking")
        recommendations.append("Great for meditation sessions")
    elif category == 'love':
        insights.append("❤️ Strong emotional connection")
        recommendations.append("Perfect for personal messages")
    
    # Keyword-based insights
    if any(keyword in ['achieve', 'success', 'goal'] for keyword in keywords):
        insights.append("🎯 Achievement-oriented message")
    if any(keyword in ['time', 'moment', 'present'] for keyword in keywords):
        insights.append("⏰ Emphasizes importance of timing")
    
    # Add memorability factor
    insights.append("💫 High memorability factor")
    recommendations.append("Shareable on social platforms")
    
    return insights[:4], recommendations[:3]  # Limit to 4 insights and 3 recommendations

def calculate_overall_confidence(sentiment_confidence, category_confidence, text):
    """Calculate overall confidence score"""
    # Base confidence from sentiment and category
    base_confidence = (sentiment_confidence + category_confidence) / 2
    
    # Adjust based on text quality
    word_count = len(text.split())
    if 5 <= word_count <= 50:  # Ideal length
        length_bonus = 10
    elif word_count < 5:
        length_bonus = -10
    else:
        length_bonus = 0
    
    # Check for proper grammar (basic check)
    has_punctuation = any(char in text for char in '.!?')
    punctuation_bonus = 5 if has_punctuation else 0
    
    final_confidence = base_confidence + length_bonus + punctuation_bonus
    return min(max(final_confidence, 40), 95)  # Clamp between 40-95

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'AI service is running',
        'version': '1.0.0'
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_quote():
    """Analyze a single quote and return insights"""
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        author = data.get('author', 'Unknown')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        # Analyze sentiment
        sentiment_data = analyze_sentiment(text)
        
        # Extract keywords
        keywords = extract_keywords(text)
        
        # Classify category
        category, category_confidence = classify_category(text, keywords)
        
        # Generate insights
        insights, recommendations = generate_insights(text, sentiment_data, category, keywords)
        
        # Calculate overall confidence
        sentiment_confidence = int(sentiment_data['score'] * 100)
        overall_confidence = calculate_overall_confidence(sentiment_confidence, category_confidence, text)
        
        result = {
            'sentiment': sentiment_data['sentiment'],
            'sentimentEmoji': sentiment_data['emoji'],
            'sentimentScore': sentiment_data['score'],
            'confidence': overall_confidence,
            'category': category,
            'keywords': keywords,
            'insights': insights,
            'recommendations': recommendations,
            'analysis': {
                'wordCount': len(text.split()),
                'characterCount': len(text),
                'polarity': sentiment_data['polarity']
            }
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/find-quote', methods=['POST'])
def find_best_quote():
    """Find the best matching quote from a list based on query"""
    try:
        data = request.get_json()
        query = data.get('query', '').strip().lower()
        quotes = data.get('quotes', [])
        
        if not query:
            return jsonify({'error': 'Query is required'}), 400
        
        if not quotes:
            return jsonify({'error': 'Quotes array is required'}), 400
        
        # Score each quote
        scored_quotes = []
        query_keywords = extract_keywords(query)
        
        for quote in quotes:
            text = quote.get('text', '').lower()
            author = quote.get('author', '').lower()
            category = quote.get('category', '').lower()
            
            score = 0
            
            # Direct text match
            if query in text:
                score += 50
            
            # Keyword matches
            quote_keywords = extract_keywords(text)
            matching_keywords = set(query_keywords) & set(quote_keywords)
            score += len(matching_keywords) * 10
            
            # Category match
            if query in category:
                score += 30
            
            # Author match
            if query in author:
                score += 20
            
            # Partial word matches
            for word in query.split():
                if len(word) > 3 and word in text:
                    score += 5
            
            scored_quotes.append({
                'quote': quote,
                'score': score
            })
        
        # Sort by score
        scored_quotes.sort(key=lambda x: x['score'], reverse=True)
        
        if scored_quotes[0]['score'] == 0:
            # No good match, return random quote
            selected = random.choice(quotes)
            explanation = "No direct matches found. Here's a random inspirational quote."
            confidence = 40
        else:
            selected = scored_quotes[0]['quote']
            explanation = f"This quote best matches your search for '{query}' with a relevance score of {scored_quotes[0]['score']}."
            confidence = min(50 + scored_quotes[0]['score'], 95)
        
        result = {
            'selectedQuote': selected,
            'explanation': explanation,
            'confidence': confidence,
            'matchScore': scored_quotes[0]['score'] if scored_quotes else 0
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/random-insight', methods=['POST'])
def random_insight():
    """Get insight for a random quote"""
    try:
        data = request.get_json()
        quotes = data.get('quotes', [])
        
        if not quotes:
            return jsonify({'error': 'Quotes array is required'}), 400
        
        # Select random quote
        selected_quote = random.choice(quotes)
        
        # Analyze it
        analysis = analyze_quote_internal(selected_quote.get('text', ''))
        
        result = {
            'selectedQuote': selected_quote,
            'analysis': analysis,
            'explanation': f"Here's an inspiring {selected_quote.get('category', 'quote')} for you!",
            'confidence': 0.85
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quote-insights', methods=['POST'])
def quote_insights():
    """Get detailed AI insights for a specific quote"""
    try:
        data = request.get_json()
        quote = data.get('quote')
        
        if not quote:
            return jsonify({'error': 'Quote object is required'}), 400
        
        text = quote.get('text', '')
        author = quote.get('author', 'Unknown')
        
        if not text:
            return jsonify({'error': 'Quote text is required'}), 400
        
        # Analyze the quote
        sentiment_data = analyze_sentiment(text)
        keywords = extract_keywords(text)
        category, category_confidence = classify_category(text, keywords)
        insights, recommendations = generate_insights(text, sentiment_data, category, keywords)
        
        # Create detailed explanation
        sentiment_desc = {
            'positive': 'radiates positivity and encouragement',
            'negative': 'addresses challenging themes with depth',
            'neutral': 'offers balanced perspective'
        }
        
        explanation = f"This {category} quote by {author} {sentiment_desc.get(sentiment_data['sentiment'], 'provides insight')}. "
        
        if insights:
            explanation += insights[0]
        
        result = {
            'selectedQuote': quote,
            'explanation': explanation,
            'confidence': category_confidence,
            'analysis': {
                'sentiment': sentiment_data['sentiment'],
                'sentimentEmoji': sentiment_data['emoji'],
                'category': category,
                'insights': insights,
                'recommendations': recommendations,
                'keywords': keywords
            }
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def analyze_quote_internal(text):
    """Internal method to analyze quote (used by random_insight)"""
    sentiment_data = analyze_sentiment(text)
    keywords = extract_keywords(text)
    category, category_confidence = classify_category(text, keywords)
    insights, recommendations = generate_insights(text, sentiment_data, category, keywords)
    
    return {
        'sentiment': sentiment_data['sentiment'],
        'sentimentEmoji': sentiment_data['emoji'],
        'category': category,
        'insights': insights,
        'recommendations': recommendations
    }

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 AIB Quote Manager - AI Service Starting...")
    print("=" * 60)
    print("📍 Server: http://localhost:5001")
    print("🏥 Health: http://localhost:5001/api/health")
    print("💡 Analyze: POST http://localhost:5001/api/analyze")
    print("🔍 Search: POST http://localhost:5001/api/find-quote")
    print("🎲 Random: POST http://localhost:5001/api/random-insight")
    print(" Insights: POST http://localhost:5001/api/quote-insights")
    print("=" * 60)
    print("👥 Team: Adnan (67), Chirayu (68), Abdul (69), Ralph (9)")
    print("🎓 Mentor: Abhijeet Jhadhav")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5001, debug=True)
