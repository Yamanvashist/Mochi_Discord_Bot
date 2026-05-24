const cooldowns = new Map();

export function checkCooldown(userId, commandName, cooldownTime = 10000) {

  const key = `${userId}-${commandName}`;
  console.log(key)
  const now = Date.now();
  

  if (cooldowns.has(key)) {
    const lastTime = cooldowns.get(key);
    const remaining = cooldownTime - (now - lastTime);

    if (remaining > 0) {
      return remaining;
    }
  }

  cooldowns.set(key, now);
  console.log(cooldowns)
  
  return null;
}

