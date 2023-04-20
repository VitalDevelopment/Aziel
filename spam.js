setInterval(() => {
  for (let i = 0; i < 50000; i++){
    require(`superagent`).get(`universe-list.xyz`).then(() => true).catch(() => false);
  }
})