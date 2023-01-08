module.exports = {
    apps: [
        {
            name: "SimpleExpress",
            script: "server.js",
            error_file: "/logs/pm2/error/SimpleExpress-Error.log",
            out_file: "/logs/pm2/out/SimpleExpress-Out.log",
            log_data_format: "YYYY-MM-DD HH:mm:ss.SSS",
            watch: false,
            ignore_watch: ["node_modules", "log", "\\.git"],
            watch_options: {
                followSymlinks: false
            },
            env: {
                NODE_ENV: "default",
                PORT: 8080
            },
            env_develop: {
                NODE_ENV: "develop",
                PORT: 3001
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 80
            }
        }
    ]
}