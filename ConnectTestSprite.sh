#!/bin/bash

# Add common paths to ensure npx is found
export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin:/Users/amosthiosa/.nvm/versions/node/v18.0.0/bin

# Set the API Key
export API_KEY="sk-user-K3cMYsGyaKVchdc1YUvGnrSomBD2ZFAaAQGxTX6FHbpudJGdUcdtHz-eWNuib1tpnv-oel7pUA3TYbOOM_B8pl830PVJaYy_t7yTYninFUB3MRly0ZeZfr3jeqdDJGAzoio"

# Log startup
echo "[$(date)] Starting TestSprite MCP Server" >> /tmp/testsprite_debug.log

# Run the server
# -y: automatically answer yes to prompts
# stderr is appended to the debug log to keep the channel clean, strictly speaking not necessary if IDE ignores stderr, but safer.
# stdout is incorrectly redirected in some examples, here we MUST NOT redirect stdout as it is the transport.

echo "Executing npx..." >> /tmp/testsprite_debug.log

exec npx -y @testsprite/testsprite-mcp@latest 2>> /tmp/testsprite_debug.log
