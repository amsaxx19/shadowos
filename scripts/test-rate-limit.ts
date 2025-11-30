import { createClient } from '@supabase/supabase-js';

// Colors
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    bold: "\x1b[1m"
};

async function runRateLimitTest() {
    console.log(`${colors.bold}${colors.blue}🚦 Infrastructure Test: Rate Limiting (Anti-Spam)${colors.reset}\n`);

    const targetUrl = 'http://localhost:3000/login'; // Protected by middleware
    const totalRequests = 20;
    const expectedLimit = 10;

    console.log(`1️⃣  Simulating Spam Attack: ${totalRequests} requests to ${targetUrl}...`);

    let successCount = 0;
    let blockedCount = 0;
    let errors = 0;

    const requests = [];
    for (let i = 0; i < totalRequests; i++) {
        requests.push(fetch(targetUrl));
    }

    const responses = await Promise.all(requests);

    for (const res of responses) {
        if (res.status === 200 || res.status === 404 || res.status === 401 || res.status === 307) {
            // 200 OK, or redirects/auth errors (meaning request passed middleware)
            successCount++;
        } else if (res.status === 429) {
            blockedCount++;
        } else {
            console.log(`   ❓ Unexpected Status: ${res.status}`);
            errors++;
        }
    }

    console.log(`\n📊 Results:`);
    console.log(`   ✅ Passed: ${successCount}`);
    console.log(`   ⛔ Blocked: ${blockedCount} (429 Too Many Requests)`);

    if (blockedCount > 0) {
        console.log(`\n${colors.green}${colors.bold}FINAL STATUS: PASS${colors.reset}`);
        console.log("   System successfully blocked excess requests.");
    } else {
        console.log(`\n${colors.red}${colors.bold}FINAL STATUS: FAIL${colors.reset}`);
        console.log("   System allowed ALL requests. Rate limiting is NOT active or threshold too high.");
        console.log("   (Note: If running locally without Upstash, ensure the fallback logic is working)");
    }
}

runRateLimitTest();
