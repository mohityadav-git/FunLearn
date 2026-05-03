export const LESSON_CONTENT = {
  "m1": {
    title: "Numbers Up to 9999 🔢",
    slides: [
      {
        title: "Chapter 1: The Base-10 System",
        visualizer: "counting",
        content: "In mathematics, we use the Base-10 number system. This means we use 10 different digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) to build every possible number. \nWhen we count past 9, we group numbers into tens, hundreds, and thousands.",
        example: "Think of base-10 blocks:\n- A tiny cube is 1 (a unit).\n- A rod of 10 cubes is a Ten.\n- A flat square of 10 rods is a Hundred.\n- A giant block of 10 flats is a Thousand!"
      },
      {
        title: "Chapter 2: Place Value",
        content: "The value of a digit depends completely on its 'place' or position in the number. We read whole numbers from right to left to find their place value: Ones, Tens, Hundreds, Thousands.",
        example: "Let's look at the number 7,482:\nThousands place: 7 (Value = 7,000)\nHundreds place: 4 (Value = 400)\nTens place: 8 (Value = 80)\nOnes place: 2 (Value = 2)"
      },
      {
        title: "Chapter 3: Partitioning Numbers",
        content: "Partitioning is a textbook strategy where we break a number down into its different place values to make it easier to understand and calculate.",
        example: "Standard Form: 5,903\nExpanded Form (Partitioned): 5,000 + 900 + 0 + 3\nNotice there is a 0 in the tens place! The zero acts as a placeholder so the 9 and 5 don't slide into the wrong places."
      },
      {
        title: "Chapter 4: Comparing and Ordering",
        content: "To compare two large numbers, always look at the digit with the highest place value first (the furthest left). We use symbols to compare: > (Greater Than), < (Less Than), and = (Equal To).",
        example: "Compare 3,450 and 3,610.\n1. Look at Thousands: Both are 3. (Tie!)\n2. Look at Hundreds: 6 is greater than 4.\nTherefore: 3,610 > 3,450."
      }
    ]
  },
  "m2": {
    title: "Addition ➕",
    slides: [
      {
        title: "Chapter 1: The Commutative Law",
        visualizer: "counting",
        content: "Addition has a special mathematical rule called the Commutative Law. This law states that when adding two numbers, the order does not matter. The total sum will always be the same.",
        example: "Law in action:\n14 + 7 = 21\n7 + 14 = 21\nYou can always flip the numbers to make the mental math easier for yourself!"
      },
      {
        title: "Chapter 2: The Partitioning Method",
        content: "Before learning formal written methods, we use partitioning to add numbers in our head. We break the numbers into Tens and Ones, add them separately, and then recombine them.",
        example: "Add 43 + 25.\n1. Break it down: (40 + 3) + (20 + 5)\n2. Add the Tens: 40 + 20 = 60\n3. Add the Ones: 3 + 5 = 8\n4. Recombine: 60 + 8 = 68."
      },
      {
        title: "Chapter 3: Column Addition",
        content: "For large numbers, the standard textbook method is Column Addition. We align the numbers vertically by their place value. We always begin adding from the Ones column on the far right.",
        example: "  352\n+ 145\n-----\n1. Ones: 2 + 5 = 7\n2. Tens: 5 + 4 = 9\n3. Hundreds: 3 + 1 = 4\nAnswer: 497"
      },
      {
        title: "Chapter 4: Regrouping (Carrying)",
        content: "If a column adds up to 10 or more, we must 'regroup'. We write down the ones digit of the sum and carry the tens digit over to the next column on the left.",
        example: "  48\n+ 25\n----\n1. Ones: 8 + 5 = 13. Write 3, carry the 1 to the tens column.\n2. Tens: 4 + 2 + 1 (carried) = 7.\nAnswer: 73"
      }
    ]
  },
  "m3": {
    title: "Subtraction ➖",
    slides: [
      {
        title: "Chapter 1: The Inverse Operation",
        visualizer: "subtraction",
        content: "Subtraction is the inverse (opposite) operation of addition. If you know an addition fact, you automatically know two subtraction facts! It is used to find what is left, or to find the difference between two values.",
        example: "Because we know: 15 + 5 = 20\nWe also know the inverse: 20 - 5 = 15\nAnd: 20 - 15 = 5"
      },
      {
        title: "Chapter 2: Counting On (Number Line)",
        content: "A great strategy for finding the difference between two numbers that are close together is 'Counting On'. Instead of taking away, we start at the smaller number and count up to the bigger number.",
        example: "Calculate 52 - 48.\nDon't try to take 48 away! Instead, start at 48 on a number line.\nJump 2 spaces to get to 50.\nJump 2 more spaces to get to 52.\nTotal jumps = 4. So, 52 - 48 = 4."
      },
      {
        title: "Chapter 3: Column Subtraction",
        content: "The formal written method for subtraction involves lining up the place values vertically. The larger number (minuend) must always go on top of the smaller number (subtrahend).",
        example: "  87\n- 45\n----\n1. Ones: 7 - 5 = 2\n2. Tens: 8 - 4 = 4\nAnswer: 42"
      },
      {
        title: "Chapter 4: Exchanging (Borrowing)",
        content: "In column subtraction, if the top digit is smaller than the bottom digit, we must 'exchange'. We take one value from the column to the left (e.g., 1 Ten) and convert it into 10 smaller values (e.g., 10 Ones) for our current column.",
        example: "  72\n- 38\n----\n1. Ones: 2 is smaller than 8! We cannot subtract.\n2. Exchange: Take 1 Ten from the 7. The 7 becomes 6. Give the 10 Ones to the 2. The 2 becomes 12.\n3. Subtract Ones: 12 - 8 = 4\n4. Subtract Tens: 6 - 3 = 3\nAnswer: 34"
      }
    ]
  },
  "m4": {
    title: "Multiplication ✖️",
    slides: [
      {
        title: "Chapter 1: Repeated Addition & Arrays",
        visualizer: "multiplication",
        content: "Multiplication is a fast way to calculate repeated addition of the same number. In textbooks, we often visualize this using an 'Array'—a grid of rows and columns.",
        example: "Instead of writing: 4 + 4 + 4 + 4 + 4 = 20\nWe write: 5 groups of 4 = 20 (5 × 4 = 20).\nAn array for this would be 5 rows with 4 dots in each row."
      },
      {
        title: "Chapter 2: The Commutative Property",
        content: "Just like addition, multiplication is commutative. The order of the factors does not change the product (the answer).",
        example: "Factor × Factor = Product\n6 × 4 = 24\n4 × 6 = 24\nIf you forget your 6 times table, just use your 4 times table!"
      },
      {
        title: "Chapter 3: Multiplying by Multiples of 10",
        content: "When multiplying by 10, 100, or 1000, all the digits in the number shift to the left on the place value chart. We fill the empty spaces on the right with placeholder zeros.",
        example: "Rule: To multiply by 10, shift digits one place left (add one zero).\n45 × 10 = 450\n45 × 100 = 4500 (shift two places left)"
      },
      {
        title: "Chapter 4: The Grid Method",
        content: "The grid method is a visual textbook strategy for multiplying larger numbers. It uses partitioning to break the multiplication into smaller, easier steps.",
        example: "Calculate 14 × 5.\n1. Partition 14 into 10 and 4.\n2. Multiply both parts by 5: (10 × 5 = 50) and (4 × 5 = 20).\n3. Add the results: 50 + 20 = 70."
      }
    ]
  },
  "m5": {
    title: "Division ➗",
    slides: [
      {
        title: "Chapter 1: Sharing and Grouping",
        visualizer: "division",
        content: "Division can be understood in two ways: Sharing (distributing a total equally among a set number of groups) or Grouping (finding out how many groups of a certain size can be made from a total).",
        example: "Total: 15 apples.\nSharing: Share 15 apples between 3 friends. (15 ÷ 3 = 5 apples per friend).\nGrouping: Put 15 apples into bags of 3. (15 ÷ 3 = 5 bags)."
      },
      {
        title: "Chapter 2: The Inverse of Multiplication",
        content: "Because division is the inverse of multiplication, you can use your times tables to solve division problems. They form a 'fact family'.",
        example: "Fact Family for 4, 6, and 24:\n4 × 6 = 24\n6 × 4 = 24\n24 ÷ 6 = 4\n24 ÷ 4 = 6"
      },
      {
        title: "Chapter 3: Remainders",
        content: "Numbers do not always divide equally. The amount left over is called the 'remainder'.",
        example: "Calculate 17 ÷ 5.\nUsing times tables: 5 × 3 = 15. This is the closest we can get without going over.\nWe have 3 equal groups, and 2 left over (17 - 15 = 2).\nAnswer: 3 remainder 2 (or 3 r 2)."
      },
      {
        title: "Chapter 4: Short Division (Bus Stop Method)",
        content: "For large numbers, we use Short Division. We place the dividend (number being divided) inside a 'bus stop' and the divisor outside. We divide digit by digit, from left to right.",
        example: "Calculate 84 ÷ 4.\n1. Divide the tens: 8 ÷ 4 = 2.\n2. Divide the ones: 4 ÷ 4 = 1.\nAnswer: 21."
      }
    ]
  },
  "m6": {
    title: "Day, Date and Time ⏰",
    slides: [
      {
        title: "Chapter 1: Units of Time",
        visualizer: "time",
        content: "Time is measured in standard units. Memorizing these conversions is essential for solving time problems.\n60 Seconds = 1 Minute\n60 Minutes = 1 Hour\n24 Hours = 1 Day",
        example: "If a movie is 120 minutes long, how many hours is it?\n120 ÷ 60 = 2 Hours."
      },
      {
        title: "Chapter 2: The 12-Hour Clock (AM/PM)",
        content: "The 12-hour clock divides the 24-hour day into two halves:\nAM (Ante Meridiem): From midnight up to noon.\nPM (Post Meridiem): From noon up to midnight.",
        example: "8:00 AM is in the morning (breakfast time).\n8:00 PM is in the evening (bed time)."
      },
      {
        title: "Chapter 3: The 24-Hour Clock",
        content: "Digital clocks and timetables often use the 24-hour clock to avoid AM/PM confusion. After 12:00 (noon), the hours continue counting up to 23:59.",
        example: "Rule: To convert PM time to 24-hour time, simply add 12 to the hours.\n3:00 PM -> 3 + 12 = 15:00.\n7:30 PM -> 7 + 12 = 19:30."
      },
      {
        title: "Chapter 4: Calendars",
        content: "The Gregorian calendar organizes days into weeks, months, and years.\n7 Days = 1 Week\n52 Weeks = 1 Year\n12 Months = 1 Year\n365 Days = 1 Normal Year (366 in a Leap Year)",
        example: "The rhyme helps us remember the days in a month:\n'Thirty days hath September, April, June, and November. All the rest have 31, excepting February alone (which has 28 or 29).'"
      }
    ]
  },
  "m7": {
    title: "Money 💰",
    slides: [
      {
        title: "Chapter 1: Currency Units",
        visualizer: "money",
        content: "In the UK currency system, we use Pounds (£) and Pence (p). The fundamental rule of money conversion is that 1 Pound is equivalent to 100 Pence.",
        example: "Conversion:\n100p = £1.00\n250p = £2.50\nTo convert pence to pounds, divide by 100 (move the decimal point two places left)."
      },
      {
        title: "Chapter 2: Decimal Notation",
        content: "When writing money, we use a decimal point to separate the whole Pounds from the Pence. We must always write two digits after the decimal point for the pence.",
        example: "Correct: £3.05 (Three pounds and five pence).\nIncorrect: £3.5 (This looks like fifty pence!).\nCorrect: £4.50."
      },
      {
        title: "Chapter 3: Adding and Subtracting Money",
        content: "When calculating totals or finding change, use column addition or subtraction. The most critical rule is to always line up the decimal points perfectly vertically.",
        example: "  £4.25\n+ £1.50\n-------\n  £5.75\nThe decimals are directly above each other."
      },
      {
        title: "Chapter 4: Calculating Change",
        content: "Change is the amount of money returned when you overpay. We use subtraction or 'counting up' to find the change.",
        example: "Item costs: £2.80. You pay with: £5.00 note.\nCounting up method:\nFrom £2.80 to £3.00 is 20p.\nFrom £3.00 to £5.00 is £2.00.\nTotal change = £2.20."
      }
    ]
  },
  "m8": {
    title: "Length 📏",
    slides: [
      {
        title: "Chapter 1: Metric Units of Length",
        visualizer: "length",
        content: "Length measures distance. The metric system uses a base-10 structure. The standard units from smallest to largest are Millimeters (mm), Centimeters (cm), Meters (m), and Kilometers (km).",
        example: "mm: Thickness of a credit card.\ncm: Width of a finger.\nm: Length of a guitar.\nkm: Distance to the next town."
      },
      {
        title: "Chapter 2: Conversion Rules",
        content: "To solve length problems, you must memorize the conversion factors:\n10 mm = 1 cm\n100 cm = 1 m\n1000 m = 1 km",
        example: "Convert 3 meters to centimeters.\nRule: multiply meters by 100.\n3 × 100 = 300 cm."
      },
      {
        title: "Chapter 3: Reading a Ruler",
        content: "When using a ruler, you must align the '0' mark (not the edge of the physical ruler) with the beginning of the object. Look at the numbers (cm) and the tiny tick marks between them (mm).",
        example: "If an object ends on the '4' mark, and goes 3 tiny lines past it, the length is 4 cm and 3 mm (or 43 mm, or 4.3 cm)."
      },
      {
        title: "Chapter 4: Perimeter",
        content: "The perimeter is the total length of the outside boundary of a closed 2D shape. You find it by adding the lengths of all the sides together.",
        example: "A rectangle has sides of 5cm and 3cm.\nPerimeter = 5 + 3 + 5 + 3 = 16cm."
      }
    ]
  },
  "m9": {
    title: "Weight ⚖️",
    slides: [
      {
        title: "Chapter 1: Mass vs Weight",
        visualizer: "weight",
        content: "In everyday language, we use 'weight', but in textbooks, we often refer to 'mass'—how much matter is in an object. We measure this using Grams (g) for light objects and Kilograms (kg) for heavier objects.",
        example: "Gram (g): About the weight of a paperclip.\nKilogram (kg): About the weight of a thick dictionary or a bag of sugar."
      },
      {
        title: "Chapter 2: The Kilo Prefix",
        content: "In the metric system, the prefix 'kilo' always means 1,000. Therefore, 1 Kilogram is exactly 1,000 grams.",
        example: "1 kg = 1000 g\nTo convert kg to g, multiply by 1000.\nTo convert g to kg, divide by 1000.\nExample: 2.5 kg = 2500 g."
      },
      {
        title: "Chapter 3: Reading Scales",
        content: "Analog weighing scales have a dial with a needle. You must determine the 'scale interval'—what each small line represents. Does it go up by 10g, 50g, or 100g?",
        example: "If the needle points halfway between 400g and 500g, and there is only one mark between them, that mark represents 450g."
      },
      {
        title: "Chapter 4: Solving Word Problems",
        content: "Before adding or subtracting weights in a word problem, you must ensure all values are in the same unit. You cannot directly add grams to kilograms!",
        example: "A box weighs 1.2 kg. You put a 300g book inside.\nFirst, convert: 1.2 kg = 1200 g.\nThen add: 1200 g + 300 g = 1500 g (or 1.5 kg)."
      }
    ]
  },
  "m10": {
    title: "Capacity 🥛",
    slides: [
      {
        title: "Chapter 1: Volume and Capacity",
        visualizer: "capacity",
        content: "Capacity refers to the maximum amount of liquid a container can hold. Volume is the actual amount of liquid inside it. The standard units are Milliliters (ml) and Liters (l or L).",
        example: "Milliliter (ml): A few drops of water, or a medicine spoon.\nLiter (L): A large bottle of water or a carton of juice."
      },
      {
        title: "Chapter 2: Conversion Rules",
        content: "Similar to weight and length, the conversion factor for capacity is a thousand. There are exactly 1,000 milliliters in 1 Liter.",
        example: "1 L = 1000 ml\nFractional equivalents are commonly tested:\n1/2 Liter = 500 ml\n1/4 Liter = 250 ml\n3/4 Liter = 750 ml"
      },
      {
        title: "Chapter 3: Reading Measuring Cylinders",
        content: "When reading the volume of a liquid in a cylinder, you must read from the bottom of the curve at eye level. This curve is called the meniscus.",
        example: "Check the intervals. If the lines are marked 100, 200, 300, and there are 4 tick marks between 100 and 200, each tick mark represents 20 ml."
      },
      {
        title: "Chapter 4: Conservation of Volume",
        content: "Pouring liquid from a tall, thin glass into a short, wide bowl changes the shape of the liquid, but the volume (capacity) remains exactly the same.",
        example: "If you pour 200 ml of water from a narrow test tube into a wide bucket, you still have exactly 200 ml of water."
      }
    ]
  },
  "m11": {
    title: "Fraction 🍕",
    slides: [
      {
        title: "Chapter 1: Anatomy of a Fraction",
        visualizer: "fractions",
        content: "A fraction represents a part of a whole. It consists of two numbers separated by a horizontal line.\nNumerator (Top): How many equal parts we have.\nDenominator (Bottom): How many equal parts make up the whole.",
        example: "In the fraction 3/8:\n3 is the Numerator.\n8 is the Denominator (the pizza was cut into 8 total slices)."
      },
      {
        title: "Chapter 2: Equivalent Fractions",
        content: "Equivalent fractions have different numerators and denominators but represent the exact same value. You find them by multiplying or dividing the top and bottom by the same number.",
        example: "Start with 1/2.\nMultiply numerator and denominator by 2.\n(1 × 2) / (2 × 2) = 2/4.\n1/2 is equivalent to 2/4!"
      },
      {
        title: "Chapter 3: Simplifying Fractions",
        content: "To write a fraction in its simplest form, you must find the highest common factor of both the numerator and denominator, and divide them both by that number.",
        example: "Simplify 4/12.\nBoth divide by 4.\n(4 ÷ 4) / (12 ÷ 4) = 1/3.\nThe simplest form is 1/3."
      },
      {
        title: "Chapter 4: Fractions of Amounts",
        content: "To find a fraction of a whole number, use this textbook rule: Divide the whole number by the Denominator, then Multiply the result by the Numerator.",
        example: "Find 2/3 of 18.\n1. Divide by bottom: 18 ÷ 3 = 6.\n2. Multiply by top: 6 × 2 = 12.\nAnswer: 12."
      }
    ]
  },
  "m12": {
    title: "Geometry 📐",
    slides: [
      {
        title: "Chapter 1: Properties of 2D Shapes",
        visualizer: "geometry",
        content: "2-Dimensional (2D) shapes are completely flat polygons. We classify them by counting their properties: Sides (straight lines) and Vertices (corners where lines meet).",
        example: "Quadrilaterals (4 sides):\n- Square: 4 equal sides, 4 right angles.\n- Rectangle: 2 pairs of equal sides, 4 right angles.\n- Rhombus: 4 equal sides, opposite equal angles."
      },
      {
        title: "Chapter 2: Types of Angles",
        content: "An angle is a measure of a turn, measured in degrees (°). There are specific textbook definitions for angles based on their size.",
        example: "- Acute: Less than 90° (sharp).\n- Right: Exactly 90° (a square corner).\n- Obtuse: Between 90° and 180° (blunt).\n- Straight: Exactly 180° (a straight line)."
      },
      {
        title: "Chapter 3: Symmetry and Translation",
        content: "A shape has a 'Line of Symmetry' if you can fold it perfectly in half and both sides match exactly. 'Translation' is when a shape simply slides up, down, left, or right without turning.",
        example: "A standard rectangle has 2 lines of symmetry (vertical and horizontal).\nA regular hexagon has 6 lines of symmetry."
      },
      {
        title: "Chapter 4: Properties of 3D Shapes",
        content: "3-Dimensional (3D) shapes are solid objects. We describe them using three properties:\nFaces: The flat surfaces.\nEdges: The line where two faces meet.\nVertices: The corners.",
        example: "A Cube has:\n- 6 square Faces\n- 12 Edges\n- 8 Vertices\nA Cylinder has 2 flat faces and 1 curved surface."
      }
    ]
  }
};
