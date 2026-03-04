import java.util.Scanner;

public class Shopkeep {
    // The Shopkeep allows the player to buy items
    private Player player;
    private Inventory inventory;

    // Parameterized Constructor that takes the player and their inventory
    public Shopkeep(Player player, Inventory inventory) {
        this.player = player;
        this.inventory = inventory;
    }

    public void sellItems() {
        Scanner scan = new Scanner(System.in);
        boolean shopping = true;

        while (shopping) {
            // List all the possible options and their prices
            System.out.println();
            System.out.println("Current Gold: " + player.getGold());
            System.out.println();
            System.out.println("Arr matey! What be ye lookin' to purchase?");
            System.out.println("1. Banana - Heals 10 HP - Cost 1 Gold");
            System.out.println("2. Coconut - Heals 20 HP - Cost 3 Gold)");
            System.out.println("3. Mango - Heals 30 HP - Cost 6 gold)");
            System.out.println("4. Pineapple - Heals 50 HP - Cost 10 Gold)");
            System.out.println("5. Grenades (15 Pieces of gold - Deals 40 Damage to a single Enemy)");
            System.out.println("6. Bullets (5 Pieces of gold each - Deals 30 Damage to a single Enemy)");
            System.out.println("7. Quit shopping");
            System.out.println("Well matey what'll it be?: ");
            int choice = scan.nextInt();
            int quantity;

            switch (choice) {
                // Depending on their choice they can choose the amount
                case 1:
                    System.out.println("And how many ye like te buy");
                    quantity = scan.nextInt();
                    sellItem("Banana", 1, quantity);
                    break;
                case 2:
                    System.out.println("And how many ye like te buy");
                    quantity = scan.nextInt();
                    sellItem("Coconut", 3, quantity);
                    break;
                case 3:
                    System.out.println("And how many ye like te buy");
                    quantity = scan.nextInt();
                    sellItem("Mango", 6, quantity);
                    break;
                case 4:
                    System.out.println("And how many ye like te buy");
                    quantity = scan.nextInt();
                    sellItem("Pineapple", 10, quantity);
                    break;
                case 5:
                    System.out.println("And how many ye like te buy");
                    quantity = scan.nextInt();
                    sellItem("Grenades", 15, quantity);
                    break;
                case 6:
                    System.out.println("And how many ye like te buy");
                    quantity = scan.nextInt();
                    sellItem("Bullets", 5, quantity);
                    break;
                case 7:
                    shopping = false;
                    System.out.println();
                    System.out.println("Farewll me mate!");
                    inventory.printTotalInventory();
                    break;
                default:
                    System.out.println("Invalid option");
                    break;
            }
        }
    }

    public void addItem(String itemName, int quantity) {
        // Adds the apropriate amount to each item in the inventory
        if (itemName.equals("Banana")) {
            inventory.setBananaAmount(inventory.getBananaAmount() + quantity);
        } else if (itemName.equals("Coconut")) {
            inventory.setCoconutAmount(inventory.getCoconutAmount() + quantity);
        } else if (itemName.equals("Mango")) {
            inventory.setMangoAmount(inventory.getMangoAmount() + quantity);
        } else if (itemName.equals("Pineapple")) {
            inventory.setPineappleAmount(inventory.getPineappleAmount() + quantity);
        } else if (itemName.equals("Grenades")) {
            inventory.setGrenadesAmount(inventory.getGrenadesAmount() + quantity);
        } else if (itemName.equals("Bullets")) {
            inventory.setBulletsAmount(inventory.getBulletsAmount() + quantity);
        }
    }

    public void sellItem(String itemName, int cost, int quantity) {
        // Get the total cost
        int totalCost = cost * quantity;
        // Check if player has enough gold
        if (player.getGold() >= totalCost) {
            // Check if player has enough space
            if (inventory.getRemainingSpace() >= quantity) {
                // Update player's gold and inventory
                player.setGold(player.getGold() - totalCost);
                inventory.setRemainingSpace(inventory.getRemainingSpace() - quantity);
                addItem(itemName, quantity);

                // Display updated information
                System.out.println();
                System.out.println("You purchased " + quantity + " " + itemName + "(s).");
                System.out.println("Remaining Gold: " + player.getGold());
                System.out.println("Remaining Inventory Space: " + inventory.getRemainingSpace());
            } else {
                System.out.println("Ye can't carry more items.");
            }
        } else {
            System.out.println("Ye don't have enough gold.");
        }
    }

    public static void main(String[] args) {
        Player player = new Player(100, 20, 100, 50);
        Inventory inventory = new Inventory(); // Corrected variable name
        Shopkeep shop = new Shopkeep(player, inventory);
        shop.sellItems(); // Start selling items
    }
}
