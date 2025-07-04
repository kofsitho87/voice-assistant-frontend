module.exports = {
  apps: [
    {
      name: "voice-assistant-frontend",
      exec_mode: "cluster",
      cwd: "./",
      script: "npm",
      args: "run start",
      instances: "1",
      autorestart: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
}
