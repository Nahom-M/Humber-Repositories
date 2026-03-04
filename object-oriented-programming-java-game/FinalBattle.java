import java.util.Scanner;

public class FinalBattle {
    public static void FinalBossBattle(Player player, FinalBoss finalBoss, Inventory inventory) {
        // This class takes the player, finalboss and inventory classes for combat
        Scanner scan = new Scanner(System.in);
        int option;

        // Give the player options for combat
        // Player always goes first
        // Final boss will always attacks the player during their turn
        // There is a chance the final boss does a special attack for more damage
        while (player.getHealth() > 0 && finalBoss.getHealth() > 0) {
            System.out.println("You are fighting the " + finalBoss.getName() + ", What would you like to do");
            System.out.println("1.Attack 2.Shoot 3.Parry 4.Grenade 5.Item");
            System.out.println("--------------------");
            option = scan.nextInt();
            switch (option) {
                case 1:
                    // Player will do a regular attack for 25 damage
                    System.out.println("***Player Turn**");
                    player.attack();
                    finalBoss.takeDamage(player.getDamage());
                    if (finalBoss.getHealth() <= 0) {
                        break;
                    }
                    System.out.println("***Enemy Turn***");
                    finalBoss.attack();
                    player.takeDamage(finalBoss.specialAttackCheck());
                    break;

                case 2:
                    // Player will shoot for 35 damage if they have bullets
                    System.out.println("***Player Turn**");
                    if (player.shoot(inventory)) {
                        finalBoss.takeDamage(30);
                    }
                    if (finalBoss.getHealth() <= 0) {
                        break;
                    }
                    System.out.println("***Enemy Turn***");
                    finalBoss.attack();
                    player.takeDamage(finalBoss.specialAttackCheck());
                    break;

                case 3:
                    // Player will parry an attack for 5 damage preventing the enemy turn from
                    // occuring
                    // if they fail however, they will take an additional 5 damage from the boss
                    System.out.println("***Player Turn**");
                    if (player.parry() == true) {
                        finalBoss.takeDamage(5);
                    } else {
                        player.takeDamage(finalBoss.getDamage() + 5);
                    }
                    break;

                case 4:
                    // Player will throw a grenade to deal 40 damage if they have any
                    System.out.println("***Player Turn**");
                    if (player.grenade(inventory)) {
                        finalBoss.takeDamage(40);
                    }
                    if (finalBoss.getHealth() <= 0) {
                        break;
                    }
                    System.out.println("***Enemy Turn***");
                    finalBoss.attack();
                    player.takeDamage(finalBoss.specialAttackCheck());
                    break;

                case 5:
                    // Player will consume an item if they have any
                    System.out.println("***Player Turn**");
                    player.item(inventory);
                    System.out.println("***Enemy Turn***");
                    finalBoss.attack();
                    player.takeDamage(finalBoss.specialAttackCheck());
                    break;

                default:
                    System.out.println("Invalid option");
                    break;
            }
        }
    }
}
