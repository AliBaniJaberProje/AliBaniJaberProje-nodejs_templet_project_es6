"use strict";
module.exports = {
    apps: [
        {
            name: 'templet_node_typescript_mvc',
            script: 'node build/server.js',
            instances: 'MAX',
            watch: true,
            autostart: true,
            max_memory_restart: '1G',
            version: 1.0
        },
    ],
};
