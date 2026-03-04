import java.util.Random;

public class FinalBoss extends Character {

    private String name = "Captain Rattlebones";

    Random random = new Random();

    // Parameterized constructor
    public FinalBoss(int health, int damage) {
        super(health, damage);
    }

    // Setters & Getters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Abstract methods
    @Override
    public void attack() {
        System.out.println(getName() + " attacks...");
    }

    @Override
    public void takeDamage(int amount) {
        setHealth(getHealth() - amount);
        System.out.println(getName() + " takes " + amount + " damage");
        System.out.println(getName() + " now has " + getHealth() + " health");
        if (getHealth() < 0) {
            System.out.println(getName() + " has been Deafeated!");
        }
    }

    @Override
    public void death() {

    }

    // This methods checks to see if the boss will do a special attack and returns
    // the damage for that turn
    public int specialAttackCheck() {
        int damageDealt = 0;
        Random rn = new Random();
        int attackChance = rn.nextInt(1, 11);
        if (attackChance == 1) {
            System.out.println("But wait it was a crane kick attack that does " + (getDamage() + 10));
            damageDealt = getDamage() + 10;
        } else {
            System.out.println("For " + getDamage());
            damageDealt = getDamage();
        }

        return damageDealt;
    }
}