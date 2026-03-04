import java.util.Random;
import java.util.Scanner;

class Util {
    
	public static int randomBetween(int lowBound,int highBound) {
		Random rand = new Random();
		int temp; 
		if (lowBound > highBound) {
			temp = lowBound; 
			lowBound = highBound; 
			highBound = temp; 
		}
		return rand.nextInt(highBound-lowBound+1)+lowBound; 
	}
	public static void randomArrayEntries(int [] myArray,
										  int highBound,
										  int lowBound) {
		Random rand = new Random(); 
		for (int j=0; j<myArray.length;j++)
			myArray[j]=rand.nextInt(highBound-lowBound+1)+(lowBound); 
		
	}
	public static void outputArrayToConsole(int [] myArray) {
		for (int i=0;i<myArray.length;i++)
			System.out.println(myArray[1]);
	}
	
	public static void outputArrayToConsole(String [] myArray) { 
		for (int i=0;i<myArray.length;i++)
			System.out.println(myArray[1]);
	}
	
	public static void initializeArray(int [] myArray,int value) {
		for (int i=0; i<myArray.length;i++)
			myArray[i]=value; 
	}
	public static String initializeArray(double [] myArray,double value) {
		String result =""; 
		for (int i=0; i<myArray.length;i++)
			myArray[i]=value; 
		return result;
	}
	public static String initializeArray(String [] myArray,String value) {
		String result =""; 
		for (int i=0; i<myArray.length;i++)
			myArray[i]=value; 
		return result;
	}
	public static String initializeArray(boolean [] myArray,boolean value) {
		String result =""; 
		for (int i=0; i<myArray.length;i++)
			myArray[i]=value; 
		return result;
	}
	public static String initializeArray(char [] myArray,char value) {
		String result =""; 
		for (int i=0; i<myArray.length;i++)
			myArray[i]=value; 
		return result;
	}
	public static String arrayToString(int [] myArray) {
		String result = ""; 
		for (int i=0; i<myArray.length;i++)
			result += myArray[i] +"\n"; 
		return result; 
	}
	public static String arrayToString(String [] myArray) {
		String result = ""; 
		for (int i=0; i<myArray.length;i++)
			result += myArray[i] +"\n"; 
		return result; 
	}
	public static String arrayToString(double [] myArray) {
		String result = ""; 
		for (int i=0; i<myArray.length;i++)
			result += myArray[i] +"\n"; 
		return result; 
	}
	public static String arrayToString(char [] myArray) {
		String result = ""; 
		for (int i=0; i<myArray.length;i++)
			result += myArray[i] +"\n"; 
		return result; 
	}
	public static String arrayToString(boolean [] myArray) {
		String result = ""; 
		for (int i=0; i<myArray.length;i++)
			result += myArray[i] +"\n"; 
		return result; 
	}
	
	
	/*Setters and Getters for String, Integer, and Doubles
	 * Fill in the string, int, and doubles in the 
	 * function name parameter variable and return variable and this.variable
	*/
	
	/*
	public void setString(String string) {
		this.string=string;
	}
	
	public void setDouble(double double) {
		this.double=double;
	}
	
	public void setInt(int int) {
		this.int=int;
	}
	
	public String getString() {
		return string;
	}
	
	public double  getDouble() {
		return double;
	}
	
	public int getInt() {
		return int;
	}
	*/
	
	public static boolean isDouble(String inputtedString) {
			try {
				Double.parseDouble(inputtedString);
				return true; 
			} 
			catch (NumberFormatException e) {
				return false;
			}
		}
	public static double obtainDoubleInput (String promptMessage) {
		String userEnteredNumber="";
		Scanner userInput = new Scanner(System.in);

		while (true) {
			System.out.print (promptMessage);
			userEnteredNumber = userInput.nextLine();

			if (isDouble(userEnteredNumber))
				break;
			else
				System.out.println("You must enter a decimal value. Try again!");
		}
		return (double) Double.parseDouble(userEnteredNumber);
	}
	
	public static double obtainDoubleInputLow (String promptMessage, Double lowBound) {
		Double userEnteredNumber;
		while (true) {
			userEnteredNumber = obtainDoubleInput(promptMessage);
				if (userEnteredNumber<lowBound)
					System.out.println("You must enter a decimal value greater than or equal to "+lowBound+". Try again!");
				else
					break;
				}
		return userEnteredNumber; 
	}

		public static boolean isInteger(String inputtedString) {
			try {
				Integer.parseInt(inputtedString);
				return true;
			}
			catch (NumberFormatException e) {
				return false;
			}
		}



		public static int obtainIntegerInput(String promptMessage) { 
			String userEnteredNumber = ""; 
			Scanner userInput = new Scanner(System.in); 
			
			while (true) {
				System.out.print(promptMessage);
				userEnteredNumber = userInput.nextLine();
				
				if (isInteger(userEnteredNumber))
					break; 
				else
					System.out.println("You must enter an integer. Try again!"); 
				
			} 
			return Integer.parseInt(userEnteredNumber); 
		} 
		
		public static double roundDouble(double value,int decimalPlaces) {
			if (decimalPlaces<0)
				throw new IllegalArgumentException("Invalid number of decimal places."); 
			
			return Math.round(value*Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
		}
	}
	
