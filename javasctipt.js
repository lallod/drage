<script>
document.addEventListener("DOMContentLoaded", function () {
  let heroesArray = [
    {
      id: 0,
      name: "PIPI",
      maxHP: 400,
      currentHP: 400,
      damage: 100,
      alive: true,
    },
    {
      id: 1,
      name: "LALA",
      maxHP: 600,
      currentHP: 600,
      damage: 400,
      alive: true,
    },
    {
      id: 2,
      name: "LOLO",
      maxHP: 800,
      currentHP: 800,
      damage: 400,
      alive: true,
    },
  ];

  let dragonObject = {
    name: "FOFO",
    maxHP: 2000,
    currentHP: 2000,
    damage: 200,
    alive: true,
  };

  function showAlert(attacker, target) {
    alert(
      `${attacker.name} har gjort ${attacker.damage} skade på ${target.name}!\n\n` +
      `${target.name}'s nåværende helse: ${target.currentHP} / ${target.maxHP} HP`
    );
  }

  function markHeroAsDead(hero, containerId) {
    hero.alive = false;
    document.getElementById(containerId).remove();
    alert(`${hero.name} er død!`);
  }

  function attackDragon(hero, containerId) {
    if (dragonObject.alive) {
      // Dragon's counterattack on the hero who attacked
      const counterAttackTarget = hero;
      counterAttackTarget.currentHP -= dragonObject.damage;
      alert(`${dragonObject.name} har angrepet ${counterAttackTarget.name}!\n\n${counterAttackTarget.name}'s nåværende helse: ${counterAttackTarget.currentHP} / ${counterAttackTarget.maxHP} HP`);

      // Check if the hero who attacked is defeated
      if (counterAttackTarget.currentHP <= 0) {
        counterAttackTarget.currentHP = 0;
        markHeroAsDead(counterAttackTarget, containerId);
        checkGameStatus();
      }

      // Check if the dragon is defeated after counterattack
      if (dragonObject.currentHP <= 0) {
        dragonObject.currentHP = 0;
        dragonObject.alive = false;
        document.getElementById(containerId).remove();
        showGameResult(true); // true for game won
      } else {
        updateDragonHealthBar();
      }

      // Hero's attack on the dragon
      dragonObject.currentHP -= hero.damage;
      if (dragonObject.currentHP <= 0) {
        dragonObject.currentHP = 0;
        dragonObject.alive = false;
        document.getElementById(containerId).remove();
        showGameResult(true); // true for game won
      }
      updateDragonHealthBar();
      showAlert(hero, dragonObject);
    } else {
      alert("Dragen er allerede beseiret!");
    }
  }

  function updateHeroHealthBar(hero, containerId) {
    const healthbar = document.getElementById(`${containerId}-healthbar`);
    const percentage = (hero.currentHP / hero.maxHP) * 100;
    healthbar.style.width = `${percentage}%`;
  }

  function updateDragonHealthBar() {
    const healthbar = document.getElementById("dragon-healthbar");
    const percentage = (dragonObject.currentHP / dragonObject.maxHP) * 100;
    healthbar.style.width = `${percentage}%`;
  }

  function checkGameStatus() {
    heroesArray.forEach((hero, index) => {
      if (hero.currentHP <= 0 && hero.alive) {
        hero.currentHP = 0;
        markHeroAsDead(hero, `${hero.name.toLowerCase()}-container`);
      }
    });

    const allHeroesDead = heroesArray.every(hero => !hero.alive);
    if (allHeroesDead && dragonObject.currentHP > 0) {
      showGameResult(false); // false for game lost
    }
  }

  function showGameResult(won) {
    if (won) {
      alert("Gratulerer, du har vunnet!");
    } else {
      alert(`Spillet er tapt! ${dragonObject.name} har vunnet!`);
    }
    removeAllHeroes();
  }

  function removeAllHeroes() {
    document.getElementById("healer-container").remove();
    document.getElementById("archer-container").remove();
    document.getElementById("warrior-container").remove();
  }

  document.getElementById("healer-img-container").addEventListener("click", function () {
    attackDragon(heroesArray[0], "healer-container");
  });

  document.getElementById("archer-img-container").addEventListener("click", function () {
    attackDragon(heroesArray[1], "archer-container");
  });

  document.getElementById("warrior-img-container").addEventListener("click", function () {
    attackDragon(heroesArray[2], "warrior-container");
  });
});
</script>