public class Enemy extends Character {
    // The enemy name
    private String name = "";

    // Parameterized constructor that uses the parent constructor
    public Enemy(int health, int damage, String name) {
        super(health, damage);
        this.name = name;
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
        System.out.println(getName() + " attacks for " + getDamage());
    }

    @Override
    public void takeDamage(int amount) {
        setHealth(getHealth() - amount);
        System.out.println(getName() + " takes " + amount + " damage");
        System.out.println(getName() + " now has " + getHealth() + " health");
    }

    @Override
    public void death() {
        System.out.println(getName() + " has been Deafeated!");
    }
}
