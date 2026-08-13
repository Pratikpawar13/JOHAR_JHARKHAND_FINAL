const { analyzeSingle } = require('./controller/sentimentAI');

async function testSentiment() {
    console.log('🧪 Testing sentiment analysis...');
    
    try {
        const testText = "This is a wonderful experience! I loved visiting Jharkhand.";
        console.log(`📝 Test text: "${testText}"`);
        
        const result = await analyzeSingle(testText, true);
        console.log('✅ Sentiment analysis result:');
        console.log(JSON.stringify(result, null, 2));
        
        if (result && result.sentiment) {
            console.log(`🎯 Detected sentiment: ${result.sentiment} (${Math.round(result.confidence * 100)}% confidence)`);
            if (result.emotions && result.emotions.length > 0) {
                console.log(`😊 Emotions: ${result.emotions.join(', ')}`);
            }
        } else {
            console.log('❌ No sentiment data returned');
        }
        
    } catch (error) {
        console.error('💥 Error testing sentiment analysis:', error.message);
        console.error('Stack:', error.stack);
    }
}

testSentiment();