public class Inventory {

    // All attributes, each one contains the amount of each item
    private int bananaAmount = 0;
    private int coconutAmount = 0;
    private int mangoAmount = 0;
    private int pineappleAmount = 0;
    private int grenadesAmount = 0;
    private int bulletsAmount = 0;

    // Remaining space in the inventory, each item consumes 1 space
    private int remainingSpace = 10;

    // Setters
    public void setRemainingSpace(int amount) {
        remainingSpace = amount;
    }

    public void setBananaAmount(int amount) {
        bananaAmount = amount;
    }

    public void setCoconutAmount(int amount) {
        coconutAmount = amount;
    }

    public void setMangoAmount(int amount) {
        mangoAmount = amount;
    }

    public void setPineappleAmount(int amount) {
        pineappleAmount = amount;
    }

    public void setGrenadesAmount(int amount) {
        grenadesAmount = amount;
    }

    public void setBulletsAmount(int amount) {
        bulletsAmount = amount;
    }

    // Getters
    public int getRemainingSpace() {
        return remainingSpace;
    }

    public int getBananaAmount() {
        return bananaAmount;
    }

    public int getCoconutAmount() {
        return coconutAmount;
    }

    public int getMangoAmount() {
        return mangoAmount;
    }

    public int getPineappleAmount() {
        return pineappleAmount;
    }

    public int getGrenadesAmount() {
        return grenadesAmount;
    }

    public int getBulletsAmount() {
        return bulletsAmount;
    }

    // Prints the total amount of all items and the remaining inventory space
    public void printTotalInventory() {
        System.out.println("Remaining Space: " + remainingSpace);
        System.out.println("Banana: " + bananaAmount);
        System.out.println("Coconut: " + coconutAmount);
        System.out.println("Mango: " + mangoAmount);
        System.out.println("Pineapple: " + pineappleAmount);
        System.out.println("Grenades: " + grenadesAmount);
        System.out.println("Bullets: " + bulletsAmount);
        System.out.println();
    }
}
