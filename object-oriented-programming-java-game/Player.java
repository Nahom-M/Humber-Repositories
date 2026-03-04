import java.util.Random;
import java.util.Scanner;

public class Player extends Character {
    // The players max health and gold amount
    private int maxHealth;
    private int gold;

    // Parameterized constructor that uses the parent constructor
    public Player(int health, int damage, int maxHealth, int gold) {
        super(health, damage);
        this.maxHealth = maxHealth;
        this.gold = gold;
    }

    // Setters & Getters
    public int getMaxHealth() {
        return maxHealth;
    }

    public void setMaxHealth(int maxHealth) {
        this.maxHealth = maxHealth;
    }

    public int getGold() {
        return gold;
    }

    public void setGold(int gold) {
        this.gold = gold;
    }

    // Abstract methods
    @Override
    public void attack() {
        System.out.println("You Attack for " + getDamage());
    }

    @Override
    public void takeDamage(int amount) {
        setHealth(getHealth() - amount);
        System.out.println("You took " + amount + " damage");
        System.out.println("You now have " + getHealth() + " health");
        if (getHealth() < 0) {
            death();
        }
    }

    @Override
    public void death() {
        System.out.println("You have been killed, Gameover");
        System.exit(0);
    }

    // This is one of the player attack options, they have a 70% chance to dodge and
    // attack an deal 5 damage
    // Or they will miss and take damage
    public boolean parry() {
        boolean playerDodged;
        Random rn = new Random();
        int successCheck = rn.nextInt(1, 11);

        if (successCheck < 8) {
            playerDodged = true;
            System.out.println("Player succesfully parries the attack");
            System.out.println("Player Deals 5 damage to the enemy and stops the attack");
        } else {
            System.out.println("Player failed to parry the attack");
            System.out.println("Player takes extra 5 damage and the enemy attacks");
            playerDodged = false;
        }

        return playerDodged;
    }

    // This is for a shooting attack, if the player does not have any bullets their
    // turn will be wasted if they have no bullets
    public boolean shoot(Inventory inventory) {
        boolean shotSuccess = false;

        if (inventory.getBulletsAmount() <= 0) {
            shotSuccess = false;
            System.out.println("You try and shoot, but realize you don't have any bullets");
        } else {
            shotSuccess = true;
            System.out.println("You shoot for 30 damage");
        }

        return shotSuccess;
    }

    // This is for the grenade option, if the player does not have any bullets their
    // turn will be wasted if they have no grenades
    public boolean grenade(Inventory inventory) {
        boolean shotSuccess = false;

        if (inventory.getGrenadesAmount() <= 0) {
            shotSuccess = false;
            System.out.println("You reach for a grenade, only to realize you don't have any");
        } else {
            shotSuccess = true;
            System.out.println("Your grenade did 40 damage");
        }

        return shotSuccess;
    }

    // This method allows the player to use their healing items
    public void item(Inventory inventory) {
        Scanner scan = new Scanner(System.in);

        System.out.println("Which item would you like to use?");
        System.out.println("1. Banana");
        System.out.println("2. Coconut");
        System.out.println("3. Mango");
        System.out.println("4. Pineapple");

        int choice = scan.nextInt();

        switch (choice) {
            case 1:
                if (inventory.getBananaAmount() <= 0) {
                    System.out.println("You don't have any bananas");
                } else if (getMaxHealth() - getHealth() < 5) {
                    System.out.println("Health is too high, wait for health to be a bit lower");
                } else {
                    setHealth(getHealth() + 5);
                    System.out.println("Gained 5 HP");
                }
                break;

            case 2:
                if (inventory.getCoconutAmount() <= 0) {
                    System.out.println("You don't have any coconuts");
                } else if (getMaxHealth() - getHealth() < 10) {
                    System.out.println("Health is too high, wait for health to be a bit lower");
                } else {
                    setHealth(getHealth() + 10);
                    System.out.println("Gained 10 HP");
                }
                break;

            case 3:
                if (inventory.getMangoAmount() <= 0) {
                    System.out.println("You don't have any mangoes");
                } else if (getMaxHealth() - getHealth() < 15) {
                    System.out.println("Health is too high, wait for health to be a bit lower");
                } else {
                    setHealth(getHealth() + 15);
                    System.out.println("Gained 15 HP");
                }
                break;

            case 4:
                if (inventory.getPineappleAmount() <= 0) {
                    System.out.println("You don't have any pineapples");
                } else if (getMaxHealth() - getHealth() < 25) {
                    System.out.println("Health is too high, wait for health to be a bit lower");
                } else {
                    setHealth(getHealth() + 25);
                    System.out.println("Gained 25 HP");
                }
                break;

            default:
                System.out.println("Invalid choice.");
                break;
        }

        System.out.println("Health: " + getHealth());

    }
}
