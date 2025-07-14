module.exports = {
  apps: [
    {
      name: "sibantengs",
      script: "./src/app.js",
      watch: ".",
      instances: 1,
      autorestart: true,
      max_memory_restart: "200M",
    },
    {
      script: "./service-worker/",
      watch: ["./service-worker"],
    },
  ],

  deploy: {
    production: {
      user: "smkw9",
      host: "sibantengs.smkw9jepara.sch.id",
      ref: "origin/main",
      repo: "https://github.com/alvinnes/sibantengs.git",
      path: "/home/var/www/sibantengs.smkw9jepara.sch.id",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
