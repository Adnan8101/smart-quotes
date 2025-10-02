"""
AI Blockchain Quote Manager - Python AI Model
Custom Machine Learning Model for Quote Analysis

This Flask API provides:
- Sentiment analysis (positive, negative, neutral)
- Category classification
- Confidence scoring
- Keyword extraction
- AI-powered insights

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
import nltk
import re
from typing import Dict, List, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Download required NLTK data (run once)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    logger.info("Downloading NLTK punkt tokenizer...")
    nltk.download('punkt')

try:
    nltk.data.find('corpora/brown')
except LookupError:
    logger.info("Downloading NLTK brown corpus...")
    nltk.download('brown')


class QuoteAnalyzer:
    """Custom AI model for analyzing quotes"""
    
    CATEGORIES = {
        'motivation': ['success', 'achieve', 'goal', 'dream', 'inspire', 'motivate', 'persevere', 'determination'],
        'wisdom': ['wisdom', 'knowledge', 'learn', 'understand', 'truth', 'think', 'mind', 'philosophy'],
        'love': ['love', 'heart', 'romance', 'passion', 'care', 'affection', 'relationship', 'together'],
        'success': ['success', 'win', 'accomplish', 'victory', 'triumph', 'achieve', 'excel', 'prosper'],
        'philosophy': ['life', 'existence', 'meaning', 'purpose', 'being', 'reality', 'consciousness', 'soul'],
        'leadership': ['lead', 'leader', 'manage', 'guide', 'direct', 'influence', 'inspire', 'command'],
        'creativity': ['create', 'creative', 'art', 'imagine', 'invent', 'innovate', 'design', 'original'],
        'courage': ['courage', 'brave', 'fear', 'bold', 'daring', 'heroic', 'strength', 'fearless'],
        'innovation': ['innovation', 'new', 'future', 'technology', 'change', 'progress', 'advance', 'revolutionary'],
        'life': ['life', 'living', 'experience', 'journey', 'moment', 'time', 'day', 'world']
    }
    
    def analyze_sentiment(self, text: str) -> Dict[str, Any]:
        """Analyze sentiment using TextBlob"""
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        subjectivity = blob.sentiment.subjectivity
        
        # Determine sentiment
        if polarity > 0.1:
            sentiment = 'positive'
            emoji = '😊'
        elif polarity < -0.1:
            sentiment = 'negative'
            emoji = '😔'
        else:
            sentiment = 'neutral'
            emoji = '😐'
        
        return {
            'sentiment': sentiment,
            'sentimentEmoji': emoji,
            'sentimentScore': round(polarity, 2),
            'subjectivity': round(subjectivity, 2),
            'polarity': polarity
        }
    
    def classify_category(self, text: str) -> tuple[str, float]:
        """Classify quote into a category with confidence score"""
        text_lower = text.lower()
        words = re.findall(r'\w+', text_lower)
        
        category_scores = {}
        
        for category, keywords in self.CATEGORIES.items():
            score = sum(1 for word in words if word in keywords)
            category_scores[category] = score
        
        # Get category with highest score
        if max(category_scores.values()) > 0:
            best_category = max(category_scores, key=category_scores.get)
            # Calculate confidence (0-100%)
            max_score = category_scores[best_category]
            confidence = min(70 + (max_score * 10), 95)  # 70-95% range
        else:
            best_category = 'wisdom'  # Default fallback
            confidence = 60
        
        return best_category, confidence
    
    def extract_keywords(self, text: str) -> List[str]:
        """Extract important keywords from text"""
        blob = TextBlob(text)
        words = [word.lower() for word in blob.words if len(word) > 4]
        
        # Remove common words
        stop_words = {'about', 'would', 'there', 'their', 'which', 'where', 'these', 'those'}
        keywords = [word for word in words if word not in stop_words]
        
        # Return top 5 unique keywords
        return list(dict.fromkeys(keywords))[:5]
    
    def generate_insights(self, text: str, sentiment: str, category: str) -> List[str]:
        """Generate AI insights based on analysis"""
        insights = []
        
        word_count = len(text.split())
        
        # Sentiment-based insights
        if sentiment == 'positive':
            insights.append('✨ This quote has strong emotional resonance')
            insights.append('🎯 Perfect for inspirational contexts')
        elif sentiment == 'negative':
            insights.append('💭 This quote explores challenging themes')
            insights.append('🎯 Effective for thought-provoking discussions')
        else:
            insights.append('⚖️ This quote presents a balanced perspective')
            insights.append('🎯 Suitable for reflective contexts')
        
        # Length-based insights
        if word_count < 10:
            insights.append('⚡ Concise and impactful - high memorability factor')
        elif word_count > 30:
            insights.append('📚 Detailed expression with rich context')
        else:
            insights.append('💫 Well-balanced length for easy sharing')
        
        # Category-based insights
        category_insights = {
            'motivation': '🔥 Excellent for social sharing and motivation boards',
            'wisdom': '📖 Great for educational and philosophical discussions',
            'love': '❤️ Perfect for personal messages and romantic contexts',
            'success': '🏆 Ideal for business and professional environments',
            'leadership': '👥 Excellent for team building and management',
            'creativity': '🎨 Perfect for artistic and innovative communities',
            'courage': '💪 Great for personal development content',
            'innovation': '🚀 Ideal for technology and startup contexts',
            'life': '🌟 Universal appeal for general audiences'
        }
        
        if category in category_insights:
            insights.append(category_insights[category])
        
        return insights[:4]  # Return top 4 insights
    
    def generate_recommendations(self, category: str, sentiment: str) -> List[str]:
        """Generate recommendations for quote usage"""
        recommendations = []
        
        # Category-specific recommendations
        if category == 'motivation':
            recommendations.extend([
                'Consider adding to daily motivation collection',
                'Perfect for morning inspiration posts',
                'Great for team building sessions'
            ])
        elif category == 'wisdom':
            recommendations.extend([
                'Excellent for educational content',
                'Share in learning communities',
                'Great for blog posts and articles'
            ])
        elif category == 'love':
            recommendations.extend([
                'Perfect for romantic occasions',
                'Great for personal messages',
                'Share on relationship-focused platforms'
            ])
        else:
            recommendations.extend([
                f'Add to your {category} quote collection',
                'Great for social media posts',
                'Perfect for presentations and talks'
            ])
        
        return recommendations[:3]  # Return top 3
    
    def analyze_quote(self, text: str, author: str = 'Unknown') -> Dict[str, Any]:
        """Complete quote analysis"""
        # Sentiment analysis
        sentiment_data = self.analyze_sentiment(text)
        
        # Category classification
        category, category_confidence = self.classify_category(text)
        
        # Extract keywords
        keywords = self.extract_keywords(text)
        
        # Generate insights
        insights = self.generate_insights(text, sentiment_data['sentiment'], category)
        
        # Generate recommendations
        recommendations = self.generate_recommendations(category, sentiment_data['sentiment'])
        
        # Calculate overall confidence
        confidence = int((category_confidence + abs(sentiment_data['polarity']) * 20 + 60) / 2)
        confidence = min(confidence, 95)  # Cap at 95%
        
        return {
            'sentiment': sentiment_data['sentiment'],
            'sentimentEmoji': sentiment_data['sentimentEmoji'],
            'sentimentScore': sentiment_data['sentimentScore'],
            'confidence': confidence,
            'category': category,
            'keywords': keywords,
            'insights': insights,
            'recommendations': recommendations,
            'analysis': {
                'wordCount': len(text.split()),
                'characterCount': len(text),
                'polarity': sentiment_data['polarity'],
                'subjectivity': sentiment_data['subjectivity']
            }
        }


# Initialize analyzer
analyzer = QuoteAnalyzer()


# ==================== API ROUTES ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'AI Quote Analyzer',
        'version': '1.0.0',
        'model': 'TextBlob + Custom ML'
    })


@app.route('/api/analyze', methods=['POST'])
def analyze_quote():
    """Analyze a quote and return AI insights"""
    try:
        data = request.get_json()
        
        # Debug logging
        logger.info(f"Received analyze request - Data: {data}")
        
        if not data:
            logger.error("No JSON data received")
            return jsonify({'error': 'No JSON data received'}), 400
            
        if 'text' not in data:
            logger.error(f"Missing 'text' field. Received keys: {list(data.keys())}")
            return jsonify({'error': 'Missing quote text field'}), 400
        
        text = data['text']
        author = data.get('author', 'Unknown')
        
        if not text or len(text.strip()) < 10:
            logger.error(f"Quote text too short: {len(text.strip())} characters")
            return jsonify({'error': 'Quote text too short (minimum 10 characters)'}), 400
        
        # Perform analysis
        result = analyzer.analyze_quote(text, author)
        
        logger.info(f"Analyzed quote by {author}: {result['category']} ({result['confidence']}% confidence)")
        
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/search', methods=['POST'])
def search_quotes():
    """Find best matching quote from a list"""
    try:
        data = request.get_json()
        
        if not data or 'query' not in data or 'quotes' not in data:
            return jsonify({'error': 'Missing query or quotes'}), 400
        
        query = data['query'].lower()
        quotes = data['quotes']
        
        if not quotes:
            return jsonify({
                'selectedQuote': None,
                'explanation': 'No quotes available to search',
                'confidence': 0
            })
        
        # Simple keyword matching (can be enhanced)
        best_match = None
        best_score = 0
        
        for quote in quotes:
            text = quote.get('text', '').lower()
            category = quote.get('category', '').lower()
            
            # Calculate match score
            score = 0
            if query in text:
                score += 10
            if query in category:
                score += 5
            
            # Word overlap
            query_words = set(query.split())
            text_words = set(text.split())
            overlap = len(query_words & text_words)
            score += overlap * 2
            
            if score > best_score:
                best_score = score
                best_match = quote
        
        if best_match:
            confidence = min(best_score * 10, 95)
            return jsonify({
                'selectedQuote': best_match,
                'explanation': f'Best match found with {confidence}% confidence based on keyword relevance',
                'confidence': confidence / 100,
                'matchScore': best_score
            })
        else:
            # Return random quote if no good match
            import random
            random_quote = random.choice(quotes)
            return jsonify({
                'selectedQuote': random_quote,
                'explanation': 'No strong matches found. Here\'s a random quote from your collection',
                'confidence': 0.5,
                'matchScore': 0
            })
    
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/random', methods=['POST'])
def random_quote():
    """Get a random quote with AI insights"""
    try:
        data = request.get_json()
        quotes = data.get('quotes', [])
        
        if not quotes:
            return jsonify({'error': 'No quotes available'}), 400
        
        import random
        selected = random.choice(quotes)
        
        # Analyze the selected quote
        analysis = analyzer.analyze_quote(selected['text'], selected['author'])
        
        return jsonify({
            'selectedQuote': selected,
            'explanation': f'Randomly selected {analysis["category"]} quote with {analysis["sentiment"]} sentiment',
            'confidence': 0.8,
            'analysis': analysis
        })
    
    except Exception as e:
        logger.error(f"Random quote error: {str(e)}")
        return jsonify({'error': str(e)}), 500


# ==================== MAIN ====================

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🤖 AI Blockchain Quote Manager - Python AI Server")
    print("="*60)
    print("✅ Server Status: READY")
    print("🌐 Server URL: http://localhost:5002")
    print("📚 API Endpoints:")
    print("   - GET  /api/health   - Health check")
    print("   - POST /api/analyze  - Analyze quote")
    print("   - POST /api/search   - Search quotes")
    print("   - POST /api/random   - Random quote")
    print("\n💡 Features:")
    print("   - Sentiment Analysis (TextBlob)")
    print("   - Category Classification")
    print("   - Keyword Extraction")
    print("   - AI-Powered Insights")
    print("   - 100% FREE - No API Keys!")
    print("\n👥 Team: Adnan (67), Chirayu (68), Abdul (69), Ralph (9)")
    print("🎓 Project Mentor: Abhijeet Jhadhav")
    print("="*60 + "\n")
    
    # Run Flask server
    app.run(host='0.0.0.0', port=5001, debug=True)
