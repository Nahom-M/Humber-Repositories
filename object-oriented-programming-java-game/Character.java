public abstract class Character {
    // Every child should have the following
    private int health;
    private int damage;

    // Parameterized Constructor
    Character(int health, int damage) {
        this.health = health;
        this.damage = damage;
    }

    // Setters & Getters
    public int getHealth() {
        return health;
    }

    public void setHealth(int health) {
        this.health = health;
    }

    public int getDamage() {
        return damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }

    // This method for attacks done by player/enemy/boss
    public abstract void attack();

    // This method calculates damage taken from a player/enemy/boss
    public abstract void takeDamage(int amount);

    // This method appears on player/enemy/boss death
    public abstract void death();
}
