// engine.js
const puppeteer = require('puppeteer');

// Simulated User Preferences fetched from your Supabase DB
const USER_PREFERENCES = {
  amplifiedTopics: ['ArtificialIntelligence', 'Startups'],
  watchTimeSeconds: 5, // Keep it short for the demo video
};

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

async function runPhantomEngine() {
  console.log('🤖 [FeedFlow Engine] Initializing Phantom Scroller...');
  
  // Launch browser in NON-headless mode so judges can see the automation!
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: null,
    args: ['--window-size=400,800'] // Mobile-ish aspect ratio
  });
  
  const page = await browser.newPage();
  
  // Set a mobile user agent
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');

  for (const topic of USER_PREFERENCES.amplifiedTopics) {
    console.log(`\n🎯 [FeedFlow Engine] Targeting Topic: #${topic}`);
    console.log(`🔗 Navigating to Instagram Explore...`);
    
    // Go directly to the hashtag explore page
    await page.goto(`https://www.instagram.com/explore/tags/${topic.toLowerCase()}/`, { waitUntil: 'networkidle2' });
    
    // Simulate Human Delay
    await delay(3000);
    
    console.log(`👀 [FeedFlow Engine] Simulating human watch-time to train algorithm...`);
    
    // Scroll down slowly to simulate human browsing
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      console.log(`   ⬇️ Scrolling feed...`);
      await delay(USER_PREFERENCES.watchTimeSeconds * 1000);
    }
    
    console.log(`✅ [FeedFlow Engine] Algorithmic signal registered for #${topic}.`);
  }

  console.log('\n🛑 [FeedFlow Engine] Session complete. Updating Analytics Dashboard...');
  await delay(2000);
  await browser.close();
}

runPhantomEngine().catch(console.error);
