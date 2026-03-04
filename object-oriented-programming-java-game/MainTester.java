import java.util.Scanner;

public class MainTester {
    public static void battle(Player player, Enemy enemy, Inventory inventory) {
        // This class takes the player, enemy and inventory classes for combat
        Scanner scan = new Scanner(System.in);
        int option;

        // Give the player options for combat
        // Player always goes first
        // Enemy will always attacks the player during their turn
        System.out.println("You are fighting an enemy " + enemy.getName() + ", What would you like to do");
        System.out.println("1.Attack 2.Shoot 3.Parry 4.Grenade 5.Item");
        System.out.println("--------------------");
        option = scan.nextInt();
        switch (option) {
            case 1:
                // Player will do a regular attack for 25 damage
                System.out.println("***Player Turn**");
                player.attack();
                enemy.takeDamage(player.getDamage());
                if (enemy.getHealth() <= 0) {
                    break;
                }
                System.out.println("***Enemy Turn***");
                enemy.attack();
                player.takeDamage(enemy.getDamage());
                break;

            case 2:
                // Player will shoot for 35 damage if they have bullets
                System.out.println("***Player Turn**");
                if (player.shoot(inventory)) {
                    enemy.takeDamage(30);
                }
                if (enemy.getHealth() <= 0) {
                    break;
                }
                System.out.println("***Enemy Turn***");
                enemy.attack();
                player.takeDamage(enemy.getDamage());
                break;

            case 3:
                // Player will parry an attack for 5 damage preventing the enemy turn from
                // occuring
                // if they fail however, they will take an additional 5 damage from the enemy
                System.out.println("***Player Turn**");
                if (player.parry() == true) {
                    enemy.takeDamage(5);
                } else {
                    player.takeDamage(enemy.getDamage() + 5);
                }
                break;

            case 4:
                // Player will throw a grenade to deal 40 damage if they have any
                System.out.println("***Player Turn**");
                if (player.grenade(inventory)) {
                    enemy.takeDamage(40);
                }
                if (enemy.getHealth() <= 0) {
                    break;
                }
                System.out.println("***Enemy Turn***");
                enemy.attack();
                player.takeDamage(enemy.getDamage());
                break;

            case 5:
                // Player will consume an item if they have any
                System.out.println("***Player Turn**");
                player.item(inventory);
                System.out.println("***Enemy Turn***");
                enemy.attack();
                player.takeDamage(enemy.getDamage());
                break;

            default:
                System.out.println("Invalid option");
                break;
        }

        if (player.getHealth() <= 0) {
            player.death();
        } else if (enemy.getHealth() <= 0) {
            enemy.death();
        }
    }

    // Check enemy/player death over here
    public static void main(String[] args) {
        // Initialize an object of every respective
        Player player = new Player(100, 25, 100, 50);
        Inventory inventory = new Inventory();
        Enemy basicEnemy = new Enemy(50, 5, "Wandering Skeleton");
        Enemy intermediateEnemy = new Enemy(70, 10, "Vice Captain");
        FinalBoss finalBoss = new FinalBoss(90, 15);
        Shopkeep shop = new Shopkeep(player, inventory);

        // Intro strory
        System.out.println(
                "A misty island shrouded in mystery. The sound of waves crashing against the shore fills the air as our brave pirate protagonist steps onto the sandy beach.\n");

        System.out.println("Pirate (Player): Avast, me hearties! 'Tis the fabled island of The Ancients!\n");

        System.out.println(
                "Narrator: As the pirate sets foot on the island, whispers of ancient curses echo through the dense foliage. The hunt for treasure begins.\n");

        // This portion causes a delay to add a cinematic effect
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(
                "Scene: The pirate navigates through dense jungle, eventually stumbling upon a hidden cave entrance.\n");

        System.out.println("Pirate: Arrr, me treasure senses be tinglin'! This must be the place!\n");

        System.out.println(
                "Narrator: Inside the cave, the pirate is greeted by a horde of skeletal guardians, their bones clacking menacingly.\n");

        System.out.println("Skeleton: Ye be trespassin' in our domain, ye scallywag!\n");

        System.out.println("Pirate: Aye, come and taste the sharp end of me cutlass, ye bony buccaneers!\n");

        // Player enters battle with the enemy until one of them wins
        while (player.getHealth() > 0 && basicEnemy.getHealth() > 0) {
            battle(player, basicEnemy, inventory);
        }

        System.out.println(
                "Narrator: With a mighty swing of the cutlass, the pirate dispatches the skeletons one by one. But the fight has taken its toll.\n");

        System.out.println("The battle has left the pirate weary. They decide to head back to a shop to resupply.");

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Player can buy items
        shop.sellItems();

        // Story continues
        System.out.println(
                "Feeling refreshed, the pirate sets off deeper into the cave, the whispers of The Ancients growing louder with each step.");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("You get closer to the treasure but encounter another enemy.\n");

        // Player enters second battle
        while (player.getHealth() > 0 && intermediateEnemy.getHealth() > 0) {
            battle(player, intermediateEnemy, inventory);
        }

        // Rest 2/2
        System.out.println("With the enemy vanquished, the pirate takes a moment to resupply once more.");

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        shop.sellItems();

        // Final part of the story
        System.out.println(
                "The pirate finally reaches the heart of the cave, where the treasure awaits. But standing in their way is a fearsome foe.");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(
                "Suddenly, a fearsome figure emerges from the shadows, the skeletal form of Captain Rattlebones, his bones clinking with every step.\n");

        System.out.println(
                "Captain Rattlebones: Ye dare to steal me booty, ye landlubber? Ye'll pay the ultimate price!\n");

        System.out.println(
                "Pirate: Ye may have been cursed by The Ancients, but I'll be sendin' ye back to Davy Jones' locker all the same!\n");

        System.out.println(
                "Narrator: With grit and determination, the pirate faces off against Captain Rattlebones in a battle for the ages. The clash of steel rings out through the cavern as the two adversaries fight tooth and nail.\n");

        // Final battle
        while (player.getHealth() > 0 && finalBoss.getHealth() > 0) {
            FinalBattle.FinalBossBattle(player, finalBoss, inventory);
        }

        // End
        System.out.println(
                "With Captain Rattlebones defeated, the curse of The Ancients is broken. The pirate pulls a lever, closing the waterfall that guards the chest of gold.");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("The pirate snatches up the Ancient Booty and makes a hasty retreat from the cave.");

        System.out.println(
                "Pirate: Yo ho ho and a bottle of rum! The seas be callin' me name, and I'll be sailin' off into the sunset with me riches in tow!");

        System.out.println(
                "Narrator: And so, our intrepid pirate sails off into the horizon, their pockets jingling with gold and their heart filled with the thrill of adventure. But beware, for the whispers of The Ancients linger on the wind, a reminder of the perils that await those who dare to seek the treasure of the past.\n");

        // End
        System.out.println("Congrats you found the Booty!");

        System.out.println("Developed by Common .Ltd");

    }
}
